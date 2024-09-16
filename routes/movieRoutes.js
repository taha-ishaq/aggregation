const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController'); // Import the controllers

// Route to get all movies
router.get('/movies', movieController.getAllMovies);

// Route to create a new movie
router.post('/movies', movieController.createMovie);
router.get('/movie-stats',movieController.getMovieYOR)
// Route to get a single movie by ID
router.get('/movies/:id', movieController.getMovieById);

// Route to update a movie by ID
router.put('/movies/:id', movieController.updateMovieById);

// Route to delete a movie by ID
router.delete('/movies/:id', movieController.deleteMovieById);

module.exports = router;
