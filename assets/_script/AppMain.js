Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AudioManager = require("AudioManager");
var $9DataManager = require("DataManager");
var $9EffectManager = require("EffectManager");
var $9EventManager = require("EventManager");
var $9PoolManager = require("PoolManager");
var $9ResourceManager = require("ResourceManager");
var $9ToastManager = require("ToastManager");
var $9UIManager = require("UIManager");
var $9BundleResCfig = require("BundleResCfig");
var def_AppMain = function () {
  function _ctor() {}
  Object.defineProperty(_ctor, "UIManager", {
    get: function () {
      return $9UIManager.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "resourceManager", {
    get: function () {
      return $9ResourceManager.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "eventManager", {
    get: function () {
      return $9EventManager.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "teoastManager", {
    get: function () {
      return $9ToastManager.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "soundManager", {
    get: function () {
      return $9AudioManager.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "localData", {
    get: function () {
      return $9DataManager.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "BundleResCfig", {
    get: function () {
      return $9BundleResCfig.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "PoolManager", {
    get: function () {
      return $9PoolManager.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "EffectManager", {
    get: function () {
      return $9EffectManager.default.instance;
    },
    enumerable: false,
    configurable: true
  });
  return _ctor;
}();
exports.default = def_AppMain;