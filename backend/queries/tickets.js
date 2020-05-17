const db = require("../db/index");

const createTickets = async (req, res, next) => {
  try {
    const user = await db.none(
      "INSERT INTO tickets (id, body, owner_id) VALUES(${id}, ${body}, ${owner_id})",
      req.body
    );
    res.json({
      message: "NEW Ticket CREATED",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTickets };