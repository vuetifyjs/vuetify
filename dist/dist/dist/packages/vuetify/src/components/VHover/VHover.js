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
        onMouseEnter: function () {
            this.runDelay('open');
        },
        onMouseLeave: function () {
            this.runDelay('close');
        }
    },
    render: function () {
        if (!this.$scopedSlots.default && this.value === undefined) {
            consoleWarn('v-hover is missing a default scopedSlot or bound value', this);
            return null;
        }
        var element;
        if (this.$scopedSlots.default) {
            element = this.$scopedSlots.default({ hover: this.isActive });
        }
        else if (this.$slots.default && this.$slots.default.length === 1) {
            element = this.$slots.default[0];
        }
        if (Array.isArray(element) && element.length === 1) {
            element = element[0];
        }
        if (!element || Array.isArray(element) || !element.tag) {
            consoleWarn('v-hover should only contain a single element', this);
            return element;
        }
        if (!this.disabled) {
            element.data = element.data || {};
            this._g(element.data, {
                mouseenter: this.onMouseEnter,
                mouseleave: this.onMouseLeave
            });
        }
        return element;
    }
});
//# sourceMappingURL=VHover.js.map
//# sourceMappingURL=VHover.js.map
//# sourceMappingURL=VHover.js.map