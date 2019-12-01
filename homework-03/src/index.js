let count = 2;
let numberToCheck = 4;
let maxPrimeNumber = 3;

setInterval(() => {
  if (numberToCheck % count === 0) {
    numberToCheck++;
    count = 2;
    return;
  }

  if (count > Math.sqrt(numberToCheck)) {
    maxPrimeNumber = numberToCheck++;
    count = 2;
    return;
  }

  count++;
}, 0);

setInterval(() => {
  const timestamp = Math.floor(Date.now() / 1000);
  console.log(`${timestamp}-- IN PROCESS -- Biggest prime number found: ${maxPrimeNumber}`);
}, 1000);
