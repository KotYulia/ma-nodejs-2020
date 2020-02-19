const requestPromise = require('request-promise-native');
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
      body: JSON.stringify(endpoint.data),
      json: true,
    };
    try {
      const res = await requestPromise(options);
      console.log(res);
      retryNum = 0;
      retryTime = 5000;
      start(endpoint, retryTime);
    } catch (error) {
      console.log(error.response.body);
      retryNum++;
      retryTime += 10000;
      if (retryNum < config.MAX_RETRIES) start(endpoint, retryTime);
    }
  }, timeout);
};

const requestPromiseService = () => {
  config.endpoints.forEach((endpoint) => {
    start(endpoint, retryTime);
  });
};

module.exports = requestPromiseService;
