const fs = require('fs');
const { startJourney } = require('./src/startJourney.js');

const main = (inputFilePath) => {
  const trains = fs.readFileSync(inputFilePath, 'utf8');
  console.log(startJourney(trains));
};

main(...process.argv.slice(2));
