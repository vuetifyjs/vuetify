'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_responsive.styl');

var _measurable = require('../../mixins/measurable');

var _measurable2 = _interopRequireDefault(_measurable);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Mixins
exports.default = (0, _mixins2.default)(_measurable2.default).extend({
    name: 'v-responsive',
    props: {
        aspectRatio: [String, Number]
    },
    computed: {
        computedAspectRatio: function computedAspectRatio() {
            return Number(this.aspectRatio);
        },
        aspectStyle: function aspectStyle() {
            return this.computedAspectRatio ? { paddingBottom: 1 / this.computedAspectRatio * 100 + '%' } : undefined;
        },
        __cachedSizer: function __cachedSizer() {
            if (!this.aspectStyle) return [];
            return this.$createElement('div', {
                style: this.aspectStyle,
                staticClass: 'v-responsive__sizer'
            });
        }
    },
    methods: {
        genContent: function genContent() {
            return this.$createElement('div', {
                staticClass: 'v-responsive__content'
            }, this.$slots.default);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-responsive',
            style: this.measurableStyles,
            on: this.$listeners
        }, [this.__cachedSizer, this.genContent()]);
    }
});
// Utils
//# sourceMappingURL=VResponsive.js.map