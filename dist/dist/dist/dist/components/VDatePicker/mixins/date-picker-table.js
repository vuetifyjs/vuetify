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
import '../../../stylus/components/_date-picker-table.styl';
// Directives
import Touch from '../../../directives/touch';
// Mixins
import Colorable from '../../../mixins/colorable';
import Themeable from '../../../mixins/themeable';
// Utils
import isDateAllowed from '../util/isDateAllowed';
import mixins from '../../../util/mixins';
export default mixins(Colorable, Themeable
/* @vue/component */
).extend({
    directives: { Touch: Touch },
    props: {
        allowedDates: Function,
        current: String,
        disabled: Boolean,
        format: Function,
        events: {
            type: [Array, Function, Object],
            default: function () { return null; }
        },
        eventColor: {
            type: [Array, Function, Object, String],
            default: function () { return 'warning'; }
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        min: String,
        max: String,
        readonly: Boolean,
        scrollable: Boolean,
        tableDate: {
            type: String,
            required: true
        },
        value: [String, Array]
    },
    data: function () {
        return ({
            isReversing: false
        });
    },
    computed: {
        computedTransition: function () {
            return (this.isReversing === !this.$vuetify.rtl) ? 'tab-reverse-transition' : 'tab-transition';
        },
        displayedMonth: function () {
            return Number(this.tableDate.split('-')[1]) - 1;
        },
        displayedYear: function () {
            return Number(this.tableDate.split('-')[0]);
        }
    },
    watch: {
        tableDate: function (newVal, oldVal) {
            this.isReversing = newVal < oldVal;
        }
    },
    methods: {
        genButtonClasses: function (isAllowed, isFloating, isSelected, isCurrent) {
            return __assign({ 'v-btn--active': isSelected, 'v-btn--flat': !isSelected, 'v-btn--icon': isSelected && isAllowed && isFloating, 'v-btn--floating': isFloating, 'v-btn--depressed': !isFloating && isSelected, 'v-btn--disabled': !isAllowed || (this.disabled && isSelected), 'v-btn--outline': isCurrent && !isSelected }, this.themeClasses);
        },
        genButtonEvents: function (value, isAllowed, mouseEventType) {
            var _this = this;
            if (this.disabled)
                return undefined;
            return {
                click: function () {
                    isAllowed && !_this.readonly && _this.$emit('input', value);
                    _this.$emit("click:" + mouseEventType, value);
                },
                dblclick: function () { return _this.$emit("dblclick:" + mouseEventType, value); }
            };
        },
        genButton: function (value, isFloating, mouseEventType, formatter) {
            var isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates);
            var isSelected = value === this.value || (Array.isArray(this.value) && this.value.indexOf(value) !== -1);
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
                    disabled: this.disabled || !isAllowed
                },
                on: this.genButtonEvents(value, isAllowed, mouseEventType)
            }), [
                this.$createElement('div', {
                    staticClass: 'v-btn__content'
                }, [formatter(value)]),
                this.genEvents(value)
            ]);
        },
        getEventColors: function (date) {
            var arrayize = function (v) { return Array.isArray(v) ? v : [v]; };
            var eventData;
            var eventColors = [];
            if (Array.isArray(this.events)) {
                eventData = this.events.includes(date);
            }
            else if (this.events instanceof Function) {
                eventData = this.events(date) || false;
            }
            else if (this.events) {
                eventData = this.events[date] || false;
            }
            else {
                eventData = false;
            }
            if (!eventData) {
                return [];
            }
            else if (eventData !== true) {
                eventColors = arrayize(eventData);
            }
            else if (typeof this.eventColor === 'string') {
                eventColors = [this.eventColor];
            }
            else if (typeof this.eventColor === 'function') {
                eventColors = arrayize(this.eventColor(date));
            }
            else if (Array.isArray(this.eventColor)) {
                eventColors = this.eventColor;
            }
            else {
                eventColors = arrayize(this.eventColor[date]);
            }
            return eventColors.filter(function (v) { return v; });
        },
        genEvents: function (date) {
            var _this = this;
            var eventColors = this.getEventColors(date);
            return eventColors.length ? this.$createElement('div', {
                staticClass: 'v-date-picker-table__events'
            }, eventColors.map(function (color) { return _this.$createElement('div', _this.setBackgroundColor(color)); })) : null;
        },
        wheel: function (e, calculateTableDate) {
            e.preventDefault();
            this.$emit('tableDate', calculateTableDate(e.deltaY));
        },
        touch: function (value, calculateTableDate) {
            this.$emit('tableDate', calculateTableDate(value));
        },
        genTable: function (staticClass, children, calculateTableDate) {
            var _this = this;
            var transition = this.$createElement('transition', {
                props: { name: this.computedTransition }
            }, [this.$createElement('table', { key: this.tableDate }, children)]);
            var touchDirective = {
                name: 'touch',
                value: {
                    left: function (e) { return (e.offsetX < -15) && _this.touch(1, calculateTableDate); },
                    right: function (e) { return (e.offsetX > 15) && _this.touch(-1, calculateTableDate); }
                }
            };
            return this.$createElement('div', {
                staticClass: staticClass,
                class: __assign({ 'v-date-picker-table--disabled': this.disabled }, this.themeClasses),
                on: (!this.disabled && this.scrollable) ? {
                    wheel: function (e) { return _this.wheel(e, calculateTableDate); }
                } : undefined,
                directives: [touchDirective]
            }, [transition]);
        }
    }
});
//# sourceMappingURL=date-picker-table.js.map
//# sourceMappingURL=date-picker-table.js.map
//# sourceMappingURL=date-picker-table.js.map
//# sourceMappingURL=date-picker-table.js.map