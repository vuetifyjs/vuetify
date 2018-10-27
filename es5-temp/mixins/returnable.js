/* @vue/component */
export default {
    name: 'returnable',
    props: {
        returnValue: null
    },
    data: () => ({
        originalValue: null
    }),
    watch: {
        isActive(val) {
            if (val) {
                this.originalValue = this.returnValue;
            }
            else {
                this.$emit('update:returnValue', this.originalValue);
            }
        }
    },
    methods: {
        save(value) {
            this.originalValue = value;
            this.isActive = false;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvcmV0dXJuYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxZQUFZO0lBRWxCLEtBQUssRUFBRTtRQUNMLFdBQVcsRUFBRSxJQUFJO0tBQ2xCO0lBRUQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDWCxhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsS0FBSyxFQUFFO1FBQ0wsUUFBUSxDQUFFLEdBQUc7WUFDWCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7YUFDdEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7YUFDckQ7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxJQUFJLENBQUUsS0FBSztZQUNULElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncmV0dXJuYWJsZScsXG5cbiAgcHJvcHM6IHtcbiAgICByZXR1cm5WYWx1ZTogbnVsbFxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgb3JpZ2luYWxWYWx1ZTogbnVsbFxuICB9KSxcblxuICB3YXRjaDoge1xuICAgIGlzQWN0aXZlICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFZhbHVlID0gdGhpcy5yZXR1cm5WYWx1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOnJldHVyblZhbHVlJywgdGhpcy5vcmlnaW5hbFZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgc2F2ZSAodmFsdWUpIHtcbiAgICAgIHRoaXMub3JpZ2luYWxWYWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICB9XG4gIH1cbn1cbiJdfQ==