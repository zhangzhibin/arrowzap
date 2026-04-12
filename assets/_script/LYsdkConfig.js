Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_LYsdkConfig = function () {
  function _ctor() {
    this.app_env = "production";
    this.version = "1.0.3";
    this.app_key = "f321a40722aeb91470ba8f2dc4ca03db";
    this.config_domain = "https://api.junmeishiye.cn/configs";
    this.config_is_need_province = true;
    this.vivo_login_domain = "https://quickgame.vivo.com.cn/api/quickgame/cp/account/userInfo";
    this.report_user_info_domain = new Map();
    this.rank_set_domain = "https://api.junmeishiye.cn/game/set/rank";
    this.rank_get_domain = "https://api.junmeishiye.cn/game/rank";
    this.rank_record_limit = 100;
    this.province_rank_get_domian = "https://api.junmeishiye.cn/get/province/rank";
    this.province_rank_set_domain = "https://api.junmeishiye.cn/province/rank";
    this.world_rank_fake_data = [];
    this.world_rank_fake_avatar_path = "/sprite/avatar";
    this.use_client_conf_platform = [];
    this.req_time_out = 5e3;
    this.operate_configs = null;
    this.debug_mode = false;
    this.client_configs = new Map();
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
  _ctor.prototype.initConfigs = function () {
    var t = this;
    return new Promise(function (e, n) {
      if (cc.sys.isBrowser || t.debug_mode) {
        t.operate_configs = {
          configs: {}
        };
        return e("");
      }
      if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
        t.operate_configs = {
          app_key: t.app_key,
          area: null,
          front_wuchu_scene: "",
          is_allow_area: false,
          is_allow_export: false,
          req_ip: null,
          req_version: t.version,
          wuchu_version: t.version,
          province: [],
          configs: {}
        };
        console.warn("LYSDK：非微信平台使用本地默认配置，跳过服务端配置拉取");
        return e("");
      }
      t.operate_configs = t.client_configs.get(cc.sys.platform) || {
        app_key: t.app_key,
        area: null,
        front_wuchu_scene: "",
        is_allow_area: false,
        is_allow_export: false,
        req_ip: null,
        req_version: t.version,
        wuchu_version: t.version,
        province: [],
        configs: {}
      };
      t.getServiceConfigs().then(function (n) {
        t.resetOperateConfigs(n);
        return e("");
      }, function (t) {
        console.error(t);
        return n(t);
      });
    });
  };
  _ctor.prototype.resetOperateConfigs = function (t) {
    undefined === t && (t = null);
    if (t) {
      this.operate_configs.front_wuchu_scene = t.front_wuchu_scene;
      this.operate_configs.is_allow_area = t.is_allow_area;
      this.operate_configs.is_allow_export = t.is_allow_export;
      this.operate_configs.req_ip = t.req_ip;
      this.operate_configs.area = t.area;
      this.operate_configs.req_version = t.req_version;
      this.operate_configs.wuchu_version = t.wuchu_version;
      var e = 0;
      for (var n = Object.keys(this.operate_configs.configs); e < n.length; e++) {
        var o = n[e];
        if (t.configs.hasOwnProperty(o)) {
          "front_video_ids" === o && this.operate_configs.configs[o][0] != t.configs[o].config_val[0] && console.warn("LYSDK：客户端广告位与服务端广告位不匹配，请核对并保持一致!");
          this.operate_configs.configs[o] = t.configs[o].config_val;
        }
      }
      console.warn("LYSDK：覆盖服务端后的配置:", this.operate_configs);
      if (this.operate_configs.configs.front_banner_ids && Array.isArray(this.operate_configs.configs.front_banner_ids) && this.operate_configs.configs.front_banner_ids.length > 0) {
        this.operate_configs.configs.front_top_banner_ids = [this.operate_configs.configs.front_banner_ids.pop()];
      }
    }
  };
  _ctor.prototype.convertVersion = function (t) {
    var e = t.split(".").join("");
    return parseInt(e, 10);
  };
  _ctor.prototype.checkVersion = function () {
    if (!this.operate_configs) {
      return false;
    }
    var t = this.convertVersion(this.operate_configs.req_version);
    return this.convertVersion(this.operate_configs.wuchu_version) >= t;
  };
  _ctor.prototype.getServiceConfigs = function () {
    var t = this;
    return new Promise(function (e, n) {
      var o = new XMLHttpRequest();
      o.timeout = t.req_time_out;
      o.onreadystatechange = function () {
        if (4 == o.readyState && o.status >= 200 && o.status < 400) {
          var t = o.responseText;
          var i = JSON.parse(t);
          if (0 === i.code) {
            return e(i.data);
          } else {
            return n("获取服务端配置错误：" + i.msg);
          }
        }
      };
      o.onerror = function () {
        return n("获取服务端配置错误!!!");
      };
      o.ontimeout = function () {
        return n("获取服务端配置请求超时");
      };
      o.open("GET", t.config_domain + "?app_key=" + t.app_key + "&version=" + t.version + "&t=" + new Date().getTime() + "&is_need_province=" + (t.config_is_need_province ? 1 : 0));
      o.send();
    });
  };
  _ctor.prototype.setConfigValByKeyName = function (t, e) {
    if (this.operate_configs && this.operate_configs.configs) {
      this.operate_configs.configs[t] = e;
    }
  };
  _ctor.prototype.getConfigValByKeyName = function (t, e) {
    if (this.operate_configs && this.operate_configs.configs && this.operate_configs.configs.hasOwnProperty(t)) {
      return this.operate_configs.configs[t];
    } else {
      return e || null;
    }
  };
  _ctor.prototype.getConfigAttrValByName = function (t, e) {
    if (this.operate_configs && this.operate_configs.hasOwnProperty(t)) {
      return this.operate_configs[t];
    } else {
      return e || null;
    }
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_LYsdkConfig;