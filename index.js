const fs = require('fs');
const { startJourney } = require('./src/startJourney.js');

const main = (inputFilePath) => {
  try {
    const trains = fs.readFileSync(inputFilePath, 'utf8');
    console.log(startJourney(trains));

  } catch (error) {
    console.log('Can\'t read details from file', error.code);
  }
};

main(...process.argv.slice(2));
