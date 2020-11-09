const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const ticketController = require('./controller/ticket.js');
app.get('/tickets', ticketController.getTicketList);
app.get('/tickets/:id', ticketController.getTicket);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
