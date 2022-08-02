const { startJourney, parseInput, parseTrain } =
  require('../src/startJourney.js');
const assert = require('assert');

describe('parseInput', () => {
  it('Should parse the input', () => {
    const trains = 'TRAIN_A ENGINE KRN HYB NGP\nTRAIN_B ENGINE NJP PNE';
    const expected = ['TRAIN_A ENGINE KRN HYB NGP', 'TRAIN_B ENGINE NJP PNE'];

    assert.deepStrictEqual(parseInput(trains), expected);
  });
});

describe('parseTrain', () => {
  it('Should give name, engine and bogies of train', () => {
    const train = 'TRAIN_A ENGINE KRN HYB NGP';
    const expected = ['TRAIN_A', 'ENGINE', 'KRN', 'HYB', 'NGP'];

    assert.deepStrictEqual(parseTrain(train), expected);
  });
});

describe('startJourney', () => {
  it('Should give arrival of A & B and departure of merged train', () => {
    const trains = 'TRAIN_A ENGINE KRN HYB NGP\nTRAIN_B ENGINE NJP PNE';

    const expected = 'ARRIVAL TRAIN_A ENGINE HYB NGP\nARRIVAL TRAIN_B ENGINE NJP\nDEPARTURE TRAIN_AB ENGINE ENGINE NJP NGP';

    assert.strictEqual(startJourney(trains), expected);
  });

  it('Should give JOURNEY_ENDED after merging if no bogies are remaining', () => {
    const trains = 'TRAIN_A ENGINE SLM HYB\nTRAIN_B ENGINE HYB';
    const expected = 'ARRIVAL TRAIN_A ENGINE HYB\nARRIVAL TRAIN_B ENGINE HYB\nJOURNEY_ENDED';

    assert.strictEqual(startJourney(trains), expected);
  });
});
