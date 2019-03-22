var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Vue from 'vue';
Vue.component('breakpoint', {
    created: function () {
        var name = this.$vuetify.breakpoint.name;
        var numbers = [
            this.$vuetify.breakpoint.height,
            this.$vuetify.breakpoint.width,
            this.$vuetify.breakpoint.scrollbarWidth
        ];
        var objects = [
            this.$vuetify.breakpoint.thresholds
        ];
        var booleans = [
            this.$vuetify.breakpoint.lg,
            this.$vuetify.breakpoint.lgAndDown,
            this.$vuetify.breakpoint.lgAndUp,
            this.$vuetify.breakpoint.lgOnly,
            this.$vuetify.breakpoint.md,
            this.$vuetify.breakpoint.mdAndDown,
            this.$vuetify.breakpoint.mdAndUp,
            this.$vuetify.breakpoint.mdOnly,
            this.$vuetify.breakpoint.sm,
            this.$vuetify.breakpoint.smAndDown,
            this.$vuetify.breakpoint.smAndUp,
            this.$vuetify.breakpoint.smOnly,
            this.$vuetify.breakpoint.xl,
            this.$vuetify.breakpoint.xlOnly,
            this.$vuetify.breakpoint.xs,
            this.$vuetify.breakpoint.xsOnly
        ];
    }
});
Vue.component('theme', {
    created: function () {
        // Can't do this, some components rely on the pre-defined values
        // this.$vuetify.theme = { primary: 123 }
        Object.assign(this.$vuetify.theme, {
            primary: 123
        });
        this.$vuetify.theme = __assign({}, this.$vuetify.theme, { primary: 132 });
    }
});
//# sourceMappingURL=global.js.map
//# sourceMappingURL=global.js.map
//# sourceMappingURL=global.js.map