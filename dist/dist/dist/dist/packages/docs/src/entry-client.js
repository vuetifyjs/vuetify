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
import 'vuetify/dist/vuetify.css';
import '@mdi/font/css/materialdesignicons.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'es6-promise/auto';
import { createApp } from './main';
import WebFontLoader from 'webfontloader';
// async load fonts
WebFontLoader.load({
    google: {
        families: [
            'Roboto:100,300,400,500,700,900',
            'Roboto+Mono:500'
        ]
    }
});
createApp({
    start: function (_a) {
        var app = _a.app, router = _a.router, store = _a.store;
        // prime the store with server-initialized state.
        // the state is determined during SSR and inlined in the page markup.
        if (window.__INITIAL_STATE__) {
            store.replaceState(window.__INITIAL_STATE__);
        }
        // Add router hook for handling asyncData.
        // Doing it after initial route is resolved so that we don't double-fetch
        // the data that we already have. Using router.beforeResolve() so that all
        // async components are resolved.
        router.beforeResolve(function (to, from, next) {
            var matched = router.getMatchedComponents(to);
            var prevMatched = router.getMatchedComponents(from);
            var diffed = false;
            var activated = matched.filter(function (c, i) {
                return diffed || (diffed = (prevMatched[i] !== c));
            });
            if (!activated.length)
                return next();
            Promise.all(__spread(activated.map(function (c) {
                if (c.asyncData) {
                    return c.asyncData({
                        store: store,
                        route: to
                    });
                }
            }))).finally(next);
        });
        // wait until router has resolved all async before hooks
        // and async components...
        router.onReady(function () {
            // actually mount to DOM
            app.$mount('#app');
        });
    }
});
//# sourceMappingURL=entry-client.js.map
//# sourceMappingURL=entry-client.js.map
//# sourceMappingURL=entry-client.js.map
//# sourceMappingURL=entry-client.js.map