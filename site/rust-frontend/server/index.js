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

const app = express();

const { DB_URI, SESSION_SECRET, STEAM_API_KEY, STEAM_RETURN_URL, STEAM_REALM } =
  process.env;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

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

app.get("/api/user", ensureAuthenticated, async (req, res) => {
  try {
    if (!req.user || !req.user.steamId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findOne({ steamId: req.user.steamId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
});

app.patch("/api/user", ensureAuthenticated, async (req, res) => {
  try {
    if (!req.user || !req.user.steamId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const updateData = req.body; // data for update

    const updatedUser = await User.findOneAndUpdate(
      { steamId: req.user.steamId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
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
  req.logout((err) => {
    if (err) {
      console.error("Помилка логауту:", err);
      return res.status(500).send("Не вдалося вийти");
    }
    res.redirect("/");
  });
});

app.post("/api/save-users", async (req, res) => {
  try {
    const requestIp = req.ip || req.connection.remoteAddress;

    if (
      !(
        requestIp.includes("87.120.167.110:32128") ||
        requestIp.includes("87.120.167.110:32129")
      )
    ) {
      return res
        .status(403)
        .json({
          message: "Forbidden: Invalid IP address. You are not серьожа!!!!",
        });
    }

    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid data format. Expected an array of users." });
    }

    const operations = users.map((user) => {
      const updatedServers = [
        {
          solo: user.servers?.[0]?.solo || 0,
          kills: user.servers?.[0]?.kills || 0,
          deaths: user.servers?.[0]?.deaths || 0,
          kd:
            user.servers?.[0]?.deaths > 0
              ? (user.servers?.[0]?.kills / user.servers?.[0]?.deaths).toFixed(
                  2
                )
              : user.servers?.[0]?.kills,
          resources: {
            wood: user.servers?.[0]?.resources?.wood || 0,
            stone: user.servers?.[0]?.resources?.stone || 0,
            metal: user.servers?.[0]?.resources?.metal || 0,
            sulfur: user.servers?.[0]?.resources?.sulfur || 0,
            scrap: user.servers?.[0]?.resources?.scrap || 0,
            hqm: user.servers?.[0]?.resources?.hqm || 0,
          },
        },
        {
          duo: user.servers?.[1]?.duo || 0,
          kills: user.servers?.[1]?.kills || 0,
          deaths: user.servers?.[1]?.deaths || 0,
          kd:
            user.servers?.[1]?.deaths > 0
              ? (user.servers?.[1]?.kills / user.servers?.[1]?.deaths).toFixed(
                  2
                )
              : user.servers?.[1]?.kills,
          resources: {
            wood: user.servers?.[1]?.resources?.wood || 0,
            stone: user.servers?.[1]?.resources?.stone || 0,
            metal: user.servers?.[1]?.resources?.metal || 0,
            sulfur: user.servers?.[1]?.resources?.sulfur || 0,
            scrap: user.servers?.[1]?.resources?.scrap || 0,
            hqm: user.servers?.[1]?.resources?.hqm || 0,
          },
        },
        {
          trio: user.servers?.[2]?.trio || 0,
          kills: user.servers?.[2]?.kills || 0,
          deaths: user.servers?.[2]?.deaths || 0,
          kd:
            user.servers?.[2]?.deaths > 0
              ? (user.servers?.[2]?.kills / user.servers?.[2]?.deaths).toFixed(
                  2
                )
              : user.servers?.[2]?.kills,
          resources: {
            wood: user.servers?.[2]?.resources?.wood || 0,
            stone: user.servers?.[2]?.resources?.stone || 0,
            metal: user.servers?.[2]?.resources?.metal || 0,
            sulfur: user.servers?.[2]?.resources?.sulfur || 0,
            scrap: user.servers?.[2]?.resources?.scrap || 0,
            hqm: user.servers?.[2]?.resources?.hqm || 0,
          },
        },
        {
          squad: user.servers?.[3]?.squad || 0,
          kills: user.servers?.[3]?.kills || 0,
          deaths: user.servers?.[3]?.deaths || 0,
          kd:
            user.servers?.[3]?.deaths > 0
              ? (user.servers?.[3]?.kills / user.servers?.[3]?.deaths).toFixed(
                  2
                )
              : user.servers?.[3]?.kills,
          resources: {
            wood: user.servers?.[3]?.resources?.wood || 0,
            stone: user.servers?.[3]?.resources?.stone || 0,
            metal: user.servers?.[3]?.resources?.metal || 0,
            sulfur: user.servers?.[3]?.resources?.sulfur || 0,
            scrap: user.servers?.[3]?.resources?.scrap || 0,
            hqm: user.servers?.[3]?.resources?.hqm || 0,
          },
        },
      ];

      return {
        updateOne: {
          filter: { steamId: user.steamId },
          update: {
            $set: {
              displayName: user.displayName,
              avatar: user.avatar,
              servers: updatedServers,
            },
          },
          upsert: true,
        },
      };
    });

    const result = await User.bulkWrite(operations);

    res.status(200).json({
      message: `${result.upsertedCount} users created, ${result.modifiedCount} users updated`,
      data: result,
    });
  } catch (error) {
    console.error("Error saving users:", error);
    res.status(500).json({ message: "Error saving users", error });
  }
});

const PORT = 5173;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

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
