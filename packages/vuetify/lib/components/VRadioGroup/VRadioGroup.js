// Styles
import '../../../src/stylus/components/_selection-controls.styl';
import '../../../src/stylus/components/_radio-group.styl';
// Components
import VInput from '../VInput';
// Mixins
import Comparable from '../../mixins/comparable';
import { provide as RegistrableProvide } from '../../mixins/registrable';
/* @vue/component */
export default {
    name: 'v-radio-group',
    extends: VInput,
    mixins: [Comparable, RegistrableProvide('radio')],
    model: {
        prop: 'value',
        event: 'change'
    },
    provide: function provide() {
        return {
            radio: this
        };
    },

    props: {
        column: {
            type: Boolean,
            default: true
        },
        height: {
            type: [Number, String],
            default: 'auto'
        },
        mandatory: {
            type: Boolean,
            default: true
        },
        name: String,
        row: Boolean,
        // If no value set on VRadio
        // will match valueComparator
        // force default to null
        value: {
            default: null
        }
    },
    data: function data() {
        return {
            internalTabIndex: -1,
            radios: []
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-input--selection-controls v-input--radio-group': true,
                'v-input--radio-group--column': this.column && !this.row,
                'v-input--radio-group--row': this.row
            };
        }
    },
    watch: {
        hasError: 'setErrorState',
        internalValue: 'setActiveRadio'
    },
    mounted: function mounted() {
        this.setErrorState(this.hasError);
        this.setActiveRadio();
    },

    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return this.$createElement('div', {
                staticClass: 'v-input--radio-group__input',
                attrs: {
                    role: 'radiogroup'
                }
            }, VInput.methods.genDefaultSlot.call(this));
        },
        onRadioChange: function onRadioChange(value) {
            if (this.disabled) return;
            this.hasInput = true;
            this.internalValue = value;
            this.setActiveRadio();
            this.$nextTick(this.validate);
        },
        onRadioBlur: function onRadioBlur(e) {
            if (!e.relatedTarget || !e.relatedTarget.classList.contains('v-radio')) {
                this.hasInput = true;
                this.$emit('blur', e);
            }
        },
        register: function register(radio) {
            radio.isActive = this.valueComparator(this.internalValue, radio.value);
            radio.$on('change', this.onRadioChange);
            radio.$on('blur', this.onRadioBlur);
            this.radios.push(radio);
        },
        setErrorState: function setErrorState(val) {
            for (var index = this.radios.length; --index >= 0;) {
                this.radios[index].parentError = val;
            }
        },
        setActiveRadio: function setActiveRadio() {
            for (var index = this.radios.length; --index >= 0;) {
                var radio = this.radios[index];
                radio.isActive = this.valueComparator(this.internalValue, radio.value);
            }
        },
        unregister: function unregister(radio) {
            radio.$off('change', this.onRadioChange);
            radio.$off('blur', this.onRadioBlur);
            var index = this.radios.findIndex(function (r) {
                return r === radio;
            });
            /* istanbul ignore else */
            if (index > -1) this.radios.splice(index, 1);
        }
    }
};
//# sourceMappingURL=VRadioGroup.js.map