const express = require('express');
const router = express.Router();
const { Like } = require("../../models/Like");
const { Dislike } = require("../../models/Dislike");

// getLikes - get the likes
router.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable) 
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
})

// getDislikes - get the dislike
router.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId }
    } else {
        variable = { commentId: req.body.commentId }
    }
    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })
})

// uplike
router.post("/addLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const like = new Like(variable)
    //save the like information to database
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        // if the dislike button is already cliked, it will take the dislike by 1
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })
})

// unlike 
router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
})

// unDislike
router.post("/unDisLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

// upDislike
router.post("/addDisLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const disLike = new Dislike(variable)
    //save the like information to database
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        // if the like button is already cliked, it removes one like 
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })
})

module.exports = router;