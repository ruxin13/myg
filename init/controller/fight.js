var express = require('express');
var router = express.Router();
var fs = require("fs");

var p = JSON.parse(fs.readFileSync("./config/charactor.json"));
var m = JSON.parse(fs.readFileSync("./config/monster.json")).m;
var E = JSON.parse(fs.readFileSync("./config/equipment.json"));
var p_B = [];

router.get('/', function(req, res, next) {
  res.send(p);
});


module.exports = router;