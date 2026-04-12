var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYGameDef = require("LYGameDef");
var $9LYsdkConfig = require("LYsdkConfig");
var $9LYsdkManager = require("LYsdkManager");
var $9LYUtils = require("LYUtils");
var $9LYadMethodNameEnum = require("LYadMethodNameEnum");
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var $9LYBaseView = require("LYBaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYHotGameLayer = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.mcIndex = 0;
    e.showNum = 0;
    e.currStatus = false;
    e.currIndex = 0;
    e.btnContinueNum = 0;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.node.zIndex = 999;
    this.btn_jxyx = this.node.getChildByName("btn_jxyx");
    this.btn_jxyx.on("click", this.onContinueBtnClick, this);
  };
  _ctor.prototype.onEnable = function () {
    var t = this;
    this.scheduleOnce(function () {
      t._close();
    }, 1);
  };
  _ctor.prototype.onContinueBtnClick = function () {
    $9AppMain.default.soundManager.playClickSound();
    if (++this.btnContinueNum >= $9LYsdkConfig.default.instance.getConfigValByKeyName("popular_page_continue_game_button_clicks", 1)) {
      this.btnContinueNum = 0;
      this._close();
    }
  };
  _ctor.prototype._close = function () {
    this.close();
  };
  _ctor.prototype.onDisable = function () {
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.HIDE_ALL_BANNER_AD);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.HIDE_ALL_MATRIX_CUSTOM_AD);
    this.closePopularPageTriggerEvent();
  };
  _ctor.prototype.closePopularPageTriggerEvent = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function () {
        switch ($9LYUtils.default.instance.triggerSource) {
          case $9Enum.POPULAR_TRIGGER_SOURCE.LOADING:
            $9LYGameDef.default.LoadLyer.active = false;
            $9LYsdkConfig.default.instance.getConfigValByKeyName("direct_enter_level_on_game_start_switch", false);
            $9GameManager$$1.default.instance.initGame();
            break;
          case $9Enum.POPULAR_TRIGGER_SOURCE.GAME_START:
            $9GameManager$$1.default.instance.initGame();
            break;
          case $9Enum.POPULAR_TRIGGER_SOURCE.NORMAL:
            $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.HOME_OPERATIONS_FRAMEWORK, [true]);
            break;
          case $9Enum.POPULAR_TRIGGER_SOURCE.WIN_SETTLE_BEFORE:
            $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.WIN, null, $9Enum.BUNDLE_NAME.LYFRAME);
            break;
          case $9Enum.POPULAR_TRIGGER_SOURCE.SETTLE_BACK_HOME:
            $9GameManager$$1.default.instance.exitGame();
            break;
          case $9Enum.POPULAR_TRIGGER_SOURCE.SET_BACK_HOME:
            break;
          case $9Enum.POPULAR_TRIGGER_SOURCE.LOSE_SETTLE_BEFORE:
            $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.LOSE, {
              type: $9GameManager$$1.default.instance.overType
            }, $9Enum.BUNDLE_NAME.LYFRAME);
            break;
          case $9Enum.POPULAR_TRIGGER_SOURCE.ENTER_LEVEL:
        }
        $9LYUtils.default.instance.triggerSource = null;
        $9LYUtils.default.instance.hotgameParam = null;
        return [2];
      });
    });
  };
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_LYHotGameLayer;