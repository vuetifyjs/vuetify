// Mixins
import Colorable from '../../mixins/colorable';
import Routable from '../../mixins/routable';
import Toggleable from '../../mixins/toggleable';
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
        Toggleable
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
                ? 'v-list--disabled'
                : this.color
                    ? this.addTextColorClassChecks()
                    : this.defaultColor;
        },
        classes() {
            return {
                'v-list__tile': true,
                'v-list__tile--link': this.isLink && !this.inactive,
                'v-list__tile--avatar': this.avatar,
                'v-list__tile--disabled': this.disabled,
                'v-list__tile--active': !this.to && this.isActive,
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
        const { tag, data } = isRouteLink ? this.generateRouteLink() : {
            tag: this.tag || 'div',
            data: {
                class: this.classes
            }
        };
        data.attrs = Object.assign({}, data.attrs, this.$attrs);
        return h('div', {
            'class': this.listClasses,
            attrs: {
                disabled: this.disabled
            },
            on: {
                ...this.$listeners
            }
        }, [h(tag, data, this.$slots.default)]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkxpc3RUaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkxpc3QvVkxpc3RUaWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVoRCxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0seUJBQXlCLENBQUE7QUFFNUMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsYUFBYTtJQUVuQixVQUFVLEVBQUU7UUFDVixNQUFNO0tBQ1A7SUFFRCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsUUFBUTtRQUNSLFVBQVU7S0FDWDtJQUVELFlBQVksRUFBRSxLQUFLO0lBRW5CLEtBQUssRUFBRTtRQUNMLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGVBQWU7U0FDekI7UUFDRCxNQUFNLEVBQUUsT0FBTztRQUNmLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLEdBQUcsRUFBRSxNQUFNO0tBQ1o7SUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLFVBQVUsRUFBRSxzQkFBc0I7S0FDbkMsQ0FBQztJQUVGLFFBQVEsRUFBRTtRQUNSLFdBQVc7WUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRO2dCQUNsQixDQUFDLENBQUMsa0JBQWtCO2dCQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUs7b0JBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtvQkFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUE7UUFDekIsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPO2dCQUNMLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixvQkFBb0IsRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQ25ELHNCQUFzQixFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkMsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUNqRCxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUTthQUNsQyxDQUFBO1FBQ0gsQ0FBQztRQUNELE1BQU07WUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdFLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDakQsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3RCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLO1lBQ3RCLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDcEI7U0FDRixDQUFBO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV2RCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDekIsS0FBSyxFQUFFO2dCQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QjtZQUNELEVBQUUsRUFBRTtnQkFDRixHQUFHLElBQUksQ0FBQyxVQUFVO2FBQ25CO1NBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgUm91dGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3JvdXRhYmxlJ1xuaW1wb3J0IFRvZ2dsZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RvZ2dsZWFibGUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yaXBwbGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWxpc3QtdGlsZScsXG5cbiAgZGlyZWN0aXZlczoge1xuICAgIFJpcHBsZVxuICB9LFxuXG4gIG1peGluczogW1xuICAgIENvbG9yYWJsZSxcbiAgICBSb3V0YWJsZSxcbiAgICBUb2dnbGVhYmxlXG4gIF0sXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIGFjdGl2ZUNsYXNzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeS0tdGV4dCdcbiAgICB9LFxuICAgIGF2YXRhcjogQm9vbGVhbixcbiAgICBpbmFjdGl2ZTogQm9vbGVhbixcbiAgICB0YWc6IFN0cmluZ1xuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgcHJveHlDbGFzczogJ3YtbGlzdF9fdGlsZS0tYWN0aXZlJ1xuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGxpc3RDbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkXG4gICAgICAgID8gJ3YtbGlzdC0tZGlzYWJsZWQnXG4gICAgICAgIDogdGhpcy5jb2xvclxuICAgICAgICAgID8gdGhpcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcygpXG4gICAgICAgICAgOiB0aGlzLmRlZmF1bHRDb2xvclxuICAgIH0sXG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1saXN0X190aWxlJzogdHJ1ZSxcbiAgICAgICAgJ3YtbGlzdF9fdGlsZS0tbGluayc6IHRoaXMuaXNMaW5rICYmICF0aGlzLmluYWN0aXZlLFxuICAgICAgICAndi1saXN0X190aWxlLS1hdmF0YXInOiB0aGlzLmF2YXRhcixcbiAgICAgICAgJ3YtbGlzdF9fdGlsZS0tZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAndi1saXN0X190aWxlLS1hY3RpdmUnOiAhdGhpcy50byAmJiB0aGlzLmlzQWN0aXZlLFxuICAgICAgICBbdGhpcy5hY3RpdmVDbGFzc106IHRoaXMuaXNBY3RpdmVcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzTGluayAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ocmVmIHx8IHRoaXMudG8gfHxcbiAgICAgICAgKHRoaXMuJGxpc3RlbmVycyAmJiAodGhpcy4kbGlzdGVuZXJzLmNsaWNrIHx8IHRoaXMuJGxpc3RlbmVyc1snIWNsaWNrJ10pKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBpc1JvdXRlTGluayA9ICF0aGlzLmluYWN0aXZlICYmIHRoaXMuaXNMaW5rXG4gICAgY29uc3QgeyB0YWcsIGRhdGEgfSA9IGlzUm91dGVMaW5rID8gdGhpcy5nZW5lcmF0ZVJvdXRlTGluaygpIDoge1xuICAgICAgdGFnOiB0aGlzLnRhZyB8fCAnZGl2JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY2xhc3M6IHRoaXMuY2xhc3Nlc1xuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEuYXR0cnMgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLmF0dHJzLCB0aGlzLiRhdHRycylcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAnY2xhc3MnOiB0aGlzLmxpc3RDbGFzc2VzLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgIH1cbiAgICB9LCBbaCh0YWcsIGRhdGEsIHRoaXMuJHNsb3RzLmRlZmF1bHQpXSlcbiAgfVxufVxuIl19