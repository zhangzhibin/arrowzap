var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var a;
var $9LYsdkManager = require("LYsdkManager");
var $9LYadMethodNameEnum = require("LYadMethodNameEnum");
var $9Enum = require("Enum");
var def_AudioManager = function () {
  function _ctor() {
    this.audioSource = null;
    this.LocalCachKey = "FDC_SETTING";
    this.soundMap = new Map();
    this.curBgmName = "";
    this._data = {};
  }
  _ctor.getInstance = function () {
    if (null === this._instance) {
      this._instance = new this();
      this._instance.init();
      this._instance.initData();
    }
    return this._instance;
  };
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      return this.getInstance();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.init = function () {
    this.audioSource = new cc.AudioSource();
    this.audioSource.loop = true;
    this.audioSource.volume = .3;
  };
  _ctor.prototype.playMusic = function (t) {
    undefined === t && (t = $9Enum.ENUM_AUDIO_CLIP.BGM);
    return cc__awaiter(this, undefined, undefined, function () {
      var e = this;
      return cc__generator(this, function () {
        if (0 === this._data.music) {
          return [2];
        } else {
          if (this.audioSource.clip && t == this.curBgmName) {
            return this.audioSource.play(), [2];
          } else {
            return [2, new Promise(function (n, o) {
              cc.assetManager.getBundle($9Enum.BUNDLE_NAME.LYFRAME).load(t, cc.AudioClip, function (n, i) {
                if (n) {
                  console.warn("音频加载失败：");
                  return void o(null);
                }
                e.curBgmName = t;
                e.audioSource.clip = i;
                e.audioSource.play();
              });
            })];
          }
        }
      });
    });
  };
  _ctor.prototype.offMusic = function () {
    this.saveData(a.music, 0);
    this.stopMusic();
  };
  _ctor.prototype.onMusic = function () {
    this.saveData(a.music, 1);
    this.playMusic();
  };
  _ctor.prototype.offSound = function () {
    cc.audioEngine.stopAllEffects();
    this.saveData(a.sound, 0);
  };
  _ctor.prototype.onSound = function () {
    this.saveData(a.sound, 1);
  };
  _ctor.prototype.offVibrate = function () {
    this.saveData(a.vibrate, 0);
  };
  _ctor.prototype.onVibrate = function () {
    this.saveData(a.vibrate, 1);
  };
  _ctor.prototype.stopMusic = function () {
    this.audioSource.stop();
  };
  _ctor.prototype.playClickSound = function () {
    this.playSound($9Enum.ENUM_AUDIO_CLIP.CLICK, false, $9Enum.BUNDLE_NAME.LYFRAME);
    this.vibrateShort();
  };
  _ctor.prototype.playSound = function (t, e, n) {
    undefined === e && (e = false);
    undefined === n && (n = $9Enum.BUNDLE_NAME.DEF);
    return cc__awaiter(this, undefined, undefined, function () {
      var o = this;
      return cc__generator(this, function () {
        if (0 === this._data.sound) {
          return [2];
        } else {
          return [2, new Promise(function (i, a) {
            var r = o.soundMap.get(t);
            if (r) {
              var s = cc.audioEngine.playEffect(r, e);
              i(s);
            } else if (cc.assetManager.getBundle(n)) {
              cc.assetManager.getBundle(n).load(t, cc.AudioClip, function (n, r) {
                if (n) {
                  console.warn("音频加载失败：" + t);
                  return void a(null);
                }
                o.soundMap.set(t, r);
                var s = cc.audioEngine.playEffect(r, e);
                i(s);
              });
            } else {
              console.warn("音频加载失败：bnudle未加载");
              a(null);
            }
          })];
        }
      });
    });
  };
  _ctor.prototype.stopSound = function (t) {
    cc.audioEngine.stopEffect(t);
  };
  _ctor.prototype.initData = function () {
    this._data = localStorage.getItem(this.LocalCachKey);
    if (this._data) {
      this._data = JSON.parse(this._data);
    } else {
      this._data = {
        sound: 1,
        music: 1,
        vibrate: 1
      };
      localStorage.setItem(this.LocalCachKey, JSON.stringify(this._data));
    }
  };
  _ctor.prototype.saveData = function (t, e) {
    if (undefined !== this._data[t]) {
      this._data[t] = e;
      localStorage.setItem(this.LocalCachKey, JSON.stringify(this._data));
    }
  };
  Object.defineProperty(_ctor.prototype, "soundOff", {
    get: function () {
      return this._data.sound;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "musicOff", {
    get: function () {
      return this._data.music;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "vibrateOff", {
    get: function () {
      return this._data.vibrate;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.vibrateShort = function () {
    0 !== this.vibrateOff && $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.VIBRATE_SHORT);
  };
  _ctor.prototype.vibrateLong = function () {
    0 !== this.vibrateOff && window.wx && window.wx.vibrateLong({
      success: function () {},
      fail: function () {}
    });
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_AudioManager;
(function (t) {
  t.sound = "sound";
  t.music = "music";
  t.vibrate = "vibrate";
})(a || (a = {}));