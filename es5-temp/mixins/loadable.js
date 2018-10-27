import Vue from 'vue';
import VProgressLinear from '../components/VProgressLinear';
/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */
/* @vue/component */
export default Vue.extend().extend({
    name: 'loadable',
    props: {
        loading: {
            type: [Boolean, String],
            default: false
        }
    },
    methods: {
        genProgress() {
            if (this.loading === false)
                return null;
            return this.$slots.progress || this.$createElement(VProgressLinear, {
                props: {
                    color: (this.loading === true || this.loading === '')
                        ? (this.color || 'primary')
                        : this.loading,
                    height: 2,
                    indeterminate: true
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW5zL2xvYWRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBYyxNQUFNLEtBQUssQ0FBQTtBQUNoQyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQTtBQU0zRDs7Ozs7Ozs7R0FRRztBQUNILG9CQUFvQjtBQUNwQixlQUFlLEdBQUcsQ0FBQyxNQUFNLEVBQWEsQ0FBQyxNQUFNLENBQUM7SUFDNUMsSUFBSSxFQUFFLFVBQVU7SUFFaEIsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN2QixPQUFPLEVBQUUsS0FBSztTQUNmO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxXQUFXO1lBQ1QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUs7Z0JBQUUsT0FBTyxJQUFJLENBQUE7WUFFdkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRTtnQkFDbEUsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDO3dCQUNuRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPO29CQUNoQixNQUFNLEVBQUUsQ0FBQztvQkFDVCxhQUFhLEVBQUUsSUFBSTtpQkFDcEI7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVnVlLCB7IFZOb2RlIH0gZnJvbSAndnVlJ1xuaW1wb3J0IFZQcm9ncmVzc0xpbmVhciBmcm9tICcuLi9jb21wb25lbnRzL1ZQcm9ncmVzc0xpbmVhcidcblxuaW50ZXJmYWNlIGNvbG9yYWJsZSBleHRlbmRzIFZ1ZSB7XG4gIGNvbG9yPzogc3RyaW5nXG59XG5cbi8qKlxuICogTG9hZGFibGVcbiAqXG4gKiBAbWl4aW5cbiAqXG4gKiBVc2VkIHRvIGFkZCBsaW5lYXIgcHJvZ3Jlc3MgYmFyIHRvIGNvbXBvbmVudHNcbiAqIENhbiB1c2UgYSBkZWZhdWx0IGJhciB3aXRoIGEgc3BlY2lmaWMgY29sb3JcbiAqIG9yIGRlc2lnbmF0ZSBhIGN1c3RvbSBwcm9ncmVzcyBsaW5lYXIgYmFyXG4gKi9cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kPGNvbG9yYWJsZT4oKS5leHRlbmQoe1xuICBuYW1lOiAnbG9hZGFibGUnLFxuXG4gIHByb3BzOiB7XG4gICAgbG9hZGluZzoge1xuICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuUHJvZ3Jlc3MgKCk6IFZOb2RlIHwgVk5vZGVbXSB8IG51bGwge1xuICAgICAgaWYgKHRoaXMubG9hZGluZyA9PT0gZmFsc2UpIHJldHVybiBudWxsXG5cbiAgICAgIHJldHVybiB0aGlzLiRzbG90cy5wcm9ncmVzcyB8fCB0aGlzLiRjcmVhdGVFbGVtZW50KFZQcm9ncmVzc0xpbmVhciwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbG9yOiAodGhpcy5sb2FkaW5nID09PSB0cnVlIHx8IHRoaXMubG9hZGluZyA9PT0gJycpXG4gICAgICAgICAgICA/ICh0aGlzLmNvbG9yIHx8ICdwcmltYXJ5JylcbiAgICAgICAgICAgIDogdGhpcy5sb2FkaW5nLFxuICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuIl19