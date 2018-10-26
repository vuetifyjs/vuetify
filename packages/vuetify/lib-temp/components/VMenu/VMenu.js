import '../../stylus/components/_menus.styl';
import Vue from 'vue';
// Mixins
import Delayable from '../../mixins/delayable';
import Dependent from '../../mixins/dependent';
import Detachable from '../../mixins/detachable';
import Menuable from '../../mixins/menuable.js';
import Returnable from '../../mixins/returnable';
import Toggleable from '../../mixins/toggleable';
import Themeable from '../../mixins/themeable';
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
import ThemeProvider from '../../util/ThemeProvider';
/* @vue/component */
export default Vue.extend({
    name: 'v-menu',
    provide() {
        return {
            // Pass theme through to default slot
            theme: this.theme
        };
    },
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
        Toggleable,
        Themeable
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
                keydown: this.onKeyDown
            }
        };
        return h('div', data, [
            this.genActivator(),
            this.$createElement(ThemeProvider, {
                props: {
                    root: true,
                    light: this.light,
                    dark: this.dark
                }
            }, [this.genTransition()])
        ]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVk1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WTWVudS9WTWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHFDQUFxQyxDQUFBO0FBRTVDLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQTtBQUVyQixTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUE7QUFDaEQsT0FBTyxRQUFRLE1BQU0sMEJBQTBCLENBQUE7QUFDL0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUE7QUFDaEQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUE7QUFDaEQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFFOUMseUJBQXlCO0FBQ3pCLE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFBO0FBQy9DLE9BQU8sVUFBVSxNQUFNLDBCQUEwQixDQUFBO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHVCQUF1QixDQUFBO0FBQzNDLE9BQU8sUUFBUSxNQUFNLHdCQUF3QixDQUFBO0FBRTdDLGFBQWE7QUFDYixPQUFPLFlBQVksTUFBTSxnQ0FBZ0MsQ0FBQTtBQUN6RCxPQUFPLE1BQU0sTUFBTSx5QkFBeUIsQ0FBQTtBQUU1QyxVQUFVO0FBQ1YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2xELE9BQU8sYUFBYSxNQUFNLDBCQUEwQixDQUFBO0FBRXBELG9CQUFvQjtBQUNwQixlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDeEIsSUFBSSxFQUFFLFFBQVE7SUFFZCxPQUFPO1FBQ0wsT0FBTztZQUNMLHFDQUFxQztZQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQTtJQUNILENBQUM7SUFFRCxVQUFVLEVBQUU7UUFDVixZQUFZO1FB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QUN4QjtTQUNGLENBQUE7UUFFRCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7Z0JBQ2pDLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDaEI7YUFDRixFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7U0FDM0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX21lbnVzLnN0eWwnXG5cbmltcG9ydCBWdWUgZnJvbSAndnVlJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBEZWxheWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2RlbGF5YWJsZSdcbmltcG9ydCBEZXBlbmRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL2RlcGVuZGVudCdcbmltcG9ydCBEZXRhY2hhYmxlIGZyb20gJy4uLy4uL21peGlucy9kZXRhY2hhYmxlJ1xuaW1wb3J0IE1lbnVhYmxlIGZyb20gJy4uLy4uL21peGlucy9tZW51YWJsZS5qcydcbmltcG9ydCBSZXR1cm5hYmxlIGZyb20gJy4uLy4uL21peGlucy9yZXR1cm5hYmxlJ1xuaW1wb3J0IFRvZ2dsZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RvZ2dsZWFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbi8vIENvbXBvbmVudCBsZXZlbCBtaXhpbnNcbmltcG9ydCBBY3RpdmF0b3IgZnJvbSAnLi9taXhpbnMvbWVudS1hY3RpdmF0b3InXG5pbXBvcnQgR2VuZXJhdG9ycyBmcm9tICcuL21peGlucy9tZW51LWdlbmVyYXRvcnMnXG5pbXBvcnQgS2V5YWJsZSBmcm9tICcuL21peGlucy9tZW51LWtleWFibGUnXG5pbXBvcnQgUG9zaXRpb24gZnJvbSAnLi9taXhpbnMvbWVudS1wb3NpdGlvbidcblxuLy8gRGlyZWN0aXZlc1xuaW1wb3J0IENsaWNrT3V0c2lkZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUnXG5pbXBvcnQgUmVzaXplIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuaW1wb3J0IFRoZW1lUHJvdmlkZXIgZnJvbSAnLi4vLi4vdXRpbC9UaGVtZVByb3ZpZGVyJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XG4gIG5hbWU6ICd2LW1lbnUnLFxuXG4gIHByb3ZpZGUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBQYXNzIHRoZW1lIHRocm91Z2ggdG8gZGVmYXVsdCBzbG90XG4gICAgICB0aGVtZTogdGhpcy50aGVtZVxuICAgIH1cbiAgfSxcblxuICBkaXJlY3RpdmVzOiB7XG4gICAgQ2xpY2tPdXRzaWRlLFxuICAgIFJlc2l6ZVxuICB9LFxuXG4gIG1peGluczogW1xuICAgIEFjdGl2YXRvcixcbiAgICBEZXBlbmRlbnQsXG4gICAgRGVsYXlhYmxlLFxuICAgIERldGFjaGFibGUsXG4gICAgR2VuZXJhdG9ycyxcbiAgICBLZXlhYmxlLFxuICAgIE1lbnVhYmxlLFxuICAgIFBvc2l0aW9uLFxuICAgIFJldHVybmFibGUsXG4gICAgVG9nZ2xlYWJsZSxcbiAgICBUaGVtZWFibGVcbiAgXSxcblxuICBwcm9wczoge1xuICAgIGF1dG86IEJvb2xlYW4sXG4gICAgY2xvc2VPbkNsaWNrOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VPbkNvbnRlbnRDbGljazoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGZ1bGxXaWR0aDogQm9vbGVhbixcbiAgICBtYXhIZWlnaHQ6IHsgZGVmYXVsdDogJ2F1dG8nIH0sXG4gICAgb2Zmc2V0WDogQm9vbGVhbixcbiAgICBvZmZzZXRZOiBCb29sZWFuLFxuICAgIG9wZW5PbkNsaWNrOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgb3Blbk9uSG92ZXI6IEJvb2xlYW4sXG4gICAgb3JpZ2luOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndG9wIGxlZnQnXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICd2LW1lbnUtdHJhbnNpdGlvbidcbiAgICB9XG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlZmF1bHRPZmZzZXQ6IDgsXG4gICAgICBtYXhIZWlnaHRBdXRvRGVmYXVsdDogJzIwMHB4JyxcbiAgICAgIHN0YXJ0SW5kZXg6IDMsXG4gICAgICBzdG9wSW5kZXg6IDAsXG4gICAgICBoYXNKdXN0Rm9jdXNlZDogZmFsc2UsXG4gICAgICByZXNpemVUaW1lb3V0OiBudWxsXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2FsY3VsYXRlZExlZnQgKCkge1xuICAgICAgaWYgKCF0aGlzLmF1dG8pIHJldHVybiB0aGlzLmNhbGNMZWZ0KClcblxuICAgICAgcmV0dXJuIGAke3RoaXMuY2FsY1hPdmVyZmxvdyh0aGlzLmNhbGNMZWZ0QXV0bygpKX1weGBcbiAgICB9LFxuICAgIGNhbGN1bGF0ZWRNYXhIZWlnaHQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXV0byA/ICcyMDBweCcgOiBjb252ZXJ0VG9Vbml0KHRoaXMubWF4SGVpZ2h0KVxuICAgIH0sXG4gICAgY2FsY3VsYXRlZE1heFdpZHRoICgpIHtcbiAgICAgIHJldHVybiBpc05hTih0aGlzLm1heFdpZHRoKVxuICAgICAgICA/IHRoaXMubWF4V2lkdGhcbiAgICAgICAgOiBgJHt0aGlzLm1heFdpZHRofXB4YFxuICAgIH0sXG4gICAgY2FsY3VsYXRlZE1pbldpZHRoICgpIHtcbiAgICAgIGlmICh0aGlzLm1pbldpZHRoKSB7XG4gICAgICAgIHJldHVybiBpc05hTih0aGlzLm1pbldpZHRoKVxuICAgICAgICAgID8gdGhpcy5taW5XaWR0aFxuICAgICAgICAgIDogYCR7dGhpcy5taW5XaWR0aH1weGBcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWluV2lkdGggPSAoXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5hY3RpdmF0b3Iud2lkdGggK1xuICAgICAgICB0aGlzLm51ZGdlV2lkdGggK1xuICAgICAgICAodGhpcy5hdXRvID8gMTYgOiAwKVxuICAgICAgKVxuXG4gICAgICBjb25zdCBjYWxjdWxhdGVkTWF4V2lkdGggPSBpc05hTihwYXJzZUludCh0aGlzLmNhbGN1bGF0ZWRNYXhXaWR0aCkpXG4gICAgICAgID8gbWluV2lkdGhcbiAgICAgICAgOiBwYXJzZUludCh0aGlzLmNhbGN1bGF0ZWRNYXhXaWR0aClcblxuICAgICAgcmV0dXJuIGAke01hdGgubWluKFxuICAgICAgICBjYWxjdWxhdGVkTWF4V2lkdGgsXG4gICAgICAgIG1pbldpZHRoXG4gICAgICApfXB4YFxuICAgIH0sXG4gICAgY2FsY3VsYXRlZFRvcCAoKSB7XG4gICAgICBpZiAoIXRoaXMuYXV0byB8fCB0aGlzLmlzQXR0YWNoZWQpIHJldHVybiB0aGlzLmNhbGNUb3AoKVxuXG4gICAgICByZXR1cm4gYCR7dGhpcy5jYWxjWU92ZXJmbG93KHRoaXMuY2FsY1RvcEF1dG8oKSl9cHhgXG4gICAgfSxcbiAgICBzdHlsZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWF4SGVpZ2h0OiB0aGlzLmNhbGN1bGF0ZWRNYXhIZWlnaHQsXG4gICAgICAgIG1pbldpZHRoOiB0aGlzLmNhbGN1bGF0ZWRNaW5XaWR0aCxcbiAgICAgICAgbWF4V2lkdGg6IHRoaXMuY2FsY3VsYXRlZE1heFdpZHRoLFxuICAgICAgICB0b3A6IHRoaXMuY2FsY3VsYXRlZFRvcCxcbiAgICAgICAgbGVmdDogdGhpcy5jYWxjdWxhdGVkTGVmdCxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiB0aGlzLm9yaWdpbixcbiAgICAgICAgekluZGV4OiB0aGlzLnpJbmRleCB8fCB0aGlzLmFjdGl2ZVpJbmRleFxuICAgICAgfVxuICAgIH0sXG4gICAgdGlsZUhlaWdodCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZW5zZSA/IDM2IDogNDhcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBhY3RpdmF0b3IgKG5ld0FjdGl2YXRvciwgb2xkQWN0aXZhdG9yKSB7XG4gICAgICB0aGlzLnJlbW92ZUFjdGl2YXRvckV2ZW50cyhvbGRBY3RpdmF0b3IpXG4gICAgICB0aGlzLmFkZEFjdGl2YXRvckV2ZW50cyhuZXdBY3RpdmF0b3IpXG4gICAgfSxcbiAgICBpc0NvbnRlbnRBY3RpdmUgKHZhbCkge1xuICAgICAgdGhpcy5oYXNKdXN0Rm9jdXNlZCA9IHZhbFxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgYWN0aXZhdGUgKCkge1xuICAgICAgLy8gVGhpcyBleGlzdHMgcHJpbWFyaWx5IGZvciB2LXNlbGVjdFxuICAgICAgLy8gaGVscHMgZGV0ZXJtaW5lIHdoaWNoIHRpbGVzIHRvIGFjdGl2YXRlXG4gICAgICB0aGlzLmdldFRpbGVzKClcbiAgICAgIC8vIFVwZGF0ZSBjb29yZGluYXRlcyBhbmQgZGltZW5zaW9ucyBvZiBtZW51XG4gICAgICAvLyBhbmQgaXRzIGFjdGl2YXRvclxuICAgICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKClcbiAgICAgIC8vIFN0YXJ0IHRoZSB0cmFuc2l0aW9uXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zdGFydFRyYW5zaXRpb24pXG4gICAgICAvLyBPbmNlIHRyYW5zaXRpb25pbmcsIGNhbGN1bGF0ZSBzY3JvbGwgcG9zaXRpb25cbiAgICAgIHNldFRpbWVvdXQodGhpcy5jYWxjdWxhdGVTY3JvbGwsIDUwKVxuICAgIH0sXG4gICAgY2xvc2VDb25kaXRpb25hbCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0FjdGl2ZSAmJiB0aGlzLmNsb3NlT25DbGlja1xuICAgIH0sXG4gICAgb25SZXNpemUgKCkge1xuICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSByZXR1cm5cblxuICAgICAgLy8gQWNjb3VudCBmb3Igc2NyZWVuIHJlc2l6ZVxuICAgICAgLy8gYW5kIG9yaWVudGF0aW9uIGNoYW5nZVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgdGhpcy4kcmVmcy5jb250ZW50Lm9mZnNldFdpZHRoXG4gICAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKVxuXG4gICAgICAvLyBXaGVuIHJlc2l6aW5nIHRvIGEgc21hbGxlciB3aWR0aFxuICAgICAgLy8gY29udGVudCB3aWR0aCBpcyBldmFsdWF0ZWQgYmVmb3JlXG4gICAgICAvLyB0aGUgbmV3IGFjdGl2YXRvciB3aWR0aCBoYXMgYmVlblxuICAgICAgLy8gc2V0LCBjYXVzaW5nIGl0IHRvIG5vdCBzaXplIHByb3Blcmx5XG4gICAgICAvLyBoYWNreSBidXQgd2lsbCByZXZpc2l0IGluIHRoZSBmdXR1cmVcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpXG4gICAgICB0aGlzLnJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMudXBkYXRlRGltZW5zaW9ucywgMTAwKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LW1lbnUnLFxuICAgICAgY2xhc3M6IHsgJ3YtbWVudS0taW5saW5lJzogIXRoaXMuZnVsbFdpZHRoICYmIHRoaXMuJHNsb3RzLmFjdGl2YXRvciB9LFxuICAgICAgZGlyZWN0aXZlczogW3tcbiAgICAgICAgYXJnOiA1MDAsXG4gICAgICAgIG5hbWU6ICdyZXNpemUnLFxuICAgICAgICB2YWx1ZTogdGhpcy5vblJlc2l6ZVxuICAgICAgfV0sXG4gICAgICBvbjoge1xuICAgICAgICBrZXlkb3duOiB0aGlzLm9uS2V5RG93blxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCBbXG4gICAgICB0aGlzLmdlbkFjdGl2YXRvcigpLFxuICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudChUaGVtZVByb3ZpZGVyLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgcm9vdDogdHJ1ZSxcbiAgICAgICAgICBsaWdodDogdGhpcy5saWdodCxcbiAgICAgICAgICBkYXJrOiB0aGlzLmRhcmtcbiAgICAgICAgfVxuICAgICAgfSwgW3RoaXMuZ2VuVHJhbnNpdGlvbigpXSlcbiAgICBdKVxuICB9XG59KVxuIl19