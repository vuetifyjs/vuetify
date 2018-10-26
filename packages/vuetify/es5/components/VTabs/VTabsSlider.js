'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-tabs-slider',
    mixins: [_colorable2.default],
    render: function render(h) {
        return h('div', this.setBackgroundColor(this.color || 'accent', {
            staticClass: 'v-tabs__slider'
        }));
    }
};
//# sourceMappingURL=VTabsSlider.js.map