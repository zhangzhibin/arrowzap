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
    this.wechat_login_domain = "https://api.junmeishiye.cn/wechat/game/login";
    this.vivo_login_domain = "https://quickgame.vivo.com.cn/api/quickgame/cp/account/userInfo";
    this.report_user_info_domain = new Map([[cc.sys.WECHAT_GAME, "https://api.junmeishiye.cn/wechat/game/user/info"]]);
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
    this.client_configs = new Map([[cc.sys.WECHAT_GAME, {
      app_key: this.app_key,
      area: null,
      front_wuchu_scene: "1095|1058|1045|1046|1067|1068|1084|1144|1091|1152|1201|1228|1230|1232|1238|1200|1089|1001|1007|1038|1037|1104|1107",
      is_allow_area: true,
      is_allow_export: true,
      req_ip: null,
      req_version: this.version,
      wuchu_version: this.version,
      province: [],
      configs: {
        front_enter_the_game_interstitial_switch: true,
        front_interstitial_switch: true,
        front_single_custom_switch: true,
        front_custom_switch: true,
        front_banner_switch: true,
        front_custom_full_switch: true,
        front_close_video_show_interstitial: true,
        front_share_text: "好玩上头的游戏，你敢接受挑战吗？",
        front_share_img: "https://game-lingyang.oss-cn-guangzhou.aliyuncs.com/game_admin/production/material/2202407056687ef5a7e6f7.jpg",
        front_menu_banner_switch: true,
        front_banner_ids: ["adunit-522ecc46b4f695d2", "adunit-baaac32e1b27d886", "adunit-23ee1bc3fde77d5b", "adunit-3a56c14f2afd63bb", "adunit-28c8bba909fd182a"],
        front_video_banner_ids: [],
        front_video_ids: ["adunit-677964af6ec7bbc4"],
        front_interstitial_ids: ["adunit-573fb1dc9bd48662", "adunit-f298e5c8fbce6cac", "adunit-14317aa275b65b8c", "adunit-a81ce749412b57ba", "adunit-412b4699da660c5e"],
        front_custom_full_ids: ["adunit-7d2be31698ba21c4", "adunit-0bfd7d786421b59f"],
        front_custom_side_ids: ["adunit-f98352b50e4d53c0", "adunit-2f1519c696194e56"],
        front_custom_single_ids: ["adunit-1c165420251e76a5", "adunit-3f96ec60aa879c60"],
        front_settle_custom_full_ids: ["adunit-aef326855dda8ef0", "adunit-1b21c3a0ecebfead"],
        front_level_custom_single_ids: [],
        front_on_hide_interstitial_switch: true,
        is_allow_report_switch: true,
        front_channel_model_switch: false,
        front_settle_page_interstitial_switch: true,
        front_settle_full_screen_custome_ad_switch: false,
        front_settle_guide_video_stage: ["1", "3", "4", "6", "7"],
        front_resurrection_banner_switch: true,
        front_menu_show_custom_type: 0,
        front_new_user_prop_num: ["1", "1", "1"],
        front_home_custom_ad_switch: true,
        front_enable_newbie_pack: true,
        front_new_user_gift_package_level: 3,
        front_popular_mcustom_rtime: 30,
        front_remen_banner_switch: false,
        popular_page_banner_flash_interval: .5,
        popular_banner_show_count: 3,
        popular_page_continue_game_button_clicks: 1,
        front_enable_accidental_touch_mode: true,
        front_show_fullscreen_ad_on_hotpage: true,
        game_start_popup_hotpage_switch: true,
        show_hot_page_before_settlement_switch: true,
        show_hotpage_on_enter_level_switch: true,
        front_popup_hotpage_startinglevel: 1,
        front_back_home_show_hotpage_switch: true,
        front_box_switch: true,
        front_box_exclude_levels: [3],
        front_gift_skill_start_level: 3,
        front_enter_level_gift_skill_switch: true,
        front_score_to_pass_level: 500,
        front_enable_every_day_reward_switch: true,
        front_login_reward_num: 1,
        front_new_user_gold_coin_num: 1,
        front_game_over_gold_switch: false,
        front_game_hotpage_startinglevel: 1,
        front_banner_refresh_time: 5,
        front_banner_auto_rotate_switch: true,
        front_disable_box_stage: [],
        front_box_close_button_delay_time: 1.5,
        front_moregame_switch: true,
        front_back_home_interstitial_switch: true,
        direct_enter_level_on_game_start_switch: false,
        front_100_gold_to_power: 1,
        front_force_video_min: 1,
        front_force_video_level: 2,
        front_force_video_switch: true,
        front_interstitial_show_interval_seconds: 30,
        front_prop_page_custom_swtich: true,
        front_prop_page_banner_switch: true,
        front_settle_banner_switch: true,
        front_disable_interstitial_stage: ["1"],
        front_enter_the_stage_interstitial_switch: true,
        front_level_show_banenr_switch: false,
        front_level_show_custom_switch: true,
        front_stage_gold_num: 10,
        front_level_power_num: 1,
        front_power_init_num: 5,
        front_countdown_power_video_num: 2,
        front_countdown_power_min_limit: 4,
        front_is_enable_countdown_gift_power: true,
        front_is_enable_level_power: true,
        front_box_close_btn_switch: false,
        front_home_ad_intensify_switch: false,
        front_over_ad_level_rate_switch: true,
        front_over_ad_level_rate: 5,
        front_top_banner_ids: [],
        front_banenr_video_switch: true,
        front_home_video_switch: false,
        front_show_guides_switch: false,
        front_coundown_gift_power_num: 2,
        front_enable_time_countDown: 300,
        front_subscribe_switch: false,
        front_new_version_notify_switch: false,
        front_subscribe_tempids: ["xx", "xxx"],
        front_pure_mode_switch: true
      }
    }]]);
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
        t.operate_configs = t.client_configs.get(cc.sys.WECHAT_GAME);
        return e("");
      }
      if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
        t.operate_configs = t.client_configs.get(cc.sys.WECHAT_GAME);
        console.warn("LYSDK：非微信平台启用离线默认配置，跳过服务端配置拉取");
        return e("");
      }
      t.operate_configs = t.client_configs.get(cc.sys.platform);
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
      this.operate_configs.configs.front_top_banner_ids = [this.operate_configs.configs.front_banner_ids.pop()];
    }
  };
  _ctor.prototype.convertVersion = function (t) {
    var e = t.split(".").join("");
    return parseInt(e, 10);
  };
  _ctor.prototype.checkVersion = function () {
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
    this.operate_configs.configs[t] = e;
  };
  _ctor.prototype.getConfigValByKeyName = function (t, e) {
    if (this.operate_configs.configs.hasOwnProperty(t)) {
      return this.operate_configs.configs[t];
    } else {
      return e || null;
    }
  };
  _ctor.prototype.getConfigAttrValByName = function (t, e) {
    if (this.operate_configs.hasOwnProperty(t)) {
      return this.operate_configs[t];
    } else {
      return e || null;
    }
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_LYsdkConfig;