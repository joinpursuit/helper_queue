const tickets = require("express").Router();
const { createTicket, findOpenTicket, deleteOpenTicket } = require('../queries/tickets');
const { checkFirebaseToken } = require('../middleware/auth');

tickets.post("/", checkFirebaseToken, createTicket);

tickets.get("/open_tickets",checkFirebaseToken, findOpenTicket )
tickets.delete("/close_tickets/:id",checkFirebaseToken, deleteOpenTicket )


module.exports = tickets;