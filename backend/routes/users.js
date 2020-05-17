const users = require("express").Router();
const { createUser } = require('../queries/users');

users.post("/", createUser);

module.exports = users;