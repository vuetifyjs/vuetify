// Styles
import '../../stylus/components/_badges.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Toggleable from '../../mixins/toggleable';
import { factory as PositionableFactory } from '../../mixins/positionable';
import Transitionable from '../../mixins/transitionable';
import mixins from '../../util/mixins';
export default mixins(Colorable, Toggleable, PositionableFactory(['left', 'bottom']), Transitionable
/* @vue/component */
).extend({
    name: 'v-badge',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        overlap: Boolean,
        transition: {
            type: String,
            default: 'fab-transition'
        },
        value: {
            default: true
        }
    },
    computed: {
        classes() {
            return {
                'v-badge--bottom': this.bottom,
                'v-badge--left': this.left,
                'v-badge--overlap': this.overlap
            };
        }
    },
    render(h) {
        const badge = this.$slots.badge ? [h('span', {
                staticClass: 'v-badge__badge',
                'class': this.addBackgroundColorClassChecks(),
                attrs: this.$attrs,
                directives: [{
                        name: 'show',
                        value: this.isActive
                    }]
            }, this.$slots.badge)] : undefined;
        return h('span', {
            staticClass: 'v-badge',
            'class': this.classes
        }, [
            this.$slots.default,
            h('transition', {
                props: {
                    name: this.transition,
                    origin: this.origin,
                    mode: this.mode
                }
            }, badge)
        ]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJhZGdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkJhZGdlL1ZCYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUE7QUFDaEQsT0FBTyxFQUFFLE9BQU8sSUFBSSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBQzFFLE9BQU8sY0FBYyxNQUFNLDZCQUE2QixDQUFBO0FBSXhELE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBRXRDLGVBQWUsTUFBTSxDQUNuQixTQUFTLEVBQ1QsVUFBVSxFQUNWLG1CQUFtQixDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ3ZDLGNBQWM7QUFDaEIsb0JBQW9CO0NBQ25CLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLFNBQVM7SUFFZixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsT0FBTyxFQUFFLE9BQU87UUFDaEIsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFLElBQUk7U0FDZDtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU87Z0JBQ0wsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQzlCLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDMUIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDakMsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDM0MsV0FBVyxFQUFFLGdCQUFnQjtnQkFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtnQkFDN0MsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNsQixVQUFVLEVBQUUsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsTUFBTTt3QkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7cUJBQ3JCLENBQVE7YUFDVixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1FBRWxDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNmLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixFQUFFO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQ25CLENBQUMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7aUJBQ2hCO2FBQ0YsRUFBRSxLQUFLLENBQUM7U0FDVixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19iYWRnZXMuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVG9nZ2xlYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdG9nZ2xlYWJsZSdcbmltcG9ydCB7IGZhY3RvcnkgYXMgUG9zaXRpb25hYmxlRmFjdG9yeSB9IGZyb20gJy4uLy4uL21peGlucy9wb3NpdGlvbmFibGUnXG5pbXBvcnQgVHJhbnNpdGlvbmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RyYW5zaXRpb25hYmxlJ1xuXG4vLyBUeXBlc1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICd2dWUnXG5pbXBvcnQgbWl4aW5zIGZyb20gJy4uLy4uL3V0aWwvbWl4aW5zJ1xuXG5leHBvcnQgZGVmYXVsdCBtaXhpbnMoXG4gIENvbG9yYWJsZSxcbiAgVG9nZ2xlYWJsZSxcbiAgUG9zaXRpb25hYmxlRmFjdG9yeShbJ2xlZnQnLCAnYm90dG9tJ10pLFxuICBUcmFuc2l0aW9uYWJsZVxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbikuZXh0ZW5kKHtcbiAgbmFtZTogJ3YtYmFkZ2UnLFxuXG4gIHByb3BzOiB7XG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgb3ZlcmxhcDogQm9vbGVhbixcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZmFiLXRyYW5zaXRpb24nXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1iYWRnZS0tYm90dG9tJzogdGhpcy5ib3R0b20sXG4gICAgICAgICd2LWJhZGdlLS1sZWZ0JzogdGhpcy5sZWZ0LFxuICAgICAgICAndi1iYWRnZS0tb3ZlcmxhcCc6IHRoaXMub3ZlcmxhcFxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpOiBWTm9kZSB7XG4gICAgY29uc3QgYmFkZ2UgPSB0aGlzLiRzbG90cy5iYWRnZSA/IFtoKCdzcGFuJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWJhZGdlX19iYWRnZScsXG4gICAgICAnY2xhc3MnOiB0aGlzLmFkZEJhY2tncm91bmRDb2xvckNsYXNzQ2hlY2tzKCksXG4gICAgICBhdHRyczogdGhpcy4kYXR0cnMsXG4gICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICBuYW1lOiAnc2hvdycsXG4gICAgICAgIHZhbHVlOiB0aGlzLmlzQWN0aXZlXG4gICAgICB9XSBhcyBhbnlcbiAgICB9LCB0aGlzLiRzbG90cy5iYWRnZSldIDogdW5kZWZpbmVkXG5cbiAgICByZXR1cm4gaCgnc3BhbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1iYWRnZScsXG4gICAgICAnY2xhc3MnOiB0aGlzLmNsYXNzZXNcbiAgICB9LCBbXG4gICAgICB0aGlzLiRzbG90cy5kZWZhdWx0LFxuICAgICAgaCgndHJhbnNpdGlvbicsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBuYW1lOiB0aGlzLnRyYW5zaXRpb24sXG4gICAgICAgICAgb3JpZ2luOiB0aGlzLm9yaWdpbixcbiAgICAgICAgICBtb2RlOiB0aGlzLm1vZGVcbiAgICAgICAgfVxuICAgICAgfSwgYmFkZ2UpXG4gICAgXSlcbiAgfVxufSlcbiJdfQ==