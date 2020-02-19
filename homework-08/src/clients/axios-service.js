const axios = require('axios');
const config = require('./config');

let retryTime = 0;
let retryNum = 0;

const start = (endpoint, timeout) => {
  setTimeout(async () => {
    const options = {
      method: `${endpoint.method}`,
      url: `http://${endpoint.hostname}:${endpoint.port}${endpoint.path}`,
      headers: {
        Authorization: endpoint.authorization,
      },
      data: endpoint.data,
    };
    try {
      const res = await axios(options);
      console.log(res.data);
      retryNum = 0;
      retryTime = 5000;
      start(endpoint, retryTime);
    } catch (error) {
      console.error(error.response.data);
      retryNum++;
      retryTime += 10000;
      if (retryNum < config.MAX_RETRIES) start(endpoint, retryTime);
    }
  }, timeout);
};

const axiosService = () => {
  config.endpoints.forEach((endpoint) => {
    start(endpoint, retryTime);
  });
};

module.exports = axiosService;
