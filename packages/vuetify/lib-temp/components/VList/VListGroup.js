// Components
import VIcon from '../../components/VIcon';
// Mixins
import Bootable from '../../mixins/bootable';
import Toggleable from '../../mixins/toggleable';
import { inject as RegistrableInject } from '../../mixins/registrable';
// Transitions
import { VExpandTransition } from '../transitions';
/* @vue/component */
export default {
    name: 'v-list-group',
    mixins: [
        Bootable,
        RegistrableInject('list', 'v-list-group', 'v-list'),
        Toggleable
    ],
    inject: ['listClick'],
    props: {
        activeClass: {
            type: String,
            default: 'primary--text'
        },
        appendIcon: {
            type: String,
            default: '$vuetify.icons.expand'
        },
        disabled: Boolean,
        group: String,
        noAction: Boolean,
        prependIcon: String,
        subGroup: Boolean
    },
    data: () => ({
        groups: []
    }),
    computed: {
        groupClasses() {
            return {
                'v-list__group--active': this.isActive,
                'v-list__group--disabled': this.disabled
            };
        },
        headerClasses() {
            return {
                'v-list__group__header--active': this.isActive,
                'v-list__group__header--sub-group': this.subGroup
            };
        },
        itemsClasses() {
            return {
                'v-list__group__items--no-action': this.noAction
            };
        }
    },
    watch: {
        isActive(val) {
            if (!this.subGroup && val) {
                this.listClick(this._uid);
            }
        },
        $route(to) {
            const isActive = this.matchRoute(to.path);
            if (this.group) {
                if (isActive && this.isActive !== isActive) {
                    this.listClick(this._uid);
                }
                this.isActive = isActive;
            }
        }
    },
    mounted() {
        this.list.register(this._uid, this.toggle);
        if (this.group &&
            this.$route &&
            this.value == null) {
            this.isActive = this.matchRoute(this.$route.path);
        }
    },
    beforeDestroy() {
        this.list.unregister(this._uid);
    },
    methods: {
        click() {
            if (this.disabled)
                return;
            this.isActive = !this.isActive;
        },
        genIcon(icon) {
            return this.$createElement(VIcon, icon);
        },
        genAppendIcon() {
            const icon = !this.subGroup ? this.appendIcon : false;
            if (!icon && !this.$slots.appendIcon)
                return null;
            return this.$createElement('div', {
                staticClass: 'v-list__group__header__append-icon'
            }, [
                this.$slots.appendIcon || this.genIcon(icon)
            ]);
        },
        genGroup() {
            return this.$createElement('div', {
                staticClass: 'v-list__group__header',
                'class': this.headerClasses,
                on: Object.assign({}, {
                    click: this.click
                }, this.$listeners),
                ref: 'item'
            }, [
                this.genPrependIcon(),
                this.$slots.activator,
                this.genAppendIcon()
            ]);
        },
        genItems() {
            return this.$createElement('div', {
                staticClass: 'v-list__group__items',
                'class': this.itemsClasses,
                directives: [{
                        name: 'show',
                        value: this.isActive
                    }],
                ref: 'group'
            }, this.showLazyContent(this.$slots.default));
        },
        genPrependIcon() {
            const icon = this.prependIcon
                ? this.prependIcon
                : this.subGroup
                    ? '$vuetify.icons.subgroup'
                    : false;
            if (!icon && !this.$slots.prependIcon)
                return null;
            return this.$createElement('div', {
                staticClass: 'v-list__group__header__prepend-icon',
                'class': {
                    [this.activeClass]: this.isActive
                }
            }, [
                this.$slots.prependIcon || this.genIcon(icon)
            ]);
        },
        toggle(uid) {
            this.isActive = this._uid === uid;
        },
        matchRoute(to) {
            if (!this.group)
                return false;
            return to.match(this.group) !== null;
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-list__group',
            'class': this.groupClasses
        }, [
            this.genGroup(),
            h(VExpandTransition, [this.genItems()])
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkxpc3RHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZMaXN0L1ZMaXN0R3JvdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLHdCQUF3QixDQUFBO0FBRTFDLFNBQVM7QUFDVCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLEVBQ0wsTUFBTSxJQUFJLGlCQUFpQixFQUM1QixNQUFNLDBCQUEwQixDQUFBO0FBRWpDLGNBQWM7QUFDZCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUVsRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxjQUFjO0lBRXBCLE1BQU0sRUFBRTtRQUNOLFFBQVE7UUFDUixpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQztRQUNuRCxVQUFVO0tBQ1g7SUFFRCxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFFckIsS0FBSyxFQUFFO1FBQ0wsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsZUFBZTtTQUN6QjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLHVCQUF1QjtTQUNqQztRQUNELFFBQVEsRUFBRSxPQUFPO1FBQ2pCLEtBQUssRUFBRSxNQUFNO1FBQ2IsUUFBUSxFQUFFLE9BQU87UUFDakIsV0FBVyxFQUFFLE1BQU07UUFDbkIsUUFBUSxFQUFFLE9BQU87S0FDbEI7SUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQztJQUVGLFFBQVEsRUFBRTtRQUNSLFlBQVk7WUFDVixPQUFPO2dCQUNMLHVCQUF1QixFQUFFLElBQUksQ0FB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QUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsTUFBTSxDQUFFLEdBQUc7WUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFBO1FBQ25DLENBQUM7UUFDRCxVQUFVLENBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLEtBQUssQ0FBQTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQTtRQUN0QyxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxlQUFlO1lBQzVCLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTtTQUMzQixFQUFFO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvVkljb24nXG5cbi8vIE1peGluc1xuaW1wb3J0IEJvb3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9ib290YWJsZSdcbmltcG9ydCBUb2dnbGVhYmxlIGZyb20gJy4uLy4uL21peGlucy90b2dnbGVhYmxlJ1xuaW1wb3J0IHtcbiAgaW5qZWN0IGFzIFJlZ2lzdHJhYmxlSW5qZWN0XG59IGZyb20gJy4uLy4uL21peGlucy9yZWdpc3RyYWJsZSdcblxuLy8gVHJhbnNpdGlvbnNcbmltcG9ydCB7IFZFeHBhbmRUcmFuc2l0aW9uIH0gZnJvbSAnLi4vdHJhbnNpdGlvbnMnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWxpc3QtZ3JvdXAnLFxuXG4gIG1peGluczogW1xuICAgIEJvb3RhYmxlLFxuICAgIFJlZ2lzdHJhYmxlSW5qZWN0KCdsaXN0JywgJ3YtbGlzdC1ncm91cCcsICd2LWxpc3QnKSxcbiAgICBUb2dnbGVhYmxlXG4gIF0sXG5cbiAgaW5qZWN0OiBbJ2xpc3RDbGljayddLFxuXG4gIHByb3BzOiB7XG4gICAgYWN0aXZlQ2xhc3M6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5LS10ZXh0J1xuICAgIH0sXG4gICAgYXBwZW5kSWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLmV4cGFuZCdcbiAgICB9LFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGdyb3VwOiBTdHJpbmcsXG4gICAgbm9BY3Rpb246IEJvb2xlYW4sXG4gICAgcHJlcGVuZEljb246IFN0cmluZyxcbiAgICBzdWJHcm91cDogQm9vbGVhblxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgZ3JvdXBzOiBbXVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGdyb3VwQ2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1saXN0X19ncm91cC0tYWN0aXZlJzogdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgJ3YtbGlzdF9fZ3JvdXAtLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZFxuICAgICAgfVxuICAgIH0sXG4gICAgaGVhZGVyQ2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1saXN0X19ncm91cF9faGVhZGVyLS1hY3RpdmUnOiB0aGlzLmlzQWN0aXZlLFxuICAgICAgICAndi1saXN0X19ncm91cF9faGVhZGVyLS1zdWItZ3JvdXAnOiB0aGlzLnN1Ykdyb3VwXG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtc0NsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3YtbGlzdF9fZ3JvdXBfX2l0ZW1zLS1uby1hY3Rpb24nOiB0aGlzLm5vQWN0aW9uXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaXNBY3RpdmUgKHZhbCkge1xuICAgICAgaWYgKCF0aGlzLnN1Ykdyb3VwICYmIHZhbCkge1xuICAgICAgICB0aGlzLmxpc3RDbGljayh0aGlzLl91aWQpXG4gICAgICB9XG4gICAgfSxcbiAgICAkcm91dGUgKHRvKSB7XG4gICAgICBjb25zdCBpc0FjdGl2ZSA9IHRoaXMubWF0Y2hSb3V0ZSh0by5wYXRoKVxuXG4gICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICBpZiAoaXNBY3RpdmUgJiYgdGhpcy5pc0FjdGl2ZSAhPT0gaXNBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLmxpc3RDbGljayh0aGlzLl91aWQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gaXNBY3RpdmVcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy5saXN0LnJlZ2lzdGVyKHRoaXMuX3VpZCwgdGhpcy50b2dnbGUpXG5cbiAgICBpZiAodGhpcy5ncm91cCAmJlxuICAgICAgdGhpcy4kcm91dGUgJiZcbiAgICAgIHRoaXMudmFsdWUgPT0gbnVsbFxuICAgICkge1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRoaXMubWF0Y2hSb3V0ZSh0aGlzLiRyb3V0ZS5wYXRoKVxuICAgIH1cbiAgfSxcblxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLmxpc3QudW5yZWdpc3Rlcih0aGlzLl91aWQpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGNsaWNrICgpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm5cblxuICAgICAgdGhpcy5pc0FjdGl2ZSA9ICF0aGlzLmlzQWN0aXZlXG4gICAgfSxcbiAgICBnZW5JY29uIChpY29uKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwgaWNvbilcbiAgICB9LFxuICAgIGdlbkFwcGVuZEljb24gKCkge1xuICAgICAgY29uc3QgaWNvbiA9ICF0aGlzLnN1Ykdyb3VwID8gdGhpcy5hcHBlbmRJY29uIDogZmFsc2VcblxuICAgICAgaWYgKCFpY29uICYmICF0aGlzLiRzbG90cy5hcHBlbmRJY29uKSByZXR1cm4gbnVsbFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtbGlzdF9fZ3JvdXBfX2hlYWRlcl9fYXBwZW5kLWljb24nXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuJHNsb3RzLmFwcGVuZEljb24gfHwgdGhpcy5nZW5JY29uKGljb24pXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuR3JvdXAgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWxpc3RfX2dyb3VwX19oZWFkZXInLFxuICAgICAgICAnY2xhc3MnOiB0aGlzLmhlYWRlckNsYXNzZXMsXG4gICAgICAgIG9uOiBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgICAgY2xpY2s6IHRoaXMuY2xpY2tcbiAgICAgICAgfSwgdGhpcy4kbGlzdGVuZXJzKSxcbiAgICAgICAgcmVmOiAnaXRlbSdcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5QcmVwZW5kSWNvbigpLFxuICAgICAgICB0aGlzLiRzbG90cy5hY3RpdmF0b3IsXG4gICAgICAgIHRoaXMuZ2VuQXBwZW5kSWNvbigpXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuSXRlbXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWxpc3RfX2dyb3VwX19pdGVtcycsXG4gICAgICAgICdjbGFzcyc6IHRoaXMuaXRlbXNDbGFzc2VzLFxuICAgICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICAgIG5hbWU6ICdzaG93JyxcbiAgICAgICAgICB2YWx1ZTogdGhpcy5pc0FjdGl2ZVxuICAgICAgICB9XSxcbiAgICAgICAgcmVmOiAnZ3JvdXAnXG4gICAgICB9LCB0aGlzLnNob3dMYXp5Q29udGVudCh0aGlzLiRzbG90cy5kZWZhdWx0KSlcbiAgICB9LFxuICAgIGdlblByZXBlbmRJY29uICgpIHtcbiAgICAgIGNvbnN0IGljb24gPSB0aGlzLnByZXBlbmRJY29uXG4gICAgICAgID8gdGhpcy5wcmVwZW5kSWNvblxuICAgICAgICA6IHRoaXMuc3ViR3JvdXBcbiAgICAgICAgICA/ICckdnVldGlmeS5pY29ucy5zdWJncm91cCdcbiAgICAgICAgICA6IGZhbHNlXG5cbiAgICAgIGlmICghaWNvbiAmJiAhdGhpcy4kc2xvdHMucHJlcGVuZEljb24pIHJldHVybiBudWxsXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1saXN0X19ncm91cF9faGVhZGVyX19wcmVwZW5kLWljb24nLFxuICAgICAgICAnY2xhc3MnOiB7XG4gICAgICAgICAgW3RoaXMuYWN0aXZlQ2xhc3NdOiB0aGlzLmlzQWN0aXZlXG4gICAgICAgIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kc2xvdHMucHJlcGVuZEljb24gfHwgdGhpcy5nZW5JY29uKGljb24pXG4gICAgICBdKVxuICAgIH0sXG4gICAgdG9nZ2xlICh1aWQpIHtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSB0aGlzLl91aWQgPT09IHVpZFxuICAgIH0sXG4gICAgbWF0Y2hSb3V0ZSAodG8pIHtcbiAgICAgIGlmICghdGhpcy5ncm91cCkgcmV0dXJuIGZhbHNlXG4gICAgICByZXR1cm4gdG8ubWF0Y2godGhpcy5ncm91cCkgIT09IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1saXN0X19ncm91cCcsXG4gICAgICAnY2xhc3MnOiB0aGlzLmdyb3VwQ2xhc3Nlc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuZ2VuR3JvdXAoKSxcbiAgICAgIGgoVkV4cGFuZFRyYW5zaXRpb24sIFt0aGlzLmdlbkl0ZW1zKCldKVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==