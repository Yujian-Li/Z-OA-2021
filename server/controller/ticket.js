const service = require('../service/ticketService.js');

module.exports = {
  getTicketList: async (req, res) => {
    const tickets = await service.getTicketList();
    res.json(tickets);
  },
  getTicket: async (req, res) => {
    const ticket = await service.getTicket(req.params.id);
    res.json(ticket);
  },
};
