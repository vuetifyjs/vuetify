import Vue from 'vue';
/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
/* @vue/component */
export default Vue.extend().extend({
    name: 'bootable',
    props: {
        lazy: Boolean
    },
    data: () => ({
        isBooted: false
    }),
    computed: {
        hasContent() {
            return this.isBooted || !this.lazy || this.isActive;
        }
    },
    watch: {
        isActive() {
            this.isBooted = true;
        }
    },
    methods: {
        showLazyContent(content) {
            return this.hasContent ? content : undefined;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW5zL2Jvb3RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBYyxNQUFNLEtBQUssQ0FBQTtBQU1oQzs7Ozs7OztHQU9HO0FBQ0gsb0JBQW9CO0FBQ3BCLGVBQWUsR0FBRyxDQUFDLE1BQU0sRUFBb0IsQ0FBQyxNQUFNLENBQUM7SUFDbkQsSUFBSSxFQUFFLFVBQVU7SUFFaEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE9BQU87S0FDZDtJQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQztJQUVGLFFBQVEsRUFBRTtRQUNSLFVBQVU7WUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDckQsQ0FBQztLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsUUFBUTtZQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLGVBQWUsQ0FBRSxPQUFnQjtZQUMvQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1FBQzlDLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUsIHsgVk5vZGUgfSBmcm9tICd2dWUnXG5cbmludGVyZmFjZSBUb2dnbGVhYmxlIGV4dGVuZHMgVnVlIHtcbiAgaXNBY3RpdmU/OiBib29sZWFuXG59XG5cbi8qKlxuICogQm9vdGFibGVcbiAqIEBtaXhpblxuICpcbiAqIFVzZWQgdG8gYWRkIGxhenkgY29udGVudCBmdW5jdGlvbmFsaXR5IHRvIGNvbXBvbmVudHNcbiAqIExvb2tzIGZvciBjaGFuZ2UgaW4gXCJpc0FjdGl2ZVwiIHRvIGF1dG9tYXRpY2FsbHkgYm9vdFxuICogT3RoZXJ3aXNlIGNhbiBiZSBzZXQgbWFudWFsbHlcbiAqL1xuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQ8VnVlICYgVG9nZ2xlYWJsZT4oKS5leHRlbmQoe1xuICBuYW1lOiAnYm9vdGFibGUnLFxuXG4gIHByb3BzOiB7XG4gICAgbGF6eTogQm9vbGVhblxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaXNCb290ZWQ6IGZhbHNlXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgaGFzQ29udGVudCAoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICByZXR1cm4gdGhpcy5pc0Jvb3RlZCB8fCAhdGhpcy5sYXp5IHx8IHRoaXMuaXNBY3RpdmVcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBpc0FjdGl2ZSAoKSB7XG4gICAgICB0aGlzLmlzQm9vdGVkID0gdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgc2hvd0xhenlDb250ZW50IChjb250ZW50OiBWTm9kZVtdKTogVk5vZGVbXSB8IHVuZGVmaW5lZCB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNDb250ZW50ID8gY29udGVudCA6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufSlcbiJdfQ==