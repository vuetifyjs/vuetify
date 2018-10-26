import Vue from 'vue';
/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (drawer, toolbar, content)
 * to avoid an entry animation when using SSR
 */
export default Vue.extend({
    name: 'ssr-bootable',
    data: () => ({
        isBooted: false
    }),
    mounted() {
        // Use setAttribute instead of dataset
        // because dataset does not work well
        // with unit tests
        window.requestAnimationFrame(() => {
            this.$el.setAttribute('data-booted', 'true');
            this.isBooted = true;
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyLWJvb3RhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9zc3ItYm9vdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBRXJCOzs7Ozs7O0dBT0c7QUFDSCxlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDeEIsSUFBSSxFQUFFLGNBQWM7SUFFcEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDWCxRQUFRLEVBQUUsS0FBSztLQUNoQixDQUFDO0lBRUYsT0FBTztRQUNMLHNDQUFzQztRQUN0QyxxQ0FBcUM7UUFDckMsa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuXG4vKipcbiAqIFNTUkJvb3RhYmxlXG4gKlxuICogQG1peGluXG4gKlxuICogVXNlZCBpbiBsYXlvdXQgY29tcG9uZW50cyAoZHJhd2VyLCB0b29sYmFyLCBjb250ZW50KVxuICogdG8gYXZvaWQgYW4gZW50cnkgYW5pbWF0aW9uIHdoZW4gdXNpbmcgU1NSXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xuICBuYW1lOiAnc3NyLWJvb3RhYmxlJyxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlzQm9vdGVkOiBmYWxzZVxuICB9KSxcblxuICBtb3VudGVkICgpIHtcbiAgICAvLyBVc2Ugc2V0QXR0cmlidXRlIGluc3RlYWQgb2YgZGF0YXNldFxuICAgIC8vIGJlY2F1c2UgZGF0YXNldCBkb2VzIG5vdCB3b3JrIHdlbGxcbiAgICAvLyB3aXRoIHVuaXQgdGVzdHNcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuJGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1ib290ZWQnLCAndHJ1ZScpXG4gICAgICB0aGlzLmlzQm9vdGVkID0gdHJ1ZVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=