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
    data: () => ({
        defaultColor: 'error'
    }),
    computed: {
        classes() {
            const color = (this.type && !this.color) ? this.type : this.computedColor;
            const classes = {
                'v-alert--outline': this.outline
            };
            return this.outline ? this.addTextColorClassChecks(classes, color)
                : this.addBackgroundColorClassChecks(classes, color);
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
    render(h) {
        const children = [h('div', this.$slots.default)];
        if (this.computedIcon) {
            children.unshift(h(VIcon, {
                'class': 'v-alert__icon'
            }, this.computedIcon));
        }
        if (this.dismissible) {
            const close = h('a', {
                'class': 'v-alert__dismissible',
                on: { click: () => { this.isActive = false; } }
            }, [
                h(VIcon, {
                    props: {
                        right: true
                    }
                }, '$vuetify.icons.cancel')
            ]);
            children.push(close);
        }
        const alert = h('div', {
            staticClass: 'v-alert',
            'class': this.classes,
            directives: [{
                    name: 'show',
                    value: this.isActive
                }],
            on: this.$listeners
        }, children);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkFsZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkFsZXJ0L1ZBbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBRTVCLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLGNBQWMsTUFBTSw2QkFBNkIsQ0FBQTtBQUl4RCxPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQTtBQUV0QyxvQkFBb0I7QUFDcEIsZUFBZSxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDbEUsSUFBSSxFQUFFLFNBQVM7SUFFZixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsT0FBTztRQUNwQixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNO1lBQ1osU0FBUyxDQUFFLEdBQVc7Z0JBQ3BCLE9BQU87b0JBQ0wsTUFBTTtvQkFDTixPQUFPO29CQUNQLFNBQVM7b0JBQ1QsU0FBUztpQkFDVixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNqQixDQUFDO1NBQ0Y7S0FDRjtJQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsWUFBWSxFQUFFLE9BQU87S0FDdEIsQ0FBQztJQUVGLFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUE7WUFDekUsTUFBTSxPQUFPLEdBQUc7Z0JBQ2Qsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDakMsQ0FBQTtZQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7Z0JBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFDRCxZQUFZO1lBQ1YsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBRTdDLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDakIsS0FBSyxNQUFNLENBQUMsQ0FBQyxPQUFPLHFCQUFxQixDQUFBO2dCQUN6QyxLQUFLLE9BQU8sQ0FBQyxDQUFDLE9BQU8sc0JBQXNCLENBQUE7Z0JBQzNDLEtBQUssU0FBUyxDQUFDLENBQUMsT0FBTyx3QkFBd0IsQ0FBQTtnQkFDL0MsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLHdCQUF3QixDQUFBO2FBQ2hEO1FBQ0gsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBRWhELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hCLE9BQU8sRUFBRSxlQUFlO2FBQ3pCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7U0FDdkI7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQkFDbkIsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBLENBQUMsQ0FBQyxFQUFFO2FBQy9DLEVBQUU7Z0JBQ0QsQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDUCxLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0YsRUFBRSx1QkFBdUIsQ0FBQzthQUM1QixDQUFDLENBQUE7WUFFRixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3JCO1FBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNyQixXQUFXLEVBQUUsU0FBUztZQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsVUFBVSxFQUFFLENBQUM7b0JBQ1gsSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO2lCQUNyQixDQUFRO1lBQ1QsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3BCLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFWixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUVsQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDckIsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDaEI7U0FDRixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNiLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2FsZXJ0cy5zdHlsJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vVkljb24nXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFRvZ2dsZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RvZ2dsZWFibGUnXG5pbXBvcnQgVHJhbnNpdGlvbmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RyYW5zaXRpb25hYmxlJ1xuXG4vLyBUeXBlc1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICd2dWUvdHlwZXMnXG5pbXBvcnQgbWl4aW5zIGZyb20gJy4uLy4uL3V0aWwvbWl4aW5zJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKENvbG9yYWJsZSwgVG9nZ2xlYWJsZSwgVHJhbnNpdGlvbmFibGUpLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWFsZXJ0JyxcblxuICBwcm9wczoge1xuICAgIGRpc21pc3NpYmxlOiBCb29sZWFuLFxuICAgIGljb246IFN0cmluZyxcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvciAodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAnaW5mbycsXG4gICAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgICAnc3VjY2VzcycsXG4gICAgICAgICAgJ3dhcm5pbmcnXG4gICAgICAgIF0uaW5jbHVkZXModmFsKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGRlZmF1bHRDb2xvcjogJ2Vycm9yJ1xuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICBjb25zdCBjb2xvciA9ICh0aGlzLnR5cGUgJiYgIXRoaXMuY29sb3IpID8gdGhpcy50eXBlIDogdGhpcy5jb21wdXRlZENvbG9yXG4gICAgICBjb25zdCBjbGFzc2VzID0ge1xuICAgICAgICAndi1hbGVydC0tb3V0bGluZSc6IHRoaXMub3V0bGluZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5vdXRsaW5lID8gdGhpcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcyhjbGFzc2VzLCBjb2xvcilcbiAgICAgICAgOiB0aGlzLmFkZEJhY2tncm91bmRDb2xvckNsYXNzQ2hlY2tzKGNsYXNzZXMsIGNvbG9yKVxuICAgIH0sXG4gICAgY29tcHV0ZWRJY29uICgpOiBzdHJpbmcgfCB2b2lkIHtcbiAgICAgIGlmICh0aGlzLmljb24gfHwgIXRoaXMudHlwZSkgcmV0dXJuIHRoaXMuaWNvblxuXG4gICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICBjYXNlICdpbmZvJzogcmV0dXJuICckdnVldGlmeS5pY29ucy5pbmZvJ1xuICAgICAgICBjYXNlICdlcnJvcic6IHJldHVybiAnJHZ1ZXRpZnkuaWNvbnMuZXJyb3InXG4gICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOiByZXR1cm4gJyR2dWV0aWZ5Lmljb25zLnN1Y2Nlc3MnXG4gICAgICAgIGNhc2UgJ3dhcm5pbmcnOiByZXR1cm4gJyR2dWV0aWZ5Lmljb25zLndhcm5pbmcnXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtoKCdkaXYnLCB0aGlzLiRzbG90cy5kZWZhdWx0KV1cblxuICAgIGlmICh0aGlzLmNvbXB1dGVkSWNvbikge1xuICAgICAgY2hpbGRyZW4udW5zaGlmdChoKFZJY29uLCB7XG4gICAgICAgICdjbGFzcyc6ICd2LWFsZXJ0X19pY29uJ1xuICAgICAgfSwgdGhpcy5jb21wdXRlZEljb24pKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmRpc21pc3NpYmxlKSB7XG4gICAgICBjb25zdCBjbG9zZSA9IGgoJ2EnLCB7XG4gICAgICAgICdjbGFzcyc6ICd2LWFsZXJ0X19kaXNtaXNzaWJsZScsXG4gICAgICAgIG9uOiB7IGNsaWNrOiAoKSA9PiB7IHRoaXMuaXNBY3RpdmUgPSBmYWxzZSB9IH1cbiAgICAgIH0sIFtcbiAgICAgICAgaChWSWNvbiwge1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICByaWdodDogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgJyR2dWV0aWZ5Lmljb25zLmNhbmNlbCcpXG4gICAgICBdKVxuXG4gICAgICBjaGlsZHJlbi5wdXNoKGNsb3NlKVxuICAgIH1cblxuICAgIGNvbnN0IGFsZXJ0ID0gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWFsZXJ0JyxcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3NlcyxcbiAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgIG5hbWU6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IHRoaXMuaXNBY3RpdmVcbiAgICAgIH1dIGFzIGFueSxcbiAgICAgIG9uOiB0aGlzLiRsaXN0ZW5lcnNcbiAgICB9LCBjaGlsZHJlbilcblxuICAgIGlmICghdGhpcy50cmFuc2l0aW9uKSByZXR1cm4gYWxlcnRcblxuICAgIHJldHVybiBoKCd0cmFuc2l0aW9uJywge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgbmFtZTogdGhpcy50cmFuc2l0aW9uLFxuICAgICAgICBvcmlnaW46IHRoaXMub3JpZ2luLFxuICAgICAgICBtb2RlOiB0aGlzLm1vZGVcbiAgICAgIH1cbiAgICB9LCBbYWxlcnRdKVxuICB9XG59KVxuIl19