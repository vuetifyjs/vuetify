'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_menus.styl');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _delayable = require('../../mixins/delayable');

var _delayable2 = _interopRequireDefault(_delayable);

var _dependent = require('../../mixins/dependent');

var _dependent2 = _interopRequireDefault(_dependent);

var _detachable = require('../../mixins/detachable');

var _detachable2 = _interopRequireDefault(_detachable);

var _menuable = require('../../mixins/menuable.js');

var _menuable2 = _interopRequireDefault(_menuable);

var _returnable = require('../../mixins/returnable');

var _returnable2 = _interopRequireDefault(_returnable);

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _menuActivator = require('./mixins/menu-activator');

var _menuActivator2 = _interopRequireDefault(_menuActivator);

var _menuGenerators = require('./mixins/menu-generators');

var _menuGenerators2 = _interopRequireDefault(_menuGenerators);

var _menuKeyable = require('./mixins/menu-keyable');

var _menuKeyable2 = _interopRequireDefault(_menuKeyable);

var _menuPosition = require('./mixins/menu-position');

var _menuPosition2 = _interopRequireDefault(_menuPosition);

var _clickOutside = require('../../directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _resize = require('../../directives/resize');

var _resize2 = _interopRequireDefault(_resize);

var _helpers = require('../../util/helpers');

var _ThemeProvider = require('../../util/ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Helpers

// Directives

// Component level mixins
exports.default = _vue2.default.extend({
    name: 'v-menu',
    provide: function provide() {
        return {
            // Pass theme through to default slot
            theme: this.theme
        };
    },

    directives: {
        ClickOutside: _clickOutside2.default,
        Resize: _resize2.default
    },
    mixins: [_menuActivator2.default, _dependent2.default, _delayable2.default, _detachable2.default, _menuGenerators2.default, _menuKeyable2.default, _menuable2.default, _menuPosition2.default, _returnable2.default, _toggleable2.default, _themeable2.default],
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
        offsetX: Boolean,
        offsetY: Boolean,
        openOnClick: {
            type: Boolean,
            default: true
        },
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
    data: function data() {
        return {
            defaultOffset: 8,
            maxHeightAutoDefault: '200px',
            startIndex: 3,
            stopIndex: 0,
            hasJustFocused: false,
            resizeTimeout: null
        };
    },

    computed: {
        calculatedLeft: function calculatedLeft() {
            if (!this.auto) return this.calcLeft();
            return this.calcXOverflow(this.calcLeftAuto()) + 'px';
        },
        calculatedMaxHeight: function calculatedMaxHeight() {
            return this.auto ? '200px' : (0, _helpers.convertToUnit)(this.maxHeight);
        },
        calculatedMaxWidth: function calculatedMaxWidth() {
            return isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + 'px';
        },
        calculatedMinWidth: function calculatedMinWidth() {
            if (this.minWidth) {
                return isNaN(this.minWidth) ? this.minWidth : this.minWidth + 'px';
            }
            var minWidth = this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0);
            var calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth)) ? minWidth : parseInt(this.calculatedMaxWidth);
            return Math.min(calculatedMaxWidth, minWidth) + 'px';
        },
        calculatedTop: function calculatedTop() {
            if (!this.auto || this.isAttached) return this.calcTop();
            return this.calcYOverflow(this.calcTopAuto()) + 'px';
        },
        styles: function styles() {
            return {
                maxHeight: this.calculatedMaxHeight,
                minWidth: this.calculatedMinWidth,
                maxWidth: this.calculatedMaxWidth,
                top: this.calculatedTop,
                left: this.calculatedLeft,
                transformOrigin: this.origin,
                zIndex: this.zIndex || this.activeZIndex
            };
        },
        tileHeight: function tileHeight() {
            return this.dense ? 36 : 48;
        }
    },
    watch: {
        activator: function activator(newActivator, oldActivator) {
            this.removeActivatorEvents(oldActivator);
            this.addActivatorEvents(newActivator);
        },
        isContentActive: function isContentActive(val) {
            this.hasJustFocused = val;
        }
    },
    methods: {
        activate: function activate() {
            // This exists primarily for v-select
            // helps determine which tiles to activate
            this.getTiles();
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(this.startTransition);
            // Once transitioning, calculate scroll position
            setTimeout(this.calculateScroll, 50);
        },
        closeConditional: function closeConditional() {
            return this.isActive && this.closeOnClick;
        },
        onResize: function onResize() {
            if (!this.isActive) return;
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
    render: function render(h) {
        var data = {
            staticClass: 'v-menu',
            class: { 'v-menu--inline': !this.fullWidth && this.$slots.activator },
            directives: [{
                arg: 500,
                name: 'resize',
                value: this.onResize
            }],
            on: {
                keydown: this.onKeyDown
            }
        };
        return h('div', data, [this.genActivator(), this.$createElement(_ThemeProvider2.default, {
            props: {
                root: true,
                light: this.light,
                dark: this.dark
            }
        }, [this.genTransition()])]);
    }
});
// Mixins
//# sourceMappingURL=VMenu.js.map