// Components
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import { inject as RegistrableInject } from '../../mixins/registrable';
// Directives
import Ripple from '../../directives/ripple';
// Util
import mixins from '../../util/mixins';
export default mixins(Colorable, RegistrableInject('stepper', 'v-stepper-step', 'v-stepper')
/* @vue/component */
).extend({
    name: 'v-stepper-step',
    directives: { Ripple: Ripple },
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
            default: function () { return []; }
        },
        step: [Number, String]
    },
    data: function () {
        return {
            isActive: false,
            isInactive: true
        };
    },
    computed: {
        classes: function () {
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
        hasError: function () {
            return this.rules.some(function (validate) { return validate() !== true; });
        }
    },
    mounted: function () {
        this.stepper && this.stepper.register(this);
    },
    beforeDestroy: function () {
        this.stepper && this.stepper.unregister(this);
    },
    methods: {
        click: function (e) {
            e.stopPropagation();
            this.$emit('click', e);
            if (this.editable) {
                this.stepClick(this.step);
            }
        },
        toggle: function (step) {
            this.isActive = step.toString() === this.step.toString();
            this.isInactive = Number(step) < Number(this.step);
        }
    },
    render: function (h) {
        var data = {
            'class': this.classes,
            directives: [{
                    name: 'ripple',
                    value: this.editable
                }],
            on: { click: this.click }
        };
        var stepContent;
        if (this.hasError) {
            stepContent = [h(VIcon, {}, this.errorIcon)];
        }
        else if (this.complete) {
            if (this.editable) {
                stepContent = [h(VIcon, {}, this.editIcon)];
            }
            else {
                stepContent = [h(VIcon, {}, this.completeIcon)];
            }
        }
        else {
            stepContent = String(this.step);
        }
        var color = (!this.hasError && (this.complete || this.isActive)) ? this.color : false;
        var step = h('span', this.setBackgroundColor(color, {
            staticClass: 'v-stepper__step__step'
        }), stepContent);
        var label = h('div', {
            staticClass: 'v-stepper__label'
        }, this.$slots.default);
        return h('div', data, [step, label]);
    }
});
//# sourceMappingURL=VStepperStep.js.map
//# sourceMappingURL=VStepperStep.js.map
//# sourceMappingURL=VStepperStep.js.map