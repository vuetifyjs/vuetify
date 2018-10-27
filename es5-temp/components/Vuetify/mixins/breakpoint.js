import Vue from 'vue';
/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 */
/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 *
 */
export default Vue.extend({
    data: () => ({
        clientHeight: getClientHeight(),
        clientWidth: getClientWidth(),
        resizeTimeout: undefined
    }),
    computed: {
        breakpoint() {
            const xs = this.clientWidth < 600;
            const sm = this.clientWidth < 960 && !xs;
            const md = this.clientWidth < (1280 - 16) && !(sm || xs);
            const lg = this.clientWidth < (1920 - 16) && !(md || sm || xs);
            const xl = this.clientWidth >= (1920 - 16);
            const xsOnly = xs;
            const smOnly = sm;
            const smAndDown = (xs || sm) && !(md || lg || xl);
            const smAndUp = !xs && (sm || md || lg || xl);
            const mdOnly = md;
            const mdAndDown = (xs || sm || md) && !(lg || xl);
            const mdAndUp = !(xs || sm) && (md || lg || xl);
            const lgOnly = lg;
            const lgAndDown = (xs || sm || md || lg) && !xl;
            const lgAndUp = !(xs || sm || md) && (lg || xl);
            const xlOnly = xl;
            let name;
            switch (true) {
                case (xs):
                    name = 'xs';
                    break;
                case (sm):
                    name = 'sm';
                    break;
                case (md):
                    name = 'md';
                    break;
                case (lg):
                    name = 'lg';
                    break;
                default:
                    name = 'xl';
                    break;
            }
            return {
                // Definite breakpoint.
                xs,
                sm,
                md,
                lg,
                xl,
                // Useful e.g. to construct CSS class names dynamically.
                name,
                // Breakpoint ranges.
                xsOnly,
                smOnly,
                smAndDown,
                smAndUp,
                mdOnly,
                mdAndDown,
                mdAndUp,
                lgOnly,
                lgAndDown,
                lgAndUp,
                xlOnly,
                // For custom breakpoint logic.
                width: this.clientWidth,
                height: this.clientHeight
            };
        }
    },
    created() {
        if (typeof window === 'undefined')
            return;
        window.addEventListener('resize', this.onResize, { passive: true });
    },
    beforeDestroy() {
        if (typeof window === 'undefined')
            return;
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            clearTimeout(this.resizeTimeout);
            // Added debounce to match what
            // v-resize used to do but was
            // removed due to a memory leak
            // https://github.com/vuetifyjs/vuetify/pull/2997
            this.resizeTimeout = window.setTimeout(this.setDimensions, 200);
        },
        setDimensions() {
            this.clientHeight = getClientHeight();
            this.clientWidth = getClientWidth();
        }
    }
});
// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
function getClientWidth() {
    if (typeof document === 'undefined')
        return 0; // SSR
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
function getClientHeight() {
    if (typeof document === 'undefined')
        return 0; // SSR
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Z1ZXRpZnkvbWl4aW5zL2JyZWFrcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBR3JCOztHQUVHO0FBRUg7Ozs7O0dBS0c7QUFDSCxlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDeEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDWCxZQUFZLEVBQUUsZUFBZSxFQUFFO1FBQy9CLFdBQVcsRUFBRSxjQUFjLEVBQUU7UUFDN0IsYUFBYSxFQUFFLFNBQStCO0tBQy9DLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixVQUFVO1lBQ1IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUE7WUFDakMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7WUFDeEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFDOUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUUxQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDakIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFDN0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNqQixNQUFNLFNBQVMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO1lBQy9DLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUVqQixJQUFJLElBQUksQ0FBQTtZQUNSLFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFLO2dCQUNQLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFLO2dCQUNQLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFLO2dCQUNQLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFLO2dCQUNQO29CQUNFLElBQUksR0FBRyxJQUFJLENBQUE7b0JBQ1gsTUFBSzthQUNSO1lBRUQsT0FBTztnQkFDTCx1QkFBdUI7Z0JBQ3ZCLEVBQUU7Z0JBQ0YsRUFBRTtnQkFDRixFQUFFO2dCQUNGLEVBQUU7Z0JBQ0YsRUFBRTtnQkFFRix3REFBd0Q7Z0JBQ3hELElBQUk7Z0JBRUoscUJBQXFCO2dCQUNyQixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxPQUFPO2dCQUNQLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxPQUFPO2dCQUNQLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxPQUFPO2dCQUNQLE1BQU07Z0JBRU4sK0JBQStCO2dCQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWTthQUMxQixDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBRUQsT0FBTztRQUNMLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVztZQUFFLE9BQU07UUFFekMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDckUsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVc7WUFBRSxPQUFNO1FBRXpDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUVoQywrQkFBK0I7WUFDL0IsOEJBQThCO1lBQzlCLCtCQUErQjtZQUMvQixpREFBaUQ7WUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDakUsQ0FBQztRQUNELGFBQWE7WUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsRUFBRSxDQUFBO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxFQUFFLENBQUE7UUFDckMsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBO0FBRUYseUNBQXlDO0FBQ3pDLDhDQUE4QztBQUM5QyxTQUFTLGNBQWM7SUFDckIsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXO1FBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQyxNQUFNO0lBQ3BELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FDYixRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFDcEMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQ3ZCLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBUyxlQUFlO0lBQ3RCLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVztRQUFFLE9BQU8sQ0FBQyxDQUFBLENBQUMsTUFBTTtJQUNwRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQ2IsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQ3JDLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUN4QixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IHsgVnVldGlmeUJyZWFrcG9pbnQgfSBmcm9tICd0eXBlcydcblxuLyoqXG4gKiBBIG1vZGlmaWVkIHZlcnNpb24gb2YgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY2IxMDkvYjA3NGE2NWY3NTk1Y2ZmYzIxY2VhNTljZThkMTVmOWJcbiAqL1xuXG4vKipcbiAqIEEgVnVlIG1peGluIHRvIGdldCB0aGUgY3VycmVudCB3aWR0aC9oZWlnaHQgYW5kIHRoZSBhc3NvY2lhdGVkIGJyZWFrcG9pbnQuXG4gKlxuICogICA8ZGl2IHYtaWY9XCIkYnJlYWtwb2ludC5zbUFuZERvd25cIj4uLi48L2Rpdj5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xuICBkYXRhOiAoKSA9PiAoe1xuICAgIGNsaWVudEhlaWdodDogZ2V0Q2xpZW50SGVpZ2h0KCksXG4gICAgY2xpZW50V2lkdGg6IGdldENsaWVudFdpZHRoKCksXG4gICAgcmVzaXplVGltZW91dDogdW5kZWZpbmVkIGFzIG51bWJlciB8IHVuZGVmaW5lZFxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGJyZWFrcG9pbnQgKCk6IFZ1ZXRpZnlCcmVha3BvaW50IHtcbiAgICAgIGNvbnN0IHhzID0gdGhpcy5jbGllbnRXaWR0aCA8IDYwMFxuICAgICAgY29uc3Qgc20gPSB0aGlzLmNsaWVudFdpZHRoIDwgOTYwICYmICF4c1xuICAgICAgY29uc3QgbWQgPSB0aGlzLmNsaWVudFdpZHRoIDwgKDEyODAgLSAxNikgJiYgIShzbSB8fCB4cylcbiAgICAgIGNvbnN0IGxnID0gdGhpcy5jbGllbnRXaWR0aCA8ICgxOTIwIC0gMTYpICYmICEobWQgfHwgc20gfHwgeHMpXG4gICAgICBjb25zdCB4bCA9IHRoaXMuY2xpZW50V2lkdGggPj0gKDE5MjAgLSAxNilcblxuICAgICAgY29uc3QgeHNPbmx5ID0geHNcbiAgICAgIGNvbnN0IHNtT25seSA9IHNtXG4gICAgICBjb25zdCBzbUFuZERvd24gPSAoeHMgfHwgc20pICYmICEobWQgfHwgbGcgfHwgeGwpXG4gICAgICBjb25zdCBzbUFuZFVwID0gIXhzICYmIChzbSB8fCBtZCB8fCBsZyB8fCB4bClcbiAgICAgIGNvbnN0IG1kT25seSA9IG1kXG4gICAgICBjb25zdCBtZEFuZERvd24gPSAoeHMgfHwgc20gfHwgbWQpICYmICEobGcgfHwgeGwpXG4gICAgICBjb25zdCBtZEFuZFVwID0gISh4cyB8fCBzbSkgJiYgKG1kIHx8IGxnIHx8IHhsKVxuICAgICAgY29uc3QgbGdPbmx5ID0gbGdcbiAgICAgIGNvbnN0IGxnQW5kRG93biA9ICh4cyB8fCBzbSB8fCBtZCB8fCBsZykgJiYgIXhsXG4gICAgICBjb25zdCBsZ0FuZFVwID0gISh4cyB8fCBzbSB8fCBtZCkgJiYgKGxnIHx8IHhsKVxuICAgICAgY29uc3QgeGxPbmx5ID0geGxcblxuICAgICAgbGV0IG5hbWVcbiAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlICh4cyk6XG4gICAgICAgICAgbmFtZSA9ICd4cydcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIChzbSk6XG4gICAgICAgICAgbmFtZSA9ICdzbSdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIChtZCk6XG4gICAgICAgICAgbmFtZSA9ICdtZCdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIChsZyk6XG4gICAgICAgICAgbmFtZSA9ICdsZydcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5hbWUgPSAneGwnXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gRGVmaW5pdGUgYnJlYWtwb2ludC5cbiAgICAgICAgeHMsXG4gICAgICAgIHNtLFxuICAgICAgICBtZCxcbiAgICAgICAgbGcsXG4gICAgICAgIHhsLFxuXG4gICAgICAgIC8vIFVzZWZ1bCBlLmcuIHRvIGNvbnN0cnVjdCBDU1MgY2xhc3MgbmFtZXMgZHluYW1pY2FsbHkuXG4gICAgICAgIG5hbWUsXG5cbiAgICAgICAgLy8gQnJlYWtwb2ludCByYW5nZXMuXG4gICAgICAgIHhzT25seSxcbiAgICAgICAgc21Pbmx5LFxuICAgICAgICBzbUFuZERvd24sXG4gICAgICAgIHNtQW5kVXAsXG4gICAgICAgIG1kT25seSxcbiAgICAgICAgbWRBbmREb3duLFxuICAgICAgICBtZEFuZFVwLFxuICAgICAgICBsZ09ubHksXG4gICAgICAgIGxnQW5kRG93bixcbiAgICAgICAgbGdBbmRVcCxcbiAgICAgICAgeGxPbmx5LFxuXG4gICAgICAgIC8vIEZvciBjdXN0b20gYnJlYWtwb2ludCBsb2dpYy5cbiAgICAgICAgd2lkdGg6IHRoaXMuY2xpZW50V2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5jbGllbnRIZWlnaHRcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZCAoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLCB7IHBhc3NpdmU6IHRydWUgfSlcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVyblxuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uUmVzaXplICgpOiB2b2lkIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpXG5cbiAgICAgIC8vIEFkZGVkIGRlYm91bmNlIHRvIG1hdGNoIHdoYXRcbiAgICAgIC8vIHYtcmVzaXplIHVzZWQgdG8gZG8gYnV0IHdhc1xuICAgICAgLy8gcmVtb3ZlZCBkdWUgdG8gYSBtZW1vcnkgbGVha1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZXRpZnlqcy92dWV0aWZ5L3B1bGwvMjk5N1xuICAgICAgdGhpcy5yZXNpemVUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQodGhpcy5zZXREaW1lbnNpb25zLCAyMDApXG4gICAgfSxcbiAgICBzZXREaW1lbnNpb25zICgpOiB2b2lkIHtcbiAgICAgIHRoaXMuY2xpZW50SGVpZ2h0ID0gZ2V0Q2xpZW50SGVpZ2h0KClcbiAgICAgIHRoaXMuY2xpZW50V2lkdGggPSBnZXRDbGllbnRXaWR0aCgpXG4gICAgfVxuICB9XG59KVxuXG4vLyBDcm9zcy1icm93c2VyIHN1cHBvcnQgYXMgZGVzY3JpYmVkIGluOlxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTI0ODA4MVxuZnVuY3Rpb24gZ2V0Q2xpZW50V2lkdGggKCkge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIDAgLy8gU1NSXG4gIHJldHVybiBNYXRoLm1heChcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsXG4gICAgd2luZG93LmlubmVyV2lkdGggfHwgMFxuICApXG59XG5cbmZ1bmN0aW9uIGdldENsaWVudEhlaWdodCAoKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gMCAvLyBTU1JcbiAgcmV0dXJuIE1hdGgubWF4KFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgd2luZG93LmlubmVySGVpZ2h0IHx8IDBcbiAgKVxufVxuIl19