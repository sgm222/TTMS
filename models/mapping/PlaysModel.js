/**
 * PlaysModel
 * author:sgm
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
	id:Number,
    cenima_id:Number,
    cenima_name:String,
    hall_id:Number,
    hall_name:String,
	movie_id:Number,
    movie_name:String,
	movie_price:Number,
    movie_start:String,
    movie_end:String
},{
  versionKey: false
});

mongoose.model('Plays', schema);
