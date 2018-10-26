// Styles
import '../../stylus/components/_bottom-navs.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import ButtonGroup from '../../mixins/button-group';
import Colorable from '../../mixins/colorable';
// Util
import mixins from '../../util/mixins';
export default mixins(Applicationable('bottom', [
    'height',
    'value'
]), Colorable
/* @vue/component */
).extend({
    name: 'v-bottom-nav',
    props: {
        active: [Number, String],
        mandatory: Boolean,
        height: {
            default: 56,
            type: [Number, String],
            validator: (v) => !isNaN(parseInt(v))
        },
        shift: Boolean,
        value: null
    },
    computed: {
        classes() {
            return {
                'v-bottom-nav--absolute': this.absolute,
                'v-bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
                'v-bottom-nav--shift': this.shift,
                'v-bottom-nav--active': this.value
            };
        },
        computedHeight() {
            return parseInt(this.height);
        }
    },
    methods: {
        updateApplication() {
            return !this.value
                ? 0
                : this.computedHeight;
        },
        updateValue(val) {
            this.$emit('update:active', val);
        }
    },
    render(h) {
        return h(ButtonGroup, this.setBackgroundColor(this.color, {
            staticClass: 'v-bottom-nav',
            class: this.classes,
            style: {
                height: `${parseInt(this.computedHeight)}px`
            },
            props: {
                mandatory: Boolean(this.mandatory || this.active !== undefined),
                value: this.active
            },
            on: { change: this.updateValue }
        }), this.$slots.default);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJvdHRvbU5hdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZCb3R0b21OYXYvVkJvdHRvbU5hdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTywyQ0FBMkMsQ0FBQTtBQUVsRCxTQUFTO0FBQ1QsT0FBTyxlQUFlLE1BQU0sOEJBQThCLENBQUE7QUFDMUQsT0FBTyxXQUFXLE1BQU0sMkJBQTJCLENBQUE7QUFDbkQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFFOUMsT0FBTztBQUNQLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBTXRDLGVBQWUsTUFBTSxDQUNuQixlQUFlLENBQUMsUUFBUSxFQUFFO0lBQ3hCLFFBQVE7SUFDUixPQUFPO0NBQ1IsQ0FBQyxFQUNGLFNBQVM7QUFDVCxvQkFBb0I7Q0FDckIsQ0FBQyxNQUFNLENBQUM7SUFDUCxJQUFJLEVBQUUsY0FBYztJQUVwQixLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hCLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixTQUFTLEVBQUUsQ0FBQyxDQUFrQixFQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEU7UUFDRCxLQUFLLEVBQUUsT0FBTztRQUNkLEtBQUssRUFBRSxJQUFpQztLQUN6QztJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxPQUFPO2dCQUNMLHdCQUF3QixFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2pFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsS0FBSzthQUNuQyxDQUFBO1FBQ0gsQ0FBQztRQUNELGNBQWM7WUFDWixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUIsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsaUJBQWlCO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNoQixDQUFDLENBQUMsQ0FBQztnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQTtRQUN6QixDQUFDO1FBQ0QsV0FBVyxDQUFFLEdBQVE7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDbEMsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDeEQsV0FBVyxFQUFFLGNBQWM7WUFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ25CLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJO2FBQzdDO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLFNBQVMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQztnQkFDL0QsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ25CO1lBQ0QsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUU7U0FDakMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDMUIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fYm90dG9tLW5hdnMuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQXBwbGljYXRpb25hYmxlIGZyb20gJy4uLy4uL21peGlucy9hcHBsaWNhdGlvbmFibGUnXG5pbXBvcnQgQnV0dG9uR3JvdXAgZnJvbSAnLi4vLi4vbWl4aW5zL2J1dHRvbi1ncm91cCdcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcblxuLy8gVXRpbFxuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgUHJvcFZhbGlkYXRvciB9IGZyb20gJ3Z1ZS90eXBlcy9vcHRpb25zJ1xuXG5leHBvcnQgZGVmYXVsdCBtaXhpbnMoXG4gIEFwcGxpY2F0aW9uYWJsZSgnYm90dG9tJywgW1xuICAgICdoZWlnaHQnLFxuICAgICd2YWx1ZSdcbiAgXSksXG4gIENvbG9yYWJsZVxuICAvKiBAdnVlL2NvbXBvbmVudCAqL1xuKS5leHRlbmQoe1xuICBuYW1lOiAndi1ib3R0b20tbmF2JyxcblxuICBwcm9wczoge1xuICAgIGFjdGl2ZTogW051bWJlciwgU3RyaW5nXSxcbiAgICBtYW5kYXRvcnk6IEJvb2xlYW4sXG4gICAgaGVpZ2h0OiB7XG4gICAgICBkZWZhdWx0OiA1NixcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICB2YWxpZGF0b3I6ICh2OiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuID0+ICFpc05hTihwYXJzZUludCh2KSlcbiAgICB9LFxuICAgIHNoaWZ0OiBCb29sZWFuLFxuICAgIHZhbHVlOiBudWxsIGFzIGFueSBhcyBQcm9wVmFsaWRhdG9yPGFueT5cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1ib3R0b20tbmF2LS1hYnNvbHV0ZSc6IHRoaXMuYWJzb2x1dGUsXG4gICAgICAgICd2LWJvdHRvbS1uYXYtLWZpeGVkJzogIXRoaXMuYWJzb2x1dGUgJiYgKHRoaXMuYXBwIHx8IHRoaXMuZml4ZWQpLFxuICAgICAgICAndi1ib3R0b20tbmF2LS1zaGlmdCc6IHRoaXMuc2hpZnQsXG4gICAgICAgICd2LWJvdHRvbS1uYXYtLWFjdGl2ZSc6IHRoaXMudmFsdWVcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkSGVpZ2h0ICgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuaGVpZ2h0KVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgdXBkYXRlQXBwbGljYXRpb24gKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gIXRoaXMudmFsdWVcbiAgICAgICAgPyAwXG4gICAgICAgIDogdGhpcy5jb21wdXRlZEhlaWdodFxuICAgIH0sXG4gICAgdXBkYXRlVmFsdWUgKHZhbDogYW55KSB7XG4gICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6YWN0aXZlJywgdmFsKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpOiBWTm9kZSB7XG4gICAgcmV0dXJuIGgoQnV0dG9uR3JvdXAsIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKHRoaXMuY29sb3IsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1ib3R0b20tbmF2JyxcbiAgICAgIGNsYXNzOiB0aGlzLmNsYXNzZXMsXG4gICAgICBzdHlsZToge1xuICAgICAgICBoZWlnaHQ6IGAke3BhcnNlSW50KHRoaXMuY29tcHV0ZWRIZWlnaHQpfXB4YFxuICAgICAgfSxcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIG1hbmRhdG9yeTogQm9vbGVhbih0aGlzLm1hbmRhdG9yeSB8fCB0aGlzLmFjdGl2ZSAhPT0gdW5kZWZpbmVkKSxcbiAgICAgICAgdmFsdWU6IHRoaXMuYWN0aXZlXG4gICAgICB9LFxuICAgICAgb246IHsgY2hhbmdlOiB0aGlzLnVwZGF0ZVZhbHVlIH1cbiAgICB9KSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgfVxufSlcbiJdfQ==