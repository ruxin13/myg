var p = {
  name: "Aston",
  hp: 50,
  atk: 18,
  def: 8
};
var m = {
  name: "Jorge",
  hp: 50,
  atk: 7,
  def: 5
};

Object.prototype.attack = function (be) {
  be.hp = atk(this, be);
  return be.hp;
  function atk(a, b) {
    console.log(a.name + " => " + b.name);
    var h = a.atk - b.def;
    if (h <= 0) {h = 1}
    return b.hp - (h);
  }
};

function fight(a, b) {
  var act = true;
  var war = setInterval(function () {
    var ret = {};
    if (act) {
      ret.hp = a.attack(b);
      ret.name = b.name;
    } else {
      ret.hp = b.attack(a);
      ret.name = a.name;
    }
    if (ret.hp <= 0) {
      clearInterval(war);
      ret.hp = 0;
      $("#w").append("<li>" + ret.name + " has been dead!" + "</li>");
    } else {
      $("#w").append("<li>" + ret.name + "'s hp has been left " + ret.hp + "</li>");
    }
    act = !act;
  }, 200);
}


$(function () {
  $("#start").on("click", function () {
    fight(m, p);
  });
});