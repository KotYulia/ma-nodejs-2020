module.exports = (callbackFunc) => {
  const randomNum = Math.floor(Math.random() * 7);
  const errorMsg = 'Lost dice!';
  if (randomNum === 0) {
    return callbackFunc(new Error(errorMsg));
  }
  return callbackFunc(null, randomNum);
};
