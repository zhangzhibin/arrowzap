var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYGameDef = require("LYGameDef");
var $9LYUtils = require("LYUtils");
var $9LYEventName = require("LYEventName");
var $9Enum = require("Enum");
var def_GameManager$$1 = function () {
  function _ctor() {
    this.levelConfig = [];
    this.curLevelConfig = null;
    this.forceTime = 0;
    this.HomeFoceVideo = false;
    this.pointWidth = 24;
    this.heartNum = 3;
    this.timeNum = 0;
    this.isSubPower = false;
    this.isCreateIn = true;
    this.enterGameCount = 0;
    this.isPopup = false;
    this.overType = 0;
  }
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      this._instance || (this._instance = new _ctor());
      window.GameManager = this._instance;
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.initGame = function (t) {
    var e;
    var n;
    undefined === t && (t = true);
    return cc__awaiter(this, undefined, undefined, function () {
      var o;
      var r;
      var s;
      var c;
      return cc__generator(this, function (i) {
        switch (i.label) {
          case 0:
            this.isSubPower = t;
            o = $9AppMain.default.localData.level;
            if (this.levelConfig && this.levelConfig.length) {
              return [3, 2];
            } else {
              return r = this, [4, $9AppMain.default.resourceManager.getJson("json/JianTouLevel", $9Enum.BUNDLE_NAME.SUBGMAE)];
            }
          case 1:
            r.levelConfig = i.sent();
            i.label = 2;
          case 2:
            if (o > this.levelConfig.length) {
              s = this.levelConfig.length;
              c = Math.floor(Math.random() * (s - 2 + 1)) + 2;
              o = c;
            }
            this.isCreateIn = true;
            this.curLevelConfig = this.levelConfig[o - 1];
            this.heartNum = 3;
            this.timeNum = null !== (n = null === (e = this.curLevelConfig) || undefined === e ? undefined : e.time) && undefined !== n ? n : 600;
            this.enterGame();
            return [2];
        }
      });
    });
  };
  _ctor.prototype.enterGame = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (t) {
        switch (t.label) {
          case 0:
            $9AppMain.default.localData.status = $9Enum.ENUM_GAME_STATUS.RUNING;
            $9AppMain.default.UIManager.isActive($9Enum.BUNDLE_NAME.LYFRAME + $9Enum.ENUM_UI_TYPE.HOME) && $9AppMain.default.UIManager.close($9Enum.ENUM_UI_TYPE.HOME, $9Enum.BUNDLE_NAME.LYFRAME);
            $9AppMain.default.localData.reset();
            return [4, $9AppMain.default.UIManager.show($9Enum.PACK_GAME_UI_TYPE.MENU, {}, $9Enum.BUNDLE_NAME.SUBGMAE, $9LYGameDef.default.UINode)];
          case 1:
            t.sent();
            $9LYGameDef.default.GameNode.destroyAllChildren();
            return [4, $9AppMain.default.PoolManager.createPrefab($9Enum.PACK_GAME_UI_TYPE.LEVEL, $9Enum.BUNDLE_NAME.SUBGMAE)];
          case 2:
            t.sent().parent = $9LYGameDef.default.GameNode;
            return [2];
        }
      });
    });
  };
  _ctor.prototype.exitGame = function (t) {
    undefined === t && (t = true);
    $9AppMain.default.localData.status = $9Enum.ENUM_GAME_STATUS.UNRUNING;
    t && $9AppMain.default.UIManager.show($9Enum.ENUM_UI_TYPE.HOME, null, $9Enum.BUNDLE_NAME.LYFRAME);
    $9AppMain.default.UIManager.closeToRemove($9Enum.PACK_GAME_UI_TYPE.MENU, $9Enum.BUNDLE_NAME.SUBGMAE);
  };
  _ctor.prototype.updateHeart = function (e) {
    this.heartNum += e;
    if (this.heartNum <= 0) {
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.PAUSE_TIME);
      _ctor.instance.overType = 1;
      if ($9LYUtils.default.instance.isOpenHotGamePage($9Enum.POPULAR_TRIGGER_SOURCE.LOSE_SETTLE_BEFORE, undefined)) {
        return;
      }
      $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.LOSE, {
        type: 1
      }, $9Enum.BUNDLE_NAME.LYFRAME);
    }
  };
  _ctor.prototype.changeLevel = function (t) {
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (e) {
        switch (e.label) {
          case 0:
            if (1 != t) {
              return [3, 2];
            } else {
              return this.exitGame(), $9LYGameDef.default.GameNode.destroyAllChildren(), [4, $9AppMain.default.PoolManager.createPrefab($9Enum.PACK_GAME_UI_TYPE.ML, $9Enum.BUNDLE_NAME.SUBGMAE)];
            }
          case 1:
            e.sent().parent = $9LYGameDef.default.GameNode;
            return [3, 3];
          case 2:
            this.initGame();
            e.label = 3;
          case 3:
            return [2];
        }
      });
    });
  };
  _ctor.prototype.nextLevel = function (t) {
    $9AppMain.default.localData.level = t;
    this.exitGame();
    this.initGame();
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_GameManager$$1;