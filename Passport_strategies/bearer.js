const passport = require('passport');
const Employee = require('../Models/Employe');
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken');
passport.use(new BearerStrategy(
    (token, done) => {
      const decoded = jwt.verify(token, "secret")

      Employe.findById(decoded.userId, function (err, employee) {
        if (err) { return done(err); }
        if (!employee) { return done(null, false); }
        return done(null, employee);
      });
    }
  ));