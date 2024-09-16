const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');


router.get('/movies', movieController.getAllMovies);


router.post('/movies', movieController.createMovie);
router.get('/movie-stats',movieController.getMovieYOR);
router.get('/movies/:genre',movieController.getMovieByGenre);
router.get('/movies/:id', movieController.getMovieById);

router.put('/movies/:id', movieController.updateMovieById);


router.delete('/movies/:id', movieController.deleteMovieById);

module.exports = router;
