var o;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9Enum = require("Enum");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_Emoji = function (t) {
  function _ctor() {
    return null !== t && t.apply(this, arguments) || this;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.setData = function (t) {
    var e;
    e = t ? "happy" + (Math.floor(5 * Math.random()) + 1) : "sad" + (Math.floor(3 * Math.random()) + 1);
    this.node.setSkin("sprite/" + e, $9Enum.BUNDLE_NAME.SUBGMAE);
    this.updateAnima();
  };
  _ctor.prototype.updateAnima = function () {
    var t = this;
    this.node.scale = 0;
    cc.tween(this.node).to(.5, {
      scale: .5
    }, {
      easing: "backOut"
    }).delay(.2).to(.5, {
      opacity: 0
    }).call(function () {
      t.node.destroy();
    }).start();
  };
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_Emoji;