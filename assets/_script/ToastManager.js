Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_ToastManager = function () {
  function _ctor() {}
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
  _ctor.prototype.show = function (t, e) {
    undefined === t && (t = "");
    var n = undefined === e ? {} : e;
    var o = n.gravity;
    var i = undefined === o ? "CENTER" : o;
    var a = n.duration;
    var r = undefined === a ? 1 : a;
    var s = n.bg_color;
    var c = undefined === s ? cc.color(102, 102, 102, 200) : s;
    var u = cc.director.getScene().getComponentInChildren(cc.Canvas);
    var l = u.node.width;
    var f = u.node.height;
    var d = new cc.Node();
    d.group = "ui";
    var h = new cc.Node();
    var p = h.addComponent(cc.Label);
    p.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
    p.verticalAlign = cc.Label.VerticalAlign.CENTER;
    p.fontSize = 30;
    p.string = t;
    if (t.length * p.fontSize > 3 * l / 5) {
      h.width = 3 * l / 5;
      p.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
    } else {
      h.width = t.length * p.fontSize;
    }
    var _ = 1 + ~~(t.length * p.fontSize / (3 * l / 5));
    h.height = p.fontSize * _;
    var g = d.addComponent(cc.Graphics);
    g.arc(-h.width / 2, 0, h.height / 2 + 20, .5 * Math.PI, 1.5 * Math.PI, true);
    g.lineTo(h.width / 2, -(h.height / 2 + 20));
    g.arc(h.width / 2, 0, h.height / 2 + 20, 1.5 * Math.PI, .5 * Math.PI, true);
    g.lineTo(-h.width / 2, h.height / 2 + 20);
    g.fillColor = c;
    g.fill();
    d.addChild(h);
    if ("CENTER" === i) {
      d.y = 0;
      d.x = 0;
    } else if ("TOP" === i) {
      d.y = d.y + f / 5 * 2;
    } else {
      "BOTTOM" === i && (d.y = d.y - f / 5 * 2);
    }
    u.node.addChild(d);
    var y = cc.callFunc(function () {
      d.destroy();
    });
    var m = cc.sequence(cc.moveBy(r, cc.v2(0, 100)), cc.fadeOut(.3), y);
    cc.tween(d).then(m).start();
    console.log("showTip", t);
  };
  _ctor._instance = null;
  return _ctor;
}();
exports.default = def_ToastManager;