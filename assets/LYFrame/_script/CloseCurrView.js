var r;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.menu;
cc__decorator.property;
var def_CloseCurrView = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  cc__extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.node.on(cc.Node.EventType.TOUCH_END, this.closeView, this);
  };
  _ctor.prototype.closeView = function () {};
  return cc__decorate([ccp_ccclass()], _ctor);
}(cc.Component);
exports.default = def_CloseCurrView;