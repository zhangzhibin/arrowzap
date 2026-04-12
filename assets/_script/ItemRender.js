var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_ItemRender = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.data = null;
    e.itemIndex = 0;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.dataChanged = function () {};
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_ItemRender;