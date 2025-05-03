require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");
const passport = require("./config/passport");
const routes = require("./routes");

const { DB_URI, SESSION_SECRET } = process.env;

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

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === "http://87.120.167.110:32128" ||
        origin === "http://87.120.167.110:32129" ||
        origin === "https://87.120.167.110:32128" ||
        origin === "https://87.120.167.110:32129" ||
        origin === "https://striking-smile-production.up.railway.app"
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed from this origin"), false);
    },
    credentials: true,
  })
);

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

app.use(routes);

const PORT = 5173;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
