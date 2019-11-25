let count = 2;
let primeNumber = 2;

const checkPrimeNumber = (number) => {
  for (let i = 2; i < number; i++) {
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
  console.log(primeNumber);
}, 1000);
