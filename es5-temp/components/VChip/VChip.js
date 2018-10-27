import '../../stylus/components/_chips.styl';
import mixins from '../../util/mixins';
// Components
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import Toggleable from '../../mixins/toggleable';
/* @vue/component */
export default mixins(Colorable, Themeable, Toggleable).extend({
    name: 'v-chip',
    props: {
        close: Boolean,
        disabled: Boolean,
        label: Boolean,
        outline: Boolean,
        // Used for selects/tagging
        selected: Boolean,
        small: Boolean,
        textColor: String,
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes() {
            const classes = this.addBackgroundColorClassChecks({
                'v-chip--disabled': this.disabled,
                'v-chip--selected': this.selected && !this.disabled,
                'v-chip--label': this.label,
                'v-chip--outline': this.outline,
                'v-chip--small': this.small,
                'v-chip--removable': this.close,
                ...this.themeClasses
            });
            return (this.textColor || this.outline)
                ? this.addTextColorClassChecks(classes, this.textColor || this.color)
                : classes;
        }
    },
    methods: {
        genClose(h) {
            const data = {
                staticClass: 'v-chip__close',
                on: {
                    click: (e) => {
                        e.stopPropagation();
                        this.$emit('input', false);
                    }
                }
            };
            return h('div', data, [
                h(VIcon, '$vuetify.icons.delete')
            ]);
        },
        genContent(h) {
            const children = [this.$slots.default];
            this.close && children.push(this.genClose(h));
            return h('span', {
                staticClass: 'v-chip__content'
            }, children);
        }
    },
    render(h) {
        const data = {
            staticClass: 'v-chip',
            'class': this.classes,
            attrs: { tabindex: this.disabled ? -1 : 0 },
            directives: [{
                    name: 'show',
                    value: this.isActive
                }],
            on: this.$listeners
        };
        return h('span', data, [this.genContent(h)]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNoaXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WQ2hpcC9WQ2hpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHFDQUFxQyxDQUFBO0FBSTVDLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBRXRDLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUE7QUFFNUIsU0FBUztBQUNULE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBRWhELG9CQUFvQjtBQUNwQixlQUFlLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3RCxJQUFJLEVBQUUsUUFBUTtJQUVkLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsUUFBUSxFQUFFLE9BQU87UUFDakIsS0FBSyxFQUFFLE9BQU87UUFDZCxPQUFPLEVBQUUsT0FBTztRQUNoQiwyQkFBMkI7UUFDM0IsUUFBUSxFQUFFLE9BQU87UUFDakIsS0FBSyxFQUFFLE9BQU87UUFDZCxTQUFTLEVBQUUsTUFBTTtRQUNqQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUM7Z0JBQ2pELGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUNqQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQ25ELGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDM0IsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQy9CLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDM0IsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQy9CLEdBQUcsSUFBSSxDQUFDLFlBQVk7YUFDckIsQ0FBQyxDQUFBO1lBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsT0FBTyxDQUFBO1FBQ2IsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsUUFBUSxDQUFFLENBQWdCO1lBQ3hCLE1BQU0sSUFBSSxHQUFHO2dCQUNYLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixFQUFFLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUU7d0JBQ2xCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTt3QkFFbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQzVCLENBQUM7aUJBQ0Y7YUFDRixDQUFBO1lBRUQsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDcEIsQ0FBQyxDQUFDLEtBQUssRUFBRSx1QkFBdUIsQ0FBQzthQUNsQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsVUFBVSxDQUFFLENBQWdCO1lBQzFCLE1BQU0sUUFBUSxHQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFckQsSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUU3QyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsV0FBVyxFQUFFLGlCQUFpQjthQUMvQixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2QsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLElBQUksR0FBRztZQUNYLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMzQyxVQUFVLEVBQUUsQ0FBQztvQkFDWCxJQUFJLEVBQUUsTUFBTTtvQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7aUJBQ3JCLENBQVE7WUFDVCxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDcEIsQ0FBQTtRQUVELE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fY2hpcHMuc3R5bCdcblxuLy8gVHlwZXNcbmltcG9ydCB7IENyZWF0ZUVsZW1lbnQsIFZOb2RlLCBWTm9kZUNoaWxkcmVuIH0gZnJvbSAndnVlJ1xuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZJY29uIGZyb20gJy4uL1ZJY29uJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcbmltcG9ydCBUaGVtZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcbmltcG9ydCBUb2dnbGVhYmxlIGZyb20gJy4uLy4uL21peGlucy90b2dnbGVhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKENvbG9yYWJsZSwgVGhlbWVhYmxlLCBUb2dnbGVhYmxlKS5leHRlbmQoe1xuICBuYW1lOiAndi1jaGlwJyxcblxuICBwcm9wczoge1xuICAgIGNsb3NlOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGxhYmVsOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgLy8gVXNlZCBmb3Igc2VsZWN0cy90YWdnaW5nXG4gICAgc2VsZWN0ZWQ6IEJvb2xlYW4sXG4gICAgc21hbGw6IEJvb2xlYW4sXG4gICAgdGV4dENvbG9yOiBTdHJpbmcsXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKTogb2JqZWN0IHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLmFkZEJhY2tncm91bmRDb2xvckNsYXNzQ2hlY2tzKHtcbiAgICAgICAgJ3YtY2hpcC0tZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAndi1jaGlwLS1zZWxlY3RlZCc6IHRoaXMuc2VsZWN0ZWQgJiYgIXRoaXMuZGlzYWJsZWQsXG4gICAgICAgICd2LWNoaXAtLWxhYmVsJzogdGhpcy5sYWJlbCxcbiAgICAgICAgJ3YtY2hpcC0tb3V0bGluZSc6IHRoaXMub3V0bGluZSxcbiAgICAgICAgJ3YtY2hpcC0tc21hbGwnOiB0aGlzLnNtYWxsLFxuICAgICAgICAndi1jaGlwLS1yZW1vdmFibGUnOiB0aGlzLmNsb3NlLFxuICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfSlcblxuICAgICAgcmV0dXJuICh0aGlzLnRleHRDb2xvciB8fCB0aGlzLm91dGxpbmUpXG4gICAgICAgID8gdGhpcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcyhjbGFzc2VzLCB0aGlzLnRleHRDb2xvciB8fCB0aGlzLmNvbG9yKVxuICAgICAgICA6IGNsYXNzZXNcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkNsb3NlIChoOiBDcmVhdGVFbGVtZW50KTogVk5vZGUge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWNoaXBfX2Nsb3NlJyxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjbGljazogKGU6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZmFsc2UpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCBbXG4gICAgICAgIGgoVkljb24sICckdnVldGlmeS5pY29ucy5kZWxldGUnKVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlbkNvbnRlbnQgKGg6IENyZWF0ZUVsZW1lbnQpOiBWTm9kZSB7XG4gICAgICBjb25zdCBjaGlsZHJlbjogVk5vZGVDaGlsZHJlbiA9IFt0aGlzLiRzbG90cy5kZWZhdWx0XVxuXG4gICAgICB0aGlzLmNsb3NlICYmIGNoaWxkcmVuLnB1c2godGhpcy5nZW5DbG9zZShoKSlcblxuICAgICAgcmV0dXJuIGgoJ3NwYW4nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1jaGlwX19jb250ZW50J1xuICAgICAgfSwgY2hpbGRyZW4pXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWNoaXAnLFxuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzLFxuICAgICAgYXR0cnM6IHsgdGFiaW5kZXg6IHRoaXMuZGlzYWJsZWQgPyAtMSA6IDAgfSxcbiAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgIG5hbWU6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IHRoaXMuaXNBY3RpdmVcbiAgICAgIH1dIGFzIGFueSxcbiAgICAgIG9uOiB0aGlzLiRsaXN0ZW5lcnNcbiAgICB9XG5cbiAgICByZXR1cm4gaCgnc3BhbicsIGRhdGEsIFt0aGlzLmdlbkNvbnRlbnQoaCldKVxuICB9XG59KVxuIl19