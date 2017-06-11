/*
  * Movies
  * author:sgm
*/
var TicketDao = require("../dao/TicketDao");
var TicketsModel = require("./../models").Tickets;
var path = require('path');
var url = require('url');
exports.list = function (req, res) {
    TicketDao.getAll(function (err, movie) {
          res.send(movie);
    });
};
exports.ticketdate = function (req, res) {
   console.log("ticketdate");
    console.log(req.query.date);
    TicketDao.getDateticket(req.query.date,function (err, ticket) {
          res.send(ticket);
    });
};

exports.ticketname = function (req, res) {
    TicketDao.getNameticket(req.query.name,function (err, ticket) {
          res.send(ticket);
    });
};

exports.addticket = function (req, res) {
      var createticket=req.body;
      console.log(createticket);
      TicketDao.create(createticket,function (err, ticket) {
             res.send(ticket);
        }); 
}
