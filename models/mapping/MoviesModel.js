/**
 * MoviesModel
 * author:sgm
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
	id:Number,
    name:String,
    url:String,
    date:String,
    times:Number,
    direction:String
});

mongoose.model('Movies', schema);
