const { response } = require('express');
const service = require('../service/ticketService.js');

module.exports = {
  //getTicketList is not in user
  getTicketList: async (req, res) => {
    try {
      const response = await service.getTicketList();
      res.json(response.data);
    } catch (ex) {
      console.log(ex);
      res.json({ error: ex.message });
    }
  },

  getTicketById: async (req, res) => {
    try {
      const response = await service.getTicketById(req.params.id);
      res.json(response.data);
    } catch (ex) {
      console.log(ex);
      res.json({ error: ex.message });
    }
  },

  getPageBySize: async (req, res) => {
    try {
      const response = await service.getPageBySize(req.query.perPage);
      res.json({ tickets: response.data });
    } catch (ex) {
      console.log(ex);
      res.json({ error: ex.message });
    }
  },
  getNeighborPage: async (req, res) => {
    try {
      const response = await service.getNeighborPage(req.query.url);
      res.json({ tickets: response.data });
    } catch (ex) {
      console.log(ex);
      res.json({ error: ex.message });
    }
  },
  getPage: async (req, res) => {
    try {
      const response = await service.getPage(
        req.query.pageNum,
        req.query.perPage
      );
      res.json({ tickets: response.data });
    } catch (ex) {
      console.log(ex);
      res.json({ error: ex.message });
    }
  },
  getTotal: async (req, res) => {
    try {
      const response = await service.getTotal();
      res.json({ count: response.data.count });
    } catch (ex) {
      console.log(ex);
      res.json({ error: ex.message });
    }
  },
};
