const throwDiceResult = () => {
  return Math.floor(Math.random() * 7);
};

const throwDice = (throwDiceAction) => {
  const throwResult = throwDiceResult();
  const errorMsg = 'Lost dice!';
  if (throwResult === 0) {
    return throwDiceAction(new Error(errorMsg));
  }
  return throwDiceAction(null, throwResult);
};

const start = (timeStep) => {
  return new Promise((resolve, reject) => {
    const throwResult = throwDiceResult();
    if (throwResult === 0) {
      reject(new Error('Lost dice!'));
      return;
    }
    setTimeout(() => {
      resolve(throwResult);
    }, timeStep);
  });
};

const sum = (firstDiceResult, secondDiseResult, timeStep) => {
  return new Promise((resolve) => {
    const results = firstDiceResult + secondDiseResult;
    setTimeout(() => {
      resolve(results);
    }, timeStep);
  });
};

module.exports = { throwDice, start, sum };
