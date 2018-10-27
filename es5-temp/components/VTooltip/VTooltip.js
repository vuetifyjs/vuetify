import '../../stylus/components/_tooltips.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Delayable from '../../mixins/delayable';
import Dependent from '../../mixins/dependent';
import Detachable from '../../mixins/detachable';
import Menuable from '../../mixins/menuable';
import Toggleable from '../../mixins/toggleable';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-tooltip',
    mixins: [Colorable, Delayable, Dependent, Detachable, Menuable, Toggleable],
    props: {
        debounce: {
            type: [Number, String],
            default: 0
        },
        disabled: Boolean,
        fixed: {
            type: Boolean,
            default: true
        },
        openDelay: {
            type: [Number, String],
            default: 200
        },
        tag: {
            type: String,
            default: 'span'
        },
        transition: String,
        zIndex: {
            default: null
        }
    },
    data: () => ({
        calculatedMinWidth: 0,
        closeDependents: false
    }),
    computed: {
        calculatedLeft() {
            const { activator, content } = this.dimensions;
            const unknown = !this.bottom && !this.left && !this.top && !this.right;
            let left = 0;
            if (this.top || this.bottom || unknown) {
                left = (activator.left +
                    (activator.width / 2) -
                    (content.width / 2));
            }
            else if (this.left || this.right) {
                left = (activator.left +
                    (this.right ? activator.width : -content.width) +
                    (this.right ? 10 : -10));
            }
            if (this.nudgeLeft)
                left -= parseInt(this.nudgeLeft);
            if (this.nudgeRight)
                left += parseInt(this.nudgeRight);
            return `${this.calcXOverflow(left)}px`;
        },
        calculatedTop() {
            const { activator, content } = this.dimensions;
            let top = 0;
            if (this.top || this.bottom) {
                top = (activator.top +
                    (this.bottom ? activator.height : -content.height) +
                    (this.bottom ? 10 : -10));
            }
            else if (this.left || this.right) {
                top = (activator.top +
                    (activator.height / 2) -
                    (content.height / 2));
            }
            if (this.nudgeTop)
                top -= parseInt(this.nudgeTop);
            if (this.nudgeBottom)
                top += parseInt(this.nudgeBottom);
            return `${this.calcYOverflow(top + this.pageYOffset)}px`;
        },
        classes() {
            return {
                'v-tooltip--top': this.top,
                'v-tooltip--right': this.right,
                'v-tooltip--bottom': this.bottom,
                'v-tooltip--left': this.left
            };
        },
        computedTransition() {
            if (this.transition)
                return this.transition;
            if (this.top)
                return 'slide-y-reverse-transition';
            if (this.right)
                return 'slide-x-transition';
            if (this.bottom)
                return 'slide-y-transition';
            if (this.left)
                return 'slide-x-reverse-transition';
        },
        offsetY() {
            return this.top || this.bottom;
        },
        offsetX() {
            return this.left || this.right;
        },
        styles() {
            return {
                left: this.calculatedLeft,
                maxWidth: convertToUnit(this.maxWidth),
                opacity: this.isActive ? 0.9 : 0,
                top: this.calculatedTop,
                zIndex: this.zIndex || this.activeZIndex
            };
        }
    },
    mounted() {
        this.value && this.callActivate();
    },
    methods: {
        activate() {
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(this.startTransition);
        }
    },
    render(h) {
        const tooltip = h('div', {
            staticClass: 'v-tooltip__content',
            'class': this.addBackgroundColorClassChecks({
                [this.contentClass]: true,
                'menuable__content__active': this.isActive
            }),
            style: this.styles,
            attrs: this.getScopeIdAttrs(),
            directives: [{
                    name: 'show',
                    value: this.isContentActive
                }],
            ref: 'content'
        }, this.showLazyContent(this.$slots.default));
        return h(this.tag, {
            staticClass: 'v-tooltip',
            'class': this.classes
        }, [
            h('transition', {
                props: {
                    name: this.computedTransition
                }
            }, [tooltip]),
            h('span', {
                on: this.disabled ? {} : {
                    mouseenter: () => {
                        this.runDelay('open', () => (this.isActive = true));
                    },
                    mouseleave: () => {
                        this.runDelay('close', () => (this.isActive = false));
                    }
                },
                ref: 'activator'
            }, this.$slots.activator)
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRvb2x0aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVG9vbHRpcC9WVG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHdDQUF3QyxDQUFBO0FBRS9DLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVoRCxVQUFVO0FBQ1YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRWxELG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFdBQVc7SUFFakIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7SUFFM0UsS0FBSyxFQUFFO1FBQ0wsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsUUFBUSxFQUFFLE9BQU87UUFDakIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsR0FBRztTQUNiO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELFVBQVUsRUFBRSxNQUFNO1FBQ2xCLE1BQU0sRUFBRTtZQUNO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QU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDUixFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsVUFBVSxFQUFFLEdBQUcsRUFBRTt3QkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDckQsQ0FBQztvQkFDRCxVQUFVLEVBQUUsR0FBRyxFQUFFO3dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFBO29CQUN2RCxDQUFDO2lCQUNGO2dCQUNELEdBQUcsRUFBRSxXQUFXO2FBQ2pCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDMUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL190b29sdGlwcy5zdHlsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbG9yYWJsZSdcbmltcG9ydCBEZWxheWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2RlbGF5YWJsZSdcbmltcG9ydCBEZXBlbmRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL2RlcGVuZGVudCdcbmltcG9ydCBEZXRhY2hhYmxlIGZyb20gJy4uLy4uL21peGlucy9kZXRhY2hhYmxlJ1xuaW1wb3J0IE1lbnVhYmxlIGZyb20gJy4uLy4uL21peGlucy9tZW51YWJsZSdcbmltcG9ydCBUb2dnbGVhYmxlIGZyb20gJy4uLy4uL21peGlucy90b2dnbGVhYmxlJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi10b29sdGlwJyxcblxuICBtaXhpbnM6IFtDb2xvcmFibGUsIERlbGF5YWJsZSwgRGVwZW5kZW50LCBEZXRhY2hhYmxlLCBNZW51YWJsZSwgVG9nZ2xlYWJsZV0sXG5cbiAgcHJvcHM6IHtcbiAgICBkZWJvdW5jZToge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGZpeGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgb3BlbkRlbGF5OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMjAwXG4gICAgfSxcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdzcGFuJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbjogU3RyaW5nLFxuICAgIHpJbmRleDoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH1cbiAgfSxcblxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGNhbGN1bGF0ZWRNaW5XaWR0aDogMCxcbiAgICBjbG9zZURlcGVuZGVudHM6IGZhbHNlXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2FsY3VsYXRlZExlZnQgKCkge1xuICAgICAgY29uc3QgeyBhY3RpdmF0b3IsIGNvbnRlbnQgfSA9IHRoaXMuZGltZW5zaW9uc1xuICAgICAgY29uc3QgdW5rbm93biA9ICF0aGlzLmJvdHRvbSAmJiAhdGhpcy5sZWZ0ICYmICF0aGlzLnRvcCAmJiAhdGhpcy5yaWdodFxuICAgICAgbGV0IGxlZnQgPSAwXG5cbiAgICAgIGlmICh0aGlzLnRvcCB8fCB0aGlzLmJvdHRvbSB8fCB1bmtub3duKSB7XG4gICAgICAgIGxlZnQgPSAoXG4gICAgICAgICAgYWN0aXZhdG9yLmxlZnQgK1xuICAgICAgICAgIChhY3RpdmF0b3Iud2lkdGggLyAyKSAtXG4gICAgICAgICAgKGNvbnRlbnQud2lkdGggLyAyKVxuICAgICAgICApXG4gICAgICB9IGVsc2UgaWYgKHRoaXMubGVmdCB8fCB0aGlzLnJpZ2h0KSB7XG4gICAgICAgIGxlZnQgPSAoXG4gICAgICAgICAgYWN0aXZhdG9yLmxlZnQgK1xuICAgICAgICAgICh0aGlzLnJpZ2h0ID8gYWN0aXZhdG9yLndpZHRoIDogLWNvbnRlbnQud2lkdGgpICtcbiAgICAgICAgICAodGhpcy5yaWdodCA/IDEwIDogLTEwKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm51ZGdlTGVmdCkgbGVmdCAtPSBwYXJzZUludCh0aGlzLm51ZGdlTGVmdClcbiAgICAgIGlmICh0aGlzLm51ZGdlUmlnaHQpIGxlZnQgKz0gcGFyc2VJbnQodGhpcy5udWRnZVJpZ2h0KVxuXG4gICAgICByZXR1cm4gYCR7dGhpcy5jYWxjWE92ZXJmbG93KGxlZnQpfXB4YFxuICAgIH0sXG4gICAgY2FsY3VsYXRlZFRvcCAoKSB7XG4gICAgICBjb25zdCB7IGFjdGl2YXRvciwgY29udGVudCB9ID0gdGhpcy5kaW1lbnNpb25zXG4gICAgICBsZXQgdG9wID0gMFxuXG4gICAgICBpZiAodGhpcy50b3AgfHwgdGhpcy5ib3R0b20pIHtcbiAgICAgICAgdG9wID0gKFxuICAgICAgICAgIGFjdGl2YXRvci50b3AgK1xuICAgICAgICAgICh0aGlzLmJvdHRvbSA/IGFjdGl2YXRvci5oZWlnaHQgOiAtY29udGVudC5oZWlnaHQpICtcbiAgICAgICAgICAodGhpcy5ib3R0b20gPyAxMCA6IC0xMClcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmxlZnQgfHwgdGhpcy5yaWdodCkge1xuICAgICAgICB0b3AgPSAoXG4gICAgICAgICAgYWN0aXZhdG9yLnRvcCArXG4gICAgICAgICAgKGFjdGl2YXRvci5oZWlnaHQgLyAyKSAtXG4gICAgICAgICAgKGNvbnRlbnQuaGVpZ2h0IC8gMilcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5udWRnZVRvcCkgdG9wIC09IHBhcnNlSW50KHRoaXMubnVkZ2VUb3ApXG4gICAgICBpZiAodGhpcy5udWRnZUJvdHRvbSkgdG9wICs9IHBhcnNlSW50KHRoaXMubnVkZ2VCb3R0b20pXG5cbiAgICAgIHJldHVybiBgJHt0aGlzLmNhbGNZT3ZlcmZsb3codG9wICsgdGhpcy5wYWdlWU9mZnNldCl9cHhgXG4gICAgfSxcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LXRvb2x0aXAtLXRvcCc6IHRoaXMudG9wLFxuICAgICAgICAndi10b29sdGlwLS1yaWdodCc6IHRoaXMucmlnaHQsXG4gICAgICAgICd2LXRvb2x0aXAtLWJvdHRvbSc6IHRoaXMuYm90dG9tLFxuICAgICAgICAndi10b29sdGlwLS1sZWZ0JzogdGhpcy5sZWZ0XG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wdXRlZFRyYW5zaXRpb24gKCkge1xuICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbikgcmV0dXJuIHRoaXMudHJhbnNpdGlvblxuICAgICAgaWYgKHRoaXMudG9wKSByZXR1cm4gJ3NsaWRlLXktcmV2ZXJzZS10cmFuc2l0aW9uJ1xuICAgICAgaWYgKHRoaXMucmlnaHQpIHJldHVybiAnc2xpZGUteC10cmFuc2l0aW9uJ1xuICAgICAgaWYgKHRoaXMuYm90dG9tKSByZXR1cm4gJ3NsaWRlLXktdHJhbnNpdGlvbidcbiAgICAgIGlmICh0aGlzLmxlZnQpIHJldHVybiAnc2xpZGUteC1yZXZlcnNlLXRyYW5zaXRpb24nXG4gICAgfSxcbiAgICBvZmZzZXRZICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvcCB8fCB0aGlzLmJvdHRvbVxuICAgIH0sXG4gICAgb2Zmc2V0WCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5sZWZ0IHx8IHRoaXMucmlnaHRcbiAgICB9LFxuICAgIHN0eWxlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiB0aGlzLmNhbGN1bGF0ZWRMZWZ0LFxuICAgICAgICBtYXhXaWR0aDogY29udmVydFRvVW5pdCh0aGlzLm1heFdpZHRoKSxcbiAgICAgICAgb3BhY2l0eTogdGhpcy5pc0FjdGl2ZSA/IDAuOSA6IDAsXG4gICAgICAgIHRvcDogdGhpcy5jYWxjdWxhdGVkVG9wLFxuICAgICAgICB6SW5kZXg6IHRoaXMuekluZGV4IHx8IHRoaXMuYWN0aXZlWkluZGV4XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMudmFsdWUgJiYgdGhpcy5jYWxsQWN0aXZhdGUoKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBhY3RpdmF0ZSAoKSB7XG4gICAgICAvLyBVcGRhdGUgY29vcmRpbmF0ZXMgYW5kIGRpbWVuc2lvbnMgb2YgbWVudVxuICAgICAgLy8gYW5kIGl0cyBhY3RpdmF0b3JcbiAgICAgIHRoaXMudXBkYXRlRGltZW5zaW9ucygpXG4gICAgICAvLyBTdGFydCB0aGUgdHJhbnNpdGlvblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc3RhcnRUcmFuc2l0aW9uKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCB0b29sdGlwID0gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXRvb2x0aXBfX2NvbnRlbnQnLFxuICAgICAgJ2NsYXNzJzogdGhpcy5hZGRCYWNrZ3JvdW5kQ29sb3JDbGFzc0NoZWNrcyh7XG4gICAgICAgIFt0aGlzLmNvbnRlbnRDbGFzc106IHRydWUsXG4gICAgICAgICdtZW51YWJsZV9fY29udGVudF9fYWN0aXZlJzogdGhpcy5pc0FjdGl2ZVxuICAgICAgfSksXG4gICAgICBzdHlsZTogdGhpcy5zdHlsZXMsXG4gICAgICBhdHRyczogdGhpcy5nZXRTY29wZUlkQXR0cnMoKSxcbiAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgIG5hbWU6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IHRoaXMuaXNDb250ZW50QWN0aXZlXG4gICAgICB9XSxcbiAgICAgIHJlZjogJ2NvbnRlbnQnXG4gICAgfSwgdGhpcy5zaG93TGF6eUNvbnRlbnQodGhpcy4kc2xvdHMuZGVmYXVsdCkpXG5cbiAgICByZXR1cm4gaCh0aGlzLnRhZywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXRvb2x0aXAnLFxuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzXG4gICAgfSwgW1xuICAgICAgaCgndHJhbnNpdGlvbicsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBuYW1lOiB0aGlzLmNvbXB1dGVkVHJhbnNpdGlvblxuICAgICAgICB9XG4gICAgICB9LCBbdG9vbHRpcF0pLFxuICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgb246IHRoaXMuZGlzYWJsZWQgPyB7fSA6IHtcbiAgICAgICAgICBtb3VzZWVudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJ1bkRlbGF5KCdvcGVuJywgKCkgPT4gKHRoaXMuaXNBY3RpdmUgPSB0cnVlKSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1vdXNlbGVhdmU6ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucnVuRGVsYXkoJ2Nsb3NlJywgKCkgPT4gKHRoaXMuaXNBY3RpdmUgPSBmYWxzZSkpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZWY6ICdhY3RpdmF0b3InXG4gICAgICB9LCB0aGlzLiRzbG90cy5hY3RpdmF0b3IpXG4gICAgXSlcbiAgfVxufVxuIl19