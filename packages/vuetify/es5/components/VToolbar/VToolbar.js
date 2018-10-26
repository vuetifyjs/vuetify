'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins

// Directives


require('../../../src/stylus/components/_toolbar.styl');

var _applicationable = require('../../mixins/applicationable');

var _applicationable2 = _interopRequireDefault(_applicationable);

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _ssrBootable = require('../../mixins/ssr-bootable');

var _ssrBootable2 = _interopRequireDefault(_ssrBootable);

var _scroll = require('../../directives/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-toolbar',
    directives: { Scroll: _scroll2.default },
    mixins: [(0, _applicationable2.default)('top', ['clippedLeft', 'clippedRight', 'computedHeight', 'invertedScroll', 'manualScroll']), _colorable2.default, _ssrBootable2.default, _themeable2.default],
    props: {
        card: Boolean,
        clippedLeft: Boolean,
        clippedRight: Boolean,
        dense: Boolean,
        extended: Boolean,
        extensionHeight: {
            type: [Number, String],
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        flat: Boolean,
        floating: Boolean,
        height: {
            type: [Number, String],
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        invertedScroll: Boolean,
        manualScroll: Boolean,
        prominent: Boolean,
        scrollOffScreen: Boolean,
        /* @deprecated */
        scrollToolbarOffScreen: Boolean,
        scrollTarget: String,
        scrollThreshold: {
            type: Number,
            default: 300
        },
        tabs: Boolean
    },
    data: function data() {
        return {
            activeTimeout: null,
            currentScroll: 0,
            heights: {
                mobileLandscape: 48,
                mobile: 56,
                desktop: 64,
                dense: 48
            },
            isActive: true,
            isExtended: false,
            isScrollingUp: false,
            previousScroll: null,
            previousScrollDirection: null,
            savedScroll: 0,
            target: null
        };
    },
    computed: {
        canScroll: function canScroll() {
            // TODO: remove
            if (this.scrollToolbarOffScreen) {
                (0, _console.deprecate)('scrollToolbarOffScreen', 'scrollOffScreen', this);
                return true;
            }
            return this.scrollOffScreen || this.invertedScroll;
        },
        computedContentHeight: function computedContentHeight() {
            if (this.height) return parseInt(this.height);
            if (this.dense) return this.heights.dense;
            if (this.prominent || this.$vuetify.breakpoint.mdAndUp) return this.heights.desktop;
            if (this.$vuetify.breakpoint.smAndDown && this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height) return this.heights.mobileLandscape;
            return this.heights.mobile;
        },
        computedExtensionHeight: function computedExtensionHeight() {
            if (this.tabs) return 48;
            if (this.extensionHeight) return parseInt(this.extensionHeight);
            return this.computedContentHeight;
        },
        computedHeight: function computedHeight() {
            if (!this.isExtended) return this.computedContentHeight;
            return this.computedContentHeight + this.computedExtensionHeight;
        },
        computedMarginTop: function computedMarginTop() {
            if (!this.app) return 0;
            return this.$vuetify.application.bar;
        },
        classes: function classes() {
            return _extends({
                'v-toolbar': true,
                'elevation-0': this.flat || !this.isActive && !this.tabs && this.canScroll,
                'v-toolbar--absolute': this.absolute,
                'v-toolbar--card': this.card,
                'v-toolbar--clipped': this.clippedLeft || this.clippedRight,
                'v-toolbar--dense': this.dense,
                'v-toolbar--extended': this.isExtended,
                'v-toolbar--fixed': !this.absolute && (this.app || this.fixed),
                'v-toolbar--floating': this.floating,
                'v-toolbar--prominent': this.prominent
            }, this.themeClasses);
        },
        computedPaddingLeft: function computedPaddingLeft() {
            if (!this.app || this.clippedLeft) return 0;
            return this.$vuetify.application.left;
        },
        computedPaddingRight: function computedPaddingRight() {
            if (!this.app || this.clippedRight) return 0;
            return this.$vuetify.application.right;
        },
        computedTransform: function computedTransform() {
            return !this.isActive ? this.canScroll ? -this.computedContentHeight : -this.computedHeight : 0;
        },
        currentThreshold: function currentThreshold() {
            return Math.abs(this.currentScroll - this.savedScroll);
        },
        styles: function styles() {
            return {
                marginTop: this.computedMarginTop + 'px',
                paddingRight: this.computedPaddingRight + 'px',
                paddingLeft: this.computedPaddingLeft + 'px',
                transform: 'translateY(' + this.computedTransform + 'px)'
            };
        }
    },
    watch: {
        currentThreshold: function currentThreshold(val) {
            if (this.invertedScroll) {
                return this.isActive = this.currentScroll > this.scrollThreshold;
            }
            if (val < this.scrollThreshold || !this.isBooted) return;
            this.isActive = this.isScrollingUp;
            this.savedScroll = this.currentScroll;
        },
        isActive: function isActive() {
            this.savedScroll = 0;
        },
        invertedScroll: function invertedScroll(val) {
            this.isActive = !val;
        },
        manualScroll: function manualScroll(val) {
            this.isActive = !val;
        },
        isScrollingUp: function isScrollingUp() {
            this.savedScroll = this.savedScroll || this.currentScroll;
        }
    },
    created: function created() {
        if (this.invertedScroll || this.manualScroll) this.isActive = false;
    },
    mounted: function mounted() {
        if (this.scrollTarget) {
            this.target = document.querySelector(this.scrollTarget);
        }
    },

    methods: {
        onScroll: function onScroll() {
            if (!this.canScroll || this.manualScroll || typeof window === 'undefined') return;
            var target = this.target || window;
            this.currentScroll = this.scrollTarget ? target.scrollTop : target.pageYOffset || document.documentElement.scrollTop;
            this.isScrollingUp = this.currentScroll < this.previousScroll;
            this.previousScroll = this.currentScroll;
        },

        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication: function updateApplication() {
            return this.invertedScroll || this.manualScroll ? 0 : this.computedHeight;
        }
    },
    render: function render(h) {
        this.isExtended = this.extended || !!this.$slots.extension;
        var children = [];
        var data = this.setBackgroundColor(this.color, {
            'class': this.classes,
            style: this.styles,
            on: this.$listeners
        });
        data.directives = [{
            arg: this.scrollTarget,
            name: 'scroll',
            value: this.onScroll
        }];
        children.push(h('div', {
            staticClass: 'v-toolbar__content',
            style: { height: this.computedContentHeight + 'px' },
            ref: 'content'
        }, this.$slots.default));
        if (this.isExtended) {
            children.push(h('div', {
                staticClass: 'v-toolbar__extension',
                style: { height: this.computedExtensionHeight + 'px' }
            }, this.$slots.extension));
        }
        return h('nav', data, children);
    }
};
//# sourceMappingURL=VToolbar.js.map