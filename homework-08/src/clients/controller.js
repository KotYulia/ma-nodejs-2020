const httpService = require('./http-service');
const axiosService = require('./axios-service');
const requestPromiseService = require('./request-promise-service');

const clientService = (name) => {
  switch (name) {
    case 'Axios':
      axiosService();
      break;
    case 'Request promise native':
      requestPromiseService();
      break;
    case 'HTTP client':
      httpService();
      break;
  }
};

module.exports = {
  clientService,
};
