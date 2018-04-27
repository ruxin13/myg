var p = {
  id: "p",
  name: "Aston",
  fhp: 20,
  hp: 20,
  atk: 18,
  def: 8
};
var m = {
  id: "m",
  name: "Jorge",
  fhp: 20,
  hp: 20,
  atk: 7,
  def: 5,
  equip: [1, 2, 3, 4, 5]
};
var E = {
  "1": {id: 1, type: 1, name: "tld", atk: 10, def: 0},
  "2": {id: 2, type: 1, name: "ytj", atk: 9, def: 0},
  "3": {id: 3, type: 1, name: "ys", atk: 8, def: 0},
  "4": {id: 4, type: 1, name: "yy", atk: 5, def: 0},
  "5": {id: 5, type: 1, name: "cjzz", atk: 3, def: 0}
};
var p_B = [];


/**
 * 攻击计算
 */
function atk (a, b) {
  var hurt = a.atk - b.def;
  if (hurt <= 0) {hurt = 1}
  b.hp = b.hp - hurt;
  if (b.hp < 0) {b.hp = 0}
  renderHurt(b, hurt);
  $("#w").append("<li>" + a.name + " hurt " + b.name + " with " + hurt + "</li>");
  return b.hp;
}
/**
 * 战斗过程
 */
function fight(a, b) {
  $("#w").html("");
  var act = true;
  var war = setInterval(function () {
    var ret = {};
    if (act) {
      ret.hp = atk(a, b);
      ret.name = b.name;
      renderHP(b);
    } else {
      ret.hp = atk(b, a);
      ret.name = a.name;
      renderHP(a);
    }
    if (ret.hp <= 0) {
      clearInterval(war);
      ret.hp = 0;
      $("#w").append("<li>" + ret.name + " has been dead!" + "</li>");
      countEquip(a, b);
    }
    scrollBottom();
    act = !act;
  }, 500);
}
/**
 * HP显示
 */
function renderHP(o) {
  o.percent = o.hp / o.fhp * 100 + "%";
  $("#" + o.id).siblings(".hpbg").find(".hp").css("width", o.percent);
  return o;
}
/**
 * 伤害显示
 */
function renderHurt(o, n) {
  $("#" + o.id).parent().append('<div class="hurt">-' + n + '</div>');
  setTimeout(function () {
    $("#" + o.id).siblings(".hurt").remove();
  }, 800);
}
/**
 * 信息窗口滚动到底部
 */
function scrollBottom() {
  $("#w").scrollTop(9999999);
}

/**
 * 在数组中取出指定个数的不重复值
 */
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

/**
 * 计算物品--多个
 */
function countEquip(a, b) {
  var atker = a.equip ? a : b;
  var retArr = getArrayItems(atker.equip, randomFrom(0, atker.equip.length));
  retArr.forEach(function (t) {
    p_B.push(E[t]);
  })
}
/**
 * 指定区间取1个随机数
 */
function randomFrom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


$(function () {
  $("#start").on("click", function () {
    fight(m, p);
  });
});