/**
 * Module dependencies.
 * author:sgm
 */
 
var express = require('express'), 
    routes = require('./routes/routes'),
    user = require('./routes/user'),
    movie = require('./routes/movie'),
    cenima = require('./routes/cenima'),
    http = require('http'), 
    path = require('path'),
    url = require('url'),
    fs = require('fs'), 
    colors = require('colors'),
    LocalStorage = require('node-localstorage').LocalStorage;

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('yur secret heroe'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function () {
    app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
