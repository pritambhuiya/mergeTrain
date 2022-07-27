const { Train } = require('../src/trainClass.js');
const { createRoute } = require('../src/route.js');
const assert = require('assert');

describe('Train', () => {
  let train;
  let remainingBogies;

  beforeEach(() => {
    const source = ['CHN', 'CHENNAI', 0];
    const destination = ['NDL', 'NEW DELHI', 40];
    const stations = [
      ['SLM', 'SALEM', 10],
      ['HYB', 'HYDERABAD', 20],
      ['NGP', 'NAGPUR', 30]];
    const route = createRoute(source, destination, stations);

    const junctions = ['HYB', 'NGP'];
    const bogies = ['NDL', 'NDL', 'GHY'];
    remainingBogies = ['NDL', 'GHY'];

    train = new Train(route, junctions, bogies);
  });

  it('Should give bogies', () => {
    assert.deepStrictEqual(train.bogies, ['NDL', 'NDL', 'GHY']);
  });

  it('Should give empty array if no bogies are remaining', () => {
    train.remainingBogies = [];
    assert.deepStrictEqual(train.bogies, []);
  });

  it('Should add remaining bogies', () => {
    train.remainingBogies = remainingBogies;
    assert.deepStrictEqual(train.bogies, ['NDL', 'GHY']);
  });
});
