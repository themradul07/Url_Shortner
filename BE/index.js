const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes.js');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
