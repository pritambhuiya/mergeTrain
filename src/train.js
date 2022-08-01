/* eslint-disable max-statements */
const { merge } = require('./merge.js');

class Train {
  #route;
  #junctions;
  #bogies;

  constructor(route, junctions, bogies) {
    this.#route = route;
    this.#junctions = junctions;
    this.#bogies = bogies;
  }

  set bogies(remainingBogies) {
    this.#bogies = remainingBogies;
  }

  get bogies() {
    return this.#bogies;
  }

  get junctions() {
    return this.#junctions;
  }

  get route() {
    return this.#route;
  }

  #bogiesAfterJunction(stationsBeforeJunction) {
    return this.#bogies.filter(bogie =>
      !stationsBeforeJunction.includes(bogie));
  }

  detachBogiesBefore(junction) {
    const stationCodes = this.route.stationCodes;
    const junctionLocation = this.route.indexOf(junction);

    const stationsBeforeJunction = stationCodes.slice(0, junctionLocation);
    this.#bogies = this.#bogiesAfterJunction(stationsBeforeJunction);
  }

  #stationsAfter(junction) {
    return this.route.stationsAfter(junction);
  }

  #bogieExists(bogie) {
    return this.#bogies.includes(bogie[0]);
  }

  #getDuplicateBogies(station) {
    return this.bogies.filter(bogie => bogie === station[0]);
  }

  #bogiesDetailsAfterJunction(allStationsAfterJunction) {
    const remainingBogies = [];

    allStationsAfterJunction.forEach((station) => {
      if (this.#bogieExists(station)) {

        const duplicateBogies = this.#getDuplicateBogies(station);
        duplicateBogies.forEach(() => remainingBogies.push(station));
      }
    });

    return remainingBogies;
  }

  mergeTrains(trainB) {
    const { route: routeB } = trainB;

    const [firstJunctionA] = this.#junctions;
    const [firstJunctionB, lastJunctionB] = trainB.junctions;

    const stationsAfterJunctionA = this.#stationsAfter(firstJunctionA);
    const stationsAfterJunctionB = trainB.#stationsAfter(firstJunctionB);

    const indexOfFirstJunction = routeB.indexOf(firstJunctionB);
    const indexOfLastJunction = routeB.indexOf(lastJunctionB);

    const stationsAfterLastJunctionInRouteB =
      stationsAfterJunctionB.slice(indexOfLastJunction - indexOfFirstJunction);

    const allStationsAfterLastJunction =
      merge(stationsAfterJunctionA, stationsAfterLastJunctionInRouteB);

    const bogiesAfterJunctionA = this.#bogiesDetailsAfterJunction(
      allStationsAfterLastJunction);

    const bogiesAfterJunctionB = trainB.#bogiesDetailsAfterJunction(
      allStationsAfterLastJunction);

    const mergedTrain = merge(bogiesAfterJunctionA, bogiesAfterJunctionB);
    return mergedTrain.reverse().map((bogie) => bogie[0]);
  }
}

// const displayNewTrain = (trainName, allBogies) =>
//   console.log(`ARRIVAL TRAIN_${trainName} ENGINE`, allBogies);

// const displayMergedTrain = (train1, train2, allBogies) => {
//   const train =
//     `DEPARTURE TRAIN_${train1}${train2} ENGINE ENGINE ` + allBogies;
//   console.log(train);
// };

class Train {
  #name;
  #numberOfEngines;
  #bogies;

  constructor(name, numberOfEngines, bogies) {
    this.#name = name;
    this.#numberOfEngines = numberOfEngines;
    this.#bogies = bogies;
  }

  set bogies(remainingBogies) {
    this.#bogies = remainingBogies;
  }

  get bogies() {
    return this.#bogies;
  }

  toString() {
    const allBogies = this.#bogies.join(' ');
    if (!allBogies) {
      return 'JOURNEY_ENDED';
    }

    const engines = 'ENGINE '.repeat(this.#numberOfEngines);
    return `TRAIN_${this.#name} ${engines}${allBogies}`;
  }

}

module.exports = { Train };
