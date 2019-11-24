const { task1: amount, task2: info, task3: result } = require('./task');

const boot = async () => {
  console.log(amount.sum);
  try {
    const res = await result;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  info.planetInfo();
};

boot();
