Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_Singleton = function () {
  function _ctor() {
    this.init();
  }
  _ctor.ins = function () {
    this._instance || (this._instance = new this());
    return this._instance;
  };
  _ctor.prototype.init = function () {};
  _ctor._instance = null;
  _ctor.ERR_SINGLETON = "该对象为单例，只能创建一个实例";
  return _ctor;
}();
exports.default = def_Singleton;