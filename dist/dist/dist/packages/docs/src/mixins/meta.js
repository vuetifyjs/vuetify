export default {
    data: function () {
        return ({
            meta: {},
            _description: {},
            _keywords: {}
        });
    },
    computed: {
        title: function () {
            return this.meta.title || 'Material Component Framework';
        },
        description: function () {
            return this.meta.description;
        },
        keywords: function () {
            return this.meta.keywords;
        }
    },
    watch: {
        $route: function () {
            this.setMeta();
        },
        meta: {
            deep: true,
            handler: function () {
                document.title = this.title + " \u2014 Vuetify.js";
                this._description.setAttribute('content', this.description);
                this._keywords.setAttribute('content', this.keywords);
            }
        }
    },
    created: function () {
        if (process.env.VUE_ENV === 'client')
            return;
        this.setMeta();
        this.$ssrContext.title = this.title + " \u2014 Vuetify.js";
        this.$ssrContext.description = this.description;
        this.$ssrContext.keywords = this.keywords;
    },
    mounted: function () {
        this.bootstrapMeta();
    },
    methods: {
        bootstrapMeta: function () {
            if (typeof document === 'undefined')
                return;
            this._title = document.title;
            this._description = document.querySelector('meta[name="description"]');
            this._keywords = document.querySelector('meta[name="keywords"]');
            this.setMeta();
        },
        setMeta: function () {
            var path = this.$route.path.split('/').slice(2).join('/');
            var lang = this.$route.path.split('/')[1];
            var meta = this.$i18n.getLocaleMessage(lang).Meta || {};
            this.meta = meta[path] || this.getFallbackMeta(path) || {};
        },
        getFallbackMeta: function (path) {
            var fallbackmeta = this.$i18n.getLocaleMessage(this.$i18n.fallbackLocale).Meta;
            if (process.env.NODE_ENV === 'development') {
                console.warn('Falling back to english meta for ' + (path || '/'));
            }
            return fallbackmeta[path];
        }
    }
};
//# sourceMappingURL=meta.js.map
//# sourceMappingURL=meta.js.map
//# sourceMappingURL=meta.js.map