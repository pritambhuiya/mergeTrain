const { detachBogiesBeforeJunction } = require('../src/train.js');
const { createRoute } = require('../src/route.js');
const { Station } = require('../src/station.js');
const assert = require('assert');

describe('CreateRoute', () => {
  it('Should create a route', () => {
    const source = ['CHN', 'CHENNAI', 0];
    const destination = ['NDL', 'NEW DELHI', 50];
    const salem = ['SLM', 'SALEM', 10];
    const kurnool = ['KRN', 'KURNOOL', 20];

    const expected = [
      new Station(source),
      new Station(salem),
      new Station(kurnool),
      new Station(destination),
    ];

    const route = createRoute(source, destination, [salem, kurnool]);
    assert.deepStrictEqual(route.stations, expected);
  });
});

describe('detachBogiesBeforeJunction', () => {
  let route;
  beforeEach(() => {
    const source = ['CHN', 'CHENNAI', 0];
    const destination = ['NDL', 'NEW DELHI', 50];
    const stations = [
      ['SLM', 'SALEM', 10],
      ['KRN', 'KURNOOL', 20],
      ['HYB', 'HYDERABAD', 30],
      ['AGA', 'AGRA', 40]
    ];

    route = createRoute(source, destination, stations);
  });

  it('Should return all bogies after HYB', () => {
    const train = {
      route: route, junction: 'HYB', bogies: ['NJP', 'KRN', 'SLM', 'AGA']
    };
    assert.deepStrictEqual(detachBogiesBeforeJunction(train), ['NJP', 'AGA']);
  });

  it('Should return all bogies if no bogies are before HYB', () => {
    const train = { route: route, junction: 'HYB', bogies: ['NJP', 'AGA'] };
    assert.deepStrictEqual(detachBogiesBeforeJunction(train), ['NJP', 'AGA']);
  });

  it('Should return empty array if no bogies are remaining', () => {
    const train = { route: route, junction: 'HYB', bogies: ['SLM', 'KRN'] };
    assert.deepStrictEqual(detachBogiesBeforeJunction(train), []);
  });
});
