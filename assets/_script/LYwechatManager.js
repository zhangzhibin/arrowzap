var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9Enum = require("Enum");
var $9LYEnum = require("LYEnum");
var $9LYsdkConfig = require("LYsdkConfig");
var def_LYwechatManager = function () {
  function _ctor() {
    var t = this;
    this.videoAd = null;
    this.video2Ad = null;
    this.bannerAd = [];
    this.bannerVideoAd = [];
    this.matrixCustomAd = [];
    this.matrixCustomsAd = [];
    this.settleMatrixCustomAd = [];
    this.singleAd = [];
    this.otherSingleAd = [];
    this.interstitialAd = [];
    this.customSideAd = [];
    this.userInfoBtn = null;
    this.gameClubBtn = null;
    this.userInfoNodeRect = null;
    this.currentBannerId = [];
    this.rotateBannerInterval = null;
    this.inTime = 0;
    this.bannerVideo = null;
    this.getBannerCategoryAttr = function (e) {
      undefined === e && (e = $9LYEnum.BANNER_CATEGORY.DEFAULT);
      var n = null;
      var o = "";
      if (e == $9LYEnum.BANNER_CATEGORY.DEFAULT) {
        n = t.bannerAd;
        o = "toggleBannerAd";
      }
      return {
        bannerAd: n,
        funcName: o
      };
    };
    this._isShareing = false;
    this.shareTimer = null;
    this.diffTime = 0;
    for (var e in $9LYEnum.BANNER_CATEGORY) {
      this.currentBannerId[$9LYEnum.BANNER_CATEGORY[e]] = 0;
    }
    window.wx.onHide(function () {
      $9LYsdkConfig.default.instance.getConfigValByKeyName("front_on_hide_interstitial_switch") && t.showInterstitialAd();
    });
    window.wx.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"]
    });
    window.wx.onShow(function () {
      $9AppMain.default.UIManager.isActive($9Enum.BUNDLE_NAME.LYFRAME + $9Enum.ENUM_UI_TYPE.HOT_GAME) && $9AppMain.default.UIManager.closeLayer($9Enum.ENUM_UI_TYPE.HOT_GAME, $9Enum.BUNDLE_NAME.LYFRAME);
    });
    window.wx.setKeepScreenOn({
      keepScreenOn: true
    });
    window.wx.onAudioInterruptionEnd(function () {
      $9AppMain.default.soundManager.playMusic($9Enum.ENUM_AUDIO_CLIP.BGM);
    });
  }
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      null == this._instance && (this._instance = new _ctor());
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.setChannelMod = function (t, e) {
    var n = window.wx.getLaunchOptionsSync();
    console.log("----小游戏启动参数----", JSON.stringify(n));
    if ($9LYsdkConfig.default.instance.getConfigValByKeyName("front_channel_model_switch", false) && n) {
      var o = n.scene;
      var i = $9LYsdkConfig.default.instance.getConfigAttrValByName("front_wuchu_scene");
      if (i && i.split("|").map(Number).indexOf(o) >= 0) {
        t && t();
        return true;
      }
    }
    e && e();
    return false;
  };
  _ctor.prototype.initVideoAd = function () {
    if (this.videoAd) {
      this.videoAd.destroy();
      this.videoAd = null;
    }
    var t = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_video_ids");
    if (t) {
      this.videoAd = window.wx.createRewardedVideoAd({
        adUnitId: t[0]
      });
      this.videoAd.onError(function (e) {
        console.warn("【流量主激励视频】初始化有误:", e, t[0]);
      });
    }
  };
  _ctor.prototype.showVideoAd = function (t, e) {
    var n = this;
    if (!this.videoAd) {
      return e && e("fail");
    }
    this.videoAd.offClose();
    this.videoAd.onClose(function (o) {
      n.videoAd.offClose();
      $9LYsdkConfig.default.instance.getConfigValByKeyName("front_close_video_show_interstitial") && n.showInterstitialAd();
      if (o && o.isEnded || undefined === o) {
        return n.hideAllMatrixCustomAd(), $9AppMain.default.localData.adCount += 1, t && t("ok");
      } else {
        return n.hideAllMatrixCustomAd(), e && e("noComplete");
      }
    });
    this.videoAd.show().then(function () {}).catch(function () {
      n.videoAd.load().then(function () {
        return n.videoAd.show();
      }).catch(function (t) {
        n.hideAllMatrixCustomAd();
        console.log("广告展示失败:", t);
        return e && e("fail");
      });
    });
  };
  _ctor.prototype.destoryVideoBannerAd = function () {
    if (this.bannerVideo) {
      this.bannerVideo.hide();
      this.bannerVideo.destroy();
      this.bannerVideo = null;
    }
  };
  _ctor.prototype.showVideoBannerAd = function (t, e) {
    var n = this;
    if (!this.videoAd) {
      return e && e("fail");
    }
    this.videoAd.offClose();
    this.videoAd.onClose(function (o) {
      n.videoAd.offClose();
      if (o && o.isEnded || undefined === o) {
        return n.hideAllMatrixCustomAd(), n.destoryVideoBannerAd(), t && t("ok");
      } else {
        return n.hideAllMatrixCustomAd(), n.destoryVideoBannerAd(), e && e("noComplete");
      }
    });
    this.videoAd.show().then(function () {
      n.stopAutoRotateBanner();
      $9LYsdkConfig.default.instance.getConfigValByKeyName("front_banenr_video_switch", true) && n.showVideoBanner();
    }).catch(function () {
      n.videoAd.load().then(function () {
        return n.videoAd.show();
      }).catch(function (t) {
        n.hideAllMatrixCustomAd();
        n.destoryVideoBannerAd();
        console.log("广告展示失败:", t);
        return e && e("fail");
      });
    });
  };
  _ctor.prototype.showVideoBanner = function () {
    var t = this;
    var e = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_top_banner_ids");
    var n = window.wx.createBannerAd({
      adUnitId: e[0],
      adIntervals: 30,
      style: {
        left: 80,
        top: 0,
        width: 300,
        height: 168.75
      }
    });
    n.onError(function (t) {
      console.warn("【视频Banner初始化有误:", t);
    });
    n.onResize(function () {
      n.width = 300;
      n.height = 168.75;
    });
    n.onLoad(function () {
      t.bannerVideo = n;
      n.style.width = 300;
      console.log("视频Banner初始化成功");
      setTimeout(function () {
        t.bannerVideo.show().catch(function (t) {
          console.warn("【视频Banner展示失败:", t);
        });
      }, 1e3);
    });
    this.bannerVideo = n;
    window.setTimeout(function () {
      t.destoryVideoBannerAd();
    }, 3e4);
  };
  _ctor.prototype.initBannerAd = function () {
    var t = this;
    if (this.bannerAd.length > 0) {
      this.bannerAd.forEach(function (t) {
        t.destroy();
      });
      this.bannerAd = [];
    }
    var e = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_banner_ids");
    if (e) {
      var n = window.wx.getSystemInfoSync();
      var o = [];
      e.forEach(function (t) {
        o.push(window.wx.createBannerAd({
          adUnitId: t,
          adIntervals: 30,
          style: {
            left: (n.windowWidth - 375) / 2,
            top: 300,
            width: 200,
            height: 112.5
          }
        }));
      });
      var i = function (e) {
        o[e].onResize(function (t) {
          o[e].style.top = n.windowHeight - t.height;
          o[e].style.left = (n.windowWidth - t.width) / 2;
        });
        o[e].onError(function (t) {
          console.warn("【流量主Banner[" + e + "]】初始化有误:", t);
        });
        o[e].onLoad(function () {
          t.bannerAd.push(o[e]);
        });
      };
      for (var a = 0; a < o.length; a++) {
        i(a);
      }
    }
  };
  _ctor.prototype.startAutoRotateBanner = function (t) {
    var e = this;
    undefined === t && (t = $9LYEnum.BANNER_CATEGORY.DEFAULT);
    this.stopAutoRotateBanner();
    $9LYsdkConfig.default.instance.getConfigValByKeyName("front_pure_mode_switch") || setTimeout(function () {
      var n = e.getBannerCategoryAttr(t);
      var o = n.bannerAd;
      var i = n.funcName;
      console.log("-------------------Banner length-------------");
      if (o.length <= 1 || !$9LYsdkConfig.default.instance.getConfigValByKeyName("front_banner_auto_rotate_switch", true)) {
        e[i](true);
      } else {
        var a = function () {
          var n = e.currentBannerId[t] - 1 < 0 ? o.length - 1 : e.currentBannerId[t] - 1;
          e[i](false, n);
          e[i](true, e.currentBannerId[t]);
          ++e.currentBannerId[t] >= o.length && (e.currentBannerId[t] = 0);
        };
        a();
        e.rotateBannerInterval = setInterval(a, 1e3 * $9LYsdkConfig.default.instance.getConfigValByKeyName("front_banner_refresh_time", 5));
      }
    }, 300);
  };
  _ctor.prototype.stopAutoRotateBanner = function () {
    this.rotateBannerInterval && clearInterval(this.rotateBannerInterval);
    for (var t in $9LYEnum.BANNER_CATEGORY) {
      var e = $9LYEnum.BANNER_CATEGORY[t];
      var n = this.getBannerCategoryAttr(e);
      var o = n.bannerAd;
      n.funcName;
      this.hideAllBannerAd(o);
      ++this.currentBannerId[e] >= o.length && (this.currentBannerId[e] = 0);
    }
  };
  _ctor.prototype.toggleBannerAd = function (t, e) {
    var n = this;
    undefined === e && (e = this.currentBannerId[$9LYEnum.BANNER_CATEGORY.DEFAULT]);
    if (this.bannerAd.length <= 0) {
      this.initBannerAd();
    } else {
      if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_banner_switch")) {
        this.bannerAd.forEach(function (t) {
          t.hide();
        }), t = false;
      }
      if (this.bannerAd[e]) {
        if (t) {
          this.bannerAd[e].show().catch(function (t) {
            console.log("Banner[" + e + "]广告展示失败:", t);
            n.bannerAd[e].onLoad(function () {
              console.log("显示banner");
              n.bannerAd[e].show();
            });
          });
        } else {
          this.bannerAd[e].hide();
        }
      }
    }
  };
  _ctor.prototype.initSettleMatrixCustomAd = function (t) {
    var e = this;
    undefined === t && (t = 150);
    if (this.settleMatrixCustomAd.length > 0) {
      this.settleMatrixCustomAd.forEach(function (t) {
        t.destroy();
      });
      this.settleMatrixCustomAd = [];
    }
    var n = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_settle_custom_full_ids");
    if (n) {
      var o = window.wx.getSystemInfoSync();
      n.map(function (e) {
        return window.wx.createCustomAd({
          adUnitId: e,
          style: {
            top: t,
            width: o.screenWidth - 20,
            left: 10
          }
        });
      }).forEach(function (t, n) {
        t.onError(function (t) {
          console.warn("结算页全屏格子[" + n + "]初始化错误：", t);
        });
        t.onLoad(function () {
          console.log("结算页全屏格子[" + n + "]执行了onLoad");
          e.settleMatrixCustomAd.push(t);
        });
      });
    }
  };
  _ctor.prototype.initMatrixCustomAd = function (t) {
    var e = this;
    undefined === t && (t = 70);
    if (this.matrixCustomAd.length > 0) {
      this.matrixCustomAd.forEach(function (t) {
        t.destroy();
      });
      this.matrixCustomAd = [];
    }
    var n = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_custom_full_ids");
    if (n) {
      var o = window.wx.getSystemInfoSync();
      n.map(function (e) {
        return window.wx.createCustomAd({
          adUnitId: e,
          style: {
            top: t,
            width: o.screenWidth - 20,
            left: 10
          }
        });
      }).forEach(function (t, n) {
        t.onError(function (t) {
          console.warn("全屏格子[" + n + "]初始化错误：", t);
        });
        t.onLoad(function () {
          console.log("全屏格子[" + n + "]执行了onLoad");
          e.matrixCustomAd.push(t);
        });
      });
    }
  };
  _ctor.prototype.initSingleCustomAd = function (t, e, n) {
    undefined === t && (t = null);
    undefined === e && (e = 80);
    undefined === n && (n = 64.8);
    var o = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_custom_single_ids");
    var i = window.wx.getSystemInfoSync();
    if (o) {
      if (null !== t) {
        if (!o[t]) {
          return void console.error("单格子广告位id索引：[" + t + "]不存在");
        }
        if (this.singleAd[t]) {
          this.singleAd[t].offLoad();
          this.singleAd[t].offError();
          this.singleAd[t].destroy();
        }
        this.singleAd[t] = window.wx.createCustomAd({
          adUnitId: o[t],
          adIntervals: 30,
          style: {
            top: e,
            width: n,
            left: 0 == t ? 3 : i.screenWidth - n - 3
          }
        });
        this.singleAd[t].onError(function (e) {
          console.log("单格子[" + t + "]初始化失败:", e);
        });
      } else {
        if (this.singleAd.length > 0) {
          this.singleAd.forEach(function (t) {
            t.destroy();
          });
          this.singleAd = [];
        }
        this.singleAd = o.map(function (t, o) {
          return window.wx.createCustomAd({
            adUnitId: t,
            adIntervals: 30,
            style: {
              top: e,
              width: n,
              left: 0 == o ? 3 : i.screenWidth - n - 3
            }
          });
        });
        this.singleAd.forEach(function (t, e) {
          t.onError(function (t) {
            console.log("单格子【" + e + "】初始化失败:", t);
          });
        });
      }
    }
  };
  _ctor.prototype.initOtherSingleCustomAd = function (t, e, n) {
    undefined === t && (t = null);
    undefined === e && (e = 80);
    undefined === n && (n = 64.8);
    var o = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_level_custom_single_ids");
    var i = window.wx.getSystemInfoSync();
    if (o) {
      if (null !== t) {
        if (!o[t]) {
          return void console.error("单格子广告位id索引：[" + t + "]不存在");
        }
        if (this.otherSingleAd[t]) {
          this.otherSingleAd[t].offLoad();
          this.otherSingleAd[t].offError();
          this.otherSingleAd[t].destroy();
        }
        this.otherSingleAd[t] = window.wx.createCustomAd({
          adUnitId: o[t],
          adIntervals: 30,
          style: {
            top: e,
            width: n,
            left: 0 == t ? 3 : i.screenWidth - n - 3
          }
        });
        this.otherSingleAd[t].onError(function (e) {
          console.log("其他单格子[" + t + "]初始化失败:", e);
        });
      } else {
        if (this.otherSingleAd.length > 0) {
          this.otherSingleAd.forEach(function (t) {
            t.destroy();
          });
          this.otherSingleAd = [];
        }
        this.otherSingleAd = o.map(function (t, o) {
          return window.wx.createCustomAd({
            adUnitId: t,
            adIntervals: 30,
            style: {
              top: e,
              width: n,
              left: 0 == o ? 3 : i.screenWidth - n - 3
            }
          });
        });
        this.otherSingleAd.forEach(function (t, e) {
          t.onError(function (t) {
            console.log("单格子【" + e + "】初始化失败:", t);
          });
        });
      }
    }
  };
  _ctor.prototype.initInterstitialAd = function () {
    var t = this;
    if (this.interstitialAd.length > 0) {
      this.interstitialAd.forEach(function (t) {
        t.destroy();
      });
      this.interstitialAd = [];
    }
    var e = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_interstitial_ids");
    if (e) {
      var n = [];
      e.forEach(function (t) {
        var e = window.wx.createInterstitialAd({
          adUnitId: t
        });
        n.push(e);
      });
      n.forEach(function (e, n) {
        e.onError(function (e) {
          t.interstitialAd.splice(n, 1);
          console.warn("流量主插屏[" + n + "]初始化错误:", e);
        });
        e.onLoad(function () {
          console.warn("流量主插屏[" + n + "]屏加载成功");
          t.interstitialAd.push(e);
        });
        e.onClose(function () {
          console.log("插屏 广告关闭");
        });
      });
    }
  };
  _ctor.prototype.initCustomSideAd = function (t, e) {
    var n = this;
    undefined === t && (t = 1);
    undefined === e && (e = 95);
    this.customSideAd.length > 0 && this.customSideAd.forEach(function (t) {
      t.destroy();
    });
    var o = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_custom_side_ids");
    if (o) {
      var i = window.wx.getSystemInfoSync();
      o.forEach(function (o, a) {
        var r = window.wx.createCustomAd({
          adUnitId: o,
          adIntervals: 30,
          style: {
            top: e,
            width: 72 * t,
            left: 0 == a ? 5 : i.screenWidth - 72 * t - 5
          }
        });
        r.onError(function (t) {
          console.log("对联格子[" + a + "]初始化错误：", t);
        });
        n.customSideAd.push(r);
      });
    } else {
      console.log("对联格子广告id未配置");
    }
  };
  _ctor.prototype.toggleCustomSideAd = function (t, e, n) {
    var o = this;
    undefined === e && (e = false);
    undefined === n && (n = false);
    if (!(this.customSideAd.length <= 0)) {
      $9LYsdkConfig.default.instance.getConfigValByKeyName("front_custom_switch") || (t = false);
      if (!e && this.customSideAd[0]) {
        if (t) {
          this.customSideAd[0].show().catch(function () {
            o.customSideAd[0].onLoad(function () {
              o.customSideAd[0].show();
            });
          });
        } else {
          this.customSideAd[0].hide();
        }
      }
      if (!n && this.customSideAd[1]) {
        if (t) {
          this.customSideAd[1].show().catch(function () {
            o.customSideAd[1].onLoad(function () {
              o.customSideAd[1].show();
            });
          });
        } else {
          this.customSideAd[1].hide();
        }
      }
    }
  };
  _ctor.prototype.toggleSettleMatrixCustomAd = function (t, e) {
    var n = this;
    undefined === e && (e = 0);
    if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_pure_mode_switch")) {
      if (this.settleMatrixCustomAd.length <= 0 || !this.settleMatrixCustomAd[e]) {
        this.initSettleMatrixCustomAd(150);
      } else if (t) {
        this.settleMatrixCustomAd[e].show().catch(function () {
          n.settleMatrixCustomAd[e].onLoad(function () {
            n.settleMatrixCustomAd[e].show();
          });
        });
      } else {
        this.settleMatrixCustomAd[e].hide();
      }
    }
  };
  _ctor.prototype.toggleMatrixCustomAd = function (t, e) {
    var n = this;
    undefined === e && (e = 0);
    if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_custom_full_switch")) {
      this.matrixCustomAd.forEach(function (t) {
        t.hide();
      });
      t = false;
    }
    if (!(this.matrixCustomAd.length <= 0 || !this.matrixCustomAd[e])) {
      if (t) {
        this.matrixCustomAd[e].show().catch(function () {
          n.matrixCustomAd[e].onLoad(function () {
            n.matrixCustomAd[e].show();
          });
        });
      } else {
        this.matrixCustomAd[e].hide();
      }
    }
  };
  _ctor.prototype.initAllAdUnit = function () {
    var t = this;
    this.initMatrixCustomAd(130);
    this.initBannerAd();
    this.initInterstitialAd();
    this.initCustomSideAd(.9, 170);
    setTimeout(function () {
      t.initVideoAd();
      t.initSingleCustomAd(null, 100, 68);
      t.initOtherSingleCustomAd(null, 135, 68);
      t.initSettleMatrixCustomAd(200);
    }, 2e3);
  };
  _ctor.prototype.toggleSingleCustomAd = function (t, e, n) {
    var o = this;
    undefined === e && (e = false);
    undefined === n && (n = false);
    if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_pure_mode_switch")) {
      if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_single_custom_switch")) {
        this.singleAd.forEach(function (t) {
          t.hide();
        }), t = false;
      }
      if (this.singleAd) {
        !n && this.singleAd[1] && (t ? this.singleAd[1].show().catch(function () {
          o.singleAd[1].onLoad(function () {
            o.singleAd[1].show();
          });
        }) : this.singleAd[1].hide()), !e && this.singleAd[0] && (t ? this.singleAd[0].show().catch(function () {
          o.singleAd[0].onLoad(function () {
            o.singleAd[0].show();
          });
        }) : this.singleAd[0].hide());
      }
    }
  };
  _ctor.prototype.toggleOtherSingleCustomAd = function (t, e, n) {
    var o = this;
    undefined === e && (e = false);
    undefined === n && (n = false);
    if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_level_custom_single_ids")) {
      this.otherSingleAd.forEach(function (t) {
        t.hide();
      });
      t = false;
    }
    if (this.otherSingleAd) {
      if (!n && this.otherSingleAd[1]) {
        if (t) {
          this.otherSingleAd[1].show().catch(function () {
            o.otherSingleAd[1].onLoad(function () {
              o.otherSingleAd[1].show();
            });
          });
        } else {
          this.otherSingleAd[1].hide();
        }
      }
      if (!e && this.otherSingleAd[0]) {
        if (t) {
          this.otherSingleAd[0].show().catch(function () {
            o.otherSingleAd[0].onLoad(function () {
              o.otherSingleAd[0].show();
            });
          });
        } else {
          this.otherSingleAd[0].hide();
        }
      }
    }
  };
  _ctor.prototype.showInterstitialAd = function () {
    var t = this;
    if ($9LYsdkConfig.default.instance.getConfigValByKeyName("front_interstitial_switch")) {
      if (this.interstitialAd.length <= 0) {
        this.initInterstitialAd();
      } else {
        var e = this.interstitialAd.pop();
        if (this.inTime) {
          var n = new Date().getTime();
          var o = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_interstitial_show_interval_seconds");
          if (Math.floor((n - this.inTime) / 1e3) >= o) {
            e.show().then(function () {
              t.inTime = new Date().getTime();
              console.log("reset cd");
            }).catch(function (t) {
              console.log("LYSDK：插屏弹出失败", t);
            });
          } else {
            console.log("插屏显示时间没到");
          }
        } else {
          this.inTime = new Date().getTime();
          e.show().catch(function (t) {
            console.log("LYSDK：插屏弹出失败", t);
          });
        }
      }
    }
  };
  _ctor.prototype.vibrateShort = function (t) {
    undefined === t && (t = "heavy");
    window.wx.vibrateShort({
      type: t,
      success: function () {},
      fail: function (t) {
        console.log("调用震动失败：", t);
      }
    });
  };
  _ctor.prototype.activeShare = function (t, e) {
    var n = this;
    if (!this._isShareing) {
      clearTimeout(this.shareTimer);
      this._isShareing = true;
      var o = {
        title: $9LYsdkConfig.default.instance.getConfigValByKeyName("front_share_text"),
        imageUrl: $9LYsdkConfig.default.instance.getConfigValByKeyName("front_share_img"),
        query: t || ""
      };
      window.wx.shareAppMessage(o);
      this.shareTimer = setTimeout(function () {
        e && e();
        n._isShareing = false;
      }, 3e3);
    }
  };
  _ctor.prototype.getOpenId = function () {
    return new Promise(function (t, e) {
      var n = cc.sys.localStorage.getItem("openId:" + cc.sys.platform);
      if (n) {
        return t(n);
      }
      window.wx.login({
        timeout: 1e4,
        success: function (n) {
          if (n.code) {
            window.wx.request({
              url: $9LYsdkConfig.default.instance.wechat_login_domain,
              data: {
                app_key: $9LYsdkConfig.default.instance.app_key,
                code: n.code
              },
              success: function (n) {
                console.log(n);
                if (0 !== n.data.code) {
                  return e("请求登录接口失败:" + n.data.msg);
                }
                cc.sys.localStorage.setItem("openId:" + cc.sys.platform, n.data.data);
                t(n.data.data);
              },
              fail: function (t) {
                console.log("微信发起登录请求失败：", t);
                e(false);
              }
            });
          } else {
            e(null);
            console.log("登录失败！" + n.errMsg);
          }
        },
        fail: function (t) {
          e(null);
          console.error("调用wx.login失败：", t);
        }
      });
    });
  };
  _ctor.prototype.getUserInfo = function () {
    return new Promise(function (t, e) {
      var n = cc.sys.localStorage.getItem("userInfo:" + cc.sys.platform);
      if (n) {
        return t(JSON.parse(n));
      }
      window.wx.getSetting({
        success: function (n) {
          if (true === n.authSetting["scope.userInfo"]) {
            return void window.wx.getUserInfo({
              success: function (e) {
                cc.sys.localStorage.setItem("userInfo:" + cc.sys.platform, JSON.stringify(e.userInfo));
                return t(e.userInfo);
              },
              fail: function (t) {
                return e(t);
              }
            });
          } else {
            return e("世界排行榜用户没有授权");
          }
        }
      });
    });
  };
  _ctor.prototype.createUserInfoButton = function (t, e) {
    return cc__awaiter(this, undefined, undefined, function () {
      var n;
      var o;
      var a;
      var r;
      var s;
      var c;
      var u;
      var l = this;
      return cc__generator(this, function (i) {
        switch (i.label) {
          case 0:
            n = window.wx.getSystemInfoSync();
            this.userInfoNodeRect || (this.userInfoNodeRect = t.getBoundingBoxToWorld());
            o = this.userInfoNodeRect.x;
            a = this.userInfoNodeRect.y;
            r = cc.sys.getSafeAreaRect();
            o -= r.x;
            a -= r.y;
            s = cc.view.getDevicePixelRatio();
            c = cc.view.getScaleX();
            u = c / s;
            i.label = 1;
          case 1:
            i.trys.push([1, 3,, 4]);
            return [4, this.getUserInfo()];
          case 2:
            i.sent();
            return [3, 4];
          case 3:
            i.sent();
            this.userInfoBtn = window.wx.createUserInfoButton({
              type: "text",
              text: "",
              style: {
                left: o * u,
                top: n.screenHeight - (a + this.userInfoNodeRect.height) * u,
                width: this.userInfoNodeRect.width * u,
                height: this.userInfoNodeRect.height * u,
                lineHeight: 0,
                backgroundColor: "",
                color: "#ffffff",
                textAlign: "center",
                fontSize: 16,
                borderRadius: 4
              }
            });
            this.userInfoBtn.onTap(function (t) {
              if (!t.hasOwnProperty(t.errno) && t.hasOwnProperty("userInfo")) {
                l.userInfoBtn.hide();
                l.getOpenId();
                l.getUserInfo();
              }
              e && e();
            });
            return [3, 4];
          case 4:
            return [2];
        }
      });
    });
  };
  _ctor.prototype.hideCreateUserInfoButton = function () {
    if (this.userInfoBtn) {
      this.userInfoBtn.hide();
      this.userInfoBtn = null;
    }
  };
  _ctor.prototype.layerOperationsFramework = function () {
    this.toggleSettleMatrixCustomAd(false);
    this.hideAllMatrixCustomAd();
    this.toggleCustomSideAd(false);
    this.toggleOtherSingleCustomAd(false);
    var t = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_prop_page_custom_swtich", true);
    this.toggleSingleCustomAd(t);
    if ($9LYsdkConfig.default.instance.getConfigValByKeyName("front_prop_page_banner_switch", true)) {
      this.startAutoRotateBanner();
    } else {
      this.stopAutoRotateBanner();
    }
  };
  _ctor.prototype.homeOperationsFramework = function (t) {
    undefined === t && (t = false);
    var e = new Date().getTime();
    if (!(this.diffTime && e - this.diffTime < 300)) {
      this.diffTime = e;
      this.toggleSettleMatrixCustomAd(false);
      this.hideAllMatrixCustomAd();
      this.toggleSingleCustomAd(false);
      this.toggleOtherSingleCustomAd(false);
      this.stopAutoRotateBanner();
      var n = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_disable_interstitial_stage", []).map(Number);
      var o = $9AppMain.default.localData.level;
      n.indexOf(o) < 0 && $9LYsdkConfig.default.instance.getConfigValByKeyName("front_back_home_interstitial_switch") && t && this.showInterstitialAd();
      var i = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_home_custom_ad_switch");
      this.toggleHomeCustomeAd(i);
      if ($9LYsdkConfig.default.instance.getConfigValByKeyName("front_menu_banner_switch", true)) {
        this.startAutoRotateBanner();
      } else {
        this.stopAutoRotateBanner();
      }
    }
  };
  _ctor.prototype.closeAllAd = function () {
    this.toggleSettleMatrixCustomAd(false);
    this.hideAllMatrixCustomAd();
    this.toggleCustomSideAd(false);
    this.toggleSingleCustomAd(false);
    this.stopAutoRotateBanner();
  };
  _ctor.prototype.gameOperationsFramework = function () {
    this.toggleCustomSideAd(false);
    this.toggleHomeCustomeAd(false);
    this.toggleSingleCustomAd(false);
    this.stopAutoRotateBanner();
    var t = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_level_show_custom_switch", true);
    this.toggleOtherSingleCustomAd(t);
    this.toggleSettleMatrixCustomAd(false);
    var e = $9AppMain.default.localData.level;
    var n = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_enter_the_stage_interstitial_switch", true);
    $9LYsdkConfig.default.instance.getConfigValByKeyName("front_disable_interstitial_stage", []).map(Number).indexOf(e) < 0 && n && this.showInterstitialAd();
  };
  _ctor.prototype.settleOperationsFramework = function (t) {
    if ($9LYsdkConfig.default.instance.getConfigValByKeyName("front_settle_banner_switch", false)) {
      this.startAutoRotateBanner();
    } else {
      this.stopAutoRotateBanner();
    }
    this.toggleCustomSideAd(false);
    this.toggleOtherSingleCustomAd(false);
    this.toggleSingleCustomAd(false);
    var e = $9AppMain.default.localData.level;
    var n = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_settle_page_interstitial_switch", true);
    $9LYsdkConfig.default.instance.getConfigValByKeyName("front_disable_interstitial_stage", []).map(Number).indexOf(e) < 0 && n && this.showInterstitialAd();
    if ($9LYsdkConfig.default.instance.getConfigValByKeyName("front_settle_full_screen_custome_ad_switch", false)) {
      this.toggleHomeCustomeAd(false);
    } else {
      this.toggleHomeCustomeAd(true);
    }
    this.toggleSettleMatrixCustomAd($9LYsdkConfig.default.instance.getConfigValByKeyName("front_settle_full_screen_custome_ad_switch", false), 0);
    t && t();
  };
  _ctor.prototype.settleVideo = function (t) {
    var e = false;
    this.setChannelMod(function () {
      e = true;
    }, function () {
      e = false;
    });
    if (e) {
      $9LYsdkConfig.default.instance.getConfigValByKeyName("front_force_video_switch", false);
      t && t();
    } else {
      t && t();
    }
  };
  _ctor.prototype.turnToApp = function (t) {
    t && window.wx.navigateToMiniProgram({
      appId: t
    });
  };
  _ctor.prototype.toggleHomeCustomeAd = function (t) {
    if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_pure_mode_switch")) {
      if (!$9LYsdkConfig.default.instance.getConfigValByKeyName("front_home_custom_ad_switch", true)) {
        this.toggleSingleCustomAd(false);
        return void this.toggleCustomSideAd(false);
      }
      var e = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_menu_show_custom_type", 0);
      if (0 == e) {
        this.toggleCustomSideAd(t);
      } else if (1 == e) {
        this.toggleSingleCustomAd(t);
      } else {
        this.toggleCustomSideAd(t);
      }
    }
  };
  _ctor.prototype.setFriendRank = function (t) {
    window.wx.postMessage({
      event: "setScore",
      score: t
    });
  };
  _ctor.prototype.hideAllBannerAd = function (t) {
    undefined === t && (t = this.bannerAd);
    t.forEach(function (t) {
      t.hide();
    });
  };
  _ctor.prototype.hideAllMatrixCustomAd = function () {
    this.matrixCustomAd.forEach(function (t) {
      t.hide();
    });
  };
  _ctor.prototype.getCapsuleInfo = function () {
    return window.wx.getMenuButtonBoundingClientRect();
  };
  _ctor.prototype.checkVersion = function () {
    undefined !== window.wx && $9LYsdkConfig.default.instance.getConfigValByKeyName("front_new_version_notify_switch", false) && window.wx.requestSubscribeSystemMessage({
      msgTypeList: ["SYS_MSG_TYPE_WHATS_NEW"],
      success: function (t) {
        console.log(t);
        window.wx && window.wx.uma.trackEvent("game_upgrade");
      },
      fail: function (t) {
        console.log(t.errMsg, t.errCode);
      },
      complete: function () {}
    });
  };
  _ctor.prototype.checkMessage = function () {
    if (undefined !== window.wx && $9LYsdkConfig.default.instance.getConfigValByKeyName("front_subscribe_switch", false)) {
      var t = $9LYsdkConfig.default.instance.getConfigValByKeyName("front_subscribe_tempids");
      window.wx.requestSubscribeMessage({
        tmplIds: t,
        success: function (t) {
          console.log(t);
          window.wx && window.wx.uma.trackEvent("game_subscribe");
        },
        fail: function (t) {
          console.log(t);
        },
        complete: function () {}
      });
    }
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_LYwechatManager;