// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable';
// Utilities
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
export default mixins(GroupableFactory('itemGroup', 'v-item', 'v-item-group')
/* @vue/component */
).extend({
    name: 'v-item',
    props: {
        value: {
            required: false
        }
    },
    render() {
        if (!this.$scopedSlots.default) {
            consoleWarn('v-item is missing a default scopedSlot', this);
            return null;
        }
        let element;
        /* istanbul ignore else */
        if (this.$scopedSlots.default) {
            element = this.$scopedSlots.default({
                active: this.isActive,
                toggle: this.toggle
            });
        }
        if (!element || typeof element === 'string' || Array.isArray(element)) {
            consoleWarn('v-item should only contain a single element', this);
            return element;
        }
        element.data = element.data || {};
        element.data.class = [
            element.data.class,
            { [this.activeClass]: this.isActive }
        ];
        return element;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WSXRlbUdyb3VwL1ZJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFDVCxPQUFPLEVBQUUsT0FBTyxJQUFJLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFFcEUsWUFBWTtBQUNaLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUtoRCxlQUFlLE1BQU0sQ0FDbkIsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUM7QUFDdkQsb0JBQW9CO0NBQ3JCLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLFFBQVE7SUFFZCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsS0FBSztTQUNoQjtLQUNGO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUM5QixXQUFXLENBQUMsd0NBQXdDLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFM0QsT0FBTyxJQUFXLENBQUE7U0FDbkI7UUFFRCxJQUFJLE9BQWdFLENBQUE7UUFFcEUsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDN0IsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO2dCQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQixDQUFDLENBQUE7U0FDSDtRQUVELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckUsV0FBVyxDQUFDLDZDQUE2QyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRWhFLE9BQU8sT0FBYyxDQUFBO1NBQ3RCO1FBRUQsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUNqQyxPQUFPLENBQUMsSUFBSyxDQUFDLEtBQUssR0FBRztZQUNwQixPQUFPLENBQUMsSUFBSyxDQUFDLEtBQUs7WUFDbkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQ3RDLENBQUE7UUFFRCxPQUFPLE9BQU8sQ0FBQTtJQUNoQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTWl4aW5zXG5pbXBvcnQgeyBmYWN0b3J5IGFzIEdyb3VwYWJsZUZhY3RvcnkgfSBmcm9tICcuLi8uLi9taXhpbnMvZ3JvdXBhYmxlJ1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5pbXBvcnQgeyBjb25zb2xlV2FybiB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlLCBWTm9kZUNoaWxkcmVuQXJyYXlDb250ZW50cyB9IGZyb20gJ3Z1ZS90eXBlcy92bm9kZSdcblxuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKFxuICBHcm91cGFibGVGYWN0b3J5KCdpdGVtR3JvdXAnLCAndi1pdGVtJywgJ3YtaXRlbS1ncm91cCcpXG4gIC8qIEB2dWUvY29tcG9uZW50ICovXG4pLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWl0ZW0nLFxuXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKCk6IFZOb2RlIHtcbiAgICBpZiAoIXRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQpIHtcbiAgICAgIGNvbnNvbGVXYXJuKCd2LWl0ZW0gaXMgbWlzc2luZyBhIGRlZmF1bHQgc2NvcGVkU2xvdCcsIHRoaXMpXG5cbiAgICAgIHJldHVybiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBlbGVtZW50OiBWTm9kZSB8IFZOb2RlQ2hpbGRyZW5BcnJheUNvbnRlbnRzIHwgc3RyaW5nIHwgdW5kZWZpbmVkXG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICh0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KSB7XG4gICAgICBlbGVtZW50ID0gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCh7XG4gICAgICAgIGFjdGl2ZTogdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgdG9nZ2xlOiB0aGlzLnRvZ2dsZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgIGNvbnNvbGVXYXJuKCd2LWl0ZW0gc2hvdWxkIG9ubHkgY29udGFpbiBhIHNpbmdsZSBlbGVtZW50JywgdGhpcylcblxuICAgICAgcmV0dXJuIGVsZW1lbnQgYXMgYW55XG4gICAgfVxuXG4gICAgZWxlbWVudC5kYXRhID0gZWxlbWVudC5kYXRhIHx8IHt9XG4gICAgZWxlbWVudC5kYXRhIS5jbGFzcyA9IFtcbiAgICAgIGVsZW1lbnQuZGF0YSEuY2xhc3MsXG4gICAgICB7IFt0aGlzLmFjdGl2ZUNsYXNzXTogdGhpcy5pc0FjdGl2ZSB9XG4gICAgXVxuXG4gICAgcmV0dXJuIGVsZW1lbnRcbiAgfVxufSlcbiJdfQ==