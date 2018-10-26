'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VWindowItem = require('../VWindow/VWindowItem');

var _VWindowItem2 = _interopRequireDefault(_VWindowItem);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
// Extensions
exports.default = _VWindowItem2.default.extend({
    name: 'v-tab-item',
    props: {
        id: String
    },
    render: function render(h) {
        var render = _VWindowItem2.default.options.render.call(this, h);
        // For backwards compatibility with v1.2
        /* istanbul ignore next */
        if (this.id) {
            (0, _console.deprecate)('id', 'value', this);
            render.data.domProps = render.data.domProps || {};
            render.data.domProps.id = this.id;
        }
        return render;
    }
});
// Mixins
//# sourceMappingURL=VTabItem.js.map