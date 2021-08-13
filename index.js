const parse = require('csv-parse');
const fs = require('fs');

const results = [];
fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    // console.log('chunk', data);
    results.push(data);
  })
  .on('error', (err) => {
    console.log('error', err);
  })
  .on('end', () => {
    console.log('results', results);
    console.log('done');
  });
// parse();
