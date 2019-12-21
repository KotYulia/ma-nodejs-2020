const os = require('os');

const totalSystemMemory = os.totalmem();
let LIMIT = process.env.LIMIT || 300;
let RATE = process.env.RATE || 1000;
let COLOR = process.env.COLOR || true;
const envArgs = process.argv.slice(2);

envArgs.forEach((item) => {
  const itemParts = item.split('=');
  const envValue = itemParts[0];
  // eslint-disable-next-line default-case
  switch (envValue) {
    case '--rate':
      RATE = itemParts[1];
      break;
    case '--limit':
      LIMIT = itemParts[1];
      break;
    case '--color':
      COLOR = itemParts[1];
      break;
  }
});

const freeSystemMemory = () => {
  return os.freemem();
};
const usedSystemMemory = () => {
  return totalSystemMemory - freeSystemMemory();
};
const mbConverter = (bytesValue) => {
  return (bytesValue / 1024 ** 2).toFixed(1);
};

const colorLog = (color) => {
  let msgColor;
  switch (color) {
    case 'green':
      msgColor = '\x1b[92m';
      break;
    case 'red':
      msgColor = '\x1b[91m';
      break;
    default:
      msgColor = '\x1b[39m';
  }
  return `${msgColor}`;
};

let prevUsedMemory = usedSystemMemory();

setInterval(() => {
  console.clear();

  const currentFreeMemory = mbConverter(freeSystemMemory());
  const currentUsedMemory = usedSystemMemory();
  const deltaUsedMemory = currentUsedMemory - prevUsedMemory;
  prevUsedMemory = currentUsedMemory;

  console.log(`${colorLog()} Total system memory: ${mbConverter(totalSystemMemory)} Mb;
 Allocated memory: ${mbConverter(currentUsedMemory)} Mb;`);
  if (parseFloat(currentFreeMemory) < parseFloat(LIMIT)) {
    if (COLOR === true) {
      console.log(`${colorLog()} Free memory available: ${colorLog('red')} ${currentFreeMemory} Mb;
  !!! ATTENTION: Available memory is under the defined limit !!!`);
    } else {
      console.log(`${colorLog()} Free memory available: ${currentFreeMemory} Mb;
  !!! ATTENTION: Available memory is under the defined limit !!!`);
    }
  } else {
    console.log(`${colorLog()} Free memory available: ${currentFreeMemory} Mb;`);
  }

  if (COLOR === true) {
    if (deltaUsedMemory < 0) {
      console.log(`${colorLog()} Delta: ${colorLog('red')} ${mbConverter(deltaUsedMemory)}`);
    } else {
      console.log(`${colorLog()} Delta: ${colorLog('green')} ${mbConverter(deltaUsedMemory)}`);
    }
  } else {
    console.log(`${colorLog()} Delta: ${mbConverter(deltaUsedMemory)}`);
  }
}, RATE);
