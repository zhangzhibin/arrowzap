Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_LYdefaultMgs = function () {
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
  _ctor.prototype.initVideoAd = function () {};
  _ctor.prototype.showVideoAd = function (t) {
    t && t();
  };
  _ctor.prototype.initBannerAd = function () {};
  _ctor.prototype.toggleBannerAd = function (t, e) {
    undefined === e && (e = 0);
  };
  _ctor.prototype.initMatrixCustomAd = function () {};
  _ctor.prototype.initSingleCustomAd = function (t) {
    undefined === t && (t = null);
  };
  _ctor.prototype.initInterstitialAd = function () {};
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
  _ctor.prototype.showInterstitialAd = function () {};
  _ctor.prototype.vibrateShort = function () {};
  _ctor.prototype.activeShare = function (t, e) {
    e && e();
  };
  _ctor.prototype.showBoxBanner = function () {};
  _ctor.prototype.showForceVideoAd = function (t) {
    t && t();
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
    t && t(false);
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
  _ctor.prototype.hideAllBannerAd = function () {};
  _ctor.prototype.hideAllMatrixCustomAd = function () {};
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
  _ctor.prototype.vibrateLong = function () {};
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_LYdefaultMgs;