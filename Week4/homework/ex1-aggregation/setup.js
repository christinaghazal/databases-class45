const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.DB_COLLECTION;
const filePath = process.env.CSV_FILE_PATH;

async function setupDatabase() {
    const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    //clean
    await collection.deleteMany({});

    //Importing
    const dataArray = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const data = {
          _id: new ObjectId(),
          Country: row.Country,
          Year: parseInt(row.Year),
          Age: row.Age,
          M: parseInt(row.M),
          F: parseInt(row.F),
        };
        dataArray.push(data);
      })
      .on('end', async () => {
        if (dataArray.length > 0) {
          await collection.insertMany(dataArray);
          console.log('Data imported successfully!');
        } else {
          console.log('No data found in the CSV file');
        }
      });
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await client.close();
  }
}

module.exports = setupDatabase;
