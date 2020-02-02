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

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const randomWithProbability = (resp) => {
  if (randomInteger(1, 10) < 4) {
    errorRes(resp, 404, 'Error 404');
  } else {
    successfulRes(resp, { message: 'Status code: 200' });
  }
};

module.exports = {
  totalSystemMemory,
  freeSystemMemory,
  usedSystemMemory,
  successfulRes,
  errorRes,
  randomWithProbability,
};
