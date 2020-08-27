const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io')
require('dotenv').config();


const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');
const jobsRouter = require('./routes/jobs');
const jobsStatusTimelinesRouter = require('./routes/jobs_status_timelines');
const adminRouter = require('./routes/admin');

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log("listing on port ", PORT);
})
const io = socket(server);
const allUsers = {};

io.on('connection', onConnect)


function onConnect(socket) {
    let email = socket.handshake.query["email"];
    if(email === "admin@admin.com") {
      socket.join('admin');
    } else {
      // socket.join(email)
      allUsers[email] = socket.id;
    }
  socket.on("openRequest", (data) => {
    socket.broadcast.to('admin').emit("newTicket", data);
  });

  socket.on("cancelRequest", (currentUser) => {
    socket.broadcast.to('admin').emit( "cancelRequest", currentUser);
  })

  socket.on("adminRemoveTicket", (ticket) => {
    socket.broadcast.to('admin').emit( "updateTickets", ticket.email);
  })
  
  // socket.on("updateTickets", (email) => {
  //   socket.broadcast.to('admin').emit( "updateTickets", email);
  // });

  socket.on("ticketClosed", (email) => {
    const socketToNotify = allUsers[email];
    console.log("socket to notify: ", socketToNotify)
    io.to(socketToNotify).emit("ticketClose", email);
    // socket.broadcast.to(email).emit("ticketClose")
    socket.broadcast.to('admin').emit( "updateTickets", email);
  });

  socket.on("majorUpdate", () => {
    io.sockets.emit("majorUpdate")
  })

  socket.on("minorUpdate", () => {
    io.sockets.emit("minorUpdate")
  })
}




app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", usersRouter)
app.use("/api/tickets", ticketsRouter)
app.use("/api/jobs", jobsRouter);
app.use("/api/jobs_status_timelines", jobsStatusTimelinesRouter);
app.use("/api/admin", adminRouter)

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).json(err);
  } else {
    res.status(500).json(err);
  }
});

