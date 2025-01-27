require('dotenv').config(); // Загружаем переменные из .env файла

const crypto = require('crypto');

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User'); 
const MongoStore = require('connect-mongo');

const app = express();
const db = "mongodb+srv://dmtradmin:QS2wPBeW5tTmQJ7U@cluster0.cco8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
// const steamApiKey = process.env.STEAM_API_KEY; 
const steamApiKey = "B6EEE9D935588CF3DAC3521B2F1AC8E7"
const secretKey = "abeee44e6592a1e88d34046c22225129e95c9d185a05030cab71c8c8604507fe";

mongoose
  .connect(db)
  .then(() => console.log('DB connected!'))
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

passport.use(
  new SteamStrategy(
    {
      returnURL: 'https://rust-bedl.onrender.com/auth/steam/return',
      realm: 'https://rust-bedl.onrender.com',
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

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user with ID:', id);
    const user = await User.findById(id);
    if (user) {
      console.log('Deserialized user:', user);
      done(null, user);
    } else {
      console.error('User not found during deserialization');
      done(new Error('User not found'), null);
    }
  } catch (err) {
    console.error('Error during deserialization:', err);
    done(err, null);
  }
});


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, 
  })
);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: db }),
    cookie: {
      httpOnly: true,
      secure: true,
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
  console.log('Authenticated user:', req.user);

  // Проверяем, сохраняется ли пользователь в сессии
  req.login(req.user, (err) => {
    if (err) {
      console.error('Login error:', err);
      return res.redirect('/error');
    }
    // res.redirect('https://deft-peony-874b49.netlify.app/');
    res.redirect('http://localhost:5173/');
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
  console.log(steamApiKey)
  console.log(secretKey)
});
