const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Change this to your MySQL host
  user: 'hyfuser',      // Change this to your MySQL username
  password: 'hyfpassword',  // Change this to your MySQL password
  database: 'world',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Function to execute a query
function executeQuery(query, callback) {
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    callback(results);
  });
}

// Queries
const queries = [
  "SELECT Name FROM country WHERE Population > 8000000",
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  "SELECT Name FROM country WHERE Continent = 'Europe'",
  "SELECT Name FROM country ORDER BY SurfaceArea DESC",
  "SELECT Name FROM city WHERE CountryCode = 'NLD'",
  "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  "SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10",
  "SELECT SUM(Population) AS WorldPopulation FROM country",
];

// Execute each query and print the results
queries.forEach((query, index) => {
  executeQuery(query, (results) => {
    console.log(`Query ${index + 1}:`);
    console.table(results);
    console.log('\n');
  });
});

// Close the connection
connection.end();
