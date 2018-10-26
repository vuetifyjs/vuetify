'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _theme = require('../../../util/theme');

var Theme = _interopRequireWildcard(_theme);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    data: function data() {
        return {
            style: null
        };
    },
    computed: {
        parsedTheme: function parsedTheme() {
            return Theme.parse(this.$vuetify.theme);
        },

        /** @return string */
        generatedStyles: function generatedStyles() {
            var theme = this.parsedTheme;
            var css = void 0;
            if (this.$vuetify.options.themeCache != null) {
                css = this.$vuetify.options.themeCache.get(theme);
                if (css != null) return css;
            }
            css = Theme.genStyles(theme, this.$vuetify.options.customProperties);
            if (this.$vuetify.options.minifyTheme != null) {
                css = this.$vuetify.options.minifyTheme(css);
            }
            if (this.$vuetify.options.themeCache != null) {
                this.$vuetify.options.themeCache.set(theme, css);
            }
            return css;
        },
        vueMeta: function vueMeta() {
            if (this.$vuetify.theme === false) return {};
            var options = {
                cssText: this.generatedStyles,
                id: 'vuetify-theme-stylesheet',
                type: 'text/css'
            };
            if (this.$vuetify.options.cspNonce) {
                options.nonce = this.$vuetify.options.cspNonce;
            }
            return {
                style: [options]
            };
        }
    },
    // Regular vue-meta
    metaInfo: function metaInfo() {
        return this.vueMeta;
    },

    // Nuxt
    head: function head() {
        return this.vueMeta;
    },

    watch: {
        generatedStyles: function generatedStyles() {
            !this.meta && this.applyTheme();
        }
    },
    created: function created() {
        if (this.$vuetify.theme === false) return;
        if (this.$meta) {
            // Vue-meta
            // Handled by metaInfo()/nuxt()
        } else if (typeof document === 'undefined' && this.$ssrContext) {
            // SSR
            var nonce = this.$vuetify.options.cspNonce ? ' nonce="' + this.$vuetify.options.cspNonce + '"' : '';
            this.$ssrContext.head = this.$ssrContext.head || '';
            this.$ssrContext.head += '<style type="text/css" id="vuetify-theme-stylesheet"' + nonce + '>' + this.generatedStyles + '</style>';
        } else if (typeof document !== 'undefined') {
            // Client-side
            this.genStyle();
            this.applyTheme();
        }
    },

    methods: {
        applyTheme: function applyTheme() {
            if (this.style) this.style.innerHTML = this.generatedStyles;
        },
        genStyle: function genStyle() {
            var style = document.getElementById('vuetify-theme-stylesheet');
            if (!style) {
                style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'vuetify-theme-stylesheet';
                if (this.$vuetify.options.cspNonce) {
                    style.setAttribute('nonce', this.$vuetify.options.cspNonce);
                }
                document.head.appendChild(style);
            }
            this.style = style;
        }
    }
};
//# sourceMappingURL=app-theme.js.map