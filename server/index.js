const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

const movies = require(path.join(__dirname, 'movies_metadata.json'));

app.get('/api/movies', (req, res) => {
  const movieList = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average,
  }));
  res.json(movieList);
});

app.get('/api/movies/:id', (req, res) => {
  const movieId = Number(req.params.id);
  const movie = movies.find(m => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});