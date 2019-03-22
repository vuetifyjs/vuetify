var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
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
// Polyfills for IE Support
import 'babel-polyfill';
import 'event-source-polyfill';
// Packages
import Vue from 'vue';
import Vuetify from 'vuetify';
// Bootstrap
import '@/components';
import '@/plugins';
import { createStore } from '@/store/index';
import { createRouter } from '@/router/index';
import { createI18n } from '@/i18n/index';
import { sync } from 'vuex-router-sync';
// Application
import App from './App.vue';
Vue.config.performance = process.env.NODE_ENV === 'development';
// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp(_a, ssrContext) {
    var _b = (_a === void 0 ? {} : _a).start, start = _b === void 0 ? function () { } : _b;
    return __awaiter(this, void 0, void 0, function () {
        var store, router, i18n, app, entry;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    store = createStore();
                    router = createRouter();
                    i18n = createI18n(ssrContext, router);
                    store.state.app.currentVersion = Vuetify.version;
                    // sync the router with the vuex store.
                    // this registers `store.state.route`
                    sync(store, router);
                    app = new Vue({
                        router: router,
                        store: store,
                        ssrContext: ssrContext,
                        i18n: i18n,
                        render: function (h) { return h(App); }
                    });
                    entry = { app: app, router: router, store: store };
                    return [4 /*yield*/, start(entry)];
                case 1:
                    _c.sent();
                    return [2 /*return*/, entry];
            }
        });
    });
}
//# sourceMappingURL=main.js.map
//# sourceMappingURL=main.js.map