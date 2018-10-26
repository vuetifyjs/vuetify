'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _groupable = require('../../mixins/groupable');

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Mixins

// Utilities


exports.default = (0, _mixins2.default)((0, _groupable.factory)('itemGroup', 'v-item', 'v-item-group')
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
            (0, _console.consoleWarn)('v-item is missing a default scopedSlot', this);
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
            (0, _console.consoleWarn)('v-item should only contain a single element', this);
            return element;
        }
        element.data = element.data || {};
        element.data.class = [element.data.class, _defineProperty({}, this.activeClass, this.isActive)];
        return element;
    }
});
//# sourceMappingURL=VItem.js.map