var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYsdkConfig = require("LYsdkConfig");
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var $9LYBaseView = require("LYBaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYReplayLayer = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.icon_qx = null;
    e.btn_no = null;
    e.btn_cxks = null;
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
    this.btn_no = this.getChild("btn_no");
    this.btn_cxks = this.getChild("btn_cxks");
  };
  _ctor.prototype.onOpend = function (t) {
    var e;
    this.curType = null !== (e = null == t ? undefined : t.type) && undefined !== e ? e : 1;
    this.addEvent("on");
  };
  _ctor.prototype.onDisable = function () {
    this.addEvent("off");
  };
  _ctor.prototype.addEvent = function (t) {
    this.icon_qx[t]("click", this.handleClose, this);
    this.btn_no[t]("click", this.handleClose, this);
    this.btn_cxks[t]("click", this.handleCXKS, this);
  };
  _ctor.prototype.handleClose = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.close(true);
    $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.LOSE, {
      type: this.curType,
      isSDK: false
    }, $9Enum.BUNDLE_NAME.LYFRAME);
  };
  _ctor.prototype.handleCXKS = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.close(true);
    $9GameManager$$1.default.instance.exitGame();
    $9GameManager$$1.default.instance.initGame();
  };
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_LYReplayLayer;