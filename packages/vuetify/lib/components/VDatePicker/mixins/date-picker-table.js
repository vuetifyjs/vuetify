var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import '../../../../src/stylus/components/_date-picker-table.styl';
// Directives
import Touch from '../../../directives/touch';
// Utils
import isDateAllowed from '.././util/isDateAllowed';
/* @vue/component */
export default {
    directives: { Touch: Touch },
    props: {
        allowedDates: Function,
        current: String,
        disabled: Boolean,
        format: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        min: String,
        max: String,
        scrollable: Boolean,
        tableDate: {
            type: String,
            required: true
        },
        value: [String, Array]
    },
    data: function data() {
        return {
            isReversing: false
        };
    },
    computed: {
        computedTransition: function computedTransition() {
            return this.isReversing === !this.$vuetify.rtl ? 'tab-reverse-transition' : 'tab-transition';
        },
        displayedMonth: function displayedMonth() {
            return this.tableDate.split('-')[1] - 1;
        },
        displayedYear: function displayedYear() {
            return this.tableDate.split('-')[0] * 1;
        }
    },
    watch: {
        tableDate: function tableDate(newVal, oldVal) {
            this.isReversing = newVal < oldVal;
        }
    },
    methods: {
        genButtonClasses: function genButtonClasses(isAllowed, isFloating, isSelected, isCurrent) {
            return _extends({
                'v-btn--active': isSelected,
                'v-btn--flat': !isSelected,
                'v-btn--icon': isSelected && isAllowed && isFloating,
                'v-btn--floating': isFloating,
                'v-btn--depressed': !isFloating && isSelected,
                'v-btn--disabled': !isAllowed || this.disabled && isSelected,
                'v-btn--outline': isCurrent && !isSelected
            }, this.themeClasses);
        },
        genButton: function genButton(value, isFloating) {
            var _this = this;

            var isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates);
            var isSelected = value === this.value || Array.isArray(this.value) && this.value.indexOf(value) !== -1;
            var isCurrent = value === this.current;
            var setColor = isSelected ? this.setBackgroundColor : this.setTextColor;
            var color = (isSelected || isCurrent) && (this.color || 'accent');
            return this.$createElement('button', setColor(color, {
                staticClass: 'v-btn',
                'class': this.genButtonClasses(isAllowed, isFloating, isSelected, isCurrent),
                attrs: {
                    type: 'button'
                },
                domProps: {
                    disabled: !isAllowed,
                    innerHTML: '<div class="v-btn__content">' + this.formatter(value) + '</div>'
                },
                on: this.disabled || !isAllowed ? {} : {
                    click: function click() {
                        return _this.$emit('input', value);
                    }
                }
            }));
        },
        wheel: function wheel(e) {
            e.preventDefault();
            this.$emit('tableDate', this.calculateTableDate(e.deltaY));
        },
        touch: function touch(value) {
            this.$emit('tableDate', this.calculateTableDate(value));
        },
        genTable: function genTable(staticClass, children) {
            var _this2 = this;

            var transition = this.$createElement('transition', {
                props: { name: this.computedTransition }
            }, [this.$createElement('table', { key: this.tableDate }, children)]);
            var touchDirective = {
                name: 'touch',
                value: {
                    left: function left(e) {
                        return e.offsetX < -15 && _this2.touch(1);
                    },
                    right: function right(e) {
                        return e.offsetX > 15 && _this2.touch(-1);
                    }
                }
            };
            return this.$createElement('div', {
                staticClass: staticClass,
                class: this.themeClasses,
                on: this.scrollable ? { wheel: this.wheel } : undefined,
                directives: [touchDirective]
            }, [transition]);
        }
    }
};
//# sourceMappingURL=date-picker-table.js.map