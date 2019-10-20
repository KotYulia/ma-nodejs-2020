class Planet {
  constructor(name, diameter) {
    this.name = name;
    this.diameter = diameter;
  }

  planetVolume() {
    let radius = Math.abs(this.diameter/2);
    return (4/3) * Math.PI * Math.pow(radius, 3);
  }

  planetInfo() {
    console.log(`${this.name} has volume ${this.planetVolume()} cubic kilometers`);
  }
}

class Earth extends Planet {}

let somePlanet = new Planet("Saturn", 116460);
somePlanet.planetInfo();
let planetEarth = new Earth("Earth", 12742);
planetEarth.planetInfo();