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
// Styles
import '../../stylus/components/_toolbar.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import SSRBootable from '../../mixins/ssr-bootable';
// Directives
import Scroll from '../../directives/scroll';
import { deprecate } from '../../util/console';
// Types
import mixins from '../../util/mixins';
export default mixins(Applicationable('top', [
    'clippedLeft',
    'clippedRight',
    'computedHeight',
    'invertedScroll',
    'manualScroll'
]), Colorable, SSRBootable, Themeable
/* @vue/component */
).extend({
    name: 'v-toolbar',
    directives: { Scroll: Scroll },
    props: {
        card: Boolean,
        clippedLeft: Boolean,
        clippedRight: Boolean,
        dense: Boolean,
        extended: Boolean,
        extensionHeight: {
            type: [Number, String],
            validator: function (v) { return !isNaN(parseInt(v)); }
        },
        flat: Boolean,
        floating: Boolean,
        height: {
            type: [Number, String],
            validator: function (v) { return !isNaN(parseInt(v)); }
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
    data: function () {
        return ({
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
            previousScroll: 0,
            savedScroll: 0,
            target: null
        });
    },
    computed: {
        canScroll: function () {
            // TODO: remove
            if (this.scrollToolbarOffScreen) {
                deprecate('scrollToolbarOffScreen', 'scrollOffScreen', this);
                return true;
            }
            return this.scrollOffScreen || this.invertedScroll;
        },
        computedContentHeight: function () {
            if (this.height)
                return parseInt(this.height);
            if (this.dense)
                return this.heights.dense;
            if (this.prominent ||
                this.$vuetify.breakpoint.mdAndUp)
                return this.heights.desktop;
            if (this.$vuetify.breakpoint.smAndDown &&
                this.$vuetify.breakpoint.width >
                    this.$vuetify.breakpoint.height)
                return this.heights.mobileLandscape;
            return this.heights.mobile;
        },
        computedExtensionHeight: function () {
            if (this.tabs)
                return 48;
            if (this.extensionHeight)
                return parseInt(this.extensionHeight);
            return this.computedContentHeight;
        },
        computedHeight: function () {
            if (!this.isExtended)
                return this.computedContentHeight;
            return this.computedContentHeight + this.computedExtensionHeight;
        },
        computedMarginTop: function () {
            if (!this.app)
                return 0;
            return this.$vuetify.application.bar;
        },
        classes: function () {
            return __assign({ 'v-toolbar': true, 'elevation-0': this.flat || (!this.isActive &&
                    !this.tabs &&
                    this.canScroll), 'v-toolbar--absolute': this.absolute, 'v-toolbar--card': this.card, 'v-toolbar--clipped': this.clippedLeft || this.clippedRight, 'v-toolbar--dense': this.dense, 'v-toolbar--extended': this.isExtended, 'v-toolbar--fixed': !this.absolute && (this.app || this.fixed), 'v-toolbar--floating': this.floating, 'v-toolbar--prominent': this.prominent }, this.themeClasses);
        },
        computedPaddingLeft: function () {
            if (!this.app || this.clippedLeft)
                return 0;
            return this.$vuetify.application.left;
        },
        computedPaddingRight: function () {
            if (!this.app || this.clippedRight)
                return 0;
            return this.$vuetify.application.right;
        },
        computedTransform: function () {
            return !this.isActive
                ? this.canScroll
                    ? -this.computedContentHeight
                    : -this.computedHeight
                : 0;
        },
        currentThreshold: function () {
            return Math.abs(this.currentScroll - this.savedScroll);
        },
        styles: function () {
            return {
                marginTop: this.computedMarginTop + "px",
                paddingRight: this.computedPaddingRight + "px",
                paddingLeft: this.computedPaddingLeft + "px",
                transform: "translateY(" + this.computedTransform + "px)"
            };
        }
    },
    watch: {
        currentThreshold: function (val) {
            if (this.invertedScroll) {
                this.isActive = this.currentScroll > this.scrollThreshold;
                return;
            }
            if (val < this.scrollThreshold ||
                !this.isBooted)
                return;
            this.isActive = this.isScrollingUp;
            this.savedScroll = this.currentScroll;
        },
        isActive: function () {
            this.savedScroll = 0;
        },
        invertedScroll: function (val) {
            this.isActive = !val;
        },
        manualScroll: function (val) {
            this.isActive = !val;
        },
        isScrollingUp: function () {
            this.savedScroll = this.savedScroll || this.currentScroll;
        }
    },
    created: function () {
        if (this.invertedScroll ||
            this.manualScroll)
            this.isActive = false;
    },
    mounted: function () {
        if (this.scrollTarget) {
            this.target = document.querySelector(this.scrollTarget);
        }
    },
    methods: {
        onScroll: function () {
            if (!this.canScroll ||
                this.manualScroll ||
                typeof window === 'undefined')
                return;
            this.currentScroll = this.target
                ? this.target.scrollTop
                : window.pageYOffset;
            this.isScrollingUp = this.currentScroll < this.previousScroll;
            this.previousScroll = this.currentScroll;
        },
        updateApplication: function () {
            return this.invertedScroll || this.manualScroll
                ? 0
                : this.computedHeight;
        }
    },
    render: function (h) {
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
            style: { height: this.computedContentHeight + "px" },
            ref: 'content'
        }, this.$slots.default));
        if (this.isExtended) {
            children.push(h('div', {
                staticClass: 'v-toolbar__extension',
                style: { height: this.computedExtensionHeight + "px" }
            }, this.$slots.extension));
        }
        return h('nav', data, children);
    }
});
//# sourceMappingURL=VToolbar.js.map
//# sourceMappingURL=VToolbar.js.map