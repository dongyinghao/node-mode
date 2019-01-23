var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/';

module.exports = function (req, res) {
  var params = req.body
  mongoClient.connect(url, {useNewUrlParser:true}, function (err, db) {
    if (err) throw err
    var swallow = db.db('swallow')
    var user = swallow.collection('user')
    user.find({'email': params.email}).toArray(function (err, result) {
      if (err) throw err;
      if (result.length) {
        res.json({
          err: 0,
          msg: '该邮箱已被注册',
          code: 1
        });
      } else {
        res.json({
          err: 0,
          msg: '邮箱可用',
          code: 0
        });
      }
    })
  })
}
