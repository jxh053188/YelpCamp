const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgroundsController');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { isLoggedIn } = require('../utils/middleware');
const { findById } = require('../models/campground');
const { isAuthor } = require('../utils/middleware');
const { validateCampground } = require('../utils/middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('images'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('images'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;