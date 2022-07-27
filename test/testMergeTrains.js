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
      route: routeA, junction: ['HYB', 'NGP'],
      bogies: ['NDL', 'NDL', 'GHY'],
      remainingBogiesOfTrainA: ['NDL', 'NDL', 'GHY']
    };

    trainB = {
      route: routeB, junction: ['HYB', 'NGP'],
      bogies: ['GHY', 'PNE'],
      remainingBogiesOfTrainB: ['GHY']
    };
  });

  it('Should merge trains', () => {
    assert.deepStrictEqual(
      mergeTrains(trainA, trainB), ['GHY', 'GHY', 'NDL', 'NDL']);
  });

  it('Should return a train if other train has no bogies left', () => {
    trainB.remainingBogiesOfTrainB = [];
    assert.deepStrictEqual(
      mergeTrains(trainA, trainB), ['GHY', 'NDL', 'NDL']);
  });

  it('Should return empty array if both trains have no bogies left', () => {
    trainA.remainingBogiesOfTrainA = [];
    trainB.remainingBogiesOfTrainB = [];
    assert.deepStrictEqual(
      mergeTrains(trainA, trainB), []);
  });
});

