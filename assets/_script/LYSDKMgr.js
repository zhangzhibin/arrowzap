var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYsdkConfig = require("LYsdkConfig");
var $9LYsdkManager = require("LYsdkManager");
var $9LYadMethodNameEnum = require("LYadMethodNameEnum");
var def_LYSDKMgr = function () {
  function _ctor() {}
  _ctor.initSDK = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (t) {
        switch (t.label) {
          case 0:
            console.log("初始化SKD");
            return [4, $9LYsdkManager.default.instance.initConfigs()];
          case 1:
            t.sent();
            $9LYsdkManager.default.instance.apply("initAllAdUnit");
            console.log("初始化SKD完成");
            return [2];
        }
      });
    });
  };
  _ctor.showADInView = function (t, e, n) {
    undefined === t && (t = false);
    undefined === e && (e = false);
    undefined === n && (n = false);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLE_CUSTOM_SIDE_AD, [false]);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLE_SINGLE_CUSTOM_AD, [n]);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLE_BANNER_AD, [t]);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLEVIVOCUSTOMAD, [e]);
  };
  _ctor.closeADInView = function (t, e, n) {
    undefined === t && (t = false);
    undefined === e && (e = false);
    undefined === n && (n = false);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLE_CUSTOM_SIDE_AD, [n]);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLE_SINGLE_CUSTOM_AD, [false]);
    $9LYsdkConfig.default.instance.getConfigValByKeyName("front_menu_banner_switch") || $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLE_BANNER_AD, [false]);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLEVIVOCUSTOMAD, [e]);
  };
  _ctor.closeBanner = function () {
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.TOGGLE_BANNER_AD, [false]);
  };
  _ctor.showVideo = function (t) {
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.SHOW_VIDEO_AD, [function () {
      t && t();
    }, function () {
      $9AppMain.default.teoastManager.show("完整看完视频，才能使用道具哦", {
        gravity: "CENTER",
        duration: 2,
        bg_color: cc.color(226, 69, 109, 255)
      });
    }]);
  };
  return _ctor;
}();
exports.default = def_LYSDKMgr;