/*
 *TicketDao
 *author:sgm
 */

var DaoBase = require('./DaoBase'),
    tickets = require('./../models').Tickets;
var TicketDao = new DaoBase(tickets);

module.exports = TicketDao;