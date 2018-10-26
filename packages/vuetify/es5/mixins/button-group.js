'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VItemGroup = require('../components/VItemGroup/VItemGroup');

/* @vue/component */
exports.default = _VItemGroup.BaseItemGroup.extend({
    name: 'button-group',
    provide: function provide() {
        return {
            btnToggle: this
        };
    },

    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        }
    },
    computed: {
        classes: function classes() {
            return _VItemGroup.BaseItemGroup.options.computed.classes.call(this);
        }
    }
}); // Extensions
//# sourceMappingURL=button-group.js.map