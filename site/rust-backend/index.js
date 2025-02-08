require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Session = require("./models/Session");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const secretKey = "5f8d7a3c8f45c9be82e2b43f9b9470e9481e0bfa59f01b00b3a6d62c0349d8ff";
const db = "mongodb+srv://dmtradmin:p3oB0a1aH6L1Mi8I@cluster0.cco8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const steamApiKey = "B6EEE9D935588CF3DAC3521B2F1AC8E7";

mongoose
  .connect(db)
  .then(() => console.log("DB connected!"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });

app.use(
  session({
    name: "session.id",
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: db,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: true, 
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(
  cors({
    origin: "*", //"https://deft-peony-874b49.netlify.app",
    credentials: true,
  })
);

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

passport.serializeUser(async (user, done) => {
  try {
    console.log("Serializing user:", user._id);

    const session = await Session.findOneAndUpdate(
      { user_id: user._id.toString() }, 
      {
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
      { upsert: true, new: true } 
    );

    console.log("Session saved/updated:", session);
    done(null, session._id.toString()); 
  } catch (err) {
    console.error("❌ Error during serialization:", err);
    done(err, null);
  }
});

passport.deserializeUser(async (userId, done) => {
  try {
    console.log("Deserializing user with User ID:", userId);

    const user = await User.findOne({ user_id: userId });
    if (!user) {
      console.error("User not found for user_id:", userId);
      return done(new Error("User not found"));
    }

    console.log("Deserialized user:", user);
    done(null, user);
  } catch (err) {
    console.error("❌ Error during deserialization:", err);
    done(err, null);
  }
});

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.get("/auth/steam", passport.authenticate("steam", { failureRedirect: "https://deft-peony-874b49.netlify.app" }), (req, res) => {
  res.redirect("https://deft-peony-874b49.netlify.app/");
});

app.get("/auth/steam/return", passport.authenticate("steam"), async (req, res) => {
  console.log("User authenticated:", req.user); 

  if (req.user) {
    const tokenPayload = { userId: req.user._id, displayName: req.user.displayName };
    const jwtToken = jwt.sign(tokenPayload, secretKey, { expiresIn: "7d" });
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

    res.cookie("id_token", jwtToken, { expires, httpOnly: true, secure: true, sameSite: "Lax" });
    res.redirect(302, "https://deft-peony-874b49.netlify.app/");
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  passport.authenticate("steam", { failureRedirect: "https://deft-peony-874b49.netlify.app" });
}

app.get("/api/user", ensureAuthenticated, (req, res) => {
  return res.json({ user: req.user, jwt: req.session });
});

app.get("/logout", async (req, res) => {
  req.logout(() => {
    res.redirect("https://deft-peony-874b49.netlify.app/");  
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
