/* eslint-disable max-statements */
const { merge } = require('./merge.js');

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

  bogiesAfterJunction(stationsBeforeJunction) {
    return this.bogies.filter(bogie =>
      !stationsBeforeJunction.includes(bogie));
  }

  detachBogiesBefore(junction) {
    const stationCodes = this.route.stationCodes;
    const junctionLocation = this.route.indexOf(junction);

    const stationsBeforeJunction = stationCodes.slice(0, junctionLocation);
    this.bogies = this.bogiesAfterJunction(stationsBeforeJunction);
  }

  stationsAfter(junction) {
    return this.route.stationsAfter(junction);
  }

  mergeTrains(trainB) {
    const { route: routeB, bogies: remainingBogiesOfTrainB } = trainB;

    const [firstJunctionA] = this.junctions;
    const [firstJunctionB, lastJunctionB] = trainB.junctions;

    const stationsAfterJunctionA = this.stationsAfter(firstJunctionA);
    const stationsAfterJunctionB = trainB.stationsAfter(firstJunctionB);

    const indexOfFirstJunction = routeB.indexOf(firstJunctionB);
    const indexOfLastJunction = routeB.indexOf(lastJunctionB);

    const stationsAfterLastJunctionInRouteB =
      stationsAfterJunctionB.slice(indexOfLastJunction - indexOfFirstJunction);

    const allStationsAfterLastJunction =
      merge(stationsAfterJunctionA, stationsAfterLastJunctionInRouteB);

    const bogiesAfterJunctionA = bogiesDetailsAfterJunction(
      allStationsAfterLastJunction, this.remainingBogies);

    const bogiesAfterJunctionB = bogiesDetailsAfterJunction(
      allStationsAfterLastJunction, remainingBogiesOfTrainB);

    const mergedTrain = merge(bogiesAfterJunctionA, bogiesAfterJunctionB);
    return mergedTrain.reverse().map((bogie) => bogie[0]);
  }
}

const bogieExists = (bogies, bogie) => bogies.includes(bogie[0]);

const getDuplicateBogies = (bogies, station) =>
  bogies.filter(bogie => bogie === station[0]);

const bogiesDetailsAfterJunction =
  (allStationsAfterJunction, remainingBogiesOfTrain) => {
    const remainingBogies = [];

    allStationsAfterJunction.forEach((station) => {
      if (bogieExists(remainingBogiesOfTrain, station)) {

        const duplicateBogies =
          getDuplicateBogies(remainingBogiesOfTrain, station);
        duplicateBogies.forEach(() => remainingBogies.push(station));
      }
    });

    return remainingBogies;
  };

const displayNewTrain = (trainName, bogies) =>
  console.log(`ARRIVAL TRAIN_${trainName} ENGINE`, bogies.join(' '));

const displayMergedTrain = (train1, train2, bogies) => {
  const train =
    `DEPARTURE TRAIN_${train1}${train2} ENGINE ENGINE ` + bogies.join(' ');
  console.log(train);
};

module.exports = { Train, displayNewTrain, displayMergedTrain };
