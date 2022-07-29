class Train {
  constructor(route, junctions, bogies) {
    this.route = route;
    this.junctions = junctions;
    this.bogies = bogies;
  }

  set remainingBogies(remainingBogies) {
    this.bogies = remainingBogies;
  }

  get remainingBogies() {
    return this.bogies;
  }

  bogiesAfterJunction(stationsBeforeJunction) {
    return this.bogies.filter(bogie =>
      !stationsBeforeJunction.includes(bogie));
  }

  detachBogiesBefore(junction) {
    const stationCodes = this.route.stationCodes;
    const junctionLocation = this.route.indexOf(junction);

    const stationsBeforeJunction = stationCodes.slice(0, junctionLocation);
    this.bogies = this.bogiesAfterJunction(stationsBeforeJunction);
  }
}

const displayNewTrain = (trainName, bogies) =>
  console.log(`ARRIVAL TRAIN_${trainName} ENGINE`, bogies.join(' '));

const displayMergedTrain = (train1, train2, bogies) => {
  const train =
    `DEPARTURE TRAIN_${train1}${train2} ENGINE ENGINE ` + bogies.join(' ');
  console.log(train);
};

module.exports = { Train, displayNewTrain, displayMergedTrain };
