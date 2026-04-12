var cc__spreadArrays = __spreadArrays;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_Utils = function () {
  function _ctor() {}
  _ctor.formatSeconds = function (t, e) {
    undefined === e && (e = "h:i:s");
    t = Number(t);
    var n = {};
    n.h = Number.parseInt(String(t / 3600));
    n.i = Number.parseInt(String((t - 3600 * n.h) / 60));
    n.s = Number.parseInt(String(t - 3600 * n.h - 60 * n.i));
    n.h < 10 && (n.h = "0" + n.h);
    n.i < 10 && (n.i = "0" + n.i);
    n.s < 10 && (n.s = "0" + n.s);
    return e.replace("h", n.h).replace("i", n.i).replace("s", n.s);
  };
  _ctor.getObjLen = function (t) {
    var e = 0;
    for (var n in t) {
      e++;
    }
    return e;
  };
  _ctor.getTimeByDesc = function (t) {
    var e = Math.floor(t / 60);
    var n = t % 60;
    return (e < 10 ? "0" + e : e) + ":" + (n < 10 ? "0" + n : n);
  };
  _ctor.toXY = function (t, e) {
    var n = t.convertToWorldSpaceAR(cc.v2(0, 0));
    return e.convertToNodeSpaceAR(n);
  };
  _ctor.isChinese = function (t) {
    return /[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(t);
  };
  _ctor.shuffle = function (t) {
    var e;
    var n;
    for (var o = t.length; o;) {
      n = t[e = Math.floor(Math.random() * o--)];
      t[e] = t[o];
      t[o] = n;
    }
    return t;
  };
  _ctor.shuffleArray = function (t) {
    var e;
    var n = t.reduce(function (t, e, n) {
      if (-1 === e) {
        return cc__spreadArrays(t, [n]);
      } else {
        return t;
      }
    }, []);
    var i = t.filter(function (t) {
      return -1 !== t;
    });
    for (var a = i.length - 1; a > 0; a--) {
      var r = Math.floor(Math.random() * (a + 1));
      e = [i[r], i[a]];
      i[a] = e[0];
      i[r] = e[1];
    }
    return t.map(function (t, e) {
      if (n.includes(e)) {
        return -1;
      } else {
        return i.pop();
      }
    });
  };
  _ctor.compareVersions = function (t, e) {
    var n = t.split(".");
    var o = e.split(".");
    var i = Math.max(n.length, o.length);
    for (var a = 0; a < i; a++) {
      var r = parseInt(n[a] || 0, 10);
      var s = parseInt(o[a] || 0, 10);
      if (r < s) {
        return -1;
      }
      if (r > s) {
        return 1;
      }
    }
    return 0;
  };
  _ctor.APos2BposVey = function (t, e, n) {
    var o = e.x - t.x;
    var i = e.y - t.y;
    if (0 === n) {
      return 0;
    } else {
      return Math.sqrt(o * o + i * i) / n;
    }
  };
  _ctor.generateRandomLengths = function (t, e) {
    var n = [];
    var o = t;
    for (var i = 0; i < e - 1; i++) {
      var a = Math.floor(o / (e - i));
      var r = Math.floor(Math.random() * a) + 1;
      n.push(r);
      o -= r;
    }
    n.push(o);
    return n;
  };
  _ctor.moveElementInArray = function (t, e, n) {
    var o = t.splice(e, 1)[0];
    t.splice(n, 0, o);
    return t;
  };
  _ctor.moveArrayToEnd = function (t, e, n) {
    undefined === n && (n = []);
    var o = [];
    var i = [];
    for (var a = 0; a < e.length; a++) {
      if (e[a] >= 0) {
        o[a] = [];
        for (var r = 0; r < t.length; r++) {
          if (e[a] === t[r]) {
            (l = {})[r] = t[r];
            o[a].push(l);
          }
        }
      }
    }
    for (a = 0; a < o.length; a++) {
      var s = Math.floor(2 * Math.random()) + 1;
      for (r = 0; r < s; r++) {
        if (o[a]) {
          var c = Math.floor(Math.random() * (o[a].length - 1));
          i.push(o[a][c]);
        }
      }
    }
    if (t.length - i.length <= 5) {
      return t;
    }
    var u = t.length;
    for (r = 0; r < i.length; r++) {
      for (a = u - r; a > 0; a--) {
        if (t[a] > -1) {
          u = a;
          var l = i[r];
          var f = Number(Object.entries(l)[0][0]);
          var d = t[a];
          var h = t[f];
          t[a] = h;
          t[f] = d;
          break;
        }
      }
    }
    return t;
  };
  _ctor.changeEffect = function (t, e) {
    var n;
    n = t ? cc.Material.createWithBuiltin("2d-sprite", 0) : cc.Material.createWithBuiltin("2d-gray-sprite", 0);
    e.getComponent(cc.Sprite).setMaterial(0, n);
  };
  _ctor.curDayZeroTime = function () {
    return new Date().setHours(0, 0, 0, 0);
  };
  _ctor.generateSequence = function (t) {
    return Array.from({
      length: t
    }, function (t, e) {
      return e + 1;
    });
  };
  _ctor.getRandom = function (t, e) {
    return Math.floor(Math.random() * (e - t) + t);
  };
  _ctor.getRealRandom = function (t, e) {
    return Math.random() * (e - t) + t;
  };
  _ctor.getRandomMax = function (t) {
    return Math.floor(Math.random() * t);
  };
  _ctor.getRandomByArray = function (t) {
    try {
      return t[this.getRandomMax(t.length)];
    } catch (t) {
      console.error("获取数组随机值异常", t);
    }
    return {};
  };
  _ctor.getArrayDifference = function (t, e) {
    var n = t.filter(function (t) {
      return !e.includes(t);
    });
    var i = e.filter(function (e) {
      return !t.includes(e);
    });
    return cc__spreadArrays(n, i);
  };
  _ctor.getRandomFromArray = function (t) {
    if (0 === t.length) {
      return null;
    } else {
      return t[Math.floor(Math.random() * t.length)];
    }
  };
  return _ctor;
}();
exports.default = def_Utils;