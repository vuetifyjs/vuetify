import { VTabTransition, VTabReverseTransition } from '../transitions';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-stepper-content',
    props: {
        step: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            height: 0,
            // Must be null to allow
            // previous comparison
            isActive: null,
            isReverse: false,
            isVertical: false
        };
    },
    computed: {
        classes() {
            return {
                'v-stepper__content': true
            };
        },
        computedTransition() {
            return this.isReverse
                ? VTabReverseTransition
                : VTabTransition;
        },
        styles() {
            if (!this.isVertical)
                return {};
            return {
                height: convertToUnit(this.height)
            };
        },
        wrapperClasses() {
            return {
                'v-stepper__wrapper': true
            };
        }
    },
    watch: {
        isActive(current, previous) {
            // If active and the previous state
            // was null, is just booting up
            if (current && previous == null) {
                return (this.height = 'auto');
            }
            if (!this.isVertical)
                return;
            if (this.isActive)
                this.enter();
            else
                this.leave();
        }
    },
    mounted() {
        this.$refs.wrapper.addEventListener('transitionend', this.onTransition, false);
    },
    beforeDestroy() {
        this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
    },
    methods: {
        onTransition(e) {
            if (!this.isActive ||
                e.propertyName !== 'height')
                return;
            this.height = 'auto';
        },
        enter() {
            let scrollHeight = 0;
            // Render bug with height
            requestAnimationFrame(() => {
                scrollHeight = this.$refs.wrapper.scrollHeight;
            });
            this.height = 0;
            // Give the collapsing element time to collapse
            setTimeout(() => (this.height = (scrollHeight || 'auto')), 450);
        },
        leave() {
            this.height = this.$refs.wrapper.clientHeight;
            setTimeout(() => (this.height = 0), 10);
        },
        toggle(step, reverse) {
            this.isActive = step.toString() === this.step.toString();
            this.isReverse = reverse;
        }
    },
    render(h) {
        const contentData = {
            'class': this.classes
        };
        const wrapperData = {
            'class': this.wrapperClasses,
            style: this.styles,
            ref: 'wrapper'
        };
        if (!this.isVertical) {
            contentData.directives = [{
                    name: 'show',
                    value: this.isActive
                }];
        }
        const wrapper = h('div', wrapperData, [this.$slots.default]);
        const content = h('div', contentData, [wrapper]);
        return h(this.computedTransition, {
            on: this.$listeners
        }, [content]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlN0ZXBwZXJDb250ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlN0ZXBwZXIvVlN0ZXBwZXJDb250ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2QscUJBQXFCLEVBQ3RCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsVUFBVTtBQUNWLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUVsRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxtQkFBbUI7SUFFekIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixRQUFRLEVBQUUsSUFBSTtTQUNmO0tBQ0Y7SUFFRCxJQUFJO1FBQ0YsT0FBTztZQUNMLE1BQU0sRUFBRSxDQUFDO1lBQ1Qsd0JBQXdCO1lBQ3hCLHNCQUFzQjtZQUN0QixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU87Z0JBQ0wsb0JBQW9CLEVBQUUsSUFBSTthQUMzQixDQUFBO1FBQ0gsQ0FBQztRQUNELGtCQUFrQjtZQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTO2dCQUNuQixDQUFDLENBQUMscUJBQXFCO2dCQUN2QixDQUFDLENBQUMsY0FBYyxDQUFBO1FBQ3BCLENBQUM7UUFDRCxNQUFNO1lBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUFFLE9BQU8sRUFBRSxDQUFBO1lBRS9CLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ25DLENBQUE7UUFDSCxDQUFDO1FBQ0QsY0FBYztZQUNaLE9BQU87Z0JBQ0wsb0JBQW9C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LE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQzVELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUVoRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDaEMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3BCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBWVGFiVHJhbnNpdGlvbixcbiAgVlRhYlJldmVyc2VUcmFuc2l0aW9uXG59IGZyb20gJy4uL3RyYW5zaXRpb25zJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1zdGVwcGVyLWNvbnRlbnQnLFxuXG4gIHByb3BzOiB7XG4gICAgc3RlcDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICAvLyBNdXN0IGJlIG51bGwgdG8gYWxsb3dcbiAgICAgIC8vIHByZXZpb3VzIGNvbXBhcmlzb25cbiAgICAgIGlzQWN0aXZlOiBudWxsLFxuICAgICAgaXNSZXZlcnNlOiBmYWxzZSxcbiAgICAgIGlzVmVydGljYWw6IGZhbHNlXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1zdGVwcGVyX19jb250ZW50JzogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWRUcmFuc2l0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzUmV2ZXJzZVxuICAgICAgICA/IFZUYWJSZXZlcnNlVHJhbnNpdGlvblxuICAgICAgICA6IFZUYWJUcmFuc2l0aW9uXG4gICAgfSxcbiAgICBzdHlsZXMgKCkge1xuICAgICAgaWYgKCF0aGlzLmlzVmVydGljYWwpIHJldHVybiB7fVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBoZWlnaHQ6IGNvbnZlcnRUb1VuaXQodGhpcy5oZWlnaHQpXG4gICAgICB9XG4gICAgfSxcbiAgICB3cmFwcGVyQ2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1zdGVwcGVyX193cmFwcGVyJzogdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGlzQWN0aXZlIChjdXJyZW50LCBwcmV2aW91cykge1xuICAgICAgLy8gSWYgYWN0aXZlIGFuZCB0aGUgcHJldmlvdXMgc3RhdGVcbiAgICAgIC8vIHdhcyBudWxsLCBpcyBqdXN0IGJvb3RpbmcgdXBcbiAgICAgIGlmIChjdXJyZW50ICYmIHByZXZpb3VzID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmhlaWdodCA9ICdhdXRvJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlzVmVydGljYWwpIHJldHVyblxuXG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSkgdGhpcy5lbnRlcigpXG4gICAgICBlbHNlIHRoaXMubGVhdmUoKVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLiRyZWZzLndyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgIHRoaXMub25UcmFuc2l0aW9uLFxuICAgICAgZmFsc2VcbiAgICApXG4gIH0sXG5cbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy4kcmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAndHJhbnNpdGlvbmVuZCcsXG4gICAgICB0aGlzLm9uVHJhbnNpdGlvbixcbiAgICAgIGZhbHNlXG4gICAgKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBvblRyYW5zaXRpb24gKGUpIHtcbiAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSB8fFxuICAgICAgICBlLnByb3BlcnR5TmFtZSAhPT0gJ2hlaWdodCdcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIHRoaXMuaGVpZ2h0ID0gJ2F1dG8nXG4gICAgfSxcbiAgICBlbnRlciAoKSB7XG4gICAgICBsZXQgc2Nyb2xsSGVpZ2h0ID0gMFxuXG4gICAgICAvLyBSZW5kZXIgYnVnIHdpdGggaGVpZ2h0XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBzY3JvbGxIZWlnaHQgPSB0aGlzLiRyZWZzLndyYXBwZXIuc2Nyb2xsSGVpZ2h0XG4gICAgICB9KVxuXG4gICAgICB0aGlzLmhlaWdodCA9IDBcblxuICAgICAgLy8gR2l2ZSB0aGUgY29sbGFwc2luZyBlbGVtZW50IHRpbWUgdG8gY29sbGFwc2VcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMuaGVpZ2h0ID0gKHNjcm9sbEhlaWdodCB8fCAnYXV0bycpKSwgNDUwKVxuICAgIH0sXG4gICAgbGVhdmUgKCkge1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLiRyZWZzLndyYXBwZXIuY2xpZW50SGVpZ2h0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmhlaWdodCA9IDApLCAxMClcbiAgICB9LFxuICAgIHRvZ2dsZSAoc3RlcCwgcmV2ZXJzZSkge1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IHN0ZXAudG9TdHJpbmcoKSA9PT0gdGhpcy5zdGVwLnRvU3RyaW5nKClcbiAgICAgIHRoaXMuaXNSZXZlcnNlID0gcmV2ZXJzZVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBjb250ZW50RGF0YSA9IHtcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3Nlc1xuICAgIH1cbiAgICBjb25zdCB3cmFwcGVyRGF0YSA9IHtcbiAgICAgICdjbGFzcyc6IHRoaXMud3JhcHBlckNsYXNzZXMsXG4gICAgICBzdHlsZTogdGhpcy5zdHlsZXMsXG4gICAgICByZWY6ICd3cmFwcGVyJ1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICBjb250ZW50RGF0YS5kaXJlY3RpdmVzID0gW3tcbiAgICAgICAgbmFtZTogJ3Nob3cnLFxuICAgICAgICB2YWx1ZTogdGhpcy5pc0FjdGl2ZVxuICAgICAgfV1cbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVyID0gaCgnZGl2Jywgd3JhcHBlckRhdGEsIFt0aGlzLiRzbG90cy5kZWZhdWx0XSlcbiAgICBjb25zdCBjb250ZW50ID0gaCgnZGl2JywgY29udGVudERhdGEsIFt3cmFwcGVyXSlcblxuICAgIHJldHVybiBoKHRoaXMuY29tcHV0ZWRUcmFuc2l0aW9uLCB7XG4gICAgICBvbjogdGhpcy4kbGlzdGVuZXJzXG4gICAgfSwgW2NvbnRlbnRdKVxuICB9XG59XG4iXX0=