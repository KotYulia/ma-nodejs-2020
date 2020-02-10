const fs = require('fs');
const { pipeline, Transform } = require('stream');

const config = require('../config');

const mbConverter = mbValue => {
  return mbValue * 1024 * 1024;
};

const currentSpeedLimit = mbConverter(config.maxSpeedLimit);

class Sender extends Transform {
  constructor(speed) {
    super();
    this.speed = speed;
    this.count = 0;
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(chunk, encoding, next) {
    const timeout = (chunk.length / this.speed) * 1000;

    setTimeout(() => {
      this.count += chunk.length;
      if (this.count >= this.speed) {
        process.stdout.write('+');
        this.count = 0;
      }
      this.push(chunk);
      next();
    }, timeout);
  }
}

function sendJPEG(res) {
  let speedLimit = config.minSpeedLimit;
  const imgStream = fs.createReadStream(config.filePath);

  if (currentSpeedLimit > config.minSpeedLimit) {
    speedLimit = currentSpeedLimit;
  }

  const sender = new Sender(speedLimit);

  pipeline(imgStream, sender, res, err => {
    if (err) {
      console.error('Image load failed.', err.message);
    } else {
      console.log('\nImage loaded.');
    }
  });
}

module.exports = {
  sendJPEG,
};
