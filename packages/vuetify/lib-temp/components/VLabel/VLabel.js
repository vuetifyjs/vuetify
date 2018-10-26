// Styles
import '../../stylus/components/_labels.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable, { functionalThemeClasses } from '../../mixins/themeable';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-label',
    functional: true,
    mixins: [Themeable],
    props: {
        absolute: Boolean,
        color: {
            type: [Boolean, String],
            default: 'primary'
        },
        disabled: Boolean,
        focused: Boolean,
        for: String,
        left: {
            type: [Number, String],
            default: 0
        },
        right: {
            type: [Number, String],
            default: 'auto'
        },
        value: Boolean
    },
    render(h, ctx) {
        const { children, listeners, props } = ctx;
        const data = {
            staticClass: 'v-label',
            'class': {
                'v-label--active': props.value,
                'v-label--is-disabled': props.disabled,
                ...functionalThemeClasses(ctx)
            },
            attrs: {
                for: props.for,
                'aria-hidden': !props.for
            },
            on: listeners,
            style: {
                left: convertToUnit(props.left),
                right: convertToUnit(props.right),
                position: props.absolute ? 'absolute' : 'relative'
            }
        };
        return h('label', Colorable.options.methods.setTextColor(props.focused && props.color, data), children);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkxhYmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkxhYmVsL1ZMYWJlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxTQUFTLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBRTFFLFVBQVU7QUFDVixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFbEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsU0FBUztJQUVmLFVBQVUsRUFBRSxJQUFJO0lBRWhCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUVuQixLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsT0FBTztRQUNqQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsUUFBUSxFQUFFLE9BQU87UUFDakIsT0FBTyxFQUFFLE9BQU87UUFDaEIsR0FBRyxFQUFFLE1BQU07UUFDWCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsS0FBSyxFQUFFLE9BQU87S0FDZjtJQUVELE1BQU0sQ0FBRSxDQUFDLEVBQUUsR0FBRztRQUNaLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQTtRQUMxQyxNQUFNLElBQUksR0FBRztZQUNYLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE9BQU8sRUFBRTtnQkFDUCxpQkFBaUIsRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDOUIsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3RDLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxDQUFDO2FBQy9CO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDZCxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRzthQUMxQjtZQUNELEVBQUUsRUFBRSxTQUFTO1lBQ2IsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDL0IsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVO2FBQ25EO1NBQ0YsQ0FBQTtRQUVELE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3pHLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19sYWJlbHMuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVGhlbWVhYmxlLCB7IGZ1bmN0aW9uYWxUaGVtZUNsYXNzZXMgfSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1sYWJlbCcsXG5cbiAgZnVuY3Rpb25hbDogdHJ1ZSxcblxuICBtaXhpbnM6IFtUaGVtZWFibGVdLFxuXG4gIHByb3BzOiB7XG4gICAgYWJzb2x1dGU6IEJvb2xlYW4sXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBmb2N1c2VkOiBCb29sZWFuLFxuICAgIGZvcjogU3RyaW5nLFxuICAgIGxlZnQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICdhdXRvJ1xuICAgIH0sXG4gICAgdmFsdWU6IEJvb2xlYW5cbiAgfSxcblxuICByZW5kZXIgKGgsIGN0eCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGxpc3RlbmVycywgcHJvcHMgfSA9IGN0eFxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtbGFiZWwnLFxuICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAndi1sYWJlbC0tYWN0aXZlJzogcHJvcHMudmFsdWUsXG4gICAgICAgICd2LWxhYmVsLS1pcy1kaXNhYmxlZCc6IHByb3BzLmRpc2FibGVkLFxuICAgICAgICAuLi5mdW5jdGlvbmFsVGhlbWVDbGFzc2VzKGN0eClcbiAgICAgIH0sXG4gICAgICBhdHRyczoge1xuICAgICAgICBmb3I6IHByb3BzLmZvcixcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogIXByb3BzLmZvclxuICAgICAgfSxcbiAgICAgIG9uOiBsaXN0ZW5lcnMsXG4gICAgICBzdHlsZToge1xuICAgICAgICBsZWZ0OiBjb252ZXJ0VG9Vbml0KHByb3BzLmxlZnQpLFxuICAgICAgICByaWdodDogY29udmVydFRvVW5pdChwcm9wcy5yaWdodCksXG4gICAgICAgIHBvc2l0aW9uOiBwcm9wcy5hYnNvbHV0ZSA/ICdhYnNvbHV0ZScgOiAncmVsYXRpdmUnXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGgoJ2xhYmVsJywgQ29sb3JhYmxlLm9wdGlvbnMubWV0aG9kcy5zZXRUZXh0Q29sb3IocHJvcHMuZm9jdXNlZCAmJiBwcm9wcy5jb2xvciwgZGF0YSksIGNoaWxkcmVuKVxuICB9XG59XG4iXX0=