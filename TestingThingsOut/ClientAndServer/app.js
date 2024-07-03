const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');
const Blog = require('./Models/blog');
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

// express app
const app = express();

const port = 3000;

// connect to Mongodb
mongoose.connect(dbUri)
    .then((result) => app.listen(port))
    .catch((error) => console.log(error));

// register view engine
app.set('view engine', 'ejs');
// set the directory that our views are stored in
app.set('views', 'Views');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('Public'));
// 3rd party middleware logger
app.use(morgan('dev'));

// route handlers
app.get('/', (request, response) => {
    const blogs = [
        {title:'Ready Player One', snippet:'Sci-Fi book about a virtual reality contest where the winner gets control of the game.'},
        {title:'Ready Player Two', snippet:'Sci-Fi book about the winner of a virtual reality contest and how he deals with the fallout.'},
        {title:'Tales from a Dying Earth', snippet:'Sci-Fi book about post apocalyptic Earth in the far off future when the sun is running out of fuel.'}
    ];
    response.render('index', {title: 'Home', blogs});
});

app.get('/about', (request, response) => {
   response.render('about', {title: 'About'});
});

app.get('/blogs/create', (request, response) => {
    response.render('create', {title: 'Create a new Blog'});
});

// 404 page only hit if none of the other handlers above are a match for the requested url
app.use((request, response) => {
    response.status(404).render('404', {title: '404'});
});