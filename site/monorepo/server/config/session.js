const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (DB_URI, SESSION_SECRET) => {
  return session({
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
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  });
};
