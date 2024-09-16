const Movie = require('../models/movieModel');


const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error });
    }
};


const createMovie = async (req, res) => {
    const { title, name, release, bannerImage, description, genre,rating } = req.body;
    try {
        const newMovie = new Movie({
            title,
            name,
            release,
            bannerImage,
            description,
            genre,
            rating,
        });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error creating movie', error });
    }
};


const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // Fetch movie by ID
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie', error });
    }
};

const updateMovieById = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie', error });
    }
};
const getMovieYOR = async (req, res) => {
    try {
        const stats = await Movie.aggregate([
            { $match: { rating: { $lte: 5,$gte:3} } }, 
            { $group: {
                _id: '$release',
                avgRating: { $avg: '$rating' }, 
                movies: { $push: { title: '$title', rating: '$rating', name: '$name',image:'$bannerImage' } } // Collect movie details
            }},
            { $sort: { 'movies.rating': -1 } } 
        ]);
        
        res.status(200).json({
            status: "Success",
            data: {
                count: stats[0].movies.length, 
                avgRating: stats[0].avgRating,
                stats, 
              
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};



const deleteMovieById = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id); // Delete movie by ID
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error });
    }
};

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById,
    deleteMovieById,
    getMovieYOR, 
};
