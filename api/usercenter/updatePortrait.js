const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/dong';
const formidable = require('formidable');
const util = require('util');

module.exports = function (req, res) {
  const {email} = req.body;
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) throw err;
    res.json({data: fields, daa: files, nn: req});
  });

  // mongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   const swallow = db.db('swallow');
  //   const user = swallow.collection('user');
  //   user.find({'email': email}).toArray(function (err, data) {
  //     if (err) throw err;
  //     if (data.length) {
  //
  //     } else {
  //       res.json({
  //         code: 1,
  //         err: 0,
  //         msg: '用户不存在',
  //         data: []
  //       });
  //     }
  //   })
  // })
}
