const tickets = require("express").Router();
const { createTicket, findOpenTicket, deleteOpenTicket, getAllOpenTickets } = require('../queries/tickets');
const { checkFirebaseToken } = require('../middleware/auth');

tickets.get("/", checkFirebaseToken, getAllOpenTickets)
tickets.post("/", checkFirebaseToken, createTicket);

tickets.get("/open_tickets",checkFirebaseToken, findOpenTicket )
tickets.delete("/close_tickets/:id",checkFirebaseToken, deleteOpenTicket )
module.exports = tickets;