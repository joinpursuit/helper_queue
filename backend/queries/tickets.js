const db = require("../db/index");

const createTicket = async (req, res, next) => {
  req.body.owner_id = req.user_id
 
  try {
    const user = await db.none(
      "INSERT INTO tickets (body, owner_id) VALUES(${body}, ${owner_id})",
      req.body
    );
    res.json({
      message: "NEW Ticket CREATED",
    });
  } catch (err) {
    next(err);
  }
};

const findOpenTicket = async (req, res, next) => {
  try {
    const openTicket = await db.any("SELECT * FROM tickets WHERE complete = false AND owner_id = $1", req.user_id);
    res.json({
      message: openTicket.length === 0, 
      openTicket
    })
  } catch (err) {
    next(err);
  }
}

const deleteOpenTicket = async (req, res, next) => {
  try {
    await db.none("UPDATE tickets SET complete = true WHERE id = $1", req.params.id)
    res.json({
      message: "success"
    })
  } catch (err) {
    next(err);
  }
}

module.exports = { createTicket, findOpenTicket, deleteOpenTicket };