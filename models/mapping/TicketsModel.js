/**
 * TicketssModel
 * author:sgm
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
	id:Number,
    user_name:String,
    ticket_id:Number,
    time:String,
    date:String,
    cenima_id:Number,
    hall_id:Number,
    movie_id:Number,
    cenima_name:String,
    hall_name:String,
    movie_name:String,
    movie_price:Number
},{
  versionKey: false
});

mongoose.model('Tickets', schema);
