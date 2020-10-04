const db = require("../db");

const createNewPairList = async (req, res, next) => {
  try {
    const pairList = await db.one(
      "INSERT INTO pairs" +
        " (title, body)" +
        " VALUES(${title}, ${body}) RETURNING *",
      req.body
    );

    res.json({
      status: 200,
      message: "New Pair List Created",
      pair_list: pairList,
    });
  } catch (err) {
    next(err);
  }
};

const updatePairList = async (req, res, next) => {
  req.body.id = req.params.id
  try {
    const pairList = await db.one(
      "UPDATE pairs" +
        "SET title=${title}, body=${body}, current_day=${current_day} WHERE id=${id} RETURNING *",
      req.body
    );

    res.json({
      status: 200,
      message: "Update Pair List " + req.params.id,
      pair_list: pairList,
    });
  } catch (err) {
    next(err);
  }
};

const fetchAllPairLists = async (req, res, next) => {
  try {
      const pairLists = await db.any("SELECT * FROM pairs");
      res.json({
          status: 200, 
          message: "All Pair Lists", 
          pair_lists: pairLists
      })
  } catch (error) {
    next(err);
  }
};

const fetchPairLists = async (req, res, next) => {
  try {
    const pair_list = await db.one("SELECT * FROM pairs WHERE id = $1", req.params.id)
    res.json({
      status: 200, 
      message: "One pair list",
      pair_list,
    })
  } catch (err) {
    next(err);
    
  }
}

module.exports = {
  createNewPairList,
  fetchAllPairLists,
  fetchPairLists,
  updatePairList,
};
