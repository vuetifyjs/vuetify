// Mixins
import Bootable from '../../mixins/bootable';
import { factory as GroupableFactory } from '../../mixins/groupable';
// Directives
import Touch from '../../directives/touch';
// Utilities
import { addOnceEventListener, convertToUnit } from '../../util/helpers';
import mixins from '../../util/mixins';
export default mixins(Bootable, GroupableFactory('windowGroup', 'v-window-item', 'v-window')
/* @vue/component */
).extend({
    name: 'v-window-item',
    directives: {
        Touch
    },
    props: {
        reverseTransition: {
            type: [Boolean, String],
            default: undefined
        },
        transition: {
            type: [Boolean, String],
            default: undefined
        },
        value: {
            required: false
        }
    },
    data() {
        return {
            isActive: false,
            wasCancelled: false
        };
    },
    computed: {
        computedTransition() {
            if (!this.windowGroup.internalReverse) {
                return typeof this.transition !== 'undefined'
                    ? this.transition || ''
                    : this.windowGroup.computedTransition;
            }
            return typeof this.reverseTransition !== 'undefined'
                ? this.reverseTransition || ''
                : this.windowGroup.computedTransition;
        }
    },
    methods: {
        genDefaultSlot() {
            return this.$slots.default;
        },
        onAfterEnter() {
            if (this.wasCancelled) {
                this.wasCancelled = false;
                return;
            }
            requestAnimationFrame(() => {
                this.windowGroup.internalHeight = undefined;
                this.windowGroup.isActive = false;
            });
        },
        onBeforeEnter() {
            this.windowGroup.isActive = true;
        },
        onBeforeLeave(el) {
            this.windowGroup.internalHeight = convertToUnit(el.clientHeight);
        },
        onEnterCancelled() {
            this.wasCancelled = true;
        },
        onEnter(el, done) {
            const isBooted = this.windowGroup.isBooted;
            if (isBooted) {
                addOnceEventListener(el, 'transitionend', done);
            }
            requestAnimationFrame(() => {
                this.windowGroup.internalHeight = convertToUnit(el.clientHeight);
                // On initial render, there is no transition
                // Vue leaves a `enter` transition class
                // if done is called too fast
                !isBooted && setTimeout(done, 100);
            });
        }
    },
    render(h) {
        const div = h('div', {
            staticClass: 'v-window-item',
            directives: [{
                    name: 'show',
                    value: this.isActive
                }],
            on: this.$listeners
        }, this.showLazyContent(this.genDefaultSlot()));
        return h('transition', {
            props: {
                name: this.computedTransition
            },
            on: {
                afterEnter: this.onAfterEnter,
                beforeEnter: this.onBeforeEnter,
                beforeLeave: this.onBeforeLeave,
                enter: this.onEnter,
                enterCancelled: this.onEnterCancelled
            }
        }, [div]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVldpbmRvd0l0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WV2luZG93L1ZXaW5kb3dJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLFNBQVM7QUFDVCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUUsT0FBTyxJQUFJLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFFcEUsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLHdCQUF3QixDQUFBO0FBRTFDLFlBQVk7QUFDWixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGFBQWEsRUFDZCxNQUFNLG9CQUFvQixDQUFBO0FBRTNCLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBWXRDLGVBQWUsTUFBTSxDQUNuQixRQUFRLEVBQ1IsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7QUFDNUQsb0JBQW9CO0NBQ3JCLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLGVBQWU7SUFFckIsVUFBVSxFQUFFO1FBQ1YsS0FBSztLQUNOO0lBRUQsS0FBSyxFQUFFO1FBQ0wsaUJBQWlCLEVBQUU7WUFDakIsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN2QixPQUFPLEVBQUUsU0FBUztTQUNuQjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDdkIsT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsS0FBSztTQUNoQjtLQUNGO0lBRUQsSUFBSTtRQUNGLE9BQU87WUFDTCxRQUFRLEVBQUUsS0FBSztZQUNmLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxFQUFFO1FBQ1Isa0JBQWtCO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FB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QUcsQ0FBQyxDQUFDLENBQUE7SUFDWCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZXaW5kb3cgZnJvbSAnLi9WV2luZG93J1xuXG4vLyBNaXhpbnNcbmltcG9ydCBCb290YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvYm9vdGFibGUnXG5pbXBvcnQgeyBmYWN0b3J5IGFzIEdyb3VwYWJsZUZhY3RvcnkgfSBmcm9tICcuLi8uLi9taXhpbnMvZ3JvdXBhYmxlJ1xuXG4vLyBEaXJlY3RpdmVzXG5pbXBvcnQgVG91Y2ggZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaCdcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQge1xuICBhZGRPbmNlRXZlbnRMaXN0ZW5lcixcbiAgY29udmVydFRvVW5pdFxufSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5pbXBvcnQgeyBFeHRyYWN0VnVlIH0gZnJvbSAnLi8uLi8uLi91dGlsL21peGlucydcbmltcG9ydCBtaXhpbnMgZnJvbSAnLi4vLi4vdXRpbC9taXhpbnMnXG5cbi8vIFR5cGVzXG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCB7IFZOb2RlLCBWTm9kZURpcmVjdGl2ZSB9IGZyb20gJ3Z1ZS90eXBlcydcblxudHlwZSBWQmFzZVdpbmRvdyA9IEluc3RhbmNlVHlwZTx0eXBlb2YgVldpbmRvdz5cblxuaW50ZXJmYWNlIG9wdGlvbnMgZXh0ZW5kcyBWdWUge1xuICB3aW5kb3dHcm91cDogVkJhc2VXaW5kb3dcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWl4aW5zPG9wdGlvbnMgJiBFeHRyYWN0VnVlPFt0eXBlb2YgQm9vdGFibGVdPj4oXG4gIEJvb3RhYmxlLFxuICBHcm91cGFibGVGYWN0b3J5KCd3aW5kb3dHcm91cCcsICd2LXdpbmRvdy1pdGVtJywgJ3Ytd2luZG93JylcbiAgLyogQHZ1ZS9jb21wb25lbnQgKi9cbikuZXh0ZW5kKHtcbiAgbmFtZTogJ3Ytd2luZG93LWl0ZW0nLFxuXG4gIGRpcmVjdGl2ZXM6IHtcbiAgICBUb3VjaFxuICB9LFxuXG4gIHByb3BzOiB7XG4gICAgcmV2ZXJzZVRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgICAgd2FzQ2FuY2VsbGVkOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkVHJhbnNpdGlvbiAoKTogc3RyaW5nIHwgYm9vbGVhbiB7XG4gICAgICBpZiAoIXRoaXMud2luZG93R3JvdXAuaW50ZXJuYWxSZXZlcnNlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy50cmFuc2l0aW9uICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgID8gdGhpcy50cmFuc2l0aW9uIHx8ICcnXG4gICAgICAgICAgOiB0aGlzLndpbmRvd0dyb3VwLmNvbXB1dGVkVHJhbnNpdGlvblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMucmV2ZXJzZVRyYW5zaXRpb24gIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gdGhpcy5yZXZlcnNlVHJhbnNpdGlvbiB8fCAnJ1xuICAgICAgICA6IHRoaXMud2luZG93R3JvdXAuY29tcHV0ZWRUcmFuc2l0aW9uXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5EZWZhdWx0U2xvdCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kc2xvdHMuZGVmYXVsdFxuICAgIH0sXG4gICAgb25BZnRlckVudGVyICgpIHtcbiAgICAgIGlmICh0aGlzLndhc0NhbmNlbGxlZCkge1xuICAgICAgICB0aGlzLndhc0NhbmNlbGxlZCA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLndpbmRvd0dyb3VwLmludGVybmFsSGVpZ2h0ID0gdW5kZWZpbmVkXG4gICAgICAgIHRoaXMud2luZG93R3JvdXAuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9uQmVmb3JlRW50ZXIgKCkge1xuICAgICAgdGhpcy53aW5kb3dHcm91cC5pc0FjdGl2ZSA9IHRydWVcbiAgICB9LFxuICAgIG9uQmVmb3JlTGVhdmUgKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgdGhpcy53aW5kb3dHcm91cC5pbnRlcm5hbEhlaWdodCA9IGNvbnZlcnRUb1VuaXQoZWwuY2xpZW50SGVpZ2h0KVxuICAgIH0sXG4gICAgb25FbnRlckNhbmNlbGxlZCAoKSB7XG4gICAgICB0aGlzLndhc0NhbmNlbGxlZCA9IHRydWVcbiAgICB9LFxuICAgIG9uRW50ZXIgKGVsOiBIVE1MRWxlbWVudCwgZG9uZTogKCkgPT4gdm9pZCkge1xuICAgICAgY29uc3QgaXNCb290ZWQgPSB0aGlzLndpbmRvd0dyb3VwLmlzQm9vdGVkXG5cbiAgICAgIGlmIChpc0Jvb3RlZCkge1xuICAgICAgICBhZGRPbmNlRXZlbnRMaXN0ZW5lcihlbCwgJ3RyYW5zaXRpb25lbmQnLCBkb25lKVxuICAgICAgfVxuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLndpbmRvd0dyb3VwLmludGVybmFsSGVpZ2h0ID0gY29udmVydFRvVW5pdChlbC5jbGllbnRIZWlnaHQpXG5cbiAgICAgICAgLy8gT24gaW5pdGlhbCByZW5kZXIsIHRoZXJlIGlzIG5vIHRyYW5zaXRpb25cbiAgICAgICAgLy8gVnVlIGxlYXZlcyBhIGBlbnRlcmAgdHJhbnNpdGlvbiBjbGFzc1xuICAgICAgICAvLyBpZiBkb25lIGlzIGNhbGxlZCB0b28gZmFzdFxuICAgICAgICAhaXNCb290ZWQgJiYgc2V0VGltZW91dChkb25lLCAxMDApXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpOiBWTm9kZSB7XG4gICAgY29uc3QgZGl2ID0gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXdpbmRvdy1pdGVtJyxcbiAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgIG5hbWU6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IHRoaXMuaXNBY3RpdmVcbiAgICAgIH1dIGFzIFZOb2RlRGlyZWN0aXZlW10sXG4gICAgICBvbjogdGhpcy4kbGlzdGVuZXJzXG4gICAgfSwgdGhpcy5zaG93TGF6eUNvbnRlbnQodGhpcy5nZW5EZWZhdWx0U2xvdCgpKSlcblxuICAgIHJldHVybiBoKCd0cmFuc2l0aW9uJywge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgbmFtZTogdGhpcy5jb21wdXRlZFRyYW5zaXRpb25cbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBhZnRlckVudGVyOiB0aGlzLm9uQWZ0ZXJFbnRlcixcbiAgICAgICAgYmVmb3JlRW50ZXI6IHRoaXMub25CZWZvcmVFbnRlcixcbiAgICAgICAgYmVmb3JlTGVhdmU6IHRoaXMub25CZWZvcmVMZWF2ZSxcbiAgICAgICAgZW50ZXI6IHRoaXMub25FbnRlcixcbiAgICAgICAgZW50ZXJDYW5jZWxsZWQ6IHRoaXMub25FbnRlckNhbmNlbGxlZFxuICAgICAgfVxuICAgIH0sIFtkaXZdKVxuICB9XG59KVxuIl19