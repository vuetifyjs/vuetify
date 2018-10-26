'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins


require('../../../src/stylus/components/_steppers.styl');

var _registrable = require('../../mixins/registrable');

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-stepper',
    mixins: [(0, _registrable.provide)('stepper'), _themeable2.default],
    provide: function provide() {
        return {
            stepClick: this.stepClick,
            isVertical: this.vertical
        };
    },

    props: {
        nonLinear: Boolean,
        altLabels: Boolean,
        vertical: Boolean,
        value: [Number, String]
    },
    data: function data() {
        return {
            inputValue: null,
            isBooted: false,
            steps: [],
            content: [],
            isReverse: false
        };
    },

    computed: {
        classes: function classes() {
            return _extends({
                'v-stepper': true,
                'v-stepper--is-booted': this.isBooted,
                'v-stepper--vertical': this.vertical,
                'v-stepper--alt-labels': this.altLabels,
                'v-stepper--non-linear': this.nonLinear
            }, this.themeClasses);
        }
    },
    watch: {
        inputValue: function inputValue(val, prev) {
            this.isReverse = Number(val) < Number(prev);
            for (var index = this.steps.length; --index >= 0;) {
                this.steps[index].toggle(this.inputValue);
            }
            for (var _index = this.content.length; --_index >= 0;) {
                this.content[_index].toggle(this.inputValue, this.isReverse);
            }
            this.$emit('input', this.inputValue);
            prev && (this.isBooted = true);
        },
        value: function value() {
            var _this = this;

            this.$nextTick(function () {
                return _this.inputValue = _this.value;
            });
        }
    },
    mounted: function mounted() {
        this.inputValue = this.value || this.steps[0].step || 1;
    },

    methods: {
        register: function register(item) {
            if (item.$options.name === 'v-stepper-step') {
                this.steps.push(item);
            } else if (item.$options.name === 'v-stepper-content') {
                item.isVertical = this.vertical;
                this.content.push(item);
            }
        },
        unregister: function unregister(item) {
            if (item.$options.name === 'v-stepper-step') {
                this.steps = this.steps.filter(function (i) {
                    return i !== item;
                });
            } else if (item.$options.name === 'v-stepper-content') {
                item.isVertical = this.vertical;
                this.content = this.content.filter(function (i) {
                    return i !== item;
                });
            }
        },
        stepClick: function stepClick(step) {
            var _this2 = this;

            this.$nextTick(function () {
                return _this2.inputValue = step;
            });
        }
    },
    render: function render(h) {
        return h('div', {
            'class': this.classes
        }, this.$slots.default);
    }
};
//# sourceMappingURL=VStepper.js.map