Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_BundleResCfig = function () {
  function _ctor() {
    this.BUNDLE_NAME = {
      DEF: "",
      subGameMain: "subGameMain"
    };
    this.ERESOURCE_TYPE_MAIN = [{
      content: cc.JsonAsset,
      path: "json",
      type: "json",
      ratio: .2
    }, {
      content: cc.AudioClip,
      path: "sound",
      type: "audio",
      ratio: .1
    }, {
      content: cc.Prefab,
      path: "prefab",
      type: "prefab",
      ratio: .1
    }, {
      content: cc.SpriteFrame,
      path: "sprite",
      type: "sprite",
      ratio: .1
    }];
    this.FRME_TYPE_MAIN = [{
      content: cc.Prefab,
      path: "view",
      type: "prefab",
      ratio: .1
    }, {
      content: cc.SpriteFrame,
      path: "texture",
      type: "SpriteFrame",
      ratio: .2
    }];
    this.FRME_TYPE_GAME = [{
      content: cc.Prefab,
      path: "prefab",
      type: "prefab",
      ratio: .5
    }, {
      content: cc.SpriteFrame,
      path: "texture",
      type: "SpriteFrame",
      ratio: .5
    }];
  }
  _ctor.getInstance = function () {
    null === this._instance && (this._instance = new _ctor());
    return this._instance;
  };
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      return this.getInstance();
    },
    enumerable: false,
    configurable: true
  });
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_BundleResCfig;