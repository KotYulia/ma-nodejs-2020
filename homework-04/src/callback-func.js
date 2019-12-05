const throwDice = (throwDiceAction) => {
  const randomNum = Math.floor(Math.random() * 7);
  const errorMsg = 'Lost dice!';
  if (randomNum === 0) {
    return throwDiceAction(new Error(errorMsg));
  }
  return throwDiceAction(null, randomNum);
};

const throwDiceResult = () => {
  return Math.floor(Math.random() * 7);
};

const start = (timeStep) => {
  return new Promise((resolve, reject) => {
    const randomNum = throwDiceResult();
    if (randomNum === 0) {
      reject(new Error('Lost dice!'));
      return;
    }
    setTimeout(() => {
      resolve(randomNum);
    }, timeStep);
  });
};

module.exports = { throwDice, start };
