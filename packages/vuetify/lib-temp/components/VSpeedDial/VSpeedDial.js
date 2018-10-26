import '../../stylus/components/_speed-dial.styl';
import Toggleable from '../../mixins/toggleable';
import Positionable from '../../mixins/positionable';
import Transitionable from '../../mixins/transitionable';
import ClickOutside from '../../directives/click-outside';
/* @vue/component */
export default {
    name: 'v-speed-dial',
    directives: { ClickOutside },
    mixins: [Positionable, Toggleable, Transitionable],
    props: {
        direction: {
            type: String,
            default: 'top',
            validator: val => {
                return ['top', 'right', 'bottom', 'left'].includes(val);
            }
        },
        openOnHover: Boolean,
        transition: {
            type: String,
            default: 'scale-transition'
        }
    },
    computed: {
        classes() {
            return {
                'v-speed-dial': true,
                'v-speed-dial--top': this.top,
                'v-speed-dial--right': this.right,
                'v-speed-dial--bottom': this.bottom,
                'v-speed-dial--left': this.left,
                'v-speed-dial--absolute': this.absolute,
                'v-speed-dial--fixed': this.fixed,
                [`v-speed-dial--direction-${this.direction}`]: true
            };
        }
    },
    render(h) {
        let children = [];
        const data = {
            'class': this.classes,
            directives: [{
                    name: 'click-outside',
                    value: () => (this.isActive = false)
                }],
            on: {
                click: () => (this.isActive = !this.isActive)
            }
        };
        if (this.openOnHover) {
            data.on.mouseenter = () => (this.isActive = true);
            data.on.mouseleave = () => (this.isActive = false);
        }
        if (this.isActive) {
            children = (this.$slots.default || []).map((b, i) => {
                b.key = i;
                return b;
            });
        }
        const list = h('transition-group', {
            'class': 'v-speed-dial__list',
            props: {
                name: this.transition,
                mode: this.mode,
                origin: this.origin,
                tag: 'div'
            }
        }, children);
        return h('div', data, [this.$slots.activator, list]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlNwZWVkRGlhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTcGVlZERpYWwvVlNwZWVkRGlhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDBDQUEwQyxDQUFBO0FBRWpELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFBO0FBQ3BELE9BQU8sY0FBYyxNQUFNLDZCQUE2QixDQUFBO0FBRXhELE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFBO0FBRXpELG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGNBQWM7SUFFcEIsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFO0lBRTVCLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFDO0lBRWxELEtBQUssRUFBRTtRQUNMLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN6RCxDQUFDO1NBQ0Y7UUFDRCxXQUFXLEVBQUUsT0FBTztRQUNwQixVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxrQkFBa0I7U0FDNUI7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxPQUFPO2dCQUNMLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixtQkFBbUIsRUFBRSxJQUFJLENBQUMsR0FBRztnQkFDN0IscUJBQXFCLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDL0Isd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQyxDQUFDLDJCQUEyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJO2FBQ3BELENBQUE7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNqQixNQUFNLElBQUksR0FBRztZQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixVQUFVLEVBQUUsQ0FBQztvQkFDWCxJQUFJLEVBQUUsZUFBZTtvQkFDckIsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7aUJBQ3JDLENBQUM7WUFDRixFQUFFLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDOUM7U0FDRixDQUFBO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUNqRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUE7U0FDbkQ7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtnQkFFVCxPQUFPLENBQUMsQ0FBQTtZQUNWLENBQUMsQ0FBQyxDQUFBO1NBQ0g7UUFFRCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsa0JBQWtCLEVBQUU7WUFDakMsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixHQUFHLEVBQUUsS0FBSzthQUNYO1NBQ0YsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUVaLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ3RELENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc3BlZWQtZGlhbC5zdHlsJ1xuXG5pbXBvcnQgVG9nZ2xlYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdG9nZ2xlYWJsZSdcbmltcG9ydCBQb3NpdGlvbmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3Bvc2l0aW9uYWJsZSdcbmltcG9ydCBUcmFuc2l0aW9uYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdHJhbnNpdGlvbmFibGUnXG5cbmltcG9ydCBDbGlja091dHNpZGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1zcGVlZC1kaWFsJyxcblxuICBkaXJlY3RpdmVzOiB7IENsaWNrT3V0c2lkZSB9LFxuXG4gIG1peGluczogW1Bvc2l0aW9uYWJsZSwgVG9nZ2xlYWJsZSwgVHJhbnNpdGlvbmFibGVdLFxuXG4gIHByb3BzOiB7XG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndG9wJyxcbiAgICAgIHZhbGlkYXRvcjogdmFsID0+IHtcbiAgICAgICAgcmV0dXJuIFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J10uaW5jbHVkZXModmFsKVxuICAgICAgfVxuICAgIH0sXG4gICAgb3Blbk9uSG92ZXI6IEJvb2xlYW4sXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3NjYWxlLXRyYW5zaXRpb24nXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1zcGVlZC1kaWFsJzogdHJ1ZSxcbiAgICAgICAgJ3Ytc3BlZWQtZGlhbC0tdG9wJzogdGhpcy50b3AsXG4gICAgICAgICd2LXNwZWVkLWRpYWwtLXJpZ2h0JzogdGhpcy5yaWdodCxcbiAgICAgICAgJ3Ytc3BlZWQtZGlhbC0tYm90dG9tJzogdGhpcy5ib3R0b20sXG4gICAgICAgICd2LXNwZWVkLWRpYWwtLWxlZnQnOiB0aGlzLmxlZnQsXG4gICAgICAgICd2LXNwZWVkLWRpYWwtLWFic29sdXRlJzogdGhpcy5hYnNvbHV0ZSxcbiAgICAgICAgJ3Ytc3BlZWQtZGlhbC0tZml4ZWQnOiB0aGlzLmZpeGVkLFxuICAgICAgICBbYHYtc3BlZWQtZGlhbC0tZGlyZWN0aW9uLSR7dGhpcy5kaXJlY3Rpb259YF06IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgbGV0IGNoaWxkcmVuID0gW11cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzLFxuICAgICAgZGlyZWN0aXZlczogW3tcbiAgICAgICAgbmFtZTogJ2NsaWNrLW91dHNpZGUnLFxuICAgICAgICB2YWx1ZTogKCkgPT4gKHRoaXMuaXNBY3RpdmUgPSBmYWxzZSlcbiAgICAgIH1dLFxuICAgICAgb246IHtcbiAgICAgICAgY2xpY2s6ICgpID0+ICh0aGlzLmlzQWN0aXZlID0gIXRoaXMuaXNBY3RpdmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3Blbk9uSG92ZXIpIHtcbiAgICAgIGRhdGEub24ubW91c2VlbnRlciA9ICgpID0+ICh0aGlzLmlzQWN0aXZlID0gdHJ1ZSlcbiAgICAgIGRhdGEub24ubW91c2VsZWF2ZSA9ICgpID0+ICh0aGlzLmlzQWN0aXZlID0gZmFsc2UpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIGNoaWxkcmVuID0gKHRoaXMuJHNsb3RzLmRlZmF1bHQgfHwgW10pLm1hcCgoYiwgaSkgPT4ge1xuICAgICAgICBiLmtleSA9IGlcblxuICAgICAgICByZXR1cm4gYlxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ID0gaCgndHJhbnNpdGlvbi1ncm91cCcsIHtcbiAgICAgICdjbGFzcyc6ICd2LXNwZWVkLWRpYWxfX2xpc3QnLFxuICAgICAgcHJvcHM6IHtcbiAgICAgICAgbmFtZTogdGhpcy50cmFuc2l0aW9uLFxuICAgICAgICBtb2RlOiB0aGlzLm1vZGUsXG4gICAgICAgIG9yaWdpbjogdGhpcy5vcmlnaW4sXG4gICAgICAgIHRhZzogJ2RpdidcbiAgICAgIH1cbiAgICB9LCBjaGlsZHJlbilcblxuICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCBbdGhpcy4kc2xvdHMuYWN0aXZhdG9yLCBsaXN0XSlcbiAgfVxufVxuIl19