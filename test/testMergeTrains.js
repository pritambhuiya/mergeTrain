const assert = require('assert');
const { createRoute } = require('../src/route.js');
const { mergeTrains, merge } = require('../src/mergeTrains.js');

describe('mergeTrains', () => {
  let trainA;
  let trainB;

  beforeEach(() => {
    const sourceA = ['CHN', 'CHENNAI', 0];
    const destinationA = ['NDL', 'NEW DELHI', 40];
    const stationsA = [
      ['SLM', 'SALEM', 10],
      ['HYB', 'HYDERABAD', 20],
      ['NGP', 'NAGPUR', 30]];
    const routeA = createRoute(sourceA, destinationA, stationsA);

    const sourceB = ['TVC', 'TRIVANDRUM', 0];
    const destinationB = ['GHY', 'GUWAHATI', 50];
    const stationsB = [
      ['PNE', 'PUNE', 10],
      ['HYB', 'HYDERABAD', 20],
      ['NGP', 'NAGPUR', 30]];
    const routeB = createRoute(sourceB, destinationB, stationsB);

    trainA = {
      route: routeA, junctions: ['HYB', 'NGP'],
      bogies: ['NDL', 'NDL', 'GHY'],
      remainingBogies: ['NDL', 'NDL', 'GHY']
    };

    trainB = {
      route: routeB, junctions: ['HYB', 'NGP'],
      bogies: ['GHY', 'PNE'],
      remainingBogies: ['GHY']
    };
  });

  it('Should merge trains', () => {
    assert.deepStrictEqual(
      mergeTrains(trainA, trainB), ['GHY', 'GHY', 'NDL', 'NDL']);
  });

  it('Should return a train if other train has no bogies left', () => {
    trainB.remainingBogies = [];
    assert.deepStrictEqual(
      mergeTrains(trainA, trainB), ['GHY', 'NDL', 'NDL']);
  });

  it('Should return empty array if both trains have no bogies left', () => {
    trainA.remainingBogies = [];
    trainB.remainingBogies = [];
    assert.deepStrictEqual(
      mergeTrains(trainA, trainB), []);
  });
});

describe('merge', () => {
  let bogiesA;
  let bogiesB;

  beforeEach(() => {
    bogiesA = [
      ['NGP', 'NAGPUR', 0],
      ['ITJ', 'ITARSI', 20]
    ];

    bogiesB = [
      ['BPL', 'BHOPAL', 10],
      ['AGA', 'AGRA', 30],
      ['NDL', 'NEW DELHI', 40]
    ];
  });

  it('Should merge bogies of two trains', () => {
    const expected = [
      ['NGP', 'NAGPUR', 0],
      ['BPL', 'BHOPAL', 10],
      ['ITJ', 'ITARSI', 20],
      ['AGA', 'AGRA', 30],
      ['NDL', 'NEW DELHI', 40]
    ];
    assert.deepStrictEqual(merge(bogiesA, bogiesB), expected);
  });

  it('Should return bogies of second train if first train has no bogie', () => {
    bogiesA = [];
    const expected = [
      ['BPL', 'BHOPAL', 10],
      ['AGA', 'AGRA', 30],
      ['NDL', 'NEW DELHI', 40]
    ];
    assert.deepStrictEqual(merge(bogiesA, bogiesB), expected);
  });
});
