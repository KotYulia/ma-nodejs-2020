const { start, sum } = require('./callback-func');

start(700)
  .then((diceResultFirstThrow) => {
    console.log(`First throw dice is ${diceResultFirstThrow}`);
    start(1300).then((diceResultSecondThrow) => {
      console.log(`Second throw dice is ${diceResultSecondThrow}`);
      sum(diceResultFirstThrow, diceResultSecondThrow, 1000).then((sumResultsThrows) => {
        console.log(`Sum of the results of two throws of dices is ${sumResultsThrows}`);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
