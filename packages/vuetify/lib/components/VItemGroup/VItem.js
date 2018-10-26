function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    render: function render() {
        if (!this.$scopedSlots.default) {
            consoleWarn('v-item is missing a default scopedSlot', this);
            return null;
        }
        var element = void 0;
        /* istanbul ignore else */
        if (this.$scopedSlots.default) {
            element = this.$scopedSlots.default({
                active: this.isActive,
                toggle: this.toggle
            });
        }
        if (!element || typeof element === 'string' || Array.isArray(element)) {
            consoleWarn('v-item should only contain a single element', this);
            return element;
        }
        element.data = element.data || {};
        element.data.class = [element.data.class, _defineProperty({}, this.activeClass, this.isActive)];
        return element;
    }
});
//# sourceMappingURL=VItem.js.map