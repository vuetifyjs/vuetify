import '../../stylus/components/_snackbars.styl';
import Colorable from '../../mixins/colorable';
import Toggleable from '../../mixins/toggleable';
import { factory as PositionableFactory } from '../../mixins/positionable';
import mixins from '../../util/mixins';
export default mixins(Colorable, Toggleable, PositionableFactory(['absolute', 'top', 'bottom', 'left', 'right'])
/* @vue/component */
).extend({
    name: 'v-snackbar',
    props: {
        autoHeight: Boolean,
        multiLine: Boolean,
        // TODO: change this to closeDelay to match other API in delayable.js
        timeout: {
            type: Number,
            default: 6000
        },
        vertical: Boolean
    },
    data() {
        return {
            activeTimeout: -1
        };
    },
    computed: {
        classes() {
            return {
                'v-snack--active': this.isActive,
                'v-snack--absolute': this.absolute,
                'v-snack--auto-height': this.autoHeight,
                'v-snack--bottom': this.bottom || !this.top,
                'v-snack--left': this.left,
                'v-snack--multi-line': this.multiLine && !this.vertical,
                'v-snack--right': this.right,
                'v-snack--top': this.top,
                'v-snack--vertical': this.vertical
            };
        }
    },
    watch: {
        isActive() {
            this.setTimeout();
        }
    },
    mounted() {
        this.setTimeout();
    },
    methods: {
        setTimeout() {
            window.clearTimeout(this.activeTimeout);
            if (this.isActive && this.timeout) {
                this.activeTimeout = window.setTimeout(() => {
                    this.isActive = false;
                }, this.timeout);
            }
        }
    },
    render(h) {
        const children = [];
        if (this.isActive) {
            children.push(h('div', {
                staticClass: 'v-snack',
                class: this.classes,
                on: this.$listeners
            }, [
                h('div', this.setBackgroundColor(this.color, {
                    staticClass: 'v-snack__wrapper'
                }), [
                    h('div', {
                        staticClass: 'v-snack__content'
                    }, this.$slots.default)
                ])
            ]));
        }
        return h('transition', {
            attrs: { name: 'v-snack-transition' }
        }, children);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlNuYWNrYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlNuYWNrYmFyL1ZTbmFja2Jhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHlDQUF5QyxDQUFBO0FBRWhELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sRUFBRSxPQUFPLElBQUksbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUUxRSxPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQTtBQUd0QyxlQUFlLE1BQU0sQ0FDbkIsU0FBUyxFQUNULFVBQVUsRUFDVixtQkFBbUIsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNyRSxvQkFBb0I7Q0FDbkIsQ0FBQyxNQUFNLENBQUM7SUFDUCxJQUFJLEVBQUUsWUFBWTtJQUVsQixLQUFLLEVBQUU7UUFDTCxVQUFVLEVBQUUsT0FBTztRQUNuQixTQUFTLEVBQUUsT0FBTztRQUNsQixxRUFBcUU7UUFDckUsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsUUFBUSxFQUFFLE9BQU87S0FDbEI7SUFFRCxJQUFJO1FBQ0YsT0FBTztZQUNMLGFBQWEsRUFBRSxDQUFDLENBQUM7U0FDbEIsQ0FBQTtJQUNILENBQUM7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDaEMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ2xDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUN2QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQzNDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDMUIscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUN2RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDNUIsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUN4QixtQkFBbUIsRUFBRSxJQUFJLENBQUMsUUFBUTthQUNuQyxDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsUUFBUTtZQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNuQixDQUFDO0tBQ0Y7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxVQUFVO1lBQ1IsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFFdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO2dCQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQ2pCO1FBQ0gsQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLFFBQVEsR0FBK0IsRUFBRSxDQUFBO1FBRS9DLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixRQUFRLENBQUMsSUFBSSxDQUNYLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDbkIsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3BCLEVBQUU7Z0JBQ0QsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDM0MsV0FBVyxFQUFFLGtCQUFrQjtpQkFDaEMsQ0FBQyxFQUFFO29CQUNGLENBQUMsQ0FBQyxLQUFLLEVBQUU7d0JBQ1AsV0FBVyxFQUFFLGtCQUFrQjtxQkFDaEMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDeEIsQ0FBQzthQUNILENBQUMsQ0FDSCxDQUFBO1NBQ0Y7UUFFRCxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDckIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1NBQ3RDLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDZCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc25hY2tiYXJzLnN0eWwnXG5cbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcbmltcG9ydCBUb2dnbGVhYmxlIGZyb20gJy4uLy4uL21peGlucy90b2dnbGVhYmxlJ1xuaW1wb3J0IHsgZmFjdG9yeSBhcyBQb3NpdGlvbmFibGVGYWN0b3J5IH0gZnJvbSAnLi4vLi4vbWl4aW5zL3Bvc2l0aW9uYWJsZSdcblxuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcbmltcG9ydCB7IFZOb2RlLCBWTm9kZUNoaWxkcmVuQXJyYXlDb250ZW50cyB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKFxuICBDb2xvcmFibGUsXG4gIFRvZ2dsZWFibGUsXG4gIFBvc2l0aW9uYWJsZUZhY3RvcnkoWydhYnNvbHV0ZScsICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnXSlcbi8qIEB2dWUvY29tcG9uZW50ICovXG4pLmV4dGVuZCh7XG4gIG5hbWU6ICd2LXNuYWNrYmFyJyxcblxuICBwcm9wczoge1xuICAgIGF1dG9IZWlnaHQ6IEJvb2xlYW4sXG4gICAgbXVsdGlMaW5lOiBCb29sZWFuLFxuICAgIC8vIFRPRE86IGNoYW5nZSB0aGlzIHRvIGNsb3NlRGVsYXkgdG8gbWF0Y2ggb3RoZXIgQVBJIGluIGRlbGF5YWJsZS5qc1xuICAgIHRpbWVvdXQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDYwMDBcbiAgICB9LFxuICAgIHZlcnRpY2FsOiBCb29sZWFuXG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGl2ZVRpbWVvdXQ6IC0xXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKTogb2JqZWN0IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LXNuYWNrLS1hY3RpdmUnOiB0aGlzLmlzQWN0aXZlLFxuICAgICAgICAndi1zbmFjay0tYWJzb2x1dGUnOiB0aGlzLmFic29sdXRlLFxuICAgICAgICAndi1zbmFjay0tYXV0by1oZWlnaHQnOiB0aGlzLmF1dG9IZWlnaHQsXG4gICAgICAgICd2LXNuYWNrLS1ib3R0b20nOiB0aGlzLmJvdHRvbSB8fCAhdGhpcy50b3AsXG4gICAgICAgICd2LXNuYWNrLS1sZWZ0JzogdGhpcy5sZWZ0LFxuICAgICAgICAndi1zbmFjay0tbXVsdGktbGluZSc6IHRoaXMubXVsdGlMaW5lICYmICF0aGlzLnZlcnRpY2FsLFxuICAgICAgICAndi1zbmFjay0tcmlnaHQnOiB0aGlzLnJpZ2h0LFxuICAgICAgICAndi1zbmFjay0tdG9wJzogdGhpcy50b3AsXG4gICAgICAgICd2LXNuYWNrLS12ZXJ0aWNhbCc6IHRoaXMudmVydGljYWxcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBpc0FjdGl2ZSAoKSB7XG4gICAgICB0aGlzLnNldFRpbWVvdXQoKVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnNldFRpbWVvdXQoKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBzZXRUaW1lb3V0ICgpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5hY3RpdmVUaW1lb3V0KVxuXG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSAmJiB0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICB9LCB0aGlzLnRpbWVvdXQpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBjaGlsZHJlbjogVk5vZGVDaGlsZHJlbkFycmF5Q29udGVudHMgPSBbXVxuXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc25hY2snLFxuICAgICAgICAgIGNsYXNzOiB0aGlzLmNsYXNzZXMsXG4gICAgICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnZGl2JywgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb2xvciwge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXNuYWNrX193cmFwcGVyJ1xuICAgICAgICAgIH0pLCBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbmFja19fY29udGVudCdcbiAgICAgICAgICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gaCgndHJhbnNpdGlvbicsIHtcbiAgICAgIGF0dHJzOiB7IG5hbWU6ICd2LXNuYWNrLXRyYW5zaXRpb24nIH1cbiAgICB9LCBjaGlsZHJlbilcbiAgfVxufSlcbiJdfQ==