import '../../stylus/components/_progress-linear.styl';
// Mixins
import Colorable from '../../mixins/colorable';
// Helpers
import { convertToUnit } from '../../util/helpers';
import mixins from '../../util/mixins';
import { VFadeTransition, VSlideXTransition } from '../transitions';
/* @vue/component */
export default mixins(Colorable).extend({
    name: 'v-progress-linear',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        backgroundColor: {
            type: String,
            default: null
        },
        backgroundOpacity: {
            type: [Number, String],
            default: null
        },
        bufferValue: {
            type: [Number, String],
            default: 100
        },
        color: {
            type: String,
            default: 'primary'
        },
        height: {
            type: [Number, String],
            default: 7
        },
        indeterminate: Boolean,
        query: Boolean,
        value: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        backgroundStyle() {
            const backgroundOpacity = this.backgroundOpacity == null
                ? (this.backgroundColor ? 1 : 0.3)
                : parseFloat(this.backgroundOpacity);
            return {
                height: this.active ? convertToUnit(this.height) : 0,
                opacity: backgroundOpacity,
                width: `${this.normalizedBufer}%`
            };
        },
        effectiveWidth() {
            if (!this.normalizedBufer) {
                return 0;
            }
            return +this.normalizedValue * 100 / +this.normalizedBufer;
        },
        normalizedBufer() {
            if (this.bufferValue < 0) {
                return 0;
            }
            if (this.bufferValue > 100) {
                return 100;
            }
            return parseInt(this.bufferValue, 10);
        },
        normalizedValue() {
            if (this.value < 0) {
                return 0;
            }
            if (this.value > 100) {
                return 100;
            }
            return parseInt(this.value, 10);
        },
        styles() {
            const styles = {};
            if (!this.active) {
                styles.height = 0;
            }
            if (!this.indeterminate && parseInt(this.normalizedBufer, 10) !== 100) {
                styles.width = `${this.normalizedBufer}%`;
            }
            return styles;
        }
    },
    methods: {
        genDeterminate(h) {
            return h('div', this.setBackgroundColor(this.color, {
                ref: 'front',
                staticClass: `v-progress-linear__bar__determinate`,
                style: {
                    width: `${this.effectiveWidth}%`
                }
            }));
        },
        genBar(h, name) {
            return h('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: {
                    [name]: true
                }
            }));
        },
        genIndeterminate(h) {
            return h('div', {
                ref: 'front',
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: {
                    'v-progress-linear__bar__indeterminate--active': this.active
                }
            }, [
                this.genBar(h, 'long'),
                this.genBar(h, 'short')
            ]);
        }
    },
    render(h) {
        const fade = h(VFadeTransition, this.indeterminate ? [this.genIndeterminate(h)] : []);
        const slide = h(VSlideXTransition, this.indeterminate ? [] : [this.genDeterminate(h)]);
        const bar = h('div', {
            staticClass: 'v-progress-linear__bar',
            style: this.styles
        }, [fade, slide]);
        const background = h('div', this.setBackgroundColor(this.backgroundColor || this.color, {
            staticClass: 'v-progress-linear__background',
            style: this.backgroundStyle
        }));
        return h('div', {
            staticClass: 'v-progress-linear',
            attrs: {
                'role': 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': this.normalizedBufer,
                'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
            },
            class: {
                'v-progress-linear--query': this.query
            },
            style: {
                height: convertToUnit(this.height)
            },
            on: this.$listeners
        }, [
            background,
            bar
        ]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlByb2dyZXNzTGluZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlByb2dyZXNzTGluZWFyL1ZQcm9ncmVzc0xpbmVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLCtDQUErQyxDQUFBO0FBRXRELFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxVQUFVO0FBQ1YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2xELE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBS3RDLE9BQU8sRUFDTCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2xCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsb0JBQW9CO0FBQ3BCLGVBQWUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN0QyxJQUFJLEVBQUUsbUJBQW1CO0lBRXpCLEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELGlCQUFpQixFQUFFO1lBQ2pCLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEdBQUc7U0FDYjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxhQUFhLEVBQUUs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RixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZTtTQUM1QixDQUFDLENBQUMsQ0FBQTtRQUVILE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsS0FBSyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxhQUFhO2dCQUNyQixlQUFlLEVBQUUsQ0FBQztnQkFDbEIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZTthQUN2RTtZQUNELEtBQUssRUFBRTtnQkFDTCwwQkFBMEIsRUFBRSxJQUFJLENBQUMsS0FBSzthQUN2QztZQUNELEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDbkM7WUFDRCxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDcEIsRUFBRTtZQUNELFVBQVU7WUFDVixHQUFHO1NBQ0osQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3Byb2dyZXNzLWxpbmVhci5zdHlsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcblxuLy8gSGVscGVyc1xuaW1wb3J0IHsgY29udmVydFRvVW5pdCB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBDcmVhdGVFbGVtZW50LCBWTm9kZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHtcbiAgVkZhZGVUcmFuc2l0aW9uLFxuICBWU2xpZGVYVHJhbnNpdGlvblxufSBmcm9tICcuLi90cmFuc2l0aW9ucydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IG1peGlucyhDb2xvcmFibGUpLmV4dGVuZCh7XG4gIG5hbWU6ICd2LXByb2dyZXNzLWxpbmVhcicsXG5cbiAgcHJvcHM6IHtcbiAgICBhY3RpdmU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGJhY2tncm91bmRPcGFjaXR5OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgYnVmZmVyVmFsdWU6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAxMDBcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeSdcbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDdcbiAgICB9LFxuICAgIGluZGV0ZXJtaW5hdGU6IEJvb2xlYW4sXG4gICAgcXVlcnk6IEJvb2xlYW4sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgYmFja2dyb3VuZFN0eWxlICgpOiBvYmplY3Qge1xuICAgICAgY29uc3QgYmFja2dyb3VuZE9wYWNpdHkgPSB0aGlzLmJhY2tncm91bmRPcGFjaXR5ID09IG51bGxcbiAgICAgICAgPyAodGhpcy5iYWNrZ3JvdW5kQ29sb3IgPyAxIDogMC4zKVxuICAgICAgICA6IHBhcnNlRmxvYXQodGhpcy5iYWNrZ3JvdW5kT3BhY2l0eSlcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmFjdGl2ZSA/IGNvbnZlcnRUb1VuaXQodGhpcy5oZWlnaHQpIDogMCxcbiAgICAgICAgb3BhY2l0eTogYmFja2dyb3VuZE9wYWNpdHksXG4gICAgICAgIHdpZHRoOiBgJHt0aGlzLm5vcm1hbGl6ZWRCdWZlcn0lYFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBlZmZlY3RpdmVXaWR0aCAoKTogbnVtYmVyIHtcbiAgICAgIGlmICghdGhpcy5ub3JtYWxpemVkQnVmZXIpIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICt0aGlzLm5vcm1hbGl6ZWRWYWx1ZSAqIDEwMCAvICt0aGlzLm5vcm1hbGl6ZWRCdWZlclxuICAgIH0sXG5cbiAgICBub3JtYWxpemVkQnVmZXIgKCk6IG51bWJlciB7XG4gICAgICBpZiAodGhpcy5idWZmZXJWYWx1ZSA8IDApIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYnVmZmVyVmFsdWUgPiAxMDApIHtcbiAgICAgICAgcmV0dXJuIDEwMFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5idWZmZXJWYWx1ZSwgMTApXG4gICAgfSxcblxuICAgIG5vcm1hbGl6ZWRWYWx1ZSAoKTogbnVtYmVyIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlIDwgMCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy52YWx1ZSA+IDEwMCkge1xuICAgICAgICByZXR1cm4gMTAwXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLnZhbHVlLCAxMClcbiAgICB9LFxuXG4gICAgc3R5bGVzICgpOiBvYmplY3Qge1xuICAgICAgY29uc3Qgc3R5bGVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cblxuICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgICBzdHlsZXMuaGVpZ2h0ID0gMFxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaW5kZXRlcm1pbmF0ZSAmJiBwYXJzZUludCh0aGlzLm5vcm1hbGl6ZWRCdWZlciwgMTApICE9PSAxMDApIHtcbiAgICAgICAgc3R5bGVzLndpZHRoID0gYCR7dGhpcy5ub3JtYWxpemVkQnVmZXJ9JWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlc1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuRGV0ZXJtaW5hdGUgKGg6IENyZWF0ZUVsZW1lbnQpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gaCgnZGl2JywgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb2xvciwge1xuICAgICAgICByZWY6ICdmcm9udCcsXG4gICAgICAgIHN0YXRpY0NsYXNzOiBgdi1wcm9ncmVzcy1saW5lYXJfX2Jhcl9fZGV0ZXJtaW5hdGVgLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmVmZmVjdGl2ZVdpZHRofSVgXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0sXG4gICAgZ2VuQmFyIChoOiBDcmVhdGVFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gaCgnZGl2JywgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb2xvciwge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtcHJvZ3Jlc3MtbGluZWFyX19iYXJfX2luZGV0ZXJtaW5hdGUnLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgIFtuYW1lXTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KSlcbiAgICB9LFxuICAgIGdlbkluZGV0ZXJtaW5hdGUgKGg6IENyZWF0ZUVsZW1lbnQpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdmcm9udCcsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1wcm9ncmVzcy1saW5lYXJfX2Jhcl9faW5kZXRlcm1pbmF0ZScsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3YtcHJvZ3Jlc3MtbGluZWFyX19iYXJfX2luZGV0ZXJtaW5hdGUtLWFjdGl2ZSc6IHRoaXMuYWN0aXZlXG4gICAgICAgIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5CYXIoaCwgJ2xvbmcnKSxcbiAgICAgICAgdGhpcy5nZW5CYXIoaCwgJ3Nob3J0JylcbiAgICAgIF0pXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBmYWRlID0gaChWRmFkZVRyYW5zaXRpb24sIHRoaXMuaW5kZXRlcm1pbmF0ZSA/IFt0aGlzLmdlbkluZGV0ZXJtaW5hdGUoaCldIDogW10pXG4gICAgY29uc3Qgc2xpZGUgPSBoKFZTbGlkZVhUcmFuc2l0aW9uLCB0aGlzLmluZGV0ZXJtaW5hdGUgPyBbXSA6IFt0aGlzLmdlbkRldGVybWluYXRlKGgpXSlcblxuICAgIGNvbnN0IGJhciA9IGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1wcm9ncmVzcy1saW5lYXJfX2JhcicsXG4gICAgICBzdHlsZTogdGhpcy5zdHlsZXNcbiAgICB9LCBbZmFkZSwgc2xpZGVdKVxuICAgIGNvbnN0IGJhY2tncm91bmQgPSBoKCdkaXYnLCB0aGlzLnNldEJhY2tncm91bmRDb2xvcih0aGlzLmJhY2tncm91bmRDb2xvciB8fCB0aGlzLmNvbG9yLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtcHJvZ3Jlc3MtbGluZWFyX19iYWNrZ3JvdW5kJyxcbiAgICAgIHN0eWxlOiB0aGlzLmJhY2tncm91bmRTdHlsZVxuICAgIH0pKVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1wcm9ncmVzcy1saW5lYXInLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgJ3JvbGUnOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAnYXJpYS12YWx1ZW1pbic6IDAsXG4gICAgICAgICdhcmlhLXZhbHVlbWF4JzogdGhpcy5ub3JtYWxpemVkQnVmZXIsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogdGhpcy5pbmRldGVybWluYXRlID8gdW5kZWZpbmVkIDogdGhpcy5ub3JtYWxpemVkVmFsdWVcbiAgICAgIH0sXG4gICAgICBjbGFzczoge1xuICAgICAgICAndi1wcm9ncmVzcy1saW5lYXItLXF1ZXJ5JzogdGhpcy5xdWVyeVxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGhlaWdodDogY29udmVydFRvVW5pdCh0aGlzLmhlaWdodClcbiAgICAgIH0sXG4gICAgICBvbjogdGhpcy4kbGlzdGVuZXJzXG4gICAgfSwgW1xuICAgICAgYmFja2dyb3VuZCxcbiAgICAgIGJhclxuICAgIF0pXG4gIH1cbn0pXG4iXX0=