var o;
var cc__extends = __extends;
var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYEventName = require("LYEventName");
var $9LYBaseView = require("LYBaseView");
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var $9Utils = require("Utils");
var $9LYsdkConfig = require("LYsdkConfig");
var $9LYsdkManager = require("LYsdkManager");
var $9LYUtils = require("LYUtils");
var $9LYadMethodNameEnum = require("LYadMethodNameEnum");
var $9Emoji = require("Emoji");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_GameMenu = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.btnSet = null;
    e.heartNode = null;
    e.wz_m = null;
    e.nFd = null;
    e.nBar = null;
    e.lbTl = null;
    e.lbPowerTime = null;
    e.lbTime = null;
    e.lbLevel = null;
    e.rookie1 = null;
    e.rookie2 = null;
    e.icon_tjzm = null;
    e.ixon_lwh = null;
    e.dk_szk = null;
    e._countDown = 0;
    return e;
  }
  cc__extends(_ctor, t);
  Object.defineProperty(_ctor.prototype, "countDown", {
    get: function () {
      return this._countDown;
    },
    set: function (t) {
      this._countDown = t;
      this.lbTime.string = "" + $9Utils.default.formatSeconds(t, "i:s");
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onLoad = function () {
    this.initNode();
  };
  _ctor.prototype.initNode = function () {
    this.btnSet = this.getChild("btnSet");
    this.heartNode = this.getChild("heartNode");
    this.wz_m = this.getChild("wz_m");
    this.nFd = this.getChild("nFd");
    this.nBar = this.getChild("nBar");
    this.rookie1 = this.getChild("rookie1");
    this.rookie2 = this.getChild("rookie2");
    this.icon_tjzm = this.getChild("icon_tjzm");
    this.ixon_lwh = this.getChild("ixon_lwh");
    this.dk_szk = this.getChild("dk_szk");
    this.lbTl = this.getChild("lbTl").getComponent(cc.Label);
    this.lbTime = this.getChild("lbTime").getComponent(cc.Label);
    this.lbLevel = this.getChild("lbLevel").getComponent(cc.Label);
    this.lbPowerTime = this.getChild("lbPowerTime").getComponent(cc.Label);
  };
  _ctor.prototype.onShow = function () {
    this.addEvent("on");
    $9LYUtils.default.instance.isOpenHotGamePage($9Enum.POPULAR_TRIGGER_SOURCE.ENTER_LEVEL, undefined);
    this.updateUI();
    this.initGameSDK();
  };
  _ctor.prototype.initGameSDK = function () {
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.GAME_OPERATIONS_FRAMEWORK, [true]);
  };
  _ctor.prototype.onDisable = function () {
    this.addEvent("off");
  };
  _ctor.prototype.addEvent = function (t) {
    this.btnSet && this.btnSet[t]("click", this.onClickBtnSet, this);
    this.nFd && this.nFd[t]("slide", this.onSlideFd, this);
    this.icon_tjzm && this.icon_tjzm[t]("click", this.onClickTjzm, this);
    this.ixon_lwh && this.ixon_lwh[t]("click", this.onClickLwh, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.BREAK_HEART, this.onBreakHeart, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.UPDATE_TIME, this.onUpdateTime, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.PAUSE_TIME, this.pauseTime, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.RESUME_TIME, this.resumeTime, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.UPDATE_HEART, this.updateHeart, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.LEVEL_START, this.onLevelStart, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.CREATE_EMOJI, this.onCreateEmoji, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.UPDATE_SLIDE, this.onUpdateSlide, this);
  };
  _ctor.prototype.onClickTjzm = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.unschedule(this.updateCountDown);
    $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.DESK, null, $9Enum.BUNDLE_NAME.LYFRAME);
  };
  _ctor.prototype.onClickLwh = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.unschedule(this.updateCountDown);
    $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.AWARD, null, $9Enum.BUNDLE_NAME.LYFRAME);
  };
  _ctor.prototype.onUpdateSlide = function (t) {
    var e = 1 - t;
    this.nFd.getComponent(cc.Slider).progress = e;
  };
  _ctor.prototype.onCreateEmoji = function (t, e) {
    return cc__awaiter(this, undefined, undefined, function () {
      var n;
      var i;
      return cc__generator(this, function (o) {
        switch (o.label) {
          case 0:
            n = this.node.convertToNodeSpaceAR(t);
            return [4, $9AppMain.default.PoolManager.createPrefab("Emoji", $9Enum.BUNDLE_NAME.SUBGMAE)];
          case 1:
            (i = o.sent()).parent = this.node;
            i.setPosition(n);
            i.getComponent($9Emoji.default).setData(e);
            return [2];
        }
      });
    });
  };
  _ctor.prototype.onLevelStart = function () {
    this.rookie1.active = false;
    this.rookie2.active = false;
  };
  _ctor.prototype.updateHeart = function () {
    this.updatePower();
    this.rendorHeartTimer();
  };
  _ctor.prototype.onUpdateTime = function () {
    this.countDown = $9GameManager$$1.default.instance.timeNum;
  };
  _ctor.prototype.onBreakHeart = function () {
    this.heartNode.children.forEach(function (t, e) {
      t.children[0].active = e < $9GameManager$$1.default.instance.heartNum;
    });
  };
  _ctor.prototype.onSlideFd = function (t) {
    this.rookie2.active && (this.rookie2.active = false);
    var e = t.progress;
    $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.UPDATE_SCALE, e);
  };
  _ctor.prototype.onClickBtnSet = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.unschedule(this.updateCountDown);
    $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.SET, null, $9Enum.BUNDLE_NAME.LYFRAME);
  };
  _ctor.prototype.updateUI = function () {
    this.lbLevel.string = "关卡 " + $9AppMain.default.localData.level;
    this.onUpdateTime();
    this.updatePower();
    this.rendorHeartTimer();
    this.rookie1.active = 1 == $9AppMain.default.localData.level;
    this.rookie2.active = 2 == $9AppMain.default.localData.level;
  };
  _ctor.prototype.rendorHeartTimer = function () {
    var t = this;
    if ($9LYsdkConfig.default.instance.getConfigValByKeyName("front_is_enable_level_power", true) && $9LYsdkConfig.default.instance.getConfigValByKeyName("front_is_enable_countdown_gift_power", true)) {
      this.unscheduleAllCallbacks();
      var e = true;
      if ($9AppMain.default.localData.hearts >= $9AppMain.default.localData.maxHeart) {
        e = false;
        $9AppMain.default.localData.lastHeartRefreshTime = 0;
        this.lbPowerTime.node.active = false;
      }
      $9AppMain.default.localData.lastHeartRefreshTime > 0 && (e = true);
      if (e) {
        this.lbPowerTime.node.active = true;
        var n = $9AppMain.default.localData.heartRefreshTime - $9AppMain.default.localData.lastHeartRefreshTime;
        this.lbPowerTime.getComponent(cc.Label).string = $9Utils.default.formatSeconds(n, "i:s");
        this.schedule(function e() {
          if ((n -= 1) <= 0) {
            n = $9AppMain.default.localData.heartRefreshTime - $9AppMain.default.localData.lastHeartRefreshTime;
            t.updatePower();
            if ($9AppMain.default.localData.hearts >= $9AppMain.default.localData.maxHeart) {
              t.unschedule(e), t.updatePower();
            } else {
              t.lbPowerTime.getComponent(cc.Label).string = $9Utils.default.formatSeconds(n, "i:s");
            }
          } else {
            t.lbPowerTime.getComponent(cc.Label).string = $9Utils.default.formatSeconds(n, "i:s");
          }
        }, 1);
      } else {
        this.updatePower();
      }
    }
  };
  _ctor.prototype.updatePower = function () {
    if ($9LYsdkConfig.default.instance.getConfigValByKeyName("front_is_enable_level_power", true)) {
      var t = $9AppMain.default.localData.hearts;
      var e = $9AppMain.default.localData.maxHeart;
      var n = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_power_init_num", 5);
      this.wz_m.active = t >= n;
      this.lbTl.node.active = t < n;
      var i = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_is_enable_countdown_gift_power", true);
      var o = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_countdown_power_min_limit", 4);
      this.lbPowerTime.node.active = t < o && i;
      t < e && (this.lbTl.string = "" + t);
    } else {
      this.dk_szk.active = false;
    }
  };
  _ctor.prototype.updateCountDown = function () {
    this.countDown--;
    if (this.countDown <= 0) {
      this.unschedule(this.updateCountDown);
      $9GameManager$$1.default.instance.overType = 2;
      if ($9LYUtils.default.instance.isOpenHotGamePage($9Enum.POPULAR_TRIGGER_SOURCE.LOSE_SETTLE_BEFORE, undefined)) {
        return;
      }
      $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.LOSE, {
        type: 2
      }, $9Enum.BUNDLE_NAME.LYFRAME);
    }
  };
  _ctor.prototype.pauseTime = function () {
    this.unschedule(this.updateCountDown);
  };
  _ctor.prototype.resumeTime = function () {
    this.unschedule(this.updateCountDown);
    this.schedule(this.updateCountDown, 1);
  };
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_GameMenu;