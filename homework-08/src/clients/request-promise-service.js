const requestPromise = require('request-promise-native');
const config = require('./config');

const start = (endpoint, timeout) => {
  setTimeout(async () => {
    const options = {
      method: `${endpoint.method}`,
      url: `http://${endpoint.hostname}:${endpoint.port}${endpoint.path}`,
      headers: {
        Authorization: endpoint.authorization,
      },
      body: JSON.stringify(endpoint.data),
      json: true,
    };
    try {
      const res = await requestPromise(options);
      console.log(res);
      config.retryNum = 0;
      config.retryTime = 5000;
      start(endpoint, config.retryTime);
    } catch (error) {
      console.log(error.response.body);
      config.retryNum++;
      config.retryTime += 10000;
      if (config.retryNum < config.MAX_RETRIES) start(endpoint, config.retryTime);
    }
  }, timeout);
};

const requestPromiseService = () => {
  config.endpoints.forEach((endpoint) => {
    start(endpoint, config.retryTime);
  });
};

module.exports = requestPromiseService;
