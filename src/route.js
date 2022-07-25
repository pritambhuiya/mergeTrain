/* eslint-disable complexity */
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

  #stationExistsInStations(station) {
    return this.#stations.some(({ code }) => code === station);
  }

  #isSource(code) {
    return this.#source.code === code;
  }

  #isDestination(code) {
    return this.#destination.code === code;
  }

  stationExists({ code }) {
    return this.#isSource(code) || this.#isDestination(code) ||
      this.#stationExistsInStations(code);
  }

  #distanceFromSource(code) {
    if (this.#isSource(code)) {
      return this.#source.distanceFromSource;
    }

    if (this.#isDestination(code)) {
      return this.#destination.distanceFromSource;
    }

    for (const station of this.#stations) {
      if (station.code === code) {
        return station.distanceFromSource;
      }
    }
  }

  distanceBetween({ code: firstStationCode }, { code: secondStationCode }) {
    const firstStationsDistance = this.#distanceFromSource(firstStationCode);
    const secondStationsDistance = this.#distanceFromSource(secondStationCode);
    return Math.abs(firstStationsDistance - secondStationsDistance);
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
