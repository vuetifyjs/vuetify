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
var BREAKPOINTS_DEFAULTS = {
    thresholds: {
        xs: 600,
        sm: 960,
        md: 1280,
        lg: 1920
    },
    scrollbarWidth: 16
};
/**
 * Factory function for the breakpoint mixin.
 */
export default function breakpoint(opts) {
    if (opts === void 0) {
        opts = {};
    }
    if (!opts) {
        opts = {};
    }
    return Vue.extend({
        data: function () {
            return __assign({ clientHeight: getClientHeight(), clientWidth: getClientWidth(), resizeTimeout: undefined }, BREAKPOINTS_DEFAULTS, opts);
        },
        computed: {
            breakpoint: function () {
                var xs = this.clientWidth < this.thresholds.xs;
                var sm = this.clientWidth < this.thresholds.sm && !xs;
                var md = this.clientWidth < (this.thresholds.md - this.scrollbarWidth) && !(sm || xs);
                var lg = this.clientWidth < (this.thresholds.lg - this.scrollbarWidth) && !(md || sm || xs);
                var xl = this.clientWidth >= (this.thresholds.lg - this.scrollbarWidth);
                var xsOnly = xs;
                var smOnly = sm;
                var smAndDown = (xs || sm) && !(md || lg || xl);
                var smAndUp = !xs && (sm || md || lg || xl);
                var mdOnly = md;
                var mdAndDown = (xs || sm || md) && !(lg || xl);
                var mdAndUp = !(xs || sm) && (md || lg || xl);
                var lgOnly = lg;
                var lgAndDown = (xs || sm || md || lg) && !xl;
                var lgAndUp = !(xs || sm || md) && (lg || xl);
                var xlOnly = xl;
                var name;
                switch (true) {
                    case (xs):
                        name = 'xs';
                        break;
                    case (sm):
                        name = 'sm';
                        break;
                    case (md):
                        name = 'md';
                        break;
                    case (lg):
                        name = 'lg';
                        break;
                    default:
                        name = 'xl';
                        break;
                }
                return {
                    // Definite breakpoint.
                    xs: xs,
                    sm: sm,
                    md: md,
                    lg: lg,
                    xl: xl,
                    // Useful e.g. to construct CSS class names dynamically.
                    name: name,
                    // Breakpoint ranges.
                    xsOnly: xsOnly,
                    smOnly: smOnly,
                    smAndDown: smAndDown,
                    smAndUp: smAndUp,
                    mdOnly: mdOnly,
                    mdAndDown: mdAndDown,
                    mdAndUp: mdAndUp,
                    lgOnly: lgOnly,
                    lgAndDown: lgAndDown,
                    lgAndUp: lgAndUp,
                    xlOnly: xlOnly,
                    // For custom breakpoint logic.
                    width: this.clientWidth,
                    height: this.clientHeight,
                    thresholds: this.thresholds,
                    scrollbarWidth: this.scrollbarWidth
                };
            }
        },
        created: function () {
            if (typeof window === 'undefined')
                return;
            window.addEventListener('resize', this.onResize, { passive: true });
        },
        beforeDestroy: function () {
            if (typeof window === 'undefined')
                return;
            window.removeEventListener('resize', this.onResize);
        },
        methods: {
            onResize: function () {
                clearTimeout(this.resizeTimeout);
                // Added debounce to match what
                // v-resize used to do but was
                // removed due to a memory leak
                // https://github.com/vuetifyjs/vuetify/pull/2997
                this.resizeTimeout = window.setTimeout(this.setDimensions, 200);
            },
            setDimensions: function () {
                this.clientHeight = getClientHeight();
                this.clientWidth = getClientWidth();
            }
        }
    });
}
// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
function getClientWidth() {
    if (typeof document === 'undefined')
        return 0; // SSR
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
function getClientHeight() {
    if (typeof document === 'undefined')
        return 0; // SSR
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
//# sourceMappingURL=breakpoint.js.map
//# sourceMappingURL=breakpoint.js.map
//# sourceMappingURL=breakpoint.js.map
//# sourceMappingURL=breakpoint.js.map
//# sourceMappingURL=breakpoint.js.map