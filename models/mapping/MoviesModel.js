/**
 * MoviesModel
 * author:sgm
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
	id:Number,
    name:String,
	img1:String,
	img2:String,
    img3:String,
    img4:String,
    img5:String,
    img6:String,
    date:String,
    times:Number,
    price:Number,
    director:String,
    actor:String,
    direction:String,
    directions:String
},{
  versionKey: false
});

mongoose.model('Movies', schema);
