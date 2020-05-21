const users = require("express").Router();
const { createUser, fetchCurrentUser } = require('../queries/users');
const { checkFirebaseToken } = require("../middleware/auth");

users.post("/", createUser);
users.get("/current_user", checkFirebaseToken, fetchCurrentUser)

module.exports = users;