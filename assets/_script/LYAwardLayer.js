var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYsdkManager = require("LYsdkManager");
var $9LYadMethodNameEnum = require("LYadMethodNameEnum");
var $9LYEventName = require("LYEventName");
var $9LYBaseView = require("LYBaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYAwardLayer = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.icon_qx = null;
    e.btn_qwtj = null;
    e.bg = null;
    e.wz_ylqjl = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.node.zIndex = 2;
    this.initNode();
  };
  _ctor.prototype.initNode = function () {
    this.icon_qx = this.getChild("icon_qx");
    this.btn_qwtj = this.getChild("btn_qwtj");
    this.bg = this.getChild("bg");
    this.wz_ylqjl = this.getChild("wz_ylqjl");
  };
  _ctor.prototype.onEnable = function () {
    this.addEvent("on");
    this.updateUI();
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.LAYER_OPERATIONS_FRAMEWORK);
  };
  _ctor.prototype.updateUI = function () {
    this.btn_qwtj.active = !$9AppMain.default.localData.isAddSelf;
    this.wz_ylqjl.active = $9AppMain.default.localData.isAddSelf;
  };
  _ctor.prototype.addEvent = function (t) {
    this.icon_qx[t]("click", this.handleClose, this);
    this.btn_qwtj[t]("click", this.handleClose, this);
    this.bg[t](cc.Node.EventType.TOUCH_END, this.handleClose, this);
  };
  _ctor.prototype.handleClose = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.close(true);
  };
  _ctor.prototype.onClose = function () {
    $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.RESUME_TIME);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.GAME_OPERATIONS_FRAMEWORK);
  };
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_LYAwardLayer;