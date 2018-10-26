// Mixins
import Colorable from '../../mixins/colorable';
import Routable from '../../mixins/routable';
import Toggleable from '../../mixins/toggleable';
import Themeable from '../../mixins/themeable';
// Directives
import Ripple from '../../directives/ripple';
/* @vue/component */
export default {
    name: 'v-list-tile',
    directives: {
        Ripple
    },
    mixins: [
        Colorable,
        Routable,
        Toggleable,
        Themeable
    ],
    inheritAttrs: false,
    props: {
        activeClass: {
            type: String,
            default: 'primary--text'
        },
        avatar: Boolean,
        inactive: Boolean,
        tag: String
    },
    data: () => ({
        proxyClass: 'v-list__tile--active'
    }),
    computed: {
        listClasses() {
            return this.disabled
                ? { 'v-list--disabled': true }
                : undefined;
        },
        classes() {
            return {
                'v-list__tile': true,
                'v-list__tile--link': this.isLink && !this.inactive,
                'v-list__tile--avatar': this.avatar,
                'v-list__tile--disabled': this.disabled,
                'v-list__tile--active': !this.to && this.isActive,
                ...this.themeClasses,
                [this.activeClass]: this.isActive
            };
        },
        isLink() {
            return this.href || this.to ||
                (this.$listeners && (this.$listeners.click || this.$listeners['!click']));
        }
    },
    render(h) {
        const isRouteLink = !this.inactive && this.isLink;
        const { tag, data } = isRouteLink ? this.generateRouteLink(this.classes) : {
            tag: this.tag || 'div',
            data: {
                class: this.classes
            }
        };
        data.attrs = Object.assign({}, data.attrs, this.$attrs);
        return h('div', this.setTextColor(!this.disabled && this.color, {
            class: this.listClasses,
            attrs: {
                disabled: this.disabled
            },
            on: {
                ...this.$listeners
            }
        }), [h(tag, data, this.$slots.default)]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkxpc3RUaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkxpc3QvVkxpc3RUaWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0seUJBQXlCLENBQUE7QUFFNUMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsYUFBYTtJQUVuQixVQUFVLEVBQUU7UUFDVixNQUFNO0tBQ1A7SUFFRCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsUUFBUTtRQUNSLFVBQVU7UUFDVixTQUFTO0tBQ1Y7SUFFRCxZQUFZLEVBQUUsS0FBSztJQUVuQixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxlQUFlO1NBQ3pCO1FBQ0QsTUFBTSxFQUFFLE9BQU87UUFDZixRQUFRLEVBQUUsT0FBTztRQUNqQixHQUFHLEVBQUUsTUFBTTtLQUNaO0lBRUQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDWCxVQUFVLEVBQUUsc0JBQXNCO0tBQ25DLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixXQUFXO1lBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUTtnQkFDbEIsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFO2dCQUM5QixDQUFDLENBQUMsU0FBUyxDQUFBO1FBQ2YsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPO2dCQUNMLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixvQkFBb0IsRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQ25ELHNCQUFzQixFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkMsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUNqRCxHQUFHLElBQUksQ0FBQyxZQUFZO2dCQUNwQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUTthQUNsQyxDQUFBO1FBQ0gsQ0FBQztRQUNELE1BQU07WUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdFLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDakQsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUs7WUFDdEIsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTzthQUNwQjtTQUNGLENBQUE7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRXZELE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzlELEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVztZQUN2QixLQUFLLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3hCO1lBQ0QsRUFBRSxFQUFFO2dCQUNGLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDbkI7U0FDRixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFJvdXRhYmxlIGZyb20gJy4uLy4uL21peGlucy9yb3V0YWJsZSdcbmltcG9ydCBUb2dnbGVhYmxlIGZyb20gJy4uLy4uL21peGlucy90b2dnbGVhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vLyBEaXJlY3RpdmVzXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1saXN0LXRpbGUnLFxuXG4gIGRpcmVjdGl2ZXM6IHtcbiAgICBSaXBwbGVcbiAgfSxcblxuICBtaXhpbnM6IFtcbiAgICBDb2xvcmFibGUsXG4gICAgUm91dGFibGUsXG4gICAgVG9nZ2xlYWJsZSxcbiAgICBUaGVtZWFibGVcbiAgXSxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgYWN0aXZlQ2xhc3M6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5LS10ZXh0J1xuICAgIH0sXG4gICAgYXZhdGFyOiBCb29sZWFuLFxuICAgIGluYWN0aXZlOiBCb29sZWFuLFxuICAgIHRhZzogU3RyaW5nXG4gIH0sXG5cbiAgZGF0YTogKCkgPT4gKHtcbiAgICBwcm94eUNsYXNzOiAndi1saXN0X190aWxlLS1hY3RpdmUnXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgbGlzdENsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRcbiAgICAgICAgPyB7ICd2LWxpc3QtLWRpc2FibGVkJzogdHJ1ZSB9XG4gICAgICAgIDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWxpc3RfX3RpbGUnOiB0cnVlLFxuICAgICAgICAndi1saXN0X190aWxlLS1saW5rJzogdGhpcy5pc0xpbmsgJiYgIXRoaXMuaW5hY3RpdmUsXG4gICAgICAgICd2LWxpc3RfX3RpbGUtLWF2YXRhcic6IHRoaXMuYXZhdGFyLFxuICAgICAgICAndi1saXN0X190aWxlLS1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICd2LWxpc3RfX3RpbGUtLWFjdGl2ZSc6ICF0aGlzLnRvICYmIHRoaXMuaXNBY3RpdmUsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzLFxuICAgICAgICBbdGhpcy5hY3RpdmVDbGFzc106IHRoaXMuaXNBY3RpdmVcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzTGluayAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ocmVmIHx8IHRoaXMudG8gfHxcbiAgICAgICAgKHRoaXMuJGxpc3RlbmVycyAmJiAodGhpcy4kbGlzdGVuZXJzLmNsaWNrIHx8IHRoaXMuJGxpc3RlbmVyc1snIWNsaWNrJ10pKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBpc1JvdXRlTGluayA9ICF0aGlzLmluYWN0aXZlICYmIHRoaXMuaXNMaW5rXG4gICAgY29uc3QgeyB0YWcsIGRhdGEgfSA9IGlzUm91dGVMaW5rID8gdGhpcy5nZW5lcmF0ZVJvdXRlTGluayh0aGlzLmNsYXNzZXMpIDoge1xuICAgICAgdGFnOiB0aGlzLnRhZyB8fCAnZGl2JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY2xhc3M6IHRoaXMuY2xhc3Nlc1xuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEuYXR0cnMgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLmF0dHJzLCB0aGlzLiRhdHRycylcblxuICAgIHJldHVybiBoKCdkaXYnLCB0aGlzLnNldFRleHRDb2xvcighdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmNvbG9yLCB7XG4gICAgICBjbGFzczogdGhpcy5saXN0Q2xhc3NlcyxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzXG4gICAgICB9XG4gICAgfSksIFtoKHRhZywgZGF0YSwgdGhpcy4kc2xvdHMuZGVmYXVsdCldKVxuICB9XG59XG4iXX0=