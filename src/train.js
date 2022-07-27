const displayNewTrain = (trainName, bogies) =>
  console.log(`ARRIVAL TRAIN_${trainName} ENGINE`, bogies.join(' '));

const displayMergedTrain = (train1, train2, bogies) => {
  const train =
    `DEPARTURE TRAIN_${train1}${train2} ENGINE ENGINE ` + bogies.join(' ');
  console.log(train);
};

const getBogiesAfterJunction = (bogies, stationsBeforeJunction) =>
  bogies.filter(bogie => !stationsBeforeJunction.includes(bogie));

const detachBogiesBeforeJunction = ({ bogies, route, junctions }) => {
  const stationCodes = route.stationCodes;
  const junctionLocation = route.indexOf(junctions[0]);

  const stationsBeforeJunction = stationCodes.slice(0, junctionLocation);
  return getBogiesAfterJunction(bogies, stationsBeforeJunction);
};

module.exports =
  { detachBogiesBeforeJunction, displayNewTrain, displayMergedTrain };
