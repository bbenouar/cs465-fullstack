// Bring in the DB Connection and the Trip schema
// seed.js
const { Trip } = require('./travlr'); // Import Trip model
const mongoose = require('./db'); // Ensure this establishes the connection

// Read seed data from JSON file
const fs = require('fs');
const path = require('path');

const tripsFilePath = path.join(__dirname, '..', '..', 'data', 'trips.json');
let trips;

try {
    trips = JSON.parse(fs.readFileSync(tripsFilePath, 'utf-8'));
} catch (error) {
    console.error('Error reading trips.json file:', error);
    process.exit(1);
}

// Delete any existing records, then insert seed data
const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        await Trip.insertMany(trips);
        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        // Close the MongoDB connection and exit
        await mongoose.connection.close();
        process.exit(0);
    }
};

// Seed the database
seedDB();
