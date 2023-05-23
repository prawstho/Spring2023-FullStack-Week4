//we need a http server
const http = require('http');
// add a global for debugging
global.DEBUG = true;

const server = http.createServer((request, response) => {
    if(DEBUG) console.log(request.url, request.method);
    switch(request.url) {
        case '/':
            response.statusCode = 200;
            response.end(`/ route was requested.`)
            break;
        case '/about':
            response.statusCode = 200;
            response.end(`/about route was requested.`)
            break;
        case '/contact':
            response.statusCode = 200;
            response.end(`/contact route was requested.`)
            break;
        case '/subscribe':
            response.setHeader('Set-cookie', 'subscription=New');
            response.statusCode = 200;
            response.end(`/subscribe route was requested.`)
            break;
        default:
            response.statusCode = 404;
            response.end(`a 404 route was requested.`)
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});