const db = require("../db/index");

const createUser = async (req, res, next) => {
  try {
    const user = await db.none(
      "INSERT INTO users (id, email, class) VALUES(${id}, ${email}, ${class})",
      req.body
    );
    res.json({
      message: "NEW USER CREATED",
    });
  } catch (err) {
    next(err);
  }
};

const fetchCurrentUser = async (req, res, next) => {
  try {
    const user = await db.one(
      "SELECT * FROM users WHERE id=$1", req.user.id
    )
    res.json({
      user, 
      message: "One User"
    })
  } catch(err) {
    next(err);
  }
}
const updateUsersClass = async (req, res, next) => {
  try {
    const user = await db.one(
      'UPDATE users SET class=${class} WHERE email=${email} RETURNING *', {class: req.body.newClass, email: req.body.email}
    )
    res.json({
      user,
      message: "User's class updated"
    })
  } catch(err){
    next(err)
  }
}

module.exports = { createUser, fetchCurrentUser, updateUsersClass };