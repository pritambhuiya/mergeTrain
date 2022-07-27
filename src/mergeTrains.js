/* eslint-disable max-statements */
const remainingDistance = (bogie) => bogie[2];

const merge = (bogiesA, bogiesB) => {
  if (!bogiesB.length) {
    return bogiesA;
  }

  if (!bogiesA.length) {
    return bogiesB;
  }

  const firstBogieA = bogiesA[0];
  const firstBogieB = bogiesB[0];

  if (remainingDistance(firstBogieA) < remainingDistance(firstBogieB)) {
    return [firstBogieA].concat(merge(bogiesA.slice(1), bogiesB));
  }

  return [firstBogieB].concat(merge(bogiesA, bogiesB.slice(1)));
};

const stationsFrom = (junction, route) => route.stationsFrom(junction);

const bogieExists = (bogies, bogie) => bogies.includes(bogie[0]);

const countBogies = (bogies, station) =>
  bogies.filter(bogie => bogie === station[0]);

const bogiesAfterJunction =
  (allStationsFromJunction, remainingBogiesOfTrain) => {
    const remainingBogies = [];

    allStationsFromJunction.forEach((station) => {
      if (bogieExists(remainingBogiesOfTrain, station)) {

        const numberOfBogies = countBogies(remainingBogiesOfTrain, station);
        numberOfBogies.forEach(() => remainingBogies.push(station));
      }
    });

    return remainingBogies;
  };

const mergeTrains = (trainA, trainB) => {
  const { route: routeA, remainingBogiesOfTrainA } = trainA;
  const { route: routeB, remainingBogiesOfTrainB } = trainB;

  const [firstJunctionA] = trainA.junction;
  const [firstJunctionB, lastJunctionB] = trainB.junction;

  const stationsFromJunctionA = stationsFrom(firstJunctionA, routeA);
  const stationsFromJunctionB = stationsFrom(firstJunctionB, routeB);

  const indexOfLastJunction = routeA.indexOf(lastJunctionB);
  const stationsFromLastJunctionInRouteB =
    stationsFromJunctionB.slice(indexOfLastJunction);

  const allStationsFromJunction =
    merge(stationsFromJunctionA, stationsFromLastJunctionInRouteB);

  const bogiesAfterJunctionA =
    bogiesAfterJunction(allStationsFromJunction, remainingBogiesOfTrainA);

  const bogiesAfterJunctionB =
    bogiesAfterJunction(allStationsFromJunction, remainingBogiesOfTrainB);

  const mergedTrain = merge(bogiesAfterJunctionA, bogiesAfterJunctionB);
  return mergedTrain.reverse().map((bogie) => bogie[0]);
};

module.exports = { mergeTrains };
