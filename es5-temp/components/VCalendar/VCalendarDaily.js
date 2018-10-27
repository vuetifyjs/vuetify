// Styles
import '../../stylus/components/_calendar-daily.styl';
// Mixins
import CalendarWithIntervals from './mixins/calendar-with-intervals';
// Util
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default CalendarWithIntervals.extend({
    name: 'v-calendar-daily',
    computed: {
        classes() {
            return {
                'v-calendar-daily': true,
                ...this.themeClasses
            };
        }
    },
    methods: {
        genHead() {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__head'
            }, [
                this.genHeadIntervals(),
                ...this.genHeadDays()
            ]);
        },
        genHeadIntervals() {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__intervals-head'
            });
        },
        genHeadDays() {
            return this.days.map(this.genHeadDay);
        },
        genHeadDay(day) {
            const slot = this.$scopedSlots.dayHeader;
            return this.$createElement('div', {
                key: day.date,
                staticClass: 'v-calendar-daily_head-day',
                class: this.getRelativeClasses(day),
                on: this.getDefaultMouseEventHandlers(':day', e => {
                    return day;
                })
            }, [
                this.genHeadWeekday(day),
                this.genHeadDayLabel(day),
                slot ? slot(day) : ''
            ]);
        },
        genHeadWeekday(day) {
            const color = day.present ? this.computedColor : null;
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily_head-weekday',
                class: this.addTextColorClassChecks({}, color)
            }, this.weekdayFormatter(day, this.shortWeekdays));
        },
        genHeadDayLabel(day) {
            const color = day.present ? this.computedColor : null;
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily_head-day-label',
                class: this.addTextColorClassChecks({}, color),
                on: this.getMouseEventHandlers({
                    'click:date': { event: 'click', stop: true },
                    'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false }
                }, e => {
                    return day;
                })
            }, this.dayFormatter(day, false));
        },
        genBody() {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__body'
            }, [
                this.genScrollArea()
            ]);
        },
        genScrollArea() {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__scroll-area'
            }, [
                this.genPane()
            ]);
        },
        genPane() {
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
        genDayContainer() {
            return this.$createElement('div', {
                staticClass: 'v-calendar-daily__day-container'
            }, [
                this.genBodyIntervals(),
                ...this.genDays()
            ]);
        },
        genDays() {
            return this.days.map(this.genDay);
        },
        genDay(day, index) {
            const slot = this.$scopedSlots.dayBody;
            return this.$createElement('div', {
                key: day.date,
                staticClass: 'v-calendar-daily__day',
                class: this.getRelativeClasses(day),
                on: this.getDefaultMouseEventHandlers(':time', e => {
                    return this.getTimestampAtEvent(e, day);
                })
            }, [
                ...this.genDayIntervals(index),
                slot ? slot(day) : ''
            ]);
        },
        genDayIntervals(index) {
            return this.intervals[index].map(this.genDayInterval);
        },
        genDayInterval(interval) {
            const height = convertToUnit(this.intervalHeight);
            const styler = this.intervalStyle || this.intervalStyleDefault;
            const slot = this.$scopedSlots.interval;
            const data = {
                key: interval.time,
                staticClass: 'v-calendar-daily__day-interval',
                style: {
                    height,
                    ...styler(interval)
                }
            };
            const children = slot ? slot(interval) : undefined;
            return this.$createElement('div', data, children);
        },
        genBodyIntervals() {
            const data = {
                staticClass: 'v-calendar-daily__intervals-body',
                on: this.getDefaultMouseEventHandlers(':interval', e => {
                    return this.getTimestampAtEvent(e, this.parsedStart);
                })
            };
            return this.$createElement('div', data, this.genIntervalLabels());
        },
        genIntervalLabels() {
            return this.intervals[0].map(this.genIntervalLabel);
        },
        genIntervalLabel(interval) {
            const height = convertToUnit(this.intervalHeight);
            const short = this.shortIntervals;
            const shower = this.showIntervalLabel || this.showIntervalLabelDefault;
            const show = shower(interval);
            const label = show ? this.intervalFormatter(interval, short) : undefined;
            return this.$createElement('div', {
                key: interval.time,
                staticClass: 'v-calendar-daily__interval',
                style: {
                    height
                }
            }, [
                this.$createElement('div', {
                    staticClass: 'v-calendar-daily__interval-text'
                }, label)
            ]);
        }
    },
    render(h) {
        return h('div', {
            class: this.classes,
            nativeOn: {
                dragstart: (e) => {
                    e.preventDefault();
                }
            }
        }, [
            !this.hideHeader ? this.genHead() : '',
            this.genBody()
        ]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNhbGVuZGFyRGFpbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WQ2FsZW5kYXIvVkNhbGVuZGFyRGFpbHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUztBQUNULE9BQU8sOENBQThDLENBQUE7QUFLckQsU0FBUztBQUNULE9BQU8scUJBQXFCLE1BQU0sa0NBQWtDLENBQUE7QUFFcEUsT0FBTztBQUNQLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUdsRCxvQkFBb0I7QUFDcEIsZUFBZSxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7SUFDMUMsSUFBSSxFQUFFLGtCQUFrQjtJQUV4QixRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCxrQkFBa0IsRUFBRSxJQUFJO2dCQUN4QixHQUFHLElBQUksQ0FBQyxZQUFZO2FBQ3JCLENBQUE7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxPQUFPO1lBQ0wsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLHdCQUF3QjthQUN0QyxFQUFFO2dCQUNELElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ3RCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxnQkFBZ0I7WUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUsa0NBQWtDO2FBQ2hELENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxXQUFXO1lBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELFVBQVUsQ0FBRSxHQUFlO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFB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LEVBQUU7U0FDZixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19jYWxlbmRhci1kYWlseS5zdHlsJ1xuXG4vLyBUeXBlc1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICd2dWUnXG5cbi8vIE1peGluc1xuaW1wb3J0IENhbGVuZGFyV2l0aEludGVydmFscyBmcm9tICcuL21peGlucy9jYWxlbmRhci13aXRoLWludGVydmFscydcblxuLy8gVXRpbFxuaW1wb3J0IHsgY29udmVydFRvVW5pdCB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcbmltcG9ydCB7IFZUaW1lc3RhbXAgfSBmcm9tICcuL3V0aWwvdGltZXN0YW1wJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgQ2FsZW5kYXJXaXRoSW50ZXJ2YWxzLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWNhbGVuZGFyLWRhaWx5JyxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1jYWxlbmRhci1kYWlseSc6IHRydWUsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5IZWFkICgpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtY2FsZW5kYXItZGFpbHlfX2hlYWQnXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuSGVhZEludGVydmFscygpLFxuICAgICAgICAuLi50aGlzLmdlbkhlYWREYXlzKClcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5IZWFkSW50ZXJ2YWxzICgpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtY2FsZW5kYXItZGFpbHlfX2ludGVydmFscy1oZWFkJ1xuICAgICAgfSlcbiAgICB9LFxuICAgIGdlbkhlYWREYXlzICgpOiBWTm9kZVtdIHtcbiAgICAgIHJldHVybiB0aGlzLmRheXMubWFwKHRoaXMuZ2VuSGVhZERheSlcbiAgICB9LFxuICAgIGdlbkhlYWREYXkgKGRheTogVlRpbWVzdGFtcCk6IFZOb2RlIHtcbiAgICAgIGNvbnN0IHNsb3QgPSB0aGlzLiRzY29wZWRTbG90cy5kYXlIZWFkZXJcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAga2V5OiBkYXkuZGF0ZSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWNhbGVuZGFyLWRhaWx5X2hlYWQtZGF5JyxcbiAgICAgICAgY2xhc3M6IHRoaXMuZ2V0UmVsYXRpdmVDbGFzc2VzKGRheSksXG4gICAgICAgIG9uOiB0aGlzLmdldERlZmF1bHRNb3VzZUV2ZW50SGFuZGxlcnMoJzpkYXknLCBlID0+IHtcbiAgICAgICAgICByZXR1cm4gZGF5XG4gICAgICAgIH0pXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuSGVhZFdlZWtkYXkoZGF5KSxcbiAgICAgICAgdGhpcy5nZW5IZWFkRGF5TGFiZWwoZGF5KSxcbiAgICAgICAgc2xvdCA/IHNsb3QoZGF5KSA6ICcnXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuSGVhZFdlZWtkYXkgKGRheTogVlRpbWVzdGFtcCk6IFZOb2RlIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gZGF5LnByZXNlbnQgPyB0aGlzLmNvbXB1dGVkQ29sb3IgOiBudWxsXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1jYWxlbmRhci1kYWlseV9oZWFkLXdlZWtkYXknLFxuICAgICAgICBjbGFzczogdGhpcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcyh7fSwgY29sb3IpXG4gICAgICB9LCB0aGlzLndlZWtkYXlGb3JtYXR0ZXIoZGF5LCB0aGlzLnNob3J0V2Vla2RheXMpKVxuICAgIH0sXG4gICAgZ2VuSGVhZERheUxhYmVsIChkYXk6IFZUaW1lc3RhbXApOiBWTm9kZSB7XG4gICAgICBjb25zdCBjb2xvciA9IGRheS5wcmVzZW50ID8gdGhpcy5jb21wdXRlZENvbG9yIDogbnVsbFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtY2FsZW5kYXItZGFpbHlfaGVhZC1kYXktbGFiZWwnLFxuICAgICAgICBjbGFzczogdGhpcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcyh7fSwgY29sb3IpLFxuICAgICAgICBvbjogdGhpcy5nZXRNb3VzZUV2ZW50SGFuZGxlcnMoe1xuICAgICAgICAgICdjbGljazpkYXRlJzogeyBldmVudDogJ2NsaWNrJywgc3RvcDogdHJ1ZSB9LFxuICAgICAgICAgICdjb250ZXh0bWVudTpkYXRlJzogeyBldmVudDogJ2NvbnRleHRtZW51Jywgc3RvcDogdHJ1ZSwgcHJldmVudDogdHJ1ZSwgcmVzdWx0OiBmYWxzZSB9XG4gICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgIHJldHVybiBkYXlcbiAgICAgICAgfSlcbiAgICAgIH0sIHRoaXMuZGF5Rm9ybWF0dGVyKGRheSwgZmFsc2UpKVxuICAgIH0sXG4gICAgZ2VuQm9keSAoKTogVk5vZGUge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWNhbGVuZGFyLWRhaWx5X19ib2R5J1xuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlblNjcm9sbEFyZWEoKVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlblNjcm9sbEFyZWEgKCk6IFZOb2RlIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1jYWxlbmRhci1kYWlseV9fc2Nyb2xsLWFyZWEnXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuUGFuZSgpXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuUGFuZSAoKTogVk5vZGUge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAncGFuZScsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1jYWxlbmRhci1kYWlseV9fcGFuZScsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgaGVpZ2h0OiBjb252ZXJ0VG9Vbml0KHRoaXMuYm9keUhlaWdodClcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlbkRheUNvbnRhaW5lcigpXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuRGF5Q29udGFpbmVyICgpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtY2FsZW5kYXItZGFpbHlfX2RheS1jb250YWluZXInXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuQm9keUludGVydmFscygpLFxuICAgICAgICAuLi50aGlzLmdlbkRheXMoKVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlbkRheXMgKCk6IFZOb2RlW10ge1xuICAgICAgcmV0dXJuIHRoaXMuZGF5cy5tYXAodGhpcy5nZW5EYXkpXG4gICAgfSxcbiAgICBnZW5EYXkgKGRheTogVlRpbWVzdGFtcCwgaW5kZXg6IG51bWJlcik6IFZOb2RlIHtcbiAgICAgIGNvbnN0IHNsb3QgPSB0aGlzLiRzY29wZWRTbG90cy5kYXlCb2R5XG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIGtleTogZGF5LmRhdGUsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1jYWxlbmRhci1kYWlseV9fZGF5JyxcbiAgICAgICAgY2xhc3M6IHRoaXMuZ2V0UmVsYXRpdmVDbGFzc2VzKGRheSksXG4gICAgICAgIG9uOiB0aGlzLmdldERlZmF1bHRNb3VzZUV2ZW50SGFuZGxlcnMoJzp0aW1lJywgZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGltZXN0YW1wQXRFdmVudChlLCBkYXkpXG4gICAgICAgIH0pXG4gICAgICB9LCBbXG4gICAgICAgIC4uLnRoaXMuZ2VuRGF5SW50ZXJ2YWxzKGluZGV4KSxcbiAgICAgICAgc2xvdCA/IHNsb3QoZGF5KSA6ICcnXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuRGF5SW50ZXJ2YWxzIChpbmRleDogbnVtYmVyKTogVk5vZGVbXSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbHNbaW5kZXhdLm1hcCh0aGlzLmdlbkRheUludGVydmFsKVxuICAgIH0sXG4gICAgZ2VuRGF5SW50ZXJ2YWwgKGludGVydmFsOiBWVGltZXN0YW1wKTogVk5vZGUge1xuICAgICAgY29uc3QgaGVpZ2h0OiBzdHJpbmcgfCB1bmRlZmluZWQgPSBjb252ZXJ0VG9Vbml0KHRoaXMuaW50ZXJ2YWxIZWlnaHQpXG4gICAgICBjb25zdCBzdHlsZXIgPSB0aGlzLmludGVydmFsU3R5bGUgfHwgdGhpcy5pbnRlcnZhbFN0eWxlRGVmYXVsdFxuICAgICAgY29uc3Qgc2xvdCA9IHRoaXMuJHNjb3BlZFNsb3RzLmludGVydmFsXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGtleTogaW50ZXJ2YWwudGltZSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWNhbGVuZGFyLWRhaWx5X19kYXktaW50ZXJ2YWwnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAuLi5zdHlsZXIoaW50ZXJ2YWwpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGRyZW4gPSBzbG90ID8gc2xvdChpbnRlcnZhbCkgOiB1bmRlZmluZWRcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIGRhdGEsIGNoaWxkcmVuKVxuICAgIH0sXG4gICAgZ2VuQm9keUludGVydmFscyAoKTogVk5vZGUge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWNhbGVuZGFyLWRhaWx5X19pbnRlcnZhbHMtYm9keScsXG4gICAgICAgIG9uOiB0aGlzLmdldERlZmF1bHRNb3VzZUV2ZW50SGFuZGxlcnMoJzppbnRlcnZhbCcsIGUgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldFRpbWVzdGFtcEF0RXZlbnQoZSwgdGhpcy5wYXJzZWRTdGFydClcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIGRhdGEsIHRoaXMuZ2VuSW50ZXJ2YWxMYWJlbHMoKSlcbiAgICB9LFxuICAgIGdlbkludGVydmFsTGFiZWxzICgpOiBWTm9kZVtdIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsc1swXS5tYXAodGhpcy5nZW5JbnRlcnZhbExhYmVsKVxuICAgIH0sXG4gICAgZ2VuSW50ZXJ2YWxMYWJlbCAoaW50ZXJ2YWw6IFZUaW1lc3RhbXApOiBWTm9kZSB7XG4gICAgICBjb25zdCBoZWlnaHQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGNvbnZlcnRUb1VuaXQodGhpcy5pbnRlcnZhbEhlaWdodClcbiAgICAgIGNvbnN0IHNob3J0OiBib29sZWFuID0gdGhpcy5zaG9ydEludGVydmFsc1xuICAgICAgY29uc3Qgc2hvd2VyID0gdGhpcy5zaG93SW50ZXJ2YWxMYWJlbCB8fCB0aGlzLnNob3dJbnRlcnZhbExhYmVsRGVmYXVsdFxuICAgICAgY29uc3Qgc2hvdyA9IHNob3dlcihpbnRlcnZhbClcbiAgICAgIGNvbnN0IGxhYmVsID0gc2hvdyA/IHRoaXMuaW50ZXJ2YWxGb3JtYXR0ZXIoaW50ZXJ2YWwsIHNob3J0KSA6IHVuZGVmaW5lZFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBrZXk6IGludGVydmFsLnRpbWUsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1jYWxlbmRhci1kYWlseV9faW50ZXJ2YWwnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGhlaWdodFxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3YtY2FsZW5kYXItZGFpbHlfX2ludGVydmFsLXRleHQnXG4gICAgICAgIH0sIGxhYmVsKVxuICAgICAgXSlcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKTogVk5vZGUge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogdGhpcy5jbGFzc2VzLFxuICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgZHJhZ3N0YXJ0OiAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgIXRoaXMuaGlkZUhlYWRlciA/IHRoaXMuZ2VuSGVhZCgpIDogJycsXG4gICAgICB0aGlzLmdlbkJvZHkoKVxuICAgIF0pXG4gIH1cbn0pXG4iXX0=