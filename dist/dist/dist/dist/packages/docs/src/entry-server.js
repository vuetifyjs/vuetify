var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1)
                throw t[1];
            return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
import { createApp } from './main';
// ENV Variables
require('dotenv').config();
global.fetch = require('node-fetch');
var isDev = process.env.NODE_ENV !== 'production';
// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default (function (context) {
    return new Promise(function (resolve, reject) {
        return __awaiter(_this, void 0, void 0, function () {
            var s, _a, app, router, store;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        s = isDev && Date.now();
                        return [4 /*yield*/, createApp(undefined, context)
                            // set router's location
                        ];
                    case 1:
                        _a = _b.sent(), app = _a.app, router = _a.router, store = _a.store;
                        // set router's location
                        router.push(context.url);
                        // wait until router has resolved possible async hooks
                        router.onReady(function () {
                            var matchedComponents = router.getMatchedComponents();
                            // Call fetchData hooks on components matched by the route.
                            // A preFetch hook dispatches a store action and returns a Promise,
                            // which is resolved when the action is complete and store state has been
                            // updated.
                            Promise.all(__spread(matchedComponents.map(function (component) {
                                if (component.asyncData) {
                                    return component.asyncData({
                                        store: store,
                                        route: router.currentRoute
                                    });
                                }
                            }))).then(function () {
                                isDev && console.log("data pre-fetch: " + (Date.now() - s) + "ms");
                                // After all preFetch hooks are resolved, our store is now
                                // filled with the state needed to render the app.
                                // Expose the state on the render context, and let the request handler
                                // inline the state in the HTML response. This allows the client-side
                                // store to pick-up the server-side state without having to duplicate
                                // the initial data fetching on the client.
                                context.state = store.state;
                                resolve(app);
                            });
                        }, reject);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=entry-server.js.map
//# sourceMappingURL=entry-server.js.map
//# sourceMappingURL=entry-server.js.map
//# sourceMappingURL=entry-server.js.map