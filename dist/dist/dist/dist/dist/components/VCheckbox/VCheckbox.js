var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_selection-controls.styl';
// Components
import VIcon from '../VIcon';
// import { VFadeTransition } from '../transitions'
// Mixins
import Selectable from '../../mixins/selectable';
/* @vue/component */
export default {
    name: 'v-checkbox',
    mixins: [
        Selectable
    ],
    props: {
        indeterminate: Boolean,
        indeterminateIcon: {
            type: String,
            default: '$vuetify.icons.checkboxIndeterminate'
        },
        onIcon: {
            type: String,
            default: '$vuetify.icons.checkboxOn'
        },
        offIcon: {
            type: String,
            default: '$vuetify.icons.checkboxOff'
        }
    },
    data: function (vm) {
        return ({
            inputIndeterminate: vm.indeterminate
        });
    },
    computed: {
        classes: function () {
            return {
                'v-input--selection-controls': true,
                'v-input--checkbox': true
            };
        },
        computedIcon: function () {
            if (this.inputIndeterminate) {
                return this.indeterminateIcon;
            }
            else if (this.isActive) {
                return this.onIcon;
            }
            else {
                return this.offIcon;
            }
        }
    },
    watch: {
        indeterminate: function (val) {
            this.inputIndeterminate = val;
        }
    },
    methods: {
        genCheckbox: function () {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [
                this.genInput('checkbox', __assign({}, this.$attrs, { 'aria-checked': this.inputIndeterminate
                        ? 'mixed'
                        : this.isActive.toString() })),
                this.genRipple(this.setTextColor(this.computedColor)),
                this.$createElement(VIcon, this.setTextColor(this.computedColor, {
                    props: {
                        dark: this.dark,
                        light: this.light
                    }
                }), this.computedIcon)
            ]);
        },
        genDefaultSlot: function () {
            return [
                this.genCheckbox(),
                this.genLabel()
            ];
        }
    }
};
//# sourceMappingURL=VCheckbox.js.map
//# sourceMappingURL=VCheckbox.js.map
//# sourceMappingURL=VCheckbox.js.map
//# sourceMappingURL=VCheckbox.js.map
//# sourceMappingURL=VCheckbox.js.map