const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Ensure this model is correct

// Placeholder for getUser function
const getUser = (req, res, callback) => {
    // Check for a valid user token
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Call the callback function with the request and response objects
    callback(req, res);
};

// Get: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        console.error('Error fetching trips:', err);
        return res.status(500).json({ message: 'Error fetching trips', error: err });
    }
};

// Get: /trips/:code - find a single trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const code = req.params.code;
        const trip = await Trip.findOne({ code }).exec();
        if (!trip) {
            return res.status(404).json({ message: `No trip found with code ${code}` });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        console.error('Error fetching trip:', err);
        return res.status(500).json({ message: 'Error fetching trip', error: err });
    }
};

// Post: /trips - create a new trip
const tripsAddTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {
        try {
            const newTrip = new Trip({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            });

            const q = await newTrip.save();
            if (!q) {
                return res.status(400).json({ message: 'Error creating trip' });
            } else {
                return res.status(201).json(q);
            }
        } catch (err) {
            console.error('Error creating trip:', err);
            return res.status(500).json({ message: 'Error creating trip', error: err });
        }
    });
};

// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        )
        .then(trip => {
            if (!trip) {
                return res.status(404).send({ message: "Trip not found with code " + req.params.tripCode });
            }
            res.send(trip);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Trip not found with code " + req.params.tripCode });
            }
            return res.status(500).json(err);
        });
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
