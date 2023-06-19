!(function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw ((j.code = "MODULE_NOT_FOUND"), j);
            }
            var k = (c[g] = { exports: {} });
            b[g][0].call(
                k.exports,
                function (a) {
                    var c = b[g][1][a];
                    return e(c ? c : a);
                },
                k,
                k.exports,
                a,
                b,
                c,
                d
            );
        }
        return c[g].exports;
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e;
})(
    {
        1: [
            function (a, b, c) {
                "use strict";
                function d(a) {
                    return "Think you've got rhythm? I scored " + a + " out of 1000 points. Can you do any better?";
                }
                function e(a, b, c) {
                    return c.indexOf(a) === b;
                }
                function f(a) {
                    var b = z
                            .map(function (a) {
                                return Math.round(a.missPerc);
                            })
                            .join(","),
                        c = z
                            .map(function (a) {
                                return a.inputType;
                            })
                            .filter(e)
                            .sort()
                            .join(",");
                    r.find("#attempts").html(D).end().find("#total-latest").html(a).end().find("#scores-latest").html(b).end().find("#inputType").html(c),
                        1 === D && r.find("#total-original").html(a).end().find("#scores-original").html(b),
                        D++;
                }
                function g() {
                    n.find("li").removeClass("visible");
                    var a = z
                            .map(function (a) {
                                return a.score;
                            })
                            .reduce(function (a, b) {
                                return a + b;
                            }, 0),
                        b = z.length * C;
                    o
                        .fadeIn(400, function () {
                            u(z, B);
                        })
                        .find("#score")
                        .text(a)
                        .end()
                        .find("h3 span")
                        .text(b),
                        $(".social-likes").socialLikes({ title: d(a) }),
                        p.addClass("showResults"),
                        f(a),
                        dataLayer.push({ event: "new_score" });
                }
                function h() {
                    if ((F--, (3 === A || 5 === A) && 6 > F && n.find(".visible").find("div").fadeIn(300).text(F), !(F > 0))) {
                        switch (
                            (n
                                .find("li")
                                .removeClass("visible")
                                .end()
                                .find("#m" + A)
                                .addClass("visible"),
                            (F = E[A]),
                            A)
                        ) {
                            case 3:
                                (z = []),
                                    l.fade(1, 0, 1600, function () {
                                        l.stop();
                                    });
                                break;
                            case E.length:
                                window.clearTimeout(m), g();
                        }
                        A++;
                    }
                }
                function i(a, b) {
                    var c = {};
                    (c.duration = b - a), (c.miss = c.duration - x), (c.missPerc = (c.miss / x) * 100);
                    var d = Math.max(0, 1 - Math.abs(c.missPerc) / B);
                    return (c.score = Math.round(d * C)), c;
                }
                function j(a) {
                    if (!(A > E.length)) {
                        A > 3 &&
                            (q.removeClass("visible"),
                            window.clearTimeout(m),
                            (m = window.setTimeout(function () {
                                q.addClass("visible");
                            }, 5e3))),
                            h();
                        var b = window.performance.now(),
                            c = i(y, b);
                        (c.inputType = a.type), 0 !== y && F && z.push(c), (y = b);
                        var d = t.sample(H);
                        s.createObject(d), 32 === a.charCode && a.preventDefault();
                    }
                }
                function k() {
                    function a(b) {
                        (b.charCode && 13 !== b.charCode) ||
                            (b.preventDefault(),
                            b.stopPropagation(),
                            l.play().fade(0, 1, 2300),
                            $("#start").removeClass("visible"),
                            p.find("header").fadeOut(300, function () {
                                v ? $("body").off("tap").on("tap", j) : $("body").off("keypress").on("click keypress", j), $("#m0").addClass("visible");
                            }),
                            $(window).off("keypress", a));
                    }
                    $("#loading").removeClass("visible"), $("#start").addClass("visible").find("#play").on("click", a), $(window).on("keypress", a);
                }
                var l,
                    m,
                    n = $("#messages"),
                    o = $("#results"),
                    p = $("#container"),
                    q = $("#restart"),
                    r = $("#gaData"),
                    s = a("./canvas"),
                    t = a("./utils"),
                    u = a("./chart"),
                    v = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
                    w = 120,
                    x = (60 / w) * 1e3,
                    y = 0,
                    z = [],
                    A = 0,
                    B = 20,
                    C = 50,
                    D = 1,
                    E = n
                        .find("li")
                        .map(function () {
                            return $(this).data("beats");
                        })
                        .get(),
                    F = 0,
                    G = { pink: "#ff5fac", green: "#72e987", yellow: "#f9f973", blue: "#32e7fd", turquoise: "#44f0cd" },
                    H = $.map(G, function (a) {
                        return a;
                    });
                p.on("click", ".restart", function (a) {
                    a.preventDefault(),
                        a.stopPropagation(),
                        o.fadeOut(200).find("#chart").find("*").remove(),
                        p.removeClass("showResults"),
                        q.removeClass("visible"),
                        n.find("div").text(5).filter(".lateOpen").hide(),
                        (A = 2),
                        (F = 0),
                        l.play().fade(0, 1, 2300),
                        h();
                }),
                    (l = new Howl({ urls: ["../../../sounds/creatives/rhythm/kickdrum120bpm.mp3"], loop: !0, onload: k }));
            },
            { "./canvas": 2, "./chart": 3, "./utils": 6 },
        ],
        2: [
            function (a, b, c) {
                "use strict";
                function d() {
                    (m = window.innerWidth), (n = window.innerHeight), (s.width = m), (s.height = n), (o = 0.3 * Math.min(m, n)), (p = 0.02 * o);
                }
                function e() {
                    t.clearRect(0, 0, m, n);
                }
                function f() {
                    for (var a = "0123456789ABCDEF".split(""), b = "#", c = 0; 6 > c; c++) b += a[Math.floor(16 * Math.random())];
                    return b;
                }
                function g(a) {
                    return a * Math.min(Math.max(0.1, Math.random()), 0.9);
                }
                function h(a, b, c, d, e, f, g) {
                    if (3 > e) return void a.arc(b, c, d, 0, 2 * Math.PI, !1);
                    var h = (2 * Math.PI) / e;
                    (h = g ? -h : h), a.translate(b, c), a.rotate(f), a.moveTo(d, 0);
                    for (var i = 1; e > i; i++) a.lineTo(d * Math.cos(h * i), d * Math.sin(h * i));
                    a.closePath();
                }
                function i(a, b, c, d, e, f, g) {
                    t.save(), (t.globalAlpha = d), t.beginPath(), h(t, a, b, c, f, g), (t.fillStyle = e || "#ac36da"), t.fill(), t.restore();
                }
                function j() {
                    if (((z += y), 0 !== y && A.push(1e3 / y), z > 400)) {
                        var a = 0,
                            b = A.length;
                        A.forEach(function (b) {
                            a += b;
                        }),
                            (a = Math.round(a / b)),
                            r.text(Math.round(a) + " fps"),
                            (A = []),
                            (z = 0);
                    }
                }
                function k(a) {
                    0 === x && (x = a), (y = a - x), (x = a);
                }
                function l(a) {
                    e(),
                        k(a),
                        u.forEach(function (a) {
                            if (((a.t += y), 0 !== y && ((a.radius = Math.max(a.radius - p, 0)), (a.alpha = Math.min(a.alpha + w, 1))), a.radius >= 0)) {
                                var b = a.origin.x,
                                    c = a.origin.y;
                                i(b, c, a.radius, a.alpha, a.colour, a.sides, a.angle);
                            } else a.dead = !0;
                        }),
                        v && j(),
                        (u = u.filter(function (a) {
                            return !a.dead;
                        })),
                        requestAnimationFrame(l);
                }
                var m,
                    n,
                    o,
                    p,
                    q = a("./utils"),
                    r = $("<p>", { id: "values" }),
                    s = document.getElementById("canvas"),
                    t = s.getContext("2d");
                d(), $(window).resize(d);
                var u = [],
                    v = !1,
                    w = 0.05,
                    x = 0,
                    y = 0;
                c.createObject = function (a) {
                    u.push({ origin: { x: g(m), y: g(n) }, radius: o, alpha: 0, colour: a || f(), sides: q.sample([0, 3, 4, 5, 6, 8]), angle: 2 * Math.PI * Math.random(), t: 0 });
                };
                var z = 0,
                    A = [];
                requestAnimationFrame(l), "debug" === window.location.hash.substr(1) && ((v = !0), r.css({ margin: 0, position: "fixed", top: "10px", left: "10px", "z-index": 99 }).appendTo("body")), (c.DEBUG = v);
            },
            { "./utils": 6 },
        ],
        3: [
            function (a, b, c) {
                b.exports = function (a, b) {
                    "use strict";
                    var c = $("#chart").width(),
                        d = 500,
                        e = { top: 50, right: 20, bottom: 30, left: 20 },
                        f = c - e.left - e.right,
                        g = d - e.top - e.bottom,
                        h = b,
                        i = -h,
                        j = 500,
                        k = function (a, b) {
                            return 80 * b;
                        },
                        l = function (a) {
                            return o(a.x);
                        },
                        m = function (a) {
                            var b = Math.min(h, Math.max(i, a.missPerc));
                            return o(b);
                        },
                        n = function (a, b) {
                            return p(b);
                        },
                        o = d3.scale.linear().domain([i, h]).range([0, f]),
                        p = d3.scale
                            .ordinal()
                            .domain(
                                a.map(function (a, b) {
                                    return b;
                                })
                            )
                            .rangeRoundBands([0, g], 0.2),
                        q = d3
                            .select("#chart")
                            .html("")
                            .attr("height", d)
                            .append("g")
                            .attr("transform", "translate(" + e.left + "," + e.top + ")"),
                        r = [
                            { x: i, label: "Too early", align: "start", score: 0 },
                            { x: 0, label: "Perfect timing", align: "middle", score: 50 },
                            { x: h, label: "Too late", align: "end", score: 0 },
                        ],
                        s = q.selectAll(".yAxis").data(r).enter().append("g").attr("class", "yAxis");
                    s.attr("opacity", "1e-6").transition(777).attr("opacity", 1),
                        s
                            .append("line")
                            .attr("y1", p(0) - 15)
                            .attr("y2", p(a.length - 1) + 15)
                            .attr("x1", l)
                            .attr("x2", l),
                        s
                            .append("text")
                            .text(function (a) {
                                return a.label;
                            })
                            .attr("text-anchor", function (a) {
                                return a.align;
                            })
                            .attr("y", p(0))
                            .attr("dy", -30)
                            .attr("x", l),
                        s
                            .append("text")
                            .text(function (a) {
                                return a.score + " pts";
                            })
                            .attr("text-anchor", function (a) {
                                return a.align;
                            })
                            .attr("y", p(a.length - 1))
                            .attr("dy", 40)
                            .attr("x", l);
                    var t = q
                            .selectAll(".beat")
                            .data(a)
                            .enter()
                            .append("g")
                            .attr("class", "beat")
                            .attr("title", function (a) {
                                return Math.round(a.dur) + "ms";
                            }),
                        u = t.append("circle").attr("r", 7).attr("cy", n).attr("cx", o(0));
                    u.transition("init").duration(j).delay(k).attr("cx", m), t.append("line").attr("y1", n).attr("y2", n).attr("x1", o(0)).attr("x2", o(0)).transition().duration(j).delay(k).attr("x1", m);
                    var v = t
                        .append("text")
                        .text(function (a) {
                            return a.score;
                        })
                        .attr("opacity", "1e-6")
                        .attr("y", n)
                        .attr("x", o(0))
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "middle");
                    v.transition("init2").duration(j).delay(k).attr("x", m),
                        t
                            .on("mouseenter", function () {
                                var a = d3.select(this).transition();
                                a.select("circle").attr("r", 14), a.select("text").delay(100).attr("opacity", 1);
                            })
                            .on("mouseleave", function () {
                                u.transition().attr("r", 7), v.transition().attr("opacity", "1e-6");
                            });
                };
            },
            {},
        ],
        4: [
            function (a, b, c) {
                $(function () {
                    "use strict";
                    var b = a("./utils");
                    a("./tap"), a("./canvas"), a("./beats");
                    var c = $("#embed");
                    $(".info").on("click", function (a) {
                        a.preventDefault(), a.stopPropagation(), $("#infoIcon").toggleClass("active").find("i").toggleClass("icon-close"), $("#about").slideToggle();
                    }),
                        $(".embedLink").on("click", function (a) {
                            a.preventDefault(), c.hasClass("visible") ? c.animate({ bottom: "-200px" }, 200).fadeOut({ queue: !1 }).removeClass("visible") : c.animate({ bottom: "0px" }, 300).fadeIn({ queue: !1 }).addClass("visible");
                        }),
                        $(".social-likes")
                            .socialLikes()
                            .on("counter.social-likes", function (a, c, d) {
                                d > 0 && $(".social-likes__counter_" + c).text(b.si(d));
                            });
                });
            },
            { "./beats": 1, "./canvas": 2, "./tap": 5, "./utils": 6 },
        ],
        5: [
            function (a, b, c) {
                "use strict";
                $.event.special.tap = {
                    distanceThreshold: 10,
                    timeThreshold: 500,
                    setup: function () {
                        var a = this,
                            b = $(a);
                        b.on("touchstart", function (c) {
                            function d() {
                                clearTimeout(g), b.off("touchmove", f).off("touchend", e);
                            }
                            function e(b) {
                                d(), h === b.target && $.event.simulate("tap", a, b);
                            }
                            function f(a) {
                                var b = a.originalEvent.touches[0],
                                    c = b.pageX,
                                    e = b.pageY;
                                (Math.abs(c - j) > l || Math.abs(e - k) > l) && d();
                            }
                            var g,
                                h = c.target,
                                i = c.originalEvent.touches[0],
                                j = i.pageX,
                                k = i.pageY,
                                l = $.event.special.tap.distanceThreshold;
                            (g = setTimeout(d, $.event.special.tap.timeThreshold)), b.on("touchmove", f).on("touchend", e);
                        });
                    },
                };
            },
            {},
        ],
        6: [
            function (a, b, c) {
                "use strict";
                (c.roundLarge = function (a) {
                    for (var b = 1e6; b >= 10; b /= 10) if (a > 10 * b) return Math.round(a / b) * b;
                    return Math.round(a);
                }),
                    (c.si = function (a) {
                        var b = { M: 1e6, K: 1e3 };
                        for (var d in b) if (a > b[d]) return c.roundLarge(a) / b[d] + d;
                        return Math.round(a);
                    }),
                    (c.sample = function (a) {
                        return a[Math.floor(Math.random() * a.length)];
                    }),
                    (function () {
                        for (var a = 0, b = ["webkit", "moz"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
                            (window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"]), (window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"]);
                        window.requestAnimationFrame ||
                            (window.requestAnimationFrame = function (b) {
                                var c = new Date().getTime(),
                                    d = Math.max(0, 16 - (c - a)),
                                    e = window.setTimeout(function () {
                                        b(c + d);
                                    }, d);
                                return (a = c + d), e;
                            }),
                            window.cancelAnimationFrame ||
                                (window.cancelAnimationFrame = function (a) {
                                    clearTimeout(a);
                                });
                    })();
            },
            {},
        ],
    },
    {},
    [4]
);
