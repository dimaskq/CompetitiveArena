require('dotenv').config(); // Загружаем переменные из .env файла

const crypto = require('crypto');

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User'); 

const app = express();
const db = process.env.DB_URI; 
const steamApiKey = process.env.STEAM_API_KEY; 
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

// Настройки Steam OpenID
passport.use(
  new SteamStrategy(
    {
      returnURL: 'https://rust-zowp.onrender.com/auth/steam/return',
      realm: 'https://rust-zowp.onrender.com',
      apiKey: steamApiKey, // Используем API ключ Steam из .env
    },
    async (identifier, profile, done) => {
      try {
        let user = await User.findOne({ steamId: profile.id });

        if (!user) {
          user = new User({
            steamId: profile.id,
            displayName: profile.displayName,
            avatar: profile.photos[2]?.value || '', // Берём аватар
          });
          
          console.log('Saving new user:', user); // Логируем данные перед сохранением

          await user.save(); // Сохраняем пользователя в базе
        }

        return done(null, user); // Возвращаем пользователя
      } catch (error) {
        console.error('Error in SteamStrategy:', error);
        return done(error, null);
      }
    }
  )
);
console.log('DB_URI:', process.env.DB_URI);
console.log('STEAM_API_KEY:', process.env.STEAM_API_KEY);

// Сериализация и десериализация пользователя
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found during deserialization');
    }
    done(null, user);
  } catch (error) {
    console.error('Error in deserializeUser:', error);
    done(error, null);
  }
});


// Настройка middlewares
app.use(
  cors({
    origin: 'playful-tulumba-4722a2.netlify.app',
    credentials: true,
  })
);
app.use(
  session({
    secret: secretKey, 
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Роуты
app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  console.log('Authenticated user session:', req.session);
  res.redirect('https://playful-tulumba-4722a2.netlify.app/'); 
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
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }
    req.session.destroy(() => {
      res.json({ message: 'Logged out successfully' });
    });
  });
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
