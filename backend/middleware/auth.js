const admin = require("../firebase");

const checkFirebaseToken = async (req, res, next) => {
  try {
    // console.log(req.headers.authtoken);
    // console.log(req.body)
    const token = req.headers.authtoken;
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log(decodedToken);
    const {uid, email} = decodedToken;
    req.user = {
      id: uid,
      email
    }
    next();
  } catch (error) {
    console.log("code broke in auth middleware!", error);
    res.status(401).json({ message: "No user authenticated!" });
  }
};

const passport = require('passport');
const Strategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db');

const passportAuth = () => {

  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new Strategy(async (email, password, cb) => {
    let user;
    console.log('IN THE USE')
    try {
      user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
    } catch (err) {
      return cb(err);
    }
    
    crypto.pbkdf2(password, user.salt, 10000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
        
      // var user = {
      //   id: user.id.toString(),
      //   email: user.email,
      //   displayName: row.name
      // };

      return cb(null, user);
    });
  }));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    console.log('SERISLIZE,', user);
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

};


module.exports = { checkFirebaseToken, passportAuth };