/*
 *HallDao
 *author:sgm
 */

var DaoBase = require('./DaoBase'),
    halls = require('./../models').Halls;
var HallDao = new DaoBase(halls);

module.exports = HallDao;