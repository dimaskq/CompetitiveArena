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

const {
  DB_URI,
  SESSION_SECRET,
  STEAM_REALM,
  CORS_ORIGINS,
  STATIC_DIR = "dist",
  NODE_ENV = "development",
} = process.env;

if (!DB_URI || !SESSION_SECRET || !STEAM_REALM) {
  console.error(
    "Missing required environment variables: DB_URI, SESSION_SECRET, or STEAM_REALM"
  );
  process.exit(1);
}

const app = express();

app.set("trust proxy", 1);

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
        connectSrc: ["'self'", STEAM_REALM],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: NODE_ENV === "production" ? [] : null,
      },
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: "Too many requests from this IP. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
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
      secure: NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(cookieParser());

// Initialize csurf, but without global application
const csrfProtection = csurf({ cookie: true });

app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = CORS_ORIGINS
  ? CORS_ORIGINS.split(",")
  : [STEAM_REALM, "http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed for this origin"), false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, `../${STATIC_DIR}`)));

// Route for generating CSRF token (without CSRF protection)
app.get("/api/csrf-token", (req, res) => {
  try {
    // Manually invoke csurf for this request
    csrfProtection(req, res, () => {
      const token = req.csrfToken();
      console.log("Generated CSRF token:", token);
      res.json({ csrfToken: token });
    });
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    res.status(500).json({ message: "Error generating CSRF token" });
  }
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

// Apply csrfProtection only to the POST request
app.post("/api/beta-testers", csrfProtection, async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      console.log("Error: Email not provided");
      return res.status(400).json({ message: "Email is required" });
    }
    console.log("Checking email:", email);
    const existingTester = await BetaTester.findOne({ email });
    if (existingTester) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    const newBetaTester = new BetaTester({ email });
    await newBetaTester.save();
    console.log("New beta tester saved:", email);

    res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    console.error("Error registering beta tester:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, `../${STATIC_DIR}`, "index.html"));
});

const PORT = process.env.PORT || 5173;

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

const server = app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}, STEAM_REALM: ${STEAM_REALM}, CORS_ORIGINS: ${
      CORS_ORIGINS || "default"
    }`
  )
);
