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

const startJourney = (trains) => {
  const routeA = createRouteA();
  const routeB = createRouteB();

  const junctions = ['HYB', 'BPL'];
  const [train1, train2] = parseInput(trains);

  const [nameA, engineA, ...bogiesA] = parseTrain(train1);
  const [nameB, engineB, ...bogiesB] = parseTrain(train2);

  const trainA = new Train(nameA, engineA, bogiesA);
  const trainB = new Train(nameB, engineB, bogiesB);
  const mergedRoute = routeA.mergeRoutes(routeB, junctions[0]);

  const newTrainA = trainA.detachBogies(mergedRoute);
  const newTrainB = trainB.detachBogies(mergedRoute);

  const remainingStations =
    mergedRoute.stationsDetailsFrom(junctions[0]).slice(1);
  const mergedTrain = trainA.mergeTrains(trainB, remainingStations);

  const trainAStatus = journeyStatus('ARRIVAL', newTrainA);
  const trainBStatus = journeyStatus('ARRIVAL', newTrainB);
  const mergedTrainStatus = mergedTrain.bogies.length ?
    journeyStatus('DEPARTURE', mergedTrain) : 'JOURNEY_ENDED';

  return [trainAStatus, trainBStatus, mergedTrainStatus].join('\n');
};

module.exports = { startJourney, parseInput, parseTrain };
