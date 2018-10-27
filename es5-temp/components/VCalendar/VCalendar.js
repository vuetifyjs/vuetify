// Styles
// import '../../stylus/components/_calendar-daily.styl'
// Mixins
import CalendarWithIntervals from './mixins/calendar-with-intervals';
/* @vue/component */
export default CalendarWithIntervals.extend({
    name: 'v-calendar',
    computed: {
        classes() {
            return {
                'v-calendar': true,
                ...this.themeClasses
            };
        }
    },
    render(h) {
        return h('div', {
            class: this.classes
        }, []);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkNhbGVuZGFyL1ZDYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1Qsd0RBQXdEO0FBS3hELFNBQVM7QUFDVCxPQUFPLHFCQUFxQixNQUFNLGtDQUFrQyxDQUFBO0FBRXBFLG9CQUFvQjtBQUNwQixlQUFlLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztJQUMxQyxJQUFJLEVBQUUsWUFBWTtJQUVsQixRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNyQixDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDcEIsRUFBRSxFQUVGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbi8vIGltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2NhbGVuZGFyLWRhaWx5LnN0eWwnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBWTm9kZSB9IGZyb20gJ3Z1ZSdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ2FsZW5kYXJXaXRoSW50ZXJ2YWxzIGZyb20gJy4vbWl4aW5zL2NhbGVuZGFyLXdpdGgtaW50ZXJ2YWxzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgQ2FsZW5kYXJXaXRoSW50ZXJ2YWxzLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWNhbGVuZGFyJyxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1jYWxlbmRhcic6IHRydWUsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6IHRoaXMuY2xhc3Nlc1xuICAgIH0sIFtcblxuICAgIF0pXG4gIH1cbn0pXG4iXX0=