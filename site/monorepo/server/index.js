require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
const connectDB = require("./config/db");
const saveUsersRouter = require("./routes/saveUsers");
const logoutRouter = require("./routes/logout");
const usersRouter = require("./routes/users");
const userRouter = require("./routes/user");

const { DB_URI, SESSION_SECRET, STEAM_API_KEY, STEAM_RETURN_URL, STEAM_REALM } =
  process.env;

const app = express();

connectDB();

app.use(
  session({
    name: "session.id",
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
      sameSite: "lax",
    },
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === "http://87.120.167.110:32128" ||
        origin === "http://87.120.167.110:32129" ||
        origin === "https://87.120.167.110:32128" ||
        origin === "https://87.120.167.110:32129" ||
        origin === "https://rust-pkqo.onrender.com"
      ) {
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

app.get(
  "/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/" })
);

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.use("/api/save-users", saveUsersRouter);
app.use("/logout", logoutRouter);
app.use("/api/users", usersRouter);
app.use("/api/user", userRouter);

const PORT = 5173;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
