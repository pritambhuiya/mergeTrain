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

  #distanceFromSource(code) {
    for (const station of this.allStations) {
      if (station.code === code) {
        return station.distanceFromSource;
      }
    }
  }

  #distanceBetween(firstStationCode, secondStationCode) {
    const firstStationsDistance = this.#distanceFromSource(firstStationCode);
    const secondStationsDistance = this.#distanceFromSource(secondStationCode);
    return Math.abs(firstStationsDistance - secondStationsDistance);
  }

  stationsFrom(stationCode) {
    const locationOfStation = this.stationCodes.indexOf(stationCode) + 1;
    const remainingStations = this.allStations.slice(locationOfStation);

    return remainingStations.map((station) => {
      const remainingDistance =
        this.#distanceBetween(station.code, stationCode);
      return [station.code, station.name, remainingDistance];
    });
  }

  indexOf(code) {
    return this.stationCodes.indexOf(code);
  }

  get stationCodes() {
    return this.#stations.map(station => station.code);
  }

  get allStations() {
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
