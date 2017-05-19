/*
 * index
 * author:sgm
 */
var path = require('path');
exports.index = function (req, res) {
    var html = path.normalize(__dirname + '/../views/index.html');
    res.sendfile(html);
};

exports.getLoginUser = function (req, res) {
    res.json(req.session["user"] || {});
};
