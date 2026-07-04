Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9LYsdkConfig = require("LYsdkConfig");
var $9Enum = require("Enum");
var def_LYtiktokManager = function () {
  function _ctor() {
    this.videoAd = null;
    this.bannerAd = [];
    this.matrixCustomAd = [];
    this.singleAd = [];
    this.interstitialAd = null;
    this.boxBannerAd = null;
    this.settleMatrixCustomAd = [];
  }
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      null == this._instance && (this._instance = new _ctor());
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.getAdUnitId = function (t, e) {
    var n = $9LYsdkConfig.default.instance.getConfigValByKeyName(t, e);
    return n;
  };
  _ctor.prototype.initVideoAd = function () {
    var t = this;
    if (this.videoAd) return;
    var e = this.getAdUnitId("front_video_ad_id", "");
    if (!e) return;
    this.videoAd = tt.createRewardedVideoAd({ adUnitId: e });
    this.videoAd.onClose(function (e) {
      if (e && e.isEnded) {
        t._videoCallback && t._videoCallback();
      } else {
        console.warn("LYtiktok: 视频广告未完成");
      }
      t._videoCallback = null;
    });
    this.videoAd.onError(function (e) {
      console.warn("LYtiktok: 视频广告错误", e);
    });
  };
  _ctor.prototype.showVideoAd = function (t) {
    if (!this.videoAd) {
      console.warn("LYtiktok: 视频广告未初始化");
      t && t();
      return;
    }
    this._videoCallback = t;
    this.videoAd.show().catch(function (e) {
      console.warn("LYtiktok: 视频广告展示失败", e);
    });
  };
  _ctor.prototype.initBannerAd = function () {
    var t = this.getAdUnitId("front_banner_ad_id", "");
    if (!t) return;
    var e = tt.getSystemInfoSync();
    var n = tt.createBannerAd({
      adUnitId: t,
      style: {
        left: 0,
        top: e.windowHeight - 80,
        width: e.windowWidth
      }
    });
    this.bannerAd.push(n);
    n.onError(function (t) {
      console.warn("LYtiktok: banner广告错误", t);
    });
  };
  _ctor.prototype.toggleBannerAd = function (t, e) {
    undefined === e && (e = 0);
    var n = this.bannerAd[e];
    if (!n) return;
    t ? n.show() : n.hide();
  };
  _ctor.prototype.initMatrixCustomAd = function () {
    try {
      var t = this.getAdUnitId("front_matrix_ad_id", "");
      if (!t) return;
      var e = tt.createCustomAd({
        adUnitId: t,
        style: { left: 0, top: 0, width: 300 }
      });
      this.matrixCustomAd.push(e);
    } catch (t) {
      console.warn("LYtiktok: matrix广告初始化失败", t);
    }
  };
  _ctor.prototype.initSingleCustomAd = function (t) {
    undefined === t && (t = null);
  };
  _ctor.prototype.initInterstitialAd = function () {
    var t = this;
    var e = this.getAdUnitId("front_interstitial_ad_id", "");
    if (!e) return;
    this.interstitialAd = tt.createInterstitialAd({ adUnitId: e });
    this.interstitialAd.onError(function (t) {
      console.warn("LYtiktok: 插屏广告错误", t);
    });
  };
  _ctor.prototype.initAllAdUnit = function () {
    this.initVideoAd();
    this.initBannerAd();
    this.initInterstitialAd();
    this.initMatrixCustomAd();
    this.initSingleCustomAd();
  };
  _ctor.prototype.settleVideo = function (t) {
    t && t();
  };
  _ctor.prototype.toggleSingleCustomAd = function (t, e, n) {
    undefined === e && (e = false);
    undefined === n && (n = false);
  };
  _ctor.prototype.showInterstitialAd = function () {
    if (!this.interstitialAd) return;
    this.interstitialAd.show().catch(function (t) {
      console.warn("LYtiktok: 插屏广告展示失败", t);
    });
  };
  _ctor.prototype.vibrateShort = function () {
    tt.vibrateShort({ type: "medium" });
  };
  _ctor.prototype.vibrateLong = function () {
    tt.vibrateLong();
  };
  _ctor.prototype.activeShare = function (t, e) {
    tt.shareAppMessage({
      title: t || "",
      success: function () {
        e && e();
      },
      fail: function () {
        console.warn("LYtiktok: 分享失败");
      }
    });
  };
  _ctor.prototype.showBoxBanner = function () {};
  _ctor.prototype.showForceVideoAd = function (t) {
    this.showVideoAd(t);
  };
  _ctor.prototype.toggleOtherSingleCustomAd = function () {};
  _ctor.prototype.toggleCustomSideAd = function () {};
  _ctor.prototype.getOpenId = function () {
    return "";
  };
  _ctor.prototype.getUserInfo = function () {
    return null;
  };
  _ctor.prototype.setChannelMod = function () {
    return false;
  };
  _ctor.prototype.createUserInfoButton = function () {};
  _ctor.prototype.createGameClubButton = function () {};
  _ctor.prototype.toggleVivoCustomAd = function () {};
  _ctor.prototype.hideCreateUserInfoButton = function () {};
  _ctor.prototype.addShortcut = function () {};
  _ctor.prototype.onShowInit = function () {};
  _ctor.prototype.isSideBarCard = function () {
    return false;
  };
  _ctor.prototype.navigateToScene = function () {};
  _ctor.prototype.onShow = function () {};
  _ctor.prototype.checkScene = function () {};
  _ctor.prototype.login = function (t) {
    tt.login({
      force: true,
      success: function () {
        t && t(true);
      },
      fail: function () {
        console.warn("LYtiktok: 登录失败");
        t && t(false);
      }
    });
  };
  _ctor.prototype.getImRankList = function (t) {
    t && t([]);
  };
  _ctor.prototype.setImRankData = function () {};
  _ctor.prototype.settleOperationsFramework = function () {};
  _ctor.prototype.toggleMatrixCustomAd = function () {};
  _ctor.prototype.turnToApp = function () {};
  _ctor.prototype.toggleHomeCustomeAd = function () {};
  _ctor.prototype.setFriendRank = function () {};
  _ctor.prototype.hideAllBannerAd = function () {
    for (var t = 0; t < this.bannerAd.length; t++) {
      this.bannerAd[t] && this.bannerAd[t].hide();
    }
  };
  _ctor.prototype.hideAllMatrixCustomAd = function () {
    for (var t = 0; t < this.matrixCustomAd.length; t++) {
      this.matrixCustomAd[t] && this.matrixCustomAd[t].hide();
    }
  };
  _ctor.prototype.toggleSettleMatrixCustomAd = function () {};
  _ctor.prototype.startAutoRotateBanner = function () {};
  _ctor.prototype.stopAutoRotateBanner = function () {};
  _ctor.prototype.homeOperationsFramework = function () {};
  _ctor.prototype.layerOperationsFramework = function () {};
  _ctor.prototype.gameOperationsFramework = function () {};
  _ctor.prototype.takePhoto = function () {};
  _ctor.prototype.closeAllAd = function () {};
  _ctor.prototype.checkVersion = function () {};
  _ctor.prototype.checkMessage = function () {};
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_LYtiktokManager;
