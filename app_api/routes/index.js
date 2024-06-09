const express = require('express');
const router = express.Router(); // Create a new router object to handle routes

// Import the controller that will handle requests to the trips endpoint
const tripsController = require('../controllers/trips');

// Route definition for '/trips' endpoint using the GET HTTP method
// This route will fetch a list of trips using the tripsList function from the trips controller
router
    .route('/trips')
    .get(tripsController.tripsList);

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);    

// Optional: Add a middleware to handle errors specifically for API routes
router.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack to the console
    res.status(500).send('Something broke!'); // Send a 500 response back to the client
});

module.exports = router; // Export the router for use in the main app
