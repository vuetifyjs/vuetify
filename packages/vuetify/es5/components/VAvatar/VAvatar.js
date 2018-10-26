'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Mixins


require('../../../src/stylus/components/_avatars.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _helpers = require('../../util/helpers');

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = (0, _mixins2.default)(_colorable2.default).extend({
    name: 'v-avatar',
    functional: true,
    props: {
        // TODO: inherit these
        color: String,
        size: {
            type: [Number, String],
            default: 48
        },
        tile: Boolean
    },
    render: function render(h, _ref) {
        var data = _ref.data,
            props = _ref.props,
            children = _ref.children;

        data.staticClass = ('v-avatar ' + (data.staticClass || '')).trim();
        if (props.tile) data.staticClass += ' v-avatar--tile';
        var size = (0, _helpers.convertToUnit)(props.size);
        data.style = _extends({
            height: size,
            width: size
        }, data.style);
        return h('div', _colorable2.default.options.methods.setBackgroundColor(props.color, data), children);
    }
});
//# sourceMappingURL=VAvatar.js.map