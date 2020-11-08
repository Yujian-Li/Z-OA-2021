const axios = require('axios');

const SERVER_ROOT = process.env.VUE_APP_SERVER_ROOT || '';

async function get(path, params) {
  try {
    return await axios.get(SERVER_ROOT + path, { params });
  } catch (ex) {
    console.log('Cannot get: ' + path + ' ' + ex.message);
  }
  return null;
}

module.exports = {
  get,
};
