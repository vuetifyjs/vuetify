'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins


require('../../../src/stylus/components/_button-toggle.styl');

var _buttonGroup = require('../../mixins/button-group');

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = _buttonGroup2.default.extend({
    name: 'v-btn-toggle',
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        }
    },
    computed: {
        classes: function classes() {
            return _extends({}, _buttonGroup2.default.options.computed.classes.call(this), {
                'v-btn-toggle': true,
                'v-btn-toggle--only-child': this.selectedItems.length === 1,
                'v-btn-toggle--selected': this.selectedItems.length > 0
            });
        }
    }
});
//# sourceMappingURL=VBtnToggle.js.map