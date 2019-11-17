const timeDelay = (timer, text) => {
  return new Promise((resolve, reject) => {
    if (!timer && !text) {
      reject(new Error('One of the parameters was not found'));
      return;
    }
    setTimeout(() => resolve(text), timer);
  });
};

module.exports = timeDelay(4000, 'Done');
