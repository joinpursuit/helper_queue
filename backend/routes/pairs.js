const pairs = require('express').Router();
const {
  fetchAllPairLists,
  createNewPairList,
  fetchPairLists,
} = require("../queries/pairs");
const { checkFirebaseToken } = require("../middleware/auth");

pairs.use(checkFirebaseToken);

pairs.get("/", fetchAllPairLists);
pairs.get("/:id", fetchPairLists);
pairs.post("/", createNewPairList);


module.exports = pairs; 