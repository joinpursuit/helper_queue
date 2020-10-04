const pairs = require('express').Router();
const {
  fetchAllPairLists,
  createNewPairList,
  fetchPairLists,
  updatePairList,
  deletePairList,
} = require("../queries/pairs");
const { checkFirebaseToken } = require("../middleware/auth");

pairs.use(checkFirebaseToken);

pairs.get("/", fetchAllPairLists);
pairs.get("/:id", fetchPairLists);
pairs.post("/", createNewPairList);
pairs.put("/:id", updatePairList);
pairs.delete("/:id", deletePairList);


module.exports = pairs; 