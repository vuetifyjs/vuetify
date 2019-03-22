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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
import '../../stylus/components/_pagination.styl';
import VIcon from '../VIcon';
// Directives
import Resize from '../../directives/resize';
// Mixins
import mixins from '../../util/mixins';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
/* @vue/component */
export default mixins(Colorable, Themeable).extend({
    name: 'v-pagination',
    directives: { Resize: Resize },
    props: {
        circle: Boolean,
        disabled: Boolean,
        length: {
            type: Number,
            default: 0,
            validator: function (val) { return val % 1 === 0; }
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
    data: function () {
        return {
            maxButtons: 0,
            selected: null
        };
    },
    computed: {
        classes: function () {
            return __assign({ 'v-pagination': true, 'v-pagination--circle': this.circle, 'v-pagination--disabled': this.disabled }, this.themeClasses);
        },
        items: function () {
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
                return __spread([1, '...'], this.range(start, end), ['...', this.length]);
            }
            else if (this.value === left) {
                var end = this.value + left - 1 - even;
                return __spread(this.range(1, end), ['...', this.length]);
            }
            else if (this.value === right) {
                var start = this.value - left + 1;
                return __spread([1, '...'], this.range(start, this.length));
            }
            else {
                return __spread(this.range(1, left), [
                    '...'
                ], this.range(right, this.length));
            }
        }
    },
    watch: {
        value: function () {
            this.init();
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function () {
            var _this = this;
            this.selected = null;
            this.$nextTick(this.onResize);
            // TODO: Change this (f75dee3a, cbdf7caa)
            setTimeout(function () { return (_this.selected = _this.value); }, 100);
        },
        onResize: function () {
            var width = this.$el && this.$el.parentElement
                ? this.$el.parentElement.clientWidth
                : window.innerWidth;
            this.maxButtons = Math.floor((width - 96) / 42);
        },
        next: function (e) {
            e.preventDefault();
            this.$emit('input', this.value + 1);
            this.$emit('next');
        },
        previous: function (e) {
            e.preventDefault();
            this.$emit('input', this.value - 1);
            this.$emit('previous');
        },
        range: function (from, to) {
            var range = [];
            from = from > 0 ? from : 1;
            for (var i = from; i <= to; i++) {
                range.push(i);
            }
            return range;
        },
        genIcon: function (h, icon, disabled, fn) {
            return h('li', [
                h('button', {
                    staticClass: 'v-pagination__navigation',
                    class: {
                        'v-pagination__navigation--disabled': disabled
                    },
                    attrs: {
                        type: 'button'
                    },
                    on: disabled ? {} : { click: fn }
                }, [h(VIcon, [icon])])
            ]);
        },
        genItem: function (h, i) {
            var _this = this;
            var color = (i === this.value) && (this.color || 'primary');
            return h('button', this.setBackgroundColor(color, {
                staticClass: 'v-pagination__item',
                class: {
                    'v-pagination__item--active': i === this.value
                },
                attrs: {
                    type: 'button'
                },
                on: {
                    click: function () { return _this.$emit('input', i); }
                }
            }), [i.toString()]);
        },
        genItems: function (h) {
            var _this = this;
            return this.items.map(function (i, index) {
                return h('li', { key: index }, [
                    isNaN(Number(i)) ? h('span', { class: 'v-pagination__more' }, [i.toString()]) : _this.genItem(h, i)
                ]);
            });
        }
    },
    render: function (h) {
        var children = [
            this.genIcon(h, this.$vuetify.rtl ? this.nextIcon : this.prevIcon, this.value <= 1, this.previous),
            this.genItems(h),
            this.genIcon(h, this.$vuetify.rtl ? this.prevIcon : this.nextIcon, this.value >= this.length, this.next)
        ];
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
//# sourceMappingURL=VPagination.js.map
//# sourceMappingURL=VPagination.js.map
//# sourceMappingURL=VPagination.js.map