// Mixins
import Delayable from '../../mixins/delayable';
import Toggleable from '../../mixins/toggleable';
// Utilities
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
export default mixins(Delayable, Toggleable
/* @vue/component */
).extend({
    name: 'v-hover',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: undefined
        }
    },
    methods: {
        onMouseEnter: function onMouseEnter() {
            var _this = this;

            this.runDelay('open', function () {
                _this.isActive = true;
            });
        },
        onMouseLeave: function onMouseLeave() {
            var _this2 = this;

            this.runDelay('close', function () {
                _this2.isActive = false;
            });
        }
    },
    render: function render() {
        if (!this.$scopedSlots.default && this.value === undefined) {
            consoleWarn('v-hover is missing a default scopedSlot or bound value', this);
            return null;
        }
        var element = void 0;
        if (this.$scopedSlots.default) {
            element = this.$scopedSlots.default({ hover: this.isActive });
        } else if (this.$slots.default.length === 1) {
            element = this.$slots.default[0];
        }
        if (!element || typeof element === 'string' || Array.isArray(element)) {
            consoleWarn('v-hover should only contain a single element', this);
            return element;
        }
        if (!this.disabled) {
            this._g(element.data, {
                mouseenter: this.onMouseEnter,
                mouseleave: this.onMouseLeave
            });
        }
        return element;
    }
});
//# sourceMappingURL=VHover.js.map