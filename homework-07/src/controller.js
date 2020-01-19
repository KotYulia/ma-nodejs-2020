const os = require('os');

const mbConverter = (bytesValue) => {
  return (bytesValue / 1024 ** 2).toFixed(3);
};
const totalSystemMemory = mbConverter(os.totalmem());
const freeSystemMemory = () => {
  return mbConverter(os.freemem());
};
const usedSystemMemory = () => {
  return totalSystemMemory - freeSystemMemory();
};

const errorRes = (resp, code, msg) => {
  resp.setHeader('Content-Type', 'application/json');
  resp.statusCode = code;
  resp.write(
    JSON.stringify({
      message: msg,
    }),
  );
  resp.end();
};

const successfulRes = (resp, bodyRes) => {
  resp.setHeader('Content-Type', 'application/json');
  resp.statusCode = 200;
  resp.write(JSON.stringify(bodyRes));
  resp.end();
};

module.exports = {
  totalSystemMemory,
  freeSystemMemory,
  usedSystemMemory,
  successfulRes,
  errorRes,
};
