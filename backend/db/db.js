// db.js
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected');
        return conn;
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
