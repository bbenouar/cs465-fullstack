const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');
const mainController = require('../controllers/main');

// View route for travel
router
    .route('/travel')
    .get(travelController.travel);

// View route for homepage
router
    .route('/')
    .get(mainController.index);

module.exports = router;
