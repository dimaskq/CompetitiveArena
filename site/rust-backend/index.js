const express = require('express');
const passport = require('passport');
const session = require('express-session');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');

// Создаем Express приложение
const app = express();

// Настроим CORS для общедоступного API
app.use(cors({
  origin: '*', // Это позволяет всем сайтам обращаться к вашему API
  credentials: false,
}));

// Настройка сессий
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Инициализация passport
app.use(passport.initialize());
app.use(passport.session());

// Настройка passport с использованием Steam
passport.use(new SteamStrategy({
  returnURL: 'https://rust-bedl.onrender.com/auth/steam/return',
  realm: 'https://rust-bedl.onrender.com',
  apiKey: 'YOUR_STEAM_API_KEY'
}, function(identifier, profile, done) {
  // Здесь profile - это объект, содержащий информацию о пользователе Steam
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Маршрут для аутентификации через Steam
app.get('/auth/steam', passport.authenticate('steam'));

// Маршрут, на который пользователь будет возвращен после авторизации через Steam
app.get('/auth/steam/return', 
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    // После успешной аутентификации, перенаправляем пользователя
    res.redirect('/');
  });

// Маршрут для получения данных пользователя (без авторизации)
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    // Если пользователь авторизован через Steam, возвращаем его данные
    res.json({
      steamId: req.user.id,
      displayName: req.user.displayName,
      avatar: req.user.photos[2].value,  // Получаем ссылку на аватар пользователя
    });
  } else {
    // Если пользователь не авторизован, возвращаем ошибку
    res.status(401).json({ message: 'User not authenticated' });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
