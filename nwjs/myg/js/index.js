var fs = require('fs');

// config for global
var filePath = {
  "person": "./myg/config/person.json",
  "monster": "./myg/config/monster.json",
  "equip": "./myg/config/equipment.json",
  "user": "./myg/save/user.json",
  "level": "./myg/config/level.json"
};

// load default config
var G = {};
G["person"] = JSON.parse(fs.readFileSync(filePath.person).toString());
G["monster"] = JSON.parse(fs.readFileSync(filePath.monster).toString());
G["equip"] = JSON.parse(fs.readFileSync(filePath.equip).toString());
G["level"] = JSON.parse(fs.readFileSync(filePath.level).toString());
G["maxLevel"] = 10;

// load user
if (fs.readFileSync(filePath.user).toString()) {
  user = JSON.parse(fs.readFileSync(filePath.user).toString());
} else {
  user = G["person"];
  saveUser();
}

// init
$("#ck").text(user["ck"]);
renderRole(user, 1);
renderRole(G.monster["m" + user["ck"]], 2);
renderBag();

// start
$("#start").on("click", function () {
  console.log(user);
  fight(user, G.monster["m" + user["ck"]]);
});

// atk
function fight(a, b) {
  a.hp = a.fhp;
  b.hp = b.fhp;
  $("#w").html(" ");

  var act = true;
  var war = setInterval(function () {
    var ret = {};
    if (act) {
      ret.hp = atk(a, b);
      ret.name = b.name;
    } else {
      ret.hp = atk(b, a);
      ret.name = a.name;
    }
    if (ret.hp <= 0) {
      clearInterval(war);
      ret.hp = 0;
      $("#w").append("<li>" + ret.name + " has been dead!" + "</li>");
      if (act) {
        countEquip(a, b);
        user.hp = user.fhp;
        saveUser();
        console.log(user);
      }
    }
    act = !act;
  }, 500);
}

// hurt count
function atk(a, b) {
  var h = a.atk - b.def;
  if (h < 1) {h = 1}
  b.hp = b.hp - h;
  if (b.hp < 0) {b.hp = 0}
  renderHurt(b, h);
  $("#w").append("<li>" + a.name + " hurt " + b.name + " " + h + "</li>");
  return b.hp;
}
// render role
function renderRole(obj, pos) {
  var $position;
  if (pos && pos === 2) {
    $position = $(".pr");
  } else {
    $position = $(".pl");
    $("#coin").text(obj.money);
  }
  $position.find(".p").text(obj.name);
}
// render hurt
function renderHurt(o, n) {
  $("#" + o.id).parent().append('<div class="hurt">-' + n + '</div>');
  setTimeout(function () {
    $("#" + o.id).siblings(".hurt").remove();
  }, 800);
}
// random num
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
// random a number in area
function randomFrom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// equipment fall down
function countEquip(a, b) {
  var atker = a.equip ? a : b;
  var retArr = getArrayItems(atker.equip, randomFrom(0, atker.equip.length));
  var tmp = [];
  retArr.forEach(function (t) {
    var obj = {};
    obj.id = G.equip[t].id;
    obj.num = 1;
    tmp.push(obj);
  });
  expToLevel(G["monster"]["m" + user["ck"]]["exp"]);
  addCoin(atker.money);
  addToBag(tmp);
  renderBag();
}
// render bag
function renderBag() {
  var objs = user.p_B;
  if (objs && objs.length > 0) {
    var html = "";
    objs.forEach(function (t) {
      html += "<div>" + t.id + "=>" + t.num + "</div>"
    });
    $("#bag").html(html);
  }
}
// save user
function saveUser() {
  fs.writeFileSync(filePath.user, JSON.stringify(user));
}
// exp count level
function expToLevel(n) {
  var exp = n;
  var levelExp = G["level"][user.level];
  var curExp = user.exp;
  for (var i=0;i<G["maxLevel"];i++) {
    if (curExp + exp < levelExp) {
      user.exp = curExp + exp;
    } else {
      exp = exp - (levelExp - curExp);
      levelUp();
    }
  }
}
// level up
function levelUp() {
  if (G["maxLevel"] > user.level) {
    var level = user.level - 1;
    user.level++;
    curExp = 0;
    user.hp += level * 10;
    user.fhp += level * 10;
    user.atk += parseInt(level * 1.5);
    user.def += parseInt(level * 0.8);
    console.log("level up!");
  } else {
    console.log("up to max level");
  }
}
// add to bag
function addToBag(arr) {
  if (arr && arr.length > 0) {
    var bag = user.p_B;
    var hasRepeat = -1;
    for (var i=0;i<arr.length;i++) {
      for (var j=0;j<bag.length;j++) {
        if (arr[i].id === bag[j].id) {
          hasRepeat = j;
        }
      }
      if (hasRepeat > -1) {
        bag[hasRepeat].num += arr[i]["num"];
      } else {
        bag.push(arr[i]);
      }
    }
  }
}
// add coin
function addCoin(n) {
  user.money += n;
  $("#coin").text(user.money);
}