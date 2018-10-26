'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_bottom-navs.styl');

var _applicationable = require('../../mixins/applicationable');

var _applicationable2 = _interopRequireDefault(_applicationable);

var _buttonGroup = require('../../mixins/button-group');

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mixins
exports.default = (0, _mixins2.default)((0, _applicationable2.default)('bottom', ['height', 'value']), _colorable2.default
/* @vue/component */
).extend({
    name: 'v-bottom-nav',
    props: {
        active: [Number, String],
        mandatory: Boolean,
        height: {
            default: 56,
            type: [Number, String],
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        shift: Boolean,
        value: null
    },
    computed: {
        classes: function classes() {
            return {
                'v-bottom-nav--absolute': this.absolute,
                'v-bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
                'v-bottom-nav--shift': this.shift,
                'v-bottom-nav--active': this.value
            };
        },
        computedHeight: function computedHeight() {
            return parseInt(this.height);
        }
    },
    methods: {
        updateApplication: function updateApplication() {
            return !this.value ? 0 : this.computedHeight;
        },
        updateValue: function updateValue(val) {
            this.$emit('update:active', val);
        }
    },
    render: function render(h) {
        return h(_buttonGroup2.default, this.setBackgroundColor(this.color, {
            staticClass: 'v-bottom-nav',
            class: this.classes,
            style: {
                height: parseInt(this.computedHeight) + 'px'
            },
            props: {
                mandatory: Boolean(this.mandatory || this.active !== undefined),
                value: this.active
            },
            on: { change: this.updateValue }
        }), this.$slots.default);
    }
});
// Util
// Styles
//# sourceMappingURL=VBottomNav.js.map