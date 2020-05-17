const tickets = require("express").Router();
const { createTicket } = require('../queries/tickets');

tickets.post("/", createTicket);

module.exports = tickets;