const http = require('http');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io')
require('dotenv').config();


const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log("listing on port ", PORT);
})
const io = socket(server);
io.on('connection', (socket) => {
  socket.on("openTicket", (data) => {
    io.sockets.emit("updateTickets", data)
    io.sockets.emit("newTicket", data)
  })
  socket.on("closeTicket", (data) => {
    io.sockets.emit("updateTickets", data)
  })

  socket.on("ticketClosed", () => {
    io.sockets.emit("ticketClose")
  })
  
})





app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", usersRouter)
app.use("/api/tickets", ticketsRouter)

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).json(err);
  } else {
    res.status(500).json(err);
  }
});

