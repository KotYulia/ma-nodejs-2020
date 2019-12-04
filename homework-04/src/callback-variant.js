const throwDice = require('./callback-func');

setTimeout(() => {
  throwDice((errorMsgFirstThrow, randomNumFirstThrow) => {
    if (errorMsgFirstThrow) {
      console.log(errorMsgFirstThrow);
    } else {
      console.log(`First throw dice is ${randomNumFirstThrow}`);
      setTimeout(() => {
        throwDice((errorMsgSecondThrow, randomNumSecondThrow) => {
          if (errorMsgSecondThrow) {
            console.log(errorMsgSecondThrow);
          } else {
            console.log(`Second throw dice is ${randomNumSecondThrow}`);
            setTimeout(() => {
              const sumRandomNum = randomNumFirstThrow + randomNumSecondThrow;
              console.log(`Sum of the results of two throws of dices is ${sumRandomNum}`);
            }, 1000);
          }
        });
      }, 1300);
    }
  });
}, 700);
