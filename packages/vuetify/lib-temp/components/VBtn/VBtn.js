// Styles
import '../../stylus/components/_buttons.styl';
import mixins from '../../util/mixins';
// Components
import VProgressCircular from '../VProgressCircular';
// Mixins
import Colorable from '../../mixins/colorable';
import { factory as GroupableFactory } from '../../mixins/groupable';
import Positionable from '../../mixins/positionable';
import Routable from '../../mixins/routable';
import Themeable from '../../mixins/themeable';
import { factory as ToggleableFactory } from '../../mixins/toggleable';
export default mixins(Colorable, Routable, Positionable, Themeable, GroupableFactory('btnToggle'), ToggleableFactory('inputValue')
/* @vue/component */
).extend({
    name: 'v-btn',
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        },
        block: Boolean,
        depressed: Boolean,
        fab: Boolean,
        flat: Boolean,
        icon: Boolean,
        large: Boolean,
        loading: Boolean,
        outline: Boolean,
        ripple: {
            type: [Boolean, Object],
            default: null
        },
        round: Boolean,
        small: Boolean,
        tag: {
            type: String,
            default: 'button'
        },
        type: {
            type: String,
            default: 'button'
        },
        value: null
    },
    computed: {
        classes() {
            return {
                'v-btn': true,
                [this.activeClass]: this.isActive,
                'v-btn--absolute': this.absolute,
                'v-btn--block': this.block,
                'v-btn--bottom': this.bottom,
                'v-btn--disabled': this.disabled,
                'v-btn--flat': this.flat,
                'v-btn--floating': this.fab,
                'v-btn--fixed': this.fixed,
                'v-btn--icon': this.icon,
                'v-btn--large': this.large,
                'v-btn--left': this.left,
                'v-btn--loader': this.loading,
                'v-btn--outline': this.outline,
                'v-btn--depressed': (this.depressed && !this.flat) || this.outline,
                'v-btn--right': this.right,
                'v-btn--round': this.round,
                'v-btn--router': this.to,
                'v-btn--small': this.small,
                'v-btn--top': this.top,
                ...this.themeClasses
            };
        },
        computedRipple() {
            const defaultRipple = this.icon || this.fab ? { circle: true } : true;
            if (this.disabled)
                return false;
            else
                return this.ripple !== null ? this.ripple : defaultRipple;
        }
    },
    methods: {
        // Prevent focus to match md spec
        click(e) {
            !this.fab &&
                e.detail &&
                this.$el.blur();
            this.$emit('click', e);
            this.btnToggle && this.toggle();
        },
        genContent() {
            return this.$createElement('div', { 'class': 'v-btn__content' }, [this.$slots.default]);
        },
        genLoader() {
            const children = [];
            if (!this.$slots.loader) {
                children.push(this.$createElement(VProgressCircular, {
                    props: {
                        indeterminate: true,
                        size: 23,
                        width: 2
                    }
                }));
            }
            else {
                children.push(this.$slots.loader);
            }
            return this.$createElement('span', { 'class': 'v-btn__loading' }, children);
        }
    },
    render(h) {
        const setColor = (!this.outline && !this.flat) ? this.setBackgroundColor : this.setTextColor;
        const { tag, data } = this.generateRouteLink(this.classes);
        const children = [this.genContent()];
        tag === 'button' && (data.attrs.type = this.type);
        this.loading && children.push(this.genLoader());
        data.attrs.value = ['string', 'number'].includes(typeof this.value)
            ? this.value
            : JSON.stringify(this.value);
        return h(tag, setColor(this.color, data), children);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJ0bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZCdG4vVkJ0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx1Q0FBdUMsQ0FBQTtBQUs5QyxPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQTtBQUd0QyxhQUFhO0FBQ2IsT0FBTyxpQkFBaUIsTUFBTSxzQkFBc0IsQ0FBQTtBQUVwRCxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3BFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFBO0FBQ3BELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFBO0FBQzVDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sRUFBRSxPQUFPLElBQUksaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUV0RSxlQUFlLE1BQU0sQ0FDbkIsU0FBUyxFQUNULFFBQVEsRUFDUixZQUFZLEVBQ1osU0FBUyxFQUNULGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUM3QixpQkFBaUIsQ0FBQyxZQUFZLENBQUM7QUFDL0Isb0JBQW9CO0NBQ3JCLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLE9BQU87SUFFYixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxlQUFlO1NBQ3pCO1FBQ0QsS0FBSyxFQUFFLE9BQU87UUFDZCxTQUFTLEVBQUUsT0FBTztRQUNsQixHQUFHLEVBQUUsT0FBTztRQUNaLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsT0FBTztRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE1BQU0sRUFB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LENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUU5QixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDckQsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fYnV0dG9ucy5zdHlsJ1xuXG4vLyBUeXBlc1xuaW1wb3J0IHsgVk5vZGUsIFZOb2RlQ2hpbGRyZW4gfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBQcm9wVmFsaWRhdG9yIH0gZnJvbSAndnVlL3R5cGVzL29wdGlvbnMnXG5pbXBvcnQgbWl4aW5zIGZyb20gJy4uLy4uL3V0aWwvbWl4aW5zJ1xuaW1wb3J0IHsgUmlwcGxlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVlByb2dyZXNzQ2lyY3VsYXIgZnJvbSAnLi4vVlByb2dyZXNzQ2lyY3VsYXInXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IHsgZmFjdG9yeSBhcyBHcm91cGFibGVGYWN0b3J5IH0gZnJvbSAnLi4vLi4vbWl4aW5zL2dyb3VwYWJsZSdcbmltcG9ydCBQb3NpdGlvbmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3Bvc2l0aW9uYWJsZSdcbmltcG9ydCBSb3V0YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcm91dGFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5pbXBvcnQgeyBmYWN0b3J5IGFzIFRvZ2dsZWFibGVGYWN0b3J5IH0gZnJvbSAnLi4vLi4vbWl4aW5zL3RvZ2dsZWFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IG1peGlucyhcbiAgQ29sb3JhYmxlLFxuICBSb3V0YWJsZSxcbiAgUG9zaXRpb25hYmxlLFxuICBUaGVtZWFibGUsXG4gIEdyb3VwYWJsZUZhY3RvcnkoJ2J0blRvZ2dsZScpLFxuICBUb2dnbGVhYmxlRmFjdG9yeSgnaW5wdXRWYWx1ZScpXG4gIC8qIEB2dWUvY29tcG9uZW50ICovXG4pLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWJ0bicsXG5cbiAgcHJvcHM6IHtcbiAgICBhY3RpdmVDbGFzczoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3YtYnRuLS1hY3RpdmUnXG4gICAgfSxcbiAgICBibG9jazogQm9vbGVhbixcbiAgICBkZXByZXNzZWQ6IEJvb2xlYW4sXG4gICAgZmFiOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgaWNvbjogQm9vbGVhbixcbiAgICBsYXJnZTogQm9vbGVhbixcbiAgICBsb2FkaW5nOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgT2JqZWN0XSxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHJvdW5kOiBCb29sZWFuLFxuICAgIHNtYWxsOiBCb29sZWFuLFxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2J1dHRvbidcbiAgICB9LFxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdidXR0b24nXG4gICAgfSxcbiAgICB2YWx1ZTogbnVsbCBhcyBhbnkgYXMgUHJvcFZhbGlkYXRvcjxhbnk+XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpOiBhbnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3YtYnRuJzogdHJ1ZSxcbiAgICAgICAgW3RoaXMuYWN0aXZlQ2xhc3NdOiB0aGlzLmlzQWN0aXZlLFxuICAgICAgICAndi1idG4tLWFic29sdXRlJzogdGhpcy5hYnNvbHV0ZSxcbiAgICAgICAgJ3YtYnRuLS1ibG9jayc6IHRoaXMuYmxvY2ssXG4gICAgICAgICd2LWJ0bi0tYm90dG9tJzogdGhpcy5ib3R0b20sXG4gICAgICAgICd2LWJ0bi0tZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAndi1idG4tLWZsYXQnOiB0aGlzLmZsYXQsXG4gICAgICAgICd2LWJ0bi0tZmxvYXRpbmcnOiB0aGlzLmZhYixcbiAgICAgICAgJ3YtYnRuLS1maXhlZCc6IHRoaXMuZml4ZWQsXG4gICAgICAgICd2LWJ0bi0taWNvbic6IHRoaXMuaWNvbixcbiAgICAgICAgJ3YtYnRuLS1sYXJnZSc6IHRoaXMubGFyZ2UsXG4gICAgICAgICd2LWJ0bi0tbGVmdCc6IHRoaXMubGVmdCxcbiAgICAgICAgJ3YtYnRuLS1sb2FkZXInOiB0aGlzLmxvYWRpbmcsXG4gICAgICAgICd2LWJ0bi0tb3V0bGluZSc6IHRoaXMub3V0bGluZSxcbiAgICAgICAgJ3YtYnRuLS1kZXByZXNzZWQnOiAodGhpcy5kZXByZXNzZWQgJiYgIXRoaXMuZmxhdCkgfHwgdGhpcy5vdXRsaW5lLFxuICAgICAgICAndi1idG4tLXJpZ2h0JzogdGhpcy5yaWdodCxcbiAgICAgICAgJ3YtYnRuLS1yb3VuZCc6IHRoaXMucm91bmQsXG4gICAgICAgICd2LWJ0bi0tcm91dGVyJzogdGhpcy50byxcbiAgICAgICAgJ3YtYnRuLS1zbWFsbCc6IHRoaXMuc21hbGwsXG4gICAgICAgICd2LWJ0bi0tdG9wJzogdGhpcy50b3AsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wdXRlZFJpcHBsZSAoKTogUmlwcGxlT3B0aW9ucyB8IGJvb2xlYW4ge1xuICAgICAgY29uc3QgZGVmYXVsdFJpcHBsZSA9IHRoaXMuaWNvbiB8fCB0aGlzLmZhYiA/IHsgY2lyY2xlOiB0cnVlIH0gOiB0cnVlXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuIGZhbHNlXG4gICAgICBlbHNlIHJldHVybiB0aGlzLnJpcHBsZSAhPT0gbnVsbCA/IHRoaXMucmlwcGxlIDogZGVmYXVsdFJpcHBsZVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgLy8gUHJldmVudCBmb2N1cyB0byBtYXRjaCBtZCBzcGVjXG4gICAgY2xpY2sgKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICF0aGlzLmZhYiAmJlxuICAgICAgZS5kZXRhaWwgJiZcbiAgICAgIHRoaXMuJGVsLmJsdXIoKVxuXG4gICAgICB0aGlzLiRlbWl0KCdjbGljaycsIGUpXG5cbiAgICAgIHRoaXMuYnRuVG9nZ2xlICYmIHRoaXMudG9nZ2xlKClcbiAgICB9LFxuICAgIGdlbkNvbnRlbnQgKCk6IFZOb2RlIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyAnY2xhc3MnOiAndi1idG5fX2NvbnRlbnQnIH0sXG4gICAgICAgIFt0aGlzLiRzbG90cy5kZWZhdWx0XVxuICAgICAgKVxuICAgIH0sXG4gICAgZ2VuTG9hZGVyICgpOiBWTm9kZSB7XG4gICAgICBjb25zdCBjaGlsZHJlbjogVk5vZGVDaGlsZHJlbiA9IFtdXG5cbiAgICAgIGlmICghdGhpcy4kc2xvdHMubG9hZGVyKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2godGhpcy4kY3JlYXRlRWxlbWVudChWUHJvZ3Jlc3NDaXJjdWxhciwge1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxuICAgICAgICAgICAgc2l6ZTogMjMsXG4gICAgICAgICAgICB3aWR0aDogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKHRoaXMuJHNsb3RzLmxvYWRlcilcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7ICdjbGFzcyc6ICd2LWJ0bl9fbG9hZGluZycgfSwgY2hpbGRyZW4pXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBzZXRDb2xvciA9ICghdGhpcy5vdXRsaW5lICYmICF0aGlzLmZsYXQpID8gdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IgOiB0aGlzLnNldFRleHRDb2xvclxuICAgIGNvbnN0IHsgdGFnLCBkYXRhIH0gPSB0aGlzLmdlbmVyYXRlUm91dGVMaW5rKHRoaXMuY2xhc3NlcylcbiAgICBjb25zdCBjaGlsZHJlbiA9IFt0aGlzLmdlbkNvbnRlbnQoKV1cblxuICAgIHRhZyA9PT0gJ2J1dHRvbicgJiYgKGRhdGEuYXR0cnMhLnR5cGUgPSB0aGlzLnR5cGUpXG4gICAgdGhpcy5sb2FkaW5nICYmIGNoaWxkcmVuLnB1c2godGhpcy5nZW5Mb2FkZXIoKSlcblxuICAgIGRhdGEuYXR0cnMhLnZhbHVlID0gWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5jbHVkZXModHlwZW9mIHRoaXMudmFsdWUpXG4gICAgICA/IHRoaXMudmFsdWVcbiAgICAgIDogSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSlcblxuICAgIHJldHVybiBoKHRhZywgc2V0Q29sb3IodGhpcy5jb2xvciwgZGF0YSksIGNoaWxkcmVuKVxuICB9XG59KVxuIl19