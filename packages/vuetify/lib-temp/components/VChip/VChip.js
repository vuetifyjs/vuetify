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
            return {
                'v-chip--disabled': this.disabled,
                'v-chip--selected': this.selected && !this.disabled,
                'v-chip--label': this.label,
                'v-chip--outline': this.outline,
                'v-chip--small': this.small,
                'v-chip--removable': this.close,
                ...this.themeClasses
            };
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
        const data = this.setBackgroundColor(this.color, {
            staticClass: 'v-chip',
            'class': this.classes,
            attrs: { tabindex: this.disabled ? -1 : 0 },
            directives: [{
                    name: 'show',
                    value: this.isActive
                }],
            on: this.$listeners
        });
        const color = this.textColor || (this.outline && this.color);
        return h('span', this.setTextColor(color, data), [this.genContent(h)]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNoaXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WQ2hpcC9WQ2hpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHFDQUFxQyxDQUFBO0FBSTVDLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBRXRDLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUE7QUFFNUIsU0FBUztBQUNULE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBRWhELG9CQUFvQjtBQUNwQixlQUFlLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3RCxJQUFJLEVBQUUsUUFBUTtJQUVkLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsUUFBUSxFQUFFLE9BQU87UUFDakIsS0FBSyxFQUFFLE9BQU87UUFDZCxPQUFPLEVBQUUsT0FBTztRQUNoQiwyQkFBMkI7UUFDM0IsUUFBUSxFQUFFLE9BQU87UUFDakIsS0FBSyxFQUFFLE9BQU87UUFDZCxTQUFTLEVBQUUsTUFBTTtRQUNqQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxPQUFPO2dCQUNMLGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUNqQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQ25ELGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDM0IsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQy9CLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDM0IsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQy9CLEdBQUcsSUFBSSxDQUFDLFlBQVk7YUFDckIsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLFFBQVEsQ0FBRSxDQUFnQjtZQUN4QixNQUFNLElBQUksR0FBRztnQkFDWCxXQUFXLEVBQUUsZUFBZTtnQkFDNUIsRUFBRSxFQUFFO29CQUNGLEtBQUssRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFO3dCQUNsQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7d0JBRW5CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUM1QixDQUFDO2lCQUNGO2FBQ0YsQ0FBQTtZQUVELE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7Z0JBQ3BCLENBQUMsQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLENBQUM7YUFDbEMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFVBQVUsQ0FBRSxDQUFnQjtZQUMxQixNQUFNLFFBQVEsR0FBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXJELElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFN0MsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNmLFdBQVcsRUFBRSxpQkFBaUI7YUFDL0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNkLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0MsV0FBVyxFQUFFLFFBQVE7WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNDLFVBQVUsRUFBRSxDQUFDO29CQUNYLElBQUksRUFBRSxNQUFNO29CQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDckIsQ0FBUTtZQUNULEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUNwQixDQUFDLENBQUE7UUFFRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUQsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEUsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2NoaXBzLnN0eWwnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBDcmVhdGVFbGVtZW50LCBWTm9kZSwgVk5vZGVDaGlsZHJlbiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWSWNvbiBmcm9tICcuLi9WSWNvbidcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5pbXBvcnQgVG9nZ2xlYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdG9nZ2xlYWJsZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IG1peGlucyhDb2xvcmFibGUsIFRoZW1lYWJsZSwgVG9nZ2xlYWJsZSkuZXh0ZW5kKHtcbiAgbmFtZTogJ3YtY2hpcCcsXG5cbiAgcHJvcHM6IHtcbiAgICBjbG9zZTogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBsYWJlbDogQm9vbGVhbixcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxuICAgIC8vIFVzZWQgZm9yIHNlbGVjdHMvdGFnZ2luZ1xuICAgIHNlbGVjdGVkOiBCb29sZWFuLFxuICAgIHNtYWxsOiBCb29sZWFuLFxuICAgIHRleHRDb2xvcjogU3RyaW5nLFxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1jaGlwLS1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICd2LWNoaXAtLXNlbGVjdGVkJzogdGhpcy5zZWxlY3RlZCAmJiAhdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgJ3YtY2hpcC0tbGFiZWwnOiB0aGlzLmxhYmVsLFxuICAgICAgICAndi1jaGlwLS1vdXRsaW5lJzogdGhpcy5vdXRsaW5lLFxuICAgICAgICAndi1jaGlwLS1zbWFsbCc6IHRoaXMuc21hbGwsXG4gICAgICAgICd2LWNoaXAtLXJlbW92YWJsZSc6IHRoaXMuY2xvc2UsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5DbG9zZSAoaDogQ3JlYXRlRWxlbWVudCk6IFZOb2RlIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1jaGlwX19jbG9zZScsXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6IChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIGZhbHNlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2JywgZGF0YSwgW1xuICAgICAgICBoKFZJY29uLCAnJHZ1ZXRpZnkuaWNvbnMuZGVsZXRlJylcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5Db250ZW50IChoOiBDcmVhdGVFbGVtZW50KTogVk5vZGUge1xuICAgICAgY29uc3QgY2hpbGRyZW46IFZOb2RlQ2hpbGRyZW4gPSBbdGhpcy4kc2xvdHMuZGVmYXVsdF1cblxuICAgICAgdGhpcy5jbG9zZSAmJiBjaGlsZHJlbi5wdXNoKHRoaXMuZ2VuQ2xvc2UoaCkpXG5cbiAgICAgIHJldHVybiBoKCdzcGFuJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtY2hpcF9fY29udGVudCdcbiAgICAgIH0sIGNoaWxkcmVuKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpOiBWTm9kZSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKHRoaXMuY29sb3IsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1jaGlwJyxcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3NlcyxcbiAgICAgIGF0dHJzOiB7IHRhYmluZGV4OiB0aGlzLmRpc2FibGVkID8gLTEgOiAwIH0sXG4gICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICBuYW1lOiAnc2hvdycsXG4gICAgICAgIHZhbHVlOiB0aGlzLmlzQWN0aXZlXG4gICAgICB9XSBhcyBhbnksXG4gICAgICBvbjogdGhpcy4kbGlzdGVuZXJzXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy50ZXh0Q29sb3IgfHwgKHRoaXMub3V0bGluZSAmJiB0aGlzLmNvbG9yKVxuICAgIHJldHVybiBoKCdzcGFuJywgdGhpcy5zZXRUZXh0Q29sb3IoY29sb3IsIGRhdGEpLCBbdGhpcy5nZW5Db250ZW50KGgpXSlcbiAgfVxufSlcbiJdfQ==