const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');

const app = express();

// Настройки Steam OpenID
passport.use(
  new SteamStrategy(
    {
      returnURL: 'http://localhost:5000/auth/steam/return',
      realm: 'http://localhost:5000/',
      apiKey: '3BF6FCAC4AEBA9F4E67A180AD3EC45EE',
    },
    (identifier, profile, done) => {
      return done(null, profile);
    }
  )
);

// Сериализация и десериализация пользователя
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Настройка middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'your_secret_key',
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

app.get(
  '/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authenticated user session:', req.session);
    console.log('Authenticated user:', req.user);
    res.redirect('http://localhost:5173');
  }
);

app.get('/api/user', (req, res) => {
  console.log('Current session:', req.session);
  if (req.isAuthenticated()) {
    res.json(req.user);
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
