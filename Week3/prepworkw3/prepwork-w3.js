const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Recipes',
  waitForConnections: true,
  connectionLimit: 10,
});

const recipeQueries = [
  {
    description: 'Vegetarian recipes with potatoes',
    query: `
      SELECT R.name AS recipe_name 
      FROM Recipes R 
      JOIN RecipeCategories RC ON R.recipe_id = RC.recipe_id 
      JOIN Categories C ON RC.category_id = C.category_id 
      WHERE C.name = 'Vegetarian' AND R.ingredients LIKE '%Potatoes%';
    `,
  },
  {
    description: 'Cakes that do not need baking',
    query: `
      SELECT R.name 
      FROM Recipes R 
      JOIN RecipeCategories RC ON R.recipe_id = RC.recipe_id 
      JOIN Categories C ON RC.category_id = C.category_id 
      WHERE C.name = 'No-Bake' AND R.steps NOT LIKE '%Bake%';
    `,
  },
  {
    description: 'Vegan and Japanese recipes',
    query: `
      SELECT R.name 
      FROM Recipes R 
      JOIN RecipeCategories RC ON R.recipe_id = RC.recipe_id 
      JOIN Categories C ON RC.category_id = C.category_id 
      WHERE C.name IN ('Vegan', 'Japanese');
    `,
  },
];

//Use Promise
Promise.all(
  recipeQueries.map(({ description, query }) => {
    return new Promise((resolve) => {
      pool.query(query, (err, results) => {
        if (err) {
          console.error(`Error executing query (${description}):`, err);
          resolve([]);
        } else {
          resolve(results);
        }
      });
    }).then((results) => {
      console.log(`* ${description}? ----> results:`);

      //Extrect and log only the name
      const recipeNames = results.map((result) => result.name);

      //Check if there are any name
      if (recipeNames.length > 0) {
        console.log(recipeNames.join(', '));
      } else {
        console.log('No recipes found');
      }
    });
  })
).finally(() => {
  //Close 
  pool.end();
});
