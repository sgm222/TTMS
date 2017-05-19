/*
 *MovieDao
 *author:sgm
 */

var DaoBase = require('./DaoBase'),
    movies = require('./../models').Movies;
var MovieDao = new DaoBase(movies);

module.exports = MovieDao;