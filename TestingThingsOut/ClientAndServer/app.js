const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');
const blogRoutes = require('./Routes/blogRoutes');
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

// express app
const app = express();

// connect to Mongodb
mongoose.connect(dbUri)
    .then(result => app.listen(process.env.PORT))
    .catch(error => console.log(error));

// register view engine
app.set('view engine', 'ejs');
// set the directory that our views are stored in
app.set('views', 'Views');

// middleware & static files
app.use(express.static('Public'));
app.use(express.urlencoded({ extended: true }));
// 3rd party middleware logger
app.use(morgan('dev'));
app.use((request, response, next) => {
    response.locals.path = request.path;
    next();
});

// routes
app.get('/', (request, response) => {
    response.redirect('/blogs');
});

app.get('/about', (request, response) => {
   response.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page only hit if none of the other handlers above are a match for the requested url
app.use((request, response) => {
    response.status(404).render('404', { title: '404' });
});