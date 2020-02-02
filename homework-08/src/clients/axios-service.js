const axios = require('axios');
const config = require('./config');

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
      config.retryNum = 0;
      config.retryTime = 5000;
      start(endpoint, config.retryTime);
    } catch (error) {
      console.error(error.response.data);
      config.retryNum++;
      config.retryTime += 10000;
      if (config.retryNum < config.MAX_RETRIES) start(endpoint, config.retryTime);
    }
  }, timeout);
};

const axiosService = () => {
  config.endpoints.forEach((endpoint) => {
    start(endpoint, config.retryTime);
  });
};

module.exports = axiosService;
