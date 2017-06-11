/*
  * routes
  * author:sgm
*/
var index = require('./index');
var user = require('./user');
var movie = require('./movie');
var cenima = require('./cenima');
var play = require('./play');
var ticket = require('./ticket');
module.exports = function (app) {
    app.get('/', index.index);
    app.get('/list', user.list);
    app.post('/signup', user.create);
    app.post('/login', user.login);
    app.get('/logout', user.logout);
    app.get('/checklogin', index.getLoginUser);
    app.get('/movie',movie.list); 
    app.get('/moviedirection',movie.getid);
    app.get('/cenima',cenima.list);
    app.get('/cenimamovie',cenima.getcenimaid);
    app.get('/moviecenima',cenima.getmovieid);
    app.get('/setcharts',cenima.gethall);
    app.post('/addmovie',movie.addmovie);
    app.put('/addmovie', movie.updatemovie);
    app.delete('/delmovie', movie.delmovie);
    app.post('/addcenima',cenima.addcenima);
    app.put('/addcenima', cenima.updatecenima);
    app.delete('/delcenima', cenima.delcenima);
    app.get('/cenimahall',cenima.getcenimahall);
    app.post('/addhall',cenima.addhall);
    app.put('/addhall', cenima.updatehall);
    app.delete('/delhall', cenima.delhall);
    app.get('/play',play.list);
    app.post('/addplay',play.addplay);
    app.put('/addplay', play.updateplay);
    app.delete('/delplay', play.delplay);
    app.get('/hall',cenima.listhall);
    app.post('/addticket',ticket.addticket);
    app.get('/tticket',cenima.getticket);
    app.get('/ticket',ticket.list);
    app.get('/ticketdate',ticket.ticketdate);
    app.get('/ticketname',ticket.ticketname);
    app.put('/updatetickethall', cenima.updatetickethall);
};