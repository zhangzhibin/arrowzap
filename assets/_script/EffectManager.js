var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var def_EffectManager = function () {
  function _ctor() {}
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      null == this._instance && (this._instance = new _ctor());
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.play = function (t, e, n, r) {
    return cc__awaiter(this, undefined, undefined, function () {
      var o;
      var s;
      return cc__generator(this, function (i) {
        switch (i.label) {
          case 0:
            return [4, $9AppMain.default.PoolManager.createPrefab("" + t, n)];
          case 1:
            (o = i.sent()).parent = e;
            r && r.pos && o.setPosition(r.pos);
            if (o.getComponent(cc.Animation)) {
              (s = o.getComponent(cc.Animation)).on("finished", function () {
                o.removeFromParent();
              });
              s.play();
            } else if (o.getComponent(cc.ParticleSystem)) {
              o.getComponent(cc.ParticleSystem).resetSystem(), o.getComponent(cc.ParticleSystem).autoRemoveOnFinish = true;
            }
            return [2];
        }
      });
    });
  };
  _ctor.prototype.shake = function (t, e, n, o) {
    undefined === o && (o = true);
    var i = function (t, e, n, o) {
      var i = t.getPosition();
      cc.Tween.stopAllByTarget(t);
      var a = [];
      var r = [];
      for (var s = 0; s < 8; s++) {
        var c = Math.round(-20 * Math.random()) + 10;
        a.push(c + i.x);
        var u = Math.round(-20 * Math.random()) + 10;
        r.push(u + i.y);
      }
      cc.tween(t).sequence(cc.tween().to(.02, {
        position: cc.v3(a[0], r[0], 0)
      }), cc.tween().to(.02, {
        position: cc.v3(a[1], r[1], 0)
      }), cc.tween().to(.02, {
        position: cc.v3(a[2], r[2], 0)
      }), cc.tween().to(.02, {
        position: cc.v3(a[3], r[3], 0)
      }), cc.tween().to(.02, {
        position: cc.v3(a[4], r[4], 0)
      }), cc.tween().to(.02, {
        position: cc.v3(a[5], r[5], 0)
      }), cc.tween().to(.02, {
        position: cc.v3(a[6], r[6], 0)
      }), cc.tween().to(.02, {
        position: cc.v3(a[7], r[7], 0)
      })).repeatForever().start();
      return new Promise(function (a) {
        setTimeout(function () {
          cc.Tween.stopAllByTarget(t);
          t.setPosition(i.x, i.y);
          if (o) {
            a();
          } else {
            n && n();
          }
        }, 1e3 * e);
      });
    };
    if (t instanceof Array) {
      if (o) {
        var a = [];
        for (var r = 0; r < t.length; r++) {
          var s = i(t[r], e, n, o);
          a.push(s);
        }
        Promise.all(a).then(function () {
          return n && n();
        });
      } else {
        t.forEach(function (t) {
          return i(t, e, n, o);
        });
      }
    } else {
      i(t, e, n, o);
    }
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_EffectManager;