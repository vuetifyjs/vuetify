// Components
import { VTabTransition, VTabReverseTransition } from '../transitions';
// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable';
// Helpers
import { convertToUnit } from '../../util/helpers';
// Util
import mixins from '../../util/mixins';
export default mixins(RegistrableInject('stepper', 'v-stepper-content', 'v-stepper')
/* @vue/component */
).extend({
    name: 'v-stepper-content',
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
    data: function () {
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
        classes: function () {
            return {
                'v-stepper__content': true
            };
        },
        computedTransition: function () {
            return this.isReverse
                ? VTabReverseTransition
                : VTabTransition;
        },
        styles: function () {
            if (!this.isVertical)
                return {};
            return {
                height: convertToUnit(this.height)
            };
        },
        wrapperClasses: function () {
            return {
                'v-stepper__wrapper': true
            };
        }
    },
    watch: {
        isActive: function (current, previous) {
            // If active and the previous state
            // was null, is just booting up
            if (current && previous == null) {
                this.height = 'auto';
                return;
            }
            if (!this.isVertical)
                return;
            if (this.isActive)
                this.enter();
            else
                this.leave();
        }
    },
    mounted: function () {
        this.$refs.wrapper.addEventListener('transitionend', this.onTransition, false);
        this.stepper && this.stepper.register(this);
    },
    beforeDestroy: function () {
        this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
        this.stepper && this.stepper.unregister(this);
    },
    methods: {
        onTransition: function (e) {
            if (!this.isActive ||
                e.propertyName !== 'height')
                return;
            this.height = 'auto';
        },
        enter: function () {
            var _this = this;
            var scrollHeight = 0;
            // Render bug with height
            requestAnimationFrame(function () {
                scrollHeight = _this.$refs.wrapper.scrollHeight;
            });
            this.height = 0;
            // Give the collapsing element time to collapse
            setTimeout(function () { return _this.isActive && (_this.height = (scrollHeight || 'auto')); }, 450);
        },
        leave: function () {
            var _this = this;
            this.height = this.$refs.wrapper.clientHeight;
            setTimeout(function () { return (_this.height = 0); }, 10);
        },
        toggle: function (step, reverse) {
            this.isActive = step.toString() === this.step.toString();
            this.isReverse = reverse;
        }
    },
    render: function (h) {
        var contentData = {
            'class': this.classes
        };
        var wrapperData = {
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
        var wrapper = h('div', wrapperData, [this.$slots.default]);
        var content = h('div', contentData, [wrapper]);
        return h(this.computedTransition, {
            on: this.$listeners
        }, [content]);
    }
});
//# sourceMappingURL=VStepperContent.js.map