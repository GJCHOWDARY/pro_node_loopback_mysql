var async = require('async');
module.exports = function(app) {

  /* Running the autoupdates results in a memory leak error
   * unless maxListeners is set. I change it back to the
   * original value after the updates complete. */
  var maxListeners = require('events').EventEmitter.prototype._maxListeners;
  require('events').EventEmitter.prototype._maxListeners = 100;

  var datasource = app.dataSources.mysqlDs;
  var modelNames = [
    "AccessToken",
    "ACL",
    "RoleMapping",
    "Role",
    "User",
    "Note",
    "poducts"
  ];

console.log(process.env.NODE_ENV,"FFFFF");

  if (process.env.NODE_ENV=='SEED_DB') {
    console.log("welllll");
    async.forEach(modelNames, function (modelName, callback){
       datasource.automigrate(modelName, function (err) {
         if (err) throw err;
         callback(); // tell async that the iterator has completed
       });
      }, function(err) {
       process.exit();
    });
  } else if(process.env.NODE_ENV=='UPDATE_DB') {
    async.forEach(modelNames, function (modelName, callback){
       datasource.autoupdate(modelName, function (err) {
         if (err) throw err;
         callback(); // tell async that the iterator has completed
       });
      }, function(err) {
       process.exit();
    });
  }


  require('events').EventEmitter.prototype._maxListeners = maxListeners;
};
