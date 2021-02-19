const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const appRoutes = require('./routes/stores');
const connectDB = require('./config/db');

// load env variables
dotenv.config({path: './config/config.env'});

// connect to database
connectDB();

const app = express();

// body parser
app.use(express.json());
// enable cors
app.use(cors());
// Routes
app.use(appRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening at port ${PORT} in ${
    process.env.NODE_ENV
} mode`));
