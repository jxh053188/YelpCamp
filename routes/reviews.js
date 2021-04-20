const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviewController');

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground')
const Review = require('../models/review');

const { validateReview, isLoggedIn, isReviewAuthor } = require('../utils/middleware');

const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;