const someNumber = -1;
let myNumber = 0;
let number = 3;
if (true) {
  myNumber = 2;
  number = 6;
}

const sum = (firstNumber, secondNumber, thirdNumber) => {
  return firstNumber + secondNumber + thirdNumber;
};

module.exports.sum = sum(someNumber, myNumber, number);
