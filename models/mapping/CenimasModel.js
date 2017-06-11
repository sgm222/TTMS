/**
 * CenimasModel
 * author:sgm
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
	id:Number,
    name:String,
    tel:String,
    time:String,
    address:String,
},{
  versionKey: false
});

mongoose.model('Cenimas', schema);
