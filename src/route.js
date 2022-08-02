const { Station } = require('./station.js');
const { merge } = require('./merge.js');

class Route {
  #source;
  #destination;
  #junctions;
  #stations;

  constructor(source, destination, junctions) {
    this.#source = source;
    this.#destination = destination;
    this.#junctions = junctions;
    this.#stations = [];
  }

  get allStations() {
    return [this.#source, ...this.#stations, this.#destination];
  }

  #stationExists({ code }) {
    return this.allStations.some(station => station.code === code);
  }

  addStation(station) {
    if (this.#stationExists(station)) {
      return false;
    }

    this.#stations.push(station);
    return true;
  }

  get stationCodes() {
    return this.allStations.map(station => station.code);
  }

  #distanceFromSource(code) {
    for (const station of this.allStations) {
      if (station.code === code) {
        return station.distanceFromSource;
      }
    }
  }

  stationsDetailsFrom(station) {
    const location = this.stationCodes.indexOf(station);
    const remainingStations = this.allStations.slice(location);
    const distanceOfStationFromSource = this.#distanceFromSource(station);

    return remainingStations.map(({ code, name, distanceFromSource }) => {
      const distanceToCover = distanceFromSource - distanceOfStationFromSource;
      return [code, name, distanceToCover];
    });
  }

  mergeRoutes(route, fromStation) {
    const mergedRoutes = merge(this.stationsDetailsFrom(fromStation),
      route.stationsDetailsFrom(fromStation));

    const source = mergedRoutes[0];
    const [destination] = mergedRoutes.slice(-1);
    const stations = mergedRoutes.slice(1, -1);

    return createRoute(source, destination, stations, this.#junctions[1]);
  }
}

const createRoute = (source, destination, stations, junctions) => {
  const sourceStation = new Station(...source);
  const destinationStation = new Station(...destination);
  const route = new Route(sourceStation, destinationStation, junctions);

  for (const station of stations) {
    route.addStation(new Station(...station));
  }
  return route;
};

module.exports = { Route, createRoute };
