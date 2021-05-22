const users = require("express").Router();
const { createUser, fetchCurrentUser, updateUsersClass } = require('../queries/users');
const { checkFirebaseToken } = require("../middleware/auth");
const { checkAdminId } = require("../middleware/admin_auth")

users.post("/", createUser);
users.get("/current_user", checkFirebaseToken, fetchCurrentUser)
users.patch("/update_users_class", checkFirebaseToken, checkAdminId, updateUsersClass)

module.exports = users;