const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema to represent the dislikes , defining fields and types as objects of the Schema
const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    postId: {
        type: String,
    }

}, { timestamps: true })


const Dislike = mongoose.model('Dislike', dislikeSchema);

//Export the model so we can access it outside of this file
module.exports = { Dislike }