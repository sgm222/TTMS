/*
 *PlayDao
 *author:sgm
 */

var DaoBase = require('./DaoBase'),
    plays = require('./../models').Plays;
var PlayDao = new DaoBase(plays);

module.exports = PlayDao;