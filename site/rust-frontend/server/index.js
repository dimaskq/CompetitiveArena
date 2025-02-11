require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

const secretKey = "secret-key-for-local-session";

mongoose.connect('mongodb+srv://dmtradmin:XUkNarWj7QvCODTc@cluster0.cco8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(
  session({
    name: 'session.id',
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://dmtradmin:XUkNarWj7QvCODTc@cluster0.cco8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      ttl: 14 * 24 * 60 * 60, 
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false, 
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);

app.use(
  cors({
    origin: "https://rust-pkqo.onrender.com", 
    credentials: true,
  })
);

passport.use(
  new SteamStrategy(
    {
      returnURL: "https://rust-pkqo.onrender.com/auth/steam/return",
      realm: "https://rust-pkqo.onrender.com",
      apiKey: "5EE6CC358E5F32B973DC26FB00AB5D03",
    },
    async (identifier, profile, done) => {
      try {
        // Перевіряємо, чи є користувач у базі даних
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
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.steamId);
});

passport.deserializeUser(async (steamId, done) => {
  try {
    const user = await User.findOne({ steamId });
    done(null, user || null);
  } catch (err) {
    done(err);
  }
});


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get("/auth/steam", passport.authenticate("steam", { failureRedirect: "/" }));

app.get("/auth/steam/return", passport.authenticate("steam", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/");
});

app.get("/api/user", ensureAuthenticated, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  return res.json(req.user);
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

const PORT = 5173;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
