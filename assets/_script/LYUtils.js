Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9Enum = require("Enum");
var $9LYEnum = require("LYEnum");
var $9LYsdkConfig = require("LYsdkConfig");
var $9LYsdkManager = require("LYsdkManager");
var def_LYUtils = function () {
  function _ctor() {
    this.triggerSource = null;
    this.model = null;
    this.hotgameParam = null;
  }
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      null == this._instance && (this._instance = new _ctor());
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.isOpenAwardPage = function () {
    return !!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_enter_level_gift_skill_switch", false);
  };
  _ctor.prototype.isOpenGiftPage = function () {
    return true;
  };
  _ctor.prototype.isOpenHotGamePage = function (t, e, n) {
    if ($9LYsdkManager.default.instance.model.settleMatrixCustomAd.length <= 0) {
      return false;
    }
    if (!cc.sys.WECHAT_GAME || !$9LYsdkConfig.default.instance.getConfigValByKeyName("front_enable_accidental_touch_mode")) {
      return false;
    }
    if (t == $9LYEnum.POPULAR_TRIGGER_SOURCE.LOADING && !$9LYsdkConfig.default.instance.getConfigValByKeyName("front_show_fullscreen_ad_on_hotpage")) {
      return false;
    }
    var c = [$9LYEnum.POPULAR_TRIGGER_SOURCE.GAME_START, $9LYEnum.POPULAR_TRIGGER_SOURCE.ENTER_LEVEL, $9LYEnum.POPULAR_TRIGGER_SOURCE.RESTART_LEVEL, $9LYEnum.POPULAR_TRIGGER_SOURCE.WIN_SETTLE_BEFORE, $9LYEnum.POPULAR_TRIGGER_SOURCE.LOSE_SETTLE_BEFORE, $9LYEnum.POPULAR_TRIGGER_SOURCE.SET_BACK_HOME, $9LYEnum.POPULAR_TRIGGER_SOURCE.SETTLE_BACK_HOME];
    var u = $9AppMain.default.localData.level;
    var l = false;
    u < parseInt($9LYsdkConfig.default.instance.getConfigValByKeyName("front_popup_hotpage_startinglevel", 0)) && (l = true);
    if (c.findIndex(function (e) {
      return e == t;
    }) >= 0 && l) {
      return false;
    }
    var f = false;
    u < parseInt($9LYsdkConfig.default.instance.getConfigValByKeyName("front_game_hotpage_startinglevel", 0)) && (f = true);
    if (t == $9LYEnum.POPULAR_TRIGGER_SOURCE.GAME_START) {
      if (f) {
        return false;
      }
      if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("game_start_popup_hotpage_switch")) {
        return false;
      }
    }
    return !(!(t != $9LYEnum.POPULAR_TRIGGER_SOURCE.WIN_SETTLE_BEFORE && t != $9LYEnum.POPULAR_TRIGGER_SOURCE.LOSE_SETTLE_BEFORE || $9LYsdkConfig.default.instance.getConfigValByKeyName("show_hot_page_before_settlement_switch")) || !(t != $9LYEnum.POPULAR_TRIGGER_SOURCE.SET_BACK_HOME && t != $9LYEnum.POPULAR_TRIGGER_SOURCE.SETTLE_BACK_HOME || $9LYsdkConfig.default.instance.getConfigValByKeyName("front_back_home_show_hotpage_switch")) || !(t != $9LYEnum.POPULAR_TRIGGER_SOURCE.ENTER_LEVEL && t != $9LYEnum.POPULAR_TRIGGER_SOURCE.RESTART_LEVEL && t != $9LYEnum.POPULAR_TRIGGER_SOURCE.REVIVE_GAME || $9LYsdkConfig.default.instance.getConfigValByKeyName("show_hotpage_on_enter_level_switch")) || (this.triggerSource = t, this.hotgameParam = n || null, e && e(), $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.HOT_GAME, null, $9Enum.BUNDLE_NAME.LYFRAME), 0));
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_LYUtils;