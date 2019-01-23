var express = require('express');
var router = express.Router();

var regist = require('./basic/regist');
var login = require('./basic/login');
var initialize = require('./basic/initialize');
var checkexist = require('./basic/checkexist');

router.post('/basic/regist', function (req, res) {
  regist(req, res)
});

router.post('/basic/login', function (req, res) {
  login(req, res)
});

router.get('/basic/initialize', function (req, res) {
  initialize(req, res)
});

router.post('/basic/checkexist', function (req, res) {
  checkexist(req, res)
});

module.exports = router