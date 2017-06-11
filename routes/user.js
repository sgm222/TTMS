/*
 *  users 
 *  author:sgm
 */

var UsersModel = require("./../models").Users;
var path = require('path');
var userfindmodel=UsersModel.find({"flag":["user",""]});
var adminfindmodel=UsersModel.find({"$where":"this.flag == 'admin'"})
exports.list = function (req, res) {
    res.send("respond with a resource");
};
exports.create = function (req, res) {
    var createUser = new UsersModel(req.body);
    if(req.body.name=='')
        return res.json({err:"用户名不能为空"});
    if(req.body.flag=="user" || req.body.flag=="")
    {
        userfindmodel.findOne({name:req.body.name}, function (err, user) {
            if (err)
                return res.json({err:err});
            if (user) {
                return res.json({err:"用户名已经存在"});
            }
            createUser.save(function (err, user) {
                if (err) {
                    return res.json({err:err});
                }
                req.session["user"] = user;
                res.json();
            });
        });
    }
    else{
        var reg=/admin+\d{4}$/;
        if(reg.exec(req.body.name))
        {
          adminfindmodel.findOne({name:req.body.name}, function (err, user) {
            if (err)
                return res.json({err:err});
            if (user) {
                return res.json({err:"用户名已经存在"});
            }
            createUser.save(function (err, user) {
                if (err) {
                    return res.json({err:err});
                }
                req.session["user"] = user;
                res.json();
            });
        });
      }else{
        return res.json({err:'注册格式不正确'});
      }
    }

};

exports.login = function (req, res) {
    //用户登录
    if(req.body.flag=="user" || req.body.flag==""){
    userfindmodel.findOne({name:req.body.name}, function (err, user) {
            if (err)
                return res.json({err:'cuola'});
            if (!user) {
                return res.json({err:'用户名不存在'});
            }
            if (!user.authenticate(req.body.password))
                return res.json({err:'密码错误'});
            req.session["user"] = user;
            res.json(user);
        });
    }

    //管理员登录
    else{
           adminfindmodel.findOne({name:req.body.name}, function (err, user) {
            if (err)
                return res.json({err:err});
            if (!user) {
                return res.json({err:'管理员名不存在'});
            }
            if (!user.authenticate(req.body.password))
                return res.json({err:'密码错误'});
            req.session["user"] = user;
            res.json(user);
        });
    }
};

exports.logout = function (req, res) {
    req.session["user"] = null;
    var html = path.normalize(__dirname + '/../views/index.html');
    res.sendfile(html);
};
