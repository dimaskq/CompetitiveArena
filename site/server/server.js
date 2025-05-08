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
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const slowDown = require("express-slow-down");
const csurf = require("csurf");

const { DB_URI, SESSION_SECRET } = process.env;

const app = express();

connectDB();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://avatars.steamstatic.com"],
        connectSrc: ["'self'", "https://competitivearena.up.railway.app"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Забагато запитів з цього IP. Спробуйте пізніше.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: 500,
});
app.use(speedLimiter);

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

const csrfProtection = csurf({ cookie: true });
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
        origin === "https://competitivearena.up.railway.app"
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed from this origin"), false);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

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

app.post("/api/beta-testers", async (req, res) => {
  const { email } = req.body;
  try {
    console.log("New beta tester:", email);
    res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering" });
  }
});

app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
