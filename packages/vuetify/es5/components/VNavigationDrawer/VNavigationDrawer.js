'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Mixins

// Directives

// Helpers


require('../../../src/stylus/components/_navigation-drawer.styl');

var _applicationable = require('../../mixins/applicationable');

var _applicationable2 = _interopRequireDefault(_applicationable);

var _dependent = require('../../mixins/dependent');

var _dependent2 = _interopRequireDefault(_dependent);

var _overlayable = require('../../mixins/overlayable');

var _overlayable2 = _interopRequireDefault(_overlayable);

var _ssrBootable = require('../../mixins/ssr-bootable');

var _ssrBootable2 = _interopRequireDefault(_ssrBootable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _clickOutside = require('../../directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _resize = require('../../directives/resize');

var _resize2 = _interopRequireDefault(_resize);

var _touch = require('../../directives/touch');

var _touch2 = _interopRequireDefault(_touch);

var _helpers = require('../../util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-navigation-drawer',
    directives: {
        ClickOutside: _clickOutside2.default,
        Resize: _resize2.default,
        Touch: _touch2.default
    },
    mixins: [(0, _applicationable2.default)(null, ['miniVariant', 'right', 'width']), _dependent2.default, _overlayable2.default, _ssrBootable2.default, _themeable2.default],
    props: {
        clipped: Boolean,
        disableRouteWatcher: Boolean,
        disableResizeWatcher: Boolean,
        height: {
            type: [Number, String],
            default: '100%'
        },
        floating: Boolean,
        miniVariant: Boolean,
        miniVariantWidth: {
            type: [Number, String],
            default: 80
        },
        mobileBreakPoint: {
            type: [Number, String],
            default: 1264
        },
        permanent: Boolean,
        right: Boolean,
        stateless: Boolean,
        temporary: Boolean,
        touchless: Boolean,
        width: {
            type: [Number, String],
            default: 300
        },
        value: { required: false }
    },
    data: function data() {
        return {
            isActive: false,
            touchArea: {
                left: 0,
                right: 0
            }
        };
    },
    computed: {
        /**
         * Used for setting an app
         * value from a dynamic
         * property. Called from
         * applicationable.js
         *
         * @return {string}
         */
        applicationProperty: function applicationProperty() {
            return this.right ? 'right' : 'left';
        },
        calculatedTransform: function calculatedTransform() {
            if (this.isActive) return 0;
            return this.right ? this.calculatedWidth : -this.calculatedWidth;
        },
        calculatedWidth: function calculatedWidth() {
            return this.miniVariant ? this.miniVariantWidth : this.width;
        },
        classes: function classes() {
            return _extends({
                'v-navigation-drawer': true,
                'v-navigation-drawer--absolute': this.absolute,
                'v-navigation-drawer--clipped': this.clipped,
                'v-navigation-drawer--close': !this.isActive,
                'v-navigation-drawer--fixed': !this.absolute && (this.app || this.fixed),
                'v-navigation-drawer--floating': this.floating,
                'v-navigation-drawer--is-mobile': this.isMobile,
                'v-navigation-drawer--mini-variant': this.miniVariant,
                'v-navigation-drawer--open': this.isActive,
                'v-navigation-drawer--right': this.right,
                'v-navigation-drawer--temporary': this.temporary
            }, this.themeClasses);
        },
        hasApp: function hasApp() {
            return this.app && !this.isMobile && !this.temporary;
        },
        isMobile: function isMobile() {
            return !this.stateless && !this.permanent && !this.temporary && this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10);
        },
        marginTop: function marginTop() {
            if (!this.hasApp) return 0;
            var marginTop = this.$vuetify.application.bar;
            marginTop += this.clipped ? this.$vuetify.application.top : 0;
            return marginTop;
        },
        maxHeight: function maxHeight() {
            if (!this.hasApp) return null;
            var maxHeight = this.$vuetify.application.bottom + this.$vuetify.application.footer + this.$vuetify.application.bar;
            if (!this.clipped) return maxHeight;
            return maxHeight + this.$vuetify.application.top;
        },
        reactsToClick: function reactsToClick() {
            return !this.stateless && !this.permanent && (this.isMobile || this.temporary);
        },
        reactsToMobile: function reactsToMobile() {
            return !this.disableResizeWatcher && !this.stateless && !this.permanent && !this.temporary;
        },
        reactsToRoute: function reactsToRoute() {
            return !this.disableRouteWatcher && !this.stateless && (this.temporary || this.isMobile);
        },
        resizeIsDisabled: function resizeIsDisabled() {
            return this.disableResizeWatcher || this.stateless;
        },
        showOverlay: function showOverlay() {
            return this.isActive && (this.isMobile || this.temporary);
        },
        styles: function styles() {
            var styles = {
                height: (0, _helpers.convertToUnit)(this.height),
                marginTop: this.marginTop + 'px',
                maxHeight: 'calc(100% - ' + +this.maxHeight + 'px)',
                transform: 'translateX(' + this.calculatedTransform + 'px)',
                width: this.calculatedWidth + 'px'
            };
            return styles;
        }
    },
    watch: {
        $route: function $route() {
            if (this.reactsToRoute && this.closeConditional()) {
                this.isActive = false;
            }
        },
        isActive: function isActive(val) {
            this.$emit('input', val);
            this.callUpdate();
        },

        /**
         * When mobile changes, adjust
         * the active state only when
         * there has been a previous
         * value
         */
        isMobile: function isMobile(val, prev) {
            !val && this.isActive && !this.temporary && this.removeOverlay();
            if (prev == null || this.resizeIsDisabled || !this.reactsToMobile) return;
            this.isActive = !val;
            this.callUpdate();
        },
        permanent: function permanent(val) {
            // If enabling prop
            // enable the drawer
            if (val) {
                this.isActive = true;
            }
            this.callUpdate();
        },
        showOverlay: function showOverlay(val) {
            if (val) this.genOverlay();else this.removeOverlay();
        },
        temporary: function temporary() {
            this.callUpdate();
        },
        value: function value(val) {
            if (this.permanent) return;
            if (val == null) return this.init();
            if (val !== this.isActive) this.isActive = val;
        }
    },
    beforeMount: function beforeMount() {
        this.init();
    },

    methods: {
        calculateTouchArea: function calculateTouchArea() {
            if (!this.$el.parentNode) return;
            var parentRect = this.$el.parentNode.getBoundingClientRect();
            this.touchArea = {
                left: parentRect.left + 50,
                right: parentRect.right - 50
            };
        },
        closeConditional: function closeConditional() {
            return this.isActive && this.reactsToClick;
        },
        genDirectives: function genDirectives() {
            var _this = this;

            var directives = [{
                name: 'click-outside',
                value: function value() {
                    return _this.isActive = false;
                },
                args: {
                    closeConditional: this.closeConditional,
                    include: this.getOpenDependentElements
                }
            }];
            !this.touchless && directives.push({
                name: 'touch',
                value: {
                    parent: true,
                    left: this.swipeLeft,
                    right: this.swipeRight
                }
            });
            return directives;
        },

        /**
         * Sets state before mount to avoid
         * entry transitions in SSR
         *
         * @return {void}
         */
        init: function init() {
            if (this.permanent) {
                this.isActive = true;
            } else if (this.stateless || this.value != null) {
                this.isActive = this.value;
            } else if (!this.temporary) {
                this.isActive = !this.isMobile;
            }
        },
        swipeRight: function swipeRight(e) {
            if (this.isActive && !this.right) return;
            this.calculateTouchArea();
            if (Math.abs(e.touchendX - e.touchstartX) < 100) return;
            if (!this.right && e.touchstartX <= this.touchArea.left) this.isActive = true;else if (this.right && this.isActive) this.isActive = false;
        },
        swipeLeft: function swipeLeft(e) {
            if (this.isActive && this.right) return;
            this.calculateTouchArea();
            if (Math.abs(e.touchendX - e.touchstartX) < 100) return;
            if (this.right && e.touchstartX >= this.touchArea.right) this.isActive = true;else if (!this.right && this.isActive) this.isActive = false;
        },

        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication: function updateApplication() {
            return !this.isActive || this.temporary || this.isMobile ? 0 : this.calculatedWidth;
        }
    },
    render: function render(h) {
        var _this2 = this;

        var data = {
            'class': this.classes,
            style: this.styles,
            directives: this.genDirectives(),
            on: {
                click: function click() {
                    if (!_this2.miniVariant) return;
                    _this2.$emit('update:miniVariant', false);
                },
                transitionend: function transitionend(e) {
                    if (e.target !== e.currentTarget) return;
                    _this2.$emit('transitionend', e);
                    // IE11 does not support new Event('resize')
                    var resizeEvent = document.createEvent('UIEvents');
                    resizeEvent.initUIEvent('resize', true, false, window, 0);
                    window.dispatchEvent(resizeEvent);
                }
            }
        };
        return h('aside', data, [this.$slots.default, h('div', { 'class': 'v-navigation-drawer__border' })]);
    }
};
//# sourceMappingURL=VNavigationDrawer.js.map