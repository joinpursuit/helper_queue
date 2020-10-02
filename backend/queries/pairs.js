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

module.exports = { createNewPairList, fetchAllPairLists };
