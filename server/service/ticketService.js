const axios = require('axios');
const ticketConfig = require('../config/ticketConfig.json');
const authConfig = require('../config/authConfig.json');

module.exports = {
  getTicketList: async () => {
    try {
      const response = await axios.get(ticketConfig.list, {
        auth: authConfig,
      });

      return response.data;
    } catch (ex) {
      console.log(ex.message);
      return ex.message;
    }
  },

  getTicket: async (id) => {
    try {
      const response = await axios.get(ticketConfig.ticket + id + '.json', {
        auth: authConfig,
      });
      return response.data;
    } catch (ex) {
      console.log(ex.message);
      return ex.message;
    }
  },
};
