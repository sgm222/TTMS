/*
 *MovieDao
 *author:sgm
 */

var DaoBase = require('./DaoBase'),
    MoviesModel = require('./../models').Movies;
var MovieDao = new DaoBase(MoviesModel);

module.exports = MovieDao;
