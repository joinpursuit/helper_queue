const users = require("express").Router();
const passport = require('passport');
const { createUser, fetchCurrentUser, updateUsersClass } = require('../queries/users');
const { checkFirebaseToken } = require("../middleware/auth");
const { checkAdminId } = require("../middleware/admin_auth")

users.post("/", createUser);
users.get("/current_user", checkFirebaseToken, fetchCurrentUser)
users.patch("/update_users_class", checkFirebaseToken, checkAdminId, updateUsersClass)

const pp = (req, res, next) => { 
    console.log('PP')
    const pass = passport.authenticate('local');
    console.log(req.body)
    pass(req, res, next);
};
users.post(
    '/login',   
    pp,
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/api/users/' + req.user.email);
    }
);

users.get('/:email', (req, res) => {
    res.json({ currentUser: req.params.email });
});

users.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = users;