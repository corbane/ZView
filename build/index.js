var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Core;
(function (Core) {
    var VChildren = /** @class */ (function () {
        function VChildren(parent) {
            this.parent = parent;
            this.childs = [];
            this.Ids = [];
            this.HChildAdded = new Core.VEvent.Handle();
            this.HChildRemoved = new Core.VEvent.Handle();
            this.length = this.childs.length;
        }
        VChildren.prototype.add = function () {
            var childs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                childs[_i] = arguments[_i];
            }
            var e_1, _a;
            var prev = this.childs[this.childs.length - 1] || null;
            try {
                for (var childs_1 = __values(childs), childs_1_1 = childs_1.next(); !childs_1_1.done; childs_1_1 = childs_1.next()) {
                    var child = childs_1_1.value;
                    this.childs.push(child);
                    if (prev)
                        prev._next = child;
                    child._parent = this.parent;
                    child._prev = prev;
                    child._next = null;
                    this.HChildAdded.trigger(child);
                    prev = child;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (childs_1_1 && !childs_1_1.done && (_a = childs_1.return)) _a.call(childs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        VChildren.prototype.has = function (child) {
            return !(this.indexOf(child) == -1);
        };
        VChildren.prototype.indexOf = function (child) {
            var e_2, _a;
            if (typeof child == "string") {
                var i = 0;
                try {
                    for (var _b = __values(this.childs), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var vel = _c.value;
                        if (vel.node.id === child)
                            return i;
                        ++i;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                var i = this.childs.indexOf(child);
                if (i != -1)
                    return i;
            }
            return -1;
        };
        VChildren.prototype.get = function (i) {
            if (typeof i == "string") {
                i = this.indexOf(i);
                if (i == -1)
                    return null;
            }
            return this.childs[i];
        };
        VChildren.prototype.remove = function () {
            var childs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                childs[_i] = arguments[_i];
            }
            var e_3, _a;
            try {
                for (var childs_2 = __values(childs), childs_2_1 = childs_2.next(); !childs_2_1.done; childs_2_1 = childs_2.next()) {
                    var child = childs_2_1.value;
                    var i = this.indexOf(child);
                    if (i == -1)
                        continue;
                    var del = this.childs.splice(i, 1)[0], prev = i < this.childs.length ? this.childs[i] : null, next = i == 0 ? null : this.childs[i - 1];
                    if (prev)
                        prev._next = next;
                    del._parent = null;
                    del._prev = del._next = null;
                    if (next)
                        next._prev = prev;
                    this.HChildRemoved.trigger(del);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (childs_2_1 && !childs_2_1.done && (_a = childs_2.return)) _a.call(childs_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        VChildren.prototype.clear = function () {
            this.childs = [];
        };
        VChildren.prototype[Symbol.iterator] = function () {
            var _this = this;
            var i = 0;
            return {
                next: function () {
                    return i == _this.childs.length
                        ? { done: true, value: undefined }
                        : { done: false, value: _this.childs[i++] };
                }
            };
        };
        VChildren.prototype.toArray = function () {
            return Object.create(this.childs);
        };
        return VChildren;
    }());
    Core.VChildren = VChildren;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var VAttribute = /** @class */ (function () {
        function VAttribute(parent) {
            this.parent = parent;
        }
        VAttribute.prototype.set = function (attrs) {
            for (var name in attrs)
                this.parent.node.setAttribute(name, attrs[name]);
        };
        VAttribute.prototype.has = function () {
            var attrs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                attrs[_i] = arguments[_i];
            }
            for (var name in attrs)
                if (!this.parent.node.hasAttribute(name))
                    return false;
            return true;
        };
        VAttribute.prototype.get = function (name) {
            return this.parent.node.getAttribute(name);
        };
        VAttribute.prototype.remove = function () {
            var attrs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                attrs[_i] = arguments[_i];
            }
            for (var name in attrs)
                this.parent.node.removeAttribute(name);
        };
        return VAttribute;
    }());
    Core.VAttribute = VAttribute;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var VEvent;
    (function (VEvent) {
        var Handle = /** @class */ (function () {
            function Handle() {
                this.registers = [];
                this.enabled = true;
                this.trigger = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var e_4, _a;
                    if (!this.enabled)
                        return;
                    try {
                        for (var _b = __values(this.registers), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var fn = _c.value;
                            fn.apply(this, arguments);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                };
            }
            Handle.prototype.add = function (callback) {
                this.registers.push(callback);
                return this.registers.length - 1;
            };
            Handle.prototype.remove = function (idx) {
                if (idx < 0 || this.registers.length < idx + 1)
                    return;
                this.registers.splice(idx, 1);
            };
            Handle.prototype.disable = function () {
                this.enabled = false;
            };
            Handle.prototype.enable = function () {
                this.enabled = true;
            };
            return Handle;
        }());
        VEvent.Handle = Handle;
    })(VEvent = Core.VEvent || (Core.VEvent = {}));
})(Core || (Core = {}));
/// <reference path="v-children.ts" />
/// <reference path="v-attribute.ts" />
/// <reference path="v-event.ts" />
var Core;
(function (Core) {
    var VElement = /** @class */ (function () {
        function VElement(node) {
            this.node = node;
            this.HCreated = new Core.VEvent.Handle();
            this.style = {
                add: function (css) {
                    for (var name in css)
                        this.element.style[name] = css[name];
                }
                    .bind(this)
            };
            this.class = this.node.classList;
            this.attribute = new Core.VAttribute(this);
            node.vElement = this;
            this.doc = node.ownerDocument;
            this.children = new Core.VChildren(this);
            this.HCreated.trigger(this);
        }
        Object.defineProperty(VElement.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VElement.prototype, "previous", {
            get: function () {
                return this._prev;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VElement.prototype, "next", {
            get: function () {
                return this._next;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VElement.prototype, "textContent", {
            get: function () { return this.node.textContent; },
            enumerable: true,
            configurable: true
        });
        return VElement;
    }());
    Core.VElement = VElement;
})(Core || (Core = {}));
/// <reference path="../core/v-element.ts" />
var ZView;
(function (ZView) {
    // levels = ["observateur", "sympatisant", "participant", "acteur"]
    // levels = ["abstract", "détail", "vulgarisation", "Technique"]
    // doc.level ("abstract").show ()
    // doc.level ("détail").children.add ( ... )
    var VElement = /** @class */ (function (_super) {
        __extends(VElement, _super);
        function VElement(node) {
            var _this = _super.call(this, node) || this;
            _this.level = 0;
            _this.children.HChildAdded.add(_this.onLevelChildAdded.bind(_this));
            return _this;
        }
        VElement.prototype.onLevelChildAdded = function (child, prev, next) {
            child.level = this.level + 1;
        };
        VElement.prototype.expand = function () {
            var e_5, _a;
            try {
                for (var _b = __values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var el = _c.value;
                    el.class.add("zv-show");
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        };
        VElement.prototype.reduce = function () {
            var e_6, _a;
            try {
                for (var _b = __values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var el = _c.value;
                    el.class.remove("zv-show");
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        };
        return VElement;
    }(Core.VElement));
    ZView.VElement = VElement;
})(ZView || (ZView = {}));
/// <reference path="virtual/element.ts" />
var ZView;
(function (ZView) {
    var style = document.createElement("style"), level = { current: 5, min: 0, max: 5 }, curActive = null, doc = {
        documentRootSelector: "body",
        root: null,
        level: { current: 6, min: 1, max: 6 },
    };
    document.head.appendChild(style);
    document.addEventListener("DOMContentLoaded", function () {
        var el = document.querySelector(doc.documentRootSelector);
        initFlatDocument(el);
        document.addEventListener("mousewheel", onMouseWhell);
        console.log(doc.root);
    });
    function initFlatDocument(root) {
        var parent = new Core.VElement(root), stack = [parent], level = 0;
        doc.root = parent;
        var el = root.firstElementChild;
        while (el) {
            var child = new ZView.VElement(el);
            var l = ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(el.tagName.toLowerCase()) + 1;
            if (l) {
                el.addEventListener("click", onTap);
                child.attribute.set({ "data-zview": l.toString() });
                if (l <= level)
                    parent = stack[l].parent;
                parent.children.add(child);
                parent = child;
                stack[l] = parent;
                level = l;
            }
            else {
                child.attribute.set({ "data-zview": (level + 1).toString() });
                parent.children.add(child);
            }
            el = el.nextElementSibling;
        }
    }
    function onMouseWhell(evt) {
        if (!evt.ctrlKey)
            return false;
        evt.preventDefault(); // annule le zoom par defaut du navigateur
        if (curActive)
            hideSection(curActive);
        if (evt.wheelDelta < 0 && level.current != level.min)
            level.current--;
        else if (evt.wheelDelta > 0 && level.current != level.max)
            level.current++;
        else
            return;
        var stl = "";
        for (var i = level.current + 1; i != level.max + 1; i++)
            stl += "[data-zview=\"" + i + "\"] { display: none }";
        style.innerHTML = stl;
    }
    function onTap(evt) {
        toogleSection(evt.currentTarget);
    }
    function toogleSection(el) {
        if (curActive == el) {
            hideSection(el);
            return;
        }
        if (curActive)
            hideSection(curActive);
        showSection(el);
    }
    function showSection(el) {
        el.vElement.expand();
        curActive = el;
    }
    function hideSection(el) {
        el.vElement.reduce();
        curActive = null;
    }
})(ZView || (ZView = {}));
//# sourceMappingURL=index.js.map