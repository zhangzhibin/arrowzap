var o;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYEventName = require("LYEventName");
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_Line = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.segmentPrefab = null;
    e.arrowPrefab = null;
    e.posList = [];
    e.dir = -1;
    e.itemList = [];
    e.isOver = false;
    e.lifeTime = 0;
    e.isMoveing = false;
    e.arrowNode = null;
    e.isRed = false;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.setData = function (t, e) {
    if (t && t.length) {
      this.posList = e;
      this.itemList = t;
      this.createLine(t);
    }
  };
  _ctor.prototype.createLine = function (t) {
    var e = this;
    if (t && t.length) {
      var n = 0;
      var i = function (i) {
        var r = t[i - 1];
        var a = "number" == typeof r ? o.getDir(t[i], r) : -1;
        -1 == a && (r = t[i + 1]);
        a = "number" == typeof r ? o.getDir(r, t[i]) : -1;
        for (var l = 0; l < 1; l++) {
          o.scheduleOnce(function () {
            var n = e.posList[t[i]].clone();
            if (n) {
              var o = cc.instantiate(e.segmentPrefab);
              o.parent = e.node;
              o._dir = a;
              if (2 == a) {
                n.y += 16;
                o.anchorX = .5;
                o.anchorY = 1;
                n.y += 4;
                o.height = 24;
              }
              if (0 == a) {
                n.y -= 16;
                o.anchorX = .5;
                o.anchorY = 0;
                n.y -= 4;
                o.height = 24;
              }
              if (3 == a) {
                n.x += 16;
                o.anchorX = 1;
                o.anchorY = .5;
                n.x += 4;
                o.width = 24;
              }
              if (1 == a) {
                n.x -= 16;
                o.anchorX = 0;
                o.anchorY = .5;
                n.x -= 4;
                o.width = 24;
              }
              o.setPosition(n);
              if (0 == i) {
                e.dir = a;
                var r = cc.instantiate(e.arrowPrefab);
                e.arrowNode = r;
                r.parent = o;
                switch (a) {
                  case 0:
                    o.height = 8;
                    o.y += 12;
                    r.angle = 90;
                    r.y += o.height / 2 + 2;
                    o.anchorX = .5;
                    o.anchorY = 0;
                    break;
                  case 1:
                    o.width = 8;
                    o.x += 12;
                    r.angle = 0;
                    r.x += o.width / 2 + 2;
                    o.anchorX = 0;
                    o.anchorY = .5;
                    break;
                  case 2:
                    o.height = 8;
                    o.y -= 12;
                    r.angle = 270;
                    r.y -= o.height / 2 + 2;
                    o.anchorX = .5;
                    o.anchorY = 1;
                    break;
                  case 3:
                    o.width = 8;
                    o.x -= 12;
                    r.angle = 180;
                    r.x -= o.width / 2 + 2;
                    o.anchorX = 1;
                    o.anchorY = .5;
                }
              }
              0 === i && $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.CREATE_LINE);
            }
          }, .02 * n);
          n++;
        }
      };
      var o = this;
      for (var r = t.length - 1; r >= 0; r--) {
        i(r);
      }
    }
  };
  _ctor.prototype.getDir = function (t, e) {
    var n = $9GameManager$$1.default.instance.curLevelConfig.width;
    var i = Math.floor(t / n);
    var o = t % n;
    var r = Math.floor(e / n);
    var a = e % n;
    if (r === i - 1 && a === o) {
      return 0;
    } else {
      if (r === i && a === o + 1) {
        return 1;
      } else {
        if (r === i + 1 && a === o) {
          return 2;
        } else {
          if (r === i && a === o - 1) {
            return 3;
          } else {
            return -1;
          }
        }
      }
    }
  };
  _ctor.prototype.handlePass = function () {
    var t;
    var e;
    var n = this;
    if (this.itemList.length) {
      var i = this.posList[this.itemList[0]];
      var o = this.node.convertToWorldSpaceAR(i);
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.CREATE_EMOJI, o, 1);
      this.itemList.length = 0;
      $9AppMain.default.soundManager.vibrateShort();
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.ADD_SCORE);
      var r = this.node.children.slice();
      var a = r.length - 1;
      var l = r[a];
      var h = null !== (t = null == l ? undefined : l.height) && undefined !== t ? t : 8;
      var u = null !== (e = null == l ? undefined : l.width) && undefined !== e ? e : 8;
      var d = l.children[0];
      var p = d.x;
      var f = d.y;
      !function t(e) {
        if (!(e >= r.length)) {
          if (e === a) {
            n.isOver = true;
            return void (n.lifeTime = 5);
          }
          var i = r[e];
          var o = i._dir;
          if (0 === o || 2 === o) {
            var c = i.height;
            cc.tween(i).to(.02, {
              height: 0
            }).call(function () {
              i.destroy();
              t(e + 1);
            }).start();
            if (l) {
              if (0 === n.dir || 2 === n.dir) {
                h += c;
                var s = 0 == n.dir ? c : -c;
                cc.tween(l).to(.02, {
                  height: h
                }).start();
                if (d) {
                  f += s;
                  cc.tween(d).to(.02, {
                    y: f
                  }).start();
                }
              } else {
                u += c;
                s = 1 == n.dir ? c : -c;
                cc.tween(l).to(.02, {
                  width: u
                }).start();
                if (d) {
                  p += s;
                  cc.tween(d).to(.02, {
                    x: p
                  }).start();
                }
              }
            }
          } else if (1 === o || 3 === o) {
            var v = i.width;
            cc.tween(i).to(.02, {
              width: 0
            }).call(function () {
              i.destroy();
              t(e + 1);
            }).start();
            if (l) {
              var g = l.children[0];
              if (1 === n.dir || 3 === n.dir) {
                u += v;
                var m = 1 == n.dir ? v : -v;
                cc.tween(l).to(.02, {
                  width: u
                }).start();
                if (g) {
                  p += m;
                  cc.tween(g).to(.02, {
                    x: p
                  }).start();
                }
              } else {
                h += v;
                m = 0 == n.dir ? v : -v;
                cc.tween(l).to(.02, {
                  height: h
                }).start();
                if (g) {
                  f += m;
                  cc.tween(g).to(.02, {
                    y: f
                  }).start();
                }
              }
            }
          } else {
            i.destroy();
            t(e + 1);
          }
        }
      }(0);
    }
  };
  _ctor.prototype.handleError = function (t) {
    var e = this;
    if (!this.isMoveing) {
      this.isMoveing = true;
      $9AppMain.default.soundManager.vibrateLong();
      $9AppMain.default.soundManager.playSound($9Enum.ENUM_AUDIO_CLIP.ERROR, false, $9Enum.BUNDLE_NAME.LYFRAME);
      var n = this.posList[this.itemList[0]];
      var i = this.node.convertToWorldSpaceAR(n);
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.CREATE_EMOJI, i, 0);
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.ERROR_LINE);
      var o = this.node.children.slice();
      var r = o.length - 1;
      var a = o[r];
      var u = a.children[0];
      var d = u.x;
      var p = u.y;
      if (o.length < t.length) {
        o.length;
      } else {
        t.length;
      }
      var f = o.length < t.length ? o.length - 1 : t.length;
      var v = 24 * f;
      if (0 === this.dir || 2 === this.dir) {
        var g = 0 == this.dir ? v : -v;
        cc.tween(a).to(.02 * f, {
          height: 8 + v
        }).start();
        if (u) {
          p += g;
          cc.tween(u).to(.02 * f, {
            y: p
          }).start();
        }
      } else {
        var m = 1 == this.dir ? v : -v;
        cc.tween(a).to(.02 * f, {
          width: 8 + v
        }).start();
        if (u) {
          d += m;
          cc.tween(u).to(.02 * f, {
            x: d
          }).start();
        }
      }
      !function n(i) {
        if (!(i > t.length)) {
          if (i !== t.length) {
            if (i >= f) {
              if (0 === e.dir || 2 === e.dir) {
                var r = 0 == e.dir ? a.y + 24 : a.y - 24;
                cc.tween(a).to(.02, {
                  y: r
                }).call(function () {
                  n(i + 1);
                }).start();
              } else {
                var h = 1 == e.dir ? a.x + 24 : a.x - 24;
                cc.tween(a).to(.02, {
                  x: h
                }).call(function () {
                  n(i + 1);
                }).start();
              }
            } else {
              var g = o[i];
              if (g && i != o.length - 1) {
                var m = g._dir;
                if (0 === m || 2 === m) {
                  cc.Tween.stopAllByTarget(g);
                  cc.tween(g).to(.02, {
                    height: 0
                  }).call(function () {
                    n(i + 1);
                  }).start();
                } else if (1 === m || 3 === m) {
                  cc.Tween.stopAllByTarget(g);
                  cc.tween(g).to(.02, {
                    width: 0
                  }).call(function () {
                    n(i + 1);
                  }).start();
                } else {
                  n(i + 1);
                }
              } else {
                n(i + 1);
              }
            }
          } else {
            var y = cc.color(255, 0, 0);
            cc.tween(e.node).delay(.1).call(function () {
              o.forEach(function (t) {
                return function t(e, n) {
                  if (cc.isValid(e)) {
                    var i = new cc.Color(n.r, n.g, n.b, n.a);
                    try {
                      if (e) {
                        cc.Tween.stopAllByTarget(e);
                        e.color = i;
                      }
                    } catch (t) {}
                    var o = e.children;
                    for (var r = 0; r < o.length; r++) {
                      cc.Tween.stopAllByTarget(o);
                      t(o[r], n);
                    }
                  }
                }(t, y);
              });
              if (!e.isRed) {
                $9GameManager$$1.default.instance.updateHeart(-1);
                $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.BREAK_HEART);
              }
              e.isRed = true;
              u && (u.color = y);
              if (0 === e.dir || 2 === e.dir) {
                var n = 0 == e.dir ? -v : v;
                cc.Tween.stopAllByTarget(a);
                cc.tween(a).to(.02 * f, {
                  height: 8
                }).start();
                if (u) {
                  p += n;
                  cc.Tween.stopAllByTarget(u);
                  cc.tween(u).to(.02 * f, {
                    y: p
                  }).start();
                }
              } else {
                var i = 1 == e.dir ? -v : v;
                cc.Tween.stopAllByTarget(a);
                cc.tween(a).to(.02 * f, {
                  width: 8
                }).start();
                if (u) {
                  d += i;
                  cc.Tween.stopAllByTarget(u);
                  cc.tween(u).to(.02 * f, {
                    x: d
                  }).start();
                }
              }
              !function t(n) {
                if (n >= f) {
                  if (0 === e.dir || 2 === e.dir) {
                    var i = 0 == e.dir ? a.y - 24 : a.y + 24;
                    cc.tween(a).to(.02, {
                      y: i
                    }).call(function () {
                      t(n - 1);
                    }).start();
                  } else {
                    var r = 1 == e.dir ? a.x - 24 : a.x + 24;
                    cc.tween(a).to(.02, {
                      x: r
                    }).call(function () {
                      t(n - 1);
                    }).start();
                  }
                } else if (n < 0) {
                  e.isMoveing = false;
                } else {
                  var c = o[n];
                  var s = c._dir;
                  var l = c.childrenCount >= 1 ? 8 : 24;
                  if (0 === s || 2 === s) {
                    cc.Tween.stopAllByTarget(c);
                    cc.tween(c).to(.02, {
                      height: l
                    }).call(function () {
                      t(n - 1);
                    }).start();
                  } else if (1 === s || 3 === s) {
                    cc.Tween.stopAllByTarget(c);
                    cc.tween(c).to(.02, {
                      width: l
                    }).call(function () {
                      t(n - 1);
                    }).start();
                  } else {
                    c.destroy();
                    t(n - 1);
                  }
                }
              }(t.length - 1);
            }).start();
          }
        }
      }(0);
    }
  };
  _ctor.prototype.errorLine = function () {
    if (!this.isRed) {
      this.node.children.forEach(function (t) {
        cc.Tween.stopAllByTarget(t);
        cc.tween(t).to(.6, {
          color: cc.Color.RED
        }).delay(.2).to(.6, {
          color: cc.Color.BLACK
        }).start();
      });
      cc.Tween.stopAllByTarget(this.arrowNode);
      cc.tween(this.arrowNode).to(.6, {
        color: cc.Color.RED
      }).delay(.2).to(.6, {
        color: cc.Color.BLACK
      }).start();
    }
  };
  _ctor.prototype.update = function (t) {
    if (this.isOver) {
      if (this.lifeTime <= 0) {
        this.node.destroy();
      } else {
        this.lifeTime -= t;
        switch (this.dir) {
          case 0:
            this.node.y += 800 * t;
            break;
          case 2:
            this.node.y -= 800 * t;
            break;
          case 1:
            this.node.x += 800 * t;
            break;
          case 3:
            this.node.x -= 800 * t;
        }
      }
    }
  };
  cc__decorate([ccp_property(cc.Prefab)], _ctor.prototype, "segmentPrefab", undefined);
  cc__decorate([ccp_property(cc.Prefab)], _ctor.prototype, "arrowPrefab", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_Line;