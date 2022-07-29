const { Train } = require('../src/train.js');
const { createRoute } = require('../src/route.js');
const assert = require('assert');

describe('Train', () => {
  let trainA;
  let trainB;

  beforeEach(() => {
    const junctions = ['HYB', 'NGP'];

    const sourceA = ['CHN', 'CHENNAI', 0];
    const destinationA = ['NDL', 'NEW DELHI', 40];
    const stationsA = [
      ['SLM', 'SALEM', 10],
      ['HYB', 'HYDERABAD', 20],
      ['NGP', 'NAGPUR', 30]];

    const routeA = createRoute(sourceA, destinationA, stationsA);
    trainA = new Train(routeA, junctions, ['NDL', 'NDL', 'GHY']);

    const sourceB = ['TVC', 'TRIVANDRUM', 0];
    const destinationB = ['GHY', 'GUWAHATI', 50];
    const stationsB = [
      ['PNE', 'PUNE', 10],
      ['HYB', 'HYDERABAD', 20],
      ['NGP', 'NAGPUR', 30]];

    const routeB = createRoute(sourceB, destinationB, stationsB);
    trainB = new Train(routeB, junctions, ['GHY', 'PNE']);
  });

  describe('remainingBogies', () => {
    it('Should give bogies', () => {
      assert.deepStrictEqual(trainA.remainingBogies, ['NDL', 'NDL', 'GHY']);
    });

    it('Should give empty array if no bogies are remaining', () => {
      trainA.remainingBogies = [];
      assert.deepStrictEqual(trainA.remainingBogies, []);
    });

    it('Should add remaining bogies', () => {
      trainA.remainingBogies = ['NDL', 'GHY'];
      assert.deepStrictEqual(trainA.remainingBogies, ['NDL', 'GHY']);
    });
  });

  describe('detachBogiesBefore', () => {
    it('Should return all bogies after HYB including another route', () => {
      trainA.bogies = ['NJP', 'SLM', 'AGA'];
      trainA.bogies = ['NJP', 'AGA'];
      assert.deepStrictEqual(trainA.remainingBogies, ['NJP', 'AGA']);
    });

    it('Should return all bogies if no bogies are before HYB', () => {
      trainA.bogies = ['NJP', 'AGA'];
      trainA.detachBogiesBefore('HYB');
      assert.deepStrictEqual(trainA.remainingBogies, ['NJP', 'AGA']);
    });

    it('Should return empty array if no bogies are remaining', () => {
      trainA.bogies = [];
      trainA.detachBogiesBefore('HYB');
      assert.deepStrictEqual(trainA.remainingBogies, []);
    });
  });

  describe('mergeTrains', () => {
    it('Should merge trains', () => {
      assert.deepStrictEqual(
        trainA.mergeTrains(trainB), ['GHY', 'GHY', 'NDL', 'NDL']);
    });

    it('Should return a train if other train has no bogies left', () => {
      trainB.remainingBogies = [];
      assert.deepStrictEqual(trainA.mergeTrains(trainB), ['GHY', 'NDL', 'NDL']);
    });

    it('Should return empty array if both trains have no bogies left', () => {
      trainA.remainingBogies = [];
      trainB.remainingBogies = [];
      assert.deepStrictEqual(trainA.mergeTrains(trainB), []);
    });
  });
});
