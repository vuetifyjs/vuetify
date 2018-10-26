'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../../../src/stylus/components/_dialogs.styl');

var _dependent = require('../../mixins/dependent');

var _dependent2 = _interopRequireDefault(_dependent);

var _detachable = require('../../mixins/detachable');

var _detachable2 = _interopRequireDefault(_detachable);

var _overlayable = require('../../mixins/overlayable');

var _overlayable2 = _interopRequireDefault(_overlayable);

var _returnable = require('../../mixins/returnable');

var _returnable2 = _interopRequireDefault(_returnable);

var _stackable = require('../../mixins/stackable');

var _stackable2 = _interopRequireDefault(_stackable);

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

var _clickOutside = require('../../directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _helpers = require('../../util/helpers');

var _ThemeProvider = require('../../util/ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// Mixins

// Directives

// Helpers


/* @vue/component */
exports.default = {
    name: 'v-dialog',
    directives: {
        ClickOutside: _clickOutside2.default
    },
    mixins: [_dependent2.default, _detachable2.default, _overlayable2.default, _returnable2.default, _stackable2.default, _toggleable2.default],
    props: {
        disabled: Boolean,
        persistent: Boolean,
        fullscreen: Boolean,
        fullWidth: Boolean,
        noClickAnimation: Boolean,
        light: Boolean,
        dark: Boolean,
        maxWidth: {
            type: [String, Number],
            default: 'none'
        },
        origin: {
            type: String,
            default: 'center center'
        },
        width: {
            type: [String, Number],
            default: 'auto'
        },
        scrollable: Boolean,
        transition: {
            type: [String, Boolean],
            default: 'dialog-transition'
        }
    },
    data: function data() {
        return {
            animate: false,
            animateTimeout: null,
            stackClass: 'v-dialog__content--active',
            stackMinZIndex: 200
        };
    },

    computed: {
        classes: function classes() {
            var _ref;

            return _ref = {}, _defineProperty(_ref, ('v-dialog ' + this.contentClass).trim(), true), _defineProperty(_ref, 'v-dialog--active', this.isActive), _defineProperty(_ref, 'v-dialog--persistent', this.persistent), _defineProperty(_ref, 'v-dialog--fullscreen', this.fullscreen), _defineProperty(_ref, 'v-dialog--scrollable', this.scrollable), _defineProperty(_ref, 'v-dialog--animated', this.animate), _ref;
        },
        contentClasses: function contentClasses() {
            return {
                'v-dialog__content': true,
                'v-dialog__content--active': this.isActive
            };
        }
    },
    watch: {
        isActive: function isActive(val) {
            if (val) {
                this.show();
            } else {
                this.removeOverlay();
                this.unbind();
            }
        },
        fullscreen: function fullscreen(val) {
            if (val) this.hideScroll();else this.showScroll();
        }
    },
    mounted: function mounted() {
        this.isBooted = this.isActive;
        this.isActive && this.show();
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') this.unbind();
    },

    methods: {
        animateClick: function animateClick() {
            var _this = this;

            this.animate = false;
            // Needed for when clicking very fast
            // outside of the dialog
            this.$nextTick(function () {
                _this.animate = true;
                clearTimeout(_this.animateTimeout);
                _this.animateTimeout = setTimeout(function () {
                    return _this.animate = false;
                }, 150);
            });
        },
        closeConditional: function closeConditional(e) {
            // If the dialog content contains
            // the click event, or if the
            // dialog is not active
            if (this.$refs.content.contains(e.target) || !this.isActive) return false;
            // If we made it here, the click is outside
            // and is active. If persistent, and the
            // click is on the overlay, animate
            if (this.persistent) {
                if (!this.noClickAnimation && this.overlay === e.target) this.animateClick();
                return false;
            }
            // close dialog if !persistent, clicked outside and we're the topmost dialog.
            // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
            return (0, _helpers.getZIndex)(this.$refs.content) >= this.getMaxZIndex();
        },
        hideScroll: function hideScroll() {
            if (this.fullscreen) {
                document.documentElement.classList.add('overflow-y-hidden');
            } else {
                _overlayable2.default.methods.hideScroll.call(this);
            }
        },
        show: function show() {
            !this.fullscreen && !this.hideOverlay && this.genOverlay();
            this.fullscreen && this.hideScroll();
            this.$refs.content.focus();
            this.$listeners.keydown && this.bind();
        },
        bind: function bind() {
            window.addEventListener('keydown', this.onKeydown);
        },
        unbind: function unbind() {
            window.removeEventListener('keydown', this.onKeydown);
        },
        onKeydown: function onKeydown(e) {
            this.$emit('keydown', e);
        }
    },
    render: function render(h) {
        var _this2 = this;

        var children = [];
        var data = {
            'class': this.classes,
            ref: 'dialog',
            directives: [{
                name: 'click-outside',
                value: function value() {
                    return _this2.isActive = false;
                },
                args: {
                    closeConditional: this.closeConditional,
                    include: this.getOpenDependentElements
                }
            }, { name: 'show', value: this.isActive }],
            on: {
                click: function click(e) {
                    e.stopPropagation();
                }
            }
        };
        if (!this.fullscreen) {
            data.style = {
                maxWidth: this.maxWidth === 'none' ? undefined : (0, _helpers.convertToUnit)(this.maxWidth),
                width: this.width === 'auto' ? undefined : (0, _helpers.convertToUnit)(this.width)
            };
        }
        if (this.$slots.activator) {
            children.push(h('div', {
                staticClass: 'v-dialog__activator',
                'class': {
                    'v-dialog__activator--disabled': this.disabled
                },
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        if (!_this2.disabled) _this2.isActive = !_this2.isActive;
                    }
                }
            }, [this.$slots.activator]));
        }
        var dialog = h('div', data, this.showLazyContent(this.$slots.default));
        if (this.transition) {
            dialog = h('transition', {
                props: {
                    name: this.transition,
                    origin: this.origin
                }
            }, [dialog]);
        }
        children.push(h('div', {
            'class': this.contentClasses,
            attrs: _extends({
                tabIndex: '-1'
            }, this.getScopeIdAttrs()),
            style: { zIndex: this.activeZIndex },
            ref: 'content'
        }, [this.$createElement(_ThemeProvider2.default, {
            props: {
                root: true,
                light: this.light,
                dark: this.dark
            }
        }, [dialog])]));
        return h('div', {
            staticClass: 'v-dialog__container',
            style: {
                display: !this.$slots.activator || this.fullWidth ? 'block' : 'inline-block'
            }
        }, children);
    }
};
//# sourceMappingURL=VDialog.js.map