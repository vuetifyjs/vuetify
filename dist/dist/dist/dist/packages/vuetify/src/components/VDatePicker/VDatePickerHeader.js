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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
import '../../stylus/components/_date-picker-header.styl';
// Components
import VBtn from '../VBtn';
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
// Utils
import { createNativeLocaleFormatter, monthChange } from './util';
import mixins from '../../util/mixins';
export default mixins(Colorable, Themeable
/* @vue/component */
).extend({
    name: 'v-date-picker-header',
    props: {
        disabled: Boolean,
        format: Function,
        locale: {
            type: String,
            default: 'en-us'
        },
        min: String,
        max: String,
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        readonly: Boolean,
        value: {
            type: [Number, String],
            required: true
        }
    },
    data: function () {
        return {
            isReversing: false
        };
    },
    computed: {
        formatter: function () {
            if (this.format) {
                return this.format;
            }
            else if (String(this.value).split('-')[1]) {
                return createNativeLocaleFormatter(this.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 });
            }
            else {
                return createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
            }
        }
    },
    watch: {
        value: function (newVal, oldVal) {
            this.isReversing = newVal < oldVal;
        }
    },
    methods: {
        genBtn: function (change) {
            var _this = this;
            var disabled = this.disabled ||
                (change < 0 && this.min && this.calculateChange(change) < this.min) ||
                (change > 0 && this.max && this.calculateChange(change) > this.max);
            return this.$createElement(VBtn, {
                props: {
                    dark: this.dark,
                    disabled: disabled,
                    icon: true,
                    light: this.light
                },
                nativeOn: {
                    click: function (e) {
                        e.stopPropagation();
                        _this.$emit('input', _this.calculateChange(change));
                    }
                }
            }, [
                this.$createElement(VIcon, ((change < 0) === !this.$vuetify.rtl) ? this.prevIcon : this.nextIcon)
            ]);
        },
        calculateChange: function (sign) {
            var _a = __read(String(this.value).split('-').map(Number), 2), year = _a[0], month = _a[1];
            if (month == null) {
                return "" + (year + sign);
            }
            else {
                return monthChange(String(this.value), sign);
            }
        },
        genHeader: function () {
            var _this = this;
            var color = !this.disabled && (this.color || 'accent');
            var header = this.$createElement('div', this.setTextColor(color, {
                key: String(this.value)
            }), [this.$createElement('button', {
                    attrs: {
                        type: 'button'
                    },
                    on: {
                        click: function () { return _this.$emit('toggle'); }
                    }
                }, [this.$slots.default || this.formatter(String(this.value))])]);
            var transition = this.$createElement('transition', {
                props: {
                    name: (this.isReversing === !this.$vuetify.rtl) ? 'tab-reverse-transition' : 'tab-transition'
                }
            }, [header]);
            return this.$createElement('div', {
                staticClass: 'v-date-picker-header__value',
                class: {
                    'v-date-picker-header__value--disabled': this.disabled
                }
            }, [transition]);
        }
    },
    render: function () {
        return this.$createElement('div', {
            staticClass: 'v-date-picker-header',
            class: __assign({ 'v-date-picker-header--disabled': this.disabled }, this.themeClasses)
        }, [
            this.genBtn(-1),
            this.genHeader(),
            this.genBtn(+1)
        ]);
    }
});
//# sourceMappingURL=VDatePickerHeader.js.map
//# sourceMappingURL=VDatePickerHeader.js.map
//# sourceMappingURL=VDatePickerHeader.js.map
//# sourceMappingURL=VDatePickerHeader.js.map