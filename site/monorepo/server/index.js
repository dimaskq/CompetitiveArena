const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const sessionConfig = require("./config/session");
const passportConfig = require("./config/passport");
const corsConfig = require("./config/cors");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

const { DB_URI, SESSION_SECRET, STEAM_API_KEY, STEAM_RETURN_URL, STEAM_REALM } =
  process.env;

mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

passportConfig(STEAM_API_KEY, STEAM_RETURN_URL, STEAM_REALM);

app.use(sessionConfig(DB_URI, SESSION_SECRET));
app.use(
  corsConfig([
    "http://87.120.167.110:32128",
    "http://87.120.167.110:32129",
    "https://87.120.167.110:32128",
    "https://87.120.167.110:32129",
    "https://rust-pkqo.onrender.com",
  ])
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
