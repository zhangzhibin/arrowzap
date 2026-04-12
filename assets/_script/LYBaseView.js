var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYBaseView = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.param = null;
    e.currNode = {};
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.getChild = function (t, e) {
    var n = this;
    if (this.currNode) {
      if (this.currNode[t]) {
        return this.currNode[t];
      } else {
        return function t(e, o) {
          if (o.getChildByName(e)) {
            return o.getChildByName(e);
          }
          var i = o.children;
          for (var a in i) {
            var r = t(e, i[a]);
            if (r) {
              n.currNode[e] = r;
              return r;
            }
          }
          return null;
        }(t, e || this.node);
      }
    }
  };
  _ctor.prototype.onClose = function () {};
  _ctor.prototype.onShow = function () {};
  _ctor.prototype.close = function (t, e) {
    undefined === t && (t = false);
    undefined === e && (e = 1);
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (n) {
        switch (n.label) {
          case 0:
            this.onClose();
            this.closeBackCall && this.closeBackCall.call(this);
            if (!t) {
              return [3, 6];
            }
            this.panel = cc.find("style/panel", this.node);
            switch (e) {
              case 1:
                return [3, 1];
              case 0:
                return [3, 2];
              case 2:
                return [3, 4];
            }
            return [3, 5];
          case 1:
            this.zoom(this.panel, false);
            return [3, 5];
          case 2:
            return [4, this.move(false)];
          case 3:
            n.sent();
            return [3, 5];
          case 4:
            this.littleMove(this.panel, false);
            return [3, 5];
          case 5:
            return [3, 7];
          case 6:
            this.node.active = false;
            n.label = 7;
          case 7:
            return [2];
        }
      });
    });
  };
  _ctor.prototype.littleMove = function (t, e) {
    var n = this;
    undefined === e && (e = true);
    if (!t) {
      return false;
    }
    if (e) {
      t.x += 750;
      cc.tween(t).to(.4, {
        x: 0
      }, {
        easing: "backOut"
      }).start();
    } else {
      cc.tween(t).by(.4, {
        x: 750
      }, {
        easing: "backIn"
      }).call(function () {
        t.x = 0;
        n.node.active = false;
      }).start();
    }
  };
  _ctor.prototype.zoom = function (t, e) {
    var n = this;
    undefined === e && (e = true);
    if (!t) {
      return false;
    }
    if (e) {
      this.node.opacity = 255;
      t.setScale(0);
      var o = cc.scaleTo(.2, 1.2);
      var i = cc.scaleTo(.1, 1);
      cc.tween(t).then(o).then(i).start();
    } else {
      t.setScale(1);
      o = cc.scaleTo(.1, 1.1);
      i = cc.scaleTo(.1, .2);
      cc.tween(t).then(o).then(i).call(function () {
        n.node.active = false;
        n.node.opacity = 0;
      }).start();
    }
  };
  _ctor.prototype.move = function (t) {
    var e = this;
    undefined === t && (t = true);
    if (this.node) {
      return new Promise(function (n) {
        if (t) {
          var o = e.node.getComponent(cc.Widget);
          o.updateAlignment();
          e.scheduleOnce(function () {
            o.enabled = false;
            e.node.x = -e.node.width;
            e.node.opacity = 255;
            e.panel && (e.panel.scale = 1);
            cc.tween(e.node).to(.2, {
              x: 0
            }).call(function () {
              e.node.getComponent(cc.Widget).enabled = true;
              o.updateAlignment();
              n();
            }).start();
          });
        } else {
          e.node.x = 0;
          e.scheduleOnce(function () {
            cc.tween(e.node).to(.2, {
              x: e.node.width
            }).call(function () {
              e.node.x = 0;
              e.node.active = false;
              e.node.opacity = 0;
              n();
            }).start();
          });
        }
      });
    }
  };
  _ctor.prototype.openView = function (t, e) {
    undefined === e && (e = 1);
    this.panel = cc.find("style/panel", this.node);
    this.onOpend(t);
    this.onDialogAni(e);
  };
  _ctor.prototype.onDialogAni = function (t) {
    undefined === t && (t = 1);
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (e) {
        switch (e.label) {
          case 0:
            if (!this.panel) {
              return [2];
            }
            switch (t) {
              case 1:
                return [3, 1];
              case 0:
                return [3, 2];
              case 2:
                return [3, 4];
            }
            return [3, 5];
          case 1:
            this.zoom(this.panel);
            return [3, 5];
          case 2:
            return [4, this.move()];
          case 3:
            e.sent();
            return [3, 5];
          case 4:
            this.littleMove(this.panel);
            return [3, 5];
          case 5:
            return [2];
        }
      });
    });
  };
  _ctor.prototype.onOpend = function () {};
  _ctor.prototype.addChild = function (t) {
    this.node.addChild(t);
  };
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_LYBaseView;