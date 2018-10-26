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
        closeDelay: {
            type: [Number, String],
            default: 200
        },
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
        const tooltip = h('div', this.setBackgroundColor(this.color, {
            staticClass: 'v-tooltip__content',
            'class': {
                [this.contentClass]: true,
                'menuable__content__active': this.isActive
            },
            style: this.styles,
            attrs: this.getScopeIdAttrs(),
            directives: [{
                    name: 'show',
                    value: this.isContentActive
                }],
            ref: 'content'
        }), this.showLazyContent(this.$slots.default));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRvb2x0aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVG9vbHRpcC9WVG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHdDQUF3QyxDQUFBO0FBRS9DLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVoRCxVQUFVO0FBQ1YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRWxELG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFdBQVc7SUFFakIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7SUFFM0UsS0FBSyxFQUFFO1FBQ0wsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsR0FBRztTQUNiO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsUUFBUSxFQUFFLE9BQU87UUFDakIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsR0FBRztTQUNiO1FBQ0QsR0FBRyxFQUFFO1lBQ0gs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RTtZQUNELENBQUMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCO2lCQUM5QjthQUNGLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ1IsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLFVBQVUsRUFBRSxHQUFHLEVBQUU7d0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7b0JBQ3JELENBQUM7b0JBQ0QsVUFBVSxFQUFFLEdBQUcsRUFBRTt3QkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtvQkFDdkQsQ0FBQztpQkFDRjtnQkFDRCxHQUFHLEVBQUUsV0FBVzthQUNqQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQzFCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fdG9vbHRpcHMuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgRGVsYXlhYmxlIGZyb20gJy4uLy4uL21peGlucy9kZWxheWFibGUnXG5pbXBvcnQgRGVwZW5kZW50IGZyb20gJy4uLy4uL21peGlucy9kZXBlbmRlbnQnXG5pbXBvcnQgRGV0YWNoYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvZGV0YWNoYWJsZSdcbmltcG9ydCBNZW51YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvbWVudWFibGUnXG5pbXBvcnQgVG9nZ2xlYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdG9nZ2xlYWJsZSdcblxuLy8gSGVscGVyc1xuaW1wb3J0IHsgY29udmVydFRvVW5pdCB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtdG9vbHRpcCcsXG5cbiAgbWl4aW5zOiBbQ29sb3JhYmxlLCBEZWxheWFibGUsIERlcGVuZGVudCwgRGV0YWNoYWJsZSwgTWVudWFibGUsIFRvZ2dsZWFibGVdLFxuXG4gIHByb3BzOiB7XG4gICAgY2xvc2VEZWxheToge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDIwMFxuICAgIH0sXG4gICAgZGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBmaXhlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIG9wZW5EZWxheToge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDIwMFxuICAgIH0sXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc3BhbidcbiAgICB9LFxuICAgIHRyYW5zaXRpb246IFN0cmluZyxcbiAgICB6SW5kZXg6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogKCkgPT4gKHtcbiAgICBjYWxjdWxhdGVkTWluV2lkdGg6IDAsXG4gICAgY2xvc2VEZXBlbmRlbnRzOiBmYWxzZVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNhbGN1bGF0ZWRMZWZ0ICgpIHtcbiAgICAgIGNvbnN0IHsgYWN0aXZhdG9yLCBjb250ZW50IH0gPSB0aGlzLmRpbWVuc2lvbnNcbiAgICAgIGNvbnN0IHVua25vd24gPSAhdGhpcy5ib3R0b20gJiYgIXRoaXMubGVmdCAmJiAhdGhpcy50b3AgJiYgIXRoaXMucmlnaHRcbiAgICAgIGxldCBsZWZ0ID0gMFxuXG4gICAgICBpZiAodGhpcy50b3AgfHwgdGhpcy5ib3R0b20gfHwgdW5rbm93bikge1xuICAgICAgICBsZWZ0ID0gKFxuICAgICAgICAgIGFjdGl2YXRvci5sZWZ0ICtcbiAgICAgICAgICAoYWN0aXZhdG9yLndpZHRoIC8gMikgLVxuICAgICAgICAgIChjb250ZW50LndpZHRoIC8gMilcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmxlZnQgfHwgdGhpcy5yaWdodCkge1xuICAgICAgICBsZWZ0ID0gKFxuICAgICAgICAgIGFjdGl2YXRvci5sZWZ0ICtcbiAgICAgICAgICAodGhpcy5yaWdodCA/IGFjdGl2YXRvci53aWR0aCA6IC1jb250ZW50LndpZHRoKSArXG4gICAgICAgICAgKHRoaXMucmlnaHQgPyAxMCA6IC0xMClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5udWRnZUxlZnQpIGxlZnQgLT0gcGFyc2VJbnQodGhpcy5udWRnZUxlZnQpXG4gICAgICBpZiAodGhpcy5udWRnZVJpZ2h0KSBsZWZ0ICs9IHBhcnNlSW50KHRoaXMubnVkZ2VSaWdodClcblxuICAgICAgcmV0dXJuIGAke3RoaXMuY2FsY1hPdmVyZmxvdyhsZWZ0KX1weGBcbiAgICB9LFxuICAgIGNhbGN1bGF0ZWRUb3AgKCkge1xuICAgICAgY29uc3QgeyBhY3RpdmF0b3IsIGNvbnRlbnQgfSA9IHRoaXMuZGltZW5zaW9uc1xuICAgICAgbGV0IHRvcCA9IDBcblxuICAgICAgaWYgKHRoaXMudG9wIHx8IHRoaXMuYm90dG9tKSB7XG4gICAgICAgIHRvcCA9IChcbiAgICAgICAgICBhY3RpdmF0b3IudG9wICtcbiAgICAgICAgICAodGhpcy5ib3R0b20gPyBhY3RpdmF0b3IuaGVpZ2h0IDogLWNvbnRlbnQuaGVpZ2h0KSArXG4gICAgICAgICAgKHRoaXMuYm90dG9tID8gMTAgOiAtMTApXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZWZ0IHx8IHRoaXMucmlnaHQpIHtcbiAgICAgICAgdG9wID0gKFxuICAgICAgICAgIGFjdGl2YXRvci50b3AgK1xuICAgICAgICAgIChhY3RpdmF0b3IuaGVpZ2h0IC8gMikgLVxuICAgICAgICAgIChjb250ZW50LmhlaWdodCAvIDIpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubnVkZ2VUb3ApIHRvcCAtPSBwYXJzZUludCh0aGlzLm51ZGdlVG9wKVxuICAgICAgaWYgKHRoaXMubnVkZ2VCb3R0b20pIHRvcCArPSBwYXJzZUludCh0aGlzLm51ZGdlQm90dG9tKVxuXG4gICAgICByZXR1cm4gYCR7dGhpcy5jYWxjWU92ZXJmbG93KHRvcCArIHRoaXMucGFnZVlPZmZzZXQpfXB4YFxuICAgIH0sXG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi10b29sdGlwLS10b3AnOiB0aGlzLnRvcCxcbiAgICAgICAgJ3YtdG9vbHRpcC0tcmlnaHQnOiB0aGlzLnJpZ2h0LFxuICAgICAgICAndi10b29sdGlwLS1ib3R0b20nOiB0aGlzLmJvdHRvbSxcbiAgICAgICAgJ3YtdG9vbHRpcC0tbGVmdCc6IHRoaXMubGVmdFxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWRUcmFuc2l0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24pIHJldHVybiB0aGlzLnRyYW5zaXRpb25cbiAgICAgIGlmICh0aGlzLnRvcCkgcmV0dXJuICdzbGlkZS15LXJldmVyc2UtdHJhbnNpdGlvbidcbiAgICAgIGlmICh0aGlzLnJpZ2h0KSByZXR1cm4gJ3NsaWRlLXgtdHJhbnNpdGlvbidcbiAgICAgIGlmICh0aGlzLmJvdHRvbSkgcmV0dXJuICdzbGlkZS15LXRyYW5zaXRpb24nXG4gICAgICBpZiAodGhpcy5sZWZ0KSByZXR1cm4gJ3NsaWRlLXgtcmV2ZXJzZS10cmFuc2l0aW9uJ1xuICAgIH0sXG4gICAgb2Zmc2V0WSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50b3AgfHwgdGhpcy5ib3R0b21cbiAgICB9LFxuICAgIG9mZnNldFggKCkge1xuICAgICAgcmV0dXJuIHRoaXMubGVmdCB8fCB0aGlzLnJpZ2h0XG4gICAgfSxcbiAgICBzdHlsZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogdGhpcy5jYWxjdWxhdGVkTGVmdCxcbiAgICAgICAgbWF4V2lkdGg6IGNvbnZlcnRUb1VuaXQodGhpcy5tYXhXaWR0aCksXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuaXNBY3RpdmUgPyAwLjkgOiAwLFxuICAgICAgICB0b3A6IHRoaXMuY2FsY3VsYXRlZFRvcCxcbiAgICAgICAgekluZGV4OiB0aGlzLnpJbmRleCB8fCB0aGlzLmFjdGl2ZVpJbmRleFxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnZhbHVlICYmIHRoaXMuY2FsbEFjdGl2YXRlKClcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgYWN0aXZhdGUgKCkge1xuICAgICAgLy8gVXBkYXRlIGNvb3JkaW5hdGVzIGFuZCBkaW1lbnNpb25zIG9mIG1lbnVcbiAgICAgIC8vIGFuZCBpdHMgYWN0aXZhdG9yXG4gICAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKVxuICAgICAgLy8gU3RhcnQgdGhlIHRyYW5zaXRpb25cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnN0YXJ0VHJhbnNpdGlvbilcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgY29uc3QgdG9vbHRpcCA9IGgoJ2RpdicsIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKHRoaXMuY29sb3IsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi10b29sdGlwX19jb250ZW50JyxcbiAgICAgICdjbGFzcyc6IHtcbiAgICAgICAgW3RoaXMuY29udGVudENsYXNzXTogdHJ1ZSxcbiAgICAgICAgJ21lbnVhYmxlX19jb250ZW50X19hY3RpdmUnOiB0aGlzLmlzQWN0aXZlXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGVzLFxuICAgICAgYXR0cnM6IHRoaXMuZ2V0U2NvcGVJZEF0dHJzKCksXG4gICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICBuYW1lOiAnc2hvdycsXG4gICAgICAgIHZhbHVlOiB0aGlzLmlzQ29udGVudEFjdGl2ZVxuICAgICAgfV0sXG4gICAgICByZWY6ICdjb250ZW50J1xuICAgIH0pLCB0aGlzLnNob3dMYXp5Q29udGVudCh0aGlzLiRzbG90cy5kZWZhdWx0KSlcblxuICAgIHJldHVybiBoKHRoaXMudGFnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtdG9vbHRpcCcsXG4gICAgICAnY2xhc3MnOiB0aGlzLmNsYXNzZXNcbiAgICB9LCBbXG4gICAgICBoKCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMuY29tcHV0ZWRUcmFuc2l0aW9uXG4gICAgICAgIH1cbiAgICAgIH0sIFt0b29sdGlwXSksXG4gICAgICBoKCdzcGFuJywge1xuICAgICAgICBvbjogdGhpcy5kaXNhYmxlZCA/IHt9IDoge1xuICAgICAgICAgIG1vdXNlZW50ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucnVuRGVsYXkoJ29wZW4nLCAoKSA9PiAodGhpcy5pc0FjdGl2ZSA9IHRydWUpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbW91c2VsZWF2ZTogKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ydW5EZWxheSgnY2xvc2UnLCAoKSA9PiAodGhpcy5pc0FjdGl2ZSA9IGZhbHNlKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlZjogJ2FjdGl2YXRvcidcbiAgICAgIH0sIHRoaXMuJHNsb3RzLmFjdGl2YXRvcilcbiAgICBdKVxuICB9XG59XG4iXX0=