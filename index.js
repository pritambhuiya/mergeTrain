const { createRoute } = require('./src/route.js');
const { detachBogiesBeforeJunction, displayNewTrain } =
  require('./src/train.js');

const createRouteA = () => {
  const source = ['CHN', 'CHENNAI', 0];
  const destination = ['NDL', 'NEW DELHI', 2700];
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

  return createRoute(source, destination, stations);
};

const createRouteB = () => {
  const source = ['TVC', 'TRIVANDRUM', 0];
  const destination = ['GHY', 'GUWAHATI', 4700];
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

  return createRoute(source, destination, stations);
};

const main = () => {
  const routeA = createRouteA();
  const routeB = createRouteB();

  const trainA = {
    route: routeA, junction: 'HYB',
    bogies: ['NDL', 'NDL', 'KRN', 'GHY', 'SLM', 'NJP', 'NGP', 'BLR']
  };

  const trainB = {
    route: routeB, junction: 'HYB',
    bogies: ['NJP', 'GHY', 'AGA', 'PNE', 'MAO', 'BPL', 'PTA']
  };

  displayNewTrain('A', detachBogiesBeforeJunction(trainA));
  displayNewTrain('B', detachBogiesBeforeJunction(trainB));
};

main();
