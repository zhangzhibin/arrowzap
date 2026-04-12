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
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var $9LYBaseView = require("LYBaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYLoseLayer = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.icon_qx = null;
    e.lose1 = null;
    e.lose2 = null;
    e.btn_fh = null;
    e.lbCount = null;
    e.curType = 0;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.node.zIndex = 3;
    this.initNode();
  };
  _ctor.prototype.initNode = function () {
    this.icon_qx = this.getChild("icon_qx");
    this.lose1 = this.getChild("lose1");
    this.lose2 = this.getChild("lose2");
    this.btn_fh = this.getChild("btn_fh");
    this.lbCount = this.getChild("lbCount").getComponent(cc.Label);
  };
  _ctor.prototype.onDisable = function () {
    this.addEvent("off");
  };
  _ctor.prototype.onOpend = function (t) {
    var e;
    this.curType = t.type;
    this.updateUI();
    var n = null === (e = null == t ? undefined : t.isSDK) || undefined === e || e;
    this.addEvent("on");
    $9AppMain.default.soundManager.playSound($9Enum.ENUM_AUDIO_CLIP.FAIL, false, $9Enum.BUNDLE_NAME.LYFRAME);
    n && $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.SETTLE_OPERATIONS_FRAMEWORK);
  };
  _ctor.prototype.addEvent = function (t) {
    this.icon_qx[t]("click", this.handleClose, this);
    this.btn_fh[t]("click", this.handleFH, this);
  };
  _ctor.prototype.updateUI = function () {
    this.lose1.active = 1 == this.curType;
    this.lose2.active = 2 == this.curType;
    2 == this.curType && (this.lbCount.string = "+120");
  };
  _ctor.prototype.handleClose = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.close(true);
    $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.REPLAY, {
      type: this.curType
    }, $9Enum.BUNDLE_NAME.LYFRAME);
  };
  _ctor.prototype.handleFH = function () {
    var t = this;
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.SHOW_VIDEO_AD, [function () {
      if (1 == t.curType) {
        $9GameManager$$1.default.instance.updateHeart(1);
        $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.BREAK_HEART);
        $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.RESUME_TIME);
      } else {
        $9GameManager$$1.default.instance.timeNum = 120;
        $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.UPDATE_TIME);
        $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.RESUME_TIME);
      }
      $9AppMain.default.soundManager.vibrateLong();
      t.close(true);
      $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.GAME_OPERATIONS_FRAMEWORK);
      setTimeout(function () {
        $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.STOP_AUTO_ROTATE_BANNER);
      }, 1e3);
    }, function (t) {
      if ("noComplete" === t) {
        $9AppMain.default.teoastManager.show("完整观看视频广告才能领取奖励哦");
        $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.HIDE_ALL_MATRIX_CUSTOM_AD);
      } else if ("fail" === t) {
        $9AppMain.default.teoastManager.show("广告加载失败，请刷新游戏后重试!"), $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.HIDE_ALL_MATRIX_CUSTOM_AD);
      }
    }]);
  };
  _ctor.prototype.onClose = function () {};
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_LYLoseLayer;