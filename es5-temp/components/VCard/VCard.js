import '../../stylus/components/_cards.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Routable from '../../mixins/routable';
import Themeable from '../../mixins/themeable';
// Helpers
import { convertToUnit } from '../../util/helpers';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Routable, Themeable).extend({
    name: 'v-card',
    props: {
        flat: Boolean,
        height: [Number, String],
        hover: Boolean,
        img: String,
        raised: Boolean,
        tag: {
            type: String,
            default: 'div'
        },
        tile: Boolean,
        width: [String, Number]
    },
    computed: {
        classes() {
            return this.addBackgroundColorClassChecks({
                'v-card': true,
                'v-card--flat': this.flat,
                'v-card--hover': this.hover,
                'v-card--raised': this.raised,
                'v-card--tile': this.tile,
                ...this.themeClasses
            });
        },
        styles() {
            const style = {
                height: convertToUnit(this.height)
            };
            if (this.img) {
                style.background = `url("${this.img}") center center / cover no-repeat`;
            }
            if (this.width) {
                style.width = convertToUnit(this.width);
            }
            return style;
        }
    },
    render(h) {
        const { tag, data } = this.generateRouteLink();
        data.style = this.styles;
        return h(tag, data, this.$slots.default);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WQ2FyZC9WQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHFDQUFxQyxDQUFBO0FBRTVDLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxVQUFVO0FBQ1YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2xELE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBS3RDLG9CQUFvQjtBQUNwQixlQUFlLE1BQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUMzRCxJQUFJLEVBQUUsUUFBUTtJQUVkLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4QixLQUFLLEVBQUUsT0FBTztRQUNkLEdBQUcsRUFBRSxNQUFNO1FBQ1gsTUFBTSxFQUFFLE9BQU87UUFDZixHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxJQUFJLEVBQUUsT0FBTztRQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7S0FDeEI7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUM7Z0JBQ3hDLFFBQVEsRUFBRSxJQUFJO2dCQUNkLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDekIsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUMzQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUN6QixHQUFHLElBQUksQ0FBQyxZQUFZO2FBQ3JCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxNQUFNO1lBQ0osTUFBTSxLQUFLLEdBQXdCO2dCQUNqQyxNQUFNLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDbkMsQ0FBQTtZQUVELElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDWixLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsSUFBSSxDQUFDLEdBQUcsb0NBQW9DLENBQUE7YUFDeEU7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ3hDO1lBRUQsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFFOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBRXhCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fY2FyZHMuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgUm91dGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3JvdXRhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuLy8gVHlwZXNcbmltcG9ydCB7IFZOb2RlIH0gZnJvbSAndnVlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKENvbG9yYWJsZSwgUm91dGFibGUsIFRoZW1lYWJsZSkuZXh0ZW5kKHtcbiAgbmFtZTogJ3YtY2FyZCcsXG5cbiAgcHJvcHM6IHtcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGhlaWdodDogW051bWJlciwgU3RyaW5nXSxcbiAgICBob3ZlcjogQm9vbGVhbixcbiAgICBpbWc6IFN0cmluZyxcbiAgICByYWlzZWQ6IEJvb2xlYW4sXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG4gICAgdGlsZTogQm9vbGVhbixcbiAgICB3aWR0aDogW1N0cmluZywgTnVtYmVyXVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKTogb2JqZWN0IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZEJhY2tncm91bmRDb2xvckNsYXNzQ2hlY2tzKHtcbiAgICAgICAgJ3YtY2FyZCc6IHRydWUsXG4gICAgICAgICd2LWNhcmQtLWZsYXQnOiB0aGlzLmZsYXQsXG4gICAgICAgICd2LWNhcmQtLWhvdmVyJzogdGhpcy5ob3ZlcixcbiAgICAgICAgJ3YtY2FyZC0tcmFpc2VkJzogdGhpcy5yYWlzZWQsXG4gICAgICAgICd2LWNhcmQtLXRpbGUnOiB0aGlzLnRpbGUsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9KVxuICAgIH0sXG4gICAgc3R5bGVzICgpOiBvYmplY3Qge1xuICAgICAgY29uc3Qgc3R5bGU6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgICAgIGhlaWdodDogY29udmVydFRvVW5pdCh0aGlzLmhlaWdodClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaW1nKSB7XG4gICAgICAgIHN0eWxlLmJhY2tncm91bmQgPSBgdXJsKFwiJHt0aGlzLmltZ31cIikgY2VudGVyIGNlbnRlciAvIGNvdmVyIG5vLXJlcGVhdGBcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMud2lkdGgpIHtcbiAgICAgICAgc3R5bGUud2lkdGggPSBjb252ZXJ0VG9Vbml0KHRoaXMud2lkdGgpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpOiBWTm9kZSB7XG4gICAgY29uc3QgeyB0YWcsIGRhdGEgfSA9IHRoaXMuZ2VuZXJhdGVSb3V0ZUxpbmsoKVxuXG4gICAgZGF0YS5zdHlsZSA9IHRoaXMuc3R5bGVzXG5cbiAgICByZXR1cm4gaCh0YWcsIGRhdGEsIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gIH1cbn0pXG4iXX0=