const axios = require('axios');
const ticketConfig = require('../config/ticketConfig.json');

module.exports = {
  getTickets: async () => {
    try {
      const response = await axios.get(ticketConfig.list, {
        auth: {
          username: ticketConfig.username,
          password: ticketConfig.password,
        },
      });

      return response.data;
    } catch (ex) {
      console.log(ex.message);
      return ex.message;
    }
  },
};
