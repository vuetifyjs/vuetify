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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Z1ZXRpZnkvbWl4aW5zL2JyZWFrcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBR3JCOztHQUVHO0FBRUg7Ozs7O0dBS0c7QUFDSCxlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDeEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDWCxZQUFZLEVBQUUsZUFBZSxFQUFFO1FBQy9CLFdBQVcsRUFBRSxjQUFjLEVBQUU7UUFDN0IsYUFBYSxFQUFFLFNBQStCO0tBQy9DLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixVQUFVO1lBQ1IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUE7WUFDakMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7WUFDeEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFDOUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUUxQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDakIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFDN0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNqQixNQUFNLFNBQVMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO1lBQy9DLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUVqQixJQUFJLElBQUksQ0FBQTtZQUNSLFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFLO2dCQUNQLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFLO2dCQUNQLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFLO2dCQUNQLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQTtvQkFDWCxNQUFLO2dCQUNQO29CQUNFLElBQUksR0FBRyxJQUFJLENBQUE7b0JBQ1gsTUFBSzthQUNSO1lBRUQsT0FBTztnQkFDTCx1QkFBdUI7Z0JBQ3ZCLEVBQUU7Z0JBQ0YsRUFBRTtnQkFDRixFQUFFO2dCQUNGLEVBQUU7Z0JBQ0YsRUFBRTtnQkFFRix3REFBd0Q7Z0JBQ3hELElBQUk7Z0JBRUoscUJBQXFCO2dCQUNyQixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxPQUFPO2dCQUNQLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxPQUFPO2dCQUNQLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxPQUFPO2dCQUNQLE1BQU07Z0JBRU4sK0JBQStCO2dCQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWTthQUMxQixDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBRUQsT0FBTztRQUNMLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVztZQUFFLE9BQU07UUFFekMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDckUsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVc7WUFBRSxPQUFNO1FBRXpDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUVoQywrQkFBK0I7WUFDL0IsOEJBQThCO1lBQzlCLCtCQUErQjtZQUMvQixpREFBaUQ7WUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDakUsQ0FBQztRQUNELGFBQWE7WUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsRUFBRSxDQUFBO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxFQUFFLENBQUE7UUFDckMsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBO0FBRUYseUNBQXlDO0FBQ3pDLDhDQUE4QztBQUM5QyxTQUFTLGNBQWM7SUFDckIsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXO1FBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQyxNQUFNO0lBQ3BELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FDYixRQUFRLENBQUMsZUFBZ0IsQ0FBQyxXQUFXLEVBQ3JDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUN2QixDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsZUFBZTtJQUN0QixJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVc7UUFBRSxPQUFPLENBQUMsQ0FBQSxDQUFDLE1BQU07SUFDcEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUNiLFFBQVEsQ0FBQyxlQUFnQixDQUFDLFlBQVksRUFDdEMsTUFBTSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQ3hCLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgeyBWdWV0aWZ5QnJlYWtwb2ludCB9IGZyb20gJ3R5cGVzJ1xuXG4vKipcbiAqIEEgbW9kaWZpZWQgdmVyc2lvbiBvZiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9jYjEwOS9iMDc0YTY1Zjc1OTVjZmZjMjFjZWE1OWNlOGQxNWY5YlxuICovXG5cbi8qKlxuICogQSBWdWUgbWl4aW4gdG8gZ2V0IHRoZSBjdXJyZW50IHdpZHRoL2hlaWdodCBhbmQgdGhlIGFzc29jaWF0ZWQgYnJlYWtwb2ludC5cbiAqXG4gKiAgIDxkaXYgdi1pZj1cIiRicmVha3BvaW50LnNtQW5kRG93blwiPi4uLjwvZGl2PlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XG4gIGRhdGE6ICgpID0+ICh7XG4gICAgY2xpZW50SGVpZ2h0OiBnZXRDbGllbnRIZWlnaHQoKSxcbiAgICBjbGllbnRXaWR0aDogZ2V0Q2xpZW50V2lkdGgoKSxcbiAgICByZXNpemVUaW1lb3V0OiB1bmRlZmluZWQgYXMgbnVtYmVyIHwgdW5kZWZpbmVkXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgYnJlYWtwb2ludCAoKTogVnVldGlmeUJyZWFrcG9pbnQge1xuICAgICAgY29uc3QgeHMgPSB0aGlzLmNsaWVudFdpZHRoIDwgNjAwXG4gICAgICBjb25zdCBzbSA9IHRoaXMuY2xpZW50V2lkdGggPCA5NjAgJiYgIXhzXG4gICAgICBjb25zdCBtZCA9IHRoaXMuY2xpZW50V2lkdGggPCAoMTI4MCAtIDE2KSAmJiAhKHNtIHx8IHhzKVxuICAgICAgY29uc3QgbGcgPSB0aGlzLmNsaWVudFdpZHRoIDwgKDE5MjAgLSAxNikgJiYgIShtZCB8fCBzbSB8fCB4cylcbiAgICAgIGNvbnN0IHhsID0gdGhpcy5jbGllbnRXaWR0aCA+PSAoMTkyMCAtIDE2KVxuXG4gICAgICBjb25zdCB4c09ubHkgPSB4c1xuICAgICAgY29uc3Qgc21Pbmx5ID0gc21cbiAgICAgIGNvbnN0IHNtQW5kRG93biA9ICh4cyB8fCBzbSkgJiYgIShtZCB8fCBsZyB8fCB4bClcbiAgICAgIGNvbnN0IHNtQW5kVXAgPSAheHMgJiYgKHNtIHx8IG1kIHx8IGxnIHx8IHhsKVxuICAgICAgY29uc3QgbWRPbmx5ID0gbWRcbiAgICAgIGNvbnN0IG1kQW5kRG93biA9ICh4cyB8fCBzbSB8fCBtZCkgJiYgIShsZyB8fCB4bClcbiAgICAgIGNvbnN0IG1kQW5kVXAgPSAhKHhzIHx8IHNtKSAmJiAobWQgfHwgbGcgfHwgeGwpXG4gICAgICBjb25zdCBsZ09ubHkgPSBsZ1xuICAgICAgY29uc3QgbGdBbmREb3duID0gKHhzIHx8IHNtIHx8IG1kIHx8IGxnKSAmJiAheGxcbiAgICAgIGNvbnN0IGxnQW5kVXAgPSAhKHhzIHx8IHNtIHx8IG1kKSAmJiAobGcgfHwgeGwpXG4gICAgICBjb25zdCB4bE9ubHkgPSB4bFxuXG4gICAgICBsZXQgbmFtZVxuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgKHhzKTpcbiAgICAgICAgICBuYW1lID0gJ3hzJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgKHNtKTpcbiAgICAgICAgICBuYW1lID0gJ3NtJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgKG1kKTpcbiAgICAgICAgICBuYW1lID0gJ21kJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgKGxnKTpcbiAgICAgICAgICBuYW1lID0gJ2xnJ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmFtZSA9ICd4bCdcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyBEZWZpbml0ZSBicmVha3BvaW50LlxuICAgICAgICB4cyxcbiAgICAgICAgc20sXG4gICAgICAgIG1kLFxuICAgICAgICBsZyxcbiAgICAgICAgeGwsXG5cbiAgICAgICAgLy8gVXNlZnVsIGUuZy4gdG8gY29uc3RydWN0IENTUyBjbGFzcyBuYW1lcyBkeW5hbWljYWxseS5cbiAgICAgICAgbmFtZSxcblxuICAgICAgICAvLyBCcmVha3BvaW50IHJhbmdlcy5cbiAgICAgICAgeHNPbmx5LFxuICAgICAgICBzbU9ubHksXG4gICAgICAgIHNtQW5kRG93bixcbiAgICAgICAgc21BbmRVcCxcbiAgICAgICAgbWRPbmx5LFxuICAgICAgICBtZEFuZERvd24sXG4gICAgICAgIG1kQW5kVXAsXG4gICAgICAgIGxnT25seSxcbiAgICAgICAgbGdBbmREb3duLFxuICAgICAgICBsZ0FuZFVwLFxuICAgICAgICB4bE9ubHksXG5cbiAgICAgICAgLy8gRm9yIGN1c3RvbSBicmVha3BvaW50IGxvZ2ljLlxuICAgICAgICB3aWR0aDogdGhpcy5jbGllbnRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmNsaWVudEhlaWdodFxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjcmVhdGVkICgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVyblxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUsIHsgcGFzc2l2ZTogdHJ1ZSB9KVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuXG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZSlcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgb25SZXNpemUgKCk6IHZvaWQge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZW91dClcblxuICAgICAgLy8gQWRkZWQgZGVib3VuY2UgdG8gbWF0Y2ggd2hhdFxuICAgICAgLy8gdi1yZXNpemUgdXNlZCB0byBkbyBidXQgd2FzXG4gICAgICAvLyByZW1vdmVkIGR1ZSB0byBhIG1lbW9yeSBsZWFrXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdnVldGlmeWpzL3Z1ZXRpZnkvcHVsbC8yOTk3XG4gICAgICB0aGlzLnJlc2l6ZVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnNldERpbWVuc2lvbnMsIDIwMClcbiAgICB9LFxuICAgIHNldERpbWVuc2lvbnMgKCk6IHZvaWQge1xuICAgICAgdGhpcy5jbGllbnRIZWlnaHQgPSBnZXRDbGllbnRIZWlnaHQoKVxuICAgICAgdGhpcy5jbGllbnRXaWR0aCA9IGdldENsaWVudFdpZHRoKClcbiAgICB9XG4gIH1cbn0pXG5cbi8vIENyb3NzLWJyb3dzZXIgc3VwcG9ydCBhcyBkZXNjcmliZWQgaW46XG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjQ4MDgxXG5mdW5jdGlvbiBnZXRDbGllbnRXaWR0aCAoKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gMCAvLyBTU1JcbiAgcmV0dXJuIE1hdGgubWF4KFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCEuY2xpZW50V2lkdGgsXG4gICAgd2luZG93LmlubmVyV2lkdGggfHwgMFxuICApXG59XG5cbmZ1bmN0aW9uIGdldENsaWVudEhlaWdodCAoKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gMCAvLyBTU1JcbiAgcmV0dXJuIE1hdGgubWF4KFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCEuY2xpZW50SGVpZ2h0LFxuICAgIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwXG4gIClcbn1cbiJdfQ==