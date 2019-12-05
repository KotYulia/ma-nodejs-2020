const { start } = require('./callback-func');

(async () => {
  try {
    const diceResultFirstThrow = await start(700);
    console.log(`First throw dice is ${diceResultFirstThrow}`);
    const diceResultSecondThrow = await start(1300);
    console.log(`Second throw dice is ${diceResultSecondThrow}`);
    setTimeout(() => {
      const sumResultsThrows = diceResultFirstThrow + diceResultSecondThrow;
      console.log(`Sum of the results of two throws of dices is ${sumResultsThrows}`);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
})();
