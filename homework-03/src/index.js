let count = 2;
let primeNumber = 2;

const checkPrimeNumber = (number) => {
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
};

setInterval(() => {
  if (checkPrimeNumber(count)) {
    primeNumber = count;
  }
  count++;
}, 0);

setInterval(() => {
  const timestamp = Math.floor(Date.now() / 1000);
  console.log(`${timestamp}-- IN PROCESS -- Biggest prime number found: ${primeNumber}`);
}, 1000);
