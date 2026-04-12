var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYsdkConfig = require("LYsdkConfig");
var $9LYsdkManager = require("LYsdkManager");
var $9LYadMethodNameEnum = require("LYadMethodNameEnum");
var $9LYEventName = require("LYEventName");
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var $9LYBaseView = require("LYBaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYWinLayer = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.icon_qx = null;
    e.btn_xyg = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.node.zIndex = 3;
    this.initNode();
  };
  _ctor.prototype.initNode = function () {
    this.icon_qx = this.getChild("icon_qx");
    this.btn_xyg = this.getChild("btn_xyg");
  };
  _ctor.prototype.onOpend = function () {
    this.addEvent("on");
    $9AppMain.default.soundManager.vibrateLong();
    this.updateUI();
    $9AppMain.default.soundManager.playSound($9Enum.ENUM_AUDIO_CLIP.WIN, false, $9Enum.BUNDLE_NAME.LYFRAME);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.SETTLE_OPERATIONS_FRAMEWORK);
  };
  _ctor.prototype.updateUI = function () {
    $9AppMain.default.localData.level += 1;
    $9GameManager$$1.default.instance.enterGameCount += 1;
  };
  _ctor.prototype.onDisable = function () {
    this.addEvent("off");
  };
  _ctor.prototype.addEvent = function (t) {
    this.icon_qx[t]("click", this.handleNext, this);
    this.btn_xyg[t]("click", this.handleNext, this);
  };
  _ctor.prototype.handleClose = function () {
    this.close(true);
  };
  _ctor.prototype.handleShare = function () {
    $9AppMain.default.soundManager.playClickSound();
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.ACTIVE_SHARE);
  };
  _ctor.prototype.handleNext = function () {
    $9AppMain.default.soundManager.playClickSound();
    if (!(2 != $9GameManager$$1.default.instance.enterGameCount || $9GameManager$$1.default.instance.isPopup)) {
      $9GameManager$$1.default.instance.isPopup = true;
      $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.CHECK_WHATS_NEW);
    }
    this.close(true);
    $9GameManager$$1.default.instance.exitGame();
    $9GameManager$$1.default.instance.initGame();
  };
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_LYWinLayer;