// Components
import { VTabTransition, VTabReverseTransition } from '../transitions';
// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-stepper-content',
    mixins: [
        RegistrableInject('stepper', 'v-stepper-content', 'v-stepper')
    ],
    inject: {
        isVerticalProvided: {
            from: 'isVertical'
        }
    },
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
            isVertical: this.isVerticalProvided
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
        this.stepper && this.stepper.register(this);
    },
    beforeDestroy() {
        this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
        this.stepper && this.stepper.unregister(this);
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
            setTimeout(() => this.isActive && (this.height = (scrollHeight || 'auto')), 450);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlN0ZXBwZXJDb250ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlN0ZXBwZXIvVlN0ZXBwZXJDb250ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGFBQWE7QUFDYixPQUFPLEVBQ0wsY0FBYyxFQUNkLHFCQUFxQixFQUN0QixNQUFNLGdCQUFnQixDQUFBO0FBRXZCLFNBQVM7QUFDVCxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFdEUsVUFBVTtBQUNWLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUVsRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxtQkFBbUI7SUFFekIsTUFBTSxFQUFFO1FBQ04saUJBQWlCLENBQUMsU0FBUyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsQ0FBQztLQUMvRDtJQUVELE1BQU0sRUFBRTtRQUNOLGtCQUFrQixFQUFFO1lBQ2xCLElBQUksRUFBRSxZQUFZO1NBQ25CO0tBQ0Y7SUFFRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7S0FDRjtJQUVELElBQUk7UUFDRixPQUFPO1lBQ0wsTUFBTSxFQUFFLENBQUM7WUFDVCx3QkFBd0I7WUFDeEIsc0JBQXNCO1lBQ3RCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7U0FDcEMsQ0FBQTtJQUNILENBQUM7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCxvQkFBb0IsRUFBRSxJQUFJO2FBQzNCLENBQUE7UUFDSCxDQUFDO1FBQ0Qsa0JBQWtCO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVM7Z0JBQ25CLENBQUMs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QUM7UUFDUCxNQUFNLFdBQVcsR0FBRztZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQTtRQUNELE1BQU0sV0FBVyxHQUFHO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYztZQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsR0FBRyxFQUFFLFNBQVM7U0FDZixDQUFBO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsV0FBVyxDQUFDLFVBQVUsR0FBRyxDQUFDO29CQUN4QixJQUFJLEVBQUUsTUFBTTtvQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7aUJBQ3JCLENBQUMsQ0FBQTtTQUNIO1FBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDNUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBRWhELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNoQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvbXBvbmVudHNcbmltcG9ydCB7XG4gIFZUYWJUcmFuc2l0aW9uLFxuICBWVGFiUmV2ZXJzZVRyYW5zaXRpb25cbn0gZnJvbSAnLi4vdHJhbnNpdGlvbnMnXG5cbi8vIE1peGluc1xuaW1wb3J0IHsgaW5qZWN0IGFzIFJlZ2lzdHJhYmxlSW5qZWN0IH0gZnJvbSAnLi4vLi4vbWl4aW5zL3JlZ2lzdHJhYmxlJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1zdGVwcGVyLWNvbnRlbnQnLFxuXG4gIG1peGluczogW1xuICAgIFJlZ2lzdHJhYmxlSW5qZWN0KCdzdGVwcGVyJywgJ3Ytc3RlcHBlci1jb250ZW50JywgJ3Ytc3RlcHBlcicpXG4gIF0sXG5cbiAgaW5qZWN0OiB7XG4gICAgaXNWZXJ0aWNhbFByb3ZpZGVkOiB7XG4gICAgICBmcm9tOiAnaXNWZXJ0aWNhbCdcbiAgICB9XG4gIH0sXG5cbiAgcHJvcHM6IHtcbiAgICBzdGVwOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIC8vIE11c3QgYmUgbnVsbCB0byBhbGxvd1xuICAgICAgLy8gcHJldmlvdXMgY29tcGFyaXNvblxuICAgICAgaXNBY3RpdmU6IG51bGwsXG4gICAgICBpc1JldmVyc2U6IGZhbHNlLFxuICAgICAgaXNWZXJ0aWNhbDogdGhpcy5pc1ZlcnRpY2FsUHJvdmlkZWRcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LXN0ZXBwZXJfX2NvbnRlbnQnOiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wdXRlZFRyYW5zaXRpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNSZXZlcnNlXG4gICAgICAgID8gVlRhYlJldmVyc2VUcmFuc2l0aW9uXG4gICAgICAgIDogVlRhYlRyYW5zaXRpb25cbiAgICB9LFxuICAgIHN0eWxlcyAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNWZXJ0aWNhbCkgcmV0dXJuIHt9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhlaWdodDogY29udmVydFRvVW5pdCh0aGlzLmhlaWdodClcbiAgICAgIH1cbiAgICB9LFxuICAgIHdyYXBwZXJDbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LXN0ZXBwZXJfX3dyYXBwZXInOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaXNBY3RpdmUgKGN1cnJlbnQsIHByZXZpb3VzKSB7XG4gICAgICAvLyBJZiBhY3RpdmUgYW5kIHRoZSBwcmV2aW91cyBzdGF0ZVxuICAgICAgLy8gd2FzIG51bGwsIGlzIGp1c3QgYm9vdGluZyB1cFxuICAgICAgaWYgKGN1cnJlbnQgJiYgcHJldmlvdXMgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaGVpZ2h0ID0gJ2F1dG8nKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaXNWZXJ0aWNhbCkgcmV0dXJuXG5cbiAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB0aGlzLmVudGVyKClcbiAgICAgIGVsc2UgdGhpcy5sZWF2ZSgpXG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMuJHJlZnMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgdGhpcy5vblRyYW5zaXRpb24sXG4gICAgICBmYWxzZVxuICAgIClcbiAgICB0aGlzLnN0ZXBwZXIgJiYgdGhpcy5zdGVwcGVyLnJlZ2lzdGVyKHRoaXMpXG4gIH0sXG5cbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy4kcmVmcy53cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAndHJhbnNpdGlvbmVuZCcsXG4gICAgICB0aGlzLm9uVHJhbnNpdGlvbixcbiAgICAgIGZhbHNlXG4gICAgKVxuICAgIHRoaXMuc3RlcHBlciAmJiB0aGlzLnN0ZXBwZXIudW5yZWdpc3Rlcih0aGlzKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBvblRyYW5zaXRpb24gKGUpIHtcbiAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSB8fFxuICAgICAgICBlLnByb3BlcnR5TmFtZSAhPT0gJ2hlaWdodCdcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIHRoaXMuaGVpZ2h0ID0gJ2F1dG8nXG4gICAgfSxcbiAgICBlbnRlciAoKSB7XG4gICAgICBsZXQgc2Nyb2xsSGVpZ2h0ID0gMFxuXG4gICAgICAvLyBSZW5kZXIgYnVnIHdpdGggaGVpZ2h0XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBzY3JvbGxIZWlnaHQgPSB0aGlzLiRyZWZzLndyYXBwZXIuc2Nyb2xsSGVpZ2h0XG4gICAgICB9KVxuXG4gICAgICB0aGlzLmhlaWdodCA9IDBcblxuICAgICAgLy8gR2l2ZSB0aGUgY29sbGFwc2luZyBlbGVtZW50IHRpbWUgdG8gY29sbGFwc2VcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc0FjdGl2ZSAmJiAodGhpcy5oZWlnaHQgPSAoc2Nyb2xsSGVpZ2h0IHx8ICdhdXRvJykpLCA0NTApXG4gICAgfSxcbiAgICBsZWF2ZSAoKSB7XG4gICAgICB0aGlzLmhlaWdodCA9IHRoaXMuJHJlZnMud3JhcHBlci5jbGllbnRIZWlnaHRcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMuaGVpZ2h0ID0gMCksIDEwKVxuICAgIH0sXG4gICAgdG9nZ2xlIChzdGVwLCByZXZlcnNlKSB7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gc3RlcC50b1N0cmluZygpID09PSB0aGlzLnN0ZXAudG9TdHJpbmcoKVxuICAgICAgdGhpcy5pc1JldmVyc2UgPSByZXZlcnNlXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IGNvbnRlbnREYXRhID0ge1xuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzXG4gICAgfVxuICAgIGNvbnN0IHdyYXBwZXJEYXRhID0ge1xuICAgICAgJ2NsYXNzJzogdGhpcy53cmFwcGVyQ2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlcyxcbiAgICAgIHJlZjogJ3dyYXBwZXInXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgIGNvbnRlbnREYXRhLmRpcmVjdGl2ZXMgPSBbe1xuICAgICAgICBuYW1lOiAnc2hvdycsXG4gICAgICAgIHZhbHVlOiB0aGlzLmlzQWN0aXZlXG4gICAgICB9XVxuICAgIH1cblxuICAgIGNvbnN0IHdyYXBwZXIgPSBoKCdkaXYnLCB3cmFwcGVyRGF0YSwgW3RoaXMuJHNsb3RzLmRlZmF1bHRdKVxuICAgIGNvbnN0IGNvbnRlbnQgPSBoKCdkaXYnLCBjb250ZW50RGF0YSwgW3dyYXBwZXJdKVxuXG4gICAgcmV0dXJuIGgodGhpcy5jb21wdXRlZFRyYW5zaXRpb24sIHtcbiAgICAgIG9uOiB0aGlzLiRsaXN0ZW5lcnNcbiAgICB9LCBbY29udGVudF0pXG4gIH1cbn1cbiJdfQ==