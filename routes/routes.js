/*
  * routes
  * author:sgm
*/
var index = require('./index');
var user = require('./user');
var movie = require('./movie');
module.exports = function (app) {
    app.get('/', index.index);
    app.get('/list', user.list);
    app.post('/signup', user.create);
    app.post('/login', user.login);
    app.get('/logout', user.logout);
    app.get('/checklogin', index.getLoginUser);
    app.get('/movie',movie.list);
};