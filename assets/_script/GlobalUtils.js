var cc__spreadArrays = __spreadArrays;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomValueInRange = exports.shuffleNonZero = exports.getXYFromPos = exports.getAngle = exports.shuffleArrayPartially = exports.sortByFrequency = exports.findMaxOccurrence = exports.deepClone = exports.uuid = exports.countGameLevelData = exports.getDiffArr = exports.takeValueFromArray = exports.getDistance = exports.getNumFromStr = exports.toXY2 = exports.toXY = exports.timerFormat = exports.shuffle = exports.random = undefined;
exports.random = function (t, e) {
  return Math.floor(Math.random() * (e - t + 1)) + t;
};
exports.shuffle = function (t) {
  var e;
  var n;
  for (var o = t.length; o;) {
    n = t[e = Math.floor(Math.random() * o--)];
    t[e] = t[o];
    t[o] = n;
  }
  return t;
};
exports.timerFormat = function (t, e) {
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
exports.toXY = function (t, e, n) {
  undefined === n && (n = cc.v2(0, 0));
  var o = t.convertToWorldSpaceAR(n);
  return e.convertToNodeSpaceAR(o);
};
exports.toXY2 = function (t, e) {
  var n = t.parent.convertToWorldSpaceAR(t.getPosition());
  return e.parent.convertToNodeSpaceAR(n);
};
exports.getNumFromStr = function (t) {
  return t.match(/\d+/g).map(Number)[0];
};
exports.getDistance = function (t, e) {
  var n = cc.v2(t.x - e.x, t.y - e.y);
  return Math.sqrt(n.x * n.x + n.y * n.y);
};
exports.takeValueFromArray = function (t, e, n) {
  undefined === n && (n = 3);
  var o = [];
  var i = 0;
  for (var a = t.length - 1; a >= 0; a--) {
    if (t[a] === e && i < n) {
      o.push(t.splice(a, 1)[0]);
      i++;
    }
  }
  console.warn("========", t, e, i);
  return o;
};
exports.getDiffArr = function (t, e) {
  return t.filter(function (t) {
    return !e.includes(t);
  });
};
exports.countGameLevelData = function (t) {
  var e = {};
  t.forEach(function (t) {
    e[t] = (e[t] || 0) + 1;
  });
  return e;
};
exports.uuid = function () {
  var t = [];
  for (var e = 0; e < 36; e++) {
    t[e] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
  }
  t[14] = "4";
  t[19] = "0123456789abcdef".substr(3 & t[19] | 8, 1);
  t[8] = t[13] = t[18] = t[23] = "-";
  return t.join("");
};
exports.deepClone = function e(n) {
  if (null === n || "object" != typeof n) {
    return n;
  }
  if (Array.isArray(n)) {
    return n.map(function (t) {
      return e(t);
    });
  }
  var o = {};
  for (var i in n) {
    n.hasOwnProperty(i) && (o[i] = e(n[i]));
  }
  return o;
};
exports.findMaxOccurrence = function (t) {
  var e = {};
  for (var n = 0; n < t.length; n++) {
    if (e[t[n]]) {
      e[t[n]]++;
    } else {
      e[t[n]] = 1;
    }
  }
  var o = 0;
  for (var i in e) {
    e[i] > o && (o = e[i]);
  }
  return o;
};
exports.sortByFrequency = function (t) {
  var e = {};
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    e[o] = e[o] ? e[o] + 1 : 1;
  }
  t.sort(function (n, o) {
    if (e[o] === e[n]) {
      return t.indexOf(n) - t.indexOf(o);
    } else {
      return e[o] - e[n];
    }
  });
  return t;
};
exports.shuffleArrayPartially = function (t, e) {
  var n;
  var o = cc__spreadArrays(t);
  e = Math.min(e, o.length - 1);
  for (var a = o.length - 1; a > 0; a--) {
    if (a < e) {
      var r = Math.floor(Math.random() * (a + 1));
      n = [o[r], o[a]];
      o[a] = n[0];
      o[r] = n[1];
    }
  }
  return o;
};
exports.getAngle = function (t, e) {
  var n = e.x - t.x;
  var o = e.y - t.y;
  return -cc.v2(n, o).signAngle(cc.v2(1, 0)) / Math.PI * 180;
};
exports.getXYFromPos = function (t, e, n, o) {
  return {
    x: Math.floor(t / n),
    y: Math.floor(e / o)
  };
};
exports.shuffleNonZero = function (t) {
  var e = [];
  var n = 0;
  for (var o = t; n < o.length; n++) {
    var i = 0;
    for (var a = o[n]; i < a.length; i++) {
      var r = a[i];
      0 !== r && e.push(r);
    }
  }
  !function (t) {
    var e;
    for (var n = t.length - 1; n > 0; n--) {
      var o = Math.floor(Math.random() * (n + 1));
      e = [t[o], t[n]];
      t[n] = e[0];
      t[o] = e[1];
    }
  }(e);
  var s = 0;
  for (var c = 0; c < t.length; c++) {
    for (var u = 0; u < t[c].length; u++) {
      0 !== t[c][u] && (t[c][u] = e[s++]);
    }
  }
  return t;
};
exports.getRandomValueInRange = function (t, e, n) {
  var o;
  do {
    o = Math.floor(Math.random() * (e - t + 1)) + t;
  } while (n.includes(o));
  return o;
};