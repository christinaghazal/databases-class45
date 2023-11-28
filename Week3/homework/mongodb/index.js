



const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");
const data = require("./data.json");

require("dotenv").config();

async function createEpisodeExercise(client) {
  try {
    const bobRossCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

    const newEpisode = {
      episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
    };

    const result = await bobRossCollection.insertOne(newEpisode);

    console.log(`Created season 9 episode 13 and the document got the id ${result.insertedId}`);
  } catch (error) {
    console.error(error);
  }
}

async function findEpisodesExercises(client) {
  try {
    const bobRossCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

    const episode2Season2 = await bobRossCollection.findOne({ episode: "S02E02" });
    console.log(`The title of episode 2 in season 2 is ${episode2Season2.title}`);

    const blackRiverEpisode = await bobRossCollection.findOne({ title: "BLACK RIVER" });
    console.log(`The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`);
    
    const cliffEpisodes = await bobRossCollection.find({ elements: "CLIFF" }).toArray();
    const cliffEpisodeTitles = cliffEpisodes.map((episode) => episode.title);
    console.log(`The episodes that Bob Ross painted a CLIFF are ${cliffEpisodeTitles.join(", ")}`);

    const cliffLighthouseEpisodes = await bobRossCollection.find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } }).toArray();
    const cliffLighthouseEpisodeTitles = cliffLighthouseEpisodes.map((episode) => episode.title);
    console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffLighthouseEpisodeTitles.join(", ")}`);
  } catch (error) {
    console.error(error);
  }
}

async function updateEpisodeExercises(client) {
  try {
    const bobRossCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

    const updateResult = await bobRossCollection.updateOne(
      { episode: "S30E13" },
      { $set: { title: "BLUE RIDGE FALLS" } }
    );

    console.log(`Ran a command to update episode 13 in season 30 and it updated ${updateResult.modifiedCount} episodes`);

    const updateBushesResult = await bobRossCollection.updateMany(
      { elements: "BUSHES" },
      { $set: { elements: ["BUSH"] } }
    );

    console.log(`Ran a command to update all the BUSHES to BUSH and it updated ${updateBushesResult.modifiedCount} episodes`);
  } catch (error) {
    console.error(error);
  }
}

async function deleteEpisodeExercise(client) {
  try {
    const bobRossCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

    const deleteResult = await bobRossCollection.deleteOne({ episode: "S31E14" });

    console.log(`Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`);
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }

  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    //close 
    await client.close();
  }
}

main();

//end
