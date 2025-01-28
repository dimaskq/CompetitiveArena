require("dotenv").config(); // Завантажуємо змінні з .env файлу

const express = require("express");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

// База даних і ключі
const db =
  "mongodb+srv://dmtradmin:p3oB0a1aH6L1Mi8I@cluster0.cco8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const steamApiKey = "B6EEE9D935588CF3DAC3521B2F1AC8E7";
const secretKey = "abeee44e6592a1e88d34046c22225129e95c9d185a05030cab71c8c8604507fe";

mongoose
  .connect(db)
  .then(() => console.log("DB connected!"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });

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
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Роут для аутентифікації через Steam
app.get("/auth/steam", passport.authenticate("steam"));

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      const user = req.user;

      // Генеруємо токен
      const token = jwt.sign(
        {
          id: user._id,
          steamId: user.steamId,
          displayName: user.displayName,
        },
        secretKey,
        { expiresIn: "1d" } // Токен дійсний 24 години
      );

      // Відправляємо токен у URL, щоб клієнт зміг його забрати
      res.redirect(
        `https://deft-peony-874b49.netlify.app?token=${token}` // Передаємо токен на фронт
      );
    } catch (error) {
      console.error("Error generating token:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Захищений маршрут для отримання даних користувача
app.get("/api/user", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey); // Розшифровуємо токен
    res.json({
      id: decoded.id,
      steamId: decoded.steamId,
      displayName: decoded.displayName,
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
