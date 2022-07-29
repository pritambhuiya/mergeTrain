const { Train } = require('../src/train.js');
const { createRoute } = require('../src/route.js');
const assert = require('assert');

describe('Train', () => {
  let train;
  let route;

  beforeEach(() => {
    const source = ['CHN', 'CHENNAI', 0];
    const destination = ['NDL', 'NEW DELHI', 40];
    const stations = [
      ['SLM', 'SALEM', 10],
      ['HYB', 'HYDERABAD', 20],
      ['NGP', 'NAGPUR', 30]];
    route = createRoute(source, destination, stations);

    const junctions = ['HYB', 'NGP'];
    const bogies = ['NDL', 'NDL', 'GHY'];

    train = new Train(route, junctions, bogies);
  });

  describe('remainingBogies', () => {
    it('Should give bogies', () => {
      assert.deepStrictEqual(train.remainingBogies, ['NDL', 'NDL', 'GHY']);
    });

    it('Should give empty array if no bogies are remaining', () => {
      train.remainingBogies = [];
      assert.deepStrictEqual(train.remainingBogies, []);
    });

    it('Should add remaining bogies', () => {
      train.remainingBogies = ['NDL', 'GHY'];
      assert.deepStrictEqual(train.remainingBogies, ['NDL', 'GHY']);
    });
  });

  describe('detachBogiesBefore', () => {
    it('Should return all bogies after HYB including another route', () => {
      train.bogies = ['NJP', 'SLM', 'AGA'];
      train.bogies = ['NJP', 'AGA'];
      assert.deepStrictEqual(train.remainingBogies, ['NJP', 'AGA']);
    });

    it('Should return all bogies if no bogies are before HYB', () => {
      train.bogies = ['NJP', 'AGA'];
      train.detachBogiesBefore('HYB');
      assert.deepStrictEqual(train.remainingBogies, ['NJP', 'AGA']);
    });

    it('Should return empty array if no bogies are remaining', () => {
      train.bogies = [];
      train.detachBogiesBefore('HYB');
      assert.deepStrictEqual(train.remainingBogies, []);
    });
  });
});
