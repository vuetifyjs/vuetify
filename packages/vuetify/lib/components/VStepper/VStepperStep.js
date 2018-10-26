// Components
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import { inject as RegistrableInject } from '../../mixins/registrable';
// Directives
import Ripple from '../../directives/ripple';
/* @vue/component */
export default {
    name: 'v-stepper-step',
    directives: { Ripple: Ripple },
    mixins: [Colorable, RegistrableInject('stepper', 'v-stepper-step', 'v-stepper')],
    inject: ['stepClick'],
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        complete: Boolean,
        completeIcon: {
            type: String,
            default: '$vuetify.icons.complete'
        },
        editIcon: {
            type: String,
            default: '$vuetify.icons.edit'
        },
        errorIcon: {
            type: String,
            default: '$vuetify.icons.error'
        },
        editable: Boolean,
        rules: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        step: [Number, String]
    },
    data: function data() {
        return {
            isActive: false,
            isInactive: true
        };
    },

    computed: {
        classes: function classes() {
            return {
                'v-stepper__step': true,
                'v-stepper__step--active': this.isActive,
                'v-stepper__step--editable': this.editable,
                'v-stepper__step--inactive': this.isInactive,
                'v-stepper__step--error': this.hasError,
                'v-stepper__step--complete': this.complete,
                'error--text': this.hasError
            };
        },
        hasError: function hasError() {
            return this.rules.some(function (i) {
                return i() !== true;
            });
        }
    },
    mounted: function mounted() {
        this.stepper && this.stepper.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.stepper && this.stepper.unregister(this);
    },

    methods: {
        click: function click(e) {
            e.stopPropagation();
            if (this.editable) {
                this.stepClick(this.step);
            }
        },
        toggle: function toggle(step) {
            this.isActive = step.toString() === this.step.toString();
            this.isInactive = Number(step) < Number(this.step);
        }
    },
    render: function render(h) {
        var data = {
            'class': this.classes,
            directives: [{
                name: 'ripple',
                value: this.editable
            }],
            on: { click: this.click }
        };
        var stepContent = void 0;
        if (this.hasError) {
            stepContent = [h(VIcon, {}, this.errorIcon)];
        } else if (this.complete) {
            if (this.editable) {
                stepContent = [h(VIcon, {}, this.editIcon)];
            } else {
                stepContent = [h(VIcon, {}, this.completeIcon)];
            }
        } else {
            stepContent = this.step;
        }
        var color = !this.hasError && (this.complete || this.isActive) ? this.color : false;
        var step = h('span', this.setBackgroundColor(color, {
            staticClass: 'v-stepper__step__step'
        }), stepContent);
        var label = h('div', {
            staticClass: 'v-stepper__label'
        }, this.$slots.default);
        return h('div', data, [step, label]);
    }
};
//# sourceMappingURL=VStepperStep.js.map