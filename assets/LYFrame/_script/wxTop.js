var r;
var cc__extends = __extends;
var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.menu;
cc__decorator.property;
var def_wxTop = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.offsetY = 10;
    return t;
  }
  cc__extends(_ctor, e);
  _ctor.prototype.start = function () {
    return cc__awaiter(this, undefined, Promise, function () {
      return cc__generator(this, function () {
        return [2];
      });
    });
  };
  _ctor.prototype.onLoad = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      var e;
      var t;
      return cc__generator(this, function () {
        e = 0;
        cc.sys.platform == cc.sys.WECHAT_GAME && (t = window.wx.getWindowInfo()).safeArea && (e = t.safeArea.top + this.offsetY);
        cc.sys.platform == cc.sys.BYTEDANCE_GAME && (t = window.tt.getSystemInfoSync()).safeArea && (e = t.safeArea.top + this.offsetY);
        e > 0 && this.setNodeSafeAreaTop(e);
        return [2];
      });
    });
  };
  _ctor.prototype.setNodeSafeAreaTop = function (e) {
    if (this.node.getComponent(cc.Widget)) {
      this.node.getComponent(cc.Widget).top = e;
    } else {
      this.node.y = cc.view.getCanvasSize().height / 2 + e || cc.view.getCanvasSize().height / 2 + this.offsetY;
    }
  };
  return cc__decorate([ccp_ccclass()], _ctor);
}(cc.Component);
exports.default = def_wxTop;