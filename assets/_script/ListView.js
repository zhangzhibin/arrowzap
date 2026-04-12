var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartAxisType = exports.ListType = undefined;
var s;
var c;
var $9ItemRender = require("ItemRender");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
(function (t) {
  t[t.Horizontal = 1] = "Horizontal";
  t[t.Vertical = 2] = "Vertical";
  t[t.Grid = 3] = "Grid";
})(s = exports.ListType || (exports.ListType = {}));
(function (t) {
  t[t.Horizontal = 1] = "Horizontal";
  t[t.Vertical = 2] = "Vertical";
})(c = exports.StartAxisType || (exports.StartAxisType = {}));
var def_ListView = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.itemRender = null;
    e.type = s.Vertical;
    e.startAxis = c.Horizontal;
    e.spaceX = 0;
    e.spaceY = 0;
    e.padding_top = 0;
    e.padding_buttom = 0;
    e.padding_left = 0;
    e._padding = 0;
    e.padding_right = 0;
    e.scrollView = null;
    e.content = null;
    e.itemDataList = [];
    e.spawnCount = 0;
    e.itemList = [];
    e.itemHeight = 0;
    e.itemWidth = 0;
    e.itemPool = [];
    e.halfScrollView = 0;
    e.lastContentPosX = 0;
    e.lastContentPosY = 0;
    e.gridRow = 0;
    e.gridCol = 0;
    e.updateTimer = 0;
    e.updateInterval = .1;
    e.bScrolling = false;
    e.updateFun = function () {};
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.itemHeight = this.itemRender.height;
    this.itemWidth = this.itemRender.width;
    this.scrollView = this.node.getComponent(cc.ScrollView);
    this.content = this.scrollView.content;
    this.content.anchorX = 0;
    this.content.anchorY = 1;
    this.content.removeAllChildren();
    this.scrollView.node.on("scrolling", this.onScrolling, this);
  };
  _ctor.prototype.setData = function (t) {
    this.itemDataList = t;
    this.updateContent();
  };
  _ctor.prototype.countListParam = function () {
    var t = this.itemDataList.length;
    if (this.type == s.Vertical) {
      this.scrollView.horizontal = false;
      this.scrollView.vertical = true;
      this.content.width = this.content.parent.width;
      this.content.height = t * this.itemHeight + (t - 1) * this.spaceY + this.padding_top + this.padding_buttom;
      this.spawnCount = Math.round(this.scrollView.node.height / (this.itemHeight + this.spaceY)) + 2;
      this.halfScrollView = this.scrollView.node.height / 2 + this.itemHeight / 2 + this.spaceY;
      this.updateFun = this.updateV;
    } else if (this.type == s.Horizontal) {
      this.scrollView.horizontal = true;
      this.scrollView.vertical = false;
      this.content.width = t * this.itemWidth + (t - 1) * this.spaceX + this.padding_left + this.padding_right;
      this.content.height = this.content.parent.height;
      this.spawnCount = Math.round(this.scrollView.node.width / (this.itemWidth + this.spaceX)) + 2;
      this.halfScrollView = this.scrollView.node.width / 2 + this.itemWidth / 2 + this.spaceX;
      this.updateFun = this.udpateH;
    } else if (this.type == s.Grid) {
      if (this.startAxis == c.Vertical) {
        this.scrollView.horizontal = false, this.scrollView.vertical = true, this.content.width = this.content.parent.width, this.padding_left + this.padding_right + this.itemWidth + this.spaceX > this.content.width && (this.padding_left = 0, this.padding_right = 0, console.error("padding_left或padding_right过大")), this.gridCol = Math.floor((this.content.width - this.padding_left - this.padding_right) / (this.itemWidth + this.spaceX)), this.gridRow = Math.ceil(t / this.gridCol), this.content.height = this.gridRow * this.itemHeight + (this.gridRow - 1) * this.spaceY + this.padding_top + this.padding_buttom, this.spawnCount = Math.round(this.scrollView.node.height / (this.itemHeight + this.spaceY)) * this.gridCol + 2 * this.gridCol, this.halfScrollView = this.scrollView.node.height / 2 + this.itemHeight / 2 + this.spaceY, this.updateFun = this.updateGrid_V;
      } else {
        this.startAxis == c.Horizontal && (this.scrollView.horizontal = true, this.scrollView.vertical = false, this.content.height = this.content.parent.height, this.padding_top + this.padding_buttom + this.itemHeight + this.spaceY > this.content.height && (this.padding_top = 0, this.padding_buttom = 0, console.error("padding_top或padding_buttom过大")), this.gridRow = Math.floor((this.content.height - this.padding_top - this.padding_buttom) / (this.itemHeight + this.spaceY)), this.gridCol = Math.ceil(t / this.gridRow), this.content.width = this.gridCol * this.itemWidth + (this.gridCol - 1) * this.spaceX + this.padding_left + this.padding_right, this.spawnCount = Math.round(this.scrollView.node.width / (this.itemWidth + this.spaceX)) * this.gridRow + 2 * this.gridRow, this.halfScrollView = this.scrollView.node.width / 2 + this.itemWidth / 2 + this.spaceX, this.updateFun = this.updateGrid_H);
      }
    }
  };
  _ctor.prototype.createList = function (t, e) {
    if (this.itemDataList.length > this.spawnCount && t + this.spawnCount - 1 >= this.itemDataList.length) {
      t = this.itemDataList.length - this.spawnCount;
      e = this.scrollView.getMaxScrollOffset();
    } else {
      this.itemDataList.length <= this.spawnCount && (t = 0);
    }
    for (var n = 0; n < this.spawnCount; n++) {
      var o = undefined;
      if (n + t < this.itemDataList.length) {
        if (null == this.itemList[n]) {
          o = this.getItem();
          this.itemList.push(o);
          o.parent = this.content;
        } else {
          o = this.itemList[n];
        }
        var i = o.getComponent($9ItemRender.default);
        (i = i || o.addComponent($9ItemRender.default)).itemIndex = n + t;
        i.data = this.itemDataList[n + t];
        i.dataChanged();
        this.renderItem(o, n + t, this.itemDataList[n + t]);
        if (this.type == s.Vertical) {
          o.setPosition(this.content.width / 2, -o.height * (.5 + n + t) - this.spaceY * (n + t) - this.padding_top);
        } else if (this.type == s.Horizontal) {
          o.setPosition(o.width * (.5 + n + t) + this.spaceX * (n + t) + this.padding_left, -this.content.height / 2);
        } else if (this.type == s.Grid) {
          if (this.startAxis == c.Vertical) {
            var a = Math.floor((n + t) / this.gridCol);
            var r = (n + t) % this.gridCol;
            o.setPosition(o.width * (.5 + r) + this.spaceX * r + this.padding_left, -o.height * (.5 + a) - this.spaceY * a - this.padding_top);
            o.opacity = 255;
          } else if (this.startAxis == c.Horizontal) {
            a = (n + t) % this.gridRow;
            r = Math.floor((n + t) / this.gridRow);
            o.setPosition(o.width * (.5 + r) + this.spaceX * r + this.padding_left, -o.height * (.5 + a) - this.spaceY * a - this.padding_top);
            o.opacity = 255;
          }
        }
      } else if (this.itemList.length > this.itemDataList.length - t) {
        (o = this.itemList.pop()).removeFromParent();
        this.itemPool.push(o);
      }
    }
    this.scrollView.scrollToOffset(e);
  };
  _ctor.prototype.getItem = function () {
    if (0 == this.itemPool.length) {
      return cc.instantiate(this.itemRender);
    } else {
      return this.itemPool.pop();
    }
  };
  _ctor.prototype.update = function () {
    if (0 != this.bScrolling) {
      this.updateTimer = 0;
      this.bScrolling = false;
      this.updateFun();
    }
  };
  _ctor.prototype.onScrolling = function () {
    this.bScrolling = true;
  };
  _ctor.prototype.updateV = function () {
    var t;
    var e = this.itemList;
    var n = this.halfScrollView;
    var o = this.scrollView.content.y > this.lastContentPosY;
    var i = (this.itemHeight + this.spaceY) * e.length;
    for (var a = 0; a < e.length; a++) {
      t = e[a];
      var r = this.getPositionInView(t);
      if (o) {
        if (r.y > n && t.y - i - this.padding_buttom > -this.content.height) {
          var s = (c = t.getComponent($9ItemRender.default)).itemIndex + e.length;
          c.itemIndex = s;
          c.data = this.itemDataList[s];
          c.dataChanged();
          this.renderItem(t, s, this.itemDataList[s]);
          t.y = t.y - i;
        }
      } else if (r.y < -n && t.y + i + this.padding_top < 0) {
        var c;
        s = (c = t.getComponent($9ItemRender.default)).itemIndex - e.length;
        c.itemIndex = s;
        c.data = this.itemDataList[s];
        c.dataChanged();
        this.renderItem(t, s, this.itemDataList[s]);
        t.y = t.y + i;
      }
    }
    this.lastContentPosY = this.scrollView.content.y;
  };
  _ctor.prototype.udpateH = function () {
    var t;
    var e = this.itemList;
    var n = this.halfScrollView;
    var o = this.scrollView.content.x > this.lastContentPosX;
    var i = (this.itemWidth + this.spaceX) * e.length;
    for (var a = 0; a < e.length; a++) {
      t = e[a];
      var r = this.getPositionInView(t);
      if (o) {
        if (r.x > n && t.x - i - this.padding_left > 0) {
          var s = (c = t.getComponent($9ItemRender.default)).itemIndex - e.length;
          c.itemIndex = s;
          c.data = this.itemDataList[s];
          c.dataChanged();
          t.x = t.x - i;
          this.renderItem(t, s, this.itemDataList[s]);
        }
      } else if (r.x < -n && t.x + i + this.padding_right < this.content.width) {
        var c;
        s = (c = t.getComponent($9ItemRender.default)).itemIndex + e.length;
        c.itemIndex = s;
        c.data = this.itemDataList[s];
        c.dataChanged();
        t.x = t.x + i;
        this.renderItem(t, s, this.itemDataList[s]);
      }
    }
    this.lastContentPosX = this.scrollView.content.x;
  };
  _ctor.prototype.updateGrid_V = function () {
    var t;
    var e = this.itemList;
    var n = this.halfScrollView;
    var o = this.scrollView.content.y > this.lastContentPosY;
    var i = (this.itemHeight + this.spaceY) * (this.spawnCount / this.gridCol);
    for (var a = 0; a < e.length; a++) {
      t = e[a];
      var r = this.getPositionInView(t);
      if (o) {
        if (r.y > n && t.y - i - this.padding_buttom > -this.content.height) {
          var s = (c = t.getComponent($9ItemRender.default)).itemIndex + this.spawnCount / this.gridCol * this.gridCol;
          if (null != this.itemDataList[s]) {
            t.y = t.y - i;
            c.itemIndex = s;
            c.data = this.itemDataList[s];
            c.dataChanged();
            t.opacity = 255;
            this.renderItem(t, s, this.itemDataList[s]);
          } else {
            t.y = t.y - i;
            c.itemIndex = s;
            t.opacity = 0;
          }
        }
      } else if (r.y < -n && t.y + i + this.padding_top < 0) {
        var c;
        s = (c = t.getComponent($9ItemRender.default)).itemIndex - this.spawnCount / this.gridCol * this.gridCol;
        if (null != this.itemDataList[s]) {
          t.y = t.y + i;
          c.itemIndex = s;
          c.data = this.itemDataList[s];
          c.dataChanged();
          t.opacity = 255;
          this.renderItem(t, s, this.itemDataList[s]);
        } else {
          t.y = t.y + i;
          c.itemIndex = s;
          t.opacity = 0;
        }
      }
    }
    this.lastContentPosY = this.scrollView.content.y;
  };
  _ctor.prototype.updateGrid_H = function () {
    var t;
    var e = this.itemList;
    var n = this.halfScrollView;
    var o = this.scrollView.content.x > this.lastContentPosX;
    var i = (this.itemWidth + this.spaceX) * (this.spawnCount / this.gridRow);
    for (var a = 0; a < e.length; a++) {
      t = e[a];
      var r = this.getPositionInView(t);
      if (o) {
        if (r.x > n && t.x - i - this.padding_left > 0) {
          var s = (c = t.getComponent($9ItemRender.default)).itemIndex - this.spawnCount / this.gridRow * this.gridRow;
          if (null != this.itemDataList[s]) {
            t.x = t.x - i;
            c.itemIndex = s;
            c.data = this.itemDataList[s];
            c.dataChanged();
            t.opacity = 255;
            this.renderItem(t, s, this.itemDataList[s]);
          } else {
            t.x = t.x - i;
            c.itemIndex = s;
            t.opacity = 0;
          }
        }
      } else if (r.x < -n && t.x + i + this.padding_right < this.content.width) {
        var c;
        s = (c = t.getComponent($9ItemRender.default)).itemIndex + this.spawnCount / this.gridRow * this.gridRow;
        if (null != this.itemDataList[s]) {
          t.x = t.x + i;
          c.itemIndex = s;
          c.data = this.itemDataList[s];
          c.dataChanged();
          t.opacity = 255;
          this.renderItem(t, s, this.itemDataList[s]);
        } else {
          t.x = t.x + i;
          c.itemIndex = s;
          t.opacity = 0;
        }
      }
    }
    this.lastContentPosX = this.scrollView.content.x;
  };
  _ctor.prototype.getPositionInView = function (t) {
    var e = t.parent.convertToWorldSpaceAR(t.position);
    return this.scrollView.node.convertToNodeSpaceAR(e);
  };
  _ctor.prototype.getListData = function () {
    return this.itemDataList;
  };
  _ctor.prototype.addItem = function (t) {
    this.itemDataList.push(t);
    this.updateContent();
  };
  _ctor.prototype.addItemAt = function (t, e) {
    if (!(null == this.itemDataList[t] && this.itemDataList.length != t)) {
      this.itemDataList.splice(t, 1, e);
      this.updateContent();
    }
  };
  _ctor.prototype.deleteItem = function (t) {
    if (null != this.itemDataList[t]) {
      this.itemDataList.splice(t, 1);
      this.updateContent();
    }
  };
  _ctor.prototype.changeItem = function (t, e) {
    if (null != this.itemDataList[t]) {
      this.itemDataList[t] = e;
      this.updateContent();
    }
  };
  _ctor.prototype.refresh = function () {
    for (var t in this.itemDataList) {
      this.changeItem(parseInt(t), this.itemDataList[t]);
    }
  };
  _ctor.prototype.scrollToTop = function (t) {
    undefined === t && (t = 0);
    this.bScrolling = false;
    this.scrollView.stopAutoScroll();
    this.scrollView.scrollTo(cc.v2(0, 1), .1);
  };
  _ctor.prototype.updateContent = function () {
    if (0 == this.itemList.length) {
      this.countListParam();
      this.createList(0, new cc.Vec2(0, 0));
    } else {
      if (this.type == s.Vertical) {
        this.itemList.sort(function (t, e) {
          return e.y - t.y;
        });
      } else if (this.type == s.Horizontal) {
        this.itemList.sort(function (t, e) {
          return t.x - e.x;
        });
      } else if (this.type == s.Grid) {
        if (this.startAxis == c.Vertical) {
          this.itemList.sort(function (t, e) {
            return t.x - e.x;
          }), this.itemList.sort(function (t, e) {
            return e.y - t.y;
          });
        } else {
          this.startAxis == c.Horizontal && (this.itemList.sort(function (t, e) {
            return e.y - t.y;
          }), this.itemList.sort(function (t, e) {
            return t.x - e.x;
          }));
        }
      }
      this.countListParam();
      var t = this.itemList[0].getComponent($9ItemRender.default).itemIndex;
      if (this.type == s.Grid && this.startAxis == c.Vertical) {
        t += (t + this.spawnCount) % this.gridCol;
      } else {
        this.type == s.Grid && this.startAxis == c.Horizontal && (t += (t + this.spawnCount) % this.gridRow);
      }
      var e = this.scrollView.getScrollOffset();
      e.x = -e.x;
      this.createList(t, e);
    }
  };
  _ctor.prototype.renderItem = function () {};
  _ctor.prototype.onDestroy = function () {
    var t = this.itemList.length;
    for (var e = 0; e < t; e++) {
      cc.isValid(this.itemList[e], true) && this.itemList[e].destroy();
    }
    this.itemList.length = 0;
    t = this.itemPool.length;
    for (e = 0; e < t; e++) {
      cc.isValid(this.itemPool[e], true) && this.itemPool[e].destroy();
    }
    this.itemPool.length = 0;
    this.itemDataList.length = 0;
  };
  cc__decorate([ccp_property({
    type: cc.Node,
    tooltip: "列表项"
  })], _ctor.prototype, "itemRender", undefined);
  cc__decorate([ccp_property({
    type: cc.Enum(s),
    tooltip: "排列方式"
  })], _ctor.prototype, "type", undefined);
  cc__decorate([ccp_property({
    type: cc.Enum(c),
    tooltip: "网格布局中的方向",
    visible: function () {
      return this.type == s.Grid;
    }
  })], _ctor.prototype, "startAxis", undefined);
  cc__decorate([ccp_property({
    type: cc.Integer,
    tooltip: "列表项X间隔",
    visible: function () {
      return this.type == s.Horizontal || this.type == s.Grid;
    }
  })], _ctor.prototype, "spaceX", undefined);
  cc__decorate([ccp_property({
    type: cc.Integer,
    tooltip: "列表项Y间隔",
    visible: function () {
      return this.type == s.Vertical || this.type == s.Grid;
    }
  })], _ctor.prototype, "spaceY", undefined);
  cc__decorate([ccp_property({
    type: cc.Integer,
    tooltip: "上间距",
    visible: function () {
      return this.type == s.Vertical || this.type == s.Grid;
    }
  })], _ctor.prototype, "padding_top", undefined);
  cc__decorate([ccp_property({
    type: cc.Integer,
    tooltip: "下间距",
    visible: function () {
      return this.type == s.Vertical || this.type == s.Grid;
    }
  })], _ctor.prototype, "padding_buttom", undefined);
  cc__decorate([ccp_property({
    type: cc.Integer,
    tooltip: "左间距",
    visible: function () {
      return this.type == s.Horizontal || this.type == s.Grid;
    }
  })], _ctor.prototype, "padding_left", undefined);
  cc__decorate([ccp_property(cc.Integer)], _ctor.prototype, "_padding", undefined);
  cc__decorate([ccp_property({
    type: cc.Integer,
    tooltip: "右间距",
    visible: function () {
      return this.type == s.Horizontal || this.type == s.Grid;
    }
  })], _ctor.prototype, "padding_right", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_ListView;