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

const extractBogies = train => train.trim().split(' ').slice(2);

const parseInput = (trains) => trains.split('\n').map(extractBogies);

const allBogies = (bogies) => bogies.join(' ');

const journeyDetails = (trainA, trainB, mergedTrain) => {
  const trains = [];
  trains.push(`ARRIVAL TRAIN_A ENGINE ${allBogies(trainA.bogies)}`);
  trains.push(`ARRIVAL TRAIN_B ENGINE ${allBogies(trainB.bogies)}`);

  let mergedTrainStatus = 'JOURNEY_ENDED';
  if (allBogies(mergedTrain)) {
    mergedTrainStatus =
      'DEPARTURE TRAIN_AB ENGINE ENGINE ' + allBogies(mergedTrain);
  }

  trains.push(mergedTrainStatus);
  return trains;
};

const startJourney = (trains) => {
  const routeA = createRouteA();
  const routeB = createRouteB();

  const [bogiesA, bogiesB] = parseInput(trains);
  const junctions = ['HYB', 'BPL'];

  const trainA = new Train(routeA, junctions, bogiesA);
  const trainB = new Train(routeB, junctions, bogiesB);

  trainA.detachBogiesBefore(junctions[0]);
  trainB.detachBogiesBefore(junctions[0]);

  const mergedTrain = trainA.mergeTrains(trainB);
  return journeyDetails(trainA, trainB, mergedTrain).join('\n');
};

module.exports = { startJourney, parseInput };
