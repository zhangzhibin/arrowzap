var o;
var cc__extends = __extends;
var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("AppMain");
var $9LYEventName = require("LYEventName");
var $9GameManager$$1 = require("GameManager");
var $9Enum = require("Enum");
var $9LYsdkConfig = require("LYsdkConfig");
var $9LYUtils = require("LYUtils");
var $9Line = require("Line");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_Level = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.linePrefab = null;
    e.list = null;
    e.point = null;
    e.maxNode = null;
    e.bg_h = null;
    e.pointPrefab = null;
    e.tips = null;
    e.posList = [];
    e.levelData = [];
    e.isMove = false;
    e.dragging = false;
    e.dragOffset = cc.v2(0, 0);
    e.dragStartPos = null;
    e.moveThreshold = 15;
    e.movedDistance = 0;
    e.pinchActive = false;
    e.pinchStartDist = 0;
    e.pinchStartScale = 1;
    e.minScale = 1;
    e.maxScale = 2;
    e.isAddScore = false;
    e.pointList = [];
    e.createLineNum = 0;
    e._passCount = 0;
    e.isStart = false;
    e.startTime = false;
    e.canInteract = true;
    return e;
  }
  cc__extends(_ctor, t);
  Object.defineProperty(_ctor.prototype, "passCount", {
    get: function () {
      return this._passCount;
    },
    set: function (t) {
      this._passCount = t;
      t == this.levelData.length && this.scheduleOnce(function () {
        $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.PAUSE_TIME);
        $9LYUtils.default.instance.isOpenHotGamePage($9Enum.POPULAR_TRIGGER_SOURCE.WIN_SETTLE_BEFORE, undefined) || $9AppMain.default.UIManager.open($9Enum.ENUM_UI_TYPE.WIN, null, $9Enum.BUNDLE_NAME.LYFRAME);
      }, 1);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onEnable = function () {
    this.initLevel();
    this.addEvent("on");
  };
  _ctor.prototype.onDisable = function () {
    this.addEvent("off");
  };
  _ctor.prototype.initLevel = function () {
    var t = this;
    var e = $9GameManager$$1.default.instance.curLevelConfig;
    if (e) {
      var n = e.width * e.height;
      for (var i = 0; i < n; i++) {
        var o = i % e.width;
        var r = Math.floor(i / e.width);
        var a = $9GameManager$$1.default.instance.pointWidth;
        var c = -e.width / 2 * a + o * a + a / 2;
        var s = e.height / 2 * a - r * a - a / 2;
        this.posList.push(new cc.Vec2(c, s));
      }
      this.levelData = JSON.parse(e.levelData);
      this.canInteract = true;
      this.passCount = 0;
      this.updateBoardScale();
      var l = function (e) {
        h.scheduleOnce(function () {
          var n = t.levelData[e];
          var i = cc.instantiate(t.linePrefab);
          i.parent = t.list;
          i.name = e.toString();
          i.getComponent($9Line.default).setData(n, t.posList);
        }, .02 * e);
      };
      var h = this;
      for (i = 0; i < this.levelData.length; i++) {
        l(i);
      }
    }
  };
  _ctor.prototype.addEvent = function (t) {
    this.node[t](cc.Node.EventType.TOUCH_START, this.handleStart, this);
    this.node[t](cc.Node.EventType.TOUCH_MOVE, this.handleMove, this);
    this.node[t](cc.Node.EventType.TOUCH_END, this.handleEnd, this);
    this.node[t](cc.Node.EventType.MOUSE_WHEEL, this.handleWheel, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.UPDATE_SCALE, this.handleScale, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.ADD_SCORE, this.handleAddScore, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.ERROR_LINE, this.handleErrorLine, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.CREATE_LINE, this.handleCreateLine, this);
    $9AppMain.default.eventManager[t]($9LYEventName.LYEventName.RECOVER_GAME, this.recoverGame, this);
  };
  _ctor.prototype.handleCreateLine = function () {
    this.createLineNum++;
  };
  _ctor.prototype.handleErrorLine = function () {
    cc.Tween.stopAllByTarget(this.bg_h);
    cc.tween(this.bg_h).to(.5, {
      opacity: 255
    }).to(.5, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.handleTips = function () {
    cc.Tween.stopAllByTarget(this.tips);
    cc.tween(this.tips).to(.1, {
      opacity: 255
    }).delay(.8).to(.5, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.handleAddScore = function () {
    this.passCount += 1;
    var t = this.passCount % 7 == 0 ? 7 : this.passCount % 7;
    $9AppMain.default.soundManager.playSound("sound/" + t, false, $9Enum.BUNDLE_NAME.LYFRAME);
  };
  _ctor.prototype.handleScale = function (t) {
    this.maxNode.scale = this.minScale + t * (this.maxScale - this.minScale);
  };
  _ctor.prototype.updateBoardScale = function () {
    var t = $9GameManager$$1.default.instance.curLevelConfig;
    if (!t) return;
    var e = this.maxNode;
    if (!e) return;
    var n = $9GameManager$$1.default.instance.pointWidth;
    var i = (t.width + 2) * n;
    var o = (t.height + 2) * n;
    var r = e.parent;
    if (!r || r.width <= 0 || r.height <= 0) return;
    var a = r.width / i;
    var c = r.height / o;
    var s = Math.min(a, c);
    e.scale = s;
    this.minScale = s * 0.5;
    this.maxScale = s * 2.5;
    e.setPosition(cc.v2(0, 0));
  };
  _ctor.prototype.handleStart = function (t) {
    this.isMove = false;
    if (!this.isStart) {
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.LEVEL_START);
      this.isStart = true;
    }
    var e = t.getTouches ? t.getTouches() : [];
    if (e && e.length >= 2) {
      var n = e[0].getLocation();
      var i = e[1].getLocation();
      var o = i.x - n.x;
      var r = i.y - n.y;
      this.pinchStartDist = Math.sqrt(o * o + r * r);
      this.pinchStartScale = this.maxNode.scale;
      this.pinchActive = true;
      return void (this.dragging = false);
    }
    var a = t.getLocation();
    var c = this.maxNode.parent.convertToNodeSpaceAR(a);
    this.dragOffset = this.maxNode.position.sub(c);
    this.dragStartPos = this.maxNode.position.clone();
    this.movedDistance = 0;
    this.dragging = true;
  };
  _ctor.prototype.handleMove = function (t) {
    var e = t.getTouches ? t.getTouches() : [];
    if (e && e.length >= 2) {
      var n = e[0].getLocation();
      var i = e[1].getLocation();
      var o = i.x - n.x;
      var r = i.y - n.y;
      var a = Math.sqrt(o * o + r * r);
      if (!this.pinchActive) {
        this.pinchStartDist = a;
        this.pinchStartScale = this.maxNode.scale;
      }
      this.pinchActive = true;
      this.dragging = false;
      if (this.pinchStartDist > 0) {
        var c = cc.misc.clampf(this.pinchStartScale * (a / this.pinchStartDist), this.minScale, this.maxScale);
        this.maxNode.scale = c;
      }
      this.isMove = true;
    } else {
      this.pinchActive && (this.pinchActive = false);
      if (this.dragging) {
        var s = t.getLocation();
        var u = this.maxNode.parent;
        var d = u.convertToNodeSpaceAR(s).add(this.dragOffset);
        var p = u.width * u.scaleX / 2;
        var f = u.height * u.scaleY / 2;
        var v = this.maxNode.width * this.maxNode.scaleX / 2;
        var g = this.maxNode.height * this.maxNode.scaleY / 2;
        var m = -p + v;
        var y = p - v;
        var _ = -f + g;
        var L = f - g;
        var E = Math.min(m, y);
        var w = Math.max(m, y);
        var b = Math.min(_, L);
        var T = Math.max(_, L);
        d.x = cc.misc.clampf(d.x, E, w);
        d.y = cc.misc.clampf(d.y, b, T);
        var M = cc.v2(d.x, d.y).sub(this.dragStartPos).mag();
        this.movedDistance = M;
        if (!(M < this.moveThreshold)) {
          this.isMove = true;
          var N = this.maxNode.position;
          var C = N.add(d.sub(N).mul(.1));
          this.maxNode.setPosition(C);
        }
      }
    }
  };
  _ctor.prototype._findArrowAtPoint = function (cellX, cellY) {
    // 找到点击位置对应的单元格索引
    var n = $9GameManager$$1.default.instance.curLevelConfig.width;
    var i = $9GameManager$$1.default.instance.curLevelConfig.height;
    if (cellX < 0 || cellX >= n || cellY < 0 || cellY >= i) return -1;
    var cellIndex = cellY * n + cellX;

    // 查找哪个箭头包含这个单元格
    for (var i = 0; i < this.levelData.length; i++) {
      var lineNode = this.list.getChildByName(i.toString());
      if (!lineNode) continue;
      var lineComp = lineNode.getComponent($9Line.default);
      if (!lineComp || lineComp.isOver || lineComp.flying || lineComp.isMoveing) continue;

      // 检查这个箭头是否包含这个单元格
      if (this.levelData[i].indexOf(cellIndex) !== -1) {
        return i;
      }
    }
    return -1;
  };
  _ctor.prototype._handleArrowByIndex = function (t) {
    var e;
    var n = this.list.getChildByName(t.toString());
    if (!n) return;
    var i = n.getComponent($9Line.default);
    if (!i || i.isOver || i.flying || i.isMoveing) return;
    i.canFlyOut = this.canArrowFly(t);
    i.flying = true;
    var o = this.levelData[t];
    var r = i.dir;
    var a = this.getForwardIndices(o[0], r);
    var c = this.findFirstBlockedPointWithFlying(a, t);
    if (-1 !== c.idx) {
      var s = a.indexOf(c.idx);
      var l = a.slice(0, s + 1);
      i.handleError(l, c);
      var h = this.list.getChildByName(c.listIndex.toString());
      if (h) {
        var u = h.getComponent($9Line.default);
        if (u) u.errorLine();
      }
    } else {
      this.createPoint(i.itemList);
      i.handlePass();
    }
  };
  _ctor.prototype.handleEnd = function (t) {
    var e;
    this.pinchActive = false;
    // 拖动/缩放时，阻止事件传递到箭头，避免误触
    if (this.isMove) {
      t.stopPropagation();
      return;
    }
    if (!this.canInteract) {
      t.stopPropagation();
      return;
    }
    if (this.createLineNum < this.levelData.length) {
      this.handleTips();
      t.stopPropagation();
      return;
    }
    // Note: Power check is removed from here. It will be done when actually handling an arrow.
    if (!this.startTime) {
      this.startTime = true;
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.RESUME_TIME);
    }
    var o = t.getLocation();
    var r = this.list.parent.convertToNodeSpaceAR(o);
    var centerCell = this.pixelToCellIndex(r.x, r.y);
    var cellY = centerCell[0];
    var cellX = centerCell[1];
    var a = this.findNearbyFlyableArrow(r.x, r.y, cellX, cellY);
    if (!(a < 0)) {
      // 第一步：找到可飞出的箭头
      // 阻止事件继续传递，Level 直接处理
      t.stopPropagation();
      this._handleArrowByIndex(a);
    } else {
      // 第二步：没找到可飞出的箭头，检查是否直接点击了某个箭头
      var clickedArrowIndex = this._findArrowAtPoint(cellX, cellY);
      if (clickedArrowIndex >= 0) {
        t.stopPropagation();
        this._handleArrowByIndex(clickedArrowIndex);
      } else {
      }
    }
  };
  _ctor.prototype.createPoint = function (t) {
    return cc__awaiter(this, undefined, undefined, function () {
      var e;
      var n;
      return cc__generator(this, function () {
        for (e = 0; e < t.length; e++) {
          if (-1 == this.pointList.indexOf(t[e])) {
            this.pointList.push(t[e]);
            (n = cc.instantiate(this.pointPrefab)).parent = this.point;
            n.setPosition(this.posList[t[e]]);
          }
        }
        return [2];
      });
    });
  };
  _ctor.prototype.handleWheel = function (t) {
    if (!this.isStart) {
      $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.LEVEL_START);
      this.isStart = true;
    }
    var e = t.getScrollY();
    var n = this.maxNode.scale + (e > 0 ? .1 : -.1);
    this.maxNode.scale = cc.misc.clampf(n, this.minScale, this.maxScale);
    this.pinchActive = false;
    this.dragging = false;
  };
  _ctor.prototype.getNearestLineInfo = function (t, e) {
    var n = $9GameManager$$1.default.instance.curLevelConfig;
    if (!n) {
      return -1;
    }
    var i = JSON.parse(n.levelData);
    var o = Number.POSITIVE_INFINITY;
    var r = -1;
    for (var a = 0; a < i.length; a++) {
      var c = i[a];
      var lineNode = this.list.getChildByName(a.toString());
      if (lineNode) {
        var lineComp = lineNode.getComponent($9Line.default);
        if (lineComp && (lineComp.isOver || lineComp.flying || lineComp.isMoveing)) continue;
      }
      for (var s = 0; s < c.length - 1; s++) {
        var l = this.posList[c[s]];
        var h = this.posList[c[s + 1]];
        if (l && h) {
          var d = this.pointSegmentDistance(t, l, h);
          if (d < o) {
            o = d;
            r = a;
          }
        }
      }
    }
    if (-1 !== r && o <= e) {
      return r;
    } else {
      return -1;
    }
  };
  _ctor.prototype.pointToRectDistance = function (t, e, n, i) {
    var o = $9GameManager$$1.default.instance.pointWidth;
    var r = $9GameManager$$1.default.instance.curLevelConfig.width;
    var a = $9GameManager$$1.default.instance.curLevelConfig.height;
    var c = -r / 2 * o;
    var s = a / 2 * o;
    var l = n * o + c;
    var h = l + o;
    var u = s - i * o;
    var d = u - o;
    if (t >= l && t <= h && e >= d && e <= u) {
      return 0;
    }
    var p = Math.max(l - t, 0, t - h);
    var f = Math.max(d - e, 0, e - u);
    return Math.sqrt(p * p + f * f);
  };
  _ctor.prototype.findNearbyFlyableArrow = function (t, e, n, i) {
    var o = [];
    for (var r = -1; r <= 1; r++) {
      for (var a = -1; a <= 1; a++) {
        var c = n + a;
        var s = i + r;
        var l = $9GameManager$$1.default.instance.curLevelConfig.width;
        var h = $9GameManager$$1.default.instance.curLevelConfig.height;
        if (c < 0 || c >= l || s < 0 || s >= h) continue;
        var u = this.pointToRectDistance(t, e, c, s);
        for (var d = 0; d < this.levelData.length; d++) {
          var p = this.list.getChildByName(d.toString());
          if (!p) continue;
          var f = p.getComponent($9Line.default);
          if (!f || f.isOver || f.flying || f.isMoveing) continue;
          var v = this.levelData[d];
          var g = s * l + c;
          if (-1 !== v.indexOf(g)) {
            if (this.canArrowFly(d)) {
              o.push({idx: d, dist: u});
            }
          }
        }
      }
    }
    if (o.length === 0) return -1;
    o.sort(function (t, e) {
      return t.dist - e.dist;
    });
    return o[0].idx;
  };
  _ctor.prototype.handleArrowClickedFromLine = function (t, e) {
    // 箭头本身的点击事件回调
    if (!this.canInteract) {
      return;
    }
    if (e.isOver || e.flying || e.isMoveing) {
      return;
    }
    e.canFlyOut = this.canArrowFly(t);
    e.flying = true;
    var n = this.levelData[t];
    var i = e.dir;
    var o = this.getForwardIndices(n[0], i);
    var r = this.findFirstBlockedPointWithFlying(o, t);
    if (-1 !== r.idx) {
      var a = o.indexOf(r.idx);
      var c = o.slice(0, a + 1);
      e.handleError(c, r);
      var s = this.list.getChildByName(r.listIndex.toString());
      if (s) {
        var l = s.getComponent($9Line.default);
        if (l) l.errorLine();
      }
    } else {
      this.createPoint(e.itemList);
      e.handlePass();
    }
  };
  _ctor.prototype.pointSegmentDistance = function (t, e, n) {
    var i = e.x;
    var o = e.y;
    var r = n.x;
    var a = n.y;
    var c = t.x;
    var s = t.y;
    var l = r - i;
    var h = a - o;
    var u = c - i;
    var d = s - o;
    var p = l * l + h * h;
    if (0 === p) {
      return Math.sqrt(u * u + d * d);
    }
    var f = (l * u + h * d) / p;
    if (f < 0) {
      f = 0;
    } else {
      f > 1 && (f = 1);
    }
    var v = c - (i + f * l);
    var g = s - (o + f * h);
    return Math.sqrt(v * v + g * g);
  };
  _ctor.prototype.pixelToCellIndex = function (t, e) {
    var n = $9GameManager$$1.default.instance.curLevelConfig.width;
    var i = $9GameManager$$1.default.instance.curLevelConfig.height;
    var o = $9GameManager$$1.default.instance.pointWidth;
    var r = -n / 2 * o;
    var a = i / 2 * o;
    var c = Math.floor((t - r) / o);
    var s = Math.floor((a - e) / o);
    return [s, c];
  };
  _ctor.prototype.neighborIndex = function (t, e) {
    var n = $9GameManager$$1.default.instance.curLevelConfig.width;
    var i = $9GameManager$$1.default.instance.curLevelConfig.height;
    var o = Math.floor(t / n);
    var r = t % n;
    if (0 === e) {
      if (o > 0) {
        return t - n;
      } else {
        return -1;
      }
    } else {
      if (1 === e) {
        if (r < n - 1) {
          return t + 1;
        } else {
          return -1;
        }
      } else {
        if (2 === e) {
          if (o < i - 1) {
            return t + n;
          } else {
            return -1;
          }
        } else {
          if (3 === e && r > 0) {
            return t - 1;
          } else {
            return -1;
          }
        }
      }
    }
  };
  _ctor.prototype.getForwardIndices = function (t, e) {
    var n = [];
    if (-1 === e) {
      return n;
    }
    for (var i = t;;) {
      var o = this.neighborIndex(i, e);
      if (-1 === o) {
        break;
      }
      n.push(o);
      i = o;
    }
    return n;
  };
  _ctor.prototype.findFirstBlockedPoint = function (t, e) {
    undefined === e && (e = -1);
    var n = this.levelData;
    for (var i = 0; i < t.length; i++) {
      var o = t[i];
      for (var r = 0; r < n.length; r++) {
        if (r !== e && -1 !== n[r].indexOf(o)) {
          return {
            idx: o,
            listIndex: r
          };
        }
      }
    }
    return {
      idx: -1,
      listIndex: -1
    };
  };
  _ctor.prototype.canArrowFly = function (t) {
    var e = this.levelData[t];
    var n = this.list.getChildByName(t.toString());
    if (!n) return false;
    var i = n.getComponent($9Line.default);
    var o = this.getForwardIndices(e[0], i.dir);
    var r = this.findFirstBlockedPointWithFlying(o, t);
    return -1 === r.idx;
  };
  _ctor.prototype.findFirstBlockedPointWithFlying = function (t, e) {
    undefined === e && (e = -1);
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      for (var o = 0; o < this.levelData.length; o++) {
        if (o === e) continue;
        var r = this.list.getChildByName(o.toString());
        if (!r) continue;
        var a = r.getComponent($9Line.default);
        if (a.isOver) continue;
        if (a.flying && a.canFlyOut) continue;
        var c = (a.flying && !a.canFlyOut) ? a.originalItemList : this.levelData[o];
        if (-1 !== c.indexOf(i)) {
          return {
            idx: i,
            listIndex: o
          };
        }
      }
    }
    return {
      idx: -1,
      listIndex: -1
    };
  };
  _ctor.prototype.recoverGame = function () {
    this.canInteract = true;
    $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.RESUME_TIME);
  };
  cc__decorate([ccp_property(cc.Prefab)], _ctor.prototype, "linePrefab", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "list", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "point", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "maxNode", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "bg_h", undefined);
  cc__decorate([ccp_property(cc.Prefab)], _ctor.prototype, "pointPrefab", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "tips", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_Level;