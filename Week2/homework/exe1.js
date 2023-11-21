// Filename: 3.1_exercise_1.js

const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (or create a new one if it doesn't exist)
const db = new sqlite3.Database('books');

// Create authors table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS authors (
      author_id INTEGER PRIMARY KEY,
      author_name TEXT,
      university TEXT,
      date_of_birth DATE,
      h_index INTEGER,
      gender TEXT
    )
  `);

  // Add the mentor column
  db.run('ALTER TABLE authors ADD COLUMN mentor INTEGER');

  // Add foreign key constraint
  db.run(`
    PRAGMA foreign_keys = ON; -- Enable foreign key support
    ALTER TABLE authors
    ADD CONSTRAINT fk_mentor
    FOREIGN KEY (mentor)
    REFERENCES authors(author_id)
  `);
});

// Close the database connection
db.close();
