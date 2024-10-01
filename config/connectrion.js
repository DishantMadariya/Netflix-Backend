const mongoose = require('mongoose');
require('dotenv').config(); 
if (!process.env.MONGO_URL || process.env.MONGO_URL === '') {
    console.error('MONGO_URL environment variable is not set.');
    process.exit(1); // Exit the process if MONGO_URL is not set
} else {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Database connected.');
    }).catch(err => {
        console.error('Error connecting to database:', err);
    });

    const db = mongoose.connection;

    module.exports = db;
}