require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const MongoStore = require("connect-mongo");

const app = express();

const secretKey = process.env.SECRET_KEY;
const db = "mongodb+srv://dmtradmin:p3oB0a1aH6L1Mi8I@cluster0.cco8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const steamApiKey = "B6EEE9D935588CF3DAC3521B2F1AC8E7";

// Логируем подключение к базе данных
mongoose
  .connect(db)
  .then(() => console.log("DB connected!"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });

// Логируем все входящие запросы
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Настройка сессий
app.use(
  session({
    secret: secretKey || "5f8d7a3c8f45c9be82e2b43f9b9470e9481e0bfa59f01b00b3a6d62c0349d8ff", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: db,  
      collectionName: 'sessions'  
    }),
    cookie: { secure: true }  // Используйте secure: true только для HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new SteamStrategy(
    {
      returnURL: "https://rust-bedl.onrender.com/auth/steam/return",
      realm: "https://rust-bedl.onrender.com",
      apiKey: steamApiKey,
    },
    async (identifier, profile, done) => {
      try {
        console.log("Steam authentication attempt:", profile.displayName);

        let user = await User.findOne({ steamId: profile.id });

        if (!user) {
          user = new User({
            steamId: profile.id,
            displayName: profile.displayName,
            avatar: profile.photos[2]?.value || "",
          });
          await user.save();
          console.log(`New user created: ${user.displayName}`);
        } else {
          console.log(`Existing user logged in: ${user.displayName}`);
        }
        return done(null, user);
      } catch (error) {
        console.error("Error in SteamStrategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(`Serialized user: ${user.id}`);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log(`Deserialized user: ${user.displayName}`);
    done(null, user);
  } catch (err) {
    console.error("Error during deserialization:", err);
    done(err, null);
  }
});

// Middleware для CORS
app.use(
  cors({
    origin: "https://deft-peony-874b49.netlify.app",
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Аутентификация через Steam
app.get("/auth/steam", passport.authenticate("steam"));

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    console.log("User successfully logged in:", req.user);
    res.redirect("https://deft-peony-874b49.netlify.app");
  }
);

// Получение данных текущего пользователя
app.get("/api/user", async (req, res) => {
  if (req.user) {
    console.log("Returning user data:", req.user.displayName);
    res.json(req.user);
  } else {
    console.log("No user found, returning null");
    res.json({ message: "No user logged in" });
  }
});

// Выход пользователя
app.get("/logout", (req, res) => {
  req.logout(() => {
    console.log("User logged out");
    res.redirect("/");
  });
});

// Логируем ошибки
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
