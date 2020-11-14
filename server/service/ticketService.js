const axios = require('axios');
const ticketConfig = require('../config/ticketConfig');
const authConfig = require('../config/authConfig.json');

module.exports = {
  getTicketList: async () => {
    return await axios.get(ticketConfig.list(), {
      auth: authConfig,
    });
  },

  getTicketById: async (id) => {
    return await axios.get(ticketConfig.ticket(id), {
      auth: authConfig,
    });
  },

  getPageBySize: async (perPage) => {
    return await axios.get(ticketConfig.listBySize(perPage), {
      auth: authConfig,
    });
  },

  getNeighborPage: async (url) => {
    return await axios.get(url, {
      auth: authConfig,
    });
  },

  getPage: async (pageNum, perPage) => {
    return await axios.get(ticketConfig.listByPageAndSize(pageNum, perPage), {
      auth: authConfig,
    });
  },

  getTotal: async () => {
    return await axios.get(ticketConfig.count(), {
      auth: authConfig,
    });
  },
};
