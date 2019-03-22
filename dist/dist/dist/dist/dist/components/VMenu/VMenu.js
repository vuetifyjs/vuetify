import '../../stylus/components/_menus.styl';
import Vue from 'vue';
// Mixins
import Delayable from '../../mixins/delayable';
import Dependent from '../../mixins/dependent';
import Detachable from '../../mixins/detachable';
import Menuable from '../../mixins/menuable.js';
import Returnable from '../../mixins/returnable';
import Toggleable from '../../mixins/toggleable';
import Themeable from '../../mixins/themeable';
// Component level mixins
import Activator from './mixins/menu-activator';
import Generators from './mixins/menu-generators';
import Keyable from './mixins/menu-keyable';
import Position from './mixins/menu-position';
// Directives
import ClickOutside from '../../directives/click-outside';
import Resize from '../../directives/resize';
// Helpers
import { convertToUnit, getSlotType } from '../../util/helpers';
import ThemeProvider from '../../util/ThemeProvider';
import { consoleError } from '../../util/console';
/* @vue/component */
export default Vue.extend({
    name: 'v-menu',
    provide: function () {
        return {
            // Pass theme through to default slot
            theme: this.theme
        };
    },
    directives: {
        ClickOutside: ClickOutside,
        Resize: Resize
    },
    mixins: [
        Activator,
        Dependent,
        Delayable,
        Detachable,
        Generators,
        Keyable,
        Menuable,
        Position,
        Returnable,
        Toggleable,
        Themeable
    ],
    props: {
        auto: Boolean,
        closeOnClick: {
            type: Boolean,
            default: true
        },
        closeOnContentClick: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        fullWidth: Boolean,
        maxHeight: { default: 'auto' },
        openOnClick: {
            type: Boolean,
            default: true
        },
        offsetX: Boolean,
        offsetY: Boolean,
        openOnHover: Boolean,
        origin: {
            type: String,
            default: 'top left'
        },
        transition: {
            type: [Boolean, String],
            default: 'v-menu-transition'
        }
    },
    data: function () {
        return {
            defaultOffset: 8,
            hasJustFocused: false,
            resizeTimeout: null
        };
    },
    computed: {
        calculatedLeft: function () {
            var menuWidth = Math.max(this.dimensions.content.width, parseFloat(this.calculatedMinWidth));
            if (!this.auto)
                return this.calcLeft(menuWidth);
            return this.calcXOverflow(this.calcLeftAuto(), menuWidth) + "px";
        },
        calculatedMaxHeight: function () {
            return this.auto ? '200px' : convertToUnit(this.maxHeight);
        },
        calculatedMaxWidth: function () {
            return isNaN(this.maxWidth)
                ? this.maxWidth
                : this.maxWidth + "px";
        },
        calculatedMinWidth: function () {
            if (this.minWidth) {
                return isNaN(this.minWidth)
                    ? this.minWidth
                    : this.minWidth + "px";
            }
            var minWidth = Math.min(this.dimensions.activator.width +
                this.nudgeWidth +
                (this.auto ? 16 : 0), Math.max(this.pageWidth - 24, 0));
            var calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth))
                ? minWidth
                : parseInt(this.calculatedMaxWidth);
            return Math.min(calculatedMaxWidth, minWidth) + "px";
        },
        calculatedTop: function () {
            if (!this.auto || this.isAttached)
                return this.calcTop();
            return this.calcYOverflow(this.calculatedTopAuto) + "px";
        },
        styles: function () {
            return {
                maxHeight: this.calculatedMaxHeight,
                minWidth: this.calculatedMinWidth,
                maxWidth: this.calculatedMaxWidth,
                top: this.calculatedTop,
                left: this.calculatedLeft,
                transformOrigin: this.origin,
                zIndex: this.zIndex || this.activeZIndex
            };
        }
    },
    watch: {
        activator: function (newActivator, oldActivator) {
            this.removeActivatorEvents(oldActivator);
            this.addActivatorEvents(newActivator);
        },
        disabled: function (disabled) {
            if (!this.activator)
                return;
            if (disabled) {
                this.removeActivatorEvents(this.activator);
            }
            else {
                this.addActivatorEvents(this.activator);
            }
        },
        isContentActive: function (val) {
            this.hasJustFocused = val;
        }
    },
    mounted: function () {
        this.isActive && this.activate();
        if (getSlotType(this, 'activator', true) === 'v-slot') {
            consoleError("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'", this);
        }
    },
    methods: {
        activate: function () {
            var _this = this;
            // This exists primarily for v-select
            // helps determine which tiles to activate
            this.getTiles();
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(function () {
                // Once transitioning, calculate scroll and top position
                _this.startTransition().then(function () {
                    if (_this.$refs.content) {
                        _this.calculatedTopAuto = _this.calcTopAuto();
                        _this.auto && (_this.$refs.content.scrollTop = _this.calcScrollPosition());
                    }
                });
            });
        },
        closeConditional: function (e) {
            return this.isActive &&
                this.closeOnClick &&
                !this.$refs.content.contains(e.target);
        },
        onResize: function () {
            if (!this.isActive)
                return;
            // Account for screen resize
            // and orientation change
            // eslint-disable-next-line no-unused-expressions
            this.$refs.content.offsetWidth;
            this.updateDimensions();
            // When resizing to a smaller width
            // content width is evaluated before
            // the new activator width has been
            // set, causing it to not size properly
            // hacky but will revisit in the future
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.updateDimensions, 100);
        }
    },
    render: function (h) {
        var data = {
            staticClass: 'v-menu',
            class: { 'v-menu--inline': !this.fullWidth && this.$slots.activator },
            directives: [{
                    arg: 500,
                    name: 'resize',
                    value: this.onResize
                }],
            on: this.disableKeys ? undefined : {
                keydown: this.onKeyDown
            }
        };
        return h('div', data, [
            this.genActivator(),
            this.$createElement(ThemeProvider, {
                props: {
                    root: true,
                    light: this.light,
                    dark: this.dark
                }
            }, [this.genTransition()])
        ]);
    }
});
//# sourceMappingURL=VMenu.js.map
//# sourceMappingURL=VMenu.js.map
//# sourceMappingURL=VMenu.js.map
//# sourceMappingURL=VMenu.js.map
//# sourceMappingURL=VMenu.js.map