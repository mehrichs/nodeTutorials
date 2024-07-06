const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');
const Blog = require('./Models/blog');
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
app.get('/blogs/create', (request, response) => {
    response.render('create', { title: 'Create a new Blog' });
});

app.get('/blogs', (request, response) => {
    Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
        response.render('index', { title: 'All Blogs', blogs: result });
    }).catch(error => {
        console.log(error);
    });
});

app.post('/blogs', (request, response) => {
    const blog = new Blog(request.body);
    blog.save()
    .then(result => {
        response.redirect('/blogs');
    }).catch(error => {
        console.log(error);
    });
});

app.get('/blogs/:id', (request, response) => {
    const id = request.params.id;
    Blog.findById(id)
    .then(result => {
        response.render('details', { blog: result, title: 'Blog Details' });
    }).catch(error => {
        console.log(error);
    });
});

app.delete('/blogs/:id', (request, response) => {
    const id = request.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        response.json({ redirect: '/blogs' });
    }).catch(error => {
        console.log(error);
    });
});

// 404 page only hit if none of the other handlers above are a match for the requested url
app.use((request, response) => {
    response.status(404).render('404', { title: '404' });
});