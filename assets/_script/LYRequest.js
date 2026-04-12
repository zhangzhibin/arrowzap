Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9LYsdkConfig = require("LYsdkConfig");
var def_LYRequest = function () {
  function _ctor() {
    this.timeout = 1e4;
  }
  _ctor.getInstance = function () {
    null === this._instance && (this._instance = new this());
    return this._instance;
  };
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      return this.getInstance();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.get = function (t, e) {
    t += "?";
    if (e) {
      for (var n in e) {
        t += n + "=" + e[n] + "&";
      }
    }
    t += "app_key=" + $9LYsdkConfig.default.instance.app_key + "&version=" + $9LYsdkConfig.default.instance.version;
    return this.requeset(t, "GET");
  };
  _ctor.prototype.post = function (t, e) {
    t += "?app_key=" + $9LYsdkConfig.default.instance.app_key + "&version=" + $9LYsdkConfig.default.instance.version;
    return this.requeset(t, "POST", e);
  };
  _ctor.prototype.requeset = function (t, e, n) {
    var i = this;
    return new Promise(function (a, r) {
      if ("POST" == e && !$9LYsdkConfig.default.instance.getConfigValByKeyName("is_allow_report_switch")) {
        return r("服务端配置拒绝所有上报请求");
      }
      var s = new XMLHttpRequest();
      s.timeout = i.timeout;
      s.onreadystatechange = function () {
        if (4 == s.readyState && s.status >= 200 && s.status < 400) {
          var t = s.responseText;
          var e = JSON.parse(t);
          if (0 === e.code) {
            return a(e);
          } else {
            return r("获取服务端配置错误：" + e.msg);
          }
        }
      };
      s.onerror = function () {
        return r("获取服务端配置错误!!!");
      };
      s.ontimeout = function () {
        return r("获取服务端配置请求超时");
      };
      s.open(e, t);
      if ("POST" == e) {
        s.setRequestHeader("Content-Type", "application/json");
        s.send(JSON.stringify(n));
      } else {
        s.send();
      }
    });
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_LYRequest;