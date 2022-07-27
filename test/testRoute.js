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

  describe('stationsAfter', () => {
    it('Should return stations after SLM', () => {
      route.addStation(salem);
      route.addStation(agara);

      const expected = [['AGA', 'AGARA', 10], ['NDL', 'NEW DELHI', 20]];
      assert.deepStrictEqual(route.stationsAfter('SLM'), expected);
    });

    it('Should return empty array if station is destination', () => {
      const expected = [];
      assert.deepStrictEqual(route.stationsAfter('NDL'), expected);
    });

    it('Should return stations except source if station is source', () => {
      const expected = [['NDL', 'NEW DELHI', 30]];
      assert.deepStrictEqual(route.stationsAfter('CHN'), expected);
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
