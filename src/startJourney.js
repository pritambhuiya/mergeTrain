const { Train } = require('./train.js');
const { createRoute } = require('./route.js');

const createRouteA = () => {
  const source = ['CHN', 'CHENNAI', 0];
  const destination = ['NDL', 'NEW DELHI', 2700];
  const junctions = ['HYB', 'BPL'];
  const stations = [
    ['SLM', 'SALEM', 350],
    ['BLR', 'BANGALORE', 550],
    ['KRN', 'KURNOOL', 900],
    ['HYB', 'HYDERABAD', 1200],
    ['NGP', 'NAGPUR', 1600],
    ['ITJ', 'ITARSI', 1900],
    ['BPL', 'BHOPAL', 2000],
    ['AGA', 'AGRA', 2500]
  ];

  return createRoute(source, destination, stations, junctions);
};

const createRouteB = () => {
  const source = ['TVC', 'TRIVANDRUM', 0];
  const destination = ['GHY', 'GUWAHATI', 4700];
  const junctions = ['HYB', 'BPL'];
  const stations = [
    ['SRR', 'SHORANUR', 300],
    ['MAQ', 'MANGALORE', 600],
    ['MAO', 'MADGAON', 1000],
    ['PNE', 'PUNE', 1400],
    ['HYB', 'HYDERABAD', 2000],
    ['NGP', 'NAGPUR', 2400],
    ['ITJ', 'ITARSI', 2700],
    ['BPL', 'BHOPAL', 2800],
    ['PTA', 'PATNA', 3800],
    ['NJP', 'NEW JALPAIGURI', 4200]
  ];

  return createRoute(source, destination, stations, junctions);
};

const parseTrain = train => train.trim().split(' ');

const parseInput = (trains) => trains.split('\n');

const journeyStatus = (trainStatus, train) =>
  [trainStatus, train.toString()].join(' ');

const createTrain = (train1) => {
  const [nameA, engineA, ...bogiesA] = parseTrain(train1);
  return new Train(nameA, engineA, bogiesA);
};

const journeyDetails = (trainA, trainB, mergedTrain) => {
  const trainAStatus = journeyStatus('ARRIVAL', trainA);
  const trainBStatus = journeyStatus('ARRIVAL', trainB);
  const mergedTrainStatus = mergedTrain.bogies.length ?
    journeyStatus('DEPARTURE', mergedTrain) : 'JOURNEY_ENDED';

  return [trainAStatus, trainBStatus, mergedTrainStatus].join('\n');
};

const startJourney = (trains) => {
  const routeA = createRouteA();
  const routeB = createRouteB();

  const [firstJunction] = routeA.junctions;
  const mergedRoute = routeA.mergeRoutes(routeB, firstJunction);
  const [train1, train2] = parseInput(trains);

  const trainA = createTrain(train1);
  const trainB = createTrain(train2);

  const newTrainA = trainA.detachBogies(mergedRoute);
  const newTrainB = trainB.detachBogies(mergedRoute);

  const remainingStations =
    mergedRoute.stationsDetailsFrom(firstJunction).slice(1);
  const mergedTrain = trainA.mergeTrains(trainB, remainingStations);

  return journeyDetails(newTrainA, newTrainB, mergedTrain);
};

module.exports = { startJourney, parseInput, parseTrain };
