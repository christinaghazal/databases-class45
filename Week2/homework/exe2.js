
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const databaseName = 'books';

// Check if the database file exists
const doesDatabaseExist = fs.existsSync(databaseName);

// Connect to the SQLite database (or create a new one if it doesn't exist)
const db = new sqlite3.Database(databaseName, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log(`Connected to the database ${databaseName}`);
  }
});

// Create research_Papers table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INTEGER PRIMARY KEY,
      paper_title TEXT,
      conference TEXT,
      publish_date DATE
    )
  `);

  // Create a junction table for the many-to-many relationship
  db.run(`
    CREATE TABLE IF NOT EXISTS author_paper_relationship (
      author_id INTEGER,
      paper_id INTEGER,
      PRIMARY KEY (author_id, paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id),
      FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
    )
  `);
});

// Insert rows for authors and research papers (adjust data accordingly)
db.serialize(() => {
  // Insert 15 authors
  for (let i = 1; i <= 15; i++) {
    db.run(`
      INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
      VALUES ('Author ${i}', 'University ${i}', 'DOB ${i}', ${i * 5}, 'Gender ${i}')
    `);
  }

  // Insert 30 research papers
  for (let i = 1; i <= 30; i++) {
    db.run(`
      INSERT INTO research_Papers (paper_title, conference, publish_date)
      VALUES ('Paper ${i}', 'Conference ${i}', 'Publish Date ${i}')
    `);
  }

  // Establish relationships between authors and research papers
  for (let i = 1; i <= 15; i++) {
    for (let j = 1; j <= 2; j++) {
      db.run(`
        INSERT INTO author_paper_relationship (author_id, paper_id)
        VALUES (${i}, ${(i - 1) * 2 + j})
      `);
    }
  }
});

// Close the database connection
db.close();
