// From Vue, slightly modified
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m)
        return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length)
                o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
function noop() { }
if (typeof console === 'undefined') {
    window.console = {
        warn: noop,
        error: noop
    };
}
// avoid info messages during test
console.info = noop;
var asserted = [];
function createCompareFn(spy) {
    var hasWarned = function (msg) {
        var e_1, _a;
        try {
            for (var _b = __values(spy.calls.allArgs()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var args = _c.value;
                if (args.some(function (arg) { return (arg.toString().includes(msg)); }))
                    return true;
            }
        }
        catch (e_1_1) {
            e_1 = { error: e_1_1 };
        }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            }
            finally {
                if (e_1)
                    throw e_1.error;
            }
        }
        return false;
    };
    return {
        compare: function (msg) {
            asserted.push(msg);
            var warned = Array.isArray(msg)
                ? msg.some(hasWarned)
                : hasWarned(msg);
            return {
                pass: warned,
                message: warned
                    ? function () { return ("Expected message \"" + msg + "\" not to have been warned"); }
                    : function () { return ("Expected message \"" + msg + "\" to have been warned"); }
            };
        }
    };
}
function toHaveBeenWarnedInit() {
    // define custom matcher for warnings
    beforeEach(function () {
        asserted.length = 0;
        spyOn(console, 'warn');
        spyOn(console, 'error');
        jasmine.addMatchers({
            toHaveBeenWarned: function () { return createCompareFn(console.error); },
            toHaveBeenTipped: function () { return createCompareFn(console.warn); }
        });
    });
    afterEach(function (done) {
        var e_2, _a, e_3, _b;
        try {
            for (var _c = __values(['error', 'warn']), _d = _c.next(); !_d.done; _d = _c.next()) {
                var type = _d.value;
                var warned = function (msg) { return asserted.some(function (assertedMsg) { return msg.toString().includes(assertedMsg); }); };
                try {
                    for (var _e = __values(console[type].calls.allArgs()), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var args = _f.value;
                        if (!warned(args[0])) {
                            done.fail("Unexpected console." + type + " message: " + args[0]);
                            return;
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return))
                            _b.call(_e);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
            }
        }
        catch (e_2_1) {
            e_2 = { error: e_2_1 };
        }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return))
                    _a.call(_c);
            }
            finally {
                if (e_2)
                    throw e_2.error;
            }
        }
        done();
    });
}
export default toHaveBeenWarnedInit;
//# sourceMappingURL=to-have-been-warned.js.map
//# sourceMappingURL=to-have-been-warned.js.map