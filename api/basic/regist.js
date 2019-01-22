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
          msg: '账号已存在',
          code: 1,
          data: []
        });
      } else {
        var userIdIndex = swallow.collection('userIdIndex')
        userIdIndex.find({}).toArray(function (err, data) {
          if (err) throw err
          if (data.length) { // 已存在用户id
            var i = data[0].idindex
            userIdIndex.updateOne(data[0], {$set: { "idindex" : i + 1 }}, function (err) { // 用户id自增
              if (err) throw err
              user.insertOne({
                email: params.email,
                userId: i + 1,
                pwd: params.pwd,
                nickname: '燕子',
                lasttime: null
              }, function (err) {
                if (err) throw err
                res.json({
                  err: 0,
                  msg: '注册成功',
                  code: 0,
                  data: null
                });
              })
            })
          } else { // 无用户id时
            userIdIndex.insertOne({
              idindex: 1
            }, function (err) {
              if (err) throw err
              user.insertOne({
                email: params.email,
                userId: 1,
                pwd: params.pwd,
                nickname: '燕子',
                lasttime: null
              }, function (err) {
                if (err) throw err
                res.json({
                  err: 0,
                  msg: '注册成功',
                  code: 0,
                  data: null
                });
              })
            })
          }
        })
      }
    })
  })
}
