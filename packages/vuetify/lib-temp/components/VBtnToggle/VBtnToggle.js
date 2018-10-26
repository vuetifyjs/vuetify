// Styles
import '../../stylus/components/_button-toggle.styl';
// Mixins
import ButtonGroup from '../../mixins/button-group';
/* @vue/component */
export default ButtonGroup.extend({
    name: 'v-btn-toggle',
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        }
    },
    computed: {
        classes() {
            return {
                ...ButtonGroup.options.computed.classes.call(this),
                'v-btn-toggle': true,
                'v-btn-toggle--only-child': this.selectedItems.length === 1,
                'v-btn-toggle--selected': this.selectedItems.length > 0
            };
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJ0blRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZCdG5Ub2dnbGUvVkJ0blRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyw2Q0FBNkMsQ0FBQTtBQUVwRCxTQUFTO0FBQ1QsT0FBTyxXQUFXLE1BQU0sMkJBQTJCLENBQUE7QUFFbkQsb0JBQW9CO0FBQ3BCLGVBQWUsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNoQyxJQUFJLEVBQUUsY0FBYztJQUVwQixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxlQUFlO1NBQ3pCO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNsRCxjQUFjLEVBQUUsSUFBSTtnQkFDcEIsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDM0Qsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQzthQUN4RCxDQUFBO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19idXR0b24tdG9nZ2xlLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IEJ1dHRvbkdyb3VwIGZyb20gJy4uLy4uL21peGlucy9idXR0b24tZ3JvdXAnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Hcm91cC5leHRlbmQoe1xuICBuYW1lOiAndi1idG4tdG9nZ2xlJyxcblxuICBwcm9wczoge1xuICAgIGFjdGl2ZUNsYXNzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndi1idG4tLWFjdGl2ZSdcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpOiBvYmplY3Qge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uQnV0dG9uR3JvdXAub3B0aW9ucy5jb21wdXRlZC5jbGFzc2VzLmNhbGwodGhpcyksXG4gICAgICAgICd2LWJ0bi10b2dnbGUnOiB0cnVlLFxuICAgICAgICAndi1idG4tdG9nZ2xlLS1vbmx5LWNoaWxkJzogdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PT0gMSxcbiAgICAgICAgJ3YtYnRuLXRvZ2dsZS0tc2VsZWN0ZWQnOiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMFxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdfQ==