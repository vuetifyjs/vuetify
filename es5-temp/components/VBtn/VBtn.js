// Styles
import '../../stylus/components/_buttons.styl';
import mixins from '../../util/mixins';
// Components
import VProgressCircular from '../VProgressCircular';
// Mixins
import Colorable from '../../mixins/colorable';
import Positionable from '../../mixins/positionable';
import Routable from '../../mixins/routable';
import Themeable from '../../mixins/themeable';
import { factory as ToggleableFactory } from '../../mixins/toggleable';
import { inject as RegistrableInject } from '../../mixins/registrable';
export default mixins(Colorable, Routable, Positionable, Themeable, ToggleableFactory('inputValue'), RegistrableInject('buttonGroup')
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
            default: true
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
            const classes = {
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
            return (!this.outline && !this.flat)
                ? this.addBackgroundColorClassChecks(classes)
                : this.addTextColorClassChecks(classes);
        }
    },
    mounted() {
        if (this.buttonGroup) {
            this.buttonGroup.register(this);
        }
    },
    beforeDestroy() {
        if (this.buttonGroup) {
            this.buttonGroup.unregister(this);
        }
    },
    methods: {
        // Prevent focus to match md spec
        click(e) {
            !this.fab &&
                e.detail &&
                this.$el.blur();
            this.$emit('click', e);
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
                        size: 26,
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
        const { tag, data } = this.generateRouteLink();
        const children = [this.genContent()];
        tag === 'button' && (data.attrs.type = this.type);
        this.loading && children.push(this.genLoader());
        data.attrs.value = ['string', 'number'].includes(typeof this.value)
            ? this.value
            : JSON.stringify(this.value);
        return h(tag, data, children);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJ0bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZCdG4vVkJ0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx1Q0FBdUMsQ0FBQTtBQUs5QyxPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQTtBQUV0QyxhQUFhO0FBQ2IsT0FBTyxpQkFBaUIsTUFBTSxzQkFBc0IsQ0FBQTtBQUVwRCxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUE7QUFDcEQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUE7QUFDNUMsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFBO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUV0RSxlQUFlLE1BQU0sQ0FDbkIsU0FBUyxFQUNULFFBQVEsRUFDUixZQUFZLEVBQ1osU0FBUyxFQUNULGlCQUFpQixDQUFDLFlBQVksQ0FBQyxFQUMvQixpQkFBaUIsQ0FBQyxhQUFhLENBQUM7QUFDaEMsb0JBQW9CO0NBQ3JCLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLE9BQU87SUFFYixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxlQUFlO1NBQ3pCO1FBQ0QsS0FBSyxFQUFFLE9BQU87UUFDZCxTQUFTLEVBQUUsT0FBTztRQUNsQixHQUFHLEVBQUUsT0FBTztRQUNaLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsT0FBTztRQUNkLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE1BQU0sRUFB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Q0FBQyxLQUFLLENBQUMsQ0FBQTtRQUU5QixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQy9CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2J1dHRvbnMuc3R5bCdcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlLCBWTm9kZUNoaWxkcmVuIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgUHJvcFZhbGlkYXRvciB9IGZyb20gJ3Z1ZS90eXBlcy9vcHRpb25zJ1xuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZQcm9ncmVzc0NpcmN1bGFyIGZyb20gJy4uL1ZQcm9ncmVzc0NpcmN1bGFyJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcbmltcG9ydCBQb3NpdGlvbmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3Bvc2l0aW9uYWJsZSdcbmltcG9ydCBSb3V0YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcm91dGFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5pbXBvcnQgeyBmYWN0b3J5IGFzIFRvZ2dsZWFibGVGYWN0b3J5IH0gZnJvbSAnLi4vLi4vbWl4aW5zL3RvZ2dsZWFibGUnXG5pbXBvcnQgeyBpbmplY3QgYXMgUmVnaXN0cmFibGVJbmplY3QgfSBmcm9tICcuLi8uLi9taXhpbnMvcmVnaXN0cmFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IG1peGlucyhcbiAgQ29sb3JhYmxlLFxuICBSb3V0YWJsZSxcbiAgUG9zaXRpb25hYmxlLFxuICBUaGVtZWFibGUsXG4gIFRvZ2dsZWFibGVGYWN0b3J5KCdpbnB1dFZhbHVlJyksXG4gIFJlZ2lzdHJhYmxlSW5qZWN0KCdidXR0b25Hcm91cCcpXG4gIC8qIEB2dWUvY29tcG9uZW50ICovXG4pLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWJ0bicsXG5cbiAgcHJvcHM6IHtcbiAgICBhY3RpdmVDbGFzczoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3YtYnRuLS1hY3RpdmUnXG4gICAgfSxcbiAgICBibG9jazogQm9vbGVhbixcbiAgICBkZXByZXNzZWQ6IEJvb2xlYW4sXG4gICAgZmFiOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgaWNvbjogQm9vbGVhbixcbiAgICBsYXJnZTogQm9vbGVhbixcbiAgICBsb2FkaW5nOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgT2JqZWN0XSxcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIHJvdW5kOiBCb29sZWFuLFxuICAgIHNtYWxsOiBCb29sZWFuLFxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2J1dHRvbidcbiAgICB9LFxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdidXR0b24nXG4gICAgfSxcbiAgICB2YWx1ZTogbnVsbCBhcyBhbnkgYXMgUHJvcFZhbGlkYXRvcjxhbnk+XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpOiBhbnkge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHtcbiAgICAgICAgJ3YtYnRuJzogdHJ1ZSxcbiAgICAgICAgW3RoaXMuYWN0aXZlQ2xhc3NdOiB0aGlzLmlzQWN0aXZlLFxuICAgICAgICAndi1idG4tLWFic29sdXRlJzogdGhpcy5hYnNvbHV0ZSxcbiAgICAgICAgJ3YtYnRuLS1ibG9jayc6IHRoaXMuYmxvY2ssXG4gICAgICAgICd2LWJ0bi0tYm90dG9tJzogdGhpcy5ib3R0b20sXG4gICAgICAgICd2LWJ0bi0tZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAndi1idG4tLWZsYXQnOiB0aGlzLmZsYXQsXG4gICAgICAgICd2LWJ0bi0tZmxvYXRpbmcnOiB0aGlzLmZhYixcbiAgICAgICAgJ3YtYnRuLS1maXhlZCc6IHRoaXMuZml4ZWQsXG4gICAgICAgICd2LWJ0bi0taWNvbic6IHRoaXMuaWNvbixcbiAgICAgICAgJ3YtYnRuLS1sYXJnZSc6IHRoaXMubGFyZ2UsXG4gICAgICAgICd2LWJ0bi0tbGVmdCc6IHRoaXMubGVmdCxcbiAgICAgICAgJ3YtYnRuLS1sb2FkZXInOiB0aGlzLmxvYWRpbmcsXG4gICAgICAgICd2LWJ0bi0tb3V0bGluZSc6IHRoaXMub3V0bGluZSxcbiAgICAgICAgJ3YtYnRuLS1kZXByZXNzZWQnOiAodGhpcy5kZXByZXNzZWQgJiYgIXRoaXMuZmxhdCkgfHwgdGhpcy5vdXRsaW5lLFxuICAgICAgICAndi1idG4tLXJpZ2h0JzogdGhpcy5yaWdodCxcbiAgICAgICAgJ3YtYnRuLS1yb3VuZCc6IHRoaXMucm91bmQsXG4gICAgICAgICd2LWJ0bi0tcm91dGVyJzogdGhpcy50byxcbiAgICAgICAgJ3YtYnRuLS1zbWFsbCc6IHRoaXMuc21hbGwsXG4gICAgICAgICd2LWJ0bi0tdG9wJzogdGhpcy50b3AsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoIXRoaXMub3V0bGluZSAmJiAhdGhpcy5mbGF0KVxuICAgICAgICA/IHRoaXMuYWRkQmFja2dyb3VuZENvbG9yQ2xhc3NDaGVja3MoY2xhc3NlcylcbiAgICAgICAgOiB0aGlzLmFkZFRleHRDb2xvckNsYXNzQ2hlY2tzKGNsYXNzZXMpXG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIGlmICh0aGlzLmJ1dHRvbkdyb3VwKSB7XG4gICAgICB0aGlzLmJ1dHRvbkdyb3VwLnJlZ2lzdGVyKHRoaXMpXG4gICAgfVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLmJ1dHRvbkdyb3VwKSB7XG4gICAgICB0aGlzLmJ1dHRvbkdyb3VwLnVucmVnaXN0ZXIodGhpcylcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIC8vIFByZXZlbnQgZm9jdXMgdG8gbWF0Y2ggbWQgc3BlY1xuICAgIGNsaWNrIChlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAhdGhpcy5mYWIgJiZcbiAgICAgIGUuZGV0YWlsICYmXG4gICAgICB0aGlzLiRlbC5ibHVyKClcblxuICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBlKVxuICAgIH0sXG4gICAgZ2VuQ29udGVudCAoKTogVk5vZGUge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7ICdjbGFzcyc6ICd2LWJ0bl9fY29udGVudCcgfSxcbiAgICAgICAgW3RoaXMuJHNsb3RzLmRlZmF1bHRdXG4gICAgICApXG4gICAgfSxcbiAgICBnZW5Mb2FkZXIgKCk6IFZOb2RlIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuOiBWTm9kZUNoaWxkcmVuID0gW11cblxuICAgICAgaWYgKCF0aGlzLiRzbG90cy5sb2FkZXIpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLiRjcmVhdGVFbGVtZW50KFZQcm9ncmVzc0NpcmN1bGFyLCB7XG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXG4gICAgICAgICAgICBzaXplOiAyNixcbiAgICAgICAgICAgIHdpZHRoOiAyXG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2godGhpcy4kc2xvdHMubG9hZGVyKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgJ2NsYXNzJzogJ3YtYnRuX19sb2FkaW5nJyB9LCBjaGlsZHJlbilcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKTogVk5vZGUge1xuICAgIGNvbnN0IHsgdGFnLCBkYXRhIH0gPSB0aGlzLmdlbmVyYXRlUm91dGVMaW5rKClcbiAgICBjb25zdCBjaGlsZHJlbiA9IFt0aGlzLmdlbkNvbnRlbnQoKV1cblxuICAgIHRhZyA9PT0gJ2J1dHRvbicgJiYgKGRhdGEuYXR0cnMhLnR5cGUgPSB0aGlzLnR5cGUpXG4gICAgdGhpcy5sb2FkaW5nICYmIGNoaWxkcmVuLnB1c2godGhpcy5nZW5Mb2FkZXIoKSlcblxuICAgIGRhdGEuYXR0cnMhLnZhbHVlID0gWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5jbHVkZXModHlwZW9mIHRoaXMudmFsdWUpXG4gICAgICA/IHRoaXMudmFsdWVcbiAgICAgIDogSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSlcblxuICAgIHJldHVybiBoKHRhZywgZGF0YSwgY2hpbGRyZW4pXG4gIH1cbn0pXG4iXX0=