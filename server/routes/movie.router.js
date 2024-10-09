const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all movies
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

// GET movie details by ID
router.get('/:id', (req, res) => {
  const movieId = req.params.id; // Get the movie ID from the request parameters
  const query = `
    SELECT * FROM "movies"
    WHERE "id" = $1; // Using a parameterized query for security
  `;
  pool.query(query, [movieId]) // Passing the movie ID as a parameter
    .then(result => {
      if (result.rows.length > 0) {
        res.send(result.rows[0]); // Send the movie details if found
      } else {
        res.sendStatus(404); // Movie not found
      }
    })
    .catch(err => {
      console.log('ERROR: Get movie details', err);
      res.sendStatus(500);
    });
});

// POST a new movie
router.post('/', (req, res) => {
  console.log(req.body);
  const insertMovieQuery = `
    INSERT INTO "movies"
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ];

  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id;

      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres"
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ];

      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
