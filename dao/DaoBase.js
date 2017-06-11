/**
 * DaoBase
 * author:sgm
 */

function DaoBase (Model){
    this.model = Model;
}

//create
DaoBase.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error);
        return callback(doc);
    });
};


DaoBase.prototype.getById = function (id, callback) {
    this.model.findOne({id:id}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


DaoBase.prototype.getByMovieId = function (id, callback) {
    this.model.find({movie_id:id}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

DaoBase.prototype.getByHallId = function (cid, hid, callback) {
    this.model.findOne({cenima_id:cid,id:hid}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

DaoBase.prototype.getByCenimaId = function (id, callback) {
    this.model.find({cenima_id:id}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

DaoBase.prototype.getByticket = function (cid,hid,mid, callback) {
    this.model.find({cenima_id:cid,hall_id:hid,movie_id:mid}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

DaoBase.prototype.getDateticket = function (date, callback) {
    this.model.find({date:date}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

DaoBase.prototype.getNameticket = function (name, callback) {
    this.model.find({user_name:name}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

DaoBase.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


DaoBase.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


DaoBase.prototype.getAll = function (callback) {
    this.model.find({}, function(error,model){
        if(error) return callback(error,null);
        return callback(null, model);
    });
};

DaoBase.prototype.delete = function (id, callback){
    this.model.remove({'id':id}, function(error){
        if(error) return callback(error);
        return callback(null);
    });
};


DaoBase.prototype.update = function( conditions, update , callback) {
    this.model.update(conditions, update,  function (error) {
        if(error) return callback(error);
        return callback(null);
    });
};

DaoBase.prototype.getMax=function(callback){
     this.model.findOne({}, {sort: {id: -1}},function(error){
        if(error) return callback(error,null);
        return callback(null, model);
    });
}

module.exports = DaoBase;