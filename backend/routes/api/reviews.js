const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Artwork = mongoose.model('Artwork')
const Review = mongoose.model('Review');
const { requireUser } = require('../../config/passport');
const validateReviewInput = require('../../validations/reviews');

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("author", "_id email profileImageUrl")
            .sort({ createdAt: -1 });
        return res.json(reviews);
    }
    catch (err) {
        return res.json([]);
    }
});

router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch (err) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const reviews = await Review.find({ author: user._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id username profileImageUrl");
        return res.json(reviews);
    }
    catch (err) {
        return res.json([]);
    }
})

router.get('/review/:reviewId', async (req, res, next) => {
    let review;
    try {
        review = await Review.findById(req.params.reviewId);
    } catch (err) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const reviews = await Review.find({ reviewId: review._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id username profileImageUrl");
        return res.json(reviews);
    }
    catch (err) {
        return res.json([]);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate("author", "_id email profileImageUrl");
        return res.json(review);
    }
    catch (err) {
        const error = new Error('Review not found');
        error.statusCode = 404;
        error.errors = { message: "No review found with that id" };
        return next(error);
    }
});

router.get('/artwork/:artworkId', async (req, res, next) => {
    let artwork;
    try {
        artwork = await Artwork.findById(req.params.artworkId);
    } catch (err) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const reviews = await Review.find({ artworkId: artwork._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id username profileImageUrl");
        return res.json(reviews);
    }
    catch (err) {
        return res.json([]);
    }
})

router.post('/artwork/:artworkId', requireUser, validateReviewInput, async (req, res, next) => {

    
    try {
        const newReview = new Review({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            author: req.user._id,
            price: req.body.price,
            ArtworkImageUrl

        });
        let review = await newReview.save();
        artwork = await review.populate('author', '_id email profileImageUrl');
        return res.json(review);
    }
    catch (err) {
        next(err);
    }
});
router.patch("/:id", singleMulterUpload("image"), requireUser, validateReviewInput, async (req, res, next) => {
    let ArtworkImageUrl;
    if (req.file) {
        ArtworkImageUrl = await singleFileUpload({ file: req.file, public: true });
        console.log(ArtworkImageUrl, "ArtworkImageUrl");
    } else {
        ArtworkImageUrl = req.body.ArtworkImageUrl;
    }
    console.log(req.params, "req.params");
    console.log(req.user, "req.user._id");
    Review.findByIdAndUpdate(
        req.params.id,
        {
            author: req.user._id,
            name: req.body.name,
            description: req.body.description,
            ArtworkImageUrl,
            price: req.body.price
        },
        { new: true }
    )
        .then((review) => {
            return res.json(review);
        })
        .catch((err) => {
            console.log("errstart");
            console.log(err, "err");
            const error = new Error("Review can't be updated.");
            error.statusCode = 422;
            error.errors = { message: "Invalid review input values." };
            return next(error);
        });
})
router.delete("/:artworkId", async (req, res, next) => {
    // res.json({ message: "DELETE /product" });

    Review.findByIdAndDelete(req.params.artworkId)
        .then((artwork) => {
            return res.json(artwork);
        })
        .catch((err) => {
            const error = new Error("Review can't be deleted.");
            error.statusCode = 422;
            error.errors = { message: "Review can't be found." };
            return next(error);
        });
});
module.exports = router;