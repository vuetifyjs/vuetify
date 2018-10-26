'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 */
/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 *
 */
exports.default = _vue2.default.extend({
    data: function data() {
        return {
            clientHeight: getClientHeight(),
            clientWidth: getClientWidth(),
            resizeTimeout: undefined
        };
    },
    computed: {
        breakpoint: function breakpoint() {
            var xs = this.clientWidth < 600;
            var sm = this.clientWidth < 960 && !xs;
            var md = this.clientWidth < 1280 - 16 && !(sm || xs);
            var lg = this.clientWidth < 1920 - 16 && !(md || sm || xs);
            var xl = this.clientWidth >= 1920 - 16;
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
            var name = void 0;
            switch (true) {
                case xs:
                    name = 'xs';
                    break;
                case sm:
                    name = 'sm';
                    break;
                case md:
                    name = 'md';
                    break;
                case lg:
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
                height: this.clientHeight
            };
        }
    },
    created: function created() {
        if (typeof window === 'undefined') return;
        window.addEventListener('resize', this.onResize, { passive: true });
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window === 'undefined') return;
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize: function onResize() {
            clearTimeout(this.resizeTimeout);
            // Added debounce to match what
            // v-resize used to do but was
            // removed due to a memory leak
            // https://github.com/vuetifyjs/vuetify/pull/2997
            this.resizeTimeout = window.setTimeout(this.setDimensions, 200);
        },
        setDimensions: function setDimensions() {
            this.clientHeight = getClientHeight();
            this.clientWidth = getClientWidth();
        }
    }
});
// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081

function getClientWidth() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
function getClientHeight() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
//# sourceMappingURL=breakpoint.js.map