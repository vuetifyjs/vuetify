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
import '../../stylus/components/_steppers.styl';
// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable';
import Themeable from '../../mixins/themeable';
// Util
import mixins from '../../util/mixins';
export default mixins(RegistrableProvide('stepper'), Themeable
/* @vue/component */
).extend({
    name: 'v-stepper',
    provide: function () {
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
    data: function () {
        return {
            inputValue: null,
            isBooted: false,
            steps: [],
            content: [],
            isReverse: false
        };
    },
    computed: {
        classes: function () {
            return __assign({ 'v-stepper': true, 'v-stepper--is-booted': this.isBooted, 'v-stepper--vertical': this.vertical, 'v-stepper--alt-labels': this.altLabels, 'v-stepper--non-linear': this.nonLinear }, this.themeClasses);
        }
    },
    watch: {
        inputValue: function (val, prev) {
            this.isReverse = Number(val) < Number(prev);
            for (var index = this.steps.length; --index >= 0;) {
                this.steps[index].toggle(this.inputValue);
            }
            for (var index = this.content.length; --index >= 0;) {
                this.content[index].toggle(this.inputValue, this.isReverse);
            }
            this.$emit('input', this.inputValue);
            prev && (this.isBooted = true);
        },
        value: function () {
            var _this = this;
            this.$nextTick(function () { return (_this.inputValue = _this.value); });
        }
    },
    mounted: function () {
        this.inputValue = this.value || this.steps[0].step || 1;
    },
    methods: {
        register: function (item) {
            if (item.$options.name === 'v-stepper-step') {
                this.steps.push(item);
            }
            else if (item.$options.name === 'v-stepper-content') {
                item.isVertical = this.vertical;
                this.content.push(item);
            }
        },
        unregister: function (item) {
            if (item.$options.name === 'v-stepper-step') {
                this.steps = this.steps.filter(function (i) { return i !== item; });
            }
            else if (item.$options.name === 'v-stepper-content') {
                item.isVertical = this.vertical;
                this.content = this.content.filter(function (i) { return i !== item; });
            }
        },
        stepClick: function (step) {
            var _this = this;
            this.$nextTick(function () { return (_this.inputValue = step); });
        }
    },
    render: function (h) {
        return h('div', {
            'class': this.classes
        }, this.$slots.default);
    }
});
//# sourceMappingURL=VStepper.js.map
//# sourceMappingURL=VStepper.js.map
//# sourceMappingURL=VStepper.js.map