const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register Model
const Model = mongoose.model('trips');

// Get: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    try {
        const q = await Model.find({}).exec();

        // Uncomment the following Line to show results of query on the Console
        // console.log(q);

        if (!q || q.length === 0) {
            return res.status(404).json({ message: 'No trips found' }); //database return no data
        } else {
            return res.status(200).json(q); // return resulting trip
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching trips', error: err });
    }
};
// Get: /trips/:code - find a single trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const code = req.params.code;
        const trip = await Model.findOne({ code }).exec();

        // Uncomment the following Line to show results of query on the Console
        //console.log(trip);

        if (!trip) {
            return res.status(404).json({ message: `No trip found with code ${code}` });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching trip', error: err });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
