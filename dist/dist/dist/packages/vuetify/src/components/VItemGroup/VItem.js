// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable';
// Utilities
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
export default mixins(GroupableFactory('itemGroup', 'v-item', 'v-item-group')
/* @vue/component */
).extend({
    name: 'v-item',
    props: {
        value: {
            required: false
        }
    },
    render: function () {
        var _a;
        if (!this.$scopedSlots.default) {
            consoleWarn('v-item is missing a default scopedSlot', this);
            return null;
        }
        var element;
        /* istanbul ignore else */
        if (this.$scopedSlots.default) {
            element = this.$scopedSlots.default({
                active: this.isActive,
                toggle: this.toggle
            });
        }
        if (Array.isArray(element) && element.length === 1) {
            element = element[0];
        }
        if (!element || Array.isArray(element) || !element.tag) {
            consoleWarn('v-item should only contain a single element', this);
            return element;
        }
        element.data = this._b(element.data || {}, element.tag, {
            class: (_a = {}, _a[this.activeClass] = this.isActive, _a)
        });
        return element;
    }
});
//# sourceMappingURL=VItem.js.map
//# sourceMappingURL=VItem.js.map
//# sourceMappingURL=VItem.js.map