'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_progress-linear.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _helpers = require('../../util/helpers');

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _transitions = require('../transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// Mixins

// Helpers


/* @vue/component */
exports.default = (0, _mixins2.default)(_colorable2.default).extend({
    name: 'v-progress-linear',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        backgroundColor: {
            type: String,
            default: null
        },
        backgroundOpacity: {
            type: [Number, String],
            default: null
        },
        bufferValue: {
            type: [Number, String],
            default: 100
        },
        color: {
            type: String,
            default: 'primary'
        },
        height: {
            type: [Number, String],
            default: 7
        },
        indeterminate: Boolean,
        query: Boolean,
        value: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        backgroundStyle: function backgroundStyle() {
            var backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);
            return {
                height: this.active ? (0, _helpers.convertToUnit)(this.height) : 0,
                opacity: backgroundOpacity,
                width: this.normalizedBufer + '%'
            };
        },
        effectiveWidth: function effectiveWidth() {
            if (!this.normalizedBufer) {
                return 0;
            }
            return +this.normalizedValue * 100 / +this.normalizedBufer;
        },
        normalizedBufer: function normalizedBufer() {
            if (this.bufferValue < 0) {
                return 0;
            }
            if (this.bufferValue > 100) {
                return 100;
            }
            return parseInt(this.bufferValue, 10);
        },
        normalizedValue: function normalizedValue() {
            if (this.value < 0) {
                return 0;
            }
            if (this.value > 100) {
                return 100;
            }
            return parseInt(this.value, 10);
        },
        styles: function styles() {
            var styles = {};
            if (!this.active) {
                styles.height = 0;
            }
            if (!this.indeterminate && parseInt(this.normalizedBufer, 10) !== 100) {
                styles.width = this.normalizedBufer + '%';
            }
            return styles;
        }
    },
    methods: {
        genDeterminate: function genDeterminate(h) {
            return h('div', this.setBackgroundColor(this.color, {
                ref: 'front',
                staticClass: 'v-progress-linear__bar__determinate',
                style: {
                    width: this.effectiveWidth + '%'
                }
            }));
        },
        genBar: function genBar(h, name) {
            return h('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: _defineProperty({}, name, true)
            }));
        },
        genIndeterminate: function genIndeterminate(h) {
            return h('div', {
                ref: 'front',
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: {
                    'v-progress-linear__bar__indeterminate--active': this.active
                }
            }, [this.genBar(h, 'long'), this.genBar(h, 'short')]);
        }
    },
    render: function render(h) {
        var fade = h(_transitions.VFadeTransition, this.indeterminate ? [this.genIndeterminate(h)] : []);
        var slide = h(_transitions.VSlideXTransition, this.indeterminate ? [] : [this.genDeterminate(h)]);
        var bar = h('div', {
            staticClass: 'v-progress-linear__bar',
            style: this.styles
        }, [fade, slide]);
        var background = h('div', this.setBackgroundColor(this.backgroundColor || this.color, {
            staticClass: 'v-progress-linear__background',
            style: this.backgroundStyle
        }));
        return h('div', {
            staticClass: 'v-progress-linear',
            attrs: {
                'role': 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': this.normalizedBufer,
                'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
            },
            class: {
                'v-progress-linear--query': this.query
            },
            style: {
                height: (0, _helpers.convertToUnit)(this.height)
            },
            on: this.$listeners
        }, [background, bar]);
    }
});
//# sourceMappingURL=VProgressLinear.js.map