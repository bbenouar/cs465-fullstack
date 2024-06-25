const mongoose = require('mongoose');
const { Trip } = require('../models/travlr');

// Get: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        console.log(trips);
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching trips', error: err });
    }
};

// Get: /trips/:code - find a single trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const code = req.params.code;
        console.log(`Fetching trip with code: ${code}`);
        const trip = await Trip.findOne({ code }).exec();
        console.log(`Trip found: ${trip}`);
        if (!trip) {
            return res.status(404).json({ message: `No trip found with code ${code}` });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        console.error(`Error fetching trip: ${err}`);
        return res.status(500).json({ message: 'Error fetching trip', error: err });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};