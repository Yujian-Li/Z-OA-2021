const service = require('../service/ticketService.js');

module.exports = {
  getTickets: async (req, res) => {
    const tickets = await service.getTickets();
    res.json(tickets);
  },
};
