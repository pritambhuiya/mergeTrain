const assert = require('assert');
const { merge } = require('../src/merge.js');

describe('merge', () => {
  let bogiesA;
  let bogiesB;

  beforeEach(() => {
    bogiesA = [
      ['NGP', 'NAGPUR', 0],
      ['ITJ', 'ITARSI', 20]
    ];

    bogiesB = [
      ['BPL', 'BHOPAL', 10],
      ['AGA', 'AGRA', 30],
      ['NDL', 'NEW DELHI', 40]
    ];
  });

  it('Should merge bogies of two trains', () => {
    const expected = [
      ['NGP', 'NAGPUR', 0],
      ['BPL', 'BHOPAL', 10],
      ['ITJ', 'ITARSI', 20],
      ['AGA', 'AGRA', 30],
      ['NDL', 'NEW DELHI', 40]
    ];
    assert.deepStrictEqual(merge(bogiesA, bogiesB), expected);
  });

  it('Should return bogies of second train if first train has no bogie', () => {
    bogiesA = [];
    const expected = [
      ['BPL', 'BHOPAL', 10],
      ['AGA', 'AGRA', 30],
      ['NDL', 'NEW DELHI', 40]
    ];
    assert.deepStrictEqual(merge(bogiesA, bogiesB), expected);
  });
});
