import Vue from 'vue';
import Ripple from '../directives/ripple';
export default Vue.extend({
    name: 'routable',
    directives: {
        Ripple
    },
    props: {
        activeClass: String,
        append: Boolean,
        disabled: Boolean,
        exact: {
            type: Boolean,
            default: undefined
        },
        exactActiveClass: String,
        href: [String, Object],
        to: [String, Object],
        nuxt: Boolean,
        replace: Boolean,
        ripple: [Boolean, Object],
        tag: String,
        target: String
    },
    computed: {
        computedRipple() {
            return (this.ripple && !this.disabled) ? this.ripple : false;
        }
    },
    methods: {
        /* eslint-disable-next-line no-unused-vars */
        click(e) { },
        generateRouteLink(classes) {
            let exact = this.exact;
            let tag;
            const data = {
                attrs: { disabled: this.disabled },
                class: classes,
                props: {},
                directives: [{
                        name: 'ripple',
                        value: this.computedRipple
                    }],
                [this.to ? 'nativeOn' : 'on']: {
                    ...this.$listeners,
                    click: this.click
                }
            };
            if (typeof this.exact === 'undefined') {
                exact = this.to === '/' ||
                    (this.to === Object(this.to) && this.to.path === '/');
            }
            if (this.to) {
                // Add a special activeClass hook
                // for component level styles
                let activeClass = this.activeClass;
                let exactActiveClass = this.exactActiveClass || activeClass;
                // TODO: apply only in VListTile
                if (this.proxyClass) {
                    activeClass += ' ' + this.proxyClass;
                    exactActiveClass += ' ' + this.proxyClass;
                }
                tag = this.nuxt ? 'nuxt-link' : 'router-link';
                Object.assign(data.props, {
                    to: this.to,
                    exact,
                    activeClass,
                    exactActiveClass,
                    append: this.append,
                    replace: this.replace
                });
            }
            else {
                tag = (this.href && 'a') || this.tag || 'a';
                if (tag === 'a' && this.href)
                    data.attrs.href = this.href;
            }
            if (this.target)
                data.attrs.target = this.target;
            return { tag, data };
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW5zL3JvdXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBa0IsTUFBTSxLQUFLLENBQUE7QUFHcEMsT0FBTyxNQUF5QixNQUFNLHNCQUFzQixDQUFBO0FBRTVELGVBQWUsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN4QixJQUFJLEVBQUUsVUFBVTtJQUVoQixVQUFVLEVBQUU7UUFDVixNQUFNO0tBQ1A7SUFFRCxLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsTUFBTTtRQUNuQixNQUFNLEVBQUUsT0FBTztRQUNmLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLFNBQVM7U0FDbUI7UUFDdkMsZ0JBQWdCLEVBQUUsTUFBTTtRQUN4QixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3RCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDcEIsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsT0FBTztRQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBQ3pCLEdBQUcsRUFBRSxNQUFNO1FBQ1gsTUFBTSxFQUFFLE1BQU07S0FDZjtJQUVELFFBQVEsRUFBRTtRQUNSLGNBQWM7WUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQzlELENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLDZDQUE2QztRQUM3QyxLQUFLLENBQUUsQ0FBYSxJQUFlLENBQUM7UUFDcEMsaUJBQWlCLENBQUUsT0FBWTtZQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQ3RCLElBQUksR0FBRyxDQUFBO1lBRVAsTUFBTSxJQUFJLEdBQWM7Z0JBQ3RCLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQyxLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxVQUFVLEVBQUUsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWM7cUJBQzNCLENBQVE7Z0JBQ1QsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM3QixHQUFHLElBQUksQ0FBQyxVQUFVO29CQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ2xCO2FBQ0YsQ0FBQTtZQUVELElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFdBQVcsRUFBRTtnQkFDckMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRztvQkFDckIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7YUFDeEQ7WUFFRCxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ1gsaUNBQWlDO2dCQUNqQyw2QkFBNkI7Z0JBQzdCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7Z0JBQ2xDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLFdBQVcsQ0FBQTtnQkFFM0QsZ0NBQWdDO2dCQUNoQyxJQUFLLElBQVksQ0FBQyxVQUFVLEVBQUU7b0JBQzVCLFdBQVcsSUFBSSxHQUFHLEdBQUksSUFBWSxDQUFDLFVBQVUsQ0FBQTtvQkFDN0MsZ0JBQWdCLElBQUksR0FBRyxHQUFJLElBQVksQ0FBQyxVQUFVLENBQUE7aUJBQ25EO2dCQUVELEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtnQkFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUN4QixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ1gsS0FBSztvQkFDTCxXQUFXO29CQUNYLGdCQUFnQjtvQkFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87aUJBQ3RCLENBQUMsQ0FBQTthQUNIO2lCQUFNO2dCQUNMLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUE7Z0JBRTNDLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSTtvQkFBRSxJQUFJLENBQUMsS0FBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO2FBQzNEO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTTtnQkFBRSxJQUFJLENBQUMsS0FBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1lBRWpELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDdEIsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZ1ZSwgeyBWTm9kZURhdGEgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBQcm9wVmFsaWRhdG9yIH0gZnJvbSAndnVlL3R5cGVzL29wdGlvbnMnXG5cbmltcG9ydCBSaXBwbGUsIHsgUmlwcGxlT3B0aW9ucyB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvcmlwcGxlJ1xuXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcbiAgbmFtZTogJ3JvdXRhYmxlJyxcblxuICBkaXJlY3RpdmVzOiB7XG4gICAgUmlwcGxlXG4gIH0sXG5cbiAgcHJvcHM6IHtcbiAgICBhY3RpdmVDbGFzczogU3RyaW5nLFxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBleGFjdDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgIH0gYXMgUHJvcFZhbGlkYXRvcjxib29sZWFuIHwgdW5kZWZpbmVkPixcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgaHJlZjogW1N0cmluZywgT2JqZWN0XSxcbiAgICB0bzogW1N0cmluZywgT2JqZWN0XSxcbiAgICBudXh0OiBCb29sZWFuLFxuICAgIHJlcGxhY2U6IEJvb2xlYW4sXG4gICAgcmlwcGxlOiBbQm9vbGVhbiwgT2JqZWN0XSxcbiAgICB0YWc6IFN0cmluZyxcbiAgICB0YXJnZXQ6IFN0cmluZ1xuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29tcHV0ZWRSaXBwbGUgKCk6IFJpcHBsZU9wdGlvbnMgfCBib29sZWFuIHtcbiAgICAgIHJldHVybiAodGhpcy5yaXBwbGUgJiYgIXRoaXMuZGlzYWJsZWQpID8gdGhpcy5yaXBwbGUgOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzICovXG4gICAgY2xpY2sgKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHsgLyoqLyB9LFxuICAgIGdlbmVyYXRlUm91dGVMaW5rIChjbGFzc2VzOiBhbnkpIHtcbiAgICAgIGxldCBleGFjdCA9IHRoaXMuZXhhY3RcbiAgICAgIGxldCB0YWdcblxuICAgICAgY29uc3QgZGF0YTogVk5vZGVEYXRhID0ge1xuICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCB9LFxuICAgICAgICBjbGFzczogY2xhc3NlcyxcbiAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICAgIG5hbWU6ICdyaXBwbGUnLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLmNvbXB1dGVkUmlwcGxlXG4gICAgICAgIH1dIGFzIGFueSwgLy8gVE9ET1xuICAgICAgICBbdGhpcy50byA/ICduYXRpdmVPbicgOiAnb24nXToge1xuICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcbiAgICAgICAgICBjbGljazogdGhpcy5jbGlja1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5leGFjdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZXhhY3QgPSB0aGlzLnRvID09PSAnLycgfHxcbiAgICAgICAgICAodGhpcy50byA9PT0gT2JqZWN0KHRoaXMudG8pICYmIHRoaXMudG8ucGF0aCA9PT0gJy8nKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50bykge1xuICAgICAgICAvLyBBZGQgYSBzcGVjaWFsIGFjdGl2ZUNsYXNzIGhvb2tcbiAgICAgICAgLy8gZm9yIGNvbXBvbmVudCBsZXZlbCBzdHlsZXNcbiAgICAgICAgbGV0IGFjdGl2ZUNsYXNzID0gdGhpcy5hY3RpdmVDbGFzc1xuICAgICAgICBsZXQgZXhhY3RBY3RpdmVDbGFzcyA9IHRoaXMuZXhhY3RBY3RpdmVDbGFzcyB8fCBhY3RpdmVDbGFzc1xuXG4gICAgICAgIC8vIFRPRE86IGFwcGx5IG9ubHkgaW4gVkxpc3RUaWxlXG4gICAgICAgIGlmICgodGhpcyBhcyBhbnkpLnByb3h5Q2xhc3MpIHtcbiAgICAgICAgICBhY3RpdmVDbGFzcyArPSAnICcgKyAodGhpcyBhcyBhbnkpLnByb3h5Q2xhc3NcbiAgICAgICAgICBleGFjdEFjdGl2ZUNsYXNzICs9ICcgJyArICh0aGlzIGFzIGFueSkucHJveHlDbGFzc1xuICAgICAgICB9XG5cbiAgICAgICAgdGFnID0gdGhpcy5udXh0ID8gJ251eHQtbGluaycgOiAncm91dGVyLWxpbmsnXG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YS5wcm9wcywge1xuICAgICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICAgIGV4YWN0LFxuICAgICAgICAgIGFjdGl2ZUNsYXNzLFxuICAgICAgICAgIGV4YWN0QWN0aXZlQ2xhc3MsXG4gICAgICAgICAgYXBwZW5kOiB0aGlzLmFwcGVuZCxcbiAgICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2VcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhZyA9ICh0aGlzLmhyZWYgJiYgJ2EnKSB8fCB0aGlzLnRhZyB8fCAnYSdcblxuICAgICAgICBpZiAodGFnID09PSAnYScgJiYgdGhpcy5ocmVmKSBkYXRhLmF0dHJzIS5ocmVmID0gdGhpcy5ocmVmXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnRhcmdldCkgZGF0YS5hdHRycyEudGFyZ2V0ID0gdGhpcy50YXJnZXRcblxuICAgICAgcmV0dXJuIHsgdGFnLCBkYXRhIH1cbiAgICB9XG4gIH1cbn0pXG4iXX0=