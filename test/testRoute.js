const assert = require('assert');
const { Route, createRoute } = require('../src/route.js');
const { Station } = require('../src/station.js');

describe('Route', () => {
  let route;
  let source;
  let destination;
  let junctions;

  let salem;
  let agara;

  beforeEach(() => {
    junctions = ['AGA', 'BPL'];
    source = new Station('CHN', 'CHENNAI', 0);
    destination = new Station('NDL', 'NEW DELHI', 50);
    route = new Route(source, destination, junctions);

    salem = new Station('SLM', 'SALEM', 10);
    agara = new Station('AGA', 'AGARA', 20);
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

  describe('stationsDetailsFrom', () => {
    it('Should return stations after SLM', () => {
      route.addStation(salem);
      route.addStation(agara);

      const expected = [['AGA', 'AGARA', 0], ['NDL', 'NEW DELHI', 30]];
      assert.deepStrictEqual(route.stationsDetailsFrom('AGA'), expected);
    });

    it('Should return destination if station is destination', () => {
      const expected = [['NDL', 'NEW DELHI', 0]];
      assert.deepStrictEqual(route.stationsDetailsFrom('NDL'), expected);
    });

    it('Should return all stations if station is source', () => {
      const expected = [['CHN', 'CHENNAI', 0], ['NDL', 'NEW DELHI', 50]];
      assert.deepStrictEqual(route.stationsDetailsFrom('CHN'), expected);
    });
  });

  describe('mergeRoutes', () => {
    it('Should merge stations of the route', () => {
      const source2 = new Station('PNE', 'PUNE', 0);
      const destination2 = new Station('ITJ', 'ITRASI', 60);
      const route2 = new Route(source2, destination2, junctions);

      const bhopal = new Station('BPL', 'BHOPAL', 30);
      const guhawati = new Station('GHY', 'GUHAWATI', 40);

      route.addStation(salem);
      route.addStation(agara);
      route.addStation(bhopal);

      route2.addStation(agara);
      route2.addStation(bhopal);
      route2.addStation(guhawati);
      const newRoute = route.mergeRoutes(route2, 'AGA');

      const expected = [
        ['AGA', 'AGARA', 0],
        ['BPL', 'BHOPAL', 10],
        ['GHY', 'GUHAWATI', 20],
        ['NDL', 'NEW DELHI', 30],
        ['ITJ', 'ITRASI', 40]
      ];

      assert.deepStrictEqual(newRoute.stationsDetailsFrom('AGA'), expected);
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
