const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Ensure this model is correct

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
        if (!q) { // database returned no data
            return res.status(400).json({ message: 'Error creating trip' });
        } else { // return new trip
            return res.status(201).json(q);
        }

    } catch (err) {
        console.error('Error creating trip:', err); // Log the error
        return res.status(500).json({ message: 'Error creating trip', error: err });
    }
};

// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
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
            { new: true } // Return the updated document
        ).exec();

        if (!q) { // database returned no data
            return res.status(400).json({ message: 'Error updating trip' });
        } else { // return resulting updated trip
            return res.status(200).json(q);
        }

    } catch (err) {
        return res.status(500).json({ message: 'Error updating trip', error: err });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
