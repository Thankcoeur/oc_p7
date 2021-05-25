// Import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});


// création app express
const app = express();

// Résolution erreur CORS
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(limiter);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
