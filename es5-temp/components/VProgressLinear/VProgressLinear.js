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
        styles() {
            const styles = {};
            if (!this.active) {
                styles.height = 0;
            }
            if (!this.indeterminate && parseInt(this.bufferValue, 10) !== 100) {
                styles.width = `${this.bufferValue}%`;
            }
            return styles;
        },
        effectiveWidth() {
            if (!this.bufferValue) {
                return 0;
            }
            return +this.value * 100 / +this.bufferValue;
        },
        backgroundStyle() {
            const backgroundOpacity = this.backgroundOpacity == null
                ? (this.backgroundColor ? 1 : 0.3)
                : parseFloat(this.backgroundOpacity);
            return {
                height: this.active ? convertToUnit(this.height) : 0,
                opacity: backgroundOpacity,
                width: `${this.bufferValue}%`
            };
        }
    },
    methods: {
        genDeterminate(h) {
            return h('div', {
                ref: 'front',
                staticClass: `v-progress-linear__bar__determinate`,
                class: this.addBackgroundColorClassChecks(),
                style: {
                    width: `${this.effectiveWidth}%`
                }
            });
        },
        genBar(h, name) {
            return h('div', {
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: this.addBackgroundColorClassChecks({
                    [name]: true
                })
            });
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
        const background = h('div', {
            staticClass: 'v-progress-linear__background',
            class: [this.backgroundColor || this.color],
            style: this.backgroundStyle
        });
        return h('div', {
            staticClass: 'v-progress-linear',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlByb2dyZXNzTGluZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlByb2dyZXNzTGluZWFyL1ZQcm9ncmVzc0xpbmVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLCtDQUErQyxDQUFBO0FBRXRELFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxVQUFVO0FBQ1YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2xELE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBS3RDLE9BQU8sRUFDTCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2xCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsb0JBQW9CO0FBQ3BCLGVBQWUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN0QyxJQUFJLEVBQUUsbUJBQW1CO0lBRXpCLEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELGlCQUFpQixFQUFFO1lBQ2pCLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEdBQUc7U0FDYjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxhQUFhLEVBQUUs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QUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDckYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUV0RixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ25CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUNqQixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQzFCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNDLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZTtTQUM1QixDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDZCxXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLEtBQUssRUFBRTtnQkFDTCwwQkFBMEIsRUFBRSxJQUFJLENBQUMsS0FBSzthQUN2QztZQUNELEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDbkM7WUFDRCxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDcEIsRUFBRTtZQUNELFVBQVU7WUFDVixHQUFHO1NBQ0osQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3Byb2dyZXNzLWxpbmVhci5zdHlsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcblxuLy8gSGVscGVyc1xuaW1wb3J0IHsgY29udmVydFRvVW5pdCB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBDcmVhdGVFbGVtZW50LCBWTm9kZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHtcbiAgVkZhZGVUcmFuc2l0aW9uLFxuICBWU2xpZGVYVHJhbnNpdGlvblxufSBmcm9tICcuLi90cmFuc2l0aW9ucydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IG1peGlucyhDb2xvcmFibGUpLmV4dGVuZCh7XG4gIG5hbWU6ICd2LXByb2dyZXNzLWxpbmVhcicsXG5cbiAgcHJvcHM6IHtcbiAgICBhY3RpdmU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGJhY2tncm91bmRPcGFjaXR5OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgYnVmZmVyVmFsdWU6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAxMDBcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeSdcbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDdcbiAgICB9LFxuICAgIGluZGV0ZXJtaW5hdGU6IEJvb2xlYW4sXG4gICAgcXVlcnk6IEJvb2xlYW4sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGVzICgpOiBvYmplY3Qge1xuICAgICAgY29uc3Qgc3R5bGVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cblxuICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgICBzdHlsZXMuaGVpZ2h0ID0gMFxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaW5kZXRlcm1pbmF0ZSAmJiBwYXJzZUludCh0aGlzLmJ1ZmZlclZhbHVlLCAxMCkgIT09IDEwMCkge1xuICAgICAgICBzdHlsZXMud2lkdGggPSBgJHt0aGlzLmJ1ZmZlclZhbHVlfSVgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZXNcbiAgICB9LFxuICAgIGVmZmVjdGl2ZVdpZHRoICgpOiBudW1iZXIge1xuICAgICAgaWYgKCF0aGlzLmJ1ZmZlclZhbHVlKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG5cbiAgICAgIHJldHVybiArdGhpcy52YWx1ZSAqIDEwMCAvICt0aGlzLmJ1ZmZlclZhbHVlXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kU3R5bGUgKCk6IG9iamVjdCB7XG4gICAgICBjb25zdCBiYWNrZ3JvdW5kT3BhY2l0eSA9IHRoaXMuYmFja2dyb3VuZE9wYWNpdHkgPT0gbnVsbFxuICAgICAgICA/ICh0aGlzLmJhY2tncm91bmRDb2xvciA/IDEgOiAwLjMpXG4gICAgICAgIDogcGFyc2VGbG9hdCh0aGlzLmJhY2tncm91bmRPcGFjaXR5KVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBoZWlnaHQ6IHRoaXMuYWN0aXZlID8gY29udmVydFRvVW5pdCh0aGlzLmhlaWdodCkgOiAwLFxuICAgICAgICBvcGFjaXR5OiBiYWNrZ3JvdW5kT3BhY2l0eSxcbiAgICAgICAgd2lkdGg6IGAke3RoaXMuYnVmZmVyVmFsdWV9JWBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkRldGVybWluYXRlIChoOiBDcmVhdGVFbGVtZW50KTogVk5vZGUge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnZnJvbnQnLFxuICAgICAgICBzdGF0aWNDbGFzczogYHYtcHJvZ3Jlc3MtbGluZWFyX19iYXJfX2RldGVybWluYXRlYCxcbiAgICAgICAgY2xhc3M6IHRoaXMuYWRkQmFja2dyb3VuZENvbG9yQ2xhc3NDaGVja3MoKSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB3aWR0aDogYCR7dGhpcy5lZmZlY3RpdmVXaWR0aH0lYFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuQmFyIChoOiBDcmVhdGVFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtcHJvZ3Jlc3MtbGluZWFyX19iYXJfX2luZGV0ZXJtaW5hdGUnLFxuICAgICAgICBjbGFzczogdGhpcy5hZGRCYWNrZ3JvdW5kQ29sb3JDbGFzc0NoZWNrcyh7XG4gICAgICAgICAgW25hbWVdOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuSW5kZXRlcm1pbmF0ZSAoaDogQ3JlYXRlRWxlbWVudCk6IFZOb2RlIHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ2Zyb250JyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXByb2dyZXNzLWxpbmVhcl9fYmFyX19pbmRldGVybWluYXRlJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi1wcm9ncmVzcy1saW5lYXJfX2Jhcl9faW5kZXRlcm1pbmF0ZS0tYWN0aXZlJzogdGhpcy5hY3RpdmVcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlbkJhcihoLCAnbG9uZycpLFxuICAgICAgICB0aGlzLmdlbkJhcihoLCAnc2hvcnQnKVxuICAgICAgXSlcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKTogVk5vZGUge1xuICAgIGNvbnN0IGZhZGUgPSBoKFZGYWRlVHJhbnNpdGlvbiwgdGhpcy5pbmRldGVybWluYXRlID8gW3RoaXMuZ2VuSW5kZXRlcm1pbmF0ZShoKV0gOiBbXSlcbiAgICBjb25zdCBzbGlkZSA9IGgoVlNsaWRlWFRyYW5zaXRpb24sIHRoaXMuaW5kZXRlcm1pbmF0ZSA/IFtdIDogW3RoaXMuZ2VuRGV0ZXJtaW5hdGUoaCldKVxuXG4gICAgY29uc3QgYmFyID0gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXByb2dyZXNzLWxpbmVhcl9fYmFyJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlc1xuICAgIH0sIFtmYWRlLCBzbGlkZV0pXG4gICAgY29uc3QgYmFja2dyb3VuZCA9IGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1wcm9ncmVzcy1saW5lYXJfX2JhY2tncm91bmQnLFxuICAgICAgY2xhc3M6IFt0aGlzLmJhY2tncm91bmRDb2xvciB8fCB0aGlzLmNvbG9yXSxcbiAgICAgIHN0eWxlOiB0aGlzLmJhY2tncm91bmRTdHlsZVxuICAgIH0pXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXByb2dyZXNzLWxpbmVhcicsXG4gICAgICBjbGFzczoge1xuICAgICAgICAndi1wcm9ncmVzcy1saW5lYXItLXF1ZXJ5JzogdGhpcy5xdWVyeVxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGhlaWdodDogY29udmVydFRvVW5pdCh0aGlzLmhlaWdodClcbiAgICAgIH0sXG4gICAgICBvbjogdGhpcy4kbGlzdGVuZXJzXG4gICAgfSwgW1xuICAgICAgYmFja2dyb3VuZCxcbiAgICAgIGJhclxuICAgIF0pXG4gIH1cbn0pXG4iXX0=