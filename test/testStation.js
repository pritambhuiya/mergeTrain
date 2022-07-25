const assert = require('assert');
const { Station } = require('../src/station.js');

describe('Station', () => {
  it('Should give code of the station', () => {
    const chennai = new Station('CHN', 'CHENNAI', 0);
    assert.deepStrictEqual(chennai.code, 'CHN');
  });
});
