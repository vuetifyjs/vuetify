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
import '../../stylus/components/_dialogs.styl';
// Mixins
import Dependent from '../../mixins/dependent';
import Detachable from '../../mixins/detachable';
import Overlayable from '../../mixins/overlayable';
import Returnable from '../../mixins/returnable';
import Stackable from '../../mixins/stackable';
import Toggleable from '../../mixins/toggleable';
// Directives
import ClickOutside from '../../directives/click-outside';
// Helpers
import { convertToUnit, keyCodes, getSlotType } from '../../util/helpers';
import ThemeProvider from '../../util/ThemeProvider';
import { consoleError } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-dialog',
    directives: {
        ClickOutside: ClickOutside
    },
    mixins: [
        Dependent,
        Detachable,
        Overlayable,
        Returnable,
        Stackable,
        Toggleable
    ],
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
    data: function () {
        return {
            animate: false,
            animateTimeout: null,
            stackClass: 'v-dialog__content--active',
            stackMinZIndex: 200
        };
    },
    computed: {
        classes: function () {
            var _a;
            return _a = {},
                _a[("v-dialog " + this.contentClass).trim()] = true,
                _a['v-dialog--active'] = this.isActive,
                _a['v-dialog--persistent'] = this.persistent,
                _a['v-dialog--fullscreen'] = this.fullscreen,
                _a['v-dialog--scrollable'] = this.scrollable,
                _a['v-dialog--animated'] = this.animate,
                _a;
        },
        contentClasses: function () {
            return {
                'v-dialog__content': true,
                'v-dialog__content--active': this.isActive
            };
        },
        hasActivator: function () {
            return Boolean(!!this.$slots.activator ||
                !!this.$scopedSlots.activator);
        }
    },
    watch: {
        isActive: function (val) {
            if (val) {
                this.show();
                this.hideScroll();
            }
            else {
                this.removeOverlay();
                this.unbind();
            }
        },
        fullscreen: function (val) {
            if (!this.isActive)
                return;
            if (val) {
                this.hideScroll();
                this.removeOverlay(false);
            }
            else {
                this.showScroll();
                this.genOverlay();
            }
        }
    },
    beforeMount: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.isBooted = _this.isActive;
            _this.isActive && _this.show();
        });
    },
    mounted: function () {
        if (getSlotType(this, 'activator', true) === 'v-slot') {
            consoleError("v-dialog's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'", this);
        }
    },
    beforeDestroy: function () {
        if (typeof window !== 'undefined')
            this.unbind();
    },
    methods: {
        animateClick: function () {
            var _this = this;
            this.animate = false;
            // Needed for when clicking very fast
            // outside of the dialog
            this.$nextTick(function () {
                _this.animate = true;
                clearTimeout(_this.animateTimeout);
                _this.animateTimeout = setTimeout(function () { return (_this.animate = false); }, 150);
            });
        },
        closeConditional: function (e) {
            // If the dialog content contains
            // the click event, or if the
            // dialog is not active
            if (!this.isActive || this.$refs.content.contains(e.target))
                return false;
            // If we made it here, the click is outside
            // and is active. If persistent, and the
            // click is on the overlay, animate
            if (this.persistent) {
                if (!this.noClickAnimation &&
                    this.overlay === e.target)
                    this.animateClick();
                return false;
            }
            // close dialog if !persistent, clicked outside and we're the topmost dialog.
            // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
            return this.activeZIndex >= this.getMaxZIndex();
        },
        hideScroll: function () {
            if (this.fullscreen) {
                document.documentElement.classList.add('overflow-y-hidden');
            }
            else {
                Overlayable.options.methods.hideScroll.call(this);
            }
        },
        show: function () {
            !this.fullscreen && !this.hideOverlay && this.genOverlay();
            this.$refs.content.focus();
            this.bind();
        },
        bind: function () {
            window.addEventListener('focusin', this.onFocusin);
        },
        unbind: function () {
            window.removeEventListener('focusin', this.onFocusin);
        },
        onKeydown: function (e) {
            if (e.keyCode === keyCodes.esc && !this.getOpenDependents().length) {
                if (!this.persistent) {
                    this.isActive = false;
                    var activator_1 = this.getActivator();
                    this.$nextTick(function () { return activator_1 && activator_1.focus(); });
                }
                else if (!this.noClickAnimation) {
                    this.animateClick();
                }
            }
            this.$emit('keydown', e);
        },
        onFocusin: function (e) {
            var target = event.target;
            if (
            // It isn't the document or the dialog body
            ![document, this.$refs.content].includes(target) &&
                // It isn't inside the dialog body
                !this.$refs.content.contains(target) &&
                // We're the topmost dialog
                this.activeZIndex >= this.getMaxZIndex() &&
                // It isn't inside a dependent element (like a menu)
                !this.getOpenDependentElements().some(function (el) { return el.contains(target); })
            // So we must have focused something outside the dialog and its children
            ) {
                // Find and focus the first available element inside the dialog
                var focusable = this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                focusable.length && focusable[0].focus();
            }
        },
        getActivator: function (e) {
            if (this.$refs.activator) {
                return this.$refs.activator.children.length > 0
                    ? this.$refs.activator.children[0]
                    : this.$refs.activator;
            }
            if (e) {
                this.activatedBy = e.currentTarget || e.target;
            }
            if (this.activatedBy)
                return this.activatedBy;
            if (this.activatorNode) {
                var activator = Array.isArray(this.activatorNode) ? this.activatorNode[0] : this.activatorNode;
                var el = activator && activator.elm;
                if (el)
                    return el;
            }
            consoleError('No activator found');
        },
        genActivator: function () {
            var _this = this;
            if (!this.hasActivator)
                return null;
            var listeners = this.disabled ? {} : {
                click: function (e) {
                    e.stopPropagation();
                    _this.getActivator(e);
                    if (!_this.disabled)
                        _this.isActive = !_this.isActive;
                }
            };
            if (getSlotType(this, 'activator') === 'scoped') {
                var activator = this.$scopedSlots.activator({ on: listeners });
                this.activatorNode = activator;
                return activator;
            }
            return this.$createElement('div', {
                staticClass: 'v-dialog__activator',
                class: {
                    'v-dialog__activator--disabled': this.disabled
                },
                ref: 'activator',
                on: listeners
            }, this.$slots.activator);
        }
    },
    render: function (h) {
        var _this = this;
        var children = [];
        var data = {
            'class': this.classes,
            ref: 'dialog',
            directives: [
                {
                    name: 'click-outside',
                    value: function () { _this.isActive = false; },
                    args: {
                        closeConditional: this.closeConditional,
                        include: this.getOpenDependentElements
                    }
                },
                { name: 'show', value: this.isActive }
            ],
            on: {
                click: function (e) { e.stopPropagation(); }
            }
        };
        if (!this.fullscreen) {
            data.style = {
                maxWidth: this.maxWidth === 'none' ? undefined : convertToUnit(this.maxWidth),
                width: this.width === 'auto' ? undefined : convertToUnit(this.width)
            };
        }
        children.push(this.genActivator());
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
            attrs: __assign({ tabIndex: '-1' }, this.getScopeIdAttrs()),
            on: {
                keydown: this.onKeydown
            },
            style: { zIndex: this.activeZIndex },
            ref: 'content'
        }, [
            this.$createElement(ThemeProvider, {
                props: {
                    root: true,
                    light: this.light,
                    dark: this.dark
                }
            }, [dialog])
        ]));
        return h('div', {
            staticClass: 'v-dialog__container',
            style: {
                display: (!this.hasActivator || this.fullWidth) ? 'block' : 'inline-block'
            }
        }, children);
    }
};
//# sourceMappingURL=VDialog.js.map