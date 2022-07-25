const { Station } = require('./station.js');

class Route {
  #source;
  #destination;
  #stations;

  constructor(source, destination) {
    this.#source = source;
    this.#destination = destination;
    this.#stations = [];
  }

  addStation(station) {
    this.#stations.push(station);
  }

  get stations() {
    return [this.#source, ...this.#stations, this.#destination];
  }
}

const createRoute = (source, destination, stations) => {
  const sourceStation = new Station(...source);
  const destinationStation = new Station(...destination);
  const route = new Route(sourceStation, destinationStation);

  for (const station of stations) {
    route.addStation(new Station(...station));
  }
  return route;
};

module.exports = { Route, createRoute };
