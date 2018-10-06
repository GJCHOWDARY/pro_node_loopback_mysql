'use strict';

module.exports = function(Poducts) {


  Poducts.getproducts = function(id, req, res, callback) {
    console.log("iiiiiiiid",id);
    Poducts.findById(id, function(err, user) {
      if (err) {
        callback(err);
      } else {
        console.log(user);
        res.status(200).send({
          "data": user
        });
      }
    });
  };


  Poducts.remoteMethod(
    'getproducts', {
      accepts: [{
        arg: 'id',
        type: 'number'
      }, {
        arg: 'req',
        type: 'object',
        http: {
          source: 'req'
        }
      }, {
        arg: 'res',
        type: 'object',
        http: {
          source: 'res'
        }
      }],
      http: {
        path: '/:id/getproducts/',
        verb: 'get'
      }
    }
  );

};
