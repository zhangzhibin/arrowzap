var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9LYsdkConfig = require("LYsdkConfig");
var $9LYdefaultMgs = require("LYdefaultMgs");
var def_LYsdkManager = function () {
  function _ctor() {
    this.model = null;
    this.setModel();
  }
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      null == this._instance && (this._instance = new _ctor());
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "platform", {
    get: function () {
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        try {
          var t = require("LYwechatManager");
          return this.model = t.default.instance, t.default.instance;
        } catch (e) {
          console.warn("LYsdk: 未找到 LYwechatManager，使用默认空实现");
          return this.model = $9LYdefaultMgs.default.instance, $9LYdefaultMgs.default.instance;
        }
      }
      if (cc.sys.isBrowser) {
        return this.model = $9LYdefaultMgs.default.instance, $9LYdefaultMgs.default.instance;
      }
      return this.model = $9LYdefaultMgs.default.instance, $9LYdefaultMgs.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.setModel = function () {
    if ($9LYsdkConfig.default.instance.debug_mode) {
      this.model = $9LYdefaultMgs.default.instance;
    } else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      try {
        var e = require("LYwechatManager");
        this.model = e.default.instance;
      } catch (n) {
        console.warn("LYsdk: 未找到 LYwechatManager，使用默认空实现");
        this.model = $9LYdefaultMgs.default.instance;
      }
    } else if (cc.sys.isBrowser) {
      this.model = $9LYdefaultMgs.default.instance;
    } else {
      this.model = $9LYdefaultMgs.default.instance;
    }
  };
  _ctor.prototype.initConfigs = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      return cc__generator(this, function (t) {
        switch (t.label) {
          case 0:
            return [4, $9LYsdkConfig.default.instance.initConfigs()];
          case 1:
            return [2, t.sent()];
        }
      });
    });
  };
  _ctor.prototype.apply = function (t, e) {
    if (this.model && "function" == typeof this.model[t]) {
      return this.model[t].apply(this.model, e);
    } else {
      return console.warn("SDK调用方法不存在, 平台:" + cc.sys.platform + ", 方法名：" + t), null;
    }
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_LYsdkManager;