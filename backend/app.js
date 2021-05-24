//Import
const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/post.js');

const path = require('path');

//création application Express
const app = express();


//Résolution erreur CORS
app.use(cors())

//Parser les corps des requête + forcer parse d'objets inclus dans d'autres objets
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;