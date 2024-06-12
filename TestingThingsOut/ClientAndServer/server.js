const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    //set header content type
    response.setHeader('Content-Type', 'text/html')

    let path = './Views/';
    switch(request.url){
        case '/':
            path += 'index.html';
            response.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200;
            break;
        case '/about-me':
            response.statusCode = 301;
            response.setHeader('Location', '/about')
            break;
        default:
            path += '404.html';
            response.statusCode = 404;
            break;
    }

    fs.readFile(path, (error, data) => {
        if(error){
            console.log(error);
            response.end();
        } else {
            //can either pass data to write and then end
            //or just pass directly to end if nothing else to write
            //response.write(data);
            response.end(data);
        }        
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});