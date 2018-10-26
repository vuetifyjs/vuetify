'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins


require('../../../src/stylus/components/_timeline.styl');

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _mixins2.default)(_themeable2.default
/* @vue/component */
).extend({
    name: 'v-timeline',
    props: {
        alignTop: Boolean,
        dense: Boolean
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-timeline--align-top': this.alignTop,
                'v-timeline--dense': this.dense
            }, this.themeClasses);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-timeline',
            'class': this.classes
        }, this.$slots.default);
    }
});
//# sourceMappingURL=VTimeline.js.map