// Styles
import '../../stylus/components/_timeline.styl';
import mixins from '../../util/mixins';
// Mixins
import Themeable from '../../mixins/themeable';
export default mixins(Themeable
/* @vue/component */
).extend({
    name: 'v-timeline',
    props: {
        alignTop: Boolean,
        dense: Boolean
    },
    computed: {
        classes() {
            return {
                'v-timeline--align-top': this.alignTop,
                'v-timeline--dense': this.dense,
                ...this.themeClasses
            };
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-timeline',
            'class': this.classes
        }, this.$slots.default);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRpbWVsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlRpbWVsaW5lL1ZUaW1lbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx3Q0FBd0MsQ0FBQTtBQUkvQyxPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQTtBQUV0QyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFFOUMsZUFBZSxNQUFNLENBQ25CLFNBQVM7QUFDWCxvQkFBb0I7Q0FDbkIsQ0FBQyxNQUFNLENBQUM7SUFDUCxJQUFJLEVBQUUsWUFBWTtJQUVsQixLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsT0FBTztRQUNqQixLQUFLLEVBQUUsT0FBTztLQUNmO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU87Z0JBQ0wsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3RDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUMvQixHQUFHLElBQUksQ0FBQyxZQUFZO2FBQ3JCLENBQUE7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fdGltZWxpbmUuc3R5bCdcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlIH0gZnJvbSAndnVlJ1xuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuLy8gTWl4aW5zXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IG1peGlucyhcbiAgVGhlbWVhYmxlXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuKS5leHRlbmQoe1xuICBuYW1lOiAndi10aW1lbGluZScsXG5cbiAgcHJvcHM6IHtcbiAgICBhbGlnblRvcDogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhblxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKToge30ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3YtdGltZWxpbmUtLWFsaWduLXRvcCc6IHRoaXMuYWxpZ25Ub3AsXG4gICAgICAgICd2LXRpbWVsaW5lLS1kZW5zZSc6IHRoaXMuZGVuc2UsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXRpbWVsaW5lJyxcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3Nlc1xuICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gIH1cbn0pXG4iXX0=