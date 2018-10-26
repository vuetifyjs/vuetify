'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_badges.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

var _positionable = require('../../mixins/positionable');

var _transitionable = require('../../mixins/transitionable');

var _transitionable2 = _interopRequireDefault(_transitionable);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles
exports.default = (0, _mixins2.default)(_colorable2.default, _toggleable2.default, (0, _positionable.factory)(['left', 'bottom']), _transitionable2.default
/* @vue/component */
).extend({
    name: 'v-badge',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        overlap: Boolean,
        transition: {
            type: String,
            default: 'fab-transition'
        },
        value: {
            default: true
        }
    },
    computed: {
        classes: function classes() {
            return {
                'v-badge--bottom': this.bottom,
                'v-badge--left': this.left,
                'v-badge--overlap': this.overlap
            };
        }
    },
    render: function render(h) {
        var badge = this.$slots.badge ? [h('span', this.setBackgroundColor(this.color, {
            staticClass: 'v-badge__badge',
            attrs: this.$attrs,
            directives: [{
                name: 'show',
                value: this.isActive
            }]
        }), this.$slots.badge)] : null;
        return h('span', {
            staticClass: 'v-badge',
            'class': this.classes
        }, [this.$slots.default, h('transition', {
            props: {
                name: this.transition,
                origin: this.origin,
                mode: this.mode
            }
        }, badge)]);
    }
});
// Mixins
//# sourceMappingURL=VBadge.js.map