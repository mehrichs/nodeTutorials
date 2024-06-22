const express = require('express');
const path = require('path');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// set the directory that our views are stored in
app.set('views', 'Views');

// listen for requests
app.listen(3000);

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/about', (request, response) => {
   response.render('about');
});

app.get('/blogs/create', (request, response) => {
    response.render('create');
});

// 404 page only hit if none of the other handlers above are a match for the requested url
app.use((request, response) => {
    response.status(404).render('404');
});