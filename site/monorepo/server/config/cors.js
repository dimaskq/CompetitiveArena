module.exports = (allowedOrigins) => {
  return {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed from this origin"), false);
    },
    credentials: true,
  };
};
