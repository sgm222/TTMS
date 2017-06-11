/*
  * Movies
  * author:sgm
*/
var MovieDao = require("../dao/MovieDao");
var MoviesModel = require("./../models").Movies;
var addmoviemodel=MoviesModel.find({});
var path = require('path');
var url = require('url');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
exports.list = function (req, res) {
    MovieDao.getAll(function (err, movie) {
          res.send(movie);
    });
};
exports.getid=function (req,res) {
     MovieDao.getById(req.query.id,function (err, movie) {
          res.send(movie);
          console.log(movie);
    });
}
exports.index = function (req, res) {
    res.send("fdhsjfh");
};

exports.addmovie = function (req, res) {
  console.log('aaa');
  addmoviemodel.findOne({name:req.body.name}, function (err, movie) {
          if (movie) {
              return res.json({err:"此电影已经存在"});
          }
          else{
            MoviesModel.findOne({}).sort({id: -1}).then((obj)=>{
              var createmovie=req.body;
              createmovie.id=(parseInt(obj.id)+1)+"";
              MovieDao.create(createmovie,function (err, movie) {
                     res.send(movie);
                }); 
            });
          }
  });
}


exports.delmovie = function(req, res) { 
  MovieDao.delete(req.query.id,function (err, movie) {
          res.send(movie);
  });
};


exports.updatemovie = function(req, res) { 
  console.log("update");
  var movie=req.body;
  console.log(movie);
  MoviesModel.findOneAndUpdate({"id":movie.id}, {$set:movie}).then((obj)=>{
    //返回更新完成后的对象
      res.send(obj);
      console.log(obj);
  });
};