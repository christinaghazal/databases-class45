const setupDatabase = require('./setup');
const { getTotalPopulationPerYear, getContinentInfoByYearAndAge } = require('./aggregation');


 setupDatabase();

const country = 'Netherlands';
getTotalPopulationPerYear(country)
  .then((result) => {
    console.log('Total Population Per Year:', result);
  })
  .catch((err) => {
    console.error('Error:', err);
  });

const year = 2020;
const age = '100+';
getContinentInfoByYearAndAge(year, age)
  .then((result) => {
    console.log('Continent Info By Year and Age:', result);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
