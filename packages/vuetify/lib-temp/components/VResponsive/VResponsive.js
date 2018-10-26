import '../../stylus/components/_responsive.styl';
// Mixins
import Measurable from '../../mixins/measurable';
// Utils
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Measurable).extend({
    name: 'v-responsive',
    props: {
        aspectRatio: [String, Number]
    },
    computed: {
        computedAspectRatio() {
            return Number(this.aspectRatio);
        },
        aspectStyle() {
            return this.computedAspectRatio
                ? { paddingBottom: (1 / this.computedAspectRatio) * 100 + '%' }
                : undefined;
        },
        __cachedSizer() {
            if (!this.aspectStyle)
                return [];
            return this.$createElement('div', {
                style: this.aspectStyle,
                staticClass: 'v-responsive__sizer'
            });
        }
    },
    methods: {
        genContent() {
            return this.$createElement('div', {
                staticClass: 'v-responsive__content'
            }, this.$slots.default);
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-responsive',
            style: this.measurableStyles,
            on: this.$listeners
        }, [
            this.__cachedSizer,
            this.genContent()
        ]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlJlc3BvbnNpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WUmVzcG9uc2l2ZS9WUmVzcG9uc2l2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDBDQUEwQyxDQUFBO0FBRWpELFNBQVM7QUFDVCxPQUFPLFVBQW9DLE1BQU0seUJBQXlCLENBQUE7QUFLMUUsUUFBUTtBQUNSLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBRXRDLG9CQUFvQjtBQUNwQixlQUFlLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDdkMsSUFBSSxFQUFFLGNBQWM7SUFFcEIsS0FBSyxFQUFFO1FBQ0wsV0FBVyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBeUI7S0FDdEQ7SUFFRCxRQUFRLEVBQUU7UUFDUixtQkFBbUI7WUFDakIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFDRCxXQUFXO1lBQ1QsT0FBTyxJQUFJLENBQUMsbUJBQW1CO2dCQUM3QixDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRTtnQkFDL0QsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtRQUNmLENBQUM7UUFDRCxhQUFhO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUFFLE9BQU8sRUFBRSxDQUFBO1lBRWhDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDdkIsV0FBVyxFQUFFLHFCQUFxQjthQUNuQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxVQUFVO1lBQ1IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLHVCQUF1QjthQUNyQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekIsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDZCxXQUFXLEVBQUUsY0FBYztZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUM1QixFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDcEIsRUFBRTtZQUNELElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUU7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3Jlc3BvbnNpdmUuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgTWVhc3VyYWJsZSwgeyBOdW1iZXJPck51bWJlclN0cmluZyB9IGZyb20gJy4uLy4uL21peGlucy9tZWFzdXJhYmxlJ1xuXG4vLyBUeXBlc1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICd2dWUnXG5cbi8vIFV0aWxzXG5pbXBvcnQgbWl4aW5zIGZyb20gJy4uLy4uL3V0aWwvbWl4aW5zJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKE1lYXN1cmFibGUpLmV4dGVuZCh7XG4gIG5hbWU6ICd2LXJlc3BvbnNpdmUnLFxuXG4gIHByb3BzOiB7XG4gICAgYXNwZWN0UmF0aW86IFtTdHJpbmcsIE51bWJlcl0gYXMgTnVtYmVyT3JOdW1iZXJTdHJpbmdcbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkQXNwZWN0UmF0aW8gKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gTnVtYmVyKHRoaXMuYXNwZWN0UmF0aW8pXG4gICAgfSxcbiAgICBhc3BlY3RTdHlsZSAoKTogb2JqZWN0IHwgdW5kZWZpbmVkIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVkQXNwZWN0UmF0aW9cbiAgICAgICAgPyB7IHBhZGRpbmdCb3R0b206ICgxIC8gdGhpcy5jb21wdXRlZEFzcGVjdFJhdGlvKSAqIDEwMCArICclJyB9XG4gICAgICAgIDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICBfX2NhY2hlZFNpemVyICgpOiBWTm9kZSB8IG5ldmVyW10ge1xuICAgICAgaWYgKCF0aGlzLmFzcGVjdFN0eWxlKSByZXR1cm4gW11cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3R5bGU6IHRoaXMuYXNwZWN0U3R5bGUsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1yZXNwb25zaXZlX19zaXplcidcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5Db250ZW50ICgpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtcmVzcG9uc2l2ZV9fY29udGVudCdcbiAgICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXJlc3BvbnNpdmUnLFxuICAgICAgc3R5bGU6IHRoaXMubWVhc3VyYWJsZVN0eWxlcyxcbiAgICAgIG9uOiB0aGlzLiRsaXN0ZW5lcnNcbiAgICB9LCBbXG4gICAgICB0aGlzLl9fY2FjaGVkU2l6ZXIsXG4gICAgICB0aGlzLmdlbkNvbnRlbnQoKVxuICAgIF0pXG4gIH1cbn0pXG4iXX0=