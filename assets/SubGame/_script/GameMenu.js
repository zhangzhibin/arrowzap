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
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_GameMenu = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.btnSet = null;
    e.nBar = null;
    e.lbTime = null;
    e.lbLevel = null;
    e.heartNode = null;
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
    this.nBar = this.getChild("nBar");
    this.heartNode = this.getChild("heartNode");
    this.lbTime = this.getChild("lbTime").getComponent(cc.Label);
    this.lbLevel = this.getChild("lbLevel").getComponent(cc.Label);
  };
  _ctor.prototype.onShow = function () {
    this.addEvent("on");
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
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.UPDATE_TIME, this.onUpdateTime, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.PAUSE_TIME, this.pauseTime, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.RESUME_TIME, this.resumeTime, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.BREAK_HEART, this.onBreakHeart, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.LEVEL_START, this.onLevelStart, this);
  };
  _ctor.prototype.onClickTjzm = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.unschedule(this.updateCountDown);
    $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.DESK, null, $9Enum.BUNDLE_NAME.LYFRAME);
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
  };
  _ctor.prototype.onBreakHeart = function () {
    this.heartNode.children.forEach(function (t, e) {
      t.children[0].active = e < $9GameManager$$1.default.instance.heartNum;
    });
  };
  _ctor.prototype.onUpdateTime = function () {
    this.countDown = $9GameManager$$1.default.instance.timeNum;
  };
  _ctor.prototype.onClickBtnSet = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.unschedule(this.updateCountDown);
    $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.SET, null, $9Enum.BUNDLE_NAME.LYFRAME);
  };
  _ctor.prototype.updateUI = function () {
    this.lbLevel.string = "Level " + $9AppMain.default.localData.level;
    this.onUpdateTime();
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