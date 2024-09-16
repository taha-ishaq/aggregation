const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    release: { type: Number, required: true },
    bannerImage: { type: String, required: true }, 
    description: { type: String, required: true },
    genre: [{ type: String, required: true }],
    rating: { type: Number, required: true },  // Changed from String to Number
});

const Movie = mongoose.model('Movies', MovieSchema);

module.exports = Movie;
