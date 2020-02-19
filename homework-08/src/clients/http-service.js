const http = require('http');
const config = require('./config');

let retryTime = 0;
let retryNum = 0;

const httpReq = (endpoint) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(endpoint.data);

    const options = {
      hostname: endpoint.hostname,
      port: endpoint.port,
      path: endpoint.path,
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        Authorization: endpoint.authorization,
      },
    };

    const req = http.request(options, (res) => {
      res.setEncoding('utf8');

      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        res.data = rawData;
        resolve(res);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end(data);
  });
};

const start = (endpoint, timeout) => {
  setTimeout(async () => {
    try {
      const res = await httpReq(endpoint);
      console.log(res.data);
      if (res.statusCode !== 200) {
        retryNum++;
        retryTime += 10000;
        if (retryNum < config.MAX_RETRIES) start(endpoint, retryTime);
      } else {
        retryNum = 0;
        retryTime = 5000;
        start(endpoint, retryTime);
      }
    } catch (error) {
      console.error(error);
    }
  }, timeout);
};

const httpService = () => {
  config.endpoints.forEach((endpoint) => {
    start(endpoint, retryTime);
  });
};

module.exports = httpService;
