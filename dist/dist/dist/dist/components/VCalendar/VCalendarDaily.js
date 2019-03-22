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
// Styles
import '../../stylus/components/_calendar-daily.styl';
// Directives
import Resize from '../../directives/resize';
// Mixins
import CalendarWithIntervals from './mixins/calendar-with-intervals';
// Util
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default CalendarWithIntervals.extend({
    name: 'v-calendar-daily',
    directives: { Resize: Resize },
    data: function () {
        return ({
            scrollPush: 0
        });
    },
    computed: {
        classes: function () {
            return __assign({ 'v-calendar-daily': true }, this.themeClasses);
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function () {
            this.$nextTick(this.onResize);
        },
        onResize: function () {
            this.scrollPush = this.getScrollPush();
        },
        getScrollPush: function () {
            var area = this.$refs.scrollArea;
            var pane = this.$refs.pane;
            return area && pane ? (area.offsetWidth - pane.offsetWidth) : 0;
        },
        genHead: function () {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__head',
                style: {
                    marginRight: this.scrollPush + 'px'
                }
            }, __spread([
                this.genHeadIntervals()
            ], this.genHeadDays()));
        },
        genHeadIntervals: function () {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__intervals-head'
            });
        },
        genHeadDays: function () {
            return this.days.map(this.genHeadDay);
        },
        genHeadDay: function (day) {
            var _this = this;
            var slot = this.$scopedSlots.dayHeader;
            return this.$createElement('div', {
                key: day.date,
                staticClass: 'v-calendar-daily_head-day',
                class: this.getRelativeClasses(day),
                on: this.getDefaultMouseEventHandlers(':day', function (_e) {
                    return _this.getSlotScope(day);
                })
            }, [
                this.genHeadWeekday(day),
                this.genHeadDayLabel(day),
                slot ? slot(day) : ''
            ]);
        },
        genHeadWeekday: function (day) {
            var color = day.present ? this.color : undefined;
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-calendar-daily_head-weekday'
            }), this.weekdayFormatter(day, this.shortWeekdays));
        },
        genHeadDayLabel: function (day) {
            var color = day.present ? this.color : undefined;
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-calendar-daily_head-day-label',
                on: this.getMouseEventHandlers({
                    'click:date': { event: 'click', stop: true },
                    'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false }
                }, function (_e) {
                    return day;
                })
            }), this.dayFormatter(day, false));
        },
        genBody: function () {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__body'
            }, [
                this.genScrollArea()
            ]);
        },
        genScrollArea: function () {
            return this.$createElement('div', {
                ref: 'scrollArea',
                staticClass: 'v-calendar-daily__scroll-area'
            }, [
                this.genPane()
            ]);
        },
        genPane: function () {
            return this.$createElement('div', {
                ref: 'pane',
                staticClass: 'v-calendar-daily__pane',
                style: {
                    height: convertToUnit(this.bodyHeight)
                }
            }, [
                this.genDayContainer()
            ]);
        },
        genDayContainer: function () {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__day-container'
            }, __spread([
                this.genBodyIntervals()
            ], this.genDays()));
        },
        genDays: function () {
            return this.days.map(this.genDay);
        },
        genDay: function (day, index) {
            var _this = this;
            var slot = this.$scopedSlots.dayBody;
            var scope = this.getSlotScope(day);
            return this.$createElement('div', {
                key: day.date,
                staticClass: 'v-calendar-daily__day',
                class: this.getRelativeClasses(day),
                on: this.getDefaultMouseEventHandlers(':time', function (e) {
                    return _this.getSlotScope(_this.getTimestampAtEvent(e, day));
                })
            }, __spread(this.genDayIntervals(index), [
                slot ? slot(scope) : ''
            ]));
        },
        genDayIntervals: function (index) {
            return this.intervals[index].map(this.genDayInterval);
        },
        genDayInterval: function (interval) {
            var height = convertToUnit(this.intervalHeight);
            var styler = this.intervalStyle || this.intervalStyleDefault;
            var slot = this.$scopedSlots.interval;
            var scope = this.getSlotScope(interval);
            var data = {
                key: interval.time,
                staticClass: 'v-calendar-daily__day-interval',
                style: __assign({ height: height }, styler(interval))
            };
            var children = slot ? slot(scope) : undefined;
            return this.$createElement('div', data, children);
        },
        genBodyIntervals: function () {
            var _this = this;
            var data = {
                staticClass: 'v-calendar-daily__intervals-body',
                on: this.getDefaultMouseEventHandlers(':interval', function (e) {
                    return _this.getTimestampAtEvent(e, _this.parsedStart);
                })
            };
            return this.$createElement('div', data, this.genIntervalLabels());
        },
        genIntervalLabels: function () {
            return this.intervals[0].map(this.genIntervalLabel);
        },
        genIntervalLabel: function (interval) {
            var height = convertToUnit(this.intervalHeight);
            var short = this.shortIntervals;
            var shower = this.showIntervalLabel || this.showIntervalLabelDefault;
            var show = shower(interval);
            var label = show ? this.intervalFormatter(interval, short) : undefined;
            return this.$createElement('div', {
                key: interval.time,
                staticClass: 'v-calendar-daily__interval',
                style: {
                    height: height
                }
            }, [
                this.$createElement('div', {
                    staticClass: 'v-calendar-daily__interval-text'
                }, label)
            ]);
        }
    },
    render: function (h) {
        return h('div', {
            class: this.classes,
            nativeOn: {
                dragstart: function (e) {
                    e.preventDefault();
                }
            },
            directives: [{
                    modifiers: { quiet: true },
                    name: 'resize',
                    value: this.onResize
                }]
        }, [
            !this.hideHeader ? this.genHead() : '',
            this.genBody()
        ]);
    }
});
//# sourceMappingURL=VCalendarDaily.js.map
//# sourceMappingURL=VCalendarDaily.js.map
//# sourceMappingURL=VCalendarDaily.js.map
//# sourceMappingURL=VCalendarDaily.js.map