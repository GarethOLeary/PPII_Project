const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema to represent the favorites , defining fields and types as objects of the Schema
const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId : {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime : {
        type: String
    }

}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

//Export the model so we can access it outside of this file
module.exports = { Favorite }
