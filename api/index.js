let express = require('express');
let router = express.Router();

let regist = require('./basic/regist'); // 注册
let login = require('./basic/login'); // 登录
let initialize = require('./basic/initialize'); // 初始化
let checkexist = require('./basic/checkexist'); // 检查邮箱是否被注册

let updatePortrait = require('./usercenter/updatePortrait'); // 用户上传头像

router.get('/basic/initialize', initialize)
      .post('/basic/regist', regist)
      .post('/basic/login', login)
      .post('/basic/checkexist', checkexist)
      .post('/usercenter/updatePortrait', updatePortrait);

module.exports = router