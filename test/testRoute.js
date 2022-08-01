const assert = require('assert');
const { Route, createRoute } = require('../src/route.js');
const { Station } = require('../src/station.js');

describe('Route', () => {
  let route;
  let source;
  let destination;
  let salem;
  let agara;

  beforeEach(() => {
    const junctions = ['AGA', 'BPL'];
    source = new Station('CHN', 'CHENNAI', 0);
    destination = new Station('NDL', 'NEW DELHI', 50);
    route = new Route(source, destination, junctions);

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
    it('Should add a station and return true if station doesn\'t exist', () => {
      assert.deepStrictEqual(route.addStation(salem), true);
    });

    it('Should not add a station & return false if station exists', () => {
      route.addStation(salem);
      assert.deepStrictEqual(route.addStation(salem), false);
    });
  });

  describe('stationsBefore', () => {
    it('Should give stations before a station', () => {
      assert.deepStrictEqual(route.stationsBefore('SLM'), ['CHN']);
    });

    it('Should give empty array if station is source', () => {
      assert.deepStrictEqual(route.stationsBefore('CHN'), []);
    });

    it('Should give all stations if station is destination', () => {
      route.addStation(salem);
      assert.deepStrictEqual(route.stationsBefore('NDL'), ['CHN', 'SLM']);
    });
  });

  describe('stationsDetailsAfter', () => {
    it('Should return stations after SLM', () => {
      route.addStation(salem);
      route.addStation(agara);

      const expected = [['AGA', 'AGARA', 10], ['NDL', 'NEW DELHI', 40]];
      assert.deepStrictEqual(route.stationsDetailsAfter('SLM'), expected);
    });

    it('Should return empty array if station is destination', () => {
      const expected = [];
      assert.deepStrictEqual(route.stationsDetailsAfter('NDL'), expected);
    });

    it('Should return stations except source if station is source', () => {
      const expected = [['NDL', 'NEW DELHI', 50]];
      assert.deepStrictEqual(route.stationsDetailsAfter('CHN'), expected);
    });
  });

  describe('CreateRoute', () => {
    it('Should create a route', () => {
      const junctions = ['SLM', 'KRN'];
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

      const route =
        createRoute(source, destination, [salem, kurnool], junctions);
      assert.deepStrictEqual(route.allStations, expected);
    });
  });
});
