class Train {
  constructor(route, junctions, bogies) {
    this.route = route;
    this.junctions = junctions;
    this.bogies = bogies;
  }

  set remainingBogies(remainingBogies) {
    this.bogies = remainingBogies;
  }

  get remainingBogies() {
    return this.bogies;
  }
}

module.exports = { Train };
