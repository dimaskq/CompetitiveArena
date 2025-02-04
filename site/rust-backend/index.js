require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");

const app = express();

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
    secret: "5f8d7a3c8f45c9be82e2b43f9b9470e9481e0bfa59f01b00b3a6d62c0349d8ff",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: db,
      collectionName: "sessions",
      transformData(session) {
        return {
          user_id: session.passport?.user || "guest",
          jwt: session.jwtToken || null,
        };
      },
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    },
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

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user._id.toString());
  done(null, user._id.toString());
});

app.use((req, res, next) => {
  console.log("🛠 Middleware: Checking session:", req.session);
  next();
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("🔄 Deserializing user ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid ObjectId format:", id);
      return done(null, false);
    }

    const user = await User.findById(id);

    if (!user) {
      console.warn("⚠️ User not found in DB for ID:", id);
      return done(null, false);
    }

    console.log("✅ Deserialized user:", user);
    done(null, user);
  } catch (err) {
    console.error("❌ Error in deserializeUser:", err);
    done(err, null);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://deft-peony-874b49.netlify.app",
    credentials: true,
  })
);
app.use(express.json());

app.get("/auth/steam", passport.authenticate("steam"));

app.get("/auth/steam/return", passport.authenticate("steam"), (req, res) => {
  const jwtToken = generateJwt(req.user);
  req.session.jwtToken = jwtToken;

  req.session.save((err) => {
    if (err) {
      console.error("❌ Error saving session:", err);
    }
    res.redirect("https://deft-peony-874b49.netlify.app");
  });
});

function generateJwt(user) {
  const payload = {
    id: user._id,
    steamId: user.steamId,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
}

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/user", (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  return res.status(401).json({ error: "User not authenticated" });
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
