'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_windows.styl');

var _VItemGroup = require('../VItemGroup/VItemGroup');

var _touch = require('../../directives/touch');

var _touch2 = _interopRequireDefault(_touch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Components
exports.default = _VItemGroup.BaseItemGroup.extend({
    name: 'v-window',
    provide: function provide() {
        return {
            windowGroup: this
        };
    },

    directives: { Touch: _touch2.default },
    props: {
        mandatory: {
            type: Boolean,
            default: true
        },
        reverse: {
            type: Boolean,
            default: undefined
        },
        touch: Object,
        touchless: Boolean,
        value: {
            required: false
        },
        vertical: Boolean
    },
    data: function data() {
        return {
            internalHeight: undefined,
            isActive: false,
            isBooted: false,
            isReverse: false
        };
    },

    computed: {
        computedTransition: function computedTransition() {
            if (!this.isBooted) return '';
            var axis = this.vertical ? 'y' : 'x';
            var direction = this.internalReverse === !this.$vuetify.rtl ? '-reverse' : '';
            return 'v-window-' + axis + direction + '-transition';
        },
        internalIndex: function internalIndex() {
            var _this = this;

            return this.items.findIndex(function (item, i) {
                return _this.internalValue === _this.getValue(item, i);
            });
        },
        internalReverse: function internalReverse() {
            if (this.reverse !== undefined) return this.reverse;
            return this.isReverse;
        }
    },
    watch: {
        internalIndex: 'updateReverse'
    },
    mounted: function mounted() {
        var _this2 = this;

        this.$nextTick(function () {
            return _this2.isBooted = true;
        });
    },

    methods: {
        genContainer: function genContainer() {
            return this.$createElement('div', {
                staticClass: 'v-window__container',
                class: {
                    'v-window__container--is-active': this.isActive
                },
                style: {
                    height: this.internalHeight
                }
            }, this.$slots.default);
        },
        next: function next() {
            this.isReverse = false;
            var nextIndex = (this.internalIndex + 1) % this.items.length;
            var item = this.items[nextIndex];
            this.internalValue = this.getValue(item, nextIndex);
        },
        prev: function prev() {
            this.isReverse = true;
            var lastIndex = (this.internalIndex + this.items.length - 1) % this.items.length;
            var item = this.items[lastIndex];
            this.internalValue = this.getValue(item, lastIndex);
        },
        updateReverse: function updateReverse(val, oldVal) {
            this.isReverse = val < oldVal;
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-window',
            directives: []
        };
        if (!this.touchless) {
            var value = this.touch || {
                left: this.next,
                right: this.prev
            };
            data.directives.push({
                name: 'touch',
                value: value
            });
        }
        return h('div', data, [this.genContainer()]);
    }
});
// Directives
// Styles
//# sourceMappingURL=VWindow.js.map