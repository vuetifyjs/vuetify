'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_speed-dial.styl');

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

var _positionable = require('../../mixins/positionable');

var _positionable2 = _interopRequireDefault(_positionable);

var _transitionable = require('../../mixins/transitionable');

var _transitionable2 = _interopRequireDefault(_transitionable);

var _clickOutside = require('../../directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* @vue/component */
exports.default = {
    name: 'v-speed-dial',
    directives: { ClickOutside: _clickOutside2.default },
    mixins: [_positionable2.default, _toggleable2.default, _transitionable2.default],
    props: {
        direction: {
            type: String,
            default: 'top',
            validator: function validator(val) {
                return ['top', 'right', 'bottom', 'left'].includes(val);
            }
        },
        openOnHover: Boolean,
        transition: {
            type: String,
            default: 'scale-transition'
        }
    },
    computed: {
        classes: function classes() {
            return _defineProperty({
                'v-speed-dial': true,
                'v-speed-dial--top': this.top,
                'v-speed-dial--right': this.right,
                'v-speed-dial--bottom': this.bottom,
                'v-speed-dial--left': this.left,
                'v-speed-dial--absolute': this.absolute,
                'v-speed-dial--fixed': this.fixed
            }, 'v-speed-dial--direction-' + this.direction, true);
        }
    },
    render: function render(h) {
        var _this = this;

        var children = [];
        var data = {
            'class': this.classes,
            directives: [{
                name: 'click-outside',
                value: function value() {
                    return _this.isActive = false;
                }
            }],
            on: {
                click: function click() {
                    return _this.isActive = !_this.isActive;
                }
            }
        };
        if (this.openOnHover) {
            data.on.mouseenter = function () {
                return _this.isActive = true;
            };
            data.on.mouseleave = function () {
                return _this.isActive = false;
            };
        }
        if (this.isActive) {
            children = (this.$slots.default || []).map(function (b, i) {
                b.key = i;
                return b;
            });
        }
        var list = h('transition-group', {
            'class': 'v-speed-dial__list',
            props: {
                name: this.transition,
                mode: this.mode,
                origin: this.origin,
                tag: 'div'
            }
        }, children);
        return h('div', data, [this.$slots.activator, list]);
    }
};
//# sourceMappingURL=VSpeedDial.js.map