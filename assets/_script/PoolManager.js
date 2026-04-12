var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9Enum = require("Enum");
var def_PoolManager = function () {
  function _ctor() {
    this._dictPool = {};
    this._dictPrefab = {};
  }
  _ctor.getInstance = function () {
    null === this._instance && (this._instance = new this());
    return this._instance;
  };
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      return this.getInstance();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.copyNode = function (t, e) {
    var n = t.name;
    this._dictPrefab[n] = t;
    var o = null;
    if (this._dictPool.hasOwnProperty(n)) {
      o = (i = this._dictPool[n]).size() > 0 ? i.get() : cc.instantiate(t);
    } else {
      var i = new cc.NodePool();
      this._dictPool[n] = i;
      o = cc.instantiate(t);
    }
    if (e) {
      o.parent = e;
      o.active = true;
    }
    return o;
  };
  _ctor.prototype.createPrefab = function (t, e) {
    undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
    return cc__awaiter(this, undefined, undefined, function () {
      var n;
      var o;
      return cc__generator(this, function (i) {
        switch (i.label) {
          case 0:
            if (n = this.getPoolNode(e + t)) {
              return [2, n];
            } else {
              return [4, $9AppMain.default.resourceManager.getPrefabMap(t, e)];
            }
          case 1:
            (o = i.sent()).name = t;
            return [2, cc.instantiate(o)];
        }
      });
    });
  };
  _ctor.prototype.createPrefabMian = function (t, e) {
    undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
    return cc__awaiter(this, undefined, undefined, function () {
      var n;
      var o;
      return cc__generator(this, function (i) {
        switch (i.label) {
          case 0:
            if (n = this.getPoolNode(t)) {
              return console.log("从池子中取"), [2, n];
            } else {
              return [4, $9AppMain.default.resourceManager.getPrefabMap(t, e)];
            }
          case 1:
            (o = i.sent()).name = t;
            return [2, cc.instantiate(o)];
        }
      });
    });
  };
  _ctor.prototype.getPoolNode = function (t, e, n) {
    var o;
    var i;
    if ("string" == typeof t) {
      i = t;
      if (!(o = this._dictPrefab[t])) {
        return null;
      }
    } else {
      o = t;
      i = t.data.name;
    }
    var a = null;
    if (this._dictPool.hasOwnProperty(i)) {
      a = (r = this._dictPool[i]).size() > 0 ? r.get() : cc.instantiate(o);
    } else {
      var r = new cc.NodePool();
      this._dictPool[i] = r;
      a = cc.instantiate(o);
    }
    if (e) {
      a.parent = e;
      a.active = true;
      n && (a.position = n);
    }
    return a;
  };
  _ctor.prototype.putNode = function (t, e) {
    undefined === e && (e = false);
    if (t) {
      var n = t.name;
      var o = null;
      if (this._dictPool.hasOwnProperty(n)) {
        o = this._dictPool[n];
      } else {
        o = new cc.NodePool();
        this._dictPool[n] = o;
      }
      t.removeFromParent(true);
      o.put(t);
    }
  };
  _ctor.prototype.clearPool = function (t) {
    this._dictPool.hasOwnProperty(t) && this._dictPool[t].clear();
  };
  _ctor.prototype.setPrefab = function (t, e) {
    this._dictPrefab[t] = e;
  };
  _ctor.prototype.getPrefab = function (t) {
    return this._dictPrefab[t];
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_PoolManager;