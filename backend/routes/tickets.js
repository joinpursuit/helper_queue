const tickets = require("express").Router();
const { createTicket, findOpenTicket, deleteOpenTicket, getAllOpenTickets } = require('../queries/tickets');
const { checkFirebaseToken } = require('../middleware/auth');
tickets.use(checkFirebaseToken)
tickets.get("/", getAllOpenTickets)
tickets.post("/", createTicket);
tickets.get("/open_tickets", findOpenTicket)
tickets.delete("/close_tickets/:id", deleteOpenTicket )
module.exports = tickets;

