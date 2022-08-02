const { Train } = require('../src/train.js');
const { createRoute } = require('../src/route.js');
const assert = require('assert');

describe('Train', () => {
  let trainA;
  let trainB;
  let routeA;
  let stations;

  beforeEach(() => {
    const junctions = ['HYB', 'NGP'];

    const sourceA = ['CHN', 'CHENNAI', 0];
    const destinationA = ['NDL', 'NEW DELHI', 40];
    const stationsA = [['SLM', 'SALEM', 10], ['AGA', 'AGARA', 20]];

    routeA = createRoute(sourceA, destinationA, stationsA, junctions);
    trainA = new Train('TRAIN_A', 'ENGINE', ['NDL', 'NDL', 'GHY']);

    stations = [
      ['HYB', 'HYDERABAD', 0],
      ['NGP', 'NAGPUR', 10],
      ['NDL', 'NEW DELHI', 20],
      ['GHY', 'GUHAWATI', 30]
    ];

    trainB = new Train('TRAIN_B', 'ENGINE', ['GHY', 'PNE']);
  });

  describe('bogies', () => {
    it('Should give bogies', () => {
      assert.deepStrictEqual(trainA.bogies, ['NDL', 'NDL', 'GHY']);
    });

    it('Should give empty array if no bogies are remaining', () => {
      trainA = new Train('TRAIN_A', 'ENGINE', []);
      assert.deepStrictEqual(trainA.bogies, []);
    });

    it('Should add remaining bogies', () => {
      trainA = new Train('TRAIN_A', 'ENGINE', ['NDL', 'GHY']);
      assert.deepStrictEqual(trainA.bogies, ['NDL', 'GHY']);
    });
  });

  describe('toString', () => {
    it('Should give representation of train', () => {
      assert.deepStrictEqual(trainA.toString(), 'TRAIN_A ENGINE NDL NDL GHY');
    });

    it('Should give TRAIN_A ENGINE if no bogie exists', () => {
      trainA = new Train('TRAIN_A', 'ENGINE', []);
      assert.deepStrictEqual(trainA.toString(), 'TRAIN_A ENGINE');
    });

  });

  describe('detachBogies', () => {
    it('Should return all bogies after HYB including another route', () => {
      trainA = new Train('TRAIN_A', 'ENGINE', ['NJP', 'SLM', 'AGA']);
      const newTrainA = trainA.detachBogies(routeA);
      assert.deepStrictEqual(newTrainA.bogies, ['SLM', 'AGA']);
    });

    it('Should return all bogies if no bogies are before HYB', () => {
      trainA = new Train('TRAIN_A', 'ENGINE', ['SLM', 'AGA']);
      const newTrainA = trainA.detachBogies(routeA);
      assert.deepStrictEqual(newTrainA.bogies, ['SLM', 'AGA']);
    });

    it('Should return empty array if no bogies are remaining', () => {
      trainA = new Train('TRAIN_A', 'ENGINE', []);
      const newTrainA = trainA.detachBogies(routeA);
      assert.deepStrictEqual(newTrainA.bogies, []);
    });
  });

  describe('mergeTrains', () => {
    it('Should merge two trains', () => {
      const mergedTrain = trainA.mergeTrains(trainB, stations);
      assert.deepStrictEqual(
        mergedTrain.toString(), 'TRAIN_AB ENGINE ENGINE GHY GHY NDL NDL');
    });

    it('Should return a train if other train has no bogies left', () => {
      trainB = new Train('TRAIN_B', 'ENGINE', []);

      const mergedTrain = trainA.mergeTrains(trainB, stations);
      assert.deepStrictEqual(
        mergedTrain.toString(), 'TRAIN_AB ENGINE ENGINE GHY NDL NDL');
    });

    it('Should return empty array if both trains have no bogies left', () => {
      trainA = new Train('TRAIN_A', 'ENGINE', []);
      trainB = new Train('TRAIN_B', 'ENGINE', []);

      const mergedTrain = trainA.mergeTrains(trainB, stations);
      assert.deepStrictEqual(
        mergedTrain.toString(), 'TRAIN_AB ENGINE ENGINE');
    });
  });
});
