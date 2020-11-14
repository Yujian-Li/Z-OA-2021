const axios = require('axios');
const ticketConfig = require('../config/ticketConfig');
const authConfig = require('../config/authConfig.json');

module.exports = {
  getTicketList: async () => {
    try {
      const response = await axios.get(ticketConfig.list(), {
        auth: authConfig,
      });

      return response.data;
    } catch (ex) {
      console.log(ex);
      return ex.message;
    }
  },

  getTicketById: async (id) => {
    try {
      const response = await axios.get(ticketConfig.ticket(id), {
        auth: authConfig,
      });
      return response.data;
    } catch (ex) {
      return ex.message;
    }
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
