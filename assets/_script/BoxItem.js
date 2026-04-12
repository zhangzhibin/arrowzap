var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYEventName = require("LYEventName");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_BoxItem = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.node_spBox1 = null;
    e.node_spBox2 = null;
    e.node_spOpen = null;
    e.node_light = null;
    e.node_spReward = null;
    e.label_lbCount = null;
    e.isOpen = false;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.initBox = function () {
    this.isOpen = false;
    this.node_spBox1.active = true;
    this.node_spBox2.active = false;
    this.node_spOpen.active = false;
    this.node_light.active = false;
    this.node_spReward.active = false;
    this.label_lbCount.node.active = false;
  };
  _ctor.prototype.openBox = function (t) {
    this.isOpen = true;
    this.node_spBox1.active = false;
    this.node_spBox2.active = false;
    this.node_spOpen.active = true;
    this.node_light.active = true;
    this.node_spReward.active = true;
    this.label_lbCount.node.active = true;
    this.label_lbCount.string = "+" + t;
    var e = this.node_spReward.parent.convertToWorldSpaceAR(this.node_spReward.position);
    $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.GET_GOLD, e, 100, 5);
  };
  _ctor.prototype.updateAd = function () {
    if (!this.isOpen) {
      this.node_spBox1.active = false;
      this.node_spBox2.active = true;
    }
  };
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "node_spBox1", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "node_spBox2", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "node_spOpen", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "node_light", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "node_spReward", undefined);
  cc__decorate([ccp_property(cc.Label)], _ctor.prototype, "label_lbCount", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_BoxItem;