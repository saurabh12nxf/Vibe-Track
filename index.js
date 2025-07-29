require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journal');
const cors = require('cors'); // Import cors

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json()); // Allows parsing JSON bodies
app.use(cors()); // Enable CORS for all origins (for development)

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);

// Basic test route
app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));