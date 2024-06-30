
const express = require('express'); // Express App
const expressJwtLib = require('express-jwt');
const { expressjwt: jwt } = expressJwtLib;
const router = express.Router();

// Correct import paths
const authController = require('../controllers/authentication'); 
const tripsController = require('../controllers/trips');

// Create the authentication middleware
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

// Route definition for '/trips' endpoint using the GET HTTP method
// This route will fetch a list of trips using the tripsList function from the trips controller
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip); // Post Method Adds a Trip

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip); // Protect update route

router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

module.exports = router; // Export the router for use in the main app
