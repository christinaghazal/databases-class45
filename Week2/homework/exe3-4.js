
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('books');

// exe3
db.serialize(() => {
  db.each(`
    SELECT a.author_name AS author, m.author_name AS mentor
    FROM authors a
    LEFT JOIN authors m ON a.mentor = m.author_id
  `, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Author: ${row.author}, Mentor: ${row.mentor || 'None'}`);
    }
  });
});


db.serialize(() => {
  db.each(`
    SELECT a.*, COALESCE(rp.paper_title, 'No Papers') AS published_paper_title
    FROM authors a
    LEFT JOIN author_paper_relationship apr ON a.author_id = apr.author_id
    LEFT JOIN research_Papers rp ON apr.paper_id = rp.paper_id
  `, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Author: ${row.author_name}, Paper Title: ${row.published_paper_title}`);
    }
  });
});

//exe4
db.serialize(() => {
  db.each(`
    SELECT rp.paper_id, rp.paper_title, COUNT(apr.author_id) AS author_count
    FROM research_Papers rp
    LEFT JOIN author_paper_relationship apr ON rp.paper_id = apr.paper_id
    GROUP BY rp.paper_id, rp.paper_title
  `, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Paper: ${row.paper_title}, Authors: ${row.author_count}`);
    }
  });
});


db.serialize(() => {
  db.each(`
    SELECT a.gender, SUM(CASE WHEN apr.paper_id IS NOT NULL THEN 1 ELSE 0 END) AS total_papers
    FROM authors a
    LEFT JOIN author_paper_relationship apr ON a.author_id = apr.author_id
    WHERE a.gender = 'Female'
    GROUP BY a.gender
  `, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Female Authors: ${row.total_papers} papers`);
    }
  });
});


db.serialize(() => {
  db.each(`
    SELECT university, AVG(h_index) AS average_h_index
    FROM authors
    GROUP BY university
  `, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`University: ${row.university}, Average H-Index: ${row.average_h_index}`);
    }
  });
});


db.serialize(() => {
  db.each(`
    SELECT a.university, SUM(CASE WHEN apr.paper_id IS NOT NULL THEN 1 ELSE 0 END) AS total_papers
    FROM authors a
    LEFT JOIN author_paper_relationship apr ON a.author_id = apr.author_id
    GROUP BY a.university
  `, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`University: ${row.university}, Total Papers: ${row.total_papers}`);
    }
  });
});


db.serialize(() => {
  db.each(`
    SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
    FROM authors
    GROUP BY university
  `, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`University: ${row.university}, Min H-Index: ${row.min_h_index}, Max H-Index: ${row.max_h_index}`);
    }
  });
});


db.close();
