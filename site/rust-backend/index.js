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

mongoose
  .connect(db)
  .then(() => console.log("DB connected!"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });

// Настройка сессий
app.use(
  session({
    secret: "5f8d7a3c8f45c9be82e2b43f9b9470e9481e0bfa59f01b00b3a6d62c0349d8ff", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: db,  
      collectionName: 'sessions'  
    }),
    cookie: { secure: true } 
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
        let user = await User.findOne({ steamId: profile.id });

        if (!user) {
          user = new User({
            steamId: profile.id,
            displayName: profile.displayName,
            avatar: profile.photos[2]?.value || "",
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        console.error("Error in SteamStrategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Middleware
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
    res.redirect("https://deft-peony-874b49.netlify.app");
  }
);

// Получение данных текущего пользователя
app.get("/api/user", async (req, res) => {
  res.json({ message: "API доступен без аутентификации" });
  res.json(req.user);
});

// Выход пользователя
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
