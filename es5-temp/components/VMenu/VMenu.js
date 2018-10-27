import '../../stylus/components/_menus.styl';
// Mixins
import Delayable from '../../mixins/delayable';
import Dependent from '../../mixins/dependent';
import Detachable from '../../mixins/detachable';
import Menuable from '../../mixins/menuable.js';
import Returnable from '../../mixins/returnable';
import Toggleable from '../../mixins/toggleable';
// Component level mixins
import Activator from './mixins/menu-activator';
import Generators from './mixins/menu-generators';
import Keyable from './mixins/menu-keyable';
import Position from './mixins/menu-position';
// Directives
import ClickOutside from '../../directives/click-outside';
import Resize from '../../directives/resize';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-menu',
    directives: {
        ClickOutside,
        Resize
    },
    mixins: [
        Activator,
        Dependent,
        Delayable,
        Detachable,
        Generators,
        Keyable,
        Menuable,
        Position,
        Returnable,
        Toggleable
    ],
    props: {
        auto: Boolean,
        closeOnClick: {
            type: Boolean,
            default: true
        },
        closeOnContentClick: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        fullWidth: Boolean,
        maxHeight: { default: 'auto' },
        offsetX: Boolean,
        offsetY: Boolean,
        openOnClick: {
            type: Boolean,
            default: true
        },
        openOnHover: Boolean,
        origin: {
            type: String,
            default: 'top left'
        },
        transition: {
            type: [Boolean, String],
            default: 'v-menu-transition'
        }
    },
    data() {
        return {
            defaultOffset: 8,
            maxHeightAutoDefault: '200px',
            startIndex: 3,
            stopIndex: 0,
            hasJustFocused: false,
            resizeTimeout: null
        };
    },
    computed: {
        calculatedLeft() {
            if (!this.auto)
                return this.calcLeft();
            return `${this.calcXOverflow(this.calcLeftAuto())}px`;
        },
        calculatedMaxHeight() {
            return this.auto ? '200px' : convertToUnit(this.maxHeight);
        },
        calculatedMaxWidth() {
            return isNaN(this.maxWidth)
                ? this.maxWidth
                : `${this.maxWidth}px`;
        },
        calculatedMinWidth() {
            if (this.minWidth) {
                return isNaN(this.minWidth)
                    ? this.minWidth
                    : `${this.minWidth}px`;
            }
            const minWidth = (this.dimensions.activator.width +
                this.nudgeWidth +
                (this.auto ? 16 : 0));
            const calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth))
                ? minWidth
                : parseInt(this.calculatedMaxWidth);
            return `${Math.min(calculatedMaxWidth, minWidth)}px`;
        },
        calculatedTop() {
            if (!this.auto || this.isAttached)
                return this.calcTop();
            return `${this.calcYOverflow(this.calcTopAuto())}px`;
        },
        styles() {
            return {
                maxHeight: this.calculatedMaxHeight,
                minWidth: this.calculatedMinWidth,
                maxWidth: this.calculatedMaxWidth,
                top: this.calculatedTop,
                left: this.calculatedLeft,
                transformOrigin: this.origin,
                zIndex: this.zIndex || this.activeZIndex
            };
        },
        tileHeight() {
            return this.dense ? 36 : 48;
        }
    },
    watch: {
        activator(newActivator, oldActivator) {
            this.removeActivatorEvents(oldActivator);
            this.addActivatorEvents(newActivator);
        },
        isContentActive(val) {
            this.hasJustFocused = val;
        }
    },
    methods: {
        activate() {
            // This exists primarily for v-select
            // helps determine which tiles to activate
            this.getTiles();
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(this.startTransition);
            // Once transitioning, calculate scroll position
            setTimeout(this.calculateScroll, 50);
        },
        closeConditional() {
            return this.isActive && this.closeOnClick;
        },
        onResize() {
            if (!this.isActive)
                return;
            // Account for screen resize
            // and orientation change
            // eslint-disable-next-line no-unused-expressions
            this.$refs.content.offsetWidth;
            this.updateDimensions();
            // When resizing to a smaller width
            // content width is evaluated before
            // the new activator width has been
            // set, causing it to not size properly
            // hacky but will revisit in the future
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.updateDimensions, 100);
        }
    },
    render(h) {
        const data = {
            staticClass: 'v-menu',
            class: { 'v-menu--inline': !this.fullWidth && this.$slots.activator },
            directives: [{
                    arg: 500,
                    name: 'resize',
                    value: this.onResize
                }],
            on: {
                keydown: this.changeListIndex
            }
        };
        return h('div', data, [
            this.genActivator(),
            this.genTransition()
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVk1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WTWVudS9WTWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHFDQUFxQyxDQUFBO0FBRTVDLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFFBQVEsTUFBTSwwQkFBMEIsQ0FBQTtBQUMvQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVoRCx5QkFBeUI7QUFDekIsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUE7QUFDL0MsT0FBTyxVQUFVLE1BQU0sMEJBQTBCLENBQUE7QUFDakQsT0FBTyxPQUFPLE1BQU0sdUJBQXVCLENBQUE7QUFDM0MsT0FBTyxRQUFRLE1BQU0sd0JBQXdCLENBQUE7QUFFN0MsYUFBYTtBQUNiLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFBO0FBQ3pELE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBRTVDLFVBQVU7QUFDVixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFbEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUVkLFVBQVUsRUFBRTtRQUNWLFlBQVk7UUFDWixNQUFNO0tBQ1A7SUFFRCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsU0FBUztRQUNULFNBQVM7UUFDVCxVQUFVO1FBQ1YsVUFBVTtRQUNWLE9BQU87UUFDUCxRQUFRO1FBQ1IsUUFBUTtRQUNSLFVBQVU7UUFDVixVQUFVO0tBQ1g7SUFFRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsT0FBTztRQUNiLFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxPQUFP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LyBNaXhpbnNcbmltcG9ydCBEZWxheWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2RlbGF5YWJsZSdcbmltcG9ydCBEZXBlbmRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL2RlcGVuZGVudCdcbmltcG9ydCBEZXRhY2hhYmxlIGZyb20gJy4uLy4uL21peGlucy9kZXRhY2hhYmxlJ1xuaW1wb3J0IE1lbnVhYmxlIGZyb20gJy4uLy4uL21peGlucy9tZW51YWJsZS5qcydcbmltcG9ydCBSZXR1cm5hYmxlIGZyb20gJy4uLy4uL21peGlucy9yZXR1cm5hYmxlJ1xuaW1wb3J0IFRvZ2dsZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RvZ2dsZWFibGUnXG5cbi8vIENvbXBvbmVudCBsZXZlbCBtaXhpbnNcbmltcG9ydCBBY3RpdmF0b3IgZnJvbSAnLi9taXhpbnMvbWVudS1hY3RpdmF0b3InXG5pbXBvcnQgR2VuZXJhdG9ycyBmcm9tICcuL21peGlucy9tZW51LWdlbmVyYXRvcnMnXG5pbXBvcnQgS2V5YWJsZSBmcm9tICcuL21peGlucy9tZW51LWtleWFibGUnXG5pbXBvcnQgUG9zaXRpb24gZnJvbSAnLi9taXhpbnMvbWVudS1wb3NpdGlvbidcblxuLy8gRGlyZWN0aXZlc1xuaW1wb3J0IENsaWNrT3V0c2lkZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUnXG5pbXBvcnQgUmVzaXplIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1tZW51JyxcblxuICBkaXJlY3RpdmVzOiB7XG4gICAgQ2xpY2tPdXRzaWRlLFxuICAgIFJlc2l6ZVxuICB9LFxuXG4gIG1peGluczogW1xuICAgIEFjdGl2YXRvcixcbiAgICBEZXBlbmRlbnQsXG4gICAgRGVsYXlhYmxlLFxuICAgIERldGFjaGFibGUsXG4gICAgR2VuZXJhdG9ycyxcbiAgICBLZXlhYmxlLFxuICAgIE1lbnVhYmxlLFxuICAgIFBvc2l0aW9uLFxuICAgIFJldHVybmFibGUsXG4gICAgVG9nZ2xlYWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgYXV0bzogQm9vbGVhbixcbiAgICBjbG9zZU9uQ2xpY2s6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU9uQ29udGVudENsaWNrOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIG1heEhlaWdodDogeyBkZWZhdWx0OiAnYXV0bycgfSxcbiAgICBvZmZzZXRYOiBCb29sZWFuLFxuICAgIG9mZnNldFk6IEJvb2xlYW4sXG4gICAgb3Blbk9uQ2xpY2s6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBvcGVuT25Ib3ZlcjogQm9vbGVhbixcbiAgICBvcmlnaW46IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0b3AgbGVmdCdcbiAgICB9LFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJ3YtbWVudS10cmFuc2l0aW9uJ1xuICAgIH1cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGVmYXVsdE9mZnNldDogOCxcbiAgICAgIG1heEhlaWdodEF1dG9EZWZhdWx0OiAnMjAwcHgnLFxuICAgICAgc3RhcnRJbmRleDogMyxcbiAgICAgIHN0b3BJbmRleDogMCxcbiAgICAgIGhhc0p1c3RGb2N1c2VkOiBmYWxzZSxcbiAgICAgIHJlc2l6ZVRpbWVvdXQ6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjYWxjdWxhdGVkTGVmdCAoKSB7XG4gICAgICBpZiAoIXRoaXMuYXV0bykgcmV0dXJuIHRoaXMuY2FsY0xlZnQoKVxuXG4gICAgICByZXR1cm4gYCR7dGhpcy5jYWxjWE92ZXJmbG93KHRoaXMuY2FsY0xlZnRBdXRvKCkpfXB4YFxuICAgIH0sXG4gICAgY2FsY3VsYXRlZE1heEhlaWdodCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRvID8gJzIwMHB4JyA6IGNvbnZlcnRUb1VuaXQodGhpcy5tYXhIZWlnaHQpXG4gICAgfSxcbiAgICBjYWxjdWxhdGVkTWF4V2lkdGggKCkge1xuICAgICAgcmV0dXJuIGlzTmFOKHRoaXMubWF4V2lkdGgpXG4gICAgICAgID8gdGhpcy5tYXhXaWR0aFxuICAgICAgICA6IGAke3RoaXMubWF4V2lkdGh9cHhgXG4gICAgfSxcbiAgICBjYWxjdWxhdGVkTWluV2lkdGggKCkge1xuICAgICAgaWYgKHRoaXMubWluV2lkdGgpIHtcbiAgICAgICAgcmV0dXJuIGlzTmFOKHRoaXMubWluV2lkdGgpXG4gICAgICAgICAgPyB0aGlzLm1pbldpZHRoXG4gICAgICAgICAgOiBgJHt0aGlzLm1pbldpZHRofXB4YFxuICAgICAgfVxuXG4gICAgICBjb25zdCBtaW5XaWR0aCA9IChcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zLmFjdGl2YXRvci53aWR0aCArXG4gICAgICAgIHRoaXMubnVkZ2VXaWR0aCArXG4gICAgICAgICh0aGlzLmF1dG8gPyAxNiA6IDApXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNhbGN1bGF0ZWRNYXhXaWR0aCA9IGlzTmFOKHBhcnNlSW50KHRoaXMuY2FsY3VsYXRlZE1heFdpZHRoKSlcbiAgICAgICAgPyBtaW5XaWR0aFxuICAgICAgICA6IHBhcnNlSW50KHRoaXMuY2FsY3VsYXRlZE1heFdpZHRoKVxuXG4gICAgICByZXR1cm4gYCR7TWF0aC5taW4oXG4gICAgICAgIGNhbGN1bGF0ZWRNYXhXaWR0aCxcbiAgICAgICAgbWluV2lkdGhcbiAgICAgICl9cHhgXG4gICAgfSxcbiAgICBjYWxjdWxhdGVkVG9wICgpIHtcbiAgICAgIGlmICghdGhpcy5hdXRvIHx8IHRoaXMuaXNBdHRhY2hlZCkgcmV0dXJuIHRoaXMuY2FsY1RvcCgpXG5cbiAgICAgIHJldHVybiBgJHt0aGlzLmNhbGNZT3ZlcmZsb3codGhpcy5jYWxjVG9wQXV0bygpKX1weGBcbiAgICB9LFxuICAgIHN0eWxlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYXhIZWlnaHQ6IHRoaXMuY2FsY3VsYXRlZE1heEhlaWdodCxcbiAgICAgICAgbWluV2lkdGg6IHRoaXMuY2FsY3VsYXRlZE1pbldpZHRoLFxuICAgICAgICBtYXhXaWR0aDogdGhpcy5jYWxjdWxhdGVkTWF4V2lkdGgsXG4gICAgICAgIHRvcDogdGhpcy5jYWxjdWxhdGVkVG9wLFxuICAgICAgICBsZWZ0OiB0aGlzLmNhbGN1bGF0ZWRMZWZ0LFxuICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IHRoaXMub3JpZ2luLFxuICAgICAgICB6SW5kZXg6IHRoaXMuekluZGV4IHx8IHRoaXMuYWN0aXZlWkluZGV4XG4gICAgICB9XG4gICAgfSxcbiAgICB0aWxlSGVpZ2h0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbnNlID8gMzYgOiA0OFxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGFjdGl2YXRvciAobmV3QWN0aXZhdG9yLCBvbGRBY3RpdmF0b3IpIHtcbiAgICAgIHRoaXMucmVtb3ZlQWN0aXZhdG9yRXZlbnRzKG9sZEFjdGl2YXRvcilcbiAgICAgIHRoaXMuYWRkQWN0aXZhdG9yRXZlbnRzKG5ld0FjdGl2YXRvcilcbiAgICB9LFxuICAgIGlzQ29udGVudEFjdGl2ZSAodmFsKSB7XG4gICAgICB0aGlzLmhhc0p1c3RGb2N1c2VkID0gdmFsXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBhY3RpdmF0ZSAoKSB7XG4gICAgICAvLyBUaGlzIGV4aXN0cyBwcmltYXJpbHkgZm9yIHYtc2VsZWN0XG4gICAgICAvLyBoZWxwcyBkZXRlcm1pbmUgd2hpY2ggdGlsZXMgdG8gYWN0aXZhdGVcbiAgICAgIHRoaXMuZ2V0VGlsZXMoKVxuICAgICAgLy8gVXBkYXRlIGNvb3JkaW5hdGVzIGFuZCBkaW1lbnNpb25zIG9mIG1lbnVcbiAgICAgIC8vIGFuZCBpdHMgYWN0aXZhdG9yXG4gICAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKVxuICAgICAgLy8gU3RhcnQgdGhlIHRyYW5zaXRpb25cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnN0YXJ0VHJhbnNpdGlvbilcbiAgICAgIC8vIE9uY2UgdHJhbnNpdGlvbmluZywgY2FsY3VsYXRlIHNjcm9sbCBwb3NpdGlvblxuICAgICAgc2V0VGltZW91dCh0aGlzLmNhbGN1bGF0ZVNjcm9sbCwgNTApXG4gICAgfSxcbiAgICBjbG9zZUNvbmRpdGlvbmFsICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlICYmIHRoaXMuY2xvc2VPbkNsaWNrXG4gICAgfSxcbiAgICBvblJlc2l6ZSAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHJldHVyblxuXG4gICAgICAvLyBBY2NvdW50IGZvciBzY3JlZW4gcmVzaXplXG4gICAgICAvLyBhbmQgb3JpZW50YXRpb24gY2hhbmdlXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICB0aGlzLiRyZWZzLmNvbnRlbnQub2Zmc2V0V2lkdGhcbiAgICAgIHRoaXMudXBkYXRlRGltZW5zaW9ucygpXG5cbiAgICAgIC8vIFdoZW4gcmVzaXppbmcgdG8gYSBzbWFsbGVyIHdpZHRoXG4gICAgICAvLyBjb250ZW50IHdpZHRoIGlzIGV2YWx1YXRlZCBiZWZvcmVcbiAgICAgIC8vIHRoZSBuZXcgYWN0aXZhdG9yIHdpZHRoIGhhcyBiZWVuXG4gICAgICAvLyBzZXQsIGNhdXNpbmcgaXQgdG8gbm90IHNpemUgcHJvcGVybHlcbiAgICAgIC8vIGhhY2t5IGJ1dCB3aWxsIHJldmlzaXQgaW4gdGhlIGZ1dHVyZVxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZW91dClcbiAgICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQodGhpcy51cGRhdGVEaW1lbnNpb25zLCAxMDApXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtbWVudScsXG4gICAgICBjbGFzczogeyAndi1tZW51LS1pbmxpbmUnOiAhdGhpcy5mdWxsV2lkdGggJiYgdGhpcy4kc2xvdHMuYWN0aXZhdG9yIH0sXG4gICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICBhcmc6IDUwMCxcbiAgICAgICAgbmFtZTogJ3Jlc2l6ZScsXG4gICAgICAgIHZhbHVlOiB0aGlzLm9uUmVzaXplXG4gICAgICB9XSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGtleWRvd246IHRoaXMuY2hhbmdlTGlzdEluZGV4XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIGRhdGEsIFtcbiAgICAgIHRoaXMuZ2VuQWN0aXZhdG9yKCksXG4gICAgICB0aGlzLmdlblRyYW5zaXRpb24oKVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==