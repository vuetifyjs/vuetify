import '../../stylus/components/_jumbotrons.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Routable from '../../mixins/routable';
import Themeable from '../../mixins/themeable';
// Utils
import { deprecate } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-jumbotron',
    mixins: [
        Colorable,
        Routable,
        Themeable
    ],
    props: {
        gradient: String,
        height: {
            type: [Number, String],
            default: '400px'
        },
        src: String,
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        backgroundStyles() {
            const styles = {};
            if (this.gradient) {
                styles.background = `linear-gradient(${this.gradient})`;
            }
            return styles;
        },
        classes() {
            return this.themeClasses;
        },
        styles() {
            return {
                height: this.height
            };
        }
    },
    mounted() {
        deprecate('v-jumbotron', this.src ? 'v-img' : 'v-responsive', this);
    },
    methods: {
        genBackground() {
            return this.$createElement('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-jumbotron__background',
                style: this.backgroundStyles
            }));
        },
        genContent() {
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__content'
            }, this.$slots.default);
        },
        genImage() {
            if (!this.src)
                return null;
            if (this.$slots.img)
                return this.$slots.img({ src: this.src });
            return this.$createElement('img', {
                staticClass: 'v-jumbotron__image',
                attrs: { src: this.src }
            });
        },
        genWrapper() {
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__wrapper'
            }, [
                this.genImage(),
                this.genBackground(),
                this.genContent()
            ]);
        }
    },
    render(h) {
        const { tag, data } = this.generateRouteLink(this.classes);
        data.staticClass = 'v-jumbotron';
        data.style = this.styles;
        return h(tag, data, [this.genWrapper()]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkp1bWJvdHJvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZKdW1ib3Ryb24vVkp1bWJvdHJvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDBDQUEwQyxDQUFBO0FBRWpELFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxRQUFRO0FBQ1IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRTlDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGFBQWE7SUFFbkIsTUFBTSxFQUFFO1FBQ04sU0FBUztRQUNULFFBQVE7UUFDUixTQUFTO0tBQ1Y7SUFFRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsTUFBTTtRQUNoQixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxPQUFPO1NBQ2pCO1FBQ0QsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLGdCQUFnQjtZQUNkLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUVqQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQTthQUN4RDtZQUVELE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUE7UUFDMUIsQ0FBQztRQUNELE1BQU07WUFDSixPQUFPO2dCQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQixDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBRUQsT0FBTztRQUNMLFNBQVMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDckUsQ0FBQztJQUVELE9BQU8sRUFBRTtRQUNQLGFBQWE7WUFDWCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNwRSxXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjthQUM3QixDQUFDLENBQUMsQ0FBQTtRQUNMLENBQUM7UUFDRCxVQUFVO1lBQ1IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLHNCQUFzQjthQUNwQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekIsQ0FBQztRQUNELFFBQVE7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQUUsT0FBTyxJQUFJLENBQUE7WUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7Z0JBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUU5RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUsb0JBQW9CO2dCQUNqQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTthQUN6QixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsVUFBVTtZQUNSLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSxzQkFBc0I7YUFDcEMsRUFBRTtnQkFDRCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUU7YUFDbEIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUE7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBRXhCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzFDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fanVtYm90cm9ucy5zdHlsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcbmltcG9ydCBSb3V0YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcm91dGFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbi8vIFV0aWxzXG5pbXBvcnQgeyBkZXByZWNhdGUgfSBmcm9tICcuLi8uLi91dGlsL2NvbnNvbGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWp1bWJvdHJvbicsXG5cbiAgbWl4aW5zOiBbXG4gICAgQ29sb3JhYmxlLFxuICAgIFJvdXRhYmxlLFxuICAgIFRoZW1lYWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgZ3JhZGllbnQ6IFN0cmluZyxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAnNDAwcHgnXG4gICAgfSxcbiAgICBzcmM6IFN0cmluZyxcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgYmFja2dyb3VuZFN0eWxlcyAoKSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSB7fVxuXG4gICAgICBpZiAodGhpcy5ncmFkaWVudCkge1xuICAgICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoJHt0aGlzLmdyYWRpZW50fSlgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZXNcbiAgICB9LFxuICAgIGNsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbWVDbGFzc2VzXG4gICAgfSxcbiAgICBzdHlsZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodFxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICBkZXByZWNhdGUoJ3YtanVtYm90cm9uJywgdGhpcy5zcmMgPyAndi1pbWcnIDogJ3YtcmVzcG9uc2l2ZScsIHRoaXMpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkJhY2tncm91bmQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKHRoaXMuY29sb3IsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWp1bWJvdHJvbl9fYmFja2dyb3VuZCcsXG4gICAgICAgIHN0eWxlOiB0aGlzLmJhY2tncm91bmRTdHlsZXNcbiAgICAgIH0pKVxuICAgIH0sXG4gICAgZ2VuQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtanVtYm90cm9uX19jb250ZW50J1xuICAgICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgICB9LFxuICAgIGdlbkltYWdlICgpIHtcbiAgICAgIGlmICghdGhpcy5zcmMpIHJldHVybiBudWxsXG4gICAgICBpZiAodGhpcy4kc2xvdHMuaW1nKSByZXR1cm4gdGhpcy4kc2xvdHMuaW1nKHsgc3JjOiB0aGlzLnNyYyB9KVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnaW1nJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtanVtYm90cm9uX19pbWFnZScsXG4gICAgICAgIGF0dHJzOiB7IHNyYzogdGhpcy5zcmMgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdlbldyYXBwZXIgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWp1bWJvdHJvbl9fd3JhcHBlcidcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5JbWFnZSgpLFxuICAgICAgICB0aGlzLmdlbkJhY2tncm91bmQoKSxcbiAgICAgICAgdGhpcy5nZW5Db250ZW50KClcbiAgICAgIF0pXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IHsgdGFnLCBkYXRhIH0gPSB0aGlzLmdlbmVyYXRlUm91dGVMaW5rKHRoaXMuY2xhc3NlcylcbiAgICBkYXRhLnN0YXRpY0NsYXNzID0gJ3YtanVtYm90cm9uJ1xuICAgIGRhdGEuc3R5bGUgPSB0aGlzLnN0eWxlc1xuXG4gICAgcmV0dXJuIGgodGFnLCBkYXRhLCBbdGhpcy5nZW5XcmFwcGVyKCldKVxuICB9XG59XG4iXX0=