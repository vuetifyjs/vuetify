import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '@/lang/en';
import languages from '@/data/i18n/languages.json';
Vue.use(VueI18n);
export function createI18n(ssrContext, router) {
    var fallbackLocale = 'en';
    var loadedLanguages = [];
    var globalLanguages = {};
    var locale = fallbackLocale;
    if (ssrContext && ssrContext.lang) {
        locale = ssrContext.lang;
    }
    else if (typeof document !== 'undefined') {
        locale = document.documentElement.lang;
    }
    // TODO: Hmm, if locale is set to something other than en-US by
    // ssr or document then what happens when it's not loaded?
    var i18n = new VueI18n({
        locale: locale,
        messages: { en: en },
        fallbackLocale: fallbackLocale
    });
    function setI18nLanguage(lang) {
        i18n.locale = lang;
        if (!ssrContext) {
            document.querySelector('html').setAttribute('lang', lang);
        }
        return lang;
    }
    function loadLanguageAsync(lang) {
        if (!loadedLanguages.includes(lang)) {
            var locale_1 = (languages.find(function (l) { return lang === l.alternate || lang === l.locale; }) || {}).locale;
            if (!locale_1)
                return Promise.reject(new Error('Language not found'));
            return import(/* webpackChunkName: "lang-[request]" */ "@/lang/" + locale_1).then(function (msgs) {
                loadedLanguages.push(lang);
                globalLanguages[lang] = msgs.default;
                i18n.setLocaleMessage(lang, globalLanguages[lang]);
                return Promise.resolve(setI18nLanguage(lang));
            }).catch(function (err) {
                console.log(err);
                throw err;
            });
        }
        return Promise.resolve(setI18nLanguage(lang));
    }
    router.beforeEach(function (to, from, next) {
        loadLanguageAsync(to.params.lang)
            .then(function () { return next(); })
            .catch(function () { return next('/' + fallbackLocale); });
    });
    return i18n;
}
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map