Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9LYsdkConfig = require("LYsdkConfig");
var $9Enum = require("Enum");
var def_DataManager = function () {
  function _ctor() {
    this.saveKey = "CCG_Local";
    this._isMusicOn = true;
    this._isSoundOn = true;
    this._isVibrateOn = false;
    this.gameLevel = 1;
    this.maxGameLevel = 10;
    this.maxHeart = 5;
    this.heartRefreshTime = 0;
    this.status = $9Enum.ENUM_GAME_STATUS.UNRUNING;
    this._data = {
      currDay: new Date(),
      isNewUser: true,
      level: 1,
      isInitData: false
    };
  }
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      if (!this._instance) {
        this._instance = new _ctor();
        this._instance.initData();
      }
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.reset = function () {
    this.status = $9Enum.ENUM_GAME_STATUS.UNRUNING;
  };
  _ctor.prototype.restore = function () {
    this.initData();
  };
  Object.defineProperty(_ctor.prototype, "isMusicOn", {
    get: function () {
      return this._isMusicOn;
    },
    set: function (t) {
      this._isMusicOn = t;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "isSoundOn", {
    get: function () {
      return this._isSoundOn;
    },
    set: function (t) {
      this._isSoundOn = t;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "isVibrateOn", {
    get: function () {
      return this._isVibrateOn;
    },
    set: function (t) {
      this._isVibrateOn = t;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.initConfigData = function () {
    if (!this._data.isInitData) {
      this._data.isInitData = true;
      this.saveData();
    }
    this.heartRefreshTime = Number($9LYsdkConfig.default.instance.getConfigValByKeyName("front_enable_time_countDown", 300));
    this.maxHeart = Number($9LYsdkConfig.default.instance.getConfigValByKeyName("front_countdown_power_min_limit", 4));
  };
  _ctor.prototype.initData = function () {
    var t = localStorage.getItem(this.saveKey);
    if (t) {
      this._data = JSON.parse(t);
    } else {
      localStorage.setItem(this.saveKey, JSON.stringify(this._data));
    }
  };
  _ctor.prototype.saveData = function () {
    localStorage.setItem(this.saveKey, JSON.stringify(this._data));
  };
  _ctor.prototype.isToday = function (t) {
    var e;
    var n = new Date();
    if ("string" == typeof t) {
      e = new Date(t);
    } else if ("number" == typeof t) {
      e = new Date(t);
    } else {
      if (!(t instanceof Date)) {
        throw new Error("Invalid date format");
      }
      e = t;
    }
    return !isNaN(e.getTime()) && (n.setHours(0, 0, 0, 0), e.setHours(0, 0, 0, 0), n.getTime() === e.getTime());
  };
  Object.defineProperty(_ctor.prototype, "userData", {
    get: function () {
      return this._data;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "level", {
    get: function () {
      return this._data.level;
    },
    set: function (t) {
      this._data.level = t;
      this.saveData();
    },
    enumerable: false,
    configurable: true
  });
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_DataManager;