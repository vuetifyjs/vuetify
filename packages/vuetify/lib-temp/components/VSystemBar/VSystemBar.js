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
            return {
                'v-system-bar--lights-out': this.lightsOut,
                'v-system-bar--absolute': this.absolute,
                'v-system-bar--fixed': !this.absolute && (this.app || this.fixed),
                'v-system-bar--status': this.status,
                'v-system-bar--window': this.window,
                ...this.themeClasses
            };
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
        return h('div', this.setBackgroundColor(this.color, data), this.$slots.default);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlN5c3RlbUJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTeXN0ZW1CYXIvVlN5c3RlbUJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDJDQUEyQyxDQUFBO0FBRWxELE9BQU8sZUFBZSxNQUFNLDhCQUE4QixDQUFBO0FBQzFELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBRTlDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGNBQWM7SUFFcEIsTUFBTSxFQUFFO1FBQ04sZUFBZSxDQUFDLEtBQUssRUFBRTtZQUNyQixRQUFRO1lBQ1IsUUFBUTtTQUNULENBQUM7UUFDRixTQUFTO1FBQ1QsU0FBUztLQUNWO0lBRUQsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxTQUFTLEVBQUUsT0FBTztRQUNsQixNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRSxPQUFPO0tBQ2hCO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU87Z0JBQ0wsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQzFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2pFLHNCQUFzQixFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkMsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNyQixDQUFBO1FBQ0gsQ0FBQztRQUNELGNBQWM7WUFDWixJQUFJLElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUU3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQzlCLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQOzs7O1dBSUc7UUFDSCxpQkFBaUI7WUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUE7UUFDNUIsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLElBQUksR0FBRztZQUNYLFdBQVcsRUFBRSxjQUFjO1lBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSTthQUNuQztTQUNGLENBQUE7UUFFRCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqRixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3N5c3RlbS1iYXJzLnN0eWwnXG5cbmltcG9ydCBBcHBsaWNhdGlvbmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2FwcGxpY2F0aW9uYWJsZSdcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcbmltcG9ydCBUaGVtZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3Ytc3lzdGVtLWJhcicsXG5cbiAgbWl4aW5zOiBbXG4gICAgQXBwbGljYXRpb25hYmxlKCdiYXInLCBbXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICd3aW5kb3cnXG4gICAgXSksXG4gICAgQ29sb3JhYmxlLFxuICAgIFRoZW1lYWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgaGVpZ2h0OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+ICFpc05hTihwYXJzZUludCh2KSlcbiAgICB9LFxuICAgIGxpZ2h0c091dDogQm9vbGVhbixcbiAgICBzdGF0dXM6IEJvb2xlYW4sXG4gICAgd2luZG93OiBCb29sZWFuXG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LXN5c3RlbS1iYXItLWxpZ2h0cy1vdXQnOiB0aGlzLmxpZ2h0c091dCxcbiAgICAgICAgJ3Ytc3lzdGVtLWJhci0tYWJzb2x1dGUnOiB0aGlzLmFic29sdXRlLFxuICAgICAgICAndi1zeXN0ZW0tYmFyLS1maXhlZCc6ICF0aGlzLmFic29sdXRlICYmICh0aGlzLmFwcCB8fCB0aGlzLmZpeGVkKSxcbiAgICAgICAgJ3Ytc3lzdGVtLWJhci0tc3RhdHVzJzogdGhpcy5zdGF0dXMsXG4gICAgICAgICd2LXN5c3RlbS1iYXItLXdpbmRvdyc6IHRoaXMud2luZG93LFxuICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWRIZWlnaHQgKCkge1xuICAgICAgaWYgKHRoaXMuaGVpZ2h0KSByZXR1cm4gcGFyc2VJbnQodGhpcy5oZWlnaHQpXG5cbiAgICAgIHJldHVybiB0aGlzLndpbmRvdyA/IDMyIDogMjRcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgYXBwbGljYXRpb24gbGF5b3V0XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgdXBkYXRlQXBwbGljYXRpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRIZWlnaHRcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1zeXN0ZW0tYmFyJyxcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGhlaWdodDogYCR7dGhpcy5jb21wdXRlZEhlaWdodH1weGBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaCgnZGl2JywgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb2xvciwgZGF0YSksIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gIH1cbn1cbiJdfQ==