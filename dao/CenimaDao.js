/*
 *CenimaDao
 *author:sgm
 */

var DaoBase = require('./DaoBase'),
    cenimas = require('./../models').Cenimas;
var CenimaDao = new DaoBase(cenimas);

module.exports = CenimaDao;