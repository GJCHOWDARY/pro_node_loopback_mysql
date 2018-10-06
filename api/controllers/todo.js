'use strict'

var path = require('path');
var dbnew = require(path.resolve('models')),Todo=dbnew.Todos,TodoItem=dbnew.TodoItem;

exports.creatTodos = function(req, res) {
    console.log("myyyyyyy",req.body);
    var addDeal =req.body;
      console.log("deeeeeeee",addDeal);
      Todo.create(addDeal).then(result => {
        res.status(200).json(result);
      }).catch(err => {
        res.status(500).send(err);
      });
 };

 exports.getTodos = function(req, res) {
        Todo.findAll({
      include: [{
        model: TodoItem,
        as: 'todoItems',
      }],}).then(result => {
         res.status(200).json(result);
       }).catch(err => {
         res.status(500).send(err);
       });
  };

  // var jsonString = '';
  //   req.on('data', function (data) {
  //   	jsonString += data;
  //     if (jsonString.length > 1e6)
  //     	req.connection.destroy();
  //   });
  //   req.on('end', function () {
  //   	// var requestData = JSON.parse(jsonString);
  //   console.log("welcome",jsonString);
  //   var data = { title: jsonString.title }
  //   Todo.create(data);
  //   res.send({status:"success"})
  //
  //   });
