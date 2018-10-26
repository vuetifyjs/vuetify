function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import en from '../../../locale/en';
import { getObjectValueByPath } from '../../../util/helpers';
import { consoleError, consoleWarn } from '../../../util/console';
var LANG_PREFIX = '$vuetify.';
var fallback = Symbol('Lang fallback');
function getTranslation(locale, key) {
    var usingFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var shortKey = key.replace(LANG_PREFIX, '');
    var translation = getObjectValueByPath(locale, shortKey, fallback);
    if (translation === fallback) {
        if (usingFallback) {
            consoleError('Translation key "' + shortKey + '" not found in fallback');
            translation = key;
        } else {
            consoleWarn('Translation key "' + shortKey + '" not found, falling back to default');
            translation = getTranslation(en, key, true);
        }
    }
    return translation;
}
export default function lang() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return {
        locales: Object.assign({ en: en }, config.locales),
        current: config.current || 'en',
        t: function t(key) {
            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            if (!key.startsWith(LANG_PREFIX)) return key;
            if (config.t) return config.t.apply(config, [key].concat(_toConsumableArray(params)));
            var translation = getTranslation(this.locales[this.current], key);
            return translation.replace(/\{(\d+)\}/g, function (match, index) {
                return String(params[+index]);
            });
        }
    };
}
//# sourceMappingURL=lang.js.map