'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_alerts.styl');

var _VIcon = require('../VIcon');

var _VIcon2 = _interopRequireDefault(_VIcon);

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

var _transitionable = require('../../mixins/transitionable');

var _transitionable2 = _interopRequireDefault(_transitionable);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Mixins
// Styles
exports.default = (0, _mixins2.default)(_colorable2.default, _toggleable2.default, _transitionable2.default).extend({
    name: 'v-alert',
    props: {
        dismissible: Boolean,
        icon: String,
        outline: Boolean,
        type: {
            type: String,
            validator: function validator(val) {
                return ['info', 'error', 'success', 'warning'].includes(val);
            }
        }
    },
    computed: {
        computedColor: function computedColor() {
            return this.type && !this.color ? this.type : this.color || 'error';
        },
        computedIcon: function computedIcon() {
            if (this.icon || !this.type) return this.icon;
            switch (this.type) {
                case 'info':
                    return '$vuetify.icons.info';
                case 'error':
                    return '$vuetify.icons.error';
                case 'success':
                    return '$vuetify.icons.success';
                case 'warning':
                    return '$vuetify.icons.warning';
            }
        }
    },
    methods: {
        genIcon: function genIcon() {
            if (!this.computedIcon) return null;
            return this.$createElement(_VIcon2.default, {
                'class': 'v-alert__icon'
            }, this.computedIcon);
        },
        genDismissible: function genDismissible() {
            var _this = this;

            if (!this.dismissible) return null;
            return this.$createElement('a', {
                'class': 'v-alert__dismissible',
                on: { click: function click() {
                        _this.isActive = false;
                    } }
            }, [this.$createElement(_VIcon2.default, {
                props: {
                    right: true
                }
            }, '$vuetify.icons.cancel')]);
        }
    },
    render: function render(h) {
        var children = [this.genIcon(), h('div', this.$slots.default), this.genDismissible()];
        var setColor = this.outline ? this.setTextColor : this.setBackgroundColor;
        var alert = h('div', setColor(this.computedColor, {
            staticClass: 'v-alert',
            'class': {
                'v-alert--outline': this.outline
            },
            directives: [{
                name: 'show',
                value: this.isActive
            }],
            on: this.$listeners
        }), children);
        if (!this.transition) return alert;
        return h('transition', {
            props: {
                name: this.transition,
                origin: this.origin,
                mode: this.mode
            }
        }, [alert]);
    }
});
// Components
//# sourceMappingURL=VAlert.js.map