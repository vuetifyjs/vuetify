'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Directives

// Mixins


require('../../../src/stylus/components/_pagination.styl');

var _VIcon = require('../VIcon');

var _VIcon2 = _interopRequireDefault(_VIcon);

var _resize = require('../../directives/resize');

var _resize2 = _interopRequireDefault(_resize);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* @vue/component */
exports.default = (0, _mixins2.default)(_colorable2.default, _themeable2.default).extend({
    name: 'v-pagination',
    directives: { Resize: _resize2.default },
    props: {
        circle: Boolean,
        disabled: Boolean,
        length: {
            type: Number,
            default: 0,
            validator: function validator(val) {
                return val % 1 === 0;
            }
        },
        totalVisible: [Number, String],
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function data() {
        return {
            maxButtons: 0,
            selected: null
        };
    },

    computed: {
        classes: function classes() {
            return _extends({
                'v-pagination': true,
                'v-pagination--circle': this.circle,
                'v-pagination--disabled': this.disabled
            }, this.themeClasses);
        },
        items: function items() {
            var maxLength = parseInt(this.totalVisible, 10) || this.maxButtons;
            if (this.length <= maxLength) {
                return this.range(1, this.length);
            }
            var even = maxLength % 2 === 0 ? 1 : 0;
            var left = Math.floor(maxLength / 2);
            var right = this.length - left + 1 + even;
            if (this.value > left && this.value < right) {
                var start = this.value - left + 2;
                var end = this.value + left - 2 - even;
                return [1, '...'].concat(_toConsumableArray(this.range(start, end)), ['...', this.length]);
            } else if (this.value === left) {
                var _end = this.value + left - 1 - even;
                return [].concat(_toConsumableArray(this.range(1, _end)), ['...', this.length]);
            } else if (this.value === right) {
                var _start = this.value - left + 1;
                return [1, '...'].concat(_toConsumableArray(this.range(_start, this.length)));
            } else {
                return [].concat(_toConsumableArray(this.range(1, left)), ['...'], _toConsumableArray(this.range(right, this.length)));
            }
        }
    },
    watch: {
        value: function value() {
            this.init();
        }
    },
    mounted: function mounted() {
        this.init();
    },

    methods: {
        init: function init() {
            var _this = this;

            this.selected = null;
            this.$nextTick(this.onResize);
            // TODO: Change this (f75dee3a, cbdf7caa)
            setTimeout(function () {
                return _this.selected = _this.value;
            }, 100);
        },
        onResize: function onResize() {
            var width = this.$el && this.$el.parentElement ? this.$el.parentElement.clientWidth : window.innerWidth;
            this.maxButtons = Math.floor((width - 96) / 42);
        },
        next: function next(e) {
            e.preventDefault();
            this.$emit('input', this.value + 1);
            this.$emit('next');
        },
        previous: function previous(e) {
            e.preventDefault();
            this.$emit('input', this.value - 1);
            this.$emit('previous');
        },
        range: function range(from, to) {
            var range = [];
            from = from > 0 ? from : 1;
            for (var i = from; i <= to; i++) {
                range.push(i);
            }
            return range;
        },
        genIcon: function genIcon(h, icon, disabled, fn) {
            return h('li', [h('button', {
                staticClass: 'v-pagination__navigation',
                class: {
                    'v-pagination__navigation--disabled': disabled
                },
                attrs: {
                    type: 'button'
                },
                on: disabled ? {} : { click: fn }
            }, [h(_VIcon2.default, [icon])])]);
        },
        genItem: function genItem(h, i) {
            var _this2 = this;

            var color = i === this.value && (this.color || 'primary');
            return h('button', this.setBackgroundColor(color, {
                staticClass: 'v-pagination__item',
                class: {
                    'v-pagination__item--active': i === this.value
                },
                attrs: {
                    type: 'button'
                },
                on: {
                    click: function click() {
                        return _this2.$emit('input', i);
                    }
                }
            }), [i.toString()]);
        },
        genItems: function genItems(h) {
            var _this3 = this;

            return this.items.map(function (i, index) {
                return h('li', { key: index }, [isNaN(Number(i)) ? h('span', { class: 'v-pagination__more' }, [i.toString()]) : _this3.genItem(h, i)]);
            });
        }
    },
    render: function render(h) {
        var children = [this.genIcon(h, this.$vuetify.rtl ? this.nextIcon : this.prevIcon, this.value <= 1, this.previous), this.genItems(h), this.genIcon(h, this.$vuetify.rtl ? this.prevIcon : this.nextIcon, this.value >= this.length, this.next)];
        return h('ul', {
            directives: [{
                modifiers: { quiet: true },
                name: 'resize',
                value: this.onResize
            }],
            class: this.classes
        }, children);
    }
});
//# sourceMappingURL=VPagination.js.map