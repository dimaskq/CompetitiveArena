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

const { DB_URI, SESSION_SECRET, STEAM_API_KEY, STEAM_RETURN_URL, STEAM_REALM } = process.env;
const allowedIp = '87.120.167.110';
mongoose.connect(DB_URI)
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(
  session({
    name: 'session.id',
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: DB_URI,
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
    origin: (origin, callback) => {
      if (!origin || origin === "http://87.120.167.110:31275" || origin === "https://87.120.167.110:31275" || origin === "https://rust-pkqo.onrender.com") {
        return callback(null, true); 
      }
      return callback(new Error("CORS not allowed from this origin"), false); 
    },
    credentials: true, 
  })
);


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

app.post('/api/save-users', async (req, res) => {
  try {
    const requestIp = req.ip || req.connection.remoteAddress;
    if (!requestIp.includes(allowedIp)) {
      return res.status(403).json({ message: "Forbidden: Invalid IP address." });
    }

    const users = req.body; // Array of users

    // is Arr?
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "Invalid data format. Expected an array of users." });
    }

    // Array for bulkWrite operations
    const operations = users.map(user => ({
      updateOne: {
        filter: { steamId: user.steamId }, // Filter to search user by steamId
        update: {
          $set: {
            displayName: user.displayName,
            avatar: user.avatar,
            wood: user.wood,
            stone: user.stone,
            methal: user.methal,
            sulfur: user.sulfur,
            scrap: user.scrap,
            hqm: user.hqm,
            kd: user.kd,
            kill: user.kill,
            death: user.death,
            solo: user.solo,
            duo: user.duo,
            trio: user.trio,
            squad: user.squad, // Corrected typo (was skuad)
          },
        },
        upsert: true, // If the user does not exist, it will be created.
      },
    }));

    // Performing bulkWrite
    const result = await User.bulkWrite(operations);

    res.status(200).json({
      message: `${result.upsertedCount} users created, ${result.modifiedCount} users updated`,
      data: result,
    });
  } catch (error) {
    console.error('Error saving users:', error);
    res.status(500).json({ message: "Error saving users", error });
  }
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