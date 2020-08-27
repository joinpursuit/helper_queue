const db = require("../db/index");

const createTicket = async (req, res, next) => {
  req.body.owner_id = req.user.id
 
  try {
    await db.none("UPDATE tickets SET complete = true WHERE owner_id = $1", req.user.id)
    const ticket = await db.one(
      "INSERT INTO tickets (body, owner_id) VALUES(${body}, ${owner_id}) RETURNING *",
      req.body
    );
    res.json({
      message: "NEW Ticket CREATED",
      ticket
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
    let owner = await db.one(
      "SELECT id FROM users WHERE email = $1  ",
      req.params.id
    );
    await db.none("DELETE FROM tickets WHERE owner_id = $1", owner.id)
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
    const tickets = await db.any("SELECT tickets.id, tickets.created_at, users.email, users.class FROM tickets JOIN users ON users.id = tickets.owner_id WHERE complete = false ORDER BY created_at")
    res.json({
      tickets, 
      message: "ALL OPEN TICKETS!"
    })
  } catch (err) {
    console.log("ERROR IN GET TICKETS")
    next(err);
  }
}

module.exports = { createTicket, findOpenTicket, deleteOpenTicket, getAllOpenTickets };