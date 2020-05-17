const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');

const PORT = process.env.PORT;
const app = express();

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


app.listen(PORT, () => {
    console.log("listing on port ", PORT);
})