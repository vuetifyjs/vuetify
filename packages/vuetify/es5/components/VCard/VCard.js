'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Extensions

// Mixins

// Helpers


require('../../../src/stylus/components/_cards.styl');

var _VPaper = require('../VPaper');

var _VPaper2 = _interopRequireDefault(_VPaper);

var _routable = require('../../mixins/routable');

var _routable2 = _interopRequireDefault(_routable);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = (0, _mixins2.default)(_routable2.default, _VPaper2.default).extend({
    name: 'v-card',
    props: {
        elevation: {
            type: [Number, String],
            default: 2
        },
        flat: Boolean,
        hover: Boolean,
        img: String,
        raised: Boolean
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-card': true,
                'v-card--hover': this.hover
            }, _VPaper2.default.options.computed.classes.call(this));
        },
        computedElevation: function computedElevation() {
            if (this.flat) return 0;
            if (this.raised) return 3;
            return _VPaper2.default.options.computed.computedElevation.call(this);
        },
        styles: function styles() {
            var style = _extends({}, _VPaper2.default.options.computed.styles.call(this));
            if (this.img) {
                style.background = 'url("' + this.img + '") center center / cover no-repeat';
            }
            return style;
        }
    },
    render: function render(h) {
        var _generateRouteLink = this.generateRouteLink(this.classes),
            tag = _generateRouteLink.tag,
            data = _generateRouteLink.data;

        data.style = this.styles;
        return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});
//# sourceMappingURL=VCard.js.map