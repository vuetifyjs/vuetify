import '../../stylus/components/_system-bars.styl';
import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
/* @vue/component */
export default {
    name: 'v-system-bar',
    mixins: [
        Applicationable('bar', [
            'height',
            'window'
        ]),
        Colorable,
        Themeable
    ],
    props: {
        height: {
            type: [Number, String],
            validator: v => !isNaN(parseInt(v))
        },
        lightsOut: Boolean,
        status: Boolean,
        window: Boolean
    },
    computed: {
        classes() {
            return this.addBackgroundColorClassChecks({
                'v-system-bar--lights-out': this.lightsOut,
                'v-system-bar--absolute': this.absolute,
                'v-system-bar--fixed': !this.absolute && (this.app || this.fixed),
                'v-system-bar--status': this.status,
                'v-system-bar--window': this.window,
                ...this.themeClasses
            });
        },
        computedHeight() {
            if (this.height)
                return parseInt(this.height);
            return this.window ? 32 : 24;
        }
    },
    methods: {
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication() {
            return this.computedHeight;
        }
    },
    render(h) {
        const data = {
            staticClass: 'v-system-bar',
            'class': this.classes,
            style: {
                height: `${this.computedHeight}px`
            }
        };
        return h('div', data, this.$slots.default);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlN5c3RlbUJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTeXN0ZW1CYXIvVlN5c3RlbUJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDJDQUEyQyxDQUFBO0FBRWxELE9BQU8sZUFBZSxNQUFNLDhCQUE4QixDQUFBO0FBQzFELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBRTlDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGNBQWM7SUFFcEIsTUFBTSxFQUFFO1FBQ04sZUFBZSxDQUFDLEtBQUssRUFBRTtZQUNyQixRQUFRO1lBQ1IsUUFBUTtTQUNULENBQUM7UUFDRixTQUFTO1FBQ1QsU0FBUztLQUNWO0lBRUQsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxTQUFTLEVBQUUsT0FBTztRQUNsQixNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRSxPQUFPO0tBQ2hCO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU8sSUFBSSxDQUFDLDZCQUE2QixDQUFDO2dCQUN4QywwQkFBMEIsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDMUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDakUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25DLHNCQUFzQixFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQyxHQUFHLElBQUksQ0FBQyxZQUFZO2FBQ3JCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxjQUFjO1lBQ1osSUFBSSxJQUFJLENBQUMsTUFBTTtnQkFBRSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUM5QixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUDs7OztXQUlHO1FBQ0gsaUJBQWlCO1lBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO1FBQzVCLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxJQUFJLEdBQUc7WUFDWCxXQUFXLEVBQUUsY0FBYztZQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsS0FBSyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLElBQUk7YUFDbkM7U0FDRixDQUFBO1FBRUQsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzVDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc3lzdGVtLWJhcnMuc3R5bCdcblxuaW1wb3J0IEFwcGxpY2F0aW9uYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvYXBwbGljYXRpb25hYmxlJ1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1zeXN0ZW0tYmFyJyxcblxuICBtaXhpbnM6IFtcbiAgICBBcHBsaWNhdGlvbmFibGUoJ2JhcicsIFtcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3dpbmRvdydcbiAgICBdKSxcbiAgICBDb2xvcmFibGUsXG4gICAgVGhlbWVhYmxlXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gIWlzTmFOKHBhcnNlSW50KHYpKVxuICAgIH0sXG4gICAgbGlnaHRzT3V0OiBCb29sZWFuLFxuICAgIHN0YXR1czogQm9vbGVhbixcbiAgICB3aW5kb3c6IEJvb2xlYW5cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkQmFja2dyb3VuZENvbG9yQ2xhc3NDaGVja3Moe1xuICAgICAgICAndi1zeXN0ZW0tYmFyLS1saWdodHMtb3V0JzogdGhpcy5saWdodHNPdXQsXG4gICAgICAgICd2LXN5c3RlbS1iYXItLWFic29sdXRlJzogdGhpcy5hYnNvbHV0ZSxcbiAgICAgICAgJ3Ytc3lzdGVtLWJhci0tZml4ZWQnOiAhdGhpcy5hYnNvbHV0ZSAmJiAodGhpcy5hcHAgfHwgdGhpcy5maXhlZCksXG4gICAgICAgICd2LXN5c3RlbS1iYXItLXN0YXR1cyc6IHRoaXMuc3RhdHVzLFxuICAgICAgICAndi1zeXN0ZW0tYmFyLS13aW5kb3cnOiB0aGlzLndpbmRvdyxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21wdXRlZEhlaWdodCAoKSB7XG4gICAgICBpZiAodGhpcy5oZWlnaHQpIHJldHVybiBwYXJzZUludCh0aGlzLmhlaWdodClcblxuICAgICAgcmV0dXJuIHRoaXMud2luZG93ID8gMzIgOiAyNFxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBhcHBsaWNhdGlvbiBsYXlvdXRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICB1cGRhdGVBcHBsaWNhdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wdXRlZEhlaWdodFxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXN5c3RlbS1iYXInLFxuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgaGVpZ2h0OiBgJHt0aGlzLmNvbXB1dGVkSGVpZ2h0fXB4YFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCB0aGlzLiRzbG90cy5kZWZhdWx0KVxuICB9XG59XG4iXX0=