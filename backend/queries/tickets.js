const db = require("../db/index");

const createTicket = async (req, res, next) => {
  req.body.owner_id = req.user.id
 
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
    const openTicket = await db.any("SELECT * FROM tickets WHERE complete = false AND owner_id = $1", req.user.id);
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

const getAllOpenTickets = async (req, res, next) => {
  try {
    if(req.user.email !== "admin@admin.com") throw Error({
      status: 401, 
      message: "Admin Access Only"
    })
    const tickets = await db.any("SELECT tickets.id, tickets.created_at, users.email FROM tickets JOIN users ON users.id = tickets.owner_id WHERE complete = false ORDER BY created_at")
    res.json({
      tickets, 
      message: "ALL OPEN TICKETS!"
    })
  } catch (err) {
    next(err);
  }
}

module.exports = { createTicket, findOpenTicket, deleteOpenTicket, getAllOpenTickets };