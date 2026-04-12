Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POPULAR_TRIGGER_SOURCE = exports.GameStatu = exports.BUNDLE_NAME = exports.ERESOURCE_TYPE_MAIN = exports.PACK_GAME_UI_TYPE = exports.ENUM_UI_TYPE = exports.ENUM_GAMEAUDIO_CLIP = exports.ENUM_AUDIO_CLIP = exports.ENUM_GAME_STATUS = undefined;
(function (t) {
  t.UNRUNING = "unruning";
  t.RUNING = "runing";
})(exports.ENUM_GAME_STATUS || (exports.ENUM_GAME_STATUS = {}));
(function (t) {
  t.BGM = "sound/bgm";
  t.CLICK = "sound/click";
  t.WIN = "sound/win";
  t.FAIL = "sound/fail";
  t.ERROR = "sound/error";
})(exports.ENUM_AUDIO_CLIP || (exports.ENUM_AUDIO_CLIP = {}));
(function (t) {
  t.BOXREMOVE = "audio/boxremove";
  t.ELIMINATE = "audio/eliminate";
  t.PUT = "audio/put";
  t.REFRESH = "audio/refresh";
  t.REMOVE = "audio/remove";
  t.REMOVELINE = "audio/removeline";
  t.UNLOCK = "audio/unlock";
})(exports.ENUM_GAMEAUDIO_CLIP || (exports.ENUM_GAMEAUDIO_CLIP = {}));
(function (t) {
  t.HOME = "LYHomeLayer";
  t.SET = "LYSettingLayer";
  t.HOT_GAME = "LYHotGameLayer";
  t.LUCK = "LYLuckBoxLayer";
  t.LOSE = "LYLoseLayer";
  t.POWER = "LYPowerLayer";
  t.REPLAY = "LYReplayLayer";
  t.WIN = "LYWinLayer";
  t.DESK = "LYDeskLayer";
  t.AWARD = "LYAwardLayer";
})(exports.ENUM_UI_TYPE || (exports.ENUM_UI_TYPE = {}));
(function (t) {
  t.MENU = "GameMenu";
  t.LEVEL = "Level";
  t.ML = "MadeLevel";
  t.MADE = "MadeLevel";
})(exports.PACK_GAME_UI_TYPE || (exports.PACK_GAME_UI_TYPE = {}));
exports.ERESOURCE_TYPE_MAIN = [{
  content: cc.JsonAsset,
  path: "json",
  type: "json",
  ratio: .4
}, {
  content: cc.AudioClip,
  path: "sound",
  type: "audio",
  ratio: .2
}, {
  content: cc.Prefab,
  path: "prefab",
  type: "prefab",
  ratio: .2
}, {
  content: cc.SpriteFrame,
  path: "sprite",
  type: "sprite",
  ratio: .2
}];
(function (t) {
  t.DEF = "";
  t.LYFRAME = "LYFrame";
  t.SUBGMAE = "SubGame";
  t.Role = "Role";
})(exports.BUNDLE_NAME || (exports.BUNDLE_NAME = {}));
(function (t) {
  t[t.RUN = 1] = "RUN";
  t[t.STOP = 2] = "STOP";
  t[t.OVER = 3] = "OVER";
  t[t.NOTSTART = 4] = "NOTSTART";
})(exports.GameStatu || (exports.GameStatu = {}));
(function (t) {
  t[t.LOADING = 0] = "LOADING";
  t[t.GAME_START = 1] = "GAME_START";
  t[t.WIN_SETTLE_BEFORE = 2] = "WIN_SETTLE_BEFORE";
  t[t.LOSE_SETTLE_BEFORE = 3] = "LOSE_SETTLE_BEFORE";
  t[t.ENTER_LEVEL = 4] = "ENTER_LEVEL";
  t[t.RESTART_LEVEL = 5] = "RESTART_LEVEL";
  t[t.SETTLE_BACK_HOME = 6] = "SETTLE_BACK_HOME";
  t[t.SET_BACK_HOME = 7] = "SET_BACK_HOME";
  t[t.REVIVE_GAME = 8] = "REVIVE_GAME";
  t[t.NORMAL = 9] = "NORMAL";
})(exports.POPULAR_TRIGGER_SOURCE || (exports.POPULAR_TRIGGER_SOURCE = {}));