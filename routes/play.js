/*
  * cenimas
  * author:sgm
*/
var PlayDao = require("../dao/PlayDao");
var PlaysModel = require("./../models").Plays;
var CenimaDao = require("../dao/CenimaDao");
var CenimasModel = require("./../models").Cenimas;
var MovieDao = require("../dao/MovieDao");
var MoviesModel = require("./../models").Movies;
var HallDao = require("../dao/HallDao");
var HallsModel = require("./../models").Halls;
var path = require('path');
exports.list = function (req, res) {
    PlayDao.getAll(function (err, play) {
        res.send(play);
    });
};

exports.addplay = function (req, res) {
  var play=req.body;
  console.log(play.movie_start);
  PlaysModel.findOne({movie_id:play.movie_id,cenima_id:play.cenima_id,movie_start:play.movie_start}, function (err, play) {
          if (play) {
              return res.json({err:"此演出计划已经存在"});
          }
          else{
            PlaysModel.findOne({}).sort({id: -1}).then((obj)=>{
              createplay=req.body;
              console.log(createplay.hall_id);
              createplay.id=(parseInt(obj.id)+1)+"";
              CenimasModel.findOne({id:createplay.cenima_id},function (err,cenima){
                  if(err)
                  {
                    return res.json({err:"请输入正确影院ID"});
                  }else{
                    createplay.cenima_name=cenima.name;
                    HallsModel.findOne({id:createplay.hall_id,cenima_id:createplay.cenima_id},function (err,hall){
                      createplay.hall_name=hall.name;
                      MoviesModel.findOne({id:createplay.movie_id},function (err,movie){
                        if(err){
                            return res.json({err:"请输入正确电影ID"});
                        }else{
                           createplay.movie_name=movie.name;
                            var s=createplay.movie_start.split(':');
                            var x=movie.times;
                            var y=parseInt(x/60);
                            var z=x%60;
                            var a=parseInt(s[0])+y;
                            var b=parseInt(s[1])+z;
                           createplay.movie_end=a+':'+b;
                           PlayDao.create(createplay,function (err, play) {
                             res.send(play);
                          }); 
                        }
                      });
                    });
                  }
              }); 
            });
          }
  });
}


exports.delplay = function(req, res) { 
  PlayDao.delete(req.query.id,function (err, play) {
          res.send(play);
  });
};


exports.updateplay = function(req, res) { 
  console.log("update");
  var play=req.body;
  PlaysModel.findOneAndUpdate({"id":play.id}, {$set:play}).then((obj)=>{
      res.send(obj);
      console.log(obj);
  });
};


