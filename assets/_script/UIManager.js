var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9LYGameDef = require("LYGameDef");
var $9Enum = require("Enum");
var $9ResourceManager = require("ResourceManager");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_UIManager = function () {
  function _ctor() {
    this.inStageNode = new Map();
    this._runTimes = new Map();
    this.openViewMap = new Map();
    this.uiMap = new Map();
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
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.init = function () {};
  _ctor.prototype.open = function (t, e, n, o, i, l) {
    undefined === e && (e = {});
    undefined === n && (n = $9Enum.BUNDLE_NAME.DEF);
    undefined === o && (o = 1);
    undefined === i && (i = $9LYGameDef.default.UINode);
    undefined === l && (l = 1);
    return cc__awaiter(this, undefined, Promise, function () {
      var o;
      var a;
      var c;
      var f;
      var d;
      var h;
      return cc__generator(this, function (r) {
        switch (r.label) {
          case 0:
            o = n + t;
            if ((a = this.openViewMap.get(o)) || a && 1 == a.active) {
              return [2];
            } else {
              return c = this.inStageNode.get(o), this.openViewMap.set(t, {
                active: true
              }), c ? [3, 2] : [4, $9ResourceManager.default.instance.getPrefabMap(t, n)];
            }
          case 1:
            f = r.sent();
            if (!(c = cc.instantiate(f))) {
              console.warn("界面显示失败:", t, "请检查是否已填写bundleName");
              return [2];
            }
            this.inStageNode.set(o, c);
            c.parent = i || $9LYGameDef.default.UINode;
            r.label = 2;
          case 2:
            this.openViewMap.set(t, c);
            d = t.split("/").pop();
            (h = c.getComponent(d) ? c.getComponent(d) : c.addComponent(d)).param = e;
            c.active = true;
            l || (c.opacity = 0);
            h.openView(e, l);
            return [2, h];
        }
      });
    });
  };
  _ctor.prototype.show = function (t, e, n, o, i) {
    undefined === e && (e = {});
    undefined === n && (n = $9Enum.BUNDLE_NAME.DEF);
    undefined === i && (i = 0);
    return cc__awaiter(this, undefined, undefined, function () {
      var a;
      var c;
      var l;
      var f;
      return cc__generator(this, function (r) {
        switch (r.label) {
          case 0:
            a = n + t;
            if (c = this.inStageNode.get(a)) {
              return [3, 2];
            } else {
              return [4, $9ResourceManager.default.instance.getPrefabMap(t, n)];
            }
          case 1:
            l = r.sent();
            c = cc.instantiate(l);
            if (!l) {
              console.warn("打开界面失败", t, "请检查是否已填写bundleName");
              return [2];
            }
            this.inStageNode.set(a, c);
            if (o) {
              c.parent = o;
            } else if ($9LYGameDef.default.UINode) {
              c.parent = $9LYGameDef.default.UINode;
            } else {
              console.warn("当前没有父节点可以寄生");
            }
            r.label = 2;
          case 2:
            (f = c.getComponent(t) ? c.getComponent(t) : c.addComponent(t)).param = e;
            c.active = true;
            f.onShow(e);
            i && f.move(true);
            return [2, f];
        }
      });
    });
  };
  _ctor.prototype.getShowLayer = function (t, e) {
    undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
    var n = e + t;
    var o = this.inStageNode.get(n);
    if (o) {
      if (o.getComponent(t)) {
        return o.getComponent(t);
      } else {
        return o.addComponent(t);
      }
    } else {
      return null;
    }
  };
  _ctor.prototype.closeLayer = function (t, e, n, o) {
    undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
    undefined === n && (n = false);
    undefined === o && (o = 1);
    return cc__awaiter(this, undefined, undefined, function () {
      var i;
      var a;
      var s;
      return cc__generator(this, function () {
        i = e + t;
        if ((a = this.inStageNode.get(i)) && (s = a.getComponent(t))) {
          return s.close(n, o), [2];
        } else {
          return [2];
        }
      });
    });
  };
  _ctor.prototype.addPrefab = function (t, e, n, o) {
    undefined === e && (e = "");
    return cc__awaiter(this, undefined, undefined, function () {
      var i;
      var a;
      return cc__generator(this, function (r) {
        switch (r.label) {
          case 0:
            return [4, $9ResourceManager.default.instance.getPrefabMap(t, e)];
          case 1:
            i = r.sent();
            a = cc.instantiate(i);
            if (o) {
              a.x = o.x;
              a.y = o.y;
            }
            n && n.addChild(a);
            return [2, a];
        }
      });
    });
  };
  _ctor.prototype.getPrefabData = function (t, e) {
    undefined === e && (e = "");
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (n) {
        switch (n.label) {
          case 0:
            return [4, $9ResourceManager.default.instance.getPrefabMap(t, e)];
          case 1:
            return [2, n.sent()];
        }
      });
    });
  };
  _ctor.prototype.close = function (t, e, n) {
    undefined === e && (e = "");
    undefined === n && (n = 1);
    var o = e + t;
    var i = this.inStageNode.get(o);
    if (!i) {
      return console.warn("关闭失败，不存在该视图", this.inStageNode, o);
    }
    this.openViewMap.delete(o);
    var a = i.getComponent(i.name);
    if (a) {
      a.close();
    } else {
      i.active = false;
    }
  };
  _ctor.prototype.closeToRemove = function (t, e, n) {
    var o = this;
    undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
    undefined === n && (n = 1);
    var i = e + t;
    var a = this.inStageNode.get(i);
    if (!a) {
      return console.warn("关闭失败，不存在该视图", this.inStageNode, i);
    }
    if (!n) {
      var r = a.getComponent(t);
      if (r) {
        return void r.move(false).then(function () {
          o.inStageNode.delete(i);
          a.destroy();
        });
      } else {
        return this.inStageNode.delete(i), void a.destroy();
      }
    }
    this.inStageNode.delete(i);
    a.destroy();
  };
  _ctor.prototype.isActive = function (t) {
    return !!this.inStageNode.has(t) && this.inStageNode.get(t).active;
  };
  _ctor._instance = null;
  return cc__decorate([ccp_ccclass], _ctor);
}();
exports.default = def_UIManager;