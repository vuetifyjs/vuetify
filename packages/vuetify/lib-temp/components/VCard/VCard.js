// Styles
import '../../stylus/components/_cards.styl';
// Extensions
import VPaper from '../VPaper';
// Mixins
import Routable from '../../mixins/routable';
// Helpers
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Routable, VPaper).extend({
    name: 'v-card',
    props: {
        elevation: {
            type: [Number, String],
            default: 2
        },
        flat: Boolean,
        hover: Boolean,
        img: String,
        raised: Boolean
    },
    computed: {
        classes() {
            return {
                'v-card': true,
                'v-card--hover': this.hover,
                ...VPaper.options.computed.classes.call(this)
            };
        },
        computedElevation() {
            if (this.flat)
                return 0;
            if (this.raised)
                return 3;
            return VPaper.options.computed.computedElevation.call(this);
        },
        styles() {
            const style = {
                ...VPaper.options.computed.styles.call(this)
            };
            if (this.img) {
                style.background = `url("${this.img}") center center / cover no-repeat`;
            }
            return style;
        }
    },
    render(h) {
        const { tag, data } = this.generateRouteLink(this.classes);
        data.style = this.styles;
        return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WQ2FyZC9WQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxxQ0FBcUMsQ0FBQTtBQUU1QyxhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBRTlCLFNBQVM7QUFDVCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUU1QyxVQUFVO0FBQ1YsT0FBTyxNQUFNLE1BQU0sbUJBQW1CLENBQUE7QUFLdEMsb0JBQW9CO0FBQ3BCLGVBQWUsTUFBTSxDQUNuQixRQUFRLEVBQ1IsTUFBTSxDQUNQLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLFFBQVE7SUFFZCxLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxJQUFJLEVBQUUsT0FBTztRQUNiLEtBQUssRUFBRSxPQUFPO1FBQ2QsR0FBRyxFQUFFLE1BQU07UUFDWCxNQUFNLEVBQUUsT0FBTztLQUNoQjtJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxPQUFPO2dCQUNMLFFBQVEsRUFBRSxJQUFJO2dCQUNkLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDM0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM5QyxDQUFBO1FBQ0gsQ0FBQztRQUNELGlCQUFpQjtZQUNmLElBQUksSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxDQUFDLENBQUE7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTTtnQkFBRSxPQUFPLENBQUMsQ0FBQTtZQUV6QixPQUFRLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEUsQ0FBQztRQUNELE1BQU07WUFDSixNQUFNLEtBQUssR0FBRztnQkFDWixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdDLENBQUE7WUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLElBQUksQ0FBQyxHQUFHLG9DQUFvQyxDQUFBO2FBQ3hFO1lBRUQsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUUxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFFeEIsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDL0UsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fY2FyZHMuc3R5bCdcblxuLy8gRXh0ZW5zaW9uc1xuaW1wb3J0IFZQYXBlciBmcm9tICcuLi9WUGFwZXInXG5cbi8vIE1peGluc1xuaW1wb3J0IFJvdXRhYmxlIGZyb20gJy4uLy4uL21peGlucy9yb3V0YWJsZSdcblxuLy8gSGVscGVyc1xuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlIH0gZnJvbSAndnVlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKFxuICBSb3V0YWJsZSxcbiAgVlBhcGVyXG4pLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWNhcmQnLFxuXG4gIHByb3BzOiB7XG4gICAgZWxldmF0aW9uOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMlxuICAgIH0sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICBob3ZlcjogQm9vbGVhbixcbiAgICBpbWc6IFN0cmluZyxcbiAgICByYWlzZWQ6IEJvb2xlYW5cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1jYXJkJzogdHJ1ZSxcbiAgICAgICAgJ3YtY2FyZC0taG92ZXInOiB0aGlzLmhvdmVyLFxuICAgICAgICAuLi5WUGFwZXIub3B0aW9ucy5jb21wdXRlZC5jbGFzc2VzLmNhbGwodGhpcylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkRWxldmF0aW9uICgpOiBudW1iZXIgfCBzdHJpbmcge1xuICAgICAgaWYgKHRoaXMuZmxhdCkgcmV0dXJuIDBcbiAgICAgIGlmICh0aGlzLnJhaXNlZCkgcmV0dXJuIDNcblxuICAgICAgcmV0dXJuIChWUGFwZXIub3B0aW9ucy5jb21wdXRlZCBhcyBhbnkpLmNvbXB1dGVkRWxldmF0aW9uLmNhbGwodGhpcylcbiAgICB9LFxuICAgIHN0eWxlcyAoKTogb2JqZWN0IHtcbiAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICAuLi5WUGFwZXIub3B0aW9ucy5jb21wdXRlZC5zdHlsZXMuY2FsbCh0aGlzKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pbWcpIHtcbiAgICAgICAgc3R5bGUuYmFja2dyb3VuZCA9IGB1cmwoXCIke3RoaXMuaW1nfVwiKSBjZW50ZXIgY2VudGVyIC8gY292ZXIgbm8tcmVwZWF0YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3R5bGVcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKTogVk5vZGUge1xuICAgIGNvbnN0IHsgdGFnLCBkYXRhIH0gPSB0aGlzLmdlbmVyYXRlUm91dGVMaW5rKHRoaXMuY2xhc3NlcylcblxuICAgIGRhdGEuc3R5bGUgPSB0aGlzLnN0eWxlc1xuXG4gICAgcmV0dXJuIGgodGFnLCB0aGlzLnNldEJhY2tncm91bmRDb2xvcih0aGlzLmNvbG9yLCBkYXRhKSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgfVxufSlcbiJdfQ==