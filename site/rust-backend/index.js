require('dotenv').config(); // Загружаем переменные из .env файла

const crypto = require('crypto');

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User'); 

const app = express();
const db = 'mongodb+srv://dmtradmin:QS2wPBeW5tTmQJ7U@cluster0.cco8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
// const steamApiKey = process.env.STEAM_API_KEY; 
const steamApiKey = "3BF6FCAC4AEBA9F4E67A180AD3EC45EE"
const secretKey = crypto.randomBytes(32).toString('hex');

// Подключение к MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('DB connected!');
  })
  .catch((err) => {
    console.log(err);
  });

passport.use(
  new SteamStrategy(
    {
      returnURL: 'https://rust-zowp.onrender.com/auth/steam/return',
      realm: 'https://rust-zowp.onrender.com',
      apiKey: steamApiKey,
    },
    async (identifier, profile, done) => {
      try {
        let user = await User.findOne({ steamId: profile.id });

        if (!user) {
          user = new User({
            steamId: profile.id,
            displayName: profile.displayName,
            avatar: profile.photos[2]?.value || '',
          });
          
          console.log('Saving new user:', user);

          await user.save(); 
        }

        return done(null, user); 
      } catch (error) {
        console.error('Error in SteamStrategy:', error);
        return done(error, null);
      }
    }
  )
);
console.log('DB_URI:', process.env.DB_URI);
console.log('STEAM_API_KEY:', process.env.STEAM_API_KEY);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      done(null, user); 
    } else {
      done(new Error('User not found'), null);
    }
  } catch (err) {
    done(err, null);
  }
});



app.use(
  cors({
    origin: 'https://deft-peony-874b49.netlify.app',
    credentials: true, 
  })
);

app.use(
  session({
    secret: secretKey,
    resave: false, 
    saveUninitialized: false, 
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      ttl: 14 * 24 * 60 * 60, 
    }),
    cookie: {
      httpOnly: true,
      secure: false, 
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());

// Роуты
app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      console.error('Login error:', err);
      return res.redirect('/error');
    }
    res.redirect('https://deft-peony-874b49.netlify.app/');
  });
});




app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    const { id, displayName, avatar } = req.user; // Извлекаем только нужные данные
    res.json({ id, displayName, avatar }); // Возвращаем только нужные поля
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      return next(err);
    }
    res.json({ message: 'Logged out successfully' });
  });
});


// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
});
