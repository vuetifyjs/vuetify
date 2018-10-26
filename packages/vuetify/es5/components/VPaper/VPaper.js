'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins

// Helpers


require('../../../src/stylus/components/_paper.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _elevatable = require('../../mixins/elevatable');

var _elevatable2 = _interopRequireDefault(_elevatable);

var _measurable = require('../../mixins/measurable');

var _measurable2 = _interopRequireDefault(_measurable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = (0, _mixins2.default)(_colorable2.default, _elevatable2.default, _measurable2.default, _themeable2.default).extend({
    name: 'v-paper',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        tile: Boolean
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-paper': true,
                'v-paper--tile': this.tile
            }, this.themeClasses, this.elevationClasses);
        },
        styles: function styles() {
            return this.measurableStyles;
        }
    },
    render: function render(h) {
        var data = {
            class: this.classes,
            style: this.styles
        };
        return h(this.tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});
//# sourceMappingURL=VPaper.js.map