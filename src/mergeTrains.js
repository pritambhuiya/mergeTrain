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

const stationsAfter = (junction, route) => route.stationsAfter(junction);

const bogieExists = (bogies, bogie) => bogies.includes(bogie[0]);

const countBogies = (bogies, station) =>
  bogies.filter(bogie => bogie === station[0]);

const bogiesAfterJunction =
  (allStationsAfterJunction, remainingBogiesOfTrain) => {
    const remainingBogies = [];

    allStationsAfterJunction.forEach((station) => {
      if (bogieExists(remainingBogiesOfTrain, station)) {

        const numberOfBogies = countBogies(remainingBogiesOfTrain, station);
        numberOfBogies.forEach(() => remainingBogies.push(station));
      }
    });

    return remainingBogies;
  };

const mergeTrains = (trainA, trainB) => {
  const { route: routeA, remainingBogies: remainingBogiesOfTrainA } = trainA;
  const { route: routeB, remainingBogies: remainingBogiesOfTrainB } = trainB;

  const [firstJunctionA] = trainA.junctions;
  const [firstJunctionB, lastJunctionB] = trainB.junctions;

  const stationsAfterJunctionA = stationsAfter(firstJunctionA, routeA);
  const stationsAfterJunctionB = stationsAfter(firstJunctionB, routeB);

  const indexOfFirstJunction = routeB.indexOf(firstJunctionB);
  const indexOfLastJunction = routeB.indexOf(lastJunctionB);

  const stationsAfterLastJunctionInRouteB =
    stationsAfterJunctionB.slice(indexOfLastJunction - indexOfFirstJunction);

  const allStationsAfterJunction =
    merge(stationsAfterJunctionA, stationsAfterLastJunctionInRouteB);

  const bogiesAfterJunctionA =
    bogiesAfterJunction(allStationsAfterJunction, remainingBogiesOfTrainA);

  const bogiesAfterJunctionB =
    bogiesAfterJunction(allStationsAfterJunction, remainingBogiesOfTrainB);

  const mergedTrain = merge(bogiesAfterJunctionA, bogiesAfterJunctionB);
  return mergedTrain.reverse().map((bogie) => bogie[0]);
};

module.exports = { mergeTrains, merge };
