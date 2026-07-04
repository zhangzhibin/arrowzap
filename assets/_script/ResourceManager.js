var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9Enum = require("Enum");
var $9PoolManager = require("PoolManager");
var def_ResourceManager = function () {
  function _ctor() {
    this.clipMap = {};
    this.spriteMap = {};
    this.jsonMap = {};
    this.materialMap = {};
    this.prefabMap = new Map();
    this.AMgrBundle = new Map();
  }
  _ctor.getInstance = function () {
    if (null === this._instance) {
      this._instance = new _ctor();
      this._instance.AMgrBundle.set($9Enum.BUNDLE_NAME.DEF, cc.resources);
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
  _ctor.prototype.getPrefabMap = function (t, e) {
    undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (n) {
        switch (n.label) {
          case 0:
            null == e && (e = "");
            return [4, this.loadPrefabAnscy(t, e)];
          case 1:
            return [2, n.sent()];
        }
      });
    });
  };
  _ctor.prototype.loadPrefabAnscy = function (t, e) {
    undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
    return cc__awaiter(this, undefined, undefined, function () {
      var n = this;
      return cc__generator(this, function () {
        return [2, new Promise(function (o, i) {
          var a = n.prefabMap.get(e + t);
          if (a) {
            o(a);
          } else {
            var r = n.AMgrBundle.get(e);
            if (r) {
              r.load(t, cc.Prefab, function (t, e) {
                if (t) {
                  i(t);
                } else {
                  o(e);
                }
              });
            } else {
              console.warn("bundleRes 不存在", n.AMgrBundle, e, n.AMgrBundle.get(e));
            }
          }
        })];
      });
    });
  };
  _ctor.prototype.delPrefab = function (t, e) {
    undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
    this.prefabMap.get(e + t) && this.prefabMap.delete(e + t);
  };
  _ctor.prototype.loadBundle = function (e, n, a, r) {
    var s = this;
    undefined === n && (n = null);
    _ctor.loadingRate = 0;
    cc.assetManager.loadBundle(e, function (t, c) {
      return cc__awaiter(s, undefined, undefined, function () {
        return cc__generator(this, function (o) {
          switch (o.label) {
            case 0:
              if (t) {
                return console.error("加载bund失败", t), [3, 3];
              } else {
                return [3, 1];
              }
            case 1:
              this.AMgrBundle.set(e, c);
              return [4, this.loadDirRes(c, n, e, r)];
            case 2:
              o.sent();
              a && a(c);
              o.label = 3;
            case 3:
              return [2];
          }
        });
      });
    });
  };
  _ctor.prototype.loadDirOneRes = function (e, n, a, s) {
    return cc__awaiter(this, undefined, undefined, function () {
      var o = this;
      return cc__generator(this, function () {
        "" == a && (e = cc.resources);
        return [2, new Promise(function (i, c) {
          var u = _ctor.loadingRate;
          for (var l in n) {
            ;
          }
          e.loadDir(n.path, n.content, function (e, o) {
            if (n.ratio > 0) {
              var i = Math.floor(100 * (u + n.ratio * e / o)) / 100;
              _ctor.loadingRate = Math.max(i, _ctor.loadingRate);
              s && s(i);
            }
          }, function (t, e) {
            if (t) {
              c && c();
            } else {
              var s;
              if ("audio" == n.type) {
                for (var u = 0; u < e.length; u++) {
                  s = e[u];
                  o.clipMap[a + s.name] || (o.clipMap[a + s.name] = s);
                }
              }
              if ("prefab" == n.type) {
                for (u = 0; u < e.length; u++) {
                  s = e[u];
                  $9PoolManager.default.instance.setPrefab(a + s.data.name, s);
                  o.prefabMap.set(a + s.name, s);
                }
              }
              if ("sprite" == n.type) {
                for (u = 0; u < e.length; u++) {
                  s = e[u];
                  o.spriteMap[a + s.name] || (o.spriteMap[a + s.name] = s);
                }
              }
              if ("json" == n.type) {
                for (u = 0; u < e.length; u++) {
                  s = e[u];
                  o.jsonMap[a + s.name] || (o.jsonMap[a + s.name] = s.json);
                }
              }
              i && i();
            }
          });
        })];
      });
    });
  };
  _ctor.prototype.loadDirRes = function (t, e, n, a, r) {
    return cc__awaiter(this, undefined, undefined, function () {
      var o;
      var s;
      var c;
      var u;
      var l;
      return cc__generator(this, function (i) {
        switch (i.label) {
          case 0:
            if (!(e && e.length > 0)) {
              return [3, 5];
            }
            o = [];
            for (s in e) {
              o.push(s);
            }
            c = 0;
            i.label = 1;
          case 1:
            if (c < o.length) {
              return u = o[c], l = e[u], [4, this.loadDirOneRes(t, l, n, a)];
            } else {
              return [3, 4];
            }
          case 2:
            i.sent();
            i.label = 3;
          case 3:
            c++;
            return [3, 1];
          case 4:
            r && r();
            i.label = 5;
          case 5:
            return [2];
        }
      });
    });
  };
  _ctor.prototype.getClip = function (t, e) {
    return this.clipMap[e + t];
  };
  _ctor.prototype.getSprite = function (t, e) {
    return this.spriteMap[e + t];
  };
  _ctor.prototype.asyncGetSprite = function (t, e) {
    return cc__awaiter(this, undefined, Promise, function () {
      var n = this;
      return cc__generator(this, function (o) {
        switch (o.label) {
          case 0:
            return [4, new Promise(function (o) {
              if (n.spriteMap[e + t]) {
                o(n.spriteMap[e + t]);
              } else {
                n.AMgrBundle.get(e).load(t, cc.SpriteFrame, function (e, i) {
                  i || console.warn("错误", t, n.AMgrBundle);
                  o(i);
                });
              }
            })];
          case 1:
            return [2, o.sent()];
        }
      });
    });
  };
  _ctor.prototype.getJson = function (t, e) {
    return cc__awaiter(this, undefined, undefined, function () {
      var n = this;
      return cc__generator(this, function (o) {
        switch (o.label) {
          case 0:
            return [4, new Promise(function (o) {
              if (n.jsonMap[e + t]) {
                o(n.jsonMap[e + t]);
              } else {
                n.AMgrBundle.get(e).load(t, cc.JsonAsset, function (t, e) {
                  o(e.json);
                });
              }
            })];
          case 1:
            return [2, o.sent()];
        }
      });
    });
  };
  _ctor.prototype.getJsonInResources = function (t) {
    return new Promise(function (e, n) {
      cc.resources.load(t, cc.JsonAsset, function (o, i) {
        if (i) {
          e(i.json);
        } else {
          n("获取JSON失败::" + t);
        }
      });
    });
  };
  _ctor.prototype.getMaterial = function (t) {
    return this.materialMap[t];
  };
  _ctor.prototype.getSpriteFrame = function (t, e) {
    var n = this;
    return new Promise(function (o) {
      var i = n.getSprite(t, e);
      if (i) {
        o(i);
      } else {
        (n.AMgrBundle.get(e) || cc.resources).load(t, cc.SpriteFrame, function (e, n) {
          if (e) {
            console.warn("需要加载资源：", t);
          } else {
            o(n);
          }
        });
      }
    });
  };
  _ctor.loadingRate = 0;
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_ResourceManager;