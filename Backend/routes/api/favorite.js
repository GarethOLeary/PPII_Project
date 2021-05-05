const express = require('express');
const router = express.Router();
const { Favorite } = require("../../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
    // find favorite information inside favorite collection by movie id 
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({ success: true, favoriteNumber: favorite.length })
        })

});

router.post("/favorited", (req, res) => {
    // find favorite information inside favorite collectuin by movie id , userfrom
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)
            // so we know what movie is favorited or not 
            let result = false;
            if (favorite.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })

});

router.post("/addToFavorite", (req, res) => {
    console.log(req.body)
    // save the information about the movie or user id inside favorite collection
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/removeFromFavorite", (req, res) => {
    // finds the movie by the attributes and removes it
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});

router.post("/getFavoredMovie", (req, res) => {
    // finds all of the Users 
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })
});

module.exports = router;
