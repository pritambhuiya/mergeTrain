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

  it('Should give stations of the route', () => {
    const expected = [destination, source];
    assert.deepStrictEqual(route.stations, expected);
  });

  it('Should add a station', () => {
    route.addStation(salem);
    const expected = [destination, source, salem];
    assert.deepStrictEqual(route.stations, expected);
  });

  it('Should return true if a station exists in the route', () => {
    route.addStation(salem);
    assert.strictEqual(route.stationExists(salem), true);
  });

  it('Should return false if a station does not exist in the route', () => {
    assert.strictEqual(route.stationExists(salem), false);
  });

  it('Should return distance between two stations in the route', () => {
    route.addStation(salem);
    route.addStation(agara);
    assert.strictEqual(route.distanceBetween(salem, agara), 10);
  });

  it('Should return distance between source & destination in the route', () => {
    assert.strictEqual(route.distanceBetween(source, destination), 30);
  });

  it('Should return distance between station & source in the route', () => {
    route.addStation(salem);
    assert.strictEqual(route.distanceBetween(salem, source), 10);
  });

  it('Should return distance between station & destination in the route', () => {
    route.addStation(salem);
    assert.strictEqual(route.distanceBetween(destination, salem), 20);
  });
});
