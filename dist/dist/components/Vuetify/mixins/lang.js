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
import en from '../../../locale/en';
import { getObjectValueByPath } from '../../../util/helpers';
import { consoleError, consoleWarn } from '../../../util/console';
var LANG_PREFIX = '$vuetify.';
var fallback = Symbol('Lang fallback');
function getTranslation(locale, key, usingFallback) {
    if (usingFallback === void 0) {
        usingFallback = false;
    }
    var shortKey = key.replace(LANG_PREFIX, '');
    var translation = getObjectValueByPath(locale, shortKey, fallback);
    if (translation === fallback) {
        if (usingFallback) {
            consoleError("Translation key \"" + shortKey + "\" not found in fallback");
            translation = key;
        }
        else {
            consoleWarn("Translation key \"" + shortKey + "\" not found, falling back to default");
            translation = getTranslation(en, key, true);
        }
    }
    return translation;
}
export default function lang(config) {
    if (config === void 0) {
        config = {};
    }
    return {
        locales: Object.assign({ en: en }, config.locales),
        current: config.current || 'en',
        t: function (key) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (!key.startsWith(LANG_PREFIX))
                return key;
            if (config.t)
                return config.t.apply(config, __spread([key], params));
            var translation = getTranslation(this.locales[this.current], key);
            return translation.replace(/\{(\d+)\}/g, function (match, index) {
                return String(params[+index]);
            });
        }
    };
}
//# sourceMappingURL=lang.js.map
//# sourceMappingURL=lang.js.map