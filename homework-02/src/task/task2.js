// eslint-disable-next-line max-classes-per-file
class Planet {
  constructor(name, diameter) {
    this.name = name;
    this.diameter = diameter;
  }

  planetVolume() {
    const radius = Math.abs(this.diameter / 2);
    return (4 / 3) * Math.PI * radius ** 3;
  }

  planetInfo() {
    console.log(`${this.name} has volume ${this.planetVolume()} cubic kilometers`);
  }
}

class Earth extends Planet {}

const planetEarth = new Earth('Earth', 12742);
module.exports = planetEarth;