'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _routable = require('../../mixins/routable');

var _routable2 = _interopRequireDefault(_routable);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* @vue/component */
exports.default = (0, _mixins2.default)(_routable2.default).extend({
    name: 'v-breadcrumbs-item',
    props: {
        // In a breadcrumb, the currently
        // active item should be dimmed
        activeClass: {
            type: String,
            default: 'v-breadcrumbs__item--disabled'
        }
    },
    computed: {
        classes: function classes() {
            return _defineProperty({
                'v-breadcrumbs__item': true
            }, this.activeClass, this.disabled);
        }
    },
    render: function render(h) {
        var _generateRouteLink = this.generateRouteLink(this.classes),
            tag = _generateRouteLink.tag,
            data = _generateRouteLink.data;

        return h('li', [h(tag, data, this.$slots.default)]);
    }
});
//# sourceMappingURL=VBreadcrumbsItem.js.map