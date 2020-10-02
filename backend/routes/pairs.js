const pairs = require('express').Router();
const { fetchAllPairLists, createNewPairList } = require('../queries/pairs');
const { checkFirebaseToken } = require("../middleware/auth");

pairs.use(checkFirebaseToken);

pairs.get("/", fetchAllPairLists);
pairs.post("/", createNewPairList);


module.exports = pairs; 