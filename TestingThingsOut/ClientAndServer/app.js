const express = require('express');
const path = require('path');

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (request, response) => {
    //response.send('<p>home page</p>');
    response.sendFile('index.html', {root: path.join(__dirname, '/Views')});
});

app.get('/about', (request, response) => {
    response.sendFile('about.html', {root: path.join(__dirname, '/Views')});
});
app.get('/blog', (request, response) => {
    response.sendFile('blog.html', {root: path.join(__dirname, '/Views')});
});


// redirects
app.get('/about-us', (request, response) => {
    response.redirect('/about');
});

// 404 page only hit if none of the other handlers above are a match for the requested url
app.use((request, response) => {
    response.sendFile('404.html', {root: path.join(__dirname, '/Views')});
});