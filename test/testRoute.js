const assert = require('assert');
const { Route } = require('../src/route.js');
const { Station } = require('../src/station.js');

describe('Route', () => {
  let route;
  let source;
  let destination;
  let salem;
  let agara;

  beforeEach(() => {
    source = new Station('CHN', 'CHENNAI', 0);
    destination = new Station('NDL', 'NEW DELHI', 30);
    route = new Route(source, destination);
    salem = new Station('SLM', 'SALEM', 10);
    agara = new Station('AGA', 'AGARA', 20);
  });

  describe('stationsFrom', () => {
    it('Should return stations after SLM', () => {
      route.addStation(salem);
      route.addStation(agara);

      const expected =
        [['SLM', 'SALEM', 0], ['AGA', 'AGARA', 10], ['NDL', 'NEW DELHI', 20]];
      assert.deepStrictEqual(route.stationsFrom('SLM'), expected);
    });
  });

  describe('allStations', () => {
    it('Should give stations of the route', () => {
      const expected = [destination, source];
      assert.deepStrictEqual(route.allStations, expected);
    });
  });

  describe('addStation', () => {
    it('Should add a station', () => {
      route.addStation(salem);
      const expected = [destination, source, salem];
      assert.deepStrictEqual(route.allStations, expected);
    });
  });
});
