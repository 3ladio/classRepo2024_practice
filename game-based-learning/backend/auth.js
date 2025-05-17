const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

const User = require("./db/collections/user");

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const SECRET_KEY = "fjkashfjkashf897adf89afhajkfda87gd9d8fasdf98";

const getToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: 3600 });
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(err, false);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

const verifyUser = passport.authenticate("jwt", { session: false });

module.exports = {
  getToken,
  verifyUser,
};
