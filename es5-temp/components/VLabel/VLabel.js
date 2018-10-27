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
        if (props.focused) {
            data.class = Colorable.options.methods.addTextColorClassChecks(data.class, props.color);
        }
        return h('label', data, children);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkxhYmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkxhYmVsL1ZMYWJlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxTQUFTLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBRTFFLFVBQVU7QUFDVixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFbEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsU0FBUztJQUVmLFVBQVUsRUFBRSxJQUFJO0lBRWhCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUVuQixLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsT0FBTztRQUNqQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsUUFBUSxFQUFFLE9BQU87UUFDakIsT0FBTyxFQUFFLE9BQU87UUFDaEIsR0FBRyxFQUFFLE1BQU07UUFDWCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsS0FBSyxFQUFFLE9BQU87S0FDZjtJQUVELE1BQU0sQ0FBRSxDQUFDLEVBQUUsR0FBRztRQUNaLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQTtRQUMxQyxNQUFNLElBQUksR0FBRztZQUNYLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE9BQU8sRUFBRTtnQkFDUCxpQkFBaUIsRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDOUIsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3RDLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxDQUFDO2FBQy9CO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDZCxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRzthQUMxQjtZQUNELEVBQUUsRUFBRSxTQUFTO1lBQ2IsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDL0IsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVO2FBQ25EO1NBQ0YsQ0FBQTtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3hGO1FBRUQsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fbGFiZWxzLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSwgeyBmdW5jdGlvbmFsVGhlbWVDbGFzc2VzIH0gZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcblxuLy8gSGVscGVyc1xuaW1wb3J0IHsgY29udmVydFRvVW5pdCB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtbGFiZWwnLFxuXG4gIGZ1bmN0aW9uYWw6IHRydWUsXG5cbiAgbWl4aW5zOiBbVGhlbWVhYmxlXSxcblxuICBwcm9wczoge1xuICAgIGFic29sdXRlOiBCb29sZWFuLFxuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgZm9jdXNlZDogQm9vbGVhbixcbiAgICBmb3I6IFN0cmluZyxcbiAgICBsZWZ0OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAnYXV0bydcbiAgICB9LFxuICAgIHZhbHVlOiBCb29sZWFuXG4gIH0sXG5cbiAgcmVuZGVyIChoLCBjdHgpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCBsaXN0ZW5lcnMsIHByb3BzIH0gPSBjdHhcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWxhYmVsJyxcbiAgICAgICdjbGFzcyc6IHtcbiAgICAgICAgJ3YtbGFiZWwtLWFjdGl2ZSc6IHByb3BzLnZhbHVlLFxuICAgICAgICAndi1sYWJlbC0taXMtZGlzYWJsZWQnOiBwcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgLi4uZnVuY3Rpb25hbFRoZW1lQ2xhc3NlcyhjdHgpXG4gICAgICB9LFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgZm9yOiBwcm9wcy5mb3IsXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICFwcm9wcy5mb3JcbiAgICAgIH0sXG4gICAgICBvbjogbGlzdGVuZXJzLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgbGVmdDogY29udmVydFRvVW5pdChwcm9wcy5sZWZ0KSxcbiAgICAgICAgcmlnaHQ6IGNvbnZlcnRUb1VuaXQocHJvcHMucmlnaHQpLFxuICAgICAgICBwb3NpdGlvbjogcHJvcHMuYWJzb2x1dGUgPyAnYWJzb2x1dGUnIDogJ3JlbGF0aXZlJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5mb2N1c2VkKSB7XG4gICAgICBkYXRhLmNsYXNzID0gQ29sb3JhYmxlLm9wdGlvbnMubWV0aG9kcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcyhkYXRhLmNsYXNzLCBwcm9wcy5jb2xvcilcbiAgICB9XG5cbiAgICByZXR1cm4gaCgnbGFiZWwnLCBkYXRhLCBjaGlsZHJlbilcbiAgfVxufVxuIl19