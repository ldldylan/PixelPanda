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
        console.log(reviews)
        return res.json(reviews);
    }
    catch (err) {
        return res.json([]);
    }
});

router.get('/users/:userId', async (req, res, next) => {
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

// router.get('/reviews/:reviewId', async (req, res, next) => {
//     let review;
//     try {
//         review = await Review.findById(req.params.reviewId);
//     } catch (err) {
//         const error = new Error('Review not found');
//         error.statusCode = 404;
//         error.errors = { message: "No review found with that id" };
//         return next(error);
//     }
//     try {
//         const reviews = await Review.find({ reviewId: review._id })
//             .sort({ createdAt: -1 })
//             .populate("author", "_id username profileImageUrl");
//         return res.json(reviews);
//     }
//     catch (err) {
//         return res.json([]);
//     }
// })

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

router.get('/artworks/:artworkId', async (req, res, next) => {
    let artwork;
    try {
        artwork = await Artwork.findById(req.params.artworkId);
    } catch (err) {
        const error = new Error('Artwork not found');
        error.statusCode = 404;
        error.errors = { message: "No artwork found with that id" };
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
    // console.log(req,"req")
    // console.log(req.user,"req.user")
    // console.log(req.params.artworkId,"req.params.artworkId")
    // console.log(req.body, "req.body")
    
    try {
        const newReview = new Review({
            // author: req.user._id,
            author: req.user._id,
            artworkId: req.params.artworkId,
            content: req.body.content,
            rating: req.body.rating
        });
        console.log(newReview,"newReview")
        let review = await newReview.save();
        review = await review.populate('author', '_id email profileImageUrl');
        return res.json(review);
    }
    catch (err) {
        next(err);
    }
    
});

router.patch("/:id", requireUser, validateReviewInput, async (req, res, next) => {
    // console.log(req.params, "req.params");
    // console.log(req.user, "req.user._id");
    Review.findByIdAndUpdate(
        req.params.id,
        {
            // author: req.user._id,
            // author: req.user._id,
            // artworkId: req.artworkId,
            content: req.body.content,
            rating: req.body.rating
        },
        { new: true }
    ).populate('author', '_id email profileImageUrl')
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
router.delete("/:id", async (req, res, next) => {
    // res.json({ message: "DELETE /product" });

    Review.findByIdAndDelete(req.params.id)
        .then((review) => {
            return res.json(review);
        })
        .catch((err) => {
            const error = new Error("Review can't be deleted.");
            error.statusCode = 422;
            error.errors = { message: "Review can't be found." };
            return next(error);
        });
});
module.exports = router;