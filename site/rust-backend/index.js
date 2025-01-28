require('dotenv').config();

const express = require('express');
const session = require('express-session'); // Сесії вже не використовуємо
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); 

const app = express();
const db = "mongodb+srv://dmtradmin:p3oB0a1aH6L1Mi8I@cluster0.cco8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const steamApiKey = "B6EEE9D935588CF3DAC3521B2F1AC8E7";
const jwtSecret = "supersecretkey"; // Замість цього використовуйте значення з .env

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
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) done(null, user);
    else done(new Error('User not found'), null);
  } catch (err) {
    done(err, null);
  }
});

app.use(
  cors({
    origin: 'https://deft-peony-874b49.netlify.app',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json()); // Для роботи з JSON у запитах

// Роут для авторизації через Steam
app.get('/auth/steam', passport.authenticate('steam'));

// Роут для обробки повернення після авторизації
app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), async (req, res) => {
  const user = req.user;

  // Створюємо токен
  const token = jwt.sign(
    { id: user._id, displayName: user.displayName, avatar: user.avatar }, // payload
    jwtSecret, // секретний ключ
    { expiresIn: '1d' } // час життя токена
  );

  // Відправляємо токен на фронтенд
  res.redirect(`https://deft-peony-874b49.netlify.app?token=${token}`);
});

// Роут для отримання інформації про користувача
app.get('/api/user', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json(decoded); // Повертаємо дані користувача
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
