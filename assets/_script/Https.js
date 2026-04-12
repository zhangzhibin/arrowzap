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
  Object.defineProperty(_ctor.prototype, "userInfo", {
    get: function () {
      return this._userInfo;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.saveUserServer = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (e) {
        // WeChat user info saving removed
        return [2];
      });
    });
  };
  _ctor._ins = null;
  return _ctor;
}();
exports.default = def_Https;