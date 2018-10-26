import Vue from 'vue';
/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */
export default Vue.extend({
    name: 'delayable',
    props: {
        openDelay: {
            type: [Number, String],
            default: 0
        },
        closeDelay: {
            type: [Number, String],
            default: 0
        }
    },
    data: () => ({
        openTimeout: undefined,
        closeTimeout: undefined
    }),
    methods: {
        /**
         * Clear any pending delay timers from executing
         */
        clearDelay() {
            clearTimeout(this.openTimeout);
            clearTimeout(this.closeTimeout);
        },
        /**
         * Runs callback after a specified delay
         */
        runDelay(type, cb) {
            this.clearDelay();
            const delay = parseInt(this[`${type}Delay`], 10);
            this[`${type}Timeout`] = setTimeout(cb, delay);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXlhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9kZWxheWFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBRXJCOzs7Ozs7R0FNRztBQUNILGVBQWUsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN4QixJQUFJLEVBQUUsV0FBVztJQUVqQixLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7S0FDRjtJQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsV0FBVyxFQUFFLFNBQStCO1FBQzVDLFlBQVksRUFBRSxTQUErQjtLQUM5QyxDQUFDO0lBRUYsT0FBTyxFQUFFO1FBQ1A7O1dBRUc7UUFDSCxVQUFVO1lBQ1IsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUM5QixZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFDRDs7V0FFRztRQUNILFFBQVEsQ0FBRSxJQUFzQixFQUFFLEVBQWM7WUFDOUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBRWpCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBRSxJQUFZLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUV4RDtZQUFDLElBQVksQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMxRCxDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcblxuLyoqXG4gKiBEZWxheWFibGVcbiAqXG4gKiBAbWl4aW5cbiAqXG4gKiBDaGFuZ2VzIHRoZSBvcGVuIG9yIGNsb3NlIGRlbGF5IHRpbWUgZm9yIGVsZW1lbnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xuICBuYW1lOiAnZGVsYXlhYmxlJyxcblxuICBwcm9wczoge1xuICAgIG9wZW5EZWxheToge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIGNsb3NlRGVsYXk6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgb3BlblRpbWVvdXQ6IHVuZGVmaW5lZCBhcyBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2xvc2VUaW1lb3V0OiB1bmRlZmluZWQgYXMgbnVtYmVyIHwgdW5kZWZpbmVkXG4gIH0pLFxuXG4gIG1ldGhvZHM6IHtcbiAgICAvKipcbiAgICAgKiBDbGVhciBhbnkgcGVuZGluZyBkZWxheSB0aW1lcnMgZnJvbSBleGVjdXRpbmdcbiAgICAgKi9cbiAgICBjbGVhckRlbGF5ICgpOiB2b2lkIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLm9wZW5UaW1lb3V0KVxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VUaW1lb3V0KVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogUnVucyBjYWxsYmFjayBhZnRlciBhIHNwZWNpZmllZCBkZWxheVxuICAgICAqL1xuICAgIHJ1bkRlbGF5ICh0eXBlOiAnb3BlbicgfCAnY2xvc2UnLCBjYjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgdGhpcy5jbGVhckRlbGF5KClcblxuICAgICAgY29uc3QgZGVsYXkgPSBwYXJzZUludCgodGhpcyBhcyBhbnkpW2Ake3R5cGV9RGVsYXlgXSwgMTApXG5cbiAgICAgIDsodGhpcyBhcyBhbnkpW2Ake3R5cGV9VGltZW91dGBdID0gc2V0VGltZW91dChjYiwgZGVsYXkpXG4gICAgfVxuICB9XG59KVxuIl19