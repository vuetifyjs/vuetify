'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Mixins

// Directives

// Components

// Helpers


require('../../../src/stylus/components/_selection-controls.styl');

require('../../../src/stylus/components/_switch.styl');

var _selectable = require('../../mixins/selectable');

var _selectable2 = _interopRequireDefault(_selectable);

var _touch = require('../../directives/touch');

var _touch2 = _interopRequireDefault(_touch);

var _transitions = require('../transitions');

var _VProgressCircular = require('../VProgressCircular/VProgressCircular');

var _VProgressCircular2 = _interopRequireDefault(_VProgressCircular);

var _helpers = require('../../util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-switch',
    directives: { Touch: _touch2.default },
    mixins: [_selectable2.default],
    props: {
        loading: {
            type: [Boolean, String],
            default: false
        }
    },
    computed: {
        classes: function classes() {
            return {
                'v-input--selection-controls v-input--switch': true
            };
        },
        switchData: function switchData() {
            return this.setTextColor(this.loading ? undefined : this.computedColor, {
                class: this.themeClasses
            });
        }
    },
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return [this.genSwitch(), this.genLabel()];
        },
        genSwitch: function genSwitch() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [this.genInput('checkbox', this.$attrs), !this.disabled && this.genRipple(this.setTextColor(this.computedColor, {
                directives: [{
                    name: 'touch',
                    value: {
                        left: this.onSwipeLeft,
                        right: this.onSwipeRight
                    }
                }]
            })), this.$createElement('div', _extends({
                staticClass: 'v-input--switch__track'
            }, this.switchData)), this.$createElement('div', _extends({
                staticClass: 'v-input--switch__thumb'
            }, this.switchData), [this.genProgress()])]);
        },
        genProgress: function genProgress() {
            return this.$createElement(_transitions.VFabTransition, {}, [this.loading === false ? null : this.$slots.progress || this.$createElement(_VProgressCircular2.default, {
                props: {
                    color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
                    size: 16,
                    width: 2,
                    indeterminate: true
                }
            })]);
        },
        onSwipeLeft: function onSwipeLeft() {
            if (this.isActive) this.onChange();
        },
        onSwipeRight: function onSwipeRight() {
            if (!this.isActive) this.onChange();
        },
        onKeydown: function onKeydown(e) {
            if (e.keyCode === _helpers.keyCodes.left && this.isActive || e.keyCode === _helpers.keyCodes.right && !this.isActive) this.onChange();
        }
    }
};
//# sourceMappingURL=VSwitch.js.map