const assert = require('assert');
const { Route } = require('../src/route.js');
const { Station } = require('../src/station.js');

describe('Route', () => {
  let route;
  let source;
  let destination;

  beforeEach(() => {
    source = new Station('CHN', 'CHENNAI', 0);
    destination = new Station('NDL', 'NEW DELHI', 2700);
    route = new Route(source, destination);
  });

  it('Should give stations of the route', () => {
    const expected = [destination, source];
    assert.deepStrictEqual(route.stations, expected);
  });

  it('Should add a station', () => {
    const newStation = new Station('SL', 'SALEM', 350);
    const expected = [destination, source, newStation];

    route.addStation(newStation);
    assert.deepStrictEqual(route.stations, expected);
  });
});
