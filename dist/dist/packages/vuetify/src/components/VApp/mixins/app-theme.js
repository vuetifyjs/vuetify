import * as Theme from '../../../util/theme';
export default {
    data: function () {
        return ({
            style: null
        });
    },
    computed: {
        parsedTheme: function () {
            return Theme.parse(this.$vuetify.theme);
        },
        /** @return string */
        generatedStyles: function () {
            var theme = this.parsedTheme;
            var css;
            if (this.$vuetify.options.themeCache != null) {
                css = this.$vuetify.options.themeCache.get(theme);
                if (css != null)
                    return css;
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
        vueMeta: function () {
            if (this.$vuetify.theme === false)
                return {};
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
    metaInfo: function () {
        return this.vueMeta;
    },
    // Nuxt
    head: function () {
        return this.vueMeta;
    },
    watch: {
        generatedStyles: function () {
            !this.meta && this.applyTheme();
        }
    },
    created: function () {
        if (this.$vuetify.theme === false)
            return;
        if (this.$meta) {
            // Vue-meta
            // Handled by metaInfo()/nuxt()
        }
        else if (typeof document === 'undefined' && this.$ssrContext) {
            // SSR
            var nonce = this.$vuetify.options.cspNonce
                ? " nonce=\"" + this.$vuetify.options.cspNonce + "\""
                : '';
            this.$ssrContext.head = this.$ssrContext.head || '';
            this.$ssrContext.head += "<style type=\"text/css\" id=\"vuetify-theme-stylesheet\"" + nonce + ">" + this.generatedStyles + "</style>";
        }
        else if (typeof document !== 'undefined') {
            // Client-side
            this.genStyle();
            this.applyTheme();
        }
    },
    methods: {
        applyTheme: function () {
            if (this.style)
                this.style.innerHTML = this.generatedStyles;
        },
        genStyle: function () {
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
//# sourceMappingURL=app-theme.js.map