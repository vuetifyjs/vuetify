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
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__background',
                'class': this.addBackgroundColorClassChecks(),
                style: this.backgroundStyles
            });
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
        const { tag, data } = this.generateRouteLink();
        data.staticClass = 'v-jumbotron';
        data.style = this.styles;
        return h(tag, data, [this.genWrapper()]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkp1bWJvdHJvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZKdW1ib3Ryb24vVkp1bWJvdHJvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDBDQUEwQyxDQUFBO0FBRWpELFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxRQUFRO0FBQ1IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRTlDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGFBQWE7SUFFbkIsTUFBTSxFQUFFO1FBQ04sU0FBUztRQUNULFFBQVE7UUFDUixTQUFTO0tBQ1Y7SUFFRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsTUFBTTtRQUNoQixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxPQUFPO1NBQ2pCO1FBQ0QsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLGdCQUFnQjtZQUNkLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUVqQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQTthQUN4RDtZQUVELE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUE7UUFDMUIsQ0FBQztRQUNELE1BQU07WUFDSixPQUFPO2dCQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQixDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBRUQsT0FBTztRQUNMLFNBQVMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDckUsQ0FBQztJQUVELE9BQU8sRUFBRTtRQUNQLGFBQWE7WUFDWCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxPQUFPLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixFQUFFO2dCQUM3QyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjthQUM3QixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsVUFBVTtZQUNSLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSxzQkFBc0I7YUFDcEMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3pCLENBQUM7UUFDRCxRQUFRO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUFFLE9BQU8sSUFBSSxDQUFBO1lBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO2dCQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7WUFFOUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLG9CQUFvQjtnQkFDakMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7YUFDekIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFVBQVU7WUFDUixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUsc0JBQXNCO2FBQ3BDLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFO2FBQ2xCLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQTtRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFFeEIsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDMUMsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19qdW1ib3Ryb25zLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFJvdXRhYmxlIGZyb20gJy4uLy4uL21peGlucy9yb3V0YWJsZSdcbmltcG9ydCBUaGVtZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcblxuLy8gVXRpbHNcbmltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtanVtYm90cm9uJyxcblxuICBtaXhpbnM6IFtcbiAgICBDb2xvcmFibGUsXG4gICAgUm91dGFibGUsXG4gICAgVGhlbWVhYmxlXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBncmFkaWVudDogU3RyaW5nLFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICc0MDBweCdcbiAgICB9LFxuICAgIHNyYzogU3RyaW5nLFxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBiYWNrZ3JvdW5kU3R5bGVzICgpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHt9XG5cbiAgICAgIGlmICh0aGlzLmdyYWRpZW50KSB7XG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCgke3RoaXMuZ3JhZGllbnR9KWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlc1xuICAgIH0sXG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVtZUNsYXNzZXNcbiAgICB9LFxuICAgIHN0eWxlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIGRlcHJlY2F0ZSgndi1qdW1ib3Ryb24nLCB0aGlzLnNyYyA/ICd2LWltZycgOiAndi1yZXNwb25zaXZlJywgdGhpcylcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuQmFja2dyb3VuZCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtanVtYm90cm9uX19iYWNrZ3JvdW5kJyxcbiAgICAgICAgJ2NsYXNzJzogdGhpcy5hZGRCYWNrZ3JvdW5kQ29sb3JDbGFzc0NoZWNrcygpLFxuICAgICAgICBzdHlsZTogdGhpcy5iYWNrZ3JvdW5kU3R5bGVzXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtanVtYm90cm9uX19jb250ZW50J1xuICAgICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgICB9LFxuICAgIGdlbkltYWdlICgpIHtcbiAgICAgIGlmICghdGhpcy5zcmMpIHJldHVybiBudWxsXG4gICAgICBpZiAodGhpcy4kc2xvdHMuaW1nKSByZXR1cm4gdGhpcy4kc2xvdHMuaW1nKHsgc3JjOiB0aGlzLnNyYyB9KVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnaW1nJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtanVtYm90cm9uX19pbWFnZScsXG4gICAgICAgIGF0dHJzOiB7IHNyYzogdGhpcy5zcmMgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdlbldyYXBwZXIgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWp1bWJvdHJvbl9fd3JhcHBlcidcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5JbWFnZSgpLFxuICAgICAgICB0aGlzLmdlbkJhY2tncm91bmQoKSxcbiAgICAgICAgdGhpcy5nZW5Db250ZW50KClcbiAgICAgIF0pXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IHsgdGFnLCBkYXRhIH0gPSB0aGlzLmdlbmVyYXRlUm91dGVMaW5rKClcbiAgICBkYXRhLnN0YXRpY0NsYXNzID0gJ3YtanVtYm90cm9uJ1xuICAgIGRhdGEuc3R5bGUgPSB0aGlzLnN0eWxlc1xuXG4gICAgcmV0dXJuIGgodGFnLCBkYXRhLCBbdGhpcy5nZW5XcmFwcGVyKCldKVxuICB9XG59XG4iXX0=