const { merge } = require('./merge.js');

class Train {
  #name;
  #engines;
  #bogies;

  constructor(name, engines, bogies) {
    this.#name = name;
    this.#engines = engines;
    this.#bogies = bogies;
  }

  get bogies() {
    return this.#bogies;
  }

  toString() {
    return [this.#name, this.#engines, ...this.#bogies].join(' ');
  }

  detachBogies({ stationCodes }) {
    const bogies = this.#bogies.filter(bogie => stationCodes.includes(bogie));
    return new Train(this.#name, this.#engines, bogies);
  }

  #stationExists(bogie) {
    return this.#bogies.includes(bogie);
  }

  #getSameBogies(station) {
    return this.bogies.filter(bogie => bogie === station);
  }

  #bogiesDetailsAfterJunction(stationsDetails) {
    const remainingBogies = [];
    stationsDetails.forEach((station) => {
      const [stationCode] = station;

      if (this.#stationExists(stationCode)) {
        const sameBogies = this.#getSameBogies(stationCode);
        sameBogies.forEach(() => remainingBogies.push(station));
      }
    });

    return remainingBogies;
  }

  mergeTrains(train, stationDetails) {
    const remainingBogiesA = this.#bogiesDetailsAfterJunction(stationDetails);
    const remainingBogiesB = train.#bogiesDetailsAfterJunction(stationDetails);
    const mergedBogies = merge(remainingBogiesA, remainingBogiesB);

    const newBogies = mergedBogies.map(([stationCode, ,]) => stationCode);
    const trainName = this.#name + train.#name.split('_')[1];
    return new Train(trainName, 'ENGINE ENGINE', newBogies.reverse());
    // return new Train('TRAIN_AB', 'ENGINE ENGINE', newBogies.reverse());
  }
}

module.exports = { Train };
