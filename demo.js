/*!
Copyright (c) Copyright (c) 2007, Carl S. Yestrau All rights reserved.
Code licensed under the BSD License: http://www.featureblend.com/license.txt
Version: 1.0.4
*/
var FlashDetect = new
function() {
    var a = this;
    a.installed = false;
    a.raw = "";
    a.major = -1;
    a.minor = -1;
    a.revision = -1;
    a.revisionStr = "";
    var b = [{
        name: "ShockwaveFlash.ShockwaveFlash.7",
        version: function(h) {
            return d(h)
        }
    },
    {
        name: "ShockwaveFlash.ShockwaveFlash.6",
        version: function(k) {
            var h = "6,0,21";
            try {
                k.AllowScriptAccess = "always";
                h = d(k)
            } catch(j) {}
            return h
        }
    },
    {
        name: "ShockwaveFlash.ShockwaveFlash",
        version: function(h) {
            return d(h)
        }
    }];
    var d = function(k) {
        var h = -1;
        try {
            h = k.GetVariable("$version")
        } catch(j) {}
        return h
    };
    var g = function(h) {
        var k = -1;
        try {
            k = new ActiveXObject(h)
        } catch(j) {
            k = {
                activeXError: true
            }
        }
        return k
    };
    var c = function(j) {
        var h = j.split(",");
        return {
            raw: j,
            major: parseInt(h[0].split(" ")[1], 10),
            minor: parseInt(h[1], 10),
            revision: parseInt(h[2], 10),
            revisionStr: h[2]
        }
    };
    var f = function(l) {
        var j = l.split(/ +/);
        var k = j[2].split(/\./);
        var h = j[3];
        return {
            raw: l,
            major: parseInt(k[0], 10),
            minor: parseInt(k[1], 10),
            revisionStr: h,
            revision: e(h)
        }
    };
    var e = function(h) {
        return parseInt(h.replace(/[a-zA-Z]/g, ""), 10) || a.revision
    };
    a.majorAtLeast = function(h) {
        return a.major >= h
    };
    a.minorAtLeast = function(h) {
        return a.minor >= h
    };
    a.revisionAtLeast = function(h) {
        return a.revision >= h
    };
    a.versionAtLeast = function(j) {
        var k = [a.major, a.minor, a.revision];
        var h = Math.min(k.length, arguments.length);
        for (i = 0; i < h; i++) {
            if (k[i] >= arguments[i]) {
                if (i + 1 < h && k[i] == arguments[i]) {
                    continue
                } else {
                    return true
                }
            } else {
                return false
            }
        }
    };
    a.FlashDetect = function() {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var l = "application/x-shockwave-flash";
            var k = navigator.mimeTypes;
            if (k && k[l] && k[l].enabledPlugin && k[l].enabledPlugin.description) {
                var h = k[l].enabledPlugin.description;
                var m = f(h);
                a.raw = m.raw;
                a.major = m.major;
                a.minor = m.minor;
                a.revisionStr = m.revisionStr;
                a.revision = m.revision;
                a.installed = true
            }
        } else {
            if (navigator.appVersion.indexOf("Mac") == -1 && window.execScript) {
                var h = -1;
                for (var j = 0; j < b.length && h == -1; j++) {
                    var n = g(b[j].name);
                    if (!n.activeXError) {
                        a.installed = true;
                        h = b[j].version(n);
                        if (h != -1) {
                            var m = c(h);
                            a.raw = m.raw;
                            a.major = m.major;
                            a.minor = m.minor;
                            a.revision = m.revision;
                            a.revisionStr = m.revisionStr
                        }
                    }
                }
            }
        }
    } ()
};
FlashDetect.JS_RELEASE = "1.0.4";
/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * overlay/overlay.js
 * tabs/tabs.js
 * tooltip/tooltip.js
 * tooltip/tooltip.dynamic.js
 * tooltip/tooltip.slide.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
 (function(f) {
    f.tools = f.tools || {
        version: "v1.2.7"
    },
    f.tools.overlay = {
        addEffect: function(j, c, k) {
            h[j] = [c, k]
        },
        conf: {
            close: null,
            closeOnClick: !0,
            closeOnEsc: !0,
            closeSpeed: "fast",
            effect: "default",
            fixed: !f.browser.msie || f.browser.version > 6,
            left: "center",
            load: !1,
            mask: null,
            oneInstance: !0,
            speed: "normal",
            target: null,
            top: "10%"
        }
    };
    var e = [],
    h = {};
    f.tools.overlay.addEffect("default", 
    function(a, l) {
        var k = this.getConf(),
        j = f(window);
        k.fixed || (a.top += j.scrollTop(), a.left += j.scrollLeft()),
        a.position = k.fixed ? "fixed": "absolute",
        this.getOverlay().css(a).fadeIn(k.speed, l)
    },
    function(b) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed, b)
    });
    function g(v, u) {
        var t = this,
        s = v.add(t),
        r = f(window),
        q,
        p,
        o,
        c = f.tools.expose && (u.mask || u.expose),
        b = Math.random().toString().slice(10);
        c && (typeof c == "string" && (c = {
            color: c
        }), c.closeOnClick = c.closeOnEsc = !1);
        var a = u.target || v.attr("rel");
        p = a ? f(a) : null || v;
        if (!p.length) {
            throw "Could not find Overlay: " + a
        }
        v && v.index(p) == -1 && v.click(function(d) {
            t.load(d);
            return d.preventDefault()
        }),
        f.extend(t, {
            load: function(w) {
                if (t.isOpened()) {
                    return t
                }
                var j = h[u.effect];
                if (!j) {
                    throw 'Overlay: cannot find effect : "' + u.effect + '"'
                }
                u.oneInstance && f.each(e, 
                function() {
                    this.close(w)
                }),
                w = w || f.Event(),
                w.type = "onBeforeLoad",
                s.trigger(w);
                if (w.isDefaultPrevented()) {
                    return t
                }
                o = !0,
                c && f(p).expose(c);
                var x = u.top,
                m = u.left,
                l = p.outerWidth({
                    margin: !0
                }),
                k = p.outerHeight({
                    margin: !0
                });
                typeof x == "string" && (x = x == "center" ? Math.max((r.height() - k) / 2, 0) : parseInt(x, 10) / 100 * r.height()),
                m == "center" && (m = Math.max((r.width() - l) / 2, 0)),
                j[0].call(t, {
                    top: x,
                    left: m
                },
                function() {
                    o && (w.type = "onLoad", s.trigger(w))
                }),
                c && u.closeOnClick && f.mask.getMask().one("click", t.close),
                u.closeOnClick && f(document).on("click." + b, 
                function(d) {
                    f(d.target).parents(p).length || t.close(d)
                }),
                u.closeOnEsc && f(document).on("keydown." + b, 
                function(d) {
                    d.keyCode == 27 && t.close(d)
                });
                return t
            },
            close: function(d) {
                if (!t.isOpened()) {
                    return t
                }
                d = d || f.Event(),
                d.type = "onBeforeClose",
                s.trigger(d);
                if (!d.isDefaultPrevented()) {
                    o = !1,
                    h[u.effect][1].call(t, 
                    function() {
                        d.type = "onClose",
                        s.trigger(d)
                    }),
                    f(document).off("click." + b + " keydown." + b),
                    c && f.mask.close();
                    return t
                }
            },
            getOverlay: function() {
                return p
            },
            getTrigger: function() {
                return v
            },
            getClosers: function() {
                return q
            },
            isOpened: function() {
                return o
            },
            getConf: function() {
                return u
            }
        }),
        f.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), 
        function(d, j) {
            f.isFunction(u[j]) && f(t).on(j, u[j]),
            t[j] = function(k) {
                k && f(t).on(j, k);
                return t
            }
        }),
        q = p.find(u.close || ".close"),
        !q.length && !u.close && (q = f('<a class="close"></a>'), p.prepend(q)),
        q.click(function(d) {
            t.close(d)
        }),
        u.load && t.load()
    }
    f.fn.overlay = function(b) {
        var a = this.data("overlay");
        if (a) {
            return a
        }
        f.isFunction(b) && (b = {
            onBeforeLoad: b
        }),
        b = f.extend(!0, {},
        f.tools.overlay.conf, b),
        this.each(function() {
            a = new g(f(this), b),
            e.push(a),
            f(this).data("overlay", a)
        });
        return b.api ? a: this
    }
})(jQuery); (function(g) {
    g.tools = g.tools || {
        version: "v1.2.7"
    },
    g.tools.tabs = {
        conf: {
            tabs: "a",
            current: "current",
            onBeforeClick: null,
            onClick: null,
            effect: "default",
            initialEffect: !1,
            initialIndex: 0,
            event: "click",
            rotate: !1,
            slideUpSpeed: 400,
            slideDownSpeed: 400,
            history: !1
        },
        addEffect: function(b, d) {
            f[b] = d
        }
    };
    var f = {
        "default": function(d, c) {
            this.getPanes().hide().eq(d).show(),
            c.call()
        },
        fade: function(m, l) {
            var p = this.getConf(),
            o = p.fadeOutSpeed,
            n = this.getPanes();
            o ? n.fadeOut(o) : n.hide(),
            n.eq(m).fadeIn(p.fadeInSpeed, l)
        },
        slide: function(e, d) {
            var l = this.getConf();
            this.getPanes().slideUp(l.slideUpSpeed),
            this.getPanes().eq(e).slideDown(l.slideDownSpeed, d)
        },
        ajax: function(d, c) {
            this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"), c)
        }
    },
    k,
    j;
    g.tools.tabs.addEffect("horizontal", 
    function(a, l) {
        if (!k) {
            var d = this.getPanes().eq(a),
            c = this.getCurrentPane();
            j || (j = this.getPanes().eq(0).width()),
            k = !0,
            d.show(),
            c.animate({
                width: 0
            },
            {
                step: function(b) {
                    d.css("width", j - b)
                },
                complete: function() {
                    g(this).hide(),
                    l.call(),
                    k = !1
                }
            }),
            c.length || (l.call(), k = !1)
        }
    });
    function h(q, p, o) {
        var n = this,
        m = q.add(this),
        l = q.find(o.tabs),
        b = p.jquery ? p: q.children(p),
        a;
        l.length || (l = q.children()),
        b.length || (b = q.parent().find(p)),
        b.length || (b = g(p)),
        g.extend(this, {
            click: function(t, s) {
                var r = l.eq(t),
                e = !q.data("tabs");
                typeof t == "string" && t.replace("#", "") && (r = l.filter('[href*="' + t.replace("#", "") + '"]'), t = Math.max(l.index(r), 0));
                if (o.rotate) {
                    var c = l.length - 1;
                    if (t < 0) {
                        return n.click(c, s)
                    }
                    if (t > c) {
                        return n.click(0, s)
                    }
                }
                if (!r.length) {
                    if (a >= 0) {
                        return n
                    }
                    t = o.initialIndex,
                    r = l.eq(t)
                }
                if (t === a) {
                    return n
                }
                s = s || g.Event(),
                s.type = "onBeforeClick",
                m.trigger(s, [t]);
                if (!s.isDefaultPrevented()) {
                    var u = e ? o.initialEffect && o.effect || "default": o.effect;
                    f[u].call(n, t, 
                    function() {
                        a = t,
                        s.type = "onClick",
                        m.trigger(s, [t])
                    }),
                    l.removeClass(o.current),
                    r.addClass(o.current);
                    return n
                }
            },
            getConf: function() {
                return o
            },
            getTabs: function() {
                return l
            },
            getPanes: function() {
                return b
            },
            getCurrentPane: function() {
                return b.eq(a)
            },
            getCurrentTab: function() {
                return l.eq(a)
            },
            getIndex: function() {
                return a
            },
            next: function() {
                return n.click(a + 1)
            },
            prev: function() {
                return n.click(a - 1)
            },
            destroy: function() {
                l.off(o.event).removeClass(o.current),
                b.find('a[href^="#"]').off("click.T");
                return n
            }
        }),
        g.each("onBeforeClick,onClick".split(","), 
        function(d, e) {
            g.isFunction(o[e]) && g(n).on(e, o[e]),
            n[e] = function(c) {
                c && g(n).on(e, c);
                return n
            }
        }),
        o.history && g.fn.history && (g.tools.history.init(l), o.event = "history"),
        l.each(function(c) {
            g(this).on(o.event, 
            function(d) {
                n.click(c, d);
                return d.preventDefault()
            })
        }),
        b.find('a[href^="#"]').on("click.T", 
        function(c) {
            n.click(g(this).attr("href"), c)
        }),
        location.hash && o.tabs == "a" && q.find('[href="' + location.hash + '"]').length ? n.click(location.hash) : (o.initialIndex === 0 || o.initialIndex > 0) && n.click(o.initialIndex)
    }
    g.fn.tabs = function(a, l) {
        var e = this.data("tabs");
        e && (e.destroy(), this.removeData("tabs")),
        g.isFunction(l) && (l = {
            onBeforeClick: l
        }),
        l = g.extend({},
        g.tools.tabs.conf, l),
        this.each(function() {
            e = new h(g(this), a, l),
            g(this).data("tabs", e)
        });
        return l.api ? e: this
    }
})(jQuery); (function(f) {
    f.tools = f.tools || {
        version: "v1.2.7"
    },
    f.tools.tooltip = {
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            predelay: 0,
            delay: 30,
            opacity: 1,
            tip: 0,
            fadeIE: !1,
            position: ["top", "center"],
            offset: [0, 0],
            relative: !1,
            cancelDefault: !0,
            events: {
                def: "mouseenter,mouseleave",
                input: "focus,blur",
                widget: "focus mouseenter,blur mouseleave",
                tooltip: "mouseenter,mouseleave"
            },
            layout: "<div/>",
            tipClass: "tooltip"
        },
        addEffect: function(b, k, j) {
            e[b] = [k, j]
        }
    };
    var e = {
        toggle: [function(k) {
            var j = this.getConf(),
            m = this.getTip(),
            l = j.opacity;
            l < 1 && m.css({
                opacity: l
            }),
            m.show(),
            k.call()
        },
        function(b) {
            this.getTip().hide(),
            b.call()
        }],
        fade: [function(a) {
            var d = this.getConf(); ! f.browser.msie || d.fadeIE ? this.getTip().fadeTo(d.fadeInSpeed, d.opacity, a) : (this.getTip().show(), a())
        },
        function(a) {
            var d = this.getConf(); ! f.browser.msie || d.fadeIE ? this.getTip().fadeOut(d.fadeOutSpeed, a) : (this.getTip().hide(), a())
        }]
    };
    function h(a, p, o) {
        var n = o.relative ? a.position().top: a.offset().top,
        m = o.relative ? a.position().left: a.offset().left,
        l = o.position[0];
        n -= p.outerHeight() - o.offset[0],
        m += a.outerWidth() + o.offset[1],
        /iPad/i.test(navigator.userAgent) && (n -= f(window).scrollTop());
        var k = p.outerHeight() + a.outerHeight();
        l == "center" && (n += k / 2),
        l == "bottom" && (n += k),
        l = o.position[1];
        var j = p.outerWidth() + a.outerWidth();
        l == "center" && (m -= j / 2),
        l == "left" && (m -= j);
        return {
            top: n,
            left: m
        }
    }
    function g(D, C) {
        var B = this,
        A = D.add(B),
        z,
        y = 0,
        x = 0,
        w = D.attr("title"),
        v = D.attr("data-tooltip"),
        u = e[C.effect],
        t,
        s = D.is(":input"),
        c = s && D.is(":checkbox, :radio, select, :button, :submit"),
        b = D.attr("type"),
        a = C.events[b] || C.events[s ? c ? "widget": "input": "def"];
        if (!u) {
            throw 'Nonexistent effect "' + C.effect + '"'
        }
        a = a.split(/,\s*/);
        if (a.length != 2) {
            throw "Tooltip: bad events configuration for " + b
        }
        D.on(a[0], 
        function(d) {
            clearTimeout(y),
            C.predelay ? x = setTimeout(function() {
                B.show(d)
            },
            C.predelay) : B.show(d)
        }).on(a[1], 
        function(d) {
            clearTimeout(x),
            C.delay ? y = setTimeout(function() {
                B.hide(d)
            },
            C.delay) : B.hide(d)
        }),
        w && C.cancelDefault && (D.removeAttr("title"), D.data("title", w)),
        f.extend(B, {
            show: function(d) {
                if (!z) {
                    v ? z = f(v) : C.tip ? z = f(C.tip).eq(0) : w ? z = f(C.layout).addClass(C.tipClass).appendTo(document.body).hide().append(w) : (z = D.next(), z.length || (z = D.parent().next()));
                    if (!z.length) {
                        throw "Cannot find tooltip for " + D
                    }
                }
                if (B.isShown()) {
                    return B
                }
                z.stop(!0, !0);
                var k = h(D, z, C);
                C.tip && z.html(D.data("title")),
                d = f.Event(),
                d.type = "onBeforeShow",
                A.trigger(d, [k]);
                if (d.isDefaultPrevented()) {
                    return B
                }
                k = h(D, z, C),
                z.css({
                    position: "absolute",
                    top: k.top,
                    left: k.left
                }),
                t = !0,
                u[0].call(B, 
                function() {
                    d.type = "onShow",
                    t = "full",
                    A.trigger(d)
                });
                var j = C.events.tooltip.split(/,\s*/);
                z.data("__set") || (z.off(j[0]).on(j[0], 
                function() {
                    clearTimeout(y),
                    clearTimeout(x)
                }), j[1] && !D.is("input:not(:checkbox, :radio), textarea") && z.off(j[1]).on(j[1], 
                function(l) {
                    l.relatedTarget != D[0] && D.trigger(a[1].split(" ")[0])
                }), C.tip || z.data("__set", !0));
                return B
            },
            hide: function(d) {
                if (!z || !B.isShown()) {
                    return B
                }
                d = f.Event(),
                d.type = "onBeforeHide",
                A.trigger(d);
                if (!d.isDefaultPrevented()) {
                    t = !1,
                    e[C.effect][1].call(B, 
                    function() {
                        d.type = "onHide",
                        A.trigger(d)
                    });
                    return B
                }
            },
            isShown: function(d) {
                return d ? t == "full": t
            },
            getConf: function() {
                return C
            },
            getTip: function() {
                return z
            },
            getTrigger: function() {
                return D
            }
        }),
        f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), 
        function(d, j) {
            f.isFunction(C[j]) && f(B).on(j, C[j]),
            B[j] = function(k) {
                k && f(B).on(j, k);
                return B
            }
        })
    }
    f.fn.tooltip = function(a) {
        var d = this.data("tooltip");
        if (d) {
            return d
        }
        a = f.extend(!0, {},
        f.tools.tooltip.conf, a),
        typeof a.position == "string" && (a.position = a.position.split(/,?\s/)),
        this.each(function() {
            d = new g(f(this), a),
            f(this).data("tooltip", d)
        });
        return a.api ? d: this
    }
})(jQuery); (function(f) {
    var e = f.tools.tooltip;
    e.dynamic = {
        conf: {
            classNames: "top right bottom left"
        }
    };
    function h(a) {
        var l = f(window),
        k = l.width() + l.scrollLeft(),
        j = l.height() + l.scrollTop();
        return [a.offset().top <= l.scrollTop(), k <= a.offset().left + a.width(), j <= a.offset().top + a.height(), l.scrollLeft() >= a.offset().left]
    }
    function g(d) {
        var c = d.length;
        while (c--) {
            if (d[c]) {
                return ! 1
            }
        }
        return ! 0
    }
    f.fn.dynamic = function(d) {
        typeof d == "number" && (d = {
            speed: d
        }),
        d = f.extend({},
        e.dynamic.conf, d);
        var c = f.extend(!0, {},
        d),
        b = d.classNames.split(/\s/),
        a;
        this.each(function() {
            var j = f(this).tooltip().onBeforeShow(function(m, r) {
                var q = this.getTip(),
                p = this.getConf();
                a || (a = [p.position[0], p.position[1], p.offset[0], p.offset[1], f.extend({},
                p)]),
                f.extend(p, a[4]),
                p.position = [a[0], a[1]],
                p.offset = [a[2], a[3]],
                q.css({
                    visibility: "hidden",
                    position: "absolute",
                    top: r.top,
                    left: r.left
                }).show();
                var o = f.extend(!0, {},
                c),
                n = h(q);
                if (!g(n)) {
                    n[2] && (f.extend(p, o.top), p.position[0] = "top", q.addClass(b[0])),
                    n[3] && (f.extend(p, o.right), p.position[1] = "right", q.addClass(b[1])),
                    n[0] && (f.extend(p, o.bottom), p.position[0] = "bottom", q.addClass(b[2])),
                    n[1] && (f.extend(p, o.left), p.position[1] = "left", q.addClass(b[3]));
                    if (n[0] || n[2]) {
                        p.offset[0] *= -1
                    }
                    if (n[1] || n[3]) {
                        p.offset[1] *= -1
                    }
                }
                q.css({
                    visibility: "visible"
                }).hide()
            });
            j.onBeforeShow(function() {
                var l = this.getConf(),
                k = this.getTip();
                setTimeout(function() {
                    l.position = [a[0], a[1]],
                    l.offset = [a[2], a[3]]
                },
                0)
            }),
            j.onHide(function() {
                var k = this.getTip();
                k.removeClass(d.classNames)
            }),
            ret = j
        });
        return d.api ? ret: this
    }
})(jQuery); (function(e) {
    var d = e.tools.tooltip;
    e.extend(d.conf, {
        direction: "up",
        bounce: !1,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !e.browser.msie
    });
    var f = {
        up: ["-", "top"],
        down: ["+", "top"],
        left: ["-", "left"],
        right: ["+", "left"]
    };
    d.addEffect("slide", 
    function(g) {
        var c = this.getConf(),
        k = this.getTip(),
        j = c.slideFade ? {
            opacity: c.opacity
        }: {},
        h = f[c.direction] || f.up;
        j[h[1]] = h[0] + "=" + c.slideOffset,
        c.slideFade && k.css({
            opacity: 0
        }),
        k.show().animate(j, c.slideInSpeed, g)
    },
    function(a) {
        var m = this.getConf(),
        l = m.slideOffset,
        k = m.slideFade ? {
            opacity: 0
        }: {},
        j = f[m.direction] || f.up,
        c = "" + j[0];
        m.bounce && (c = c == "+" ? "-": "+"),
        k[j[1]] = c + "=" + l,
        this.getTip().animate(k, m.slideOutSpeed, 
        function() {
            e(this).hide(),
            a.call()
        })
    })
})(jQuery);
/*!
 * zClip :: jQuery ZeroClipboard v1.1.1
 * http://steamdev.com/zclip
 *
 * Copyright 2011, SteamDev
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Wed Jun 01, 2011
 */
 (function(a) {
    a.fn.zclip = function(c) {
        if (typeof c == "object" && !c.length) {
            var b = a.extend({
                path: "ZeroClipboard.swf",
                copy: null,
                beforeCopy: null,
                afterCopy: null,
                clickAfter: true,
                setHandCursor: true,
                setCSSEffects: true
            },
            c);
            return this.each(function() {
                var e = a(this);
                if (e.is(":visible") && (typeof b.copy == "string" || a.isFunction(b.copy))) {
                    ZeroClipboard.setMoviePath(b.path);
                    var d = new ZeroClipboard.Client();
                    if (a.isFunction(b.copy)) {
                        e.bind("zClip_copy", b.copy)
                    }
                    if (a.isFunction(b.beforeCopy)) {
                        e.bind("zClip_beforeCopy", b.beforeCopy)
                    }
                    if (a.isFunction(b.afterCopy)) {
                        e.bind("zClip_afterCopy", b.afterCopy)
                    }
                    d.setHandCursor(b.setHandCursor);
                    d.setCSSEffects(b.setCSSEffects);
                    d.addEventListener("mouseOver", 
                    function(f) {
                        e.trigger("mouseenter")
                    });
                    d.addEventListener("mouseOut", 
                    function(f) {
                        e.trigger("mouseleave")
                    });
                    d.addEventListener("mouseDown", 
                    function(f) {
                        e.trigger("mousedown");
                        if (!a.isFunction(b.copy)) {
                            d.setText(b.copy)
                        } else {
                            d.setText(e.triggerHandler("zClip_copy"))
                        }
                        if (a.isFunction(b.beforeCopy)) {
                            e.trigger("zClip_beforeCopy")
                        }
                    });
                    d.addEventListener("complete", 
                    function(f, g) {
                        if (a.isFunction(b.afterCopy)) {
                            e.trigger("zClip_afterCopy")
                        } else {
                            if (g.length > 500) {
                                g = g.substr(0, 500) + "...\n\n(" + (g.length - 500) + " characters not shown)"
                            }
                            e.removeClass("hover");
                            alert("Copied text to clipboard:\n\n " + g)
                        }
                        if (b.clickAfter) {
                            e.trigger("click")
                        }
                    });
                    d.glue(e[0], e.parent()[0]);
                    a(window).bind("load resize", 
                    function() {
                        d.reposition()
                    })
                }
            })
        } else {
            if (typeof c == "string") {
                return this.each(function() {
                    var f = a(this);
                    c = c.toLowerCase();
                    var e = f.data("zclipId");
                    var d = a("#" + e + ".zclip");
                    if (c == "remove") {
                        d.remove();
                        f.removeClass("active hover")
                    } else {
                        if (c == "hide") {
                            d.hide();
                            f.removeClass("active hover")
                        } else {
                            if (c == "show") {
                                d.show()
                            }
                        }
                    }
                })
            }
        }
    }
})(jQuery);
var ZeroClipboard = {
    version: "1.0.7",
    clients: {},
    moviePath: "ZeroClipboard.swf",
    nextId: 1,
    $: function(a) {
        if (typeof(a) == "string") {
            a = document.getElementById(a)
        }
        if (!a.addClass) {
            a.hide = function() {
                this.style.display = "none"
            };
            a.show = function() {
                this.style.display = ""
            };
            a.addClass = function(b) {
                this.removeClass(b);
                this.className += " " + b
            };
            a.removeClass = function(d) {
                var e = this.className.split(/\s+/);
                var b = -1;
                for (var c = 0; c < e.length; c++) {
                    if (e[c] == d) {
                        b = c;
                        c = e.length
                    }
                }
                if (b > -1) {
                    e.splice(b, 1);
                    this.className = e.join(" ")
                }
                return this
            };
            a.hasClass = function(b) {
                return !! this.className.match(new RegExp("\\s*" + b + "\\s*"))
            }
        }
        return a
    },
    setMoviePath: function(a) {
        this.moviePath = a
    },
    dispatch: function(d, b, c) {
        var a = this.clients[d];
        if (a) {
            a.receiveEvent(b, c)
        }
    },
    register: function(b, a) {
        this.clients[b] = a
    },
    getDOMObjectPosition: function(c, a) {
        var b = {
            left: 0,
            top: 0,
            width: c.width ? c.width: c.offsetWidth,
            height: c.height ? c.height: c.offsetHeight
        };
        if (c && (c != a)) {
            b.left += c.offsetLeft;
            b.top += c.offsetTop
        }
        return b
    },
    Client: function(a) {
        this.handlers = {};
        this.id = ZeroClipboard.nextId++;
        this.movieId = "ZeroClipboardMovie_" + this.id;
        ZeroClipboard.register(this.id, this);
        if (a) {
            this.glue(a)
        }
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: false,
    movie: null,
    clipText: "",
    handCursorEnabled: true,
    cssEffects: true,
    handlers: null,
    glue: function(d, b, e) {
        this.domElement = ZeroClipboard.$(d);
        var f = 99;
        if (this.domElement.style.zIndex) {
            f = parseInt(this.domElement.style.zIndex, 10) + 1
        }
        if (typeof(b) == "string") {
            b = ZeroClipboard.$(b)
        } else {
            if (typeof(b) == "undefined") {
                b = document.getElementsByTagName("body")[0]
            }
        }
        var c = ZeroClipboard.getDOMObjectPosition(this.domElement, b);
        this.div = document.createElement("div");
        this.div.className = "zclip";
        this.div.id = "zclip-" + this.movieId;
        $(this.domElement).data("zclipId", "zclip-" + this.movieId);
        var a = this.div.style;
        a.position = "absolute";
        a.left = "" + c.left + "px";
        a.top = "" + c.top + "px";
        a.width = "" + c.width + "px";
        a.height = "" + c.height + "px";
        a.zIndex = f;
        if (typeof(e) == "object") {
            for (addedStyle in e) {
                a[addedStyle] = e[addedStyle]
            }
        }
        b.appendChild(this.div);
        this.div.innerHTML = this.getHTML(c.width, c.height)
    },
    getHTML: function(d, a) {
        var c = "";
        var b = "id=" + this.id + "&width=" + d + "&height=" + a;
        if (navigator.userAgent.match(/MSIE/)) {
            var e = location.href.match(/^https/i) ? "https://": "http://";
            c += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + e + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + d + '" height="' + a + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + b + '"/><param name="wmode" value="transparent"/></object>'
        } else {
            c += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + d + '" height="' + a + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + b + '" wmode="transparent" />'
        }
        return c
    },
    hide: function() {
        if (this.div) {
            this.div.style.left = "-2000px"
        }
    },
    show: function() {
        this.reposition()
    },
    destroy: function() {
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = "";
            var a = document.getElementsByTagName("body")[0];
            try {
                a.removeChild(this.div)
            } catch(b) {}
            this.domElement = null;
            this.div = null
        }
    },
    reposition: function(c) {
        if (c) {
            this.domElement = ZeroClipboard.$(c);
            if (!this.domElement) {
                this.hide()
            }
        }
        if (this.domElement && this.div) {
            var b = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var a = this.div.style;
            a.left = "" + b.left + "px";
            a.top = "" + b.top + "px"
        }
    },
    setText: function(a) {
        this.clipText = a;
        if (this.ready) {
            this.movie.setText(a)
        }
    },
    addEventListener: function(a, b) {
        a = a.toString().toLowerCase().replace(/^on/, "");
        if (!this.handlers[a]) {
            this.handlers[a] = []
        }
        this.handlers[a].push(b)
    },
    setHandCursor: function(a) {
        this.handCursorEnabled = a;
        if (this.ready) {
            this.movie.setHandCursor(a)
        }
    },
    setCSSEffects: function(a) {
        this.cssEffects = !!a
    },
    receiveEvent: function(d, f) {
        d = d.toString().toLowerCase().replace(/^on/, "");
        switch (d) {
        case "load":
            this.movie = document.getElementById(this.movieId);
            if (!this.movie) {
                var c = this;
                setTimeout(function() {
                    c.receiveEvent("load", null)
                },
                1);
                return
            }
            if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                var c = this;
                setTimeout(function() {
                    c.receiveEvent("load", null)
                },
                100);
                this.ready = true;
                return
            }
            this.ready = true;
            try {
                this.movie.setText(this.clipText)
            } catch(h) {}
            try {
                this.movie.setHandCursor(this.handCursorEnabled)
            } catch(h) {}
            break;
        case "mouseover":
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass("hover");
                if (this.recoverActive) {
                    this.domElement.addClass("active")
                }
            }
            break;
        case "mouseout":
            if (this.domElement && this.cssEffects) {
                this.recoverActive = false;
                if (this.domElement.hasClass("active")) {
                    this.domElement.removeClass("active");
                    this.recoverActive = true
                }
                this.domElement.removeClass("hover")
            }
            break;
        case "mousedown":
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass("active")
            }
            break;
        case "mouseup":
            if (this.domElement && this.cssEffects) {
                this.domElement.removeClass("active");
                this.recoverActive = false
            }
            break
        }
        if (this.handlers[d]) {
            for (var b = 0, a = this.handlers[d].length; b < a; b++) {
                var g = this.handlers[d][b];
                if (typeof(g) == "function") {
                    g(this, f)
                } else {
                    if ((typeof(g) == "object") && (g.length == 2)) {
                        g[0][g[1]](this, f)
                    } else {
                        if (typeof(g) == "string") {
                            window[g](this, f)
                        }
                    }
                }
            }
        }
    }
};
/*!
 * Main application
 * 
 */
var messageApi = function() {
    var a = "messages";
    var h = "message";
    var g = "icon";
    var f = "close";
    var k = "mainCloseButton";
    var d = "error";
    var b = "info";
    $("." + a + " ." + h + " ." + f).live("click", 
    function() {
        $(this).parents("." + h).slideUp()
    });
    function m(p, q, n) {
        if (n == undefined) {
            n = true
        }
        var o = "<div class='" + h + " " + p + "'>";
        o += "<span class='" + g + "'></span>";
        if (n) {
            o += "<span class='" + f + " " + k + "'></span>"
        }
        o += "<p>" + q + "</p>";
        o += "</div>";
        $("." + a).append(o);
        $.unique($("." + a + " ." + h))
    }
    function j(o, n) {
        m(d, o, n)
    }
    function c(o, n) {
        m(b, o, n)
    }
    function l() {
        return $("." + a)
    }
    function e() {
        $("." + a).html("")
    }
    return {
        error: j,
        info: c,
        getMsgPane: l,
        clear: e
    }
} (); (function(B, j) {
    var p;
    var d;
    var D = [];
    var C;
    var y;
    var J;
    var e;
    var t = B("#mapContainer");
    var F = B(".queryForm");
    var H = B("#query");
    var h = B("#submit");
    var a = B(".clearQuery");
    var w = B("#accuracy");
    var x = B("#locateMe");
    var u = B("#finetuneMode");
    var v = true;
    var A = false;
    var c = window.lang || {};
    c.userSearch = c.userSearch || "";
    c.searchDefault = c.searchDefault || "FB: Berlin, Germany";
    c.queryLimitReached = c.queryLimitReached || "FB: The query limit has been reached: ";
    c.requestDenied = c.requestDenied || "FB: Request has been denied: ";
    c.requestInvalid = c.requestInvalid || "FB: The request was invalid: ";
    c.requestFailed = c.requestFailed || "FB: Request failed: ";
    c.addressNotFound = c.addressNotFound || "FB: Your search retruend no results: ";
    c.latitude = c.latitude || "FB: Latitude";
    c.longitude = c.longitude || "FB: Longitude";
    c.elevation = c.elevation || "FB: Elevation";
    c.finetuneOn = c.finetuneOn || "FB: Drag & drop updates position ONLY (finetuning).";
    c.finetuneOff = c.finetuneOff || "FB: Drag & drop updates position AND address.";
    c.locationDetectionFailed = c.locationDetectionFailed || "FB: Your location could not be detected!";
    c.multipleLocationsFound = c.multipleLocationsFound || "FB: Multiple locations have been found - please select one:";
    c.finetuneModeCookieInfo = c.finetuneModeCookieInfo || "FB: We'll remember this selection for your next visit.";
    c.copy = c.copy || "FB: Copy";
    F.bind("submit", 
    function() {
        messageApi.clear();
        var L = "";
        if (H.val() != "") {
            L = H.val()
        } else {
            L = c.searchDefault
        }
        if (o(L)) {
            j.push(["_trackEvent", "Geocoding", "URL", L]);
            z(L)
        } else {
            j.push(["_trackEvent", "Geocoding", "Address", L]);
            n(L)
        }
        return false
    });
    H.focus();
    B(".copyButtonWrapperAddress button").zclip({
        path: "js/ZeroClipboard.swf",
        copy: function() {
            return B("#geodata-address").html()
        },
        afterCopy: function() {}
    });
    B(".copyButtonWrapperLatLng button").zclip({
        path: "js/ZeroClipboard.swf",
        copy: function() {
            return B("#geodata-lat").html() + "," + B("#geodata-lng").html()
        },
        afterCopy: function() {}
    });
    B(".copyButtonWrapperLatLngDeg button").zclip({
        path: "js/ZeroClipboard.swf",
        copy: function() {
            return B("#geodata-latDeg").html() + "," + B("#geodata-lngDeg").html()
        },
        afterCopy: function() {}
    });
    B(".copyButtonWrapperElevation button").zclip({
        path: "js/ZeroClipboard.swf",
        copy: function() {
            return B("#geodata-elevation").html()
        },
        afterCopy: function() {}
    });
    if (jQuery.browser.msie && jQuery.browser.version < 9) {
        B(".copyButtonWrapper.copyButtonWrapperTextarea button").hide()
    } else {
        B(".copyButtonWrapper.copyButtonWrapperTextarea button").zclip({
            path: "js/ZeroClipboard.swf",
            copy: function() {
                return B(this).parents(".copyButtonWrapper").prev("textarea").val()
            },
            afterCopy: function() {}
        })
    }
    B(".copyInputField").live("focus click", 
    function() {
        B(this).select()
    });
    B(".openButton").live("click", 
    function() {
        window.open(B(this).prevAll(".copyInputField").val(), "_blank")
    });
    function E() {
        p = undefined;
        C = undefined;
        D = [];
        if (J != undefined) {
            J.setMap();
            J = undefined
        }
        if (e != undefined) {
            e.close();
            e = undefined
        }
    }
    function n(L) {
        p = p || new google.maps.Geocoder();
        p.geocode({
            address: L
        },
        function(N, M) {
            switch (google.maps.GeocoderStatus.OK) {
            case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
                j.push(["_trackEvent", "GeocodingStatus", "OVER_QUERY_LIMIT"]);
                alert(c.queryLimitReached + M);
                break;
            case google.maps.GeocoderStatus.REQUEST_DENIED:
                j.push(["_trackEvent", "GeocodingStatus", "REQUEST_DENIED"]);
                alert(c.requestDenied + M);
                break;
            case google.maps.GeocoderStatus.INVALID_REQUEST:
                j.push(["_trackEvent", "GeocodingStatus", "INVALID_REQUEST"]);
                alert(c.requestInvalid + M);
                break;
            case google.maps.GeocoderStatus.ZERO_RESULTS:
                j.push(["_trackEvent", "GeocodingStatus", "ZERO_RESULTS"]);
                alert(c.addressNotFound + M);
                break;
            case google.maps.GeocoderStatus.OK:
                D = N;
                if (v) {
                    v = false;
                    var O = N[0];
                    N = [];
                    N[0] = O
                }
                switch (N.length) {
                case 1:
                    j.push(["_trackEvent", "GeocodingStatus", "SUCCESS", "1"]);
                    f(N[0]);
                    break;
                case 0:
                    j.push(["_trackEvent", "GeocodingStatus", "ZERO_RESULTS"]);
                    alert(c.addressNotFound + M);
                    break;
                default:
                    j.push(["_trackEvent", "GeocodingStatus", "SUCCESS", N.length]);
                    s(N)
                }
                break;
            default:
                j.push(["_trackEvent", "GeocodingStatus", "FAILED"]);
                alert(c.requestFailed + M);
                break
            }
        })
    }
    function s(L) {
        var O = c.multipleLocationsFound;
        for (var N = 0; N < L.length; N++) {
            var M = m(L[N]);
            O += "<button type='button' data-location='" + N + "' class='close'>" + M.address + "</button>"
        }
        messageApi.error(O);
        messageApi.getMsgPane().find("button[data-location]").bind("click", 
        function() {
            f(D[B(this).attr("data-location")])
        })
    }
    function f(L) {
        L.geometry.location = new google.maps.LatLng(L.geometry.location.lat().toFixed(w.val()), L.geometry.location.lng().toFixed(w.val()));
        y.panTo(L.geometry.location);
        if (!A) {
            var M = 10;
            switch (L.address_components.length) {
            case 1:
                M = 3;
                break;
            case 2:
                M = 6;
                break;
            case 3:
                M = 8;
                break;
            case 4:
                M = 12;
                break;
            case 5:
                M = 13;
                break;
            case 6:
                M = 15;
                break;
            case 7:
                M = 16;
                break;
            case 8:
                M = 17;
                break;
            default:
                M = 18;
                break
            }
            y.setZoom(M)
        }
        A = false;
        if (J == undefined) {
            J = new google.maps.Marker({
                map: y,
                draggable: true
            });
            google.maps.event.addListener(J, "dragstart", 
            function() {
                e.close()
            });
            google.maps.event.addListener(J, "dragend", 
            function() {
                if (g()) {
                    C.geometry.location = J.getPosition();
                    I(C)
                } else {
                    A = true;
                    H.val(J.getPosition().lat() + "," + J.getPosition().lng());
                    F.trigger("submit")
                }
            });
            google.maps.event.addListener(J, "click", 
            function() {
                k(C)
            });
            google.maps.event.addListener(y, "rightclick", 
            function(N) {
                if (g()) {
                    C.geometry.location = N.latLng;
                    J.setPosition(C.geometry.location);
                    I(C)
                } else {
                    A = true;
                    H.val(N.latLng.lat() + "," + N.latLng.lng());
                    F.trigger("submit")
                }
            })
        }
        J.setPosition(L.geometry.location);
        I(L)
    }
    function I(L) {
        d = d || new google.maps.ElevationService();
        var M = {
            locations: [L.geometry.location]
        };
        d.getElevationForLocations(M, 
        function(O, N) {
            if (N == google.maps.ElevationStatus.OK) {
                L.elevationServiceData = O
            }
            k(L)
        })
    }
    function k(L) {
        C = L;
        var O = m(C);
        var M = new Date();
        var N = Date.UTC(M.getFullYear(), M.getMonth(), M.getDate(), M.getHours(), M.getMinutes(), M.getSeconds());
        e = e || new google.maps.InfoWindow({
            map: y
        });
        e.setPosition(L.geometry.location);
        e.setContent('<div class="infoWindow"><p class="address">' + L.formatted_address + '</p><div class="lat"><span class="label">' + c.latitude + ':</span> <span class="copyButtonWrapper" id="copyButtonWrapperInfoWindowLatLng-' + N + '" data-tracking="latLngInfoWindow"><button type="button">' + c.copy + ' (x,y)</button></span><span class="rad">' + O.lat + '</span><span class="deg">' + O.latDeg + '</span></div><div class="lng"><span class="label">' + c.longitude + ':</span> <span class="copyButtonWrapper" id="copyButtonWrapperInfoWindowLatLngDeg-' + N + '" data-tracking="latLngDegInfoWindow"><button type="button">' + c.copy + ' (x&deg;,y&deg;)</button></span><span class="rad">' + O.lng + '</span><span class="deg">' + O.lngDeg + '</span></div><div class="elevation"><span class="label">' + c.elevation + ':</span> <span class="copyButtonWrapper" id="copyButtonWrapperInfoWindowElevation-' + N + '" data-tracking="elevationInfoWindow"><button  type="button">' + c.copy + ' x (m)</button></span><span class="rad">' + O.elevation + ' m</span></div><p class="finetuneSelection"><label for="finetuneMode"><select id="finetuneMode"><option value="true" class="finetuneMode">' + c.finetuneOn + '</option><option value="false" class="no-finetuneMode">' + c.finetuneOff + "</option></select></p></div>");
        e.open(y, J);
        google.maps.event.addListener(e, "domready", 
        function() {
            B("#finetuneMode").val(g() ? "true": "false").bind("change", 
            function() {
                q(B(this).val())
            });
            B("#copyButtonWrapperInfoWindowLatLng-" + N + " button").zclip({
                path: "js/ZeroClipboard.swf",
                copy: function() {
                    return B("#geodata-lat").html() + "," + B("#geodata-lng").html()
                },
                afterCopy: function() {}
            });
            B("#copyButtonWrapperInfoWindowLatLngDeg-" + N + " button").zclip({
                path: "js/ZeroClipboard.swf",
                copy: function() {
                    return B("#geodata-latDeg").html() + "," + B("#geodata-lngDeg").html()
                },
                afterCopy: function() {}
            });
            B("#copyButtonWrapperInfoWindowElevation-" + N + " button").zclip({
                path: "js/ZeroClipboard.swf",
                copy: function() {
                    return B("#geodata-elevation").html()
                },
                afterCopy: function() {}
            })
        });
        B("#geodata-country").html(O.country.longName);
        B("#geodata-state").html(O.state.longName);
        B("#geodata-district").html(O.district.longName);
        B("#geodata-subdistrict").html(O.subdistrict.longName);
        B("#geodata-city").html(O.city.longName);
        B("#geodata-suburb").html(O.suburb.longName);
        B("#geodata-postalCode").html(O.postalCode.longName);
        B("#geodata-street").html(O.street.longName);
        B("#geodata-streetNumber").html(O.streetNumber.longName);
        B("#geodata-address").html(O.address);
        B("#geodata-lat").html(O.lat);
        B("#geodata-lng").html(O.lng);
        B("#geodata-latDeg").html(O.latDeg);
        B("#geodata-lngDeg").html(O.lngDeg);
        B("#geodata-elevation").html(O.elevation + " m");
        B("#geodata-geometatags").val('<meta name="geo.placename" content="' + O.address + '" />\n<meta name="geo.position" content="' + O.lat + ";" + O.lng + '" />\n<meta name="geo.region" content="' + O.country.shortName + "-" + O.state.longName + '" />\n<meta name="ICBM" content="' + O.lat + ", " + O.lng + '" />');
        B("#geodata-geotags").val("geotagged\ngeo:lat=" + O.lat + "\ngeo:lon=" + O.lng);
        B("#geodata-kml").val('<?xml version="1.0" encoding="iso-8859-1"?>\n<kml xmlns="http://earth.google.com/kml/2.1">\n  <Placemark>\n    <name>' + O.address + "</name>\n    <description></description>\n    <Point>\n      <coordinates>" + O.lng + "," + O.lat + "," + O.elevation + "</coordinates>\n    </Point>\n  </Placemark>\n</kml>");
        B("#geodata-kml-button").unbind("click").bind("click", 
        function() {
            window.open("kml.php?coordinates=" + O.lng + "," + O.lat + "," + O.elevation + "&name=" + O.address)
        });
        B("#geodata-gpx").val('<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n<gpx xmlns="http://www.topografix.com/GPX/1/1" creator="MyGeoPosition.com" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">\n  <wpt lat="' + O.lat + '" lon="' + O.lng + '">\n    <name>' + O.address + "</name>\n    <src>MyGeoPosition.com</src>\n    <link>http://mygeoposition.com</link>\n  </wpt>\n</gpx>");
        B("#geodata-gpx-button").unbind("click").bind("click", 
        function() {
            window.open("gpx.php?lat=" + O.lat + "&lng=" + O.lng + "&name=" + O.address)
        });
        B("#link-myGeoPosition").val("http://mygeoposition.com/loc/" + O.lat + "," + O.lng + "/?zoomLevel=" + O.zoomLevel + "&mapType=" + O.mapType);
        B("#link-googleMaps").val("http://maps.google.com/?q=" + O.lat + "," + O.lng);
        B("#link-bingMaps").val("http://www.bing.com/maps/?lvl=14&cp=" + O.lat + "~" + O.lng);
        B("#link-yahoo").val("http://maps.yahoo.com/#q1=" + O.address + "&mag=6&lon=" + O.lng + "&lat=" + O.lat);
        B("#link-openStreetMap").val("http://www.openstreetmap.org/?lat=" + O.lat + "&lon=" + O.lng + "&zoom=13")
    }
    function r(M, O) {
        var L = "";
        var P = Math.floor(Math.abs(M));
        var N = Math.floor((Math.abs(M) - P) * 60);
        var Q = (((Math.abs(M) - P) * 60 - N) * 60).toFixed(2);
        var R;
        if (O == "lat") {
            if (M > 0) {
                R = "N"
            } else {
                R = "S"
            }
        } else {
            if (M > 0) {
                R = "E"
            } else {
                R = "W"
            }
        }
        return P + "&deg; " + N + "' " + Q + "'' " + R
    }
    function K(M, L) {
        M = Math.round(M * Math.pow(10, L)) / Math.pow(10, L);
        decStr = new String(M);
        if (!L || L == 0) {
            return decStr
        }
        if (decStr.indexOf(".") < 0) {
            decStr = decStr + "."
        }
        var O = decStr.length - decStr.indexOf(".") - 1;
        var N = "";
        for (i = 0; i < L - O; i++) {
            N += "0"
        }
        return decStr + N
    }
    function m(L) {
        var N = new Object();
        N.country = l(new Object());
        N.state = l(new Object());
        N.district = l(new Object());
        N.subdistrict = l(new Object());
        N.city = l(new Object());
        N.suburb = l(new Object());
        N.postalCode = l(new Object());
        N.streetNumber = l(new Object());
        N.street = l(new Object());
        if (typeof L == "undefined") {
            return N
        }
        N.address = L.formatted_address;
        N.lat = K(L.geometry.location.lat(), 7);
        N.lng = K(L.geometry.location.lng(), 7);
        N.latDeg = r(N.lat, "lat");
        N.lngDeg = r(N.lng, "lng");
        N.elevation = "";
        if (L.elevationServiceData && L.elevationServiceData.length > 0) {
            N.elevation = K(L.elevationServiceData[0].elevation, 2)
        }
        for (var M = 0; M < L.address_components.length; M++) {
            switch (L.address_components[M].types[0]) {
            case "country":
                N.country = l(L.address_components[M]);
                break;
            case "administrative_area_level_1":
                N.state = l(L.address_components[M]);
                break;
            case "administrative_area_level_2":
                N.district = l(L.address_components[M]);
                break;
            case "administrative_area_level_3":
                N.subdistrict = l(L.address_components[M]);
                break;
            case "locality":
                N.city = l(L.address_components[M]);
                break;
            case "sublocality":
                N.suburb = l(L.address_components[M]);
                break;
            case "postal_code":
                N.postalCode = l(L.address_components[M]);
                break;
            case "street_number":
                N.streetNumber = l(L.address_components[M]);
                break;
            case "route":
                N.street = l(L.address_components[M]);
                break
            }
        }
        return N
    }
    function l(M) {
        var L = new Object();
        L.shortName = (M.short_name != undefined ? M.short_name: "");
        L.longName = (M.long_name != undefined ? M.long_name: "");
        return L
    }
    function o(L) {
        var M = /^(?:(?:ftp|https?):\/\/)?(?:[a-z0-9](?:[-a-z0-9]*[a-z0-9])?\.)+(?:com|edu|biz|org|gov|int|info|mil|net|name|museum|coop|aero|[a-z][a-z])\b(?:\d+)?(?:\/[^;"'<>()\[\]{}\s\x7f-\xff]*(?:[.,?]+[^;"'<>()\[\]{}\s\x7f-\xff]+)*)?/;
        return M.test(L.toLowerCase())
    }
    function z(L) {
        B.get("geofromurl.php?url=" + L, 
        function(M) {
            n(M.geoPosition.replace(";", ","))
        })
    }
    function g() {
        if (B.cookie("finetuneMode") != undefined && B.cookie("finetuneMode") == "false") {
            G(false);
            return false
        } else {
            G(true);
            return true
        }
    }
    function q(L) {
        if (B.cookie("finetuneMode") == undefined) {
            messageApi.info(c.finetuneModeCookieInfo)
        }
        B.cookie("finetuneMode", L);
        G(g())
    }
    function G(L) {
        if (L) {
            B("html").addClass("finetuneMode");
            B("html").removeClass("no-finetuneMode")
        } else {
            B("html").removeClass("finetuneMode");
            B("html").addClass("no-finetuneMode")
        }
    }
    function b() {
        if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            B("html").addClass("iOS")
        }
        if (FlashDetect.installed) {
            B("html").addClass("flash")
        } else {
            B("html").addClass("no-flash")
        }
        var M = B("ul.tabs").tabs("div.tabPanes > section").data("tabs");
        B("ul.tabs li a").bind("click", 
        function() {
            var N = B(this).attr("href");
            j.push(["_trackEvent", "TabView", N])
        });
        B(".copyButtonWrapper button").live("click", 
        function() {
            var N = B(this).parents(".copyButtonWrapper").attr("data-tracking");
            j.push(["_trackEvent", "Copy", N])
        });
        B(".downloadButton").live("click", 
        function() {
            var N = B(this).attr("data-tracking");
            j.push(["_trackEvent", "Download", N])
        });
        x.live("click", 
        function() {
            var N = "clicked";
            j.push(["_trackEvent", "LocateMe", N])
        });
        w.live("change", 
        function() {
            var N = B(this).val();
            j.push(["_trackEvent", "AccuracySelection", N])
        });
        u.live("change", 
        function() {
            var N = B(this).val();
            j.push(["_trackEvent", "FinetuneModeSelection", N])
        });
        a.live("click", 
        function() {
            var N = "clicked";
            j.push(["_trackEvent", "ClearQuery", N])
        });
        B("ul.tabs li a[href='#map']").trigger("click");
        if (t.length > 0) {
            var L = {
                center: new google.maps.LatLng(0, 0),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            y = new google.maps.Map(t[0], L);
            if (typeof(navigator.geolocation) != "undefined") {
                x.show().bind("click", 
                function() {
                    navigator.geolocation.getCurrentPosition(function(N) {
                        H.val(N.coords.latitude + "," + N.coords.longitude).trigger("change");
                        F.trigger("submit")
                    },
                    function() {
                        alert(c.locationDetectionFailed)
                    })
                })
            }
        }
        a.bind("click", 
        function() {
            B(this).hide();
            H.val("").focus()
        });
        H.bind("click change keydown keypress keyup textinput", 
        function() {
            if (B(this).val() == "") {
                a.hide()
            } else {
                a.show()
            }
        }).trigger("change");
        if (c.userSearch != "") {
            H.val(c.userSearch)
        }
        F.trigger("submit")
    }
    B(document).ready(function() {
        b()
    })
})(jQuery, _gaq);
window.Modernizr = function(aj, ai, ah) {
    function H(b) {
        aa.cssText = b
    }
    function G(d, c) {
        return H(prefixes.join(d + ";") + (c || ""))
    }
    function F(d, c) {
        return typeof d === c
    }
    function U(d, c) {
        return !! ~ ("" + d).indexOf(c)
    }
    function S(f, c) {
        for (var h in f) {
            var g = f[h];
            if (!U(g, "-") && aa[g] !== ah) {
                return c == "pfx" ? g: !0
            }
        }
        return ! 1
    }
    function Q(g, c, k) {
        for (var j in g) {
            var h = c[g[j]];
            if (h !== ah) {
                return k === !1 ? g[j] : F(h, "function") ? h.bind(k || c) : h
            }
        }
        return ! 1
    }
    function O(g, f, k) {
        var j = g.charAt(0).toUpperCase() + g.slice(1),
        h = (g + " " + W.join(j + " ") + j).split(" ");
        return F(f, "string") || F(f, "undefined") ? S(h, f) : (h = (g + " " + V.join(j + " ") + j).split(" "), Q(h, f, k))
    }
    var ag = "2.6.3",
    af = {},
    ae = !0,
    ad = ai.documentElement,
    ac = "modernizr",
    ab = ai.createElement(ac),
    aa = ab.style,
    Z,
    Y = {}.toString,
    X = "Webkit Moz O ms",
    W = X.split(" "),
    V = X.toLowerCase().split(" "),
    T = {},
    R = {},
    P = {},
    N = [],
    M = N.slice,
    K,
    J = {}.hasOwnProperty,
    I; ! F(J, "undefined") && !F(J.call, "undefined") ? I = function(d, c) {
        return J.call(d, c)
    }: I = function(d, c) {
        return c in d && F(d.constructor.prototype[c], "undefined")
    },
    Function.prototype.bind || (Function.prototype.bind = function(a) {
        var h = this;
        if (typeof h != "function") {
            throw new TypeError
        }
        var g = M.call(arguments, 1),
        f = function() {
            if (this instanceof f) {
                var b = function() {};
                b.prototype = h.prototype;
                var d = new b,
                c = h.apply(d, g.concat(M.call(arguments)));
                return Object(c) === c ? c: d
            }
            return h.apply(a, g.concat(M.call(arguments)))
        };
        return f
    }),
    T.backgroundsize = function() {
        return O("backgroundSize")
    };
    for (var L in T) {
        I(T, L) && (K = L.toLowerCase(), af[K] = T[L](), N.push((af[K] ? "": "no-") + K))
    }
    return af.addTest = function(e, c) {
        if (typeof e == "object") {
            for (var f in e) {
                I(e, f) && af.addTest(f, e[f])
            }
        } else {
            e = e.toLowerCase();
            if (af[e] !== ah) {
                return af
            }
            c = typeof c == "function" ? c() : c,
            typeof ae != "undefined" && ae && (ad.className += " " + (c ? "": "no-") + e),
            af[e] = c
        }
        return af
    },
    H(""),
    ab = Z = null,
    af._version = ag,
    af._domPrefixes = V,
    af._cssomPrefixes = W,
    af.testProp = function(b) {
        return S([b])
    },
    af.testAllProps = O,
    ad.className = ad.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (ae ? " js " + N.join(" ") : ""),
    af
} (this, this.document);
/*!
 * Plugins
 * 
 */
if (! (window.console && console.log)) { (function() {
        var d = function() {};
        var b = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "markTimeline", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
        var c = b.length;
        var a = window.console = {};
        while (c--) {
            a[b[c]] = d
        }
    } ());
    /*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 * 
 */

} (function(f, b, g) {
    var a = /\+/g;
    function e(h) {
        return h
    }
    function c(h) {
        return decodeURIComponent(h.replace(a, " "))
    }
    var d = f.cookie = function(n, m, r) {
        if (m !== g) {
            r = f.extend({},
            d.defaults, r);
            if (m === null) {
                r.expires = -1
            }
            if (typeof r.expires === "number") {
                var o = r.expires,
                q = r.expires = new Date();
                q.setDate(q.getDate() + o)
            }
            m = d.json ? JSON.stringify(m) : String(m);
            return (b.cookie = [encodeURIComponent(n), "=", d.raw ? m: encodeURIComponent(m), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path: "", r.domain ? "; domain=" + r.domain: "", r.secure ? "; secure": ""].join(""))
        }
        var h = d.raw ? e: c;
        var p = b.cookie.split("; ");
        for (var l = 0, k; (k = p[l] && p[l].split("=")); l++) {
            if (h(k.shift()) === n) {
                var j = h(k.join("="));
                return d.json ? JSON.parse(j) : j
            }
        }
        return null
    };
    d.defaults = {};
    f.removeCookie = function(j, h) {
        if (f.cookie(j) !== null) {
            f.cookie(j, null, h);
            return true
        }
        return false
    }
})(jQuery, document);
/*   美化：格式化代码，使之容易阅读			*/
/*   净化：去掉代码中多余的注释、换行、空格等	*/
/*   压缩：将代码压缩为更小体积，便于传输		*/
/*   解压：将压缩后的代码转换为人可以阅读的格式	*/

/*   如果有用，请别忘了推荐给你的朋友：		*/
/*   javascript在线美化、净化、压缩、解压：http://jsbeauty.iyi.cn   */

/*   以下是演示代码				*/

var getPositionLite = function(el) {
    var x = 0,
    y = 0;
    while (el) {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.offsetParent
    }
    return {
        x: x,
        y: y
    }
};
/*   更新记录：					*/
var history = {
    'v1.0': ['2009-08-07', '代码美化功能上线'],
    'v1.1': ['2009-08-08', '代码净化、压缩功能上线'],
    'v1.2': ['2009-08-09', '代码解压功能上线'],
    'v1.21': ['2009-08-10', '修正代码多次压缩后不能解压的bug'],
    'v1.22': ['2009-08-10', '修正可能误解压的bug']

};