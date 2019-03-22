var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_navigation-drawer.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import Dependent from '../../mixins/dependent';
import Overlayable from '../../mixins/overlayable';
import SSRBootable from '../../mixins/ssr-bootable';
import Themeable from '../../mixins/themeable';
// Directives
import ClickOutside from '../../directives/click-outside';
import Resize from '../../directives/resize';
import Touch from '../../directives/touch';
// Utilities
import { convertToUnit } from '../../util/helpers';
import mixins from '../../util/mixins';
export default mixins(Applicationable('left', [
    'miniVariant',
    'right',
    'width'
]), Dependent, Overlayable, SSRBootable, Themeable
/* @vue/component */
).extend({
    name: 'v-navigation-drawer',
    directives: {
        ClickOutside: ClickOutside,
        Resize: Resize,
        Touch: Touch
    },
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
    data: function () { return ({
        isActive: false,
        touchArea: {
            left: 0,
            right: 0
        }
    }); },
    computed: {
        /**
         * Used for setting an app value from a dynamic
         * property. Called from applicationable.js
         */
        applicationProperty: function () {
            return this.right ? 'right' : 'left';
        },
        calculatedTransform: function () {
            if (this.isActive)
                return 0;
            return this.right
                ? this.calculatedWidth
                : -this.calculatedWidth;
        },
        calculatedWidth: function () {
            return parseInt(this.miniVariant
                ? this.miniVariantWidth
                : this.width);
        },
        classes: function () {
            return __assign({ 'v-navigation-drawer': true, 'v-navigation-drawer--absolute': this.absolute, 'v-navigation-drawer--clipped': this.clipped, 'v-navigation-drawer--close': !this.isActive, 'v-navigation-drawer--fixed': !this.absolute && (this.app || this.fixed), 'v-navigation-drawer--floating': this.floating, 'v-navigation-drawer--is-mobile': this.isMobile, 'v-navigation-drawer--mini-variant': this.miniVariant, 'v-navigation-drawer--open': this.isActive, 'v-navigation-drawer--right': this.right, 'v-navigation-drawer--temporary': this.temporary }, this.themeClasses);
        },
        hasApp: function () {
            return this.app &&
                (!this.isMobile && !this.temporary);
        },
        isMobile: function () {
            return !this.stateless &&
                !this.permanent &&
                !this.temporary &&
                this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10);
        },
        marginTop: function () {
            if (!this.hasApp)
                return 0;
            var marginTop = this.$vuetify.application.bar;
            marginTop += this.clipped
                ? this.$vuetify.application.top
                : 0;
            return marginTop;
        },
        maxHeight: function () {
            if (!this.hasApp)
                return null;
            var maxHeight = (this.$vuetify.application.bottom +
                this.$vuetify.application.footer +
                this.$vuetify.application.bar);
            if (!this.clipped)
                return maxHeight;
            return maxHeight + this.$vuetify.application.top;
        },
        reactsToClick: function () {
            return !this.stateless &&
                !this.permanent &&
                (this.isMobile || this.temporary);
        },
        reactsToMobile: function () {
            return !this.disableResizeWatcher &&
                !this.stateless &&
                !this.permanent &&
                !this.temporary;
        },
        reactsToRoute: function () {
            return !this.disableRouteWatcher &&
                !this.stateless &&
                (this.temporary || this.isMobile);
        },
        resizeIsDisabled: function () {
            return this.disableResizeWatcher || this.stateless;
        },
        showOverlay: function () {
            return this.isActive &&
                (this.isMobile || this.temporary);
        },
        styles: function () {
            var styles = {
                height: convertToUnit(this.height),
                marginTop: this.marginTop + "px",
                maxHeight: this.maxHeight != null ? "calc(100% - " + +this.maxHeight + "px)" : undefined,
                transform: "translateX(" + this.calculatedTransform + "px)",
                width: this.calculatedWidth + "px"
            };
            return styles;
        }
    },
    watch: {
        $route: function () {
            if (this.reactsToRoute && this.closeConditional()) {
                this.isActive = false;
            }
        },
        isActive: function (val) {
            this.$emit('input', val);
            this.callUpdate();
        },
        /**
         * When mobile changes, adjust the active state
         * only when there has been a previous value
         */
        isMobile: function (val, prev) {
            !val &&
                this.isActive &&
                !this.temporary &&
                this.removeOverlay();
            if (prev == null ||
                this.resizeIsDisabled ||
                !this.reactsToMobile)
                return;
            this.isActive = !val;
            this.callUpdate();
        },
        permanent: function (val) {
            // If enabling prop enable the drawer
            if (val) {
                this.isActive = true;
            }
            this.callUpdate();
        },
        showOverlay: function (val) {
            if (val)
                this.genOverlay();
            else
                this.removeOverlay();
        },
        temporary: function () {
            this.callUpdate();
        },
        value: function (val) {
            if (this.permanent)
                return;
            // TODO: referring to this directly causes type errors
            // all over the place for some reason
            var _this = this;
            if (val == null)
                return _this.init();
            if (val !== this.isActive)
                this.isActive = val;
        }
    },
    beforeMount: function () {
        this.init();
    },
    methods: {
        calculateTouchArea: function () {
            if (!this.$el.parentNode)
                return;
            var parentRect = this.$el.parentNode.getBoundingClientRect();
            this.touchArea = {
                left: parentRect.left + 50,
                right: parentRect.right - 50
            };
        },
        closeConditional: function () {
            return this.isActive && this.reactsToClick;
        },
        genDirectives: function () {
            var _this_1 = this;
            var directives = [{
                    name: 'click-outside',
                    value: function () { return (_this_1.isActive = false); },
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
         */
        init: function () {
            if (this.permanent) {
                this.isActive = true;
            }
            else if (this.stateless ||
                this.value != null) {
                this.isActive = this.value;
            }
            else if (!this.temporary) {
                this.isActive = !this.isMobile;
            }
        },
        swipeRight: function (e) {
            if (this.isActive && !this.right)
                return;
            this.calculateTouchArea();
            if (Math.abs(e.touchendX - e.touchstartX) < 100)
                return;
            if (!this.right &&
                e.touchstartX <= this.touchArea.left)
                this.isActive = true;
            else if (this.right && this.isActive)
                this.isActive = false;
        },
        swipeLeft: function (e) {
            if (this.isActive && this.right)
                return;
            this.calculateTouchArea();
            if (Math.abs(e.touchendX - e.touchstartX) < 100)
                return;
            if (this.right &&
                e.touchstartX >= this.touchArea.right)
                this.isActive = true;
            else if (!this.right && this.isActive)
                this.isActive = false;
        },
        /**
         * Update the application layout
         */
        updateApplication: function () {
            return !this.isActive ||
                this.temporary ||
                this.isMobile
                ? 0
                : this.calculatedWidth;
        }
    },
    render: function (h) {
        var _this_1 = this;
        var data = {
            'class': this.classes,
            style: this.styles,
            directives: this.genDirectives(),
            on: {
                click: function () {
                    if (!_this_1.miniVariant)
                        return;
                    _this_1.$emit('update:miniVariant', false);
                },
                transitionend: function (e) {
                    if (e.target !== e.currentTarget)
                        return;
                    _this_1.$emit('transitionend', e);
                    // IE11 does not support new Event('resize')
                    var resizeEvent = document.createEvent('UIEvents');
                    resizeEvent.initUIEvent('resize', true, false, window, 0);
                    window.dispatchEvent(resizeEvent);
                }
            }
        };
        return h('aside', data, [
            this.$slots.default,
            h('div', { 'class': 'v-navigation-drawer__border' })
        ]);
    }
});
//# sourceMappingURL=VNavigationDrawer.js.map