const User = require("../models/user.model");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");



passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

//?? This is the middleware that takes care of the user authentication by checking 'username' & 'password' in our DB.
passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

    //?? When user isn't found
      if (!foundUser) {
        next(null, false, { message: "Incorrect username." });
        return;
      }
    //?? When password isn't correct
      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: "Incorrect password." });
        return;
      }

      //?? Sends back to the "/api/login" route the found user
      next(null, foundUser);
    });
  })
);

