const assert = require('assert');
const { Station } = require('../src/station.js');

describe('Station', () => {
  let chennai;
  beforeEach(() => {
    chennai = new Station('CHN', 'CHENNAI', 10);
  });

  it('Should give code of the station', () => {
    assert.deepStrictEqual(chennai.code, 'CHN');
  });

  it('Should give distanceFromSource of the station', () => {
    assert.deepStrictEqual(chennai.distanceFromSource, 10);
  });
});
