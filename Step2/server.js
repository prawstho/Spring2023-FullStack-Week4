//we need a http server
const http = require('http');
// Put the routes in their own file
const routes = require('./routes.js');
// add a global for debugging
global.DEBUG = true;

const server = http.createServer((request, response) => {
    if(DEBUG) console.log(request.url, request.method);
    let path = "./views/";
    switch(request.url) {
        case '/':
            path += 'index.html';
            response.statusCode = 200;
            routes.indexPage(path, response);
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200;
            routes.aboutPage(path, response);
            break;
        case '/contact':
            path += 'contact.html';
            response.statusCode = 200;
            routes.contactPage(path, response);
            break;
        case '/subscribe':
            path += 'subscribe.html';
            response.setHeader('Set-cookie', 'subscription=New');
            response.statusCode = 200;
            routes.subscribePage(path, response);
            break;
        default:
            path += '404.html';
            response.statusCode = 404;
            routes.fourOfourPage(path, response);
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});