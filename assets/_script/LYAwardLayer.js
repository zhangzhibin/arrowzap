var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : undefined, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $9AppMain = require("./AppMain");
var $9LYsdkManager = require("./LYsdkManager");
var $9LYadMethodNameEnum = require("./LYadMethodNameEnum");
var $9LYEventName = require("./LYEventName");
var $9LYBaseView = require("./LYBaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_LYAwardLayer = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.icon_qx = null;
    e.btn_qwtj = null;
    e.bg = null;
    e.wz_ylqjl = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.node.zIndex = 2;
    this.initNode();
  };
  _ctor.prototype.initNode = function () {
    this.icon_qx = this.getChild("icon_qx");
    this.btn_qwtj = this.getChild("btn_qwtj");
    this.bg = this.getChild("bg");
    this.wz_ylqjl = this.getChild("wz_ylqjl");
  };
  _ctor.prototype.onEnable = function () {
    this.addEvent("on");
    this.updateUI();
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.LAYER_OPERATIONS_FRAMEWORK);
  };
  _ctor.prototype.updateUI = function () {
    this.btn_qwtj.active = !$9AppMain.default.localData.isAddSelf;
    this.wz_ylqjl.active = $9AppMain.default.localData.isAddSelf;
  };
  _ctor.prototype.addEvent = function (t) {
    this.icon_qx[t]("click", this.handleClose, this);
    this.btn_qwtj[t]("click", this.handleClose, this);
    this.bg[t](cc.Node.EventType.TOUCH_END, this.handleClose, this);
  };
  _ctor.prototype.handleClose = function () {
    $9AppMain.default.soundManager.playClickSound();
    this.close(true);
  };
  _ctor.prototype.onClose = function () {
    $9AppMain.default.eventManager.emit($9LYEventName.LYEventName.RESUME_TIME);
    $9LYsdkManager.default.instance.apply($9LYadMethodNameEnum.LY_AD_METHOD_NAME.GAME_OPERATIONS_FRAMEWORK);
  };
  return cc__decorate([ccp_ccclass], _ctor);
}($9LYBaseView.default);
exports.default = def_LYAwardLayer;