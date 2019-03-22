var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import '../../stylus/components/_selection-controls.styl';
import '../../stylus/components/_switch.styl';
// Mixins
import Selectable from '../../mixins/selectable';
// Directives
import Touch from '../../directives/touch';
// Components
import { VFabTransition } from '../transitions';
import VProgressCircular from '../VProgressCircular/VProgressCircular';
// Helpers
import { keyCodes } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-switch',
    directives: { Touch: Touch },
    mixins: [
        Selectable
    ],
    props: {
        loading: {
            type: [Boolean, String],
            default: false
        }
    },
    computed: {
        classes: function () {
            return {
                'v-input--selection-controls v-input--switch': true
            };
        },
        switchData: function () {
            return this.setTextColor(this.loading ? undefined : this.computedColor, {
                class: this.themeClasses
            });
        }
    },
    methods: {
        genDefaultSlot: function () {
            return [
                this.genSwitch(),
                this.genLabel()
            ];
        },
        genSwitch: function () {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [
                this.genInput('checkbox', this.$attrs),
                this.genRipple(this.setTextColor(this.computedColor, {
                    directives: [{
                            name: 'touch',
                            value: {
                                left: this.onSwipeLeft,
                                right: this.onSwipeRight
                            }
                        }]
                })),
                this.$createElement('div', __assign({ staticClass: 'v-input--switch__track' }, this.switchData)),
                this.$createElement('div', __assign({ staticClass: 'v-input--switch__thumb' }, this.switchData), [this.genProgress()])
            ]);
        },
        genProgress: function () {
            return this.$createElement(VFabTransition, {}, [
                this.loading === false
                    ? null
                    : this.$slots.progress || this.$createElement(VProgressCircular, {
                        props: {
                            color: (this.loading === true || this.loading === '')
                                ? (this.color || 'primary')
                                : this.loading,
                            size: 16,
                            width: 2,
                            indeterminate: true
                        }
                    })
            ]);
        },
        onSwipeLeft: function () {
            if (this.isActive)
                this.onChange();
        },
        onSwipeRight: function () {
            if (!this.isActive)
                this.onChange();
        },
        onKeydown: function (e) {
            if ((e.keyCode === keyCodes.left && this.isActive) ||
                (e.keyCode === keyCodes.right && !this.isActive))
                this.onChange();
        }
    }
};
//# sourceMappingURL=VSwitch.js.map