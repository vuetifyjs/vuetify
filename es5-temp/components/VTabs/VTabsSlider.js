import Colorable from '../../mixins/colorable';
/* @vue/component */
export default {
    name: 'v-tabs-slider',
    mixins: [Colorable],
    data: () => ({
        defaultColor: 'accent'
    }),
    render(h) {
        return h('div', {
            staticClass: 'v-tabs__slider',
            class: this.addBackgroundColorClassChecks()
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRhYnNTbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVGFicy9WVGFic1NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxlQUFlO0lBRXJCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUVuQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFlBQVksRUFBRSxRQUFRO0tBQ3ZCLENBQUM7SUFFRixNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxnQkFBZ0I7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtTQUM1QyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtdGFicy1zbGlkZXInLFxuXG4gIG1peGluczogW0NvbG9yYWJsZV0sXG5cbiAgZGF0YTogKCkgPT4gKHtcbiAgICBkZWZhdWx0Q29sb3I6ICdhY2NlbnQnXG4gIH0pLFxuXG4gIHJlbmRlciAoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtdGFic19fc2xpZGVyJyxcbiAgICAgIGNsYXNzOiB0aGlzLmFkZEJhY2tncm91bmRDb2xvckNsYXNzQ2hlY2tzKClcbiAgICB9KVxuICB9XG59XG4iXX0=