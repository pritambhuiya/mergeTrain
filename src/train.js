const displayNewTrain = (trainName, boogies) =>
  console.log(`ARRIVAL TRAIN_${trainName} ENGINE`, boogies.join(' '));

const getStationCodes = ({ stations }) =>
  stations.map((station) => station.code);

const getBogiesAfterJunction = (bogies, stationsBeforeJunction) =>
  bogies.filter(bogie => !stationsBeforeJunction.includes(bogie));

const detachBogiesBeforeJunction = ({ bogies, route, junction }) => {
  const stationCodes = getStationCodes(route);
  const junctionStationLocation = stationCodes.indexOf(junction);

  const stationsBeforeJunction = stationCodes.slice(0, junctionStationLocation);
  return getBogiesAfterJunction(bogies, stationsBeforeJunction);
};

module.exports = { detachBogiesBeforeJunction, displayNewTrain };
