var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/dong';

module.exports = function (req, res) {
  const {email, pwd} = req.body
  mongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const swallow = db.db('swallow');
    const user = swallow.collection('user');
    user.find({'email': email}).toArray(function (err, data) {
      if (err) throw err;
      if (data.length) {
        if (data[0].pwd === pwd) {
          user.update({'email': email},{$set: {"lasttime": new Date().getTime()}}, function (err) {
            if (err) throw err;
            res.json({
              code: 0,
              err: 0,
              msg: '登录成功',
              data: {
                email: data[0].email,
                userId: data[0].userId,
                nickName: data[0].nickname,
                lasttime: data[0].lasttime
              }
            });
          })
        } else {
          res.json({
            code: 2,
            err: 0,
            msg: '密码错误',
            data: []
          });
        }
      } else {
        res.json({
          code: 1,
          err: 0,
          msg: '用户不存在',
          data: []
        });
      }
    })
  })
}