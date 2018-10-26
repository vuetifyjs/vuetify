// Styles
import '../../stylus/components/_alerts.styl';
// Components
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import Toggleable from '../../mixins/toggleable';
import Transitionable from '../../mixins/transitionable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Toggleable, Transitionable).extend({
    name: 'v-alert',
    props: {
        dismissible: Boolean,
        icon: String,
        outline: Boolean,
        type: {
            type: String,
            validator(val) {
                return [
                    'info',
                    'error',
                    'success',
                    'warning'
                ].includes(val);
            }
        }
    },
    computed: {
        computedColor() {
            return (this.type && !this.color) ? this.type : (this.color || 'error');
        },
        computedIcon() {
            if (this.icon || !this.type)
                return this.icon;
            switch (this.type) {
                case 'info': return '$vuetify.icons.info';
                case 'error': return '$vuetify.icons.error';
                case 'success': return '$vuetify.icons.success';
                case 'warning': return '$vuetify.icons.warning';
            }
        }
    },
    methods: {
        genIcon() {
            if (!this.computedIcon)
                return null;
            return this.$createElement(VIcon, {
                'class': 'v-alert__icon'
            }, this.computedIcon);
        },
        genDismissible() {
            if (!this.dismissible)
                return null;
            return this.$createElement('a', {
                'class': 'v-alert__dismissible',
                on: { click: () => { this.isActive = false; } }
            }, [
                this.$createElement(VIcon, {
                    props: {
                        right: true
                    }
                }, '$vuetify.icons.cancel')
            ]);
        }
    },
    render(h) {
        const children = [
            this.genIcon(),
            h('div', this.$slots.default),
            this.genDismissible()
        ];
        const setColor = this.outline ? this.setTextColor : this.setBackgroundColor;
        const alert = h('div', setColor(this.computedColor, {
            staticClass: 'v-alert',
            'class': {
                'v-alert--outline': this.outline
            },
            directives: [{
                    name: 'show',
                    value: this.isActive
                }],
            on: this.$listeners
        }), children);
        if (!this.transition)
            return alert;
        return h('transition', {
            props: {
                name: this.transition,
                origin: this.origin,
                mode: this.mode
            }
        }, [alert]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkFsZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkFsZXJ0L1ZBbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBRTVCLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLGNBQWMsTUFBTSw2QkFBNkIsQ0FBQTtBQUl4RCxPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQTtBQUV0QyxvQkFBb0I7QUFDcEIsZUFBZSxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDbEUsSUFBSSxFQUFFLFNBQVM7SUFFZixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsT0FBTztRQUNwQixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNO1lBQ1osU0FBUyxDQUFFLEdBQVc7Z0JBQ3BCLE9BQU87b0JBQ0wsTUFBTTtvQkFDTixPQUFPO29CQUNQLFNBQVM7b0JBQ1QsU0FBUztpQkFDVixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNqQixDQUFDO1NBQ0Y7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLGFBQWE7WUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFBO1FBQ3pFLENBQUM7UUFDRCxZQUFZO1lBQ1YsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBRTdDLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDakIsS0FBSyxNQUFNLENBQUMsQ0FBQyxPQUFPLHFCQUFxQixDQUFBO2dCQUN6QyxLQUFLLE9BQU8sQ0FBQyxDQUFDLE9BQU8sc0JBQXNCLENBQUE7Z0JBQzNDLEtBQUssU0FBUyxDQUFDLENBQUMsT0FBTyx3QkFBd0IsQ0FBQTtnQkFDL0MsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLHdCQUF3QixDQUFBO2FBQ2hEO1FBQ0gsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsT0FBTztZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUVuQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxPQUFPLEVBQUUsZUFBZTthQUN6QixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUN2QixDQUFDO1FBRUQsY0FBYztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUVsQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFO2dCQUM5QixPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUEsQ0FBQyxDQUFDLEVBQUU7YUFDL0MsRUFBRTtnQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtvQkFDekIsS0FBSyxFQUFFO3dCQUNMLEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGLEVBQUUsdUJBQXVCLENBQUM7YUFDNUIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLFFBQVEsR0FBRztZQUNmLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLEVBQUU7U0FDZixDQUFBO1FBQ1IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFBO1FBQzNFLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEQsV0FBVyxFQUFFLFNBQVM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLGtCQUFrQixFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ2pDO1lBQ0QsVUFBVSxFQUFFLENBQUM7b0JBQ1gsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO2lCQUNyQixDQUFRO1lBQ1QsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3BCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUViLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sS0FBSyxDQUFBO1FBRWxDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUNyQixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNoQjtTQUNGLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ2IsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fYWxlcnRzLnN0eWwnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWSWNvbiBmcm9tICcuLi9WSWNvbidcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVG9nZ2xlYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdG9nZ2xlYWJsZSdcbmltcG9ydCBUcmFuc2l0aW9uYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdHJhbnNpdGlvbmFibGUnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBWTm9kZSB9IGZyb20gJ3Z1ZS90eXBlcydcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCBtaXhpbnMoQ29sb3JhYmxlLCBUb2dnbGVhYmxlLCBUcmFuc2l0aW9uYWJsZSkuZXh0ZW5kKHtcbiAgbmFtZTogJ3YtYWxlcnQnLFxuXG4gIHByb3BzOiB7XG4gICAgZGlzbWlzc2libGU6IEJvb2xlYW4sXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yICh2YWw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICdpbmZvJyxcbiAgICAgICAgICAnZXJyb3InLFxuICAgICAgICAgICdzdWNjZXNzJyxcbiAgICAgICAgICAnd2FybmluZydcbiAgICAgICAgXS5pbmNsdWRlcyh2YWwpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29tcHV0ZWRDb2xvciAoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiAodGhpcy50eXBlICYmICF0aGlzLmNvbG9yKSA/IHRoaXMudHlwZSA6ICh0aGlzLmNvbG9yIHx8ICdlcnJvcicpXG4gICAgfSxcbiAgICBjb21wdXRlZEljb24gKCk6IHN0cmluZyB8IHZvaWQge1xuICAgICAgaWYgKHRoaXMuaWNvbiB8fCAhdGhpcy50eXBlKSByZXR1cm4gdGhpcy5pY29uXG5cbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2luZm8nOiByZXR1cm4gJyR2dWV0aWZ5Lmljb25zLmluZm8nXG4gICAgICAgIGNhc2UgJ2Vycm9yJzogcmV0dXJuICckdnVldGlmeS5pY29ucy5lcnJvcidcbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6IHJldHVybiAnJHZ1ZXRpZnkuaWNvbnMuc3VjY2VzcydcbiAgICAgICAgY2FzZSAnd2FybmluZyc6IHJldHVybiAnJHZ1ZXRpZnkuaWNvbnMud2FybmluZydcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkljb24gKCk6IFZOb2RlIHwgbnVsbCB7XG4gICAgICBpZiAoIXRoaXMuY29tcHV0ZWRJY29uKSByZXR1cm4gbnVsbFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwge1xuICAgICAgICAnY2xhc3MnOiAndi1hbGVydF9faWNvbidcbiAgICAgIH0sIHRoaXMuY29tcHV0ZWRJY29uKVxuICAgIH0sXG5cbiAgICBnZW5EaXNtaXNzaWJsZSAoKTogVk5vZGUgfCBudWxsIHtcbiAgICAgIGlmICghdGhpcy5kaXNtaXNzaWJsZSkgcmV0dXJuIG51bGxcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2EnLCB7XG4gICAgICAgICdjbGFzcyc6ICd2LWFsZXJ0X19kaXNtaXNzaWJsZScsXG4gICAgICAgIG9uOiB7IGNsaWNrOiAoKSA9PiB7IHRoaXMuaXNBY3RpdmUgPSBmYWxzZSB9IH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwge1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICByaWdodDogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgJyR2dWV0aWZ5Lmljb25zLmNhbmNlbCcpXG4gICAgICBdKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpOiBWTm9kZSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICB0aGlzLmdlbkljb24oKSxcbiAgICAgIGgoJ2RpdicsIHRoaXMuJHNsb3RzLmRlZmF1bHQpLFxuICAgICAgdGhpcy5nZW5EaXNtaXNzaWJsZSgpXG4gICAgXSBhcyBhbnlcbiAgICBjb25zdCBzZXRDb2xvciA9IHRoaXMub3V0bGluZSA/IHRoaXMuc2V0VGV4dENvbG9yIDogdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3JcbiAgICBjb25zdCBhbGVydCA9IGgoJ2RpdicsIHNldENvbG9yKHRoaXMuY29tcHV0ZWRDb2xvciwge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWFsZXJ0JyxcbiAgICAgICdjbGFzcyc6IHtcbiAgICAgICAgJ3YtYWxlcnQtLW91dGxpbmUnOiB0aGlzLm91dGxpbmVcbiAgICAgIH0sXG4gICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICBuYW1lOiAnc2hvdycsXG4gICAgICAgIHZhbHVlOiB0aGlzLmlzQWN0aXZlXG4gICAgICB9XSBhcyBhbnksXG4gICAgICBvbjogdGhpcy4kbGlzdGVuZXJzXG4gICAgfSksIGNoaWxkcmVuKVxuXG4gICAgaWYgKCF0aGlzLnRyYW5zaXRpb24pIHJldHVybiBhbGVydFxuXG4gICAgcmV0dXJuIGgoJ3RyYW5zaXRpb24nLCB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBuYW1lOiB0aGlzLnRyYW5zaXRpb24sXG4gICAgICAgIG9yaWdpbjogdGhpcy5vcmlnaW4sXG4gICAgICAgIG1vZGU6IHRoaXMubW9kZVxuICAgICAgfVxuICAgIH0sIFthbGVydF0pXG4gIH1cbn0pXG4iXX0=