const { MongoClient } = require('mongodb');

const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.DB_COLLECTION;

async function getTotalPopulationPerYear(country) {
  //const client = new MongoClient(uri, { useUnifiedTopology: true });
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.aggregate([
      { $match: { Country: country } },
      {
        $group: {
          _id: '$Year',
          countPopulation: { $sum: { $add: ['$M', '$F'] } },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id',
          countPopulation: 1,
        },
      },
      { $sort: { year: 1 } },
    ]).toArray();

    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function getContinentInfoByYearAndAge(year, age) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.aggregate([
      { $match: { Year: year, Age: age } },
      {
        $group: {
          _id: '$Country',
          Country: { $first: '$Country' },
          Year: { $first: '$Year' },
          Age: { $first: '$Age' },
          M: { $sum: '$M' },
          F: { $sum: '$F' },
          TotalPopulation: { $sum: { $add: ['$M', '$F'] } },
        },
      },
    ]).toArray();

    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = {
  getTotalPopulationPerYear,
  getContinentInfoByYearAndAge,
};
