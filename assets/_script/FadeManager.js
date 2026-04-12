var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9LYGameDef = require("LYGameDef");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_FadeManager = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.isOut = "";
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    $9LYGameDef.default.FadeManager = this;
  };
  _ctor.prototype.in = function (t) {
    undefined === t && (t = .19);
  };
  _ctor.prototype.out = function (t) {
    undefined === t && (t = .19);
  };
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_FadeManager;