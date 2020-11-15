const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const ticketController = require('./controller/ticket.js');
app.get('/tickets', ticketController.getTicketList);
app.get('/tickets/ticket/:id', ticketController.getTicketById);
app.get('/tickets/count', ticketController.getTotal);
app.get('/tickets/pagebysize', ticketController.getPageBySize);
app.get('/tickets/neighbor', ticketController.getNeighborPage);
app.get('/tickets/page', ticketController.getPage);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
