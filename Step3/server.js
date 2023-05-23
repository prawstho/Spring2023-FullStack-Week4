//we need a http server
const http = require('http');
// Put the routes in their own file
const routes = require('./routes.js');
// add a global for debugging
global.DEBUG = false;

// load the logEvents module
const logEvents = require('./logEvents');
// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

const server = http.createServer((request, response) => {
    if(DEBUG) console.log(request.url, request.method);
    let path = "./views/";
    switch(request.url) {
        case '/':
            myEmitter.emit('log', request.url, 'INFO', 'root of site was visited');
            path += 'index.html';
            response.statusCode = 200;
            routes.indexPage(path, response);
            break;
        case '/about':
            myEmitter.emit('log', request.url, 'INFO', 'about page was visited');
            path += 'about.html';
            response.statusCode = 200;
            routes.aboutPage(path, response);
            break;
        case '/contact':
            myEmitter.emit('log', request.url, 'INFO', 'contact page was visited');
            path += 'contact.html';
            response.statusCode = 200;
            routes.contactPage(path, response);
            break;
        case '/subscribe':
            myEmitter.emit('log', request.url, 'WARNING', 'subscribe page was visited');
            path += 'subscribe.html';
            response.setHeader('Set-cookie', 'subscription=New');
            response.statusCode = 200;
            routes.subscribePage(path, response);
            break;
        default:
            myEmitter.emit('log', request.url, 'ERROR', '404 page was required');
            path += '404.html';
            response.statusCode = 404;
            routes.fourOfourPage(path, response);
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});