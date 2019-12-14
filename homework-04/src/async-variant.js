const { start, sum } = require('./callback-func');

(async () => {
  try {
    const diceResultFirstThrow = await start(700);
    console.log(`First throw dice is ${diceResultFirstThrow}`);
    const diceResultSecondThrow = await start(1300);
    console.log(`Second throw dice is ${diceResultSecondThrow}`);
    const sumResultsThrows = await sum(diceResultFirstThrow, diceResultSecondThrow, 1000);
    console.log(`Sum of the results of two throws of dices is ${sumResultsThrows}`);
  } catch (error) {
    console.log(error);
  }
})();
