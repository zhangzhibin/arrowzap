Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_EventManager = function () {
  function _ctor() {
    this.eventMap = new Map();
  }
  _ctor.getInstance = function () {
    if (null === this._instance) {
      this._instance = new this();
      cc.EventManager = this._instance;
    }
    return this._instance;
  };
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      return this.getInstance();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.on = function (t, e, n) {
    if (this.eventMap.has(t)) {
      this.eventMap.get(t).push({
        event: e,
        context: n
      });
    } else {
      this.eventMap.set(t, [{
        event: e,
        context: n
      }]);
    }
  };
  _ctor.prototype.off = function (t, e, n) {
    if (this.eventMap.has(t)) {
      var o = this.eventMap.get(t);
      var i = o.findIndex(function (t) {
        return t.event == e && t.context == n;
      });
      i > -1 && o.splice(i, 1);
    }
  };
  _ctor.prototype.emit = function (t) {
    var e = [];
    for (var n = 1; n < arguments.length; n++) {
      e[n - 1] = arguments[n];
    }
    if (this.eventMap.has(t)) {
      var o = this.eventMap.get(t);
      o.forEach(function (t) {
        var n = t.event;
        var o = t.context;
        if (o) {
          n.apply(o, e);
        } else {
          n(e);
        }
      });
    }
  };
  _ctor.prototype.clear = function () {
    this.eventMap.clear();
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_EventManager;