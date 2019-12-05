const { start } = require('./callback-func');

start(700)
  .then((diceResultFirstThrow) => {
    console.log(`First throw dice is ${diceResultFirstThrow}`);
    start(1300).then((diceResultSecondThrow) => {
      console.log(`Second throw dice is ${diceResultSecondThrow}`);
      setTimeout(() => {
        const sumResultsThrows = diceResultFirstThrow + diceResultSecondThrow;
        console.log(`Sum of the results of two throws of dices is ${sumResultsThrows}`);
      }, 1000);
    });
  })
  .catch((err) => {
    console.log(err);
  });
