const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

let findElementIf = element => {
  if (vegetables.includes(element)) {
    console.log("vegetables");
  }
  else if (fruits.includes(element)) {
    console.log("fruits");
  }
  else console.log("Nothing found")
};

let findElementSwitch = element => {
  switch (fruits.includes(element)) {
    case true :
      console.log("fruits");
      break;
    case false :
      switch (vegetables.includes(element)) {
        case true :
          console.log("vegetables");
          break;
        case false :
          console.log("Nothing found");
      }
  }
};


findElementIf('cucumber');
findElementSwitch('banana');