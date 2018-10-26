'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_snackbars.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

var _positionable = require('../../mixins/positionable');

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _mixins2.default)(_colorable2.default, _toggleable2.default, (0, _positionable.factory)(['absolute', 'top', 'bottom', 'left', 'right'])
/* @vue/component */
).extend({
    name: 'v-snackbar',
    props: {
        autoHeight: Boolean,
        multiLine: Boolean,
        // TODO: change this to closeDelay to match other API in delayable.js
        timeout: {
            type: Number,
            default: 6000
        },
        vertical: Boolean
    },
    data: function data() {
        return {
            activeTimeout: -1
        };
    },

    computed: {
        classes: function classes() {
            return {
                'v-snack--active': this.isActive,
                'v-snack--absolute': this.absolute,
                'v-snack--auto-height': this.autoHeight,
                'v-snack--bottom': this.bottom || !this.top,
                'v-snack--left': this.left,
                'v-snack--multi-line': this.multiLine && !this.vertical,
                'v-snack--right': this.right,
                'v-snack--top': this.top,
                'v-snack--vertical': this.vertical
            };
        }
    },
    watch: {
        isActive: function isActive() {
            this.setTimeout();
        }
    },
    mounted: function mounted() {
        this.setTimeout();
    },

    methods: {
        setTimeout: function setTimeout() {
            var _this = this;

            window.clearTimeout(this.activeTimeout);
            if (this.isActive && this.timeout) {
                this.activeTimeout = window.setTimeout(function () {
                    _this.isActive = false;
                }, this.timeout);
            }
        }
    },
    render: function render(h) {
        var children = [];
        if (this.isActive) {
            children.push(h('div', {
                staticClass: 'v-snack',
                class: this.classes,
                on: this.$listeners
            }, [h('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-snack__wrapper'
            }), [h('div', {
                staticClass: 'v-snack__content'
            }, this.$slots.default)])]));
        }
        return h('transition', {
            attrs: { name: 'v-snack-transition' }
        }, children);
    }
});
//# sourceMappingURL=VSnackbar.js.map