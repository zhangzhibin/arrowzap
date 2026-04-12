var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYBaseView = require("LYBaseView");
var $9LYEventName = require("LYEventName");
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var $9LYsdkManager = require("LYsdkManager");
var $9LYadMethodNameEnum = require("LYadMethodNameEnum");
var $9LYsdkConfig = require("LYsdkConfig");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYSettingLayer = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.btn_cxks = null;
    e.btn_sound = null;
    e.btnVibrate = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.node.zIndex = 3;
    this.initNode();
    this.addEvent("on");
  };
  _ctor.prototype.initNode = function () {
    var t = this;
    this.bg = this.getChild("bg");
    this.btn_sound = this.getChild("btn_sound");
    this.btnVibrate = this.getChild("btnVibrate");
    this.btn_cxks = this.getChild("btn_cxks");
    this.getChild("icon_qx").on("click", this.onExitClick, this);
    this.bg.on(cc.Node.EventType.TOUCH_END, function () {
      t.onExitClick();
    }, this);
  };
  _ctor.prototype.addEvent = function () {
    this.btn_sound.on("click", this.onSound, this);
    this.btnVibrate.on("click", this.onVibrate, this);
    this.btn_cxks.on("click", this.onRePlayClick, this);
  };
  _ctor.prototype.onExitClick = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.close(true);
  };
  _ctor.prototype.onOpend = function () {
    this.rendor();
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.LAYER_OPERATIONS_FRAMEWORK);
    this.updateUI();
  };
  _ctor.prototype.rendor = function () {
    this.btn_sound.getChildByName("on").active = !!$9AppMain.default.soundManager.soundOff;
    this.btn_sound.getChildByName("off").active = !$9AppMain.default.soundManager.soundOff;
    this.btnVibrate.getChildByName("on").active = !!$9AppMain.default.soundManager.vibrateOff;
    this.btnVibrate.getChildByName("off").active = !$9AppMain.default.soundManager.vibrateOff;
  };
  _ctor.prototype.updateUI = function () {};
  _ctor.prototype.onSound = function () {
    if (0 === $9AppMain.default.soundManager.soundOff) {
      $9AppMain.default.soundManager.onSound();
      $9AppMain.default.soundManager.onMusic();
    } else {
      $9AppMain.default.soundManager.offSound();
      $9AppMain.default.soundManager.offMusic();
    }
    $9AppMain.default.soundManager.playClickSound();
    this.rendor();
  };
  _ctor.prototype.onVibrate = function () {
    $9AppMain.default.soundManager.playClickSound();
    if (0 === $9AppMain.default.soundManager.vibrateOff) {
      $9AppMain.default.soundManager.onVibrate();
    } else {
      $9AppMain.default.soundManager.offVibrate();
    }
    this.rendor();
  };
  _ctor.prototype.onRePlayClick = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.close(true);
    $9GameManager$$1.default.instance.exitGame(false);
    $9GameManager$$1.default.instance.enterGame();
  };
  _ctor.prototype.onClose = function () {
    $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.RESUME_TIME);
    $9AppMain.default.UIManager.isActive($9Enum.BUNDLE_NAME.LYFRAME + $9Enum.ENUM_UI_TYPE.HOME) && $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.HOME_OPERATIONS_FRAMEWORK);
    $9AppMain.default.UIManager.isActive($9Enum.BUNDLE_NAME.SUBGMAE + $9Enum.PACK_GAME_UI_TYPE.MENU) && $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.GAME_OPERATIONS_FRAMEWORK);
  };
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_LYSettingLayer;