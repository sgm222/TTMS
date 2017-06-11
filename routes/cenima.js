/*
  * cenimas
  * author:sgm
*/
var CenimaDao = require("../dao/CenimaDao");
var CenimasModel = require("./../models").Cenimas;
var addcenimamodel=CenimasModel.find({});
var PlayDao = require("../dao/PlayDao");
var HallDao = require("../dao/HallDao");
var HallsModel = require("./../models").Halls;
var addhallmodel=HallsModel.find({});
var path = require('path');
exports.list = function (req, res) {
    CenimaDao.getAll(function (err, cenima) {
        res.send(cenima);
    });
};

exports.listhall = function (req, res) {
    HallDao.getAll(function (err, hall) {
        res.send(hall);
    });
};

exports.getticket = function (req, res) {
    PlayDao.getByticket(req.query.cid,req.query.hid,req.query.mid,function (err, play) {
          res.send(play);
          console.log(play);
    });
};

exports.getmovieid = function (req, res) {
    PlayDao.getByMovieId(req.query.id,function (err, play) {
          res.send(play);
          console.log(play);
    });
};

exports.getcenimaid=function (req,res) {
     PlayDao.getByCenimaId(req.query.id,function (err, play) {
          res.send(play);
    });
};

exports.gethall=function (req,res) {
     HallDao.getByHallId(req.query.cid,req.query.hid,function (err, hall) {
          res.send(hall);
          return hall;
        });
};

exports.addcenima = function (req, res) {
  console.log('aaa');
  addcenimamodel.findOne({name:req.body.name}, function (err, cenima) {
          if (cenima) {
              return res.json({err:"此影院已经存在"});
          }
          else{
            CenimasModel.findOne({}).sort({id: -1}).then((obj)=>{
              var createcenima=req.body;
              createcenima.id=(parseInt(obj.id)+1)+"";
              CenimaDao.create(createcenima,function (err, cenima) {
                     res.send(cenima);
                }); 
            });
          }
  });
}


exports.delcenima = function(req, res) { 
  CenimaDao.delete(req.query.id,function (err, cenima) {
          res.send(cenima);
  });
};


exports.updatecenima = function(req, res) { 
  var cenima=req.body;
  console.log(cenima);
  CenimasModel.findOneAndUpdate({"id":cenima.id}, {$set:cenima}).then((obj)=>{
    //返回更新完成后的对象
      res.send(obj);
      console.log(obj);
  });
};

exports.getcenimahall=function (req,res) {
     HallDao.getByCenimaId(req.query.id,function (err, hall) {
          res.send(hall);
          console.log(hall); 
        });
};



exports.addhall = function (req, res) {
      HallsModel.findOne({cenima_id:req.query.id}).sort({id: -1}).then((obj)=>{
        var createhall=req.body;
        createhall.id=(parseInt(obj.id)+1)+"";
        createhall.cenima_id=req.query.id;
        HallDao.create(createhall,function (err, cenima) {
               res.send(cenima);
          }); 
  });
}


exports.delhall = function(req, res) { 
  HallDao.delete(req.query.id,function (err, hall) {
          res.send(hall);
  });
};


exports.updatehall = function(req, res) { 
  console.log("update");
  var hall=req.body;
  console.log(hall.id);
  HallsModel.findOneAndUpdate({"id":hall.id}, {$set:hall}).then((obj)=>{
    //返回更新完成后的对象
      res.send(obj);
    });
};

exports.updatetickethall = function(req, res) { 
  HallsModel.findOneAndUpdate({"id":req.query.id,"cenima_id":req.query.cid}).then((obj)=>{
    //返回更新完成后的对象
      res.send(obj);
    });
};


