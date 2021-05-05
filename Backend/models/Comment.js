const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema to represent the comments , defining fields and types as objects of the Schema
const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    postId: {
        type: String
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);
//Export the model so we can access it outside of this file
module.exports = { Comment }