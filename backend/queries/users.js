const db = require("../db/index");

const createUser = async (req, res, next) => {
  try {
    const user = await db.none(
      "INSERT INTO users (id, email) VALUES(${id}, ${email})",
      req.body
    );
    res.json({
      message: "NEW USER CREATED",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser };