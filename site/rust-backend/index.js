require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const secretKey = "secret-key-for-local-session";
// In-memory user and session storage
const users = {};
const sessions = {};

app.use(
  session({
    name: "session.id",
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: false, // Set false for localhost
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5000/auth/steam/return",
      realm: "http://localhost:5000",
      apiKey: "3BF6FCAC4AEBA9F4E67A180AD3EC45EE",
    },
    (identifier, profile, done) => {
      const user = users[profile.id] || {
        steamId: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos[2]?.value || "",
      };
      users[profile.id] = user;
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  const sessionId = user.steamId;
  sessions[sessionId] = user;
  done(null, sessionId);
});

passport.deserializeUser((sessionId, done) => {
  const user = sessions[sessionId];
  done(null, user || null);
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

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

app.use(express.static(path.join(__dirname, "../rust-frontend/dist")));
// Uncomment if you need to serve frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../rust-frontend/dist", "index.html"));
// });
