const timeDelay = (timer, text) => {
  return new Promise((resolve, reject) => {
    if (timer < 0 || typeof text !== 'string') {
      reject(new Error('One of the parameters was not correct'));
      return;
    }
    setTimeout(() => resolve(text), timer);
  });
};

module.exports = timeDelay(200, 'Done');
