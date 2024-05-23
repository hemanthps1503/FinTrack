// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db.js');

require('dotenv').config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Import routes
app.use(require('./routes/route'));

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port: http://localhost:${port}`);
});

// Handle server errors
app.on('error', (err) => {
    console.error('Failed to connect', err);
});
