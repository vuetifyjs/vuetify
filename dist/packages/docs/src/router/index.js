var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import Vue from 'vue';
import Router from 'vue-router';
import VueAnalytics from 'vue-analytics';
import scrollBehavior from './scroll-behavior';
import redirects from './301.json';
import languages from '@/data/i18n/languages.json';
Vue.use(Router);
// language regex:
// /^[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?$/
// /^[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}$/
var languageRegex = /^\/([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})(?:\/.*)?$/;
var fallbackLocale = languages.find(function (lang) { return lang.fallback === true; }).locale;
function getLanguageCookie() {
    if (typeof document === 'undefined')
        return;
    return new Map(document.cookie.split('; ').map(function (c) { return c.split('='); })).get('currentLanguage');
}
export function createRouter() {
    var router = new Router({
        base: __dirname,
        mode: 'history',
        scrollBehavior: scrollBehavior,
        routes: [
            {
                path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
                component: function () { return import(
                /* webpackChunkName: "root" */
                '@/views/Root.vue'); },
                props: function (route) { return ({ lang: route.params.lang }); },
                children: __spread(Object.keys(redirects).map(function (k) { return ({
                    path: k.replace(/^\//, ''),
                    redirect: function () { return redirects[k].replace(/^\//, ''); }
                }); }), [
                    {
                        path: '',
                        name: 'home/Home',
                        component: function () { return import(
                        /* webpackChunkName: "home" */
                        '@/pages/home/Page.vue'); }
                    },
                    {
                        path: 'examples/layouts/:page',
                        name: 'Layouts',
                        props: true,
                        component: function () { return import(
                        /* webpackChunkName: "layouts" */
                        '@/views/Layouts.vue'); }
                    },
                    {
                        path: ':namespace/:page/:section?',
                        name: 'Documentation',
                        props: function (route) { return ({
                            namespace: route.params.namespace,
                            page: route.params.page,
                            lang: route.params.lang
                        }); },
                        component: function () { return import(
                        /* webpackChunkName: "documentation" */
                        '@/pages/documentation/Page.vue'); }
                    },
                    {
                        path: '*',
                        redirect: function (to) {
                            var lang = "/" + (getLanguageCookie() || fallbackLocale);
                            if (!languageRegex.test(lang))
                                lang = "/" + fallbackLocale;
                            return "" + lang;
                        }
                    }
                ])
            },
            {
                path: '*',
                redirect: function (to) {
                    var lang = "/" + (getLanguageCookie() || fallbackLocale);
                    if (!languageRegex.test(lang))
                        lang = "/" + fallbackLocale;
                    return lang + "/404";
                }
            }
        ]
    });
    Vue.use(VueAnalytics, {
        id: 'UA-75262397-3',
        router: router,
        autoTracking: {
            page: process.env.NODE_ENV !== 'development',
            pageviewOnLoad: false
        },
        debug: process.env.DEBUG ? {
            enabled: true,
            trace: false,
            sendHitTask: true
        } : false
    });
    return router;
}
//# sourceMappingURL=index.js.map