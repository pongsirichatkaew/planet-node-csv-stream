const parse = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

// Review of best Habitable Planets
// https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    // console.log('chunk', data);
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log('error', err);
  })
  .on('end', () => {
    console.log(
      habitablePlanets.map((planet) => {
        return planet['kepler_name'];
      })
    );
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });
// parse();
