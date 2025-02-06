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
    secret: secretKey,
    resave: false,
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
    const jwtToken = generateJwt(user);

    const session = await Session.findOneAndUpdate(
      { user_id: user._id.toString() }, 
      {
        jwt: jwtToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
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

passport.deserializeUser(async (sessionId, done) => {
  try {
    console.log("Loading session with ID:", sessionId);

    const session = await Session.findById(sessionId);
    if (!session) throw new Error("Session not found");

    const user = await User.findById(session.user_id);
    if (!user) throw new Error("User not found");

    console.log("Deserialized user:", user);
    done(null, user);
  } catch (err) {
    console.error("❌ Error during deserialization:", err);
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

app.get("/auth/steam/return", passport.authenticate("steam"), async (req, res) => {
  console.log("User authenticated:", req.user); 

  const jwtToken = generateJwt(req.user);
  req.session.jwtToken = jwtToken; 

  res.redirect("https://deft-peony-874b49.netlify.app"); 
});


function generateJwt(user) {
  const payload = {
    id: user._id,
    steamId: user.steamId,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
}

app.get("/api/user", (req, res) => {
  if (req.user) {
    return res.json(req.user);  // Отправляем данные пользователя
  }
  return res.status(401).json({ error: "User not authenticated" });
});

app.get("/logout", async (req, res) => {
  req.logout(() => {
    res.redirect("/");  // Редирект на главную страницу
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.use((req, res, next) => {
  console.log("Session data:", req.session);
  next();
});
