var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9GameConfig = require("GameConfig");
var $9AppMain = require("AppMain");
var def_Https = function () {
  function _ctor() {
    this.openId = "";
    this.myLocationIP = {};
    this.app_key = $9GameConfig.default.appKey;
    this._userInfo = {
      avatarUrl: "",
      city: "",
      country: "",
      gender: 0,
      language: "",
      nickName: "",
      province: ""
    };
  }
  _ctor.getIns = function () {
    if (null === this._ins) {
      this._ins = new _ctor();
      this._ins._comData = {
        app_key: this._ins.app_key,
        openId: $9GameConfig.default.openId
      };
    }
    return this._ins;
  };
  Object.defineProperty(_ctor, "ins", {
    get: function () {
      return this.getIns();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "serverConfig", {
    get: function () {
      return this._serverConfig;
    },
    set: function (t) {
      this._serverConfig = t;
      for (var e in t.province) {
        if (t.province[e].selected) {
          this.myLocationIP.data = t.province[e];
          this.myLocationIP.index = Number(e);
        }
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "comData", {
    get: function () {
      return this._comData;
    },
    set: function (t) {
      this._comData = t;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.post = function (t, e, n, o) {
    undefined === e && (e = {});
    var i = new XMLHttpRequest();
    i.withCredentials = true;
    i.onreadystatechange = function () {
      if (4 == i.readyState && i.status >= 200 && i.status < 400) {
        var t = i.responseText;
        console.log(t);
        n && n.call(o, t);
      }
    };
    e.open_id = this.comData.openId;
    e.app_key = this.comData.app_key;
    i.open("POST", t, true);
    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var a = "";
    for (var r in e) {
      a += r + "=" + e[r] + "&";
    }
    a = a.slice(0, -1);
    console.warn("上传数据::::", a);
    i.send(a);
  };
  _ctor.prototype.get = function (t, e, n, o) {
    undefined === e && (e = {});
    var i = new XMLHttpRequest();
    i.withCredentials = true;
    i.onreadystatechange = function () {
      console.warn("xhr.readyState", i.status);
      if (4 == i.readyState && i.status >= 200 && i.status < 400) {
        var t = i.responseText;
        var e = JSON.parse(t);
        n && n.call(o, e);
      }
    };
    i.onerror = function () {
      return n && n.call(o, {
        code: 1,
        msg: "获取服务端配置错误!!!"
      });
    };
    i.ontimeout = function () {
      return n && n.call(o, {
        code: 1,
        msg: "获取服务端配置错误!!!"
      });
    };
    var a = "?";
    e.open_id = this.comData.openId;
    e.app_key = this.comData.app_key;
    for (var r in e) {
      a += r + "=" + e[r] + "&";
    }
    a = a.slice(0, -1);
    i.open("GET", t + a, true);
    i.send();
  };
  _ctor.prototype.asyncPost = function (t, e) {
    var n = this;
    undefined === e && (e = {});
    return new Promise(function (o) {
      n.post(t, e, function (t) {
        console.log("返回的数据", t);
        o(t);
      });
    });
  };
  _ctor.prototype.asyncGet = function (t, e) {
    var n = this;
    undefined === e && (e = {});
    return new Promise(function (o, i) {
      n.get(t, e, function (t) {
        if (0 === t.code) {
          o(t);
        } else {
          console.log("请求");
          i([]);
        }
      });
    });
  };
  _ctor.prototype.wxLogin = function () {
    if (!window.wx) {
      $9AppMain.default.teoastManager.show("请在微信环境下登录");
      return void (this.comData.openId = "o7coS5kY5_2fRkYHE8NNBhHsU-xM");
    }
    this.comData.app_key = this.app_key;
    var t = this;
    return new Promise(function (e) {
      window.wx.login({
        success: function (n) {
          if (n.code) {
            window.wx.request({
              url: "https://api.junmeishiye.cn/wechat/game/login",
              data: {
                app_key: t.app_key,
                code: n.code
              },
              success: function (n) {
                console.log("data", n.data);
                $9GameConfig.default.openId = n.data.data;
                t.openId = n.data.data;
                t.comData.openId = $9GameConfig.default.openId;
                e(true);
              },
              fail: function () {
                e(false);
              }
            });
          } else {
            e(false);
            console.log("登录失败！" + n.errMsg);
          }
        }
      });
    });
  };
  _ctor.prototype.getWxUserInfo = function () {
    var t = window.wx;
    if (!t) {
      console.warn("请在微信环境下登录");
      return false;
    }
    var e = this;
    return new Promise(function (n) {
      t.getSetting({
        success: function (t) {
          if (t.authSetting["scope.userInfo"]) {
            n(false);
          } else {
            e.wxAuthorize(n);
          }
        }
      });
    });
  };
  _ctor.prototype.wxAuthorize = function (t) {
    var e = window.wx;
    if (e) {
      var n = this;
      e.authorize({
        scope: "scope.userInfo",
        success: function () {
          e.getUserInfo({
            success: function (e) {
              n._userInfo = e.userInfo;
              var o = {
                avatarUrl: e.userInfo.avatarUrl,
                nickName: e.userInfo.nickName,
                gender: e.userInfo.gender
              };
              cc.sys.localStorage.setItem("wxUserInfo", JSON.stringify(o));
              console.log("玩家信息::", n._userInfo);
              t(e.userInfo);
            }
          });
        },
        fail: function () {
          t(false);
          console.log("授权失败");
        }
      });
    }
  };
  Object.defineProperty(_ctor.prototype, "userInfo", {
    get: function () {
      return this._userInfo;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.saveUserServer = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      var t;
      return cc__generator(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.getWxUserInfo()];
          case 1:
            t = e.sent();
            if (t) {
              this.post("https://api.junmeishiye.cn/wechat/game/user/info", {
                app_key: this.app_key,
                open_id: $9GameConfig.default.openId,
                avatarUrl: t.avatarUrl,
                nickName: t.nickName,
                gender: t.gender
              });
            }
            return [2];
        }
      });
    });
  };
  _ctor._ins = null;
  return _ctor;
}();
exports.default = def_Https;