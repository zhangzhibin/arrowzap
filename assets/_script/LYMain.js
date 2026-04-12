var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9BundleResCfig = require("BundleResCfig");
var $9Enum = require("Enum");
var $9LYGameDef = require("LYGameDef");
var $9GameManager$$1 = require("GameManager");
var $9LYsdkConfig = require("LYsdkConfig");
var $9LYsdkManager = require("LYsdkManager");
var $9DataManager = require("DataManager");
var $9LYUtils = require("LYUtils");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_LYMain = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.iconWz = null;
    e.loopNum = 0;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    cc.game.setFrameRate(60);
    cc.audioEngine.setEffectsVolume(.6);
    this.initYQ();
    $9LYGameDef.default.UINode = this.UINode;
    $9LYGameDef.default.GameNode = this.GameNode;
    $9LYGameDef.default.LoadLyer = this.loadLyer;
    $9LYGameDef.default.GameCamera = this.GameCamera;
    this.initPro();
    this.loadRes();
  };
  _ctor.prototype.initPro = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      var t;
      return cc__generator(this, function () {
        (t = this.loadfill.getComponent(cc.ProgressBar)).progress = 0;
        cc.tween(t).to(2.5, {
          progress: .95
        }).start();
        return [2];
      });
    });
  };
  _ctor.prototype.loadRes = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (t) {
        switch (t.label) {
          case 0:
            return [4, $9LYsdkManager.default.instance.initConfigs()];
          case 1:
            t.sent();
            $9DataManager.default.instance.initConfigData();
            $9LYsdkManager.default.instance.apply("initAllAdUnit");
            $9DataManager.default.instance.restore();
            setTimeout(function () {
              $9LYsdkConfig.default.instance.getConfigValByKeyName("front_enter_the_game_interstitial_switch") && $9LYsdkManager.default.instance.apply("showInterstitialAd");
            }, 2e3);
            this.onInitToHomeScene();
            return [2];
        }
      });
    });
  };
  _ctor.prototype.normalIntoGame = function () {
    this.loadLyer.active = false;
    $9LYsdkConfig.default.instance.getConfigValByKeyName("direct_enter_level_on_game_start_switch", false);
    $9GameManager$$1.default.instance.initGame(false);
  };
  _ctor.prototype.onInitToHomeScene = function () {
    var t = this;
    $9AppMain.default.resourceManager.loadBundle($9Enum.BUNDLE_NAME.LYFRAME, $9BundleResCfig.default.instance.FRME_TYPE_MAIN, function () {
      return cc__awaiter(t, undefined, undefined, function () {
        var t;
        var e = this;
        return cc__generator(this, function () {
          $9AppMain.default.soundManager.playMusic();
          t = $9LYsdkConfig.default.instance.getConfigValByKeyName("direct_enter_level_on_game_start_switch", false);
          $9AppMain.default.resourceManager.loadBundle($9Enum.BUNDLE_NAME.SUBGMAE, $9BundleResCfig.default.instance.FRME_TYPE_GAME, function () {
            return cc__awaiter(e, undefined, undefined, function () {
              return cc__generator(this, function () {
                this.handleInToGame(t);
                return [2];
              });
            });
          });
          return [2];
        });
      });
    });
  };
  _ctor.prototype.handleInToGame = function (t) {
    this.loadLyer.active = false;
    if ($9LYUtils.default.instance.isOpenHotGamePage($9Enum.POPULAR_TRIGGER_SOURCE.LOADING, undefined)) {
      return;
    }
    if (t) {
      $9GameManager$$1.default.instance.initGame(false);
    } else {
      this.normalIntoGame();
    }
  };
  _ctor.prototype.initYQ = function () {
    cc.Node.prototype.setSkin = function (t, e, n) {
      undefined === e && (e = $9Enum.BUNDLE_NAME.DEF);
      var o = this.getComponent(cc.Sprite);
      o || (o = this.addComponent(cc.Sprite));
      var i = $9AppMain.default.resourceManager.getSprite(t, e);
      if (i) {
        o.spriteFrame = null;
        o.spriteFrame = i;
      } else {
        ($9AppMain.default.resourceManager.AMgrBundle.get(e) || cc.resources).load(t, cc.SpriteFrame, function (e, i) {
          o.spriteFrame = null;
          if (e) {
            console.warn("需要加载资源：：", t);
          } else {
            o.spriteFrame = i;
            n && n(i);
          }
        });
      }
      cc.Node.prototype.skin = t;
    };
  };
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "loadLyer", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "UINode", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "GameNode", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "GameCamera", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "logoIcon", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "loadfill", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "iconWz", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_LYMain;