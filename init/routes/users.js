var express = require('express');
var router = express.Router();




/* GET users listing. */
router.get('/', function(req, res, next) {

  fight(p, m);
  res.send(p);
});





function fight(a, b) {
  var act = true;

  function atk2(a, b) {
    var ret = {};
    if (act) {
      ret.hp = atk(a, b);
      ret.name = b.name;
    } else {
      ret.hp = atk(b, a);
      ret.name = a.name;
    }
    if (ret.hp <= 0) {
      ret.hp = 0;
      console.log("<li>" + ret.name + " has been dead!" + "</li>");
      countEquip(a, b);
    } else {
      atk2(a, b);
    }
    act = !act;
  }



  function atk (a, b) {
    var hurt = a.atk - b.def;
    if (hurt <= 0) {hurt = 1}
    b.hp = b.hp - hurt;
    if (b.hp < 0) {b.hp = 0}
    console.log("<li>" + a.name + " hurt " + b.name + " with " + hurt + "</li>");
    return b.hp;
  }

}


function getArrayItems(arr, num) {
  var temp_array = [];
  for (var index in arr) {
    temp_array.push(arr[index]);
  }
  var return_array = [];
  for (var i=0; i<num; i++) {
    if (temp_array.length > 0) {
      var arrIndex = Math.floor(Math.random() * temp_array.length);
      return_array[i] = temp_array[arrIndex];
      temp_array.splice(arrIndex, 1);
    } else {
      break;
    }
  }
  return return_array;
}
function countEquip(a, b) {
  var atker = a.equip ? a : b;
  var retArr = getArrayItems(atker.equip, randomFrom(0, atker.equip.length));
  retArr.forEach(function (t) {
    p_B.push(E[t]);
  })
}

function randomFrom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = router;
