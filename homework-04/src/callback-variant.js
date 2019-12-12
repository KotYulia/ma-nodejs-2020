const { throwDice } = require('./callback-func');

setTimeout(() => {
  throwDice((errorMsgFirstThrow, diceResultFirstThrow) => {
    if (errorMsgFirstThrow) {
      console.log(errorMsgFirstThrow);
    } else {
      console.log(`First throw dice is ${diceResultFirstThrow}`);
      setTimeout(() => {
        throwDice((errorMsgSecondThrow, diceResultSecondThrow) => {
          if (errorMsgSecondThrow) {
            console.log(errorMsgSecondThrow);
          } else {
            console.log(`Second throw dice is ${diceResultSecondThrow}`);
            setTimeout(() => {
              const sumResultsThrows = diceResultFirstThrow + diceResultSecondThrow;
              console.log(`Sum of the results of two throws of dices is ${sumResultsThrows}`);
            }, 1000);
          }
        });
      }, 1300);
    }
  });
}, 700);
