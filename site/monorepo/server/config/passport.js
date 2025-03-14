const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const User = require("../models/User");

module.exports = (STEAM_API_KEY, STEAM_RETURN_URL, STEAM_REALM) => {
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

  passport.serializeUser((user, done) => done(null, user.steamId));
  passport.deserializeUser(async (steamId, done) => {
    try {
      const user = await User.findOne({ steamId });
      done(null, user || null);
    } catch (err) {
      done(err);
    }
  });
};
