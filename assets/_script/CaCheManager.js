Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function () {
  function t() {
    this._kaidian_guide = 0;
    var t = Object.keys(this);
    for (var e = 0; e < t.length; e++) {
      "_" == t[e][0] && this.getData(t[e]);
    }
  }
  Object.defineProperty(t.prototype, "kaidian_guide", {
    get: function () {
      return this._kaidian_guide;
    },
    set: function (t) {
      this._kaidian_guide = t;
      this.saveData("_kaidian_guide", t);
    },
    enumerable: false,
    configurable: true
  });
  t.prototype.saveData = function (t, e, n) {
    undefined === n && (n = true);
    localStorage.setItem(t, JSON.stringify(e));
  };
  t.prototype.getData = function (t) {
    var e = t;
    var n = true;
    var o = localStorage.getItem(e);
    if (null == o || "" == o || null == o) {
      return n = false, void this.saveData(t, this[t], false);
    } else {
      return this[t] = JSON.parse(o), n;
    }
  };
  return t;
}();
exports.default = new o();