const express = require('express');
const router = express.Router();
const { Comment } = require("../../models/Comment");

// saving and getting the comment/s

// post on /saveComment for saving the comment
router.post("/saveComment", (req, res) => {
    // prints the content and postId in the terminal
    console.log(req.body)
    // comment instance eqauls to Comment Modal 
    const comment = new Comment(req.body);
    // save function to save the comment in db
    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })
        // find the comment by id 
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                // when error 
                if(err) return res.json({ success: false, err })
                // when successful 
                return res.status(200).json({ success: true, result })
            })
    })
})

// finds comments by id
// post on /getComments 
router.post("/getComments", (req, res) => {
    // find the postId 
    Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        // all of the comments that belong to the specific postId 
        .exec((err, comments) => {
            // when error 
            if (err) return res.status(400).send(err)
            // when successful 
            res.status(200).json({ success: true, comments })
        })
});

module.exports = router;