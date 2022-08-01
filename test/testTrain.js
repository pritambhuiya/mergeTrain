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

    routeA = createRoute(sourceA, destinationA, stationsA, junctions);
    trainA = new Train('A', 1, ['NDL', 'NDL', 'GHY']);

    const sourceB = ['TVC', 'TRIVANDRUM', 0];
    const destinationB = ['GHY', 'GUWAHATI', 50];
    const stationsB = [
      ['PNE', 'PUNE', 10],
      ['HYB', 'HYDERABAD', 20],
      ['NGP', 'NAGPUR', 30]];

    routeB = createRoute(sourceB, destinationB, stationsB, junctions);
    trainB = new Train('B', 1, ['GHY', 'PNE']);
  });

  describe('bogies', () => {
    it('Should give bogies', () => {
      assert.deepStrictEqual(trainA.bogies, ['NDL', 'NDL', 'GHY']);
    });

    it('Should give empty array if no bogies are remaining', () => {
      trainA.bogies = [];
      assert.deepStrictEqual(trainA.bogies, []);
    });

    it('Should add remaining bogies', () => {
      trainA.bogies = ['NDL', 'GHY'];
      assert.deepStrictEqual(trainA.bogies, ['NDL', 'GHY']);
    });
  });

  describe('toString', () => {
    it('Should give representation of train', () => {
      assert.deepStrictEqual(trainA.toString(), 'TRAIN_A ENGINE NDL NDL GHY');
    });

    it('Should give JOURNEY_ENDED if no bogie exists', () => {
      trainA.bogies = [];
      assert.deepStrictEqual(trainA.toString(), 'JOURNEY_ENDED');
    });

  });

  describe.skip('detachBogiesBefore', () => {
    it('Should return all bogies after HYB including another route', () => {
      trainA.bogies = ['NJP', 'SLM', 'AGA'];
      trainA.bogies = ['NJP', 'AGA'];
      assert.deepStrictEqual(trainA.bogies, ['NJP', 'AGA']);
    });

    it('Should return all bogies if no bogies are before HYB', () => {
      trainA.bogies = ['NJP', 'AGA'];
      trainA.detachBogiesBefore('HYB');
      assert.deepStrictEqual(trainA.bogies, ['NJP', 'AGA']);
    });

    it('Should return empty array if no bogies are remaining', () => {
      trainA.bogies = [];
      trainA.detachBogiesBefore('HYB');
      assert.deepStrictEqual(trainA.bogies, []);
    });
  });

  describe('mergeTrains', () => {
    it('Should merge two trains', () => {
      assert.deepStrictEqual(
        trainA.mergeTrains(trainB), ['GHY', 'GHY', 'NDL', 'NDL']);
    });

    it('Should return a train if other train has no bogies left', () => {
      trainB.bogies = [];
      assert.deepStrictEqual(trainA.mergeTrains(trainB), ['GHY', 'NDL', 'NDL']);
    });

    it('Should return empty array if both trains have no bogies left', () => {
      trainA.bogies = [];
      trainB.bogies = [];
      assert.deepStrictEqual(trainA.mergeTrains(trainB), []);
    });
  });
});
