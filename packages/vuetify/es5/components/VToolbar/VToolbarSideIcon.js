'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VBtn = require('../../components/VBtn');

var _VBtn2 = _interopRequireDefault(_VBtn);

var _VIcon = require('../../components/VIcon');

var _VIcon2 = _interopRequireDefault(_VIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-toolbar-side-icon',
    functional: true,
    render: function render(h, _ref) {
        var slots = _ref.slots,
            listeners = _ref.listeners,
            props = _ref.props,
            data = _ref.data;

        var classes = data.staticClass ? data.staticClass + ' v-toolbar__side-icon' : 'v-toolbar__side-icon';
        var d = Object.assign(data, {
            staticClass: classes,
            props: Object.assign(props, {
                icon: true
            }),
            on: listeners
        });
        var defaultSlot = slots().default;
        return h(_VBtn2.default, d, defaultSlot || [h(_VIcon2.default, '$vuetify.icons.menu')]);
    }
};
//# sourceMappingURL=VToolbarSideIcon.js.map