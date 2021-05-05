const express = require('express');
const router = express.Router();
const { Like } = require("../../models/Like");
const { Dislike } = require("../../models/Dislike");

// post on /getLikes
// getLikes - get the likes
router.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId }
    } else {
        variable = { commentId: req.body.commentId }
    }
    //finds like by id
    Like.find(variable)
        .exec((err, likes) => {
            // when error
            if (err) return res.status(400).send(err);
            // when successful
            res.status(200).json({ success: true, likes })
        })
})

// post on /getDislikes - get the dislike
router.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId }
    } else {
        variable = { commentId: req.body.commentId }
    }
    // finds dislike by id 
    Dislike.find(variable)
        .exec((err, dislikes) => {
            // when error
            if (err) return res.status(400).send(err);
            // when successful
            res.status(200).json({ success: true, dislikes })
        })
})

// post on /addLike - adds a like 
router.post("/addLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const like = new Like(variable)
    //save the like information to database
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        // if the dislike button is already cliked, it will take the dislike by 1
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                // when error
                if (err) return res.status(400).json({ success: false, err });
                // when successful
                res.status(200).json({ success: true })
            })
    })
})

// post on /unLike - unLikes a movie
// when user has clicked on like and when clicks on it,
// it will un click the like 
router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }
    // finds the like with given attributes
    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            // when error
            if (err) return res.status(400).json({ success: false, err })
            // when successful
            res.status(200).json({ success: true })
        })
})

// post on /unDislike - this undislikes the movie 
// when dislike is clicked and the user clicks on it again it will unclick it 
router.post("/unDisLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }
    //In case Like Button is already clicked, we need to decrease the like by 1 
    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            // when error
            if (err) return res.status(400).json({ success: false, err })
            // when successful
            res.status(200).json({ success: true })
        })
})

// post on /addDislike - this adds the dislike 
router.post("/addDisLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const disLike = new Dislike(variable)
    //save the like information to database
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        // if the like button is already cliked, it removes one like 
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                // when error
                if (err) return res.status(400).json({ success: false, err });
                // when successful
                res.status(200).json({ success: true })
            })
    })
})

module.exports = router;