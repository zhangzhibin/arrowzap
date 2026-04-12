var o;
var cc__extends = __extends;
var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_MadeLevel = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.list = null;
    e.maxNode = null;
    e.inputWidth = null;
    e.inputHeight = null;
    e.curWidth = 32;
    e.curHeight = 44;
    e.isCreateOver = false;
    e.curIdxList = [];
    e.curColor = null;
    e.levelConfig = [];
    e.curIdx = 0;
    e.curType = 1;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onEnable = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  };
  _ctor.prototype.onTouchStart = function (t) {
    if (this.isCreateOver) {
      if (!this.curColor) {
        this.levelConfig[this.curIdx] = [], this.curColor = this.randomColor();
      }
      this.checkTouchArea(t.getLocation());
    }
  };
  _ctor.prototype.onTouchMove = function (t) {
    this.isCreateOver && this.checkTouchArea(t.getLocation());
  };
  _ctor.prototype.checkTouchArea = function (t) {
    t.x -= $9GameManager$$1.default.instance.pointWidth / 2;
    if (1 == this.curType) {
      for (var e = 0; e < this.curIdxList.length; e++) {
        var n = this.curIdxList[e];
        if ((i = this.list.children[n]).getBoundingBoxToWorld().contains(cc.v2(t.x, t.y)) && -1 == this.levelConfig[this.curIdx].indexOf(n)) {
          this.levelConfig[this.curIdx].push(n);
          i.getComponent(cc.Sprite).enabled = true;
          i.color = this.curColor;
          -1 != (o = this.curIdxList.indexOf(n)) && this.curIdxList.splice(o, 1);
        }
      }
    } else {
      for (e = 0; e < this.levelConfig[this.curIdx].length; e++) {
        var i;
        var o;
        n = this.levelConfig[this.curIdx][e];
        if ((i = this.list.children[n]).getBoundingBoxToWorld().contains(cc.v2(t.x, t.y))) {
          this.levelConfig[this.curIdx].splice(e, 1);
          i.getComponent(cc.Sprite).enabled = false;
          i.color = cc.Color.WHITE;
          -1 == (o = this.curIdxList.indexOf(n)) && this.curIdxList.push(n);
          this.curIdxList = this.curIdxList.sort(function (t, e) {
            return t - e;
          });
        }
      }
    }
  };
  _ctor.prototype.initForm = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      var t;
      var e;
      var n;
      var i;
      var o = this;
      return cc__generator(this, function (r) {
        switch (r.label) {
          case 0:
            this.isCreateOver = false;
            this.curIdxList = [];
            this.curColor = null;
            this.levelConfig = [];
            this.curIdx = 0;
            t = this.curWidth * this.curHeight;
            return [4, $9AppMain.default.PoolManager.createPrefab("CreatePoint", $9Enum.BUNDLE_NAME.SUBGMAE)];
          case 1:
            (e = r.sent()).width = $9GameManager$$1.default.instance.pointWidth;
            e.height = $9GameManager$$1.default.instance.pointWidth;
            this.list.removeAllChildren();
            n = function (n) {
              setTimeout(function () {
                var i = cc.instantiate(e);
                i.parent = o.list;
                i.name = n.toString();
                var r = n % o.curWidth;
                var a = Math.floor(n / o.curWidth);
                var c = $9GameManager$$1.default.instance.pointWidth;
                var s = -o.curWidth / 2 * c + r * c + c / 2;
                var l = o.curHeight / 2 * c - a * c - c / 2;
                i.setPosition(s, l);
                n == t - 1 && (o.isCreateOver = true);
                o.curIdxList.push(n);
              }, 1 * n);
            };
            for (i = 0; i < t; i++) {
              n(i);
            }
            return [2];
        }
      });
    });
  };
  _ctor.prototype.randomColor = function () {
    var t = Math.floor(256 * Math.random());
    var e = Math.floor(256 * Math.random());
    var n = Math.floor(256 * Math.random());
    return new cc.Color(t, e, n, 255);
  };
  _ctor.prototype.btnNext = function () {
    this.curColor = null;
    this.levelConfig[this.curIdx] && this.levelConfig[this.curIdx].length && (this.curIdx += 1);
  };
  _ctor.prototype.btnAddSub = function (t) {
    var e = t.target.children[0].children[0].getComponent(cc.Label);
    this.curType = 1 == this.curType ? 0 : 1;
    e.string = 1 == this.curType ? "加" : "减";
  };
  _ctor.prototype.btnSave = function () {
    console.log("宽度:", this.curWidth);
    console.log("高度:", this.curHeight);
    console.log(JSON.stringify(this.levelConfig));
  };
  _ctor.prototype.btnCreate = function () {
    this.curWidth = Number(this.inputWidth.string) ? Number(this.inputWidth.string) : 32;
    this.curHeight = Number(this.inputHeight.string) ? Number(this.inputHeight.string) : 44;
    this.initForm();
  };
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "list", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "maxNode", undefined);
  cc__decorate([ccp_property(cc.EditBox)], _ctor.prototype, "inputWidth", undefined);
  cc__decorate([ccp_property(cc.EditBox)], _ctor.prototype, "inputHeight", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_MadeLevel;