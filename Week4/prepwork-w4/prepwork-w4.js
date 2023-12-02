const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

async function createManyRecipes(client, recipes) {
  const result = await client
    .db('recipes')
    .collection('recipes')
    .insertMany(recipes);

  console.log(`Created new recipes ${result.insertedCount}`);
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(`You did not set up the environment variables correctly.`);
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    await createManyRecipes(client, [
      {
        name: 'Chocolate Cake',
        categories: ['Cake', 'Dessert', 'Vegetarian'],
        ingredients: [
          'Cocoa Powder',
          'Flour',
          'Sugar',
          'Baking Soda',
          'Milk',
          'Butter',
        ],
        steps: [
          'Mix dry ingredients',
          'Add wet ingredients and blend',
          'Pour into cake pan',
          'Bake for 30 minutes',
          'Let it cool before serving',
        ],
      },
      {
        name: 'Grilled Salmon',
        categories: ['Seafood', 'Gluten-Free'],
        ingredients: [
          'Salmon fillets',
          'Lemon juice',
          'Garlic',
          'Olive oil',
          'Black pepper',
          'Salt',
        ],
        steps: [
          'Marinate salmon with lemon juice, garlic, and olive oil',
          'Season with salt and black pepper',
          'Grill for 10 minutes on each side',
          'Serve with a slice of lemon',
        ],
      },
      {
        name: 'Vegetable Stir-Fry',
        categories: ['Vegetarian'],
        ingredients: [
          'Broccoli',
          'Carrots',
          'Bell peppers',
          'Soy sauce',
          'Ginger',
          'Garlic',
          'Vegetable oil',
        ],
        steps: [
          'Heat oil in a wok',
          'Stir-fry vegetables with ginger and garlic',
          'Add soy sauce for flavor',
          'Cook until vegetables are tender',
          'Serve hot',
        ],
      },
      {
        name: 'Chicken Alfredo Pasta',
        categories: ['Pasta', 'Chicken'],
        ingredients: [
          'Fettuccine pasta',
          'Chicken breast',
          'Heavy cream',
          'Parmesan cheese',
          'Garlic powder',
          'Salt',
          'Black pepper',
        ],
        steps: [
          'Cook pasta according to package instructions',
          'Cook chicken and garlic in a pan',
          'Add heavy cream and Parmesan cheese',
          'Season with salt and black pepper',
          'Combine with cooked pasta',
          'Serve hot',
        ],
      },
    ]);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();



