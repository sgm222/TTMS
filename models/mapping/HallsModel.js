/**
 * HallsModel
 * author:sgm
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
	id:Number,
    name:String,
    cenima_id:Number,
    row:Number,
    col:Number,
    unavailable:Array
});

mongoose.model('Halls', schema);
