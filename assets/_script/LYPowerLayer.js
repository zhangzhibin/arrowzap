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
var $9LYBaseView = require("LYBaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYPowerLayer = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.icon_qx = null;
    e.btn_hq = null;
    e.lbCount = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.node.zIndex = 5;
    this.initNode();
  };
  _ctor.prototype.initNode = function () {
    this.icon_qx = this.getChild("icon_qx");
    this.btn_hq = this.getChild("btn_hq");
    this.lbCount = this.getChild("lbCount").getComponent(cc.Label);
  };
  _ctor.prototype.onOpend = function () {
    this.addEvent("on");
    this.updateUI();
  };
  _ctor.prototype.onDisable = function () {
    this.addEvent("off");
  };
  _ctor.prototype.addEvent = function (t) {
    this.icon_qx[t]("click", this.handleClose, this);
    this.btn_hq[t]("click", this.handleGetPower, this);
  };
  _ctor.prototype.updateUI = function () {
    var t = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_countdown_power_video_num", 2);
    this.lbCount.string = "+" + t;
  };
  _ctor.prototype.handleClose = function () {
    this.close(true);
  };
  _ctor.prototype.handleGetPower = function () {
    var t = this;
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.SHOW_VIDEO_AD, [function () {
      var e = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_countdown_power_video_num", 2);
      $9AppMain.default.localData.hearts += e;
      t.close(true);
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.UPDATE_HEART);
    }, function (t) {
      if ("noComplete" === t) {
        $9AppMain.default.teoastManager.show("完整观看视频广告才能领取奖励哦");
        $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.HIDE_ALL_MATRIX_CUSTOM_AD);
      } else if ("fail" === t) {
        $9AppMain.default.teoastManager.show("广告加载失败，请刷新游戏后重试!"), $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.HIDE_ALL_MATRIX_CUSTOM_AD);
      }
    }]);
  };
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_LYPowerLayer;