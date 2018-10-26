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
        const badge = this.$slots.badge ? [h('span', this.setBackgroundColor(this.color, {
                staticClass: 'v-badge__badge',
                attrs: this.$attrs,
                directives: [{
                        name: 'show',
                        value: this.isActive
                    }]
            }), this.$slots.badge)] : null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJhZGdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkJhZGdlL1ZCYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUE7QUFDaEQsT0FBTyxFQUFFLE9BQU8sSUFBSSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBQzFFLE9BQU8sY0FBYyxNQUFNLDZCQUE2QixDQUFBO0FBSXhELE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBRXRDLGVBQWUsTUFBTSxDQUNuQixTQUFTLEVBQ1QsVUFBVSxFQUNWLG1CQUFtQixDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ3ZDLGNBQWM7QUFDaEIsb0JBQW9CO0NBQ25CLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLFNBQVM7SUFFZixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsT0FBTyxFQUFFLE9BQU87UUFDaEIsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFLElBQUk7U0FDZDtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU87Z0JBQ0wsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQzlCLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDMUIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDakMsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDL0UsV0FBVyxFQUFFLGdCQUFnQjtnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNsQixVQUFVLEVBQUUsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsTUFBTTt3QkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7cUJBQ3JCLENBQVE7YUFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFFckMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ2YsV0FBVyxFQUFFLFNBQVM7WUFDdEIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLEVBQUU7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDbkIsQ0FBQyxDQUFDLFlBQVksRUFBRTtnQkFDZCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO29CQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDaEI7YUFDRixFQUFFLEtBQUssQ0FBQztTQUNWLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2JhZGdlcy5zdHlsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcbmltcG9ydCBUb2dnbGVhYmxlIGZyb20gJy4uLy4uL21peGlucy90b2dnbGVhYmxlJ1xuaW1wb3J0IHsgZmFjdG9yeSBhcyBQb3NpdGlvbmFibGVGYWN0b3J5IH0gZnJvbSAnLi4vLi4vbWl4aW5zL3Bvc2l0aW9uYWJsZSdcbmltcG9ydCBUcmFuc2l0aW9uYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdHJhbnNpdGlvbmFibGUnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBWTm9kZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5cbmV4cG9ydCBkZWZhdWx0IG1peGlucyhcbiAgQ29sb3JhYmxlLFxuICBUb2dnbGVhYmxlLFxuICBQb3NpdGlvbmFibGVGYWN0b3J5KFsnbGVmdCcsICdib3R0b20nXSksXG4gIFRyYW5zaXRpb25hYmxlXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuKS5leHRlbmQoe1xuICBuYW1lOiAndi1iYWRnZScsXG5cbiAgcHJvcHM6IHtcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICBvdmVybGFwOiBCb29sZWFuLFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdmYWItdHJhbnNpdGlvbidcbiAgICB9LFxuICAgIHZhbHVlOiB7XG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKTogb2JqZWN0IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWJhZGdlLS1ib3R0b20nOiB0aGlzLmJvdHRvbSxcbiAgICAgICAgJ3YtYmFkZ2UtLWxlZnQnOiB0aGlzLmxlZnQsXG4gICAgICAgICd2LWJhZGdlLS1vdmVybGFwJzogdGhpcy5vdmVybGFwXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBiYWRnZSA9IHRoaXMuJHNsb3RzLmJhZGdlID8gW2goJ3NwYW4nLCB0aGlzLnNldEJhY2tncm91bmRDb2xvcih0aGlzLmNvbG9yLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtYmFkZ2VfX2JhZGdlJyxcbiAgICAgIGF0dHJzOiB0aGlzLiRhdHRycyxcbiAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgIG5hbWU6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IHRoaXMuaXNBY3RpdmVcbiAgICAgIH1dIGFzIGFueVxuICAgIH0pLCB0aGlzLiRzbG90cy5iYWRnZSldIGFzIGFueSA6IG51bGxcblxuICAgIHJldHVybiBoKCdzcGFuJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWJhZGdlJyxcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3Nlc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuJHNsb3RzLmRlZmF1bHQsXG4gICAgICBoKCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMudHJhbnNpdGlvbixcbiAgICAgICAgICBvcmlnaW46IHRoaXMub3JpZ2luLFxuICAgICAgICAgIG1vZGU6IHRoaXMubW9kZVxuICAgICAgICB9XG4gICAgICB9LCBiYWRnZSlcbiAgICBdKVxuICB9XG59KVxuIl19