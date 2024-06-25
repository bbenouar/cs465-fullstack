const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips'); // Path to your trips controller

// API route definition for '/trips' endpoint using the GET HTTP method
router
    .route('/trips')
    .get(tripsController.tripsList);

// API GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:code')
    .get(tripsController.tripsFindByCode);

module.exports = router;
