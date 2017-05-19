/*
  *mongodb
  *author:sgm
 */
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/TTMS');

var db = mongoose.connection;
db.on('error', function(err){
    console.error('connect to ttms error.');
    process.exit(1);
});
db.once('open', function () {
    console.log('ttms has been connected.');
});

var models_path = __dirname + '/../models/mapping'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});