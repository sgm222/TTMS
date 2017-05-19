/*
  * Movies
  * author:sgm
*/
var MovieDao = require("../dao/MovieDao")
var path = require('path');
exports.list = function (req, res) {
    MovieDao.getAll(function (err, movie) {
        res.send(movie);
    });
};
exports.index = function (req, res) {
    res.send("fdhsjfh");
};