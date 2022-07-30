const fs = require('fs');
const { startJourney } = require('./src/startJourney.js');

const main = (inputFilePath) => {
  const trains = fs.readFileSync(inputFilePath, 'utf8');
  console.log(startJourney(trains));
};

// const filePath = 'sample_input/input1.txt';
// const filePath = 'sample_input/input2.txt';
// const filePath = 'sample_input/input3.txt';

main(...process.argv.slice(2));
