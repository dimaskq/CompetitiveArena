require("dotenv").config()

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

// Load environment variables into constants
const DB_URI = process.env.DB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_RETURN_URL = process.env.STEAM_RETURN_URL;
const STEAM_REALM = process.env.STEAM_REALM;

mongoose.connect(DB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Session middleware using constants for the session secret and DB_URI
app.use(
  session({
    name: 'session.id',
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: DB_URI,
      ttl: 14 * 24 * 60 * 60, // Time to live for session
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false, 
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);

// CORS settings using the Steam realm URL constant
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === "http://87.120.167.110:31275" || origin === "https://87.120.167.110:31275" || origin === STEAM_REALM) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed from this origin"), false);
    },
    credentials: true,
  })
);

// Steam authentication using the constant for the Steam API key
passport.use(
  new SteamStrategy(
    {
      returnURL: STEAM_RETURN_URL,
      realm: STEAM_REALM,
      apiKey: STEAM_API_KEY,
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
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user
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

// Your routes
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

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.listen(5173, () => console.log("Server running on http://localhost:5173"));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}
