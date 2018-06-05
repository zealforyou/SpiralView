function getCookie1(t) {
    var e = document.cookie.indexOf(";", t);
    return e == -1 && (e = document.cookie.length),
    unescape(document.cookie.substring(t, e))
}
function getCookie2(t) {
    for (var e = t + "=",
    i = e.length,
    s = document.cookie.length,
    n = 0; n < s;) {
        var a = n + i;
        if (document.cookie.substring(n, a) == e) return getCookie1(a);
        if (n = document.cookie.indexOf(" ", n) + 1, 0 == n) break
    }
    return null
}
function setCookie(t, e, i, s) {
    var s = s ? s: "ie.sogou.com",
    n = new Date;
    n.setTime(n.getTime() + i),
    document.cookie = t + "=" + e + ";path=/;expires=" + n.toGMTString() + ";domain=" + s + ";"
}
function checkSE() {
    var t = navigator.userAgent.toLowerCase();
    if (t.indexOf(" se ") < 0) try {
        window.external.StartPageCall("");
        try {
            return void 0 != window.external.StartPageCall
        } catch(t) {
            return ! 0
        }
        return ! 0
    } catch(t) {
        return ! 1
    }
    return ! 0
}
function generateBezier(t, e, i, s) {
    function n(t, e) {
        return 1 - 3 * e + 3 * t
    }
    function a(t, e) {
        return 3 * e - 6 * t
    }
    function r(t) {
        return 3 * t
    }
    function o(t, e, i) {
        return ((n(e, i) * t + a(e, i)) * t + r(e)) * t
    }
    function h(t, e, i) {
        return 3 * n(e, i) * t * t + 2 * a(e, i) * t + r(e)
    }
    function l(e, s) {
        for (var n = 0; n < g; ++n) {
            var a = h(s, t, i);
            if (0 === a) return s;
            var r = o(s, t, i) - e;
            s -= r / a
        }
        return s
    }
    function c() {
        for (var e = 0; e < m; ++e) b[e] = o(e * O, t, i)
    }
    function d(e, s, n) {
        var a, r, h = 0;
        do r = s + (n - s) / 2,
        a = o(r, t, i) - e,
        a > 0 ? n = r: s = r;
        while (Math.abs(a) > _ && ++h < v);
        return r
    }
    function f(e) {
        for (var s = 0,
        n = 1,
        a = m - 1; n != a && b[n] <= e; ++n) s += O; --n;
        var r = (e - b[n]) / (b[n + 1] - b[n]),
        o = s + r * O,
        c = h(o, t, i);
        return c >= p ? l(e, o) : 0 == c ? o: d(e, s, s + O)
    }
    function u() {
        y = !0,
        t == e && i == s || c()
    }
    var g = 4,
    p = .001,
    _ = 1e-7,
    v = 10,
    m = 11,
    O = 1 / (m - 1),
    S = "Float32Array" in window;
    if (4 !== arguments.length) return ! 1;
    for (var x = 0; x < 4; ++x) if ("number" != typeof arguments[x] || isNaN(arguments[x]) || !isFinite(arguments[x])) return ! 1;
    t = Math.min(t, 1),
    i = Math.min(i, 1),
    t = Math.max(t, 0),
    i = Math.max(i, 0);
    var b = S ? new Float32Array(m) : new Array(m),
    y = !1,
    w = function(n) {
        return y || u(),
        t === e && i === s ? n: 0 === n ? 0 : 1 === n ? 1 : o(f(n), e, s)
    };
    w.getControlPoints = function() {
        return [{
            x: t,
            y: e
        },
        {
            x: i,
            y: s
        }]
    };
    var $ = "generateBezier(" + [t, e, i, s] + ")";
    return w.toString = function() {
        return $
    },
    w
}
function range(t, e) {
    return Math.random() * (e - t) + t
}
function randomTheta() {
    return 2 * Math.random() * Math.PI
}
function wheel(t) {
    if (!sogou.manager.locked) {
        var e = 0;
        t = t || window.event,
        t.wheelDelta ? e = t.wheelDelta: t.detail && (e = -t.detail);
        var i = sogou.manager.page;
        e < 0 ? (sogou.manager.auto = !1, sogou.manager.next(!1, sogou.manager.globalT,
        function() {
            pingApp.getDlBtnClick("wheeldown", {
                idx: i
            })
        })) : e > 0 && (sogou.manager.auto = !1, sogou.manager.reverse(!1, sogou.manager.globalT,
        function() {
            pingApp.getDlBtnClick("wheelup", {
                idx: i
            })
        }))
    }
}
var PingbackApp = function() {
    var t = "http://ping.ie.sogou.com/",
    e = (new Date).getTime(),
    i = escape(1e3 * e + Math.round(1e3 * Math.random())),
    s = checkSE() ? 1 : 0;
    this.getUid = function() {
        var t = "";
        return null != getCookie2("SMYUV") ? t = getCookie2("SMYUV") : (t = i, setCookie("SMYUV", t, 2592e6, "sogou.com")),
        t
    },
    this.getYYID = function() {
        var t = "";
        return t = null != getCookie2("YYID") ? getCookie2("YYID") : ""
    },
    this.refurl = "" == document.referrer ? "": encodeURIComponent(document.referrer),
    this.pl = encodeURIComponent(location.href);
    var n = this.getUid();
    this.getPv = function(e) {
        var a = (new Date).getTime(),
        r = a - t1,
        o = t3 - t1,
        h = document.createElement("img");
        h.src = t + "pv.GIF?t=" + i + "&u=" + n + "&r=" + this.refurl + "&pl=" + this.pl + "&load=" + o + "&onloadtime=" + r + "&oSiteVer=future7.0&sogou=" + s + "&idx=" + e
    },
    this.getDlBtnClick = function(e, i, a) {
        var r = (new Date).getTime(),
        o = escape(1e3 * r + Math.round(1e3 * Math.random())),
        h = "";
        for (var l in i) h += "&" + l + "=" + i[l];
        var c = document.createElement("img");
        c.src = t + "ct.GIF?t=" + o + "&u=" + n + "&pl=" + this.pl + "&type=" + e + "&oSiteVer=future7.0" + h + "&sogou=" + s,
        c.onerror = c.onload = function() {
            a && a()
        }
    },
    this.getClick = function(e) {
        e = e ? e: window.event;
        var i = e.target ? e.target: e.srcElement;
        try {
            for (;
            "A" == i.tagName.toUpperCase() || "INPUT" == i.tagName.toUpperCase() || "IMG" == i.tagName.toUpperCase();) {
                is_link = !1,
                "A" != i.tagName.toUpperCase() && "INPUT" != i.tagName.toUpperCase() || (is_link = !0);
                var s = i.innerHTML ? i.innerHTML: i.value;
                s = escape(s);
                var a = i.href ? i.href: i.value;
                if (a = encodeURIComponent(a), clickFrom = window.location.href, "" == s || "" == address) break;
                for (var r = (new Date).getTime(), o = escape(1e3 * r + Math.round(1e3 * Math.random())), h = i.parentNode; ! h.id;) h = h.parentNode;
                mod = h.id;
                var l = document.createElement("img");
                is_link && (l.src = t + "ct.GIF?t=" + o + "&u=" + n + "&r=" + this.refurl + "&pl=" + this.pl + "&on=" + s + "&ol=" + a + "&mod=" + mod + "&clickfrom=" + clickFrom),
                i = i.parentNode
            }
        } catch(t) {}
        return ! 0
    }
},
pingApp = new PingbackApp; !
function(t, e) {
    var i = "function" == typeof define,
    s = "undefined" != typeof module && module.exports;
    i ? define(e) : s ? module.exports = e() : this[t] = e()
} ("Light",
function() {
    var t = function() {
        this.callbacks = {}
    };
    return t.callbacks = {},
    t.listen = t.prototype.listen = function(t, e) {
        var i = this.callbacks[t] = this.callbacks[t] || [];
        i.push(e)
    },
    t.remove = t.prototype.remove = function(t, e) {
        if ("string" == typeof t) {
            var i = this.callbacks[t];
            if (i) if (null == e) delete this.callbacks[t];
            else if ("function" == typeof e) for (var s = 0,
            n = i.length; s < n; ++s) e === i[s] && (i[s] = null)
        }
    },
    t.notify = t.prototype.notify = function(t) {
        var e = this.callbacks[t];
        if (e && "string" == typeof t) for (var i = 0; i < e.length; ++i) {
            var s = e[i];
            "function" == typeof s ? s.apply(null, [].slice.call(arguments, 1)) : (e.splice(i, 1), --i)
        }
    },
    t
}),
function(t, e) {
    function i(t) {
        return t = a.call(t).toLowerCase(),
        t.substring(8, t.length - 1)
    }
    function s(t, e, s) {
        var a = -1,
        h = r.call(arguments, 0);
        for (t = o[n.$name] || {},
        e = [], s = !0; h[++a];)"boolean" === i(h[a]) ? s = h[a] : "object" === i(h[a]) && e.push(h[a]);
        for (e.length >= 2 && (t = e.splice(0, 1)[0]), a = 0; a < e.length; a++) {
            h = e[a];
            for (var l in h) t.hasOwnProperty(l) && !s || (t[l] = h[l])
        }
        return t
    }
    var n = {
        $name: "Laro",
        $version: "0.1",
        $description: "game engine based on html5"
    },
    a = Object.prototype.toString,
    r = Array.prototype.slice,
    o = this || t,
    h = s({},
    n, {
        toType: i,
        extend: s,
        register: function(t, i) {
            var s = t.split("."),
            a = -1,
            r = o;
            for ("" == s[0] && (s[0] = n.$name); s[++a];) r[s[a]] === e && (r[s[a]] = {}),
            r = r[s[a]];
            i && i.call(r, o[n.$name])
        },
        randomRange: function(t, e) {
            return t + Math.random() * (e - t)
        },
        randomBool: function() {
            return Math.random() >= .5
        },
        curry: function(t, e) {
            return function() {
                "function" == typeof t && t.apply(e, arguments)
            }
        },
        curryWithArgs: function(t, e) {
            var i = Array.prototype.slice.call(arguments, 0);
            return delete i[0],
            delete i[1],
            function() {
                "function" == typeof t && t.apply(e, i.concat(arguments))
            }
        }
    });
    this[n.$name] = t[n.$name] = h
} (window),
Laro.register(".err",
function() {
    function t(t) {
        this.assign(t)
    }
    function e(t) {
        this.assign(t)
    }
    function i(t) {
        this.assign(t)
    }
    t.prototype = Error(),
    t.prototype.constructor = t,
    t.prototype.assign = function(t) {
        this.message = void 0 === t ? "": t
    },
    e.prototype = new t,
    e.prototype.constructor = e,
    i.prototype = new t,
    i.prototype.constructor = i,
    this.assert = function(t, i) {
        if (!t) throw new e(i)
    },
    this.RuntimeException = t,
    this.AssertionError = e,
    this.Exception = i,
    Laro.extend(this)
}),
Laro.register(".base",
function() {
    function t(t) {
        return s.call(typeof t === r ? t: function() {},
        t, 1)
    }
    function e(t, e, i) {
        return function() {
            var s = this.supr;
            this.supr = i[h][t];
            var n = e.apply(this, arguments);
            return this.supr = s,
            n
        }
    }
    function i(t, i, s) {
        for (var n in i) i.hasOwnProperty(n) && (t[n] = typeof i[n] === r && typeof s[h][n] === r && o.test(i[n]) ? e(n, i[n], s) : i[n])
    }
    function s(t, e) {
        function s() {}
        function n() {
            this.initialize ? this.initialize.apply(this, arguments) : (e || l && a.apply(this, arguments), c.apply(this, arguments))
        }
        s[h] = this[h];
        var a = this,
        o = new s,
        l = typeof t === r,
        c = l ? t: this,
        d = l ? {}: t;
        return n.methods = function(t) {
            return i(o, t, a),
            n[h] = o,
            this
        },
        n.methods.call(n, d).prototype.constructor = n,
        n.extend = arguments.callee,
        n[h].implement = n.statics = function(t, e) {
            return t = "string" == typeof t ?
            function() {
                var i = {};
                return i[t] = e,
                i
            } () : t,
            i(this, t, a),
            this
        },
        n
    }
    var n = this,
    a = n.Class,
    r = "function",
    o = /xyz/.test(function() {}) ? /\bsupr\b/: /.*/,
    h = "prototype";
    t.noConflict = function() {
        return n.Class = a,
        this
    },
    n.Class = t,
    Laro.Class = t
}),
Laro.register(".geometry",
function(t) {
    var e = t.err.assert;
    t = t.base.Class;
    var i = t({
        initialize: function(t, i, s, n) {
            e(t >= 0 && t <= 255, "Pixel32 wrong --> r"),
            e(i >= 0 && i <= 255, "Pixel32 wrong --> g"),
            e(s >= 0 && s <= 255, "Pixel32 wrong --> b"),
            this.r = t,
            this.g = i,
            this.b = s,
            this.a = void 0 === n ? 255 : n,
            this.normalized = [t / 255, i / 255, s / 255, this.a > 1 ? this.a / 255 : this.a]
        },
        equal: function(t) {
            return t instanceof i && (this.r == t.r && this.g == t.g && this.b == t.b && this.a == t.a)
        },
        toString: function() {
            return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.normalized[3] + ")"
        },
        rgbString: function() {
            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
        }
    });
    this.Pixel32 = i,
    Laro.extend(this)
}),
Laro.register(".game",
function(t) {
    var e = t.Pixel32 || t.geometry.Pixel32,
    i = t.toType;
    t = (t.Class || t.base.Class)(function(t, e, s) {
        void 0 != t && "object" == i(t) && (this.host = t, this.fsm = e, this.stateId = s, this.isSuspended = !1)
    }).methods({
        enter: function() {
            throw "no enter"
        },
        leave: function() {
            throw "no leave"
        },
        update: function() {
            throw "no update"
        },
        suspended: function() {
            throw "no suspended"
        },
        message: function() {
            throw "no message"
        },
        suspend: function() {
            throw "no suspend"
        },
        resume: function() {
            throw "no resume"
        },
        preload: function() {
            throw "no preload"
        },
        cancelPreload: function() {
            throw "no cancelPreload"
        },
        transition: function() {
            return ! 1
        }
    });
    var s = t.extend(function(t, e, i, s) {
        this.stateId = t,
        t = function() {},
        this.isSuspended = !1,
        this.enter = null != e ? e: t,
        this.leave = null != i ? i: t,
        this.update = null != s ? s: t
    }),
    n = t.extend(function() {
        this.isSuspended = !1,
        this.dimTimeLeft = 0
    }).methods({
        update: function(t) {
            this.dimTimeLeft -= t,
            this.dimTimeLeft < 0 && (this.dimTimeLeft = 0)
        },
        draw: function(t) {
            if (this.dimTimeLeft > 0) {
                var i = new e(0, 0, 0, Math.min(255, 765 * this.dimTimeLeft));
                t.drawQuad(null, i)
            }
        },
        suspended: function() {
            this.dimTimeLeft = .25
        },
        onMouse: function() {
            throw "no onMouse"
        }
    });
    this.BaseState = t,
    this.SimpleState = s,
    this.AppState = n
}),
Laro.register(".game",
function(t) {
    var e = t.SimpleState || t.game.SimpleState,
    i = (t.Class || t.base.Class)(function(t, s, n) {
        if (void 0 != t) {
            for (this.host = t, this.onStateChange = n, this.stateArray = [], n = 0; n < s.length; n += 2) {
                var a = s[n],
                r = s[n + 1];
                this.stateArray[a] = r instanceof e ? r: new r(t, this, a)
            }
            this.currentState = i.kNoState,
            this.numSuspended = 0,
            this.suspendedArray = [],
            this.numPreloaded = 0,
            this.preloadedArray = [],
            this.numStates = this.stateArray.length
        }
    }).methods({
        enter: function(t, e) {
            this.setState(t, e)
        },
        leave: function() {
            this.setState(i.kNoState)
        },
        update: function(t) {
            for (var e = 0; e < this.numSuspended; e++) this.stateArray[this.suspendedArray[e]].suspended(t);
            this.currentState != i.kNoState && (this.stateArray[this.currentState].update(t), this.currentState != i.kNoState && this.stateArray[this.currentState].transition())
        },
        message: function(t) {
            this.currentState != i.kNoState && this.stateArray[this.currentState].message(t)
        },
        messageSuspended: function(t) {
            for (var e = 0; e < this.numSuspended; e++) this.stateArray[this.suspendedArray[e]].message(t)
        },
        tryChangeState: function(t, e, s, n, a) {
            return void 0 == n && (n = !0),
            void 0 == a && (a = !0),
            e == i.kNextState && (e = this.currentState + 1),
            !(!t || e == this.currentState && !n) && (this.setState(e, s, a), !0)
        },
        setState: function(t, e, s) {
            if (t == i.kNextState && (t = this.currentState + 1), t == i.kNoState) {
                for (; this.numSuspended > 0; this.numSuspended--) this.stateArray[this.suspendedArray[this.numSuspended - 1]].leave(),
                this.stateArray[this.suspendedArray[this.numSuspended - 1]].isSuspended = !1;
                for (; this.numPreloaded > 0; this.numPreloaded--) this.stateArray[this.preloadedArray[this.numPreloaded - 1]].cancelPreload()
            } else if (s) this.stateArray[this.currentState].suspended(),
            this.stateArray[this.currentState].isSuspended = !0,
            this.suspendedArray[this.numSuspended++] = this.currentState;
            else if (this.currentState != i.kNoState && this.stateArray[this.currentState].leave(), !this.stateArray[t].isSuspended) for (; this.numSuspended > 0; this.numSuspended--) this.stateArray[this.suspendedArray[this.numSuspended - 1]].leave(),
            this.stateArray[this.suspendedArray[this.numSuspended - 1]].isSuspended = !1;
            for (s = 0; s < this.numPreloaded; s++) this.preloadedArray[s] != t && this.stateArray[this.preloadedArray[s]].cancelPreload();
            this.numPreloaded = 0,
            void 0 != this.onStateChange && this.onStateChange(this.currentState, t, e),
            s = this.currentState,
            this.currentState = t,
            this.currentState != i.kNoState && (this.stateArray[this.currentState].isSuspended ? (this.stateArray[this.currentState].resume(e, s), this.stateArray[this.currentState].isSuspended = !1, --this.numSuspended) : this.stateArray[this.currentState].enter(e, s))
        },
        getCurrentState: function() {
            return this.currentState == i.kNoState ? null: this.stateArray[this.currentState]
        },
        preload: function(t) {
            this.preloadedArray[this.numPreloaded++] = t
        },
        isSuspended: function(t) {
            return this.stateArray[t].isSuspended
        }
    }).statics({
        kNoState: -1,
        kNextState: -2
    });
    t = i.extend().methods({
        draw: function(t) {
            for (var e = 0; e < this.numSuspended; e++) this.stateArray[this.suspendedArray[e]].draw(t); (e = this.getCurrentState()) && e.draw(t)
        },
        onMouse: function(t, e, i, s) {
            var n = this.getCurrentState();
            n && n.onMouse(t, e, i, s)
        }
    }),
    this.FSM = i,
    this.AppFSM = t,
    Laro.extend(this)
}),
Laro.register(".game",
function(t) {
    var e = t.base.Class || t.Class;
    window.requestAnimationFrame = this.requestAnimationFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(t) {
            window.setTimeout(t, 1)
        }
    } ();
    var i = e(function(t, e) {
        function i() {
            if (s) {
                requestAnimationFrame(i);
                var a = new Date,
                r = (a - n) / 1e3;
                r >= 3 && (r = .25),
                t.call(e, r),
                n = a
            }
        }
        var s = !0,
        n = new Date;
        return this.stop = function() {
            s = !1
        },
        this.resume = function() {
            s = !0,
            n = new Date,
            i()
        },
        i(),
        this
    });
    e = e(function(t, e, i) {
        this.maxTime = i,
        this.from = t,
        this.to = e,
        this.time = 0,
        this.isDone = !1
    }).methods({
        update: function(t) {
            this.time = Math.min(this.time + t, this.maxTime)
        },
        draw: function(e) {
            this.isDone = this.time == this.maxTime;
            var i = new t.Pixel32(t.lerp(this.from.r, this.to.r, this.time / this.maxTime), t.lerp(this.from.g, this.to.g, this.time / this.maxTime), t.lerp(this.from.b, this.to.b, this.time / this.maxTime), t.lerp(this.from.a, this.to.a, this.time / this.maxTime));
            i.a > 0 && e.drawFillScreen(i)
        },
        reset: function() {
            this.time = 0,
            this.isDone = !1
        }
    }),
    this.Loop = i,
    this.ScreenTransitionFade = e,
    Laro.extend(this)
});
var isTouchDevice = /andriod|iphone|ipad/.test(navigator.userAgent.toLowerCase()),
initializing = !1,
superTest = /horizon/.test(function() {
    horizon
}) ? /\b_super\b/: /.*/;
this.Class = function() {},
Class.extend = function(t) {
    function e() { ! initializing && this.init && this.init.apply(this, arguments)
    }
    var i = this.prototype;
    initializing = !0;
    var s = new this;
    initializing = !1;
    for (var n in t) s[n] = "function" == typeof t[n] && "function" == typeof i[n] && superTest.test(t[n]) ?
    function(t, e) {
        return function() {
            var s = this._super;
            this._super = i[t];
            var n = e.apply(this, arguments);
            return this._super = s,
            n
        }
    } (n, t[n]) : t[n];
    return e.prototype = s,
    e.constructor = e,
    e.extend = arguments.callee,
    e
};
var extend = function(t, e, i) {
    void 0 === i && (i = !0);
    for (var s in e) t.hasOwnProperty(s) && !i || (t[s] = e[s]);
    return t
},
DisplayClass = Class.extend({
    init: function(t) {
        this.x = 0,
        this.y = 0,
        this.width = 0,
        this.height = 0,
        this.stage = null,
        this.draw = function() {},
        "function" == typeof t ? t.call(this) : extend(this, t || {})
    }
}),
InteractiveClass = DisplayClass.extend({
    init: function(t) {
        this._super(t),
        this.eventListener = {}
    },
    addEventListener: function(t, e) {
        null !== this.eventListener[t] && void 0 !== this.eventListener[t] || (this.eventListener[t] = []),
        this.eventListener[t].push(e)
    },
    removeEventListener: function(t, e) {
        if (null !== this.eventListener[t] && void 0 !== this.eventListener[t]) {
            for (var i = 0; i < this.eventListener[t].length; i++) this.eventListener[t][i] == e && (delete this.eventListener[t][i], this.eventListener[t].splice(i, 1));
            0 === this.eventListener[t].length && delete this.eventListener[t]
        }
    },
    removeAllEventListener: function(t) {
        null !== this.eventListener[t] && void 0 !== this.eventListener[t] && (this.eventListener[t].splice(), delete this.eventListener[t])
    },
    hasEventListener: function(t) {
        return !! this.eventListener[t] && this.eventListener[t].length > 0
    }
}),
ObjectContainerClass = InteractiveClass.extend({
    init: function(t, e) {
        this._super(e),
        this.ctx = t,
        this.children = [],
        this.maxWidth = 0,
        this.maxHeight = 0,
        this.hoverChildren = []
    },
    addEventListener: function(t, e) {
        this._super(t, e)
    },
    removeEventListener: function(t, e) {
        this._super(t, e)
    },
    removeAllEventListener: function(t) {
        this._super(t)
    },
    hasEventListener: function(t) {
        this._super(t)
    },
    getContext: function() {
        return this.ctx
    },
    addChild: function(t) {
        this.maxWidth < t.x + t.width && (this.maxWidth = t.x + t.width),
        this.maxHeight < t.y + t.height && (this.maxHegiht = t.y + t.height),
        t.stage = this,
        this.children.push(t)
    },
    addChildAt: function(t, e) {
        this.maxWidth < t.x + t.width && (this.maxWidth = t.x + t.width),
        this.maxHeight < t.y + t.height && (this.maxHeight = t.y + t.height),
        t.stage = this,
        this.children.splice(e, 0, t)
    },
    removeChild: function(t) {
        if (this.children.splice(this.getChildIndex(t), 1), this.maxWidth == t.x + t.width) {
            this.maxWidth = 0;
            for (var e = 0; e < this.children.length; e++) this.maxWidth < this.children[e].x + this.children[e].width && (this.maxWidth = this.children[e].x + this.children[e].width)
        }
        if (this.maxHeight == t.y + t.height) {
            this.maxHeight = 0;
            for (var e = 0; e < this.children.length; e++) this.maxHeight < this.children[e].y + this.children[e].height && (this.maxHeight = this.children[e].y + this.children[e].height)
        }
        t.stage = null
    },
    removeChildAt: function(t) {
        this.children[t].stage = null;
        var e = this.children.splice(t, 1);
        if (this.maxWidth == e.x + e.width) {
            this.maxWidth = 0;
            for (var i = 0; i < this.children.length; i++) this.maxWidth < this.children[i].x + this.children[i].width && (this.maxWidth = this.children[i].x + this.children[i].width)
        }
        if (this.maxHeight == e.y + e.height) {
            this.maxHeight = 0;
            for (var i = 0; i < this.children.length; i++) this.maxHeight = 0,
            this.maxHeight < this.children[i].y + this.children[i].height && (this.maxHeight = this.children[i].y + this.children[i].height)
        }
    },
    getChildAt: function(t) {
        return this.children[t]
    },
    getChildIndex: function(t) {
        for (var e = 0; e < this.children.length; e++) if (this.children[e] == t) return e;
        return - 1
    },
    contains: function(t) {
        return this.getChildIndex(t) != -1
    },
    dispatchMouseEvent: function(t, e, i) {
        function s(t) {
            var e = !1;
            switch (t.checkType || (t.checkType = "rect"), t.checkType) {
            case "rect":
                e = n > t.x && n < t.x + t.width && a > t.y && a < t.y + t.height;
                break;
            case "circle":
                if ("number" != typeof t.radius) throw "no radius or radius is not a number";
                e = Math.sqrt(Math.pow(n - t.x, 2) + Math.pow(a - t.y, 2)) < t.radius;
                break;
            case "poly":
            }
            return e
        }
        for (var n = e,
        a = i,
        r = [], o = this.children.length - 1; o >= 0; o--) {
            var h = this.children[o];
            if (h.dispatchMouseEvent && h.dispatchMouseEvent(t, n - h.x, a - h.y), s(h)) {
                if ("mousemove" == t && r.length < 1 && r.push(h), null == h.eventListener[t] || void 0 == h.eventListener[t]) continue;
                for (var l = 0,
                c = h.eventListener[t]; l < c.length; l++) c[l](n - h.x, a - h.y);
                break
            }
        }
        if ("mousemove" == t) {
            for (var d = 0; d < this.hoverChildren.length; d++) {
                for (var f = !1,
                u = 0; u < r.length; u++) this.hoverChildren[d] == r[u] && (f = !0);
                if (!f) {
                    if (this.hoverChildren[d].eventListener.mouseout) for (var o = 0,
                    g = this.hoverChildren[d]; o < g.eventListener.mouseout.length; o++) g.eventListener.mouseout[o](n - g.x, a - g.y);
                    delete this.hoverChildren[d];
                    break
                }
            }
            for (var d = 0; d < r.length; d++) {
                for (var f = !1,
                u = 0; u < this.hoverChildren.length; u++) r[d] == this.hoverChildren[u] && (f = !0);
                if (!f && this.hoverChildren.length < 1) {
                    if (this.hoverChildren.push(r[d]), r[d].eventListener.mouseover) for (var o = 0,
                    p = r[d]; o < p.eventListener.mouseover.length; o++) p.eventListener.mouseover[o](n - p.x, a - p.y);
                    break
                }
            }
            this.clearHoverChildren()
        }
    },
    clearHoverChildren: function() {
        for (var t = [], e = 0; e < this.hoverChildren.length; e++) null != this.hoverChildren[e] && void 0 != this.hoverChildren[e] && t.push(this.hoverChildren[e]);
        this.hoverChildren = t
    }
}),
Stage = ObjectContainerClass.extend({
    init: function(t, e) {
        function i() {
            return {
                x: n.pageXOffset || a.scrollLeft,
                y: n.pageYOffset || a.scrollTop
            }
        }
        function s(t) {
            t = t || r.canvas;
            for (var e = t.offsetWidth,
            i = t.offsetHeight,
            s = t.offsetTop,
            n = t.offsetLeft; t = t.offsetParent;) s += t.offsetTop,
            n += t.offsetLeft;
            return {
                top: s,
                left: n,
                width: e,
                height: i
            }
        }
        if (this._super(t.getContext("2d"), e), void 0 === t) throw new Error("htmlCanvasElement undefined");
        this.canvas = t,
        this.isStart = !1,
        this.interval = 16,
        this.timer = null,
        this.stage = null,
        this.CONFIG = {
            interval: 16,
            isClear: !0
        },
        this.width = t.width,
        this.height = t.height;
        var n = window,
        a = document.documentElement || {
            scrollLeft: 0,
            scrollTop: 0
        },
        r = this,
        o = function(t, e) {
            for (var n = 0; n < e.length; n++) t.addEventListener(e[n],
            function(t, n) {
                return function(a) {
                    var r = s(),
                    o = i();
                    if (isTouchDevice) {
                        a.preventDefault();
                        var h = "touchend" == e[n] ? a.changedTouches[0] : a.touches[0],
                        l = h.pageX - r.left + o.x,
                        c = h.pageY - r.top + o.y
                    } else var l = a.clientX - r.left + o.x,
                    c = a.clientY - r.top + o.y;
                    if (t.eventListener[e[n]]) for (var d = 0; d < t.eventListener[e[n]].length; d++) t.eventListener[e[n]][d](l, c);
                    t.dispatchMouseEvent(e[n], l, c)
                }
            } (r, n), !1)
        },
        h = function(t, e) {
            for (var i = 0; i < e.length; i++) t.addEventListener(e[i],
            function(t, i) {
                return function(s) {
                    if (t.eventListener[e[i]]) for (var n = 0; n < t.eventListener[e[i]].length; n++) t.eventListener[e[i]][n](s)
                }
            } (r, i), !1)
        };
        o(this.canvas, ["mousemove", "mouseup", "mousedown", "click", "mouseover", "mouseout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchend"]),
        h(this.canvas, ["keyup", "keydown", "keypress"])
    },
    onRefresh: function() {},
    addEventListener: function(t, e) {
        return this._super(t, e)
    },
    removeEventListener: function(t, e) {
        return this._super(t, e)
    },
    removeAllEventListener: function(t) {
        return this._super(t)
    },
    hasEventListener: function(t) {
        return this._super(t)
    },
    getContext: function() {
        return this._super()
    },
    addChild: function(t) {
        return this._super(t)
    },
    addChildAt: function(t, e) {
        return this._super(t, e)
    },
    removeChild: function(t) {
        return this._super(t)
    },
    removeChildAt: function(t, e) {
        return this._super(t, e)
    },
    getChildAt: function(t) {
        return this._super(t)
    },
    getChildIndex: function(t) {
        return this._super(t)
    },
    contains: function(t) {
        return this._super(t)
    },
    dispatchMouseEvent: function(t, e, i) {
        return this._super(t, e, i)
    },
    clearHoverChildren: function() {
        return this._super()
    },
    render: function(t) { !! this.CONFIG.isClear && this.clear(),
        this.draw(t);
        for (var e = 0; e < this.children.length; e++) this.ctx.translate(this.children[e].x, this.children[e].y),
        this.children[e].render(t),
        this.ctx.translate( - this.children[e].x, -this.children[e].y)
    },
    clear: function(t, e, i, s) {
        void 0 !== t && void 0 !== e && void 0 !== i && void 0 !== s ? this.ctx.clearRect(t, e, i, s) : this.ctx.clearRect(0, 0, this.width, this.height)
    },
    start: function() {
        this.isStart = !0,
        this.timer = setInterval(function(t) {
            return function() {
                t.render(),
                t.onRefresh()
            }
        } (this), this.CONFIG.interval)
    },
    stop: function() {
        this.isStart = !1,
        clearInterval(this.timer)
    }
}),
Sprite = ObjectContainerClass.extend({
    init: function(t, e) {
        this._super(t, e),
        this.isDragging = !1,
        this.dragPos = {},
        this.dragFunc = null,
        this.dropFunc = null
    },
    addEventListener: function(t, e) {
        return this._super(t, e)
    },
    removeEventListener: function(t, e) {
        return this._super(t, e)
    },
    removeAllEventListener: function(t) {
        return this._super(t)
    },
    hasEventListener: function(t) {
        return this._super(t)
    },
    getContext: function() {
        return this._super()
    },
    addChild: function(t) {
        return this._super(t)
    },
    addChildAt: function(t, e) {
        return this._super(t, e)
    },
    removeChild: function(t) {
        return this._super(t)
    },
    removeChildAt: function(t) {
        return this._super(t)
    },
    getChildAt: function(t) {
        return this._super(t)
    },
    getChildIndex: function(t) {
        return this._super(t)
    },
    contains: function(t) {
        return this._super(t)
    },
    dispatchMouseEvent: function(t, e, i) {
        return this._super(t, e, i)
    },
    clearHoverChildren: function() {
        return this._super()
    },
    render: function(t) {
        this.draw(t),
        this.ctx.scale(this.width < this.maxWidth ? this.width / this.maxWidth: 1, this.height < this.maxHeight ? this.height / this.maxHeight: 1);
        for (var e = 0; e < this.children.length; e++) this.ctx.translate(this.children[e].x, this.children[e].y),
        this.children[e].render(t),
        this.children[e].translate( - this.children[e].x, this.children[e].y);
        this.ctx.scale(this.width < this.maxWidth ? this.maxWidth / this.width: 1, this.height < this.maxHeight ? this.maxHeight / this.height: 1)
    },
    onDrag: function(t, e) {
        var i = this;
        this.isDragging = !0,
        this.dragPos.x = t + this.x,
        this.dragPos.y = e + this.y,
        this.dragFunc = function(t, e) {
            var s = t - i.dragPos.x,
            n = e - i.dragPos.y;
            i.x += s,
            i.y += n,
            i.dragPos.x = t,
            i.dragPos.y = e
        },
        this.dropFunc = function(t, e) {
            i.onDrop()
        },
        this.stage.addEventListener("mousemove", this.dragFunc),
        this.stage.addEventListener("mouseout", this.dropFunc)
    },
    onDrop: function() {
        this.isDragging = !1,
        this.dragPos = {},
        this.stage.removeEventListener("mousemove", this.dragFunc),
        this.stage.removeEventListener("mouseout", this.dropFunc),
        delete this.dragFunc,
        delete this.dropFunc
    }
}),
Vector2 = Class.extend({
    init: function(t, e) {
        this.x = t,
        this.y = e
    },
    copy: function() {
        return new Vector2(this.x, this.y)
    },
    length: function() {
        return Math.sqrt(this.sqrLength())
    },
    sqrLength: function() {
        return this.x * this.x + this.y * this.y
    },
    normalize: function() {
        var t = 1 / this.length();
        return new Vector2(this.x * t, this.y * t)
    },
    negate: function() {
        return new Vector2(( - this.x), ( - this.y))
    },
    add: function(t) {
        return new Vector2(this.x + t.x, this.y + t.y)
    },
    subtract: function(t) {
        return new Vector2(this.x - t.x, this.y - t.y)
    },
    multiply: function(t) {
        return new Vector2(this.x * t, this.y * t)
    },
    divide: function(t) {
        return new Vector2(this.x / t, this.y / t)
    },
    dot: function(t) {
        return new Vector2(this.x * t.x, this.y * t.y)
    }
});
Vector2.zero = new Vector2(0, 0);
var Color = Class.extend({
    init: function(t, e, i) {
        this.r = t,
        this.g = e,
        this.b = i
    },
    copy: function() {
        return new Color(this.r, this.g, this.b)
    },
    add: function(t) {
        return new Color(Math.min(this.r + t.r, 1), Math.min(this.g + t.g, 1), Math.min(this.b + t.b, 1))
    },
    subtract: function(t) {
        return new Color(Math.max(this.r - t.r, 0), Math.max(this.g - t.g, 0), Math.max(this.b - t.b, 0))
    },
    multiply: function(t) {
        return new Color(Math.min(this.r * t, 1), Math.min(this.g * t, 1), Math.min(this.b * t, 1))
    },
    divide: function(t) {
        return new Color(this.r / t, this.g / t, this.b / t)
    },
    modulate: function(t) {
        return new Color(this.r * t.r, this.g * t.g, this.b * t.b)
    },
    saturate: function() {
        this.r = Math.min(this.r, 1),
        this.g = Math.min(this.g, 1),
        this.b = Math.min(this.b, 1)
    }
});
Color.black = new Color(0, 0, 0),
Color.white = new Color(1, 1, 1),
Color.red = new Color(1, 0, 0),
Color.green = new Color(0, 1, 0),
Color.blue = new Color(0, 0, 1),
Color.yellow = new Color(1, 1, 0),
Color.cyan = new Color(0, 1, 1),
Color.purple = new Color(1, 0, 1);
var Particle = Class.extend({
    init: function(t) {
        this.position = t.position,
        this.velocity = t.velocity,
        this.acceleration = Vector2.zero,
        this.age = 0,
        this.life = t.life,
        this.color = t.color,
        this.size = t.size
    }
}),
ParticleSystem = Class.extend({
    init: function() {
        this.$private = {
            particles: []
        },
        this.gravity = new Vector2(0, 100),
        this.effectors = []
    },
    emit: function(t) {
        this.$private.particles.push(t)
    },
    simulate: function(t) {
        this.aging(t),
        this.applyGravity(),
        this.applyEffectors(),
        this.kinematics(t)
    },
    aging: function(t) {
        for (var e = 0; e < this.$private.particles.length;) {
            var i = this.$private.particles[e];
            i.age += t,
            i.age > i.life ? this.kill(e) : e++
        }
    },
    kill: function(t) {
        t < this.$private.particles.length && this.$private.particles.splice(t, 1)
    },
    applyGravity: function() {
        for (var t in this.$private.particles) this.$private.particles[t].acceleration = this.gravity
    },
    applyEffectors: function() {
        for (var t in this.effectors) {
            var e = this.effectors[t].apply;
            for (var i in this.$private.particles) e(this.$private.particles[i])
        }
    },
    kinematics: function(t) {
        for (var e in this.$private.particles) {
            var i = this.$private.particles[e];
            i.position = i.position.add(i.velocity.multiply(t)),
            i.velocity = i.velocity.add(i.acceleration.multiply(t))
        }
    },
    render: function(t) {
        for (var e in this.$private.particles) {
            var i = this.$private.particles[e],
            s = 1 - i.age / i.life;
            t.fillStyle = "rgba(" + Math.floor(255 * i.color.r) + ", " + Math.floor(255 * i.color.g) + ", " + Math.floor(i.color.b) + ", " + s.toFixed(2) + ")",
            t.beginPath(),
            t.arc(i.position.x, i.position.y, i.size, 0, 2 * Math.PI, !0),
            t.closePath(),
            t.fill()
        }
    }
}),
ParticleBlock = Class.extend({
    init: function(t, e, i, s) {
        this.apply = function(n) { (n.position.x - n.size < t || n.position.x + n.size > i) && (n.velocity.x *= -1),
            (n.position.y - n.size < e || n.position.y + n.size > s) && (n.velocity.y *= -1)
        }
    }
}),
CVS = {};
CVS.$class = Class,
CVS.$stage = Stage,
CVS.$sprite = Sprite,
CVS.$vector2 = Vector2,
CVS.$color = Color,
CVS.$particle = Particle,
CVS.$particleSystem = ParticleSystem,
CVS.$particleBlock = ParticleBlock,
extend(CVS, {
    createSprite: function(t, e) {
        return new Sprite(t, e)
    },
    createPoint3D: function(t, e) {
        var i = 0,
        s = 0,
        n = 0,
        a = 0,
        r = 0,
        o = {
            x: 0,
            y: 0,
            xpos: 0,
            ypos: 0,
            zpos: 0,
            focalLength: 250,
            width: 0,
            height: 0,
            draw: function() {},
            setVanishPoint: function(t, e) {
                i = t,
                s = e
            },
            setCenterPoint: function(t, e, i) {
                n = t,
                a = e,
                r = i
            },
            rotateX: function(t) {
                var e = Math.cos(t),
                i = Math.sin(t),
                s = this.ypos * e - this.zpos * i,
                n = this.zpos * e + this.ypos * i;
                this.ypos = s,
                this.zpos = n
            },
            rotateY: function(t) {
                var e = Math.cos(t),
                i = Math.sin(t),
                s = this.xpos * e - this.zpos * i,
                n = this.zpos * e + this.xpos * i;
                this.xpos = s,
                this.zpos = n
            },
            rotateZ: function(t) {
                var e = Math.cos(t),
                i = Math.sin(t),
                s = this.xpos * e - this.ypos * i,
                n = this.ypos * e + this.xpos * i;
                this.xpos = s,
                this.ypos = n
            },
            getScale: function() {
                return this.focalLength / (this.focalLength + this.zpos + r)
            },
            getScreenXY: function() {
                var t = this.getScale();
                return {
                    x: i + (n + this.xpos) * t,
                    y: s + (a + this.ypos) * t
                }
            }
        };
        "function" == typeof e ? e.call(o) : extend(o, e || {});
        var h = new Sprite(t, o);
        return Object.defineProperties(h, {
            screenX: {
                get: function() {
                    return this.getScreenXY().x
                }
            },
            screenY: {
                get: function() {
                    return this.getScreenXY().y
                }
            }
        }),
        h
    },
    createTriangle: function(t, e, i, s, n, a) {
        function r() {
            var t = this.color >> 16,
            e = this.color >> 8 & 255,
            i = 255 & this.color,
            s = o.call(this);
            return t *= s,
            e *= s,
            i *= s,
            t << 16 | e << 8 | i
        }
        function o() {
            var t = {
                x: l.xpos - c.xpos,
                y: l.ypos - c.ypos,
                z: l.zpos - c.zpos
            },
            e = {
                x: c.xpos - d.xpos,
                y: c.ypos - d.ypos,
                z: c.zpos - d.zpos
            },
            i = {
                x: t.y * e.z - t.z * e.y,
                y: -(t.x * e.z - t.z * e.x),
                z: t.x * e.y - t.y * e.x
            },
            s = i.x * this.light.x + i.y * this.light.y + i.z * this.light.z,
            n = Math.sqrt(i.x * i.x + i.y * i.y + i.z * i.z),
            a = Math.sqrt(this.light.x * this.light.x + this.light.y * this.light.y + this.light.z * this.light.z);
            return Math.acos(s / (n * a)) / Math.PI * this.light.brightness
        }
        function h() {
            var t = d.screenX - l.screenX,
            e = d.screenY - l.screenY,
            i = c.screenX - d.screenX,
            s = c.screenY - d.screenY;
            return t * s > e * i
        }
        a = void 0 == a || a;
        var l = e,
        c = i,
        d = s,
        f = CVS.createSprite(t,
        function() {
            this.color = n,
            this.light = null,
            this.isPointInside = function(t, e) {
                var i = function(i, s, n) {
                    return (e - i.screenY) * (s.screenX - i.screenX) - (t - i.screenX) * (s.screenY - i.screenY)
                },
                s = function(i, s, n) {
                    return (e - n.screenY) * (i.screenX - n.screenX) - (t - n.screenX) * (i.screenY - n.screenY)
                },
                n = function(i, s, n) {
                    return (e - s.screenY) * (n.screenX - s.screenX) - (t - s.screenX) * (n.screenY - s.screenY)
                };
                return i(l, c, d) * n(l, c, d) > 0 && n(l, c, d) * s(l, c, d) > 0
            },
            this.draw = function(t) {
                if (!h()) {
                    t = t || this.ctx,
                    t.beginPath(),
                    t.moveTo(l.screenX, l.screenY),
                    t.lineTo(c.screenX, c.screenY),
                    t.lineTo(d.screenX, d.screenY),
                    t.lineTo(l.screenX, l.screenY),
                    t.closePath();
                    var e = this.light ? r.call(this) : this.color;
                    "number" == typeof e && (e = "rgb(" + (e >> 16) + ", " + (e >> 8 & 255) + ", " + (255 & e) + ")"),
                    t.fillStyle = e,
                    t.fill(),
                    a || (t.strokeStyle = e, t.stroke())
                }
            }
        });
        return Object.defineProperties(f, {
            depth: {
                get: function() {
                    var t = Math.min(l.z, c.z, d.z);
                    return t
                }
            }
        }),
        f
    },
    createLight: function(t, e, i, s) {
        return t = void 0 === t ? -100 : t,
        e = void 0 === e ? -100 : e,
        i = void 0 === i ? -100 : i,
        s = void 0 === s ? 1 : s,
        Object.defineProperties({
            x: t,
            y: e,
            z: i
        },
        {
            brightness: {
                get: function() {
                    return s
                },
                set: function(t) {
                    s = Math.min(Math.max(t, 0), 1)
                }
            }
        })
    }
}),
this.Laro && Laro.extend ? Laro.extend(CVS) : this.CVS = CVS,
CVS.$stage.prototype.refresh = function(t) {
    this.width = t.width,
    this.height = t.height
};
var arr = [[937, 1038, 4], [913, 748, 4], [912, 1614, 4], [909, 896, 4], [893, 1346, 4], [892, 602, 4], [879, 1092, 4], [866, 731, 8], [861, 986, 4], [857, 927, 4], [854, 944, 8], [850, 913, 4], [849, 1e3, 8], [843, 808, 8], [842, 1032, 8], [839, 1135, 4], [835, 1049, 4], [835, 839, 10], [832, 872, 16], [825, 1244, 8], [825, 1091, 8], [822, 959, 16], [818, 1148, 4], [817, 1117, 8], [811, 1008, 16], [807, 820, 4], [806, 782, 16], [805, 1004, 4], [804, 762, 4], [803, 883, 8], [802, 1133, 4], [802, 980, 8], [798, 847, 16], [796, 954, 8], [796, 904, 24], [796, 828, 8], [792, 1165, 16], [790, 602, 8], [789, 1353, 8], [789, 691, 4], [787, 1284, 4], [787, 1142, 8], [783, 1092, 16], [782, 720, 16], [780, 1040, 24], [777, 846, 8], [774, 514, 4], [770, 1190, 8], [770, 1124, 8], [770, 700, 8], [765, 1534, 4], [763, 1215, 4], [762, 726, 8], [759, 757, 16], [758, 1152, 16], [756, 1230, 4], [756, 743, 4], [752, 792, 24], [738, 1154, 8], [737, 804, 4], [731, 1364, 4], [724, 1278, 4], [720, 608, 4], [716, 1227, 16], [715, 686, 24], [713, 741, 22], [713, 669, 8], [709, 1171, 24], [701, 994, 4], [700, 1242, 4], [694, 683, 4], [691, 1014, 4], [691, 702, 8], [687, 1302, 8], [684, 906, 8], [682, 1270, 4], [682, 641, 16], [680, 1028, 4], [680, 726, 16], [673, 1420, 8], [672, 1203, 20], [670, 1341, 4], [666, 641, 4], [664, 1039, 8], [655, 657, 8], [651, 1046, 4], [648, 1060, 8], [645, 1273, 16], [644, 426, 4], [642, 1227, 24], [641, 685, 24], [641, 681, 4], [638, 1068, 4], [636, 668, 4], [628, 1080, 8], [625, 631, 16], [621, 1279, 8], [620, 1300, 4], [620, 514, 4], [619, 1058, 8], [617, 580, 8], [615, 824, 32], [607, 896, 40], [576, 866, 23], [560, 840, 16], [530, 857, 16], [507, 810, 23], [477, 796, 16], [615, 1086, 4], [615, 659, 8], [607, 680, 16], [602, 627, 8], [597, 1094, 8], [597, 847, 8], [594, 1634, 4], [589, 1229, 24], [586, 687, 8], [584, 1292, 16], [584, 1061, 16], [581, 1272, 4], [580, 1338, 8], [579, 649, 16], [576, 796, 24], [575, 596, 16], [572, 1082, 4], [572, 914, 16], [568, 1248, 8], [564, 1060, 8], [564, 673, 8], [562, 632, 4], [560, 1458, 4], [560, 650, 8], [558, 1310, 8], [558, 885, 8], [558, 821, 8], [554, 1118, 4], [552, 685, 4], [548, 451, 4], [547, 539, 8], [544, 1244, 8], [544, 785, 16], [542, 1265, 16], [540, 1347, 4], [540, 664, 8], [534, 1118, 8], [534, 595, 8], [532, 1254, 4], [528, 1235, 4], [526, 1287, 8], [325, 629, 8], [524, 788, 8], [516, 1304, 4], [516, 1261, 8], [513, 1336, 8], [373, 1018, 16], [395, 1035, 32], [512, 795, 4], [512, 608, 4], [505, 635, 8], [497, 663, 16], [500, 1279, 8], [500, 1085, 8], [500, 1020, 8], [498, 1105, 16], [494, 846, 8], [493, 832, 4], [489, 1234, 16], [487, 1124, 4], [486, 655, 4], [485, 1277, 4], [484, 576, 4], [482, 1357, 4], [670, 872, 12], [477, 1486, 4], [476, 505, 4], [475, 649, 8], [473, 692, 8], [471, 597, 16], [469, 975, 16], [466, 1332, 8], [464, 1259, 8], [461, 1290, 16], [460, 1058, 8], [460, 811, 8], [457, 829, 16], [455, 1381, 8], [451, 1222, 16], [451, 827, 4], [449, 1078, 24], [448, 663, 16], [446, 1314, 4], [439, 847, 8], [437, 629, 16], [432, 1098, 8], [430, 826, 8], [429, 1227, 8], [427, 846, 4], [426, 677, 8], [424, 1249, 16], [424, 583, 4], [421, 648, 8], [419, 1293, 8], [419, 433, 4], [415, 867, 4], [415, 670, 4], [409, 846, 8], [408, 1242, 8], [407, 630, 4], [399, 1270, 8], [397, 689, 16], [394, 866, 8], [391, 666, 8], [390, 527, 8], [388, 1209, 16], [388, 946, 40], [386, 886, 4], [385, 1246, 4], [385, 1192, 8], [385, 637, 8], [377, 1211, 4], [376, 903, 4], [375, 712, 8], [374, 1347, 4], [374, 1e3, 8], [450, 1010, 23], [367, 925, 4], [364, 655, 4], [361, 1220, 8], [483, 1051, 16], [512, 1033, 16], [519, 1065, 23], [563, 1093, 16], [357, 1257, 16], [355, 610, 8], [344, 722, 16], [342, 1269, 4], [341, 676, 16], [336, 486, 4], [335, 1183, 20], [331, 662, 4], [325, 1165, 8], [323, 727, 8], [322, 1227, 16], [322, 1197, 8], [317, 1217, 4], [312, 754, 16], [311, 734, 4], [311, 371, 4], [310, 1377, 8], [307, 1183, 4], [298, 672, 16], [297, 768, 4], [295, 801, 8], [293, 1138, 16], [291, 825, 8], [289, 1206, 8], [289, 707, 8], [287, 1570, 4], [286, 649, 8], [283, 1172, 4], [278, 833, 4], [272, 882, 8], [271, 1444, 4], [270, 1153, 8], [270, 732, 16], [270, 555, 4], [268, 991, 8], [268, 811, 8], [266, 845, 16], [263, 944, 8], [260, 1096, 24], [259, 772, 16], [258, 1334, 4], [258, 1182, 16], [258, 1059, 16], [256, 828, 8], [251, 1276, 8], [247, 754, 8], [245, 944, 8], [242, 877, 8], [242, 478, 4], [236, 894, 24], [236, 826, 4], [235, 1006, 24], [234, 1058, 8], [233, 1090, 8], [232, 971, 16], [231, 1139, 16], [231, 895, 4], [229, 842, 16], [225, 942, 8], [223, 1046, 4], [222, 1117, 8], [218, 1251, 4], [216, 1158, 4], [230, 788, 8], [214, 1084, 4], [214, 1004, 8], [214, 958, 4], [210, 879, 8], [210, 623, 8], [207, 728, 8], [202, 1029, 8], [201, 971, 8], [199, 1378, 4], [195, 910, 6], [188, 1115, 4], [166, 1496, 4], [159, 794, 4], [151, 962, 8], [149, 1210, 8], [134, 891, 4], [115, 471, 4]],
arr2 = [[751, 854, 9], [726, 693, 6], [698, 1024, 6], [696, 1402, 2], [680, 1680, 6], [664, 459, 7], [658, 1572, 2], [628, 773, 9], [627, 938, 2], [621, 507, 6], [604, 719, 6], [602, 1813, 9], [598, 1438, 9], [593, 180, 9], [573, 1195, 2], [561, 565, 5], [560, 578, 2], [557, 501, 6], [556, 742, 4], [554, 283, 6], [553, 1786, 6], [553, 1174, 6], [553, 524, 8], [552, 1340, 3], [552, 1151, 8], [552, 954, 9], [551, 587, 9], [549, 546, 8], [548, 1167, 3], [548, 974, 3], [548, 754, 7], [547, 1406, 10], [547, 536, 2], [547, 501, 2], [546, 1194, 6], [546, 1112, 3], [546, 571, 6], [545, 1092, 6], [545, 512, 6], [544, 1374, 6], [542, 1352, 8], [542, 599, 2], [541, 1131, 9], [540, 1214, 3], [540, 1183, 4], [539, 1324, 5], [539, 725, 4], [537, 961, 6], [536, 1684, 9], [536, 1338, 6], [535, 1411, 3], [534, 736, 9], [531, 1388, 9], [531, 1198, 6], [530, 1127, 4], [529, 975, 7], [529, 62, 6], [527, 1109, 7], [527, 584, 8], [526, 501, 8], [520, 1530, 6], [520, 1091, 7], [520, 727, 6], [520, 389, 6], [518, 990, 8], [516, 1312, 9], [515, 1400, 6], [515, 482, 6], [514, 1137, 6], [514, 976, 6], [513, 706, 8], [513, 606, 9], [511, 588, 6], [510, 507, 6], [509, 1118, 8], [508, 1413, 5], [508, 893, 5], [507, 763, 5], [507, 495, 5], [506, 925, 6], [505, 1222, 6], [505, 964, 5], [505, 725, 5], [502, 942, 8], [500, 687, 7], [500, 600, 5], [499, 1419, 3], [498, 738, 8], [497, 1401, 6], [497, 1096, 9], [495, 905, 9], [494, 998, 11], [494, 934, 4], [494, 892, 4], [494, 794, 9], [494, 155, 9], [493, 976, 9], [493, 773, 9], [492, 756, 6], [491, 956, 6], [491, 580, 8], [491, 521, 5], [490, 1305, 11], [490, 502, 7], [489, 1204, 9], [488, 1229, 5], [488, 1184, 6], [485, 703, 11], [484, 1411, 5], [484, 984, 2], [484, 729, 5], [483, 566, 6], [479, 993, 6], [478, 1309, 3], [478, 582, 5], [477, 516, 5], [475, 1319, 6], [472, 553, 2], [468, 528, 8], [465, 1111, 8], [465, 719, 7], [465, 563, 7], [464, 1395, 9], [462, 739, 8], [461, 1318, 5], [461, 1226, 9], [461, 1129, 6], [461, 974, 9], [459, 1833, 2], [459, 1184, 4], [456, 1196, 14], [456, 960, 6], [455, 1123, 3], [455, 761, 4], [454, 737, 2], [451, 948, 5], [450, 1385, 6], [450, 1186, 3], [449, 1133, 5], [448, 1332, 9], [446, 1630, 6], [445, 1146, 10], [445, 747, 6], [445, 540, 11], [444, 1357, 11], [444, 962, 4], [443, 1169, 7], [426, 1824, 6], [425, 1509, 2], [420, 226, 9], [408, 867, 6], [406, 445, 9], [406, 104, 9], [391, 505, 2], [388, 1368, 9], [372, 929, 6], [367, 55, 2], [361, 167, 6], [347, 1406, 6], [347, 379, 6], [344, 1151, 9], [335, 329, 4], [333, 695, 6], [329, 1660, 9], [316, 1179, 2], [302, 1271, 6], [276, 629, 2]],
arr3 = [[ - 859, -210, .1, "#67a5f1"], [ - 431, -254, .16, "#67a5f1"], [251, -140, .16, "#67a5f1"], [571, -310, .1, "#67a5f1"], [ - 555, -144, .4, "#a0c7f7"], [ - 114, -190, 1, "#fff"], [453, -300, .4, "#a0c7f7"], [833, -110, .16, "#67a5f1"], [614, 250, 1.6, "#b3d2f8"]],
arr4 = [[1896, 64, 1], [1576, 136, 2], [501, 188, 1], [1371, 208, 3], [1049, 209, 1], [1473, 251, 1], [224, 263, 1], [601, 263, 4], [684, 306, 4], [1797, 310, 4], [1486, 322, 1], [1051, 334, 1], [490, 337, 4], [351, 357, 4], [1293, 362, 4], [1597, 382, 3], [1118, 384, 4], [175, 388, 4], [1028, 412, 3], [530, 425, 1], [1233, 425, 4], [633, 427, 4], [1053, 446, 5], [1462, 465, 1], [1014, 483, 1], [126, 489, 4], [638, 494, 1], [1683, 501, 1], [1292, 506, 7], [947, 511, 4], [1377, 524, 4], [1487, 570, 4], [507, 588, 5], [1630, 598, 5], [377, 620, 1], [404, 635, 5], [592, 683, 4], [968, 731, 4], [1359, 827, 3]];
Laro.register("SOGOU.$func",
function(t) {
    this.bezier1 = generateBezier(0, 0, 1, 1),
    this.bezier2 = generateBezier(.42, 0, 1, 1),
    this.bezier3 = generateBezier(0, 0, .58, 1),
    this.bezier4 = generateBezier(.42, 0, .58, 1),
    this.bezier5 = generateBezier(.84, .45, .98, .73),
    this.bezier6 = generateBezier(.53, .24, .88, .55),
    this.initWordsPos = function() {
        var t = this;
        this.w1.style.marginLeft = -670 * t.scale + "px",
        this.w2.style.marginLeft = -491 * t.scale + "px",
        this.w2.style.bottom = SOGOU.$func.canvas.height / 2 + "px",
        this.w3.style.marginLeft = 0 * t.scale + "px",
        this.w4.style.marginLeft = 95 * t.scale + "px";
        for (var e = document.querySelectorAll(".word"), i = document.querySelectorAll(".word_l"), s = 0; s < e.length; s++) e[s].style.fontSize = 55 * SOGOU.$func.scale + "px";
        for (var s = 0; s < i.length; s++) i[s].style.fontSize = 18 * SOGOU.$func.scale + "px"; [].forEach.call(this.dlbtns,
        function(e, i) {
            e.style.width = 200 * t.scale + "px",
            e.style.height = 57 * t.scale + "px",
            e.style.lineHeight = Math.max(57 * t.scale, 13) + "px",
            e.style.fontSize = 22 * t.scale + "px"
        })
    },
    this.resizeOfballs = function() {
        var t = this;
        Light.listen("resize",
        function(e) {
            try {
                switch (t.initWordsPos(), sogou.manager.index) {
                case 0:
                case 1:
                    t.logoParticles.forEach(function(t, i) {
                        t._resize(e.scale)
                    });
                    break;
                case 2:
                    t.stage.removeChild(t.ball_head),
                    t.initBallHead(),
                    t.stage.addChild(t.ball_head),
                    t.stage.removeChild(t.ball_line),
                    t.initBallLine(),
                    t.stage.addChild(t.ball_line),
                    t.initLineArr();
                    break;
                case 3:
                case 4:
                    t.iconsParticles.forEach(function(t, i) {
                        t._resize(e.scale)
                    });
                    break;
                case 5:
                    t.resetIconBalls(),
                    t.resetDnaBalls(),
                    t.resetDnaBgBalls(),
                    t.lastScale5 = t.scale;
                    break;
                case 6:
                    t.resetDnaList(),
                    t.lastScale7 = t.scale;
                    break;
                case 7:
                    t.resetDnaMain(),
                    t.lastScale7 = t.scale;
                    break;
                case 8:
                    t.resetDnaMain(),
                    t.lastScale7 = t.scale;
                    break;
                case 9:
                    t.resetRotateLogo(),
                    t.resetLogoEnd()
                }
            } catch(t) {}
        })
    },
    this.initStage = function() {
        var t = document.getElementById("canvas");
        t.width = window.innerWidth,
        t.height = Math.min(window.innerHeight, document.body.clientHeight),
        this.canvas = t,
        this.scale = window.innerWidth / 1920,
        this.stage = new CVS.$stage(t),
        this.ctx = this.stage.ctx,
        this.vpx = t.width / 2,
        this.vpy = t.height / 2,
        this.normalN = 100,
        this.normalBalls = [],
        this.angleX = .001,
        this.angleY = .001,
        this.zstep = 1,
        this.zflag = 1,
        this.w1 = document.getElementById("w1"),
        this.w2 = document.getElementById("w2"),
        this.w3 = document.getElementById("w3"),
        this.w4 = document.getElementById("w4"),
        this.dlbtns = document.querySelectorAll(".dlbtn"),
        this.initWordsPos(),
        this.lastScale5 = this.scale,
        this.lastScale7 = this.scale,
        pingApp.getPv(1)
    };
    var e = this;
    this.createBall = function(t, i, s, n, a, r, o) {
        return CVS.createPoint3D(t.ctx,
        function() {
            this.width = s,
            this.xpos = n,
            this.ypos = a,
            this.zpos = r,
            this.draw = function() {
                var t = e.canvas.width,
                s = e.canvas.height;
                this.ctx.translate(t / 2, s / 2),
                this.ctx.beginPath();
                try {
                    this.ctx.arc(0, 0, this.width, 0, 2 * Math.PI, !0)
                } catch(t) {}
                this.ctx.closePath(),
                this.ctx.fillStyle = i,
                this.ctx.fill(),
                this.ctx.translate( - t / 2, -s / 2)
            }
        })
    },
    this.tween = function(t, e, i, s, n, a) {
        if (1 != t.end) {
            n = n ? n: 1,
            a ? ball_cache = a: ball_cache = t,
            ball_cache.start_t || (ball_cache.start_t = 0),
            ball_cache.end_t || (ball_cache.end_t = 0);
            var r = (e - ball_cache.start_t).toFixed(2);
            r <= 0 && (r = 0),
            r <= i + ball_cache.end_t && r > 0 ? (void 0 != ball_cache.t_xpos && (t.xpos = ball_cache.f_xpos + (ball_cache.t_xpos - ball_cache.f_xpos) * s(r / (i + ball_cache.end_t))), void 0 != ball_cache.t_ypos && (t.ypos = ball_cache.f_ypos + (ball_cache.t_ypos - ball_cache.f_ypos) * s(r / (i + ball_cache.end_t))), void 0 != ball_cache.t_zpos && (t.zpos = ball_cache.f_zpos + (ball_cache.t_zpos - ball_cache.f_zpos) * s(r / (i + ball_cache.end_t))), void 0 != ball_cache.t_width && (t.width = ball_cache.f_width + (ball_cache.t_width - ball_cache.f_width) * s(r / (i + ball_cache.end_t)))) : (1 == n && r > i + ball_cache.end_t || n == -1 && r <= 0) && (t.end = !0)
        }
    },
    this.tween2 = function(t, e, i, s, n, a, r) {
        if (1 != t.end) {
            n = n ? n: 1,
            a ? ball_cache = a: ball_cache = t,
            ball_cache.start_t || (ball_cache.start_t = 0),
            ball_cache.end_t || (ball_cache.end_t = 0);
            var o = (e - ball_cache.start_t).toFixed(2);
            o <= 0 && (o = 0),
            o <= i + ball_cache.end_t && o > 0 ? (void 0 != ball_cache.t_xpos && (t.xpos = ball_cache.f_xpos + (ball_cache.t_xpos - ball_cache.f_xpos) * s(o / (i + ball_cache.end_t))), void 0 != ball_cache.t_ypos && (t.ypos = ball_cache.f_ypos + (ball_cache.t_ypos - ball_cache.f_ypos) * s(o / (i + ball_cache.end_t))), void 0 != ball_cache.t_zpos && (t.zpos = ball_cache.f_zpos + (ball_cache.t_zpos - ball_cache.f_zpos) * s(o / (i + ball_cache.end_t))), void 0 != ball_cache.t_width && void 0 != ball_cache.f_width && (t.width = Math.max(0, ball_cache.f_width + (ball_cache.t_width - ball_cache.f_width) * s(o / (i + ball_cache.end_t))))) : 1 == n && o > i + ball_cache.end_t ? (void 0 != ball_cache.t_xpos && (t.xpos = ball_cache.t_xpos), void 0 != t.t_ypos && (t.ypos = ball_cache.t_ypos), void 0 != t.t_zpos && (t.zpos = ball_cache.t_zpos), void 0 != t.t_width && void 0 != t.f_width && (t.width = ball_cache.t_width), t.end = !0) : n == -1 && o <= 0 && (void 0 != ball_cache.f_xpos && (t.xpos = ball_cache.f_xpos), void 0 != t.f_ypos && (t.ypos = ball_cache.f_ypos), void 0 != t.f_zpos && (t.zpos = ball_cache.f_zpos), void 0 != t.t_width && void 0 != t.f_width && (t.width = ball_cache.f_width), t.end = !0)
        }
    },
    this.resetBallStartTime = function(t) {
        if (t.length) for (var e = 0; e < t.length; e++) {
            var i = t[e];
            i.start_t = 0
        } else t.start_t = 0
    },
    this.resetEnd = function(t) {
        if (t) if (t.length) for (var e = 0; e < t.length; e++) {
            var i = t[e];
            i.end = !1
        } else t.end = !1
    },
    this.sin = function(t, e, i, s) {
        return e * Math.sin(i * Math.PI * t + s)
    },
    this.linear = function(t, e, i, s) {
        return t <= 0 ? 0 : t <= e ? t / e * s * i: i
    },
    this.cos = function(t, e, i) {
        return e * Math.cos(i * Math.PI * t + 3 * Math.PI / 2)
    },
    this.initEvents = function() {
        window.addEventListener("resize", this.resizeInstance.bind(this));
        var t = document.querySelectorAll(".dlbtn"); [].forEach.call(t,
        function(t, e) {
            t.addEventListener("click",
            function(t) {
                pingApp.getDlBtnClick("dlbtnclick", {
                    idx: sogou.manager.page
                })
            })
        });
        var e = document.querySelectorAll(".links li"); [].forEach.call(e,
        function(t, e) {
            t.addEventListener("click",
            function(t) {
                pingApp.getDlBtnClick("linkbtnclick", {
                    nav: this.getAttribute("nav")
                })
            })
        })
    },
    this.scalew = function(t, e, i, s) {
        void 0 == t.bi_w && (t.bi_w = t.width),
        void 0 == t.start_t && (t.start_t = 0);
        var n = e - t.start_t;
        1 == s ? start = Math.PI / 2 : start = 3 * Math.PI / 2;
        var a = t.bi_w + this.sin(n, i, .5, start);
        t.width = a >= 1 ? a: 1
    },
    this.getWidthOfTime = function(t, e, i, s, n, a) {
        void 0 == t.start_t && (t.start_t = 0);
        var r = e - i;
        return 1 == a ? start = Math.PI / 2 : start = 3 * Math.PI / 2,
        n + this.sin(r, s, .5, start)
    },
    this.roll = function(t, e, i, s) {
        void 0 == t.bi_x && (t.bi_x = t.xpos, t.bi_y = t.ypos),
        void 0 == t.start_t && (t.start_t = 0);
        var n = e - t.start_t;
        0 != i && n > 0 && (t.xpos = t.bi_x + this.sin(n, i, .5, 0)),
        0 != s && n > 0 && (t.ypos = t.bi_y + this.sin(n, s, .5, 3 * Math.PI / 2))
    },
    this.getRollPos = function(t, e, i, s, n, a, r) {
        var o = e - i,
        h = {
            x: s,
            y: n
        };
        return 0 != a && o > 0 && (h.x = s + this.sin(o, a, .5, 0)),
        0 != r && o > 0 && (h.y = n + this.sin(o, r, .5, 3 * Math.PI / 2)),
        h
    },
    this.resizeInstance = function() {
        var t = this;
        this.canvas.width = window.innerWidth,
        this.ctx.canvas.height = this.canvas.height = Math.min(window.innerHeight, document.body.clientHeight),
        this.ctx.canvas.width = window.innerWidth,
        this.stage.refresh(canvas),
        this.scale = window.innerWidth / 1920,
        Light.notify("resize", {
            scale: t.scale
        })
    },
    this.init = function() {
        this.initStage(),
        this.resizeOfballs(),
        this.initEvents()
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    var e = (this.vpx, this.vpy, this);
    this.particle = function(t, i, s, n, a, r, o, h) {
        this.canvas = s,
        scale = this.scale;
        var l = this.createBall(t, i, a, r, o, h, n);
        l.id = n;
        var c = a;
        return l._resize = function(t) {
            var i = sogou.manager.index;
            switch (i) {
            case 0:
                a = c * t,
                x = r * t,
                y = o * t,
                l.t_xpos = x,
                l.t_ypos = y,
                l.t_zpos = l.zpos,
                l.width = a;
                var s = l.t_xpos,
                n = l.t_ypos;
                if (s > 0 && n >= 0) var h = Math.atan(n / s);
                else if (s > 0 && n < 0) var h = 2 * Math.PI + Math.atan(n / s);
                else if (s < 0) var h = Math.PI + Math.atan(n / s);
                else if (0 == s && n > 0) var h = .5 * Math.PI;
                else if (0 == s && n < 0) var h = 1.5 * Math.PI;
                if (r < 190 && r > 0 && o < 190 && o > -190) {
                    var d = (o + 190) / 1900;
                    d *= 5;
                    var f = h - 1.6 * Math.PI / 2
                } else if (r < 0 && r > -190 && o < 190 && o > -190) {
                    var d = ( - o + 190) / 1900;
                    d *= 5;
                    var f = h - 1.6 * Math.PI / 2
                } else var d = range(1e3, 2e3) / 1e3,
                f = h - 2 * Math.PI / 2;
                l.start_t = d / 2;
                var u = 1e3;
                l.r1 = u,
                l.t_theta = f;
                break;
            case 1:
                l.xpos = r * t + 161 * t,
                l.ypos = o * t;
                var g = l.getScreenXY();
                l.x = g.x,
                l.y = g.y,
                l.width = c * t,
                void 0 != l.bi_x && (l.bi_x = l.xpos),
                void 0 != l.bi_y && (l.bi_y = l.ypos);
                break;
            case 3:
            case 4:
                a = c * t,
                x = r * t,
                y = o * t,
                l.xpos = x,
                l.ypos = y,
                e.initVibrate(l),
                l.t_xpos = x,
                l.t_ypos = y,
                l.width = a,
                e.resetIcon(l)
            }
        },
        l._resize(this.scale),
        l.x = 3e3,
        l.y = 3e3,
        l.z = 0,
        l.setVanishPoint(0, 0),
        l.setCenterPoint(0, 0, h),
        l
    },
    this.getParticles = function(t, e, i) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var s, n = [], a = 0; a < t.length; a++) {
            var r = t[a][2],
            s = e,
            o = !1;
            if ("icons" === i) { (t[a][1] < 475 || t[a][1] > 1430 || t[a][0] < 434 || t[a][0] > 580) && (s = "rgba(255,255,255," + range(.2, .6) + ")", o = !0);
                var h = t[a][1] + t[a][2] - 960,
                l = t[a][0] + t[a][2] - 540
            } else if ("logo" === i) var h = t[a][1] + t[a][2] - 960,
            l = t[a][0] + t[a][2] - 540;
            else {
                s = "rgba(255,255,255," + range(.1, .3) + ")";
                var h = t[a][0] + t[a][2] - 960,
                l = t[a][1] + t[a][2] - 540
            }
            var c = this.particle(this.stage, s, this.canvas, a, r, h, l, 0);
            c.outer = o,
            n.push(c)
        }
        return n
    },
    this.initParticlesLogo = function() {
        if (!this.logoParticles) {
            this.logoParticles = this.getParticles(arr, "rgb(70,147,236)", "logo")
        }
    },
    this.rotateTranslate = function(t, e, i) {
        for (var s = 0; s < this.logoParticles.length; s++) {
            var n = this.logoParticles[s];
            if (! (t < n.start_t)) {
                n.t = t - n.start_t;
                var a = n.r1,
                r = a - a * (n.t / e),
                o = n.t_theta,
                h = o - 1.5 * Math.PI / 2 * (n.t / e),
                l = n.t_xpos,
                c = n.t_ypos;
                n.t > e ? (n.xpos = n.t_xpos + 161 * this.scale, n.ypos = n.t_ypos, pos = n.getScreenXY(), n.x = pos.x, n.y = pos.y) : (n.r = r, n.xpos = r * Math.cos(h) + l + 161 * this.scale, n.ypos = r * Math.sin(h) + c, pos = n.getScreenXY(), n.x = pos.x, n.y = pos.y)
            }
        }
    },
    this.createLine = function(t, e, i, s, n, a, r, o) {
        return CVS.createPoint3D(t.ctx,
        function() {
            var t = "rgb(70,147,236)";
            this.color = t,
            this.width = e,
            this.height = i,
            this.xpos = s,
            this.ypos = n,
            this.zpos = a,
            this.draw = function() {
                this.ctx.beginPath();
                var t = this.ctx.createLinearGradient(0, 0, this.width, 0);
                t.addColorStop(0, r),
                t.addColorStop(1, o),
                this.ctx.fillStyle = t,
                this.ctx.fillRect(0, 0, this.width, this.height)
            }
        })
    },
    this.resetIcon = function(t) {
        t.t_width = t.width
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.breathe = function(t, e) {
        void 0 == t.bi_x && (t.bi_x = t.xpos),
        void 0 == t.bi_y && (t.bi_y = t.ypos),
        t.dx = t.dx ? t.dx: 0,
        t.dy = t.dy ? t.dy: 0,
        t.xpos = t.dx + t.bi_x + .02 * t.xpos * (1 + Math.sin(2 * Math.PI * e / 3 + 3 * Math.PI / 2)),
        t.ypos = t.dy + t.bi_y + .02 * t.ypos * (1 + Math.sin(2 * Math.PI * e / 3 + 3 * Math.PI / 2))
    },
    this.vibrate = function(t, e) {
        void 0 != t.step && 0 != t.step || (t.step = 0, t.direction = 1, t.theta = randomTheta(), t.d = range(5, 20), t.dx = 0, t.dy = 0),
        t.direction > 0 ? (t.step++, t.dx += 1.2 * Math.cos(t.theta) / 6, t.dy += 1.2 * Math.sin(t.theta) / 6) : (t.step--, t.dx -= 1.2 * Math.cos(t.theta) / 6, t.dy -= 1.2 * Math.sin(t.theta) / 6),
        t.step >= t.d ? t.direction = -1 : t.step <= 0 && (t.dx = t.dy = 0, t.direction = 1)
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.resetBalls = function() {
        for (var t = 0; t < this.logoParticles.length; t++) ball = this.logoParticles[t],
        ball.step = 0,
        ball.step0 = {},
        ball.step0.f_xpos = ball.xpos,
        ball.step0.f_ypos = ball.ypos,
        ball.step0.f_zpos = ball.zpos,
        ball.step0.t_xpos = ball.step0.f_xpos + range( - 400, 450),
        ball.step0.t_ypos = ball.step0.f_ypos + range( - 200, 150),
        ball.step0.t_zpos = ball.step0.f_zpos + range(0, -100),
        ball.end = !1,
        ball.step1 = {},
        ball.step1.f_xpos = ball.step0.t_xpos,
        ball.step1.t_xpos = 2.1 * this.canvas.width / 2,
        ball.step1.f_ypos = ball.step0.t_ypos,
        ball.step1.t_ypos = ball.step0.t_ypos,
        ball.step1.f_zpos = ball.step0.t_zpos,
        ball.step1.t_zpos = ball.step0.t_zpos
    },
    this.forwardAndBack = function(t, e, i) {
        void 0 != t.step && 0 != t.step || (t.step = 0, t.direction = 1, t.d = i - e),
        t.direction > 0 ? (t.step++, t.xpos += 1.2) : (t.step--, t.xpos -= 1.2),
        t.step >= t.d ? (t.step = t.d, t.direction = -1) : t.step <= 0 && (t.step = 0, t.direction = 1)
    },
    this.bigAndSmall = function(t) {
        t.width += .03 * (t.direction > 0 ? 1 : -1)
    },
    this.initBallHead = function() {
        this.ball_head && delete this.ball_head;
        var t = 10 * this.scale;
        this.ball_head = new this.createBall(this.stage, "rgb(70,147,236)", 0, -this.canvas.width / 2 - 50, 0, 0);
        var e = this.ball_head.getScreenXY();
        this.ball_head.x = e.x,
        this.ball_head.y = e.y,
        this.ball_head.f_width = -t,
        this.ball_head.t_width = t,
        this.ball_head.f_xpos = this.ball_head.xpos,
        this.ball_head.t_xpos = 500 * this.scale
    },
    this.initBallLine = function() {
        if (this.line_arr) {
            for (var t = 0; t < this.line_arr.length; t++) {
                var e = this.line_arr[t];
                this.stage.removeChild(e)
            }
            delete this.line_arr
        }
        this.ball_line && delete this.ball_line;
        var i = this.canvas.width / 2 + 700 * this.scale,
        s = 4,
        n = -(this.canvas.width / 2 + 700 * this.scale),
        a = this.stage.height / 2,
        r = 0,
        o = color_s = "rgba(70,147,236,1)";
        this.ball_line = new this.createLine(this.stage, i, s, n, a - 2, r, color_s, o);
        var h = this.ball_line.getScreenXY();
        this.ball_line.x = h.x,
        this.ball_line.y = h.y
    },
    this.initLineArr = function() {
        var t = 4,
        e = 0,
        i = [{
            width: 221,
            left: 580,
            top: 164,
            a: .5
        },
        {
            width: 246,
            left: 80,
            top: 220,
            a: .2
        },
        {
            width: 350,
            left: 420,
            top: 244,
            a: 1
        },
        {
            width: 210,
            left: 948,
            top: 358,
            a: .7
        },
        {
            width: 263,
            left: 0,
            top: 395,
            a: .3
        },
        {
            width: 371,
            left: 830,
            top: 442,
            a: .7
        },
        {
            width: 375,
            left: 511,
            top: 678,
            a: 1
        },
        {
            width: 286,
            left: 275,
            top: 846,
            a: .7
        }];
        this.line_arr = [];
        for (var s = 0; s < i.length; s++) {
            var n = this.line_arr[s] = new this.createLine(this.stage, i[s].width, t, i[s].left, i[s].top, e, "rgba(70,147,236,0)", "rgba(70,147,236," + i[s].a + ")");
            this.stage.addChild(n);
            var a = n.getScreenXY();
            n.x = this.stage.width + a.x,
            n.y = a.y,
            n.f_xpos = n.x,
            n.t_xpos = -a.x,
            n.end = !1,
            n.start_t = .5
        }
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.initParticlesIcons = function() {
        if (!this.iconsParticles) {
            this.iconsParticles = this.getParticles(arr2, "#fff", "icons");
            for (var t = 0; t < this.iconsParticles.length; t++) {
                var e = this.iconsParticles[t];
                this.stage.addChild(e)
            }
        }
        for (var t = 0; t < this.iconsParticles.length; t++) {
            var e = this.iconsParticles[t];
            e.f_xpos = range( - this.vpx, this.vpx),
            e.f_ypos = range( - this.vpy, this.vpy),
            e.t_width || (e.t_width = e.width),
            e.xpos = e.f_xpos,
            e.ypos = e.f_ypos,
            e.f_zpos = -249,
            e.t_zpos = 0
        }
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.initVibrate = function(t) {
        t.step = 0,
        t.direction = 1,
        t.theta = randomTheta(),
        t.d = range(10, 50),
        t.dx = 0,
        t.dy = 0,
        t.bi_x = t.xpos,
        t.bi_y = t.ypos
    },
    this.vibratePart2 = function(t, e, i) {
        i = i ? i: 1.2,
        void 0 != t.step && 0 != t.step || this.initVibrate(t),
        t.direction > 0 ? (t.step++, t.dx += i * Math.cos(t.theta) / 6, t.xpos = t.bi_x + t.dx, t.dy += i * Math.sin(t.theta) / 6, t.ypos = t.bi_y + t.dy) : (t.step--, t.dx -= i * Math.cos(t.theta) / 6, t.xpos = t.bi_x + t.dx, t.dy -= i * Math.sin(t.theta) / 6, t.ypos = t.bi_y + t.dy),
        t.step >= t.d ? t.direction = -1 : t.step <= 0 && (t.dx = t.dy = 0, t.direction = 1)
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.initDnaBgBalls = function() {
        this.dnaBgBalls || (this.dnaBgBalls = this.getParticles(arr4, "#fff", "dnabgball"));
        for (var t = 0; t < this.dnaBgBalls.length; t++) {
            var e = this.dnaBgBalls[t];
            if (!e.f_xpos) {
                var i = e.xpos + range( - 100, 100),
                s = e.xpos,
                n = e.ypos + range( - 100, 100),
                a = e.ypos;
                e.f_xpos = i,
                e.f_ypos = n,
                e.t_xpos = s,
                e.t_ypos = a,
                e.t_width = e.width,
                e.start_t = .5,
                e.width = 0
            }
            e.step = 0,
            e.f_zpos = 200,
            e.t_zpos = 0,
            e.f_width = 0
        }
    },
    this.resetDnaBgBalls = function() {
        for (var t = 0; t < this.dnaBgBalls.length; t++) {
            ball = this.dnaBgBalls[t],
            ball.f_xpos = ball.f_xpos / this.lastScale5 * this.scale,
            ball.f_ypos = ball.f_ypos / this.lastScale5 * this.scale,
            ball.t_xpos = ball.t_xpos / this.lastScale5 * this.scale,
            ball.t_ypos = ball.t_ypos / this.lastScale5 * this.scale,
            ball.t_width = ball.t_width / this.lastScale5 * this.scale;
            var e = ball.getScreenXY();
            ball.x = e.x,
            ball.y = e.y
        }
    },
    this.initDnaBalls = function() {
        var t = arr3,
        e = 20;
        this.dnaBalls = [];
        for (var i = 0; i < t.length; i++) for (var s = 0; s < 7; s++) {
            var n = t[i][2],
            a = t[i][3],
            r = e * n * SOGOU.$func.scale,
            o = 1,
            h = range( - SOGOU.$func.canvas.width / 3, SOGOU.$func.canvas.width / 3),
            l = range( - SOGOU.$func.canvas.width / 3, SOGOU.$func.canvas.width / 3),
            c = range( - SOGOU.$func.canvas.height / 3, SOGOU.$func.canvas.height / 3),
            d = range( - SOGOU.$func.canvas.height / 3, SOGOU.$func.canvas.height / 3),
            f = new this.createBall(SOGOU.$func.stage, a, o, 3e3, 3e3, 250),
            u = new this.createBall(SOGOU.$func.stage, a, o, 3e3, 3e3, 250);
            if (f.f_xpos = h, f.f_ypos = c, f.f_zpos = 0, f.f_width = o, f.width = o, u.f_xpos = l, u.f_ypos = d, u.f_zpos = 0, u.f_width = o, u.width = o, i <= 4) var g = .5;
            else var g = 0;
            var p = 59,
            _ = t[i][0] * this.scale,
            v = (t[i][1] + p * s * n) * this.scale,
            m = 117 * n * this.scale,
            O = this.getRollPos(f, Math.PI + .06 + g, .4 * s, _, v, m, 0);
            f.t_xpos = O.x,
            f.t_ypos = O.y,
            f.t_zpos = 0,
            f.t_width = r;
            var O = this.getRollPos(u, Math.PI + .06 + g, .4 * s, _, v, -m, 0);
            u.t_xpos = O.x,
            u.t_ypos = O.y,
            u.t_zpos = 0,
            u.t_width = r;
            var S = this.getWidthOfTime(f, Math.PI + .06 + g, g + .4 * s, 5 * n * SOGOU.$func.scale, r, 1);
            f.t_width = S;
            var x = this.getWidthOfTime(f, Math.PI + .06 + g, g + .4 * s, 5 * n * this.scale, r, -1);
            u.t_width = x,
            f.color = u.color = a,
            f.scale = u.scale = n,
            f.end_t = range(0, .3),
            u.end_t = range(0, .3),
            5 == i ? (f.end_t = 0, u.end_t = 0) : 8 == i && (f.end_t = .3, u.end_t = .3),
            this.dnaBalls.push(f),
            this.dnaBalls.push(u)
        }
    },
    this.resetDnaBalls = function() {
        for (var t = 0; t < this.dnaBalls.length; t++) {
            var e = this.dnaBalls[t];
            e.t_width = e.t_width / this.lastScale5 * this.scale,
            e.t_xpos = e.t_xpos / this.lastScale5 * this.scale,
            e.t_ypos = e.t_ypos / this.lastScale5 * this.scale,
            e.f_xpos = e.f_xpos / this.lastScale5 * this.scale,
            e.f_ypos = e.f_ypos / this.lastScale5 * this.scale,
            e.xpos = e.xpos / this.lastScale5 * this.scale,
            e.ypos = e.ypos / this.lastScale5 * this.scale,
            e.width = e.width / this.lastScale5 * this.scale;
            var i = e.getScreenXY();
            e.x = i.x,
            e.y = i.y
        }
    },
    this.resetIconBalls = function() {
        for (var t = 0; t < this.iconsParticles.length; t++) {
            var e = this.iconsParticles[t];
            e.t_xpos = range( - this.vpx, this.vpx),
            e.t_ypos = range( - this.vpy, this.vpy),
            e.f_xpos = e.f_xpos / this.lastScale5 * this.scale,
            e.f_ypos = e.f_ypos / this.lastScale5 * this.scale,
            e.t_width = e.t_width / this.lastScale5 * this.scale,
            e.t_zpos = -249
        }
    },
    this.dnaRotateSingle = function(t, e, i, s, n, a) {
        var r = e.ball_left,
        o = e.ball_right;
        this.roll(r, t, i, 0),
        this.roll(o, t, -i, 0),
        this.scalew(r, t, n, 1),
        this.scalew(o, t, n, -1);
        var h = r.getScreenXY();
        r.x = h.x,
        r.y = h.y;
        var h = o.getScreenXY();
        o.x = h.x,
        o.y = h.y,
        this.ctx.beginPath(),
        this.ctx.moveTo(this.canvas.width / 2 + r.x, this.canvas.height / 2 + r.y),
        this.ctx.lineTo(this.canvas.width / 2 + o.x, this.canvas.height / 2 + o.y),
        this.ctx.lineWidth = s,
        this.ctx.strokeStyle = a,
        this.ctx.stroke(),
        this.ctx.closePath()
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.initDnaList = function(t) {
        this.dnaList = [];
        for (var e = arr3,
        i = 20,
        s = 0; s < e.length; s++) {
            var n, a, r = e[s][2],
            o = i * r * this.scale,
            a = 59,
            h = 117;
            n = s <= 4 ? .5 : 0;
            var l = this.createDNA(e[s][0], e[s][1], o, a, h, e[s][3], n, t, r);
            l.scale = r,
            l.color = e[s][3],
            l.start_t = n,
            this.dnaList.push(l)
        }
    },
    this.resetDnaList = function() {
        var t = this;
        this.dnaList.forEach(function(e) {
            e.forEach(function(e) {
                t.stage.removeChild(e.ball_left),
                t.stage.removeChild(e.ball_right)
            })
        }),
        this.initDnaList(Math.PI + .06)
    },
    this.createDNA = function(t, e, i, s, n, a, r, o, h) {
        var l = [];
        n = n * h * this.scale;
        for (var c = 0; c < 7; c++) {
            var d = new this.createBall(this.stage, a, i, t * SOGOU.$func.scale, (e + s * c * h) * SOGOU.$func.scale, 0),
            f = new this.createBall(this.stage, a, i, t * SOGOU.$func.scale, (e + s * c * h) * SOGOU.$func.scale, 0);
            this.stage.addChild(d),
            this.stage.addChild(f);
            var u = d.getScreenXY();
            d.x = u.x,
            d.y = u.y;
            var u = f.getScreenXY();
            f.x = u.x,
            f.y = u.y,
            l[c] = {},
            l[c].ball_left = d,
            l[c].ball_right = f,
            d.start_t = .4 * c,
            f.start_t = .4 * c;
            var u = d.getScreenXY();
            d.x = u.x,
            d.y = u.y;
            var u = f.getScreenXY();
            f.x = u.x,
            f.y = u.y
        }
        SOGOU.$func.dnaRotate(r + o, l, n, 5 * h * SOGOU.$func.scale, 5 * h * SOGOU.$func.scale, a);
        for (var c = 0; c < 7; c++) if (!l[c].ball_connect) {
            var g = new SOGOU.$func.createBall(SOGOU.$func.stage, "#fff", 0, l[c].ball_left.xpos, l[c].ball_left.ypos, 0);
            g.f_xpos = l[c].ball_left.x,
            g.f_ypos = l[c].ball_left.y,
            g.t_xpos = l[c].ball_right.x,
            g.t_ypos = l[c].ball_right.y,
            l[c].ball_connect = g
        }
        return l
    },
    this.dnaRotate = function(t, e, i, s, n, a) {
        for (var r = 0; r < 7; r++) {
            var o = e[r].ball_left,
            h = e[r].ball_right;
            if (! (o.stop_t && t >= o.stop_t)) {
                o.stop || (this.roll(o, t, i, 0), this.scalew(o, t, n, 1)),
                h.stop || (this.roll(h, t, -i, 0), this.scalew(h, t, n, -1));
                var l = o.getScreenXY();
                o.x = l.x,
                o.y = l.y;
                var l = h.getScreenXY();
                h.x = l.x,
                h.y = l.y
            }
        }
    },
    this.connectDnaSlow = function(t, e, i, s, n, a, r) {
        for (var o = 0; o < 7; o++) {
            var h = i[o].ball_connect,
            l = i[o].ball_left;
            this.tween2(h, t, e, a, r);
            var c = h.getScreenXY();
            h.x = c.x,
            h.y = c.y,
            this.ctx.beginPath(),
            this.ctx.moveTo(this.canvas.width / 2 + l.x, this.canvas.height / 2 + l.y),
            this.ctx.lineTo(this.canvas.width / 2 + h.xpos, this.canvas.height / 2 + h.ypos),
            this.ctx.lineWidth = s,
            this.ctx.strokeStyle = n,
            this.ctx.stroke(),
            this.ctx.closePath()
        }
    },
    this.connectDna = function(t, e, i) {
        for (var s = 0; s < 7; s++) {
            var n = t[s].ball_left,
            a = t[s].ball_right;
            this.ctx.beginPath(),
            this.ctx.moveTo(this.canvas.width / 2 + n.x, this.canvas.height / 2 + n.y),
            this.ctx.lineTo(this.canvas.width / 2 + a.x, this.canvas.height / 2 + a.y),
            this.ctx.lineWidth = e,
            this.ctx.strokeStyle = i,
            this.ctx.stroke(),
            this.ctx.closePath()
        }
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.initMainDna = function() {
        this.dnaMainBalls = [];
        for (var t = SOGOU.$func.dna_main = SOGOU.$func.dnaList[5], e = Math.abs(t[0].ball_right.xpos + t[0].ball_left.xpos) / 2, i = Math.abs(t[0].ball_left.ypos + t[6].ball_left.ypos) / 2, s = 0; s < 7; s++) {
            var n = t[s].ball_left,
            a = t[s].ball_right;
            n.f_zpos = 0,
            n.t_zpos = 69,
            n.bi_width = a.bi_width = n.bi_w,
            n.f_xpos = n.xpos,
            n.f_ypos = n.ypos,
            n.t_xpos = n.xpos + e,
            n.t_ypos = n.ypos + i,
            a.f_xpos = a.xpos,
            a.f_ypos = a.ypos,
            a.t_xpos = a.xpos + e,
            a.t_ypos = a.ypos + i,
            a.f_zpos = 0,
            a.t_zpos = 69,
            n.step = 0,
            a.step = 0,
            this.dnaMainBalls.push(n),
            this.dnaMainBalls.push(a)
        }
    },
    this.resetDnaBallsOther = function() {
        this.dnaBallOthers = [];
        for (var t = 0; t < SOGOU.$func.dnaList.length; t++) if (5 != t) for (var e = SOGOU.$func.dnaList[t], i = 0; i < 7; i++) {
            var s = e[i].ball_left,
            n = e[i].ball_right;
            s.f_zpos = n.f_zpos = 0,
            s.t_zpos = n.t_zpos = -200,
            s.bi_width = s.width,
            n.bi_width = n.width,
            this.dnaBallOthers.push(s),
            this.dnaBallOthers.push(n)
        }
    },
    this.resetDnaBgBalls2 = function() {
        if (SOGOU.$func.dnaBgBalls) for (var t = 0; t < SOGOU.$func.dnaBgBalls.length; t++) {
            var e = SOGOU.$func.dnaBgBalls[t];
            e.f_zpos = 0,
            e.t_zpos = -300,
            delete e.f_width,
            e.bi_width = e.t_width,
            e.start_t = 0,
            e.step = 0
        }
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.drawArcSlow = function(t) {
        var e = t.ctx,
        i = t.x + this.canvas.width / 2,
        s = t.y + this.canvas.height / 2,
        n = t.t,
        a = t.T,
        r = t.r,
        o = t.line_weight,
        h = t.color,
        l = t.f_theta,
        c = t.t_theta,
        d = t.bezier;
        n > a && (n = a);
        var f = l + d(n / a) * (c - l);
        e.lineWidth = o,
        e.lineCap = "round",
        e.strokeStyle = h,
        e.moveTo(i, s),
        e.beginPath(),
        e.arc(i, s, r, l, f),
        this.ctx.stroke(),
        this.ctx.closePath()
    },
    this.resetDnaMain = function() {
        for (var t = 0; t < this.dnaMainBalls.length; t++) ball = this.dnaMainBalls[t],
        ball.t_xpos = ball.t_xpos / this.lastScale7 * this.scale,
        ball.t_ypos = ball.t_ypos / this.lastScale7 * this.scale,
        ball.f_xpos = ball.f_xpos / this.lastScale7 * this.scale,
        ball.f_ypos = ball.f_ypos / this.lastScale7 * this.scale,
        ball.xpos = ball.xpos / this.lastScale7 * this.scale,
        ball.ypos = ball.ypos / this.lastScale7 * this.scale,
        ball.bi_w = ball.bi_w / this.lastScale7 * this.scale,
        ball.bi_width = ball.bi_width / this.lastScale7 * this.scale,
        ball.bi_x = ball.bi_x / this.lastScale7 * this.scale,
        ball.bi_y = ball.bi_y / this.lastScale7 * this.scale,
        ball.width = ball.width / this.lastScale7 * this.scale
    }
}),
Laro.register("SOGOU.$func",
function(t) {
    this.resetLogoEnd = function() {
        logo_box = document.getElementById("logo_box"),
        logo_box.style.width = logo_box.style.height = 426 * SOGOU.$func.scale + "px",
        logo = document.getElementById("logo"),
        logo_sogou_wrap = document.getElementById("logo_sogou_wrap"),
        logo_sogou = document.getElementById("logo_sogou"),
        dl_btn = document.getElementById("dl_btn"),
        logo_sogou_wrap.style.width = 504 * SOGOU.$func.scale + "px",
        logo_sogou_wrap.style.height = Math.ceil(56 * SOGOU.$func.scale) + "px",
        logo_sogou_wrap.style.top = SOGOU.$func.canvas.height / 2 + 80 * SOGOU.$func.scale + "px",
        dl_btn.style.width = 200 * SOGOU.$func.scale + "px",
        dl_btn.style.height = 56 * SOGOU.$func.scale + "px",
        dl_btn.style.fontSize = 22 * SOGOU.$func.scale + "px",
        dl_btn.style.lineHeight = Math.max(56 * SOGOU.$func.scale, 13) + "px",
        dl_btn.style.borderRadius = 56 * SOGOU.$func.scale + "px",
        dl_btn.style.top = SOGOU.$func.canvas.height / 2 + 280 * SOGOU.$func.scale + "px"
    },
    this.resetRotateLogo = function() {
        this.circles[0].radius = 208.5 * this.scale
    },
    this.rotateX = function(t, e) {
        var i = Math.sqrt(t[2] * t[2] + t[1] * t[1]),
        s = Math.atan2(t[1], t[2]) + e;
        return [t[0], i * Math.sin(s), i * Math.cos(s)]
    },
    this.rotateY = function(t, e) {
        var i = Math.sqrt(t[2] * t[2] + t[0] * t[0]),
        s = Math.atan2(t[2], t[0]) + e;
        return [i * Math.cos(s), t[1], i * Math.sin(s)]
    },
    this.rotateZ = function(t, e) {
        var i = Math.sqrt(t[1] * t[1] + t[0] * t[0]),
        s = Math.atan2(t[1], t[0]) + e;
        return [i * Math.cos(s), i * Math.sin(s), t[2]]
    },
    this.loxo = function(t, e, i) {
        for (var s = [], n = 0; n < i; n++) {
            var a = Math.PI2 * n / i,
            r = Math.cos(a),
            o = Math.sin(a),
            h = .5 * Math.PI;
            h -= .5 * (r + 1) * e,
            s.push([t * r, t * o * Math.sin(h), t * o * Math.cos(h)])
        }
        return s
    },
    this.twistEasing = function(t) {
        return t < .5 ? 2 * t * t: 1 - 2 * (t = 1 - t) * t
    }
}),
Laro.register("SOGOU.$loop",
function(t) {
    this.init = function() {
        this.$ = new t.Loop(this.looper, this)
    },
    this.looper = function(t) {
        this.update(t),
        this.draw()
    },
    this.update = function(t) {
        SOGOU.$fsm.$.update(t)
    },
    this.draw = function() {
        SOGOU.$func.ctx.clearRect( - SOGOU.$func.canvas.width, -SOGOU.$func.canvas.height, 3 * SOGOU.$func.canvas.width, 3 * SOGOU.$func.canvas.height),
        SOGOU.$func.stage.render(),
        SOGOU.$fsm.$.draw()
    }
}),
Laro.register("SOGOU.$states",
function(t) {
    var e = 1.5,
    i = 1;
    this.logo = t.BaseState.extend(function() {}).methods({
        enter: function() {
            if (sogou.manager.lock(), "previous" == sogou.manager.from) this._t = e;
            else {
                SOGOU.$func.initParticlesLogo();
                for (var t = 0; t < SOGOU.$func.logoParticles.length; t++) {
                    var i = SOGOU.$func.logoParticles[t];
                    SOGOU.$func.stage.addChild(i)
                }
                this._t = 0
            }
        },
        leave: function() {},
        update: function(t) {
            this._t += t
        },
        transition: function() {
            this._t > e + i && sogou.manager.next(!0)
        },
        draw: function() {
            SOGOU.$func.rotateTranslate(this._t, e, SOGOU.$func.bezier2),
            this._t > 2 && SOGOU.$func.w1.classList.add("fadein")
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.breathe = t.BaseState.extend(function() {}).methods({
        enter: function() {
            this._t = 0,
            this.T = 1,
            SOGOU.$func.resetBallStartTime(SOGOU.$func.logoParticles),
            SOGOU.$func.w1.classList.remove("fadeout"),
            SOGOU.$func.w1.classList.add("fadein");
            for (var t = 0; t < SOGOU.$func.logoParticles.length; t++) ball = SOGOU.$func.logoParticles[t],
            SOGOU.$func.stage.addChild(ball);
            SOGOU.$func.resizeInstance(),
            sogou.manager.unlock()
        },
        leave: function() {
            for (var t = 0; t < SOGOU.$func.logoParticles.length; t++) ball = SOGOU.$func.logoParticles[t],
            ball.xpos = ball.bi_x,
            ball.ypos = ball.bi_y,
            delete ball.dx,
            delete ball.dy,
            delete ball.bi_x,
            delete ball.bi_y,
            SOGOU.$func.stage.removeChild(ball);
            SOGOU.$func.w1.classList.add("fadeout"),
            setTimeout(function() {
                SOGOU.$func.w1.classList.remove("fadein"),
                SOGOU.$func.w1.classList.remove("fadeout")
            },
            500)
        },
        update: function(t) {
            this._t += t
        },
        transition: function() {
            this._t > 6 && sogou.manager.auto && sogou.manager.next()
        },
        draw: function() {
            for (var t = 0; t < SOGOU.$func.logoParticles.length; t++) {
                var e = SOGOU.$func.logoParticles[t];
                SOGOU.$func.breathe(e, this._t),
                SOGOU.$func.vibrate(e, this._t);
                var i = e.getScreenXY();
                e.x = i.x,
                e.y = i.y
            }
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.expand = t.BaseState.extend(function() {}).methods({
        enter: function(t, e) {
            sogou.manager.lock(),
            this.state = 2,
            this.anim = {},
            this.anim.logo = [{
                from_time: 0,
                to_time: .5
            },
            {
                from_time: .5,
                to_time: 1
            }],
            this.anim.ball_head = [{
                from_time: .5,
                to_time: 1.5
            },
            {
                from_time: 1.5,
                to_time: null
            }],
            this.anim.ball_line = [{
                from_time: .5,
                to_time: 1.5
            },
            {
                from_time: 1.5,
                to_time: null
            }];
            var i = this.f = SOGOU.$func;
            this.f.w2.style.display = "block",
            "next" == SOGOU.manager.from && e <= this.state - 1 ? (this._t = 0, this.step = 0, i.initParticlesLogo(), i.resetBalls(), i.resetBallStartTime(i.logoParticles), this.direction = 1, SOGOU.$func.w2.classList.remove("slideright_back"), SOGOU.$func.w2.clientWidth, SOGOU.$func.w2.classList.add("slideright")) : "reverse" == SOGOU.manager.from && e == this.state ? (this._t = 1.5, this.direction = -1, i.initParticlesLogo(), SOGOU.$func.w2.classList.remove("slideright"), SOGOU.$func.w2.clientWidth, SOGOU.$func.w2.classList.add("slideright_back"), SOGOU.$func.resizeInstance()) : "previous" == SOGOU.manager.from && e == this.state + 1 && (this.direction = 1, this._t = 1.5, SOGOU.$func.w2.classList.remove("slideright_back"), SOGOU.$func.w2.clientWidth, SOGOU.$func.w2.classList.add("slideright"), SOGOU.$func.resizeInstance()),
            i.initBallHead(),
            i.initBallLine(),
            i.initLineArr(),
            this.f.stage.addChild(this.f.ball_line),
            this.f.stage.addChild(this.f.ball_head),
            i.resetEnd(i.logoParticles),
            i.resetEnd(i.ball_head),
            i.resetEnd(i.ball_line);
            for (var s = 0; s < SOGOU.$func.logoParticles.length; s++) ball = SOGOU.$func.logoParticles[s],
            SOGOU.$func.stage.addChild(ball)
        },
        leave: function() {
            for (var t = 0; t < SOGOU.$func.logoParticles.length; t++) ball = SOGOU.$func.logoParticles[t],
            SOGOU.$func.stage.removeChild(ball);
            if (this.f.line_arr) {
                for (var t = 0; t < this.f.line_arr.length; t++) this.f.stage.removeChild(this.f.line_arr[t]);
                delete this.f.line_arr
            }
            this.f.stage.removeChild(this.f.ball_line),
            this.f.stage.removeChild(this.f.ball_head),
            this.f.w2.style.display = "none"
        },
        update: function(t) {
            this.direction == -1 ? this.dt = t: this.dt = 0,
            this.dt = t,
            1 == this.direction ? this._t += t: this._t -= 2 * t
        },
        transition: function() {
            1 == this.direction ? this._t > 1.5 && (sogou.manager.unlock(), this._t > 6 && sogou.manager.auto && sogou.manager.next()) : this._t < -2 * this.dt && sogou.manager.previous()
        },
        draw: function() {
            for (var t = 0; t < this.f.logoParticles.length; t++) {
                var e = this.f.logoParticles[t];
                1 == e.end && (this.f.resetEnd(e), "next" == SOGOU.manager.from ? e.step = e.step + 1 <= 1 ? e.step - 1 : 1 : e.step = e.step - 1 >= 0 ? e.step - 1 : 0),
                0 == e.step ? this.f.tween(e, this._t - this.anim.logo[0].from_time, this.anim.logo[0].to_time - this.anim.logo[0].from_time, SOGOU.$func.bezier2, this.direction, e.step0) : this.f.tween(e, this._t - this.anim.logo[1].from_time, this.anim.logo[1].to_time - this.anim.logo[1].from_time, SOGOU.$func.bezier2, this.direction, e.step1);
                var i = e.getScreenXY();
                e.x = i.x,
                e.y = i.y
            }
            if (this._t >= this.anim.ball_head[0].from_time) {
                this.f.tween2(this.f.ball_head, this._t - this.anim.ball_head[0].from_time, this.anim.ball_head[0].to_time - this.anim.ball_head[0].from_time, SOGOU.$func.bezier6, this.direction);
                var i = this.f.ball_head.getScreenXY();
                this.f.ball_head.x = i.x,
                this.f.ball_head.y = i.y
            }
            if (this._t <= this.anim.ball_line[0].to_time && (this.f.ball_line.xpos = this.f.ball_head.xpos + this.f.canvas.width / 2 - this.f.ball_line.width, i = this.f.ball_line.getScreenXY(), this.f.ball_line.x = i.x, this.f.ball_line.y = i.y), this._t > this.anim.ball_line[1].from_time) {
                this.f.forwardAndBack(this.f.ball_head, this.f.canvas.width / 2 + 350 * this.f.scale, this.f.canvas.width / 2 + 500 * this.f.scale),
                this.f.bigAndSmall(this.f.ball_head);
                var i = this.f.ball_head.getScreenXY();
                if (this.f.ball_head.x = i.x, this.f.ball_head.y = i.y, this.f.ball_line.xpos = this.f.ball_head.xpos + this.f.canvas.width / 2 - this.f.ball_line.width, i = this.f.ball_line.getScreenXY(), this.f.ball_line.x = i.x, this.f.ball_line.y = i.y, this.f.line_arr) for (var t = 0; t < this.f.line_arr.length; t++) this.f.line_arr[t].end && (this.f.line_arr[t].end = !1, this.f.line_arr[t].start_t = this._t),
                this.f.tween(this.f.line_arr[t], this._t, range(.5, 5), SOGOU.$func.bezier1),
                i = this.f.line_arr[t].getScreenXY(),
                this.f.line_arr[t].x = i.x,
                this.f.line_arr[t].y = i.y
            }
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.roll = t.BaseState.extend(function() {}).methods({
        enter: function(t, e) {
            sogou.manager.lock();
            var i = this.f = SOGOU.$func;
            this.anim = {},
            this.anim.ballroll = [{
                from_time: 0,
                to_time: 1
            }],
            this.anim.iconball = [{
                from_time: .6,
                to_time: 2
            }],
            this.anim.words = [{
                from_time: 1,
                to_time: null
            }],
            i.ball_head || i.initBallHead();
            var s = this.ball_head_box = document.getElementById("ball_head_box"),
            n = (this.ball_head = document.getElementById("ball_head"), document.querySelector(".header")),
            a = document.querySelector(".down"),
            r = i.ball_head.width,
            o = i.ball_head.x - r,
            h = i.ball_head.y - r;
            if ("next" == SOGOU.manager.from) {
                this.direction = 1,
                this._t = 0,
                i.initParticlesIcons(),
                document.getElementById("ball_head_box").outerHTML = '<div id="ball_head_box" class="roll">                                                <div id="ball_head"></div>                                            </div>';
                var s = this.ball_head_box = document.getElementById("ball_head_box");
                s.style.left = i.canvas.width / 2 + o + "px",
                s.style.top = i.canvas.height / 2 + h + "px",
                s.style.width = 2 * r + "px",
                s.style.height = 2 * r + "px",
                s.style.display = "block",
                i.canvas.classList.remove("changebgblue_back"),
                i.canvas.clientWidth,
                i.canvas.classList.add("changebgblue"),
                setTimeout(function() {
                    n.classList.remove("before"),
                    n.clientWidth,
                    n.classList.add("after"),
                    a.classList.remove("before"),
                    a.clientWidth,
                    a.classList.add("after")
                },
                700)
            } else {
                if (i.iconsParticles) for (var l = 0; l < i.iconsParticles.length; l++) {
                    var c = i.iconsParticles[l];
                    c.t_xpos = c.xpos,
                    c.t_ypos = c.ypos
                }
                i.initParticlesIcons(),
                this.direction = -1,
                this._t = 1.6;
                var o = i.canvas.width / 2 + o + "px",
                h = i.canvas.height / 2 + h + "px",
                d = 2 * r + "px",
                f = 2 * r + "px";
                document.getElementById("ball_head_box").outerHTML = '<div id="ball_head_box" class="roll_back" style="width: ' + d + ";left:" + o + ";top:" + h + ";height:" + f + '">                                                <div id="ball_head"></div>                                            </div>';
                var s = this.ball_head_box = document.getElementById("ball_head_box");
                s.style.display = "block",
                i.canvas.classList.remove("changebgblue"),
                i.canvas.clientWidth,
                i.canvas.classList.add("changebgblue_back"),
                SOGOU.$func.resizeInstance(),
                setTimeout(function() {
                    n.classList.remove("after"),
                    n.clientWidth,
                    n.classList.add("before"),
                    a.classList.remove("after"),
                    a.clientWidth,
                    a.classList.add("before")
                },
                700)
            }
            i.resetEnd(i.iconsParticles)
        },
        leave: function() {},
        update: function(t) {
            if (this.dt = t, 1 == this.direction ? this._t += t: this._t -= t, this._t >= this.anim.iconball[0].from_time) for (var e = 0; e < this.f.iconsParticles.length; e++) {
                var i = this.f.iconsParticles[e],
                s = i.getScale();
                i.width = i.t_width * s
            }
        },
        transition: function() {
            1 == this.direction ? this._t > 2 && sogou.manager.next(!0) : this._t <= -this.dt && (this.ball_head_box.style.display = "none", sogou.manager.previous())
        },
        draw: function() {
            if (this._t >= this.anim.iconball[0].from_time) for (var t = 0; t < this.f.iconsParticles.length; t++) {
                var e = this.f.iconsParticles[t];
                0 == t && (e.index = 0),
                this.f.tween2(e, this._t - this.anim.iconball[0].from_time, this.anim.iconball[0].to_time - this.anim.iconball[0].from_time, SOGOU.$func.bezier1, this.direction);
                var i = e.getScreenXY();
                e.x = i.x,
                e.y = i.y
            }
            1 == this.direction && (this._t > this.anim.words[0].from_time ? (this.ball_head_box.style.display = "none", this.f.w3.classList.remove("fadeout"), this.f.w3.clientWidth, this.f.w3.classList.add("fadein")) : this.ball_head_box.style.display = "block")
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.vibrate = t.BaseState.extend(function() {}).methods({
        enter: function(t, e) {
            if (sogou.manager.lock(), this.T = 1, this.state = 4, "next" == SOGOU.manager.from) this.direction = 1;
            else {
                if ("reverse" == SOGOU.manager.from && e == this.state) return this.direction = -1,
                void sogou.manager.previous();
                "previous" == SOGOU.manager.from && e == this.state + 1
            }
            this._t = 0;
            for (var i = 0; i < SOGOU.$func.iconsParticles.length; i++) {
                var s = SOGOU.$func.iconsParticles[i];
                s.outer && (s.step = 0)
            }
            sogou.manager.unlock(),
            SOGOU.$func.resizeInstance()
        },
        leave: function() {
            SOGOU.$func.w3.classList.add("fadeout"),
            setTimeout(function() {
                SOGOU.$func.w3.classList.remove("fadein"),
                SOGOU.$func.w3.classList.remove("fadeout")
            },
            500)
        },
        update: function(t) {
            this._t += t
        },
        transition: function() {
            1 == this.direction && this._t > 3 && sogou.manager.auto && sogou.manager.next()
        },
        draw: function() {
            for (var t = 0; t < SOGOU.$func.iconsParticles.length; t++) {
                var e = SOGOU.$func.iconsParticles[t];
                e.outer ? SOGOU.$func.vibratePart2(e, this._t) : SOGOU.$func.vibratePart2(e, this._t, .15),
                e.zpos = 0,
                pos = e.getScreenXY(),
                e.x = pos.x,
                e.y = pos.y
            }
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.disperse = t.BaseState.extend(function() {}).methods({
        enter: function(t, e) {
            sogou.manager.lock(),
            this.T = 1;
            var i = this.f = SOGOU.$func;
            if (this.dnaList = [], this.state = 5, this.anim = [], this.anim.dnaBalls = [{
                from_time: .7,
                to_time: 1.7
            }], this.anim.iconBalls = [{
                from_time: 0,
                to_time: 1.2
            }], this.anim.dnaBgBalls = [{
                from_time: .7,
                to_time: 1.7
            }], "next" == SOGOU.manager.from && e <= this.state - 1) {
                if (this.direction = 1, this._t = 0, i.iconsParticles) for (var s = 0; s < i.iconsParticles.length; s++) {
                    var n = i.iconsParticles[s];
                    n.f_xpos = n.xpos,
                    n.t_xpos = range( - i.vpx, i.vpx),
                    n.f_ypos = n.ypos,
                    n.t_ypos = range( - i.vpy, i.vpy),
                    n.f_zpos = 0,
                    n.t_zpos = -300
                }
                i.initDnaBalls(),
                setTimeout(function() {
                    for (var t = 0; t < i.dnaBalls.length; t++) i.stage.addChild(i.dnaBalls[t]);
                    for (var t = 0; t < i.dnaBgBalls.length; t++) i.stage.addChild(i.dnaBgBalls[t])
                },
                600)
            } else if ("reverse" == SOGOU.manager.from && e == this.state) {
                if (this.direction = -1, this._t = 2.5, SOGOU.$func.resizeInstance(), this.f.dnaBalls) for (var s = 0; s < this.f.dnaBalls.length; s++) this.f.stage.addChild(this.f.dnaBalls[s]);
                for (var s = 0; s < this.f.dnaBgBalls.length; s++) this.f.stage.addChild(this.f.dnaBgBalls[s])
            } else if ("previous" == SOGOU.manager.from && e == this.state + 1) {
                if (this.direction = -1, this._t = 2.5, SOGOU.$func.resizeInstance(), this.f.dnaBalls) for (var s = 0; s < this.f.dnaBalls.length; s++) this.f.stage.addChild(this.f.dnaBalls[s]);
                for (var s = 0; s < this.f.dnaBgBalls.length; s++) this.f.stage.addChild(this.f.dnaBgBalls[s])
            }
            i.initDnaBgBalls(),
            i.resetEnd(i.iconsParticles),
            i.resetEnd(i.dnaBalls),
            i.resetEnd(i.dnaBgBalls)
        },
        leave: function() {
            if (this.f.dnaBalls) for (var t = 0; t < this.f.dnaBalls.length; t++) this.f.stage.removeChild(this.f.dnaBalls[t]);
            if (SOGOU.$func.dnaBgBalls) for (var t = 0; t < SOGOU.$func.dnaBgBalls.length; t++) {
                var e = SOGOU.$func.dnaBgBalls[t];
                SOGOU.$func.stage.removeChild(e)
            }
            1 == this.direction && (SOGOU.$func.lastScale5 = SOGOU.$func.scale)
        },
        update: function(t) {
            if (1 == this.direction ? this._t += t: this._t -= 2 * t, this.f.iconsParticles) for (var e = 0; e < this.f.iconsParticles.length; e++) {
                var i = this.f.iconsParticles[e],
                s = i.getScale();
                i.width = Math.max(i.t_width * s, 0)
            }
        },
        transition: function() {
            this.direction == -1 && this._t < 1 && (SOGOU.$func.w3.classList.remove("fadeout"), SOGOU.$func.w3.clientWidth, SOGOU.$func.w3.classList.add("fadein"))
        },
        draw: function() {
            if (this._t < this.anim.dnaBalls[0].from_time) for (var t = 0; t < this.f.dnaBalls.length; t++) {
                var e = this.f.dnaBalls[t];
                e.width = 0
            }
            if (this._t >= this.anim.dnaBalls[0].from_time) for (var t = 0; t < this.f.dnaBalls.length; t++) {
                var e = this.f.dnaBalls[t];
                this.f.tween2(e, this._t - this.anim.dnaBalls[0].from_time, this.anim.dnaBalls[0].to_time - this.anim.dnaBalls[0].from_time, this.f.bezier2, this.direction, e);
                var i = e.getScreenXY();
                e.x = i.x,
                e.y = i.y,
                e.end && 0 == t && 1 == this.direction && sogou.manager.next(!0)
            }
            if (this._t < this.anim.dnaBgBalls[0].from_time) for (var t = 0; t < this.f.dnaBgBalls.length; t++) {
                var e = this.f.dnaBgBalls[t];
                e.width = 0
            } else for (var t = 0; t < this.f.dnaBgBalls.length; t++) {
                var e = this.f.dnaBgBalls[t];
                this.f.tween2(e, this._t - this.anim.dnaBgBalls[0].from_time, this.anim.dnaBgBalls[0].to_time - this.anim.dnaBgBalls[0].from_time, this.f.bezier1, this.direction, e);
                var i = e.getScreenXY();
                e.x = i.x,
                e.y = i.y
            }
            if (this.f.iconsParticles) for (var t = 0; t < this.f.iconsParticles.length; t++) {
                var e = this.f.iconsParticles[t];
                this.f.tween2(e, this._t, this.anim.iconBalls[0].to_time - this.anim.iconBalls[0].from_time, this.f.bezier1, this.direction, e);
                var i = e.getScreenXY();
                e.x = i.x,
                e.y = i.y,
                e.end && t == this.f.iconsParticles.length - 1 && this.direction == -1 && sogou.manager.previous()
            }
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.dna = t.BaseState.extend(function() {}).methods({
        enter: function(t, e) {
            if (sogou.manager.lock(), this.init_t = Math.PI + .06, this.last_t = t, document.body.style.perspective = "none", this.anim = [], this.anim.dnaConnectLine = [{
                from_time: 0,
                to_time: .15
            }], this.anim.dnaRotate = [{
                from_time: .15,
                to_time: null
            }], this.state = 6, this.from_next = !1, this.dnastop = !1, this.fromState = e, "next" == SOGOU.manager.from) e == this.state ? this._t = .15 : this._t = 0,
            this.direction = 1,
            SOGOU.$func.initDnaList(this.init_t),
            e <= this.state - 1 && (SOGOU.$func.w4.classList.remove("rotateout"), SOGOU.$func.w4.clientWidth, this.timer && clearTimeout(this.timer), SOGOU.$func.w4.classList.add("rotatein"));
            else if ("reverse" == SOGOU.manager.from && e == this.state) {
                this.direction = -1,
                SOGOU.$func.globalT = this.stop_t = this.last_t,
                this.stop_t = this.stop_t % 2,
                this._t = this.stop_t + 2 - (this.init_t - this.anim.dnaRotate[0].from_time),
                this._t = this._t > this.anim.dnaRotate[0].from_time ? this._t: this._t + 2;
                for (var i = 0; i < SOGOU.$func.dnaList.length; i++) for (var s = SOGOU.$func.dnaList[i], n = 0; n < 7; n++) {
                    var a = s[n].ball_left,
                    r = s[n].ball_right;
                    SOGOU.$func.stage.addChild(a),
                    SOGOU.$func.stage.addChild(r)
                }
            } else if ("previous" == SOGOU.manager.from && e == this.state + 1) {
                this.direction = -1,
                this.from_next = !0,
                SOGOU.$func.globalT = this.stop_t = this.last_t,
                this.stop_t = this.stop_t % 2,
                this._t = this.stop_t + 2 - (this.init_t - this.anim.dnaRotate[0].from_time),
                this._t = this._t > this.anim.dnaRotate[0].from_time ? this._t: this._t + 2;
                for (var i = 0; i < SOGOU.$func.dnaList.length; i++) for (var s = SOGOU.$func.dnaList[i], n = 0; n < 7; n++) {
                    var a = s[n].ball_left,
                    r = s[n].ball_right;
                    SOGOU.$func.stage.addChild(a),
                    SOGOU.$func.stage.addChild(r)
                }
            }
            if (SOGOU.$func.dnaBgBalls) for (var i = 0; i < SOGOU.$func.dnaBgBalls.length; i++) {
                var o = SOGOU.$func.dnaBgBalls[i];
                SOGOU.$func.stage.addChild(o)
            }
        },
        leave: function() {
            document.body.style.perspective = "700px";
            for (var t = 0; t < SOGOU.$func.dnaList.length; t++) for (var e = SOGOU.$func.dnaList[t], i = 0; i < 7; i++) {
                var s = e[i].ball_left,
                n = e[i].ball_right;
                SOGOU.$func.stage.removeChild(s),
                SOGOU.$func.stage.removeChild(n)
            }
            if (SOGOU.$func.dnaBgBalls) for (var t = 0; t < SOGOU.$func.dnaBgBalls.length; t++) {
                var a = SOGOU.$func.dnaBgBalls[t];
                SOGOU.$func.stage.removeChild(a)
            }
            1 == this.direction && (SOGOU.$func.w4.classList.add("rotateout"), this.timer = setTimeout(function() {
                SOGOU.$func.w4.classList.remove("rotatein")
            },
            500)),
            1 == this.direction && (SOGOU.$func.lastScale7 = SOGOU.$func.scale)
        },
        update: function(t) {
            this.dt = t,
            1 == this.direction ? this._t += t: this._t -= t
        },
        transition: function() {
            1 == this.direction && this._t > .15 && sogou.manager.unlock(),
            this._t > 4 && 1 == this.direction && sogou.manager.auto && sogou.manager.next(!0, this.stop_t),
            this.dnastop || this._t < -this.dt && this.direction == -1 && (this.dnastop = !0, sogou.manager.previous())
        },
        draw: function() {
            this._t;
            if (1 == this.direction && this.fromState != this.state && this._t < this.anim.dnaConnectLine[0].to_time) {
                var t = this;
                SOGOU.$func.dnaList.forEach(function(e) {
                    SOGOU.$func.connectDnaSlow(t._t, t.anim.dnaConnectLine[0].to_time - t.anim.dnaConnectLine[0].from_time, e, 5 * e.scale * SOGOU.$func.scale, e.color, SOGOU.$func.bezier1, this.direction)
                })
            }
            if (SOGOU.$func.dnaBgBalls) for (var e = 0; e < SOGOU.$func.dnaBgBalls.length; e++) {
                var i = SOGOU.$func.dnaBgBalls[e];
                SOGOU.$func.vibratePart2(i, this._t, .5),
                pos = i.getScreenXY(),
                i.x = pos.x,
                i.y = pos.y
            }
            this._t >= this.anim.dnaRotate[0].from_time ? (start_t = this._t + this.init_t - this.anim.dnaRotate[0].from_time, SOGOU.manager.globalT = this.stop_t = start_t, SOGOU.$func.dnaList.forEach(function(t, e) {
                SOGOU.$func.dnaRotate(start_t + t.start_t, t, 117 * t.scale * SOGOU.$func.scale, 5 * t.scale * SOGOU.$func.scale, 5 * t.scale * SOGOU.$func.scale, t.color),
                SOGOU.$func.connectDna(t, 5 * t.scale * SOGOU.$func.scale, t.color)
            })) : this.from_next && (SOGOU.manager.from = "next", sogou.$fsm.setState(this.state))
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.dnaleave = t.BaseState.extend(function() {}).methods({
        enter: function(t, e) {
            if (sogou.manager.lock(), document.body.style.perspective = "none", this.anim = [], this.anim.dnaMainBalls = [{
                from_time: 0,
                to_time: .5
            },
            {
                from_time: .5,
                to_time: null
            }], this.anim.dnaBgBalls = [{
                from_time: 0,
                to_time: .5
            }], this.anim.dnaBallOthers = [{
                from_time: 0,
                to_time: .3
            }], this.state = 7, this.T = .5, "next" == SOGOU.manager.from && e <= this.state - 1 ? (this.direction = 1, this.last_t = t, this._t = 0, SOGOU.$func.initMainDna(), SOGOU.$func.resetDnaBallsOther()) : "reverse" == SOGOU.manager.from && e == this.state ? (this.direction = -1, this.last_t = t - this.T, this._t = this.T, SOGOU.$func.resizeInstance()) : "previous" == SOGOU.manager.from && e == this.state + 1 && (this.direction = -1, this.last_t = t - this.T, this._t = this.T, SOGOU.$func.resizeInstance(), SOGOU.$func.w4.classList.remove("rotateout"), SOGOU.$func.w4.clientWidth, SOGOU.$func.w4.classList.add("rotatein")), this.flag = !0, SOGOU.$func.resetDnaBgBalls2(), SOGOU.$func.dnaBgBalls) for (var i = 0; i < SOGOU.$func.dnaBgBalls.length; i++) {
                var s = SOGOU.$func.dnaBgBalls[i];
                SOGOU.$func.stage.addChild(s)
            }
            for (var i = 0; i < SOGOU.$func.dnaList.length; i++) for (var n = SOGOU.$func.dnaList[i], a = 0; a < 7; a++) {
                var r = n[a].ball_left,
                o = n[a].ball_right;
                SOGOU.$func.stage.addChild(r),
                SOGOU.$func.stage.addChild(o)
            }
            SOGOU.$func.resetEnd(SOGOU.$func.dnaBgBalls),
            SOGOU.$func.resetEnd(SOGOU.$func.dnaBallOthers),
            SOGOU.$func.resetEnd(SOGOU.$func.dnaMainBalls)
        },
        leave: function() {
            if (document.body.style.perspective = "700px", SOGOU.$func.dnaBgBalls) for (var t = 0; t < SOGOU.$func.dnaBgBalls.length; t++) {
                var e = SOGOU.$func.dnaBgBalls[t];
                SOGOU.$func.stage.removeChild(e)
            }
            for (var t = 0; t < SOGOU.$func.dnaList.length; t++) for (var i = SOGOU.$func.dnaList[t], s = 0; s < 7; s++) {
                var n = i[s].ball_left,
                a = i[s].ball_right;
                SOGOU.$func.stage.removeChild(n),
                SOGOU.$func.stage.removeChild(a)
            }
            for (var t = 0; t < SOGOU.$func.dnaMainBalls.length; t += 2) {
                var n = SOGOU.$func.dnaMainBalls[t],
                a = SOGOU.$func.dnaMainBalls[t + 1];
                n.end = a.end = !0
            }
        },
        update: function(t) {
            this.dt = t,
            1 == this.direction ? this._t += 2 * t: this._t -= 3 * t;
            for (var e = 0; e < SOGOU.$func.dnaMainBalls.length; e += 2) {
                var i = SOGOU.$func.dnaMainBalls[e],
                s = SOGOU.$func.dnaMainBalls[e + 1],
                n = i.getScale();
                s.bi_w = i.bi_w = i.bi_width * n
            }
            for (var e = 0; e < SOGOU.$func.dnaBallOthers.length; e++) {
                var a = SOGOU.$func.dnaBallOthers[e],
                n = a.getScale();
                a.width = a.bi_width * n < 0 ? 0 : a.bi_width * n
            }
            if (SOGOU.$func.dnaBgBalls) for (var e = 0; e < SOGOU.$func.dnaBgBalls.length; e++) {
                var a = SOGOU.$func.dnaBgBalls[e],
                n = a.getScale();
                a.width = a.bi_width * n < 0 ? 0 : a.bi_width * n
            }
        },
        transition: function() {
            this._t <= -this.dt && sogou.manager.previous(!0, this.last_t),
            this._t > this.T && sogou.manager.next(!0, this.last_t + this.T)
        },
        draw: function() {
            for (var t = this._t,
            e = SOGOU.$func.dnaMainBalls,
            i = 0; i < e.length; i += 2) {
                var s = e[i],
                n = e[i + 1];
                SOGOU.$func.tween2(s, t + s.start_t, this.anim.dnaMainBalls[0].to_time - this.anim.dnaMainBalls[0].from_time, SOGOU.$func.bezier3, this.direction),
                SOGOU.$func.tween2(n, t + n.start_t, this.anim.dnaMainBalls[0].to_time - this.anim.dnaMainBalls[0].from_time, SOGOU.$func.bezier3, this.direction);
                var a = s.getScreenXY();
                s.x = a.x,
                s.y = a.y;
                var a = n.getScreenXY();
                if (n.x = a.x, n.y = a.y, 1 == s.end && this.direction == -1 && ("next" == SOGOU.manager.from ? s.step = s.step + 1 <= 1 ? s.step - 1 : 1 : s.step = s.step - 1 >= 0 ? s.step - 1 : 0), 0 == s.step) {
                    var r = (e[i].xpos + e[i + 1].xpos) / 2;
                    n.bi_x = s.bi_x = r
                } else if (i >= e.length - 2 && (this.stop_t = this.last_t + this._t, this.flag)) {
                    this.flag = !1;
                    for (var i = 0; i < e.length; i += 2) {
                        var s = e[i],
                        n = e[i + 1],
                        o = s.getScale();
                        n.bi_w = s.bi_w = s.bi_w * o,
                        s.end = n.end = !0,
                        this.direction == -1
                    }
                }
            }
            if (SOGOU.$func.dnaBgBalls) for (var i = 0; i < SOGOU.$func.dnaBgBalls.length; i++) {
                var h = SOGOU.$func.dnaBgBalls[i];
                SOGOU.$func.tween2(h, t, this.anim.dnaBgBalls[0].to_time - this.anim.dnaBgBalls[0].from_time, SOGOU.$func.bezier3, this.direction);
                var a = h.getScreenXY();
                h.x = a.x,
                h.y = a.y
            }
            this.stop_t = this.last_t + this._t,
            SOGOU.$func.dnaRotate(this.last_t + this._t, SOGOU.$func.dna_main, 117 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, 5 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, 5 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, SOGOU.$func.dna_main.color);
            for (var i = 0; i < e.length; i += 2) var s = e[i],
            n = e[i + 1];
            for (var l = SOGOU.$func.dnaBallOthers,
            i = 0; i < l.length; i++) {
                var h = l[i];
                SOGOU.$func.tween2(h, t + h.start_t, this.anim.dnaBallOthers[0].to_time - this.anim.dnaBallOthers[0].from_time, SOGOU.$func.bezier2, this.direction);
                var a = h.getScreenXY();
                h.x = a.x,
                h.y = a.y
            }
            SOGOU.$func.dnaList.forEach(function(t) {
                SOGOU.$func.connectDna(t, 5 * t.scale * SOGOU.$func.scale, t.color)
            })
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.dna2circle = t.BaseState.extend(function() {}).methods({
        enter: function(t, e) {
            if (this.state = 8, sogou.manager.lock(), this.circle_head_h = 246 * SOGOU.$func.scale, this.down = document.querySelector(".down"), "next" == SOGOU.manager.from && e <= this.state - 1) {
                this.direction = 1,
                this._t = 0,
                this.last_t = t,
                this.step = 0,
                this.stop_index = 0;
                for (var i = 0; i < SOGOU.$func.dna_main.length; i++) {
                    var s = SOGOU.$func.dna_main[i].ball_left;
                    SOGOU.$func.stage.addChild(s),
                    s = SOGOU.$func.dna_main[i].ball_right,
                    SOGOU.$func.stage.addChild(s)
                }
                this.down.classList.remove("fadein"),
                this.down.clientWidth,
                this.down.classList.add("fadeout"),
                _this = this,
                setTimeout(function() {
                    _this.down.style.display = "none"
                },
                500)
            } else "reverse" == SOGOU.manager.from && e == this.state ? (this.direction = -1, this._t = t, this.step = 2, SOGOU.$func.resizeInstance()) : "previous" == SOGOU.manager.from && e == this.state + 1 && (this.direction = -1, SOGOU.$func.resizeInstance())
        },
        leave: function() {
            if (this.direction == -1) for (var t = 0; t < SOGOU.$func.dna_main.length; t++) {
                var e = SOGOU.$func.dna_main[t].ball_left;
                SOGOU.$func.stage.removeChild(e),
                e = SOGOU.$func.dna_main[t].ball_right,
                SOGOU.$func.stage.removeChild(e)
            }
        },
        update: function(t) {
            1 == this.direction ? this._t += 2 * t: this._t -= 2 * t
        },
        transition: function() {
            if (this.direction == -1 && this._t < 0) {
                sogou.manager.previous(!0, this.last_t);
                document.querySelector(".down");
                this.down.classList.remove("fadeout"),
                this.down.style.display = "block",
                this.down.clientWidth,
                this.down.classList.add("fadein");
                var t = this;
                setTimeout(function() {
                    t.down.classList.remove("fadein")
                },
                1e3)
            }
        },
        draw: function() {
            var t = this._t,
            e = SOGOU.$func.ctx;
            if (0 == this.step && (SOGOU.$func.dnaRotate(this.last_t + this._t, SOGOU.$func.dna_main, 117 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, 5 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, 5 * SOGOU.$func.dna_main.scale * SOGOU.$func.scale, SOGOU.$func.dna_main.color), SOGOU.$func.dnaList.forEach(function(t) {
                SOGOU.$func.connectDna(t, 5 * t.scale * SOGOU.$func.scale, t.color)
            }), 1 == this.direction)) for (var i = 0; i < SOGOU.$func.dna_main.length; i++) if (ball_left = SOGOU.$func.dna_main[i].ball_left, ball_right = SOGOU.$func.dna_main[i].ball_right, Math.abs(parseInt(ball_left.xpos)) <= Math.ceil(6 / SOGOU.$func.scale) && this.stop_index == i) {
                ball_left.xpos = 0,
                ball_right.xpos = 0;
                var s = ball_left.getScreenXY();
                ball_left.x = s.x,
                ball_left.y = s.y,
                s = ball_right.getScreenXY(),
                ball_right.x = s.x,
                ball_right.y = s.y,
                ball_left.stop = !0,
                ball_right.stop = !0,
                ball_right.stop_t || (ball_right.stop_t = ball_left.stop_t = this.last_t + this._t),
                this.stop_index++,
                7 == this.stop_index && this.step++
            }
            if (1 == this.step) if (1 == this.direction) {
                for (var i = 0; i < SOGOU.$func.dna_main.length; i++) {
                    var n = SOGOU.$func.dna_main[i].ball_left;
                    SOGOU.$func.stage.removeChild(n),
                    n = SOGOU.$func.dna_main[i].ball_right,
                    SOGOU.$func.stage.removeChild(n)
                }
                this.start_t = this._t,
                this.step++
            } else {
                for (var i = 0; i < SOGOU.$func.dna_main.length; i++) {
                    var n = SOGOU.$func.dna_main[i].ball_left;
                    n.stop = !1;
                    var s = n.getScreenXY();
                    n.x = s.x,
                    n.y = s.y,
                    SOGOU.$func.stage.addChild(n),
                    n = SOGOU.$func.dna_main[i].ball_right,
                    n.stop = !1;
                    var s = n.getScreenXY();
                    n.x = s.x,
                    n.y = s.y,
                    SOGOU.$func.stage.addChild(n)
                }
                this.step--
            }
            if (2 == this.step) {
                var a = 1,
                r = 40 * SOGOU.$func.scale,
                o = 31 * SOGOU.$func.scale,
                t = this._t - this.start_t,
                h = SOGOU.$func.linear(t, a, o, 1),
                l = r - h;
                SOGOU.$func.drawArcSlow({
                    ctx: SOGOU.$func.ctx,
                    x: 0,
                    y: 0,
                    t: t,
                    T: a,
                    r: 213 * SOGOU.$func.scale - (r - o) / 2,
                    line_weight: l,
                    color: "#fff",
                    f_theta: Math.PI / 2,
                    t_theta: 2.5 * Math.PI,
                    bezier: SOGOU.$func.bezier3
                }),
                1 == this.direction && t > a ? sogou.manager.next(!0, this._t) : this.direction == -1 && t <= 0 && this.step--;
                var c = this.circle_head_h - SOGOU.$func.linear(t, a, this.circle_head_h, 1),
                d = c / 4,
                f = radius = 208.5 * SOGOU.$func.scale;
                SOGOU.$func.ctx.translate(.5 * SOGOU.$func.canvas.width, .5 * SOGOU.$func.canvas.height),
                e.lineWidth = l,
                e.strokeStyle = "#fff";
                for (var i = 0; i < 4; i++) {
                    if (t > a / 5) {
                        e.lineCap = "flat";
                        var u = f - i * d
                    } else {
                        e.lineCap = "round";
                        var u = f - i * d - l
                    }
                    var g = f - (i + 1) * d;
                    if (u < g) break;
                    e.beginPath(),
                    e.moveTo(0, u),
                    e.lineTo(0, g),
                    e.stroke(),
                    e.closePath()
                }
                SOGOU.$func.ctx.translate(.5 * -SOGOU.$func.canvas.width, .5 * -SOGOU.$func.canvas.height)
            }
        }
    })
}),
Laro.register("SOGOU.$states",
function(t) {
    this.rotatelogo = t.BaseState.extend(function() {}).methods({
        enter: function(t, e) {
            sogou.manager.lock(),
            this.state = 9;
            var i = 208.5 * SOGOU.$func.scale;
            if (SOGOU.manager.globalT = this.last_t = t, SOGOU.$func.circles = [{
                color: "#fff",
                radius: i,
                angle: Math.PI / 2
            }], this.segmentsPerCircle = 400, this.speed = 1, this.angleOffset = 0, this.angleOffsetGoal = 0, this.logo_box = document.getElementById("logo_box"), this.logo = document.getElementById("logo"), this.dl_btn = document.getElementById("dl_btn"), this.logo_sogou_wrap = document.getElementById("logo_sogou_wrap"), this.top = document.querySelector("#top"), "next" == SOGOU.manager.from && e <= this.state - 1) this.direction = 1,
            this._t = 0;
            else if ("reverse" == SOGOU.manager.from && e == this.state) {
                this.direction = -1,
                this._t = this.T,
                document.querySelector(".fixed_footer").classList.remove("show_footer"),
                this.top.classList.add("fadeout");
                var s = this;
                setTimeout(function() {
                    s.top.classList.remove("fadeout"),
                    s.top.classList.remove("fadein")
                },
                500)
            } else "previous" == SOGOU.manager.from && e == this.state + 1;
            this.stop = !1,
            this.stop_back = !1,
            this.stop2 = !1,
            sogou.$loop.$.resume()
        },
        leave: function() {},
        update: function(t) {
            1 == this.direction ? this._t += t: this._t -= 3 * t
        },
        transition: function() {},
        draw: function() {
            SOGOU.$func.ctx.translate(.5 * SOGOU.$func.canvas.width, .5 * SOGOU.$func.canvas.height);
            var t = 1e3 * this._t,
            e = SOGOU.$func.ctx,
            i = SOGOU.$func.circles,
            s = this.segmentsPerCircle,
            n = this.speed;
            Math.PI2 = 2 * Math.PI;
            var a = (SOGOU.$func.loxo, SOGOU.$func.rotateX),
            r = SOGOU.$func.rotateY,
            o = SOGOU.$func.rotateZ;
            if (this.angleOffset += .1 * (this.angleOffsetGoal - this.angleOffset), this.direction == -1 && !this.stop) {
                this.stop = !0;
                var h = this;
                h.dl_btn.classList.remove("dlfadein"),
                h.dl_btn.clientWidth,
                h.dl_btn.classList.add("dlfadein_back"),
                setTimeout(function() {
                    h.logo_sogou_wrap.innerHTML = '<div id="logo_sogou" class="write_back"></div>',
                    setTimeout(function() {
                        h.logo_sogou_wrap.style.display = "none"
                    },
                    1e3)
                },
                250),
                setTimeout(function() {
                    h.logo.classList.remove("slideup"),
                    h.logo.clientWidth
                },
                500),
                setTimeout(function() {
                    h.logo_box.classList.remove("fadein"),
                    h.logo_box.clientWidth,
                    h.logo_box.classList.add("fadeout"),
                    h.stop_back = !0,
                    h.dl_btn.classList.remove("dlfadein_back")
                },
                750)
            }
            if (.001 * t * n < Math.PI && t > 0) var t = .001 * t * n % Math.PI;
            if (1 == this.direction && this.stop || this.direction == -1 && !this.stop_back) return void SOGOU.$func.ctx.translate(.5 * -SOGOU.$func.canvas.width, .5 * -SOGOU.$func.canvas.height);
            if (t >= Math.PI) var t = Math.PI;
            else if (t <= 0) var t = 0;
            if (this.direction == -1 && 0 == t) return SOGOU.$func.ctx.translate(.5 * -SOGOU.$func.canvas.width, .5 * -SOGOU.$func.canvas.height),
            void sogou.manager.previous(!0, SOGOU.manager.globalT);
            SOGOU.$func.ctx.lineCap = "round",
            SOGOU.$func.ctx.lineWidth = 9 * SOGOU.$func.scale;
            var l, c, d, f, u = -t - .5 * Math.PI,
            g = .5 * Math.PI * Math.cos(t),
            p = SOGOU.$func.twistEasing(.5 * (Math.cos(2 * t + Math.PI) + 1)),
            _ = 2 * p * Math.PI2,
            v = 2 * t > Math.PI ? 1 : -1,
            m = [];
            for (l = 0, c = i.length; l < c; l++) {
                var O = SOGOU.$func.loxo(i[l].radius, _, s);
                for ((!this.x || this.x < 10) && (this.x = this.x ? ++this.x: 1), d = 0, f = s; d < f; d++) O[d] = a(O[d], i[l].angle * (1 - p) * v),
                O[d] = r(o(r(O[d], u), g), Math.PI / 2);
                m.push(O)
            }
            for (l = i.length - 1; l >= 0; l--) {
                for (e.strokeStyle = i[l].color, e.beginPath(), d = 0, f = s; d < f; d++) {
                    var S = m[l][d];
                    if (! (S[2] < 0)) {
                        var x = m[l][0 == d ? f - 1 : d - 1];
                        e.moveTo(x[0], x[1]),
                        e.lineTo(S[0], S[1])
                    }
                }
                e.stroke()
            }
            for (l = 0, c = i.length; l < c; l++) {
                for (e.strokeStyle = i[l].color, e.beginPath(), d = 0, f = s; d < f; d++) {
                    var S = m[l][d];
                    if (! (S[2] > 0)) {
                        var x = m[l][0 == d ? f - 1 : d - 1];
                        e.moveTo(x[0], x[1]),
                        e.lineTo(S[0], S[1])
                    }
                }
                e.stroke()
            }
            if (1 == this.direction && t >= .9 * Math.PI) {
                this.logo_box.style.width = this.logo_box.style.height = 426 * SOGOU.$func.scale + "px",
                this.logo_box.classList.remove("fadeout"),
                this.logo_box.clientWidth,
                this.logo_box.classList.add("fadein");
                var h = this;
                setTimeout(function() {
                    h.stop = !0,
                    h.logo.classList.add("slideup"),
                    h.logo.clientWidth,
                    SOGOU.$func.resetLogoEnd(),
                    h.logo_sogou_wrap.style.display = "block",
                    h.logo_sogou_wrap.innerHTML = '<div id="logo_sogou" class="write"></div>',
                    h.dl_btn.clientWidth,
                    h.dl_btn.classList.add("dlfadein"),
                    h.stop2 || (h.stop2 = !0, setTimeout(function() {
                        sogou.manager.unlock(),
                        h.T = h._t,
                        document.querySelector(".fixed_footer").classList.add("show_footer"),
                        h.top.classList.add("fadein"),
                        sogou.$loop.$.stop()
                    },
                    1500))
                },
                1e3)
            }
            SOGOU.$func.ctx.translate(.5 * -SOGOU.$func.canvas.width, .5 * -SOGOU.$func.canvas.height)
        }
    })
}),
Laro.register("SOGOU.$fsm",
function(t) {
    this.init = function(e) {
        this.$ = new t.AppFSM(this, e)
    },
    this.setState = function(t, e, i) {
        this.$.setState(t, e, i)
    }
});
var sogou = SOGOU,
_list = [0, SOGOU.$states.logo, 1, SOGOU.$states.breathe, 2, SOGOU.$states.expand, 3, SOGOU.$states.roll, 4, SOGOU.$states.vibrate, 5, SOGOU.$states.disperse, 6, SOGOU.$states.dna, 7, SOGOU.$states.dnaleave, 8, SOGOU.$states.dna2circle, 9, SOGOU.$states.rotatelogo];
sogou.manager = {
    index: 0,
    page: 1,
    auto: !0,
    max: _list.length / 2 - 1,
    locked: !1,
    from: "next",
    lock: function() {
        this.locked = !0
    },
    unlock: function() {
        this.locked = !1
    },
    init: function() {
        sogou.$func.init(),
        sogou.$fsm.init(_list),
        sogou.$fsm.setState(this.index),
        sogou.$loop.init();
        try {
            localStorage && localStorage.getItem("markRead7.0") ? sogou.manager.auto = !1 : localStorage.setItem("markRead7.0", 1)
        } catch(t) {}
    },
    next: function(t, e, i) {
        this.max != this.index && (this.locked && !t || (this.locked = !0, this.from = "next", sogou.$fsm.setState(++this.index, e), 2 != this.index && 3 != this.index && 5 != this.index && 7 != this.index || (this.page++, i && i())))
    },
    previous: function(t, e) {
        this.locked = !0,
        this.from = "previous",
        sogou.$fsm.setState(--this.index, e)
    },
    reverse: function(t, e, i) {
        1 != this.index && (this.locked || (this.locked = !0, this.from = "reverse", sogou.$fsm.setState(this.index, e), this.page--, i && i()))
    }
},
document.addEventListener("keydown",
function(t) {
    var e = t.which,
    i = sogou.manager.page;
    switch (e) {
    case 37:
    case 38:
        sogou.manager.auto = !1,
        sogou.manager.reverse(!1, sogou.manager.globalT,
        function() {
            pingApp.getDlBtnClick("keyupclick", {
                idx: i
            })
        });
        break;
    case 39:
    case 40:
        sogou.manager.auto = !1,
        sogou.manager.next(!1, sogou.manager.globalT,
        function() {
            pingApp.getDlBtnClick("keydownclick", {
                idx: i
            })
        })
    }
}),
document.getElementById("top").addEventListener("click",
function(t) {
    pingApp.getDlBtnClick("topclick")
}),
document.querySelector(".down").addEventListener("click",
function(t) {
    sogou.manager.auto = !1;
    var e = sogou.manager.page;
    sogou.manager.next(!1, sogou.manager.globalT,
    function() {
        pingApp.getDlBtnClick("downclick", {
            idx: e
        })
    })
}),
document.addEventListener && document.addEventListener("DOMMouseScroll", wheel, !1),
window.onmousewheel = document.onmousewheel = wheel,
sogou.manager.init();