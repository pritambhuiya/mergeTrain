const assert = require('assert');
const { createRoute } = require('../src/route.js');
const { mergeTrains } = require('../src/mergeTrains.js');

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

