let objectA = {name: "Object A"};
console.log(objectA);

let objectB = new Object();
objectB.name = "Object B";
console.log(objectB);

function createObjectC(name) {
  this.name = name;
}
let objectC = new createObjectC("Object C");
console.log(objectC);

class ObjectD {
  constructor(name) {
    this.name = name;
  }
}
let objectD = new ObjectD("Object D");
console.log(objectD);

let objectE = Object.create(null);
objectE.name = "Object E";
console.log(objectE);

function createObjectF(){};
createObjectF.prototype.name = "Object F";
let objectF = new createObjectF();
console.log(objectF);