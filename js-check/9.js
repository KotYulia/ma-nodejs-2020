let timeDelay = time => {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(console.log("done")), time);
  });
};

console.log("start");
timeDelay(4000).then();