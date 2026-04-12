var r;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_JellyTween = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.frequency = 4;
    t.decay = 2;
    t.pressScale = .2;
    t.totalTime = 1;
    t.interval = 1;
    t.playOnLoad = false;
    t.originalScale = 1;
    t.tween = null;
    return t;
  }
  cc__extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    this.originalScale = this.node.scale;
    this.playOnLoad && this.play();
  };
  _ctor.prototype.onDisable = function () {
    this.stop();
  };
  _ctor.prototype.play = function (e) {
    var t = this;
    var n = null != e && e > 0 ? e : 1e9;
    var o = .2 * this.totalTime;
    var r = .15 * this.totalTime;
    var i = .65 * this.totalTime;
    var c = this.pressScale / r;
    this.tween = cc.tween(this.node).repeat(n, cc.tween().to(o, {
      scaleX: this.originalScale + this.pressScale,
      scaleY: this.originalScale - this.pressScale
    }, {
      easing: "sineOut"
    }).to(r, {
      scaleX: this.originalScale,
      scaleY: this.originalScale
    }).to(i, {
      scaleX: {
        value: this.originalScale,
        progress: function (e, n, o, r) {
          return n - t.getDifference(c, r);
        }
      },
      scaleY: {
        value: this.originalScale,
        progress: function (e, n, o, r) {
          return n + t.getDifference(c, r);
        }
      }
    }).delay(this.interval)).start();
  };
  _ctor.prototype.stop = function () {
    this.tween && this.tween.stop();
    this.node.setScale(this.originalScale);
  };
  _ctor.prototype.getDifference = function (e, t) {
    var n = this.frequency * Math.PI * 2;
    return e * (Math.sin(t * n) / Math.exp(this.decay * t) / n);
  };
  cc__decorate([ccp_property(cc.Integer)], _ctor.prototype, "frequency", undefined);
  cc__decorate([ccp_property(cc.Integer)], _ctor.prototype, "decay", undefined);
  cc__decorate([ccp_property(cc.Integer)], _ctor.prototype, "pressScale", undefined);
  cc__decorate([ccp_property(cc.Integer)], _ctor.prototype, "totalTime", undefined);
  cc__decorate([ccp_property(cc.Integer)], _ctor.prototype, "interval", undefined);
  cc__decorate([ccp_property(cc.Integer)], _ctor.prototype, "playOnLoad", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_JellyTween;