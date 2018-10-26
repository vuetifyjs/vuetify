'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bootable = require('../../mixins/bootable');

var _bootable2 = _interopRequireDefault(_bootable);

var _groupable = require('../../mixins/groupable');

var _touch = require('../../directives/touch');

var _touch2 = _interopRequireDefault(_touch);

var _helpers = require('../../util/helpers');

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utilities
exports.default = (0, _mixins2.default)(_bootable2.default, (0, _groupable.factory)('windowGroup', 'v-window-item', 'v-window')
/* @vue/component */
).extend({
    name: 'v-window-item',
    directives: {
        Touch: _touch2.default
    },
    props: {
        reverseTransition: {
            type: [Boolean, String],
            default: undefined
        },
        transition: {
            type: [Boolean, String],
            default: undefined
        },
        value: {
            required: false
        }
    },
    data: function data() {
        return {
            isActive: false,
            wasCancelled: false
        };
    },

    computed: {
        computedTransition: function computedTransition() {
            if (!this.windowGroup.internalReverse) {
                return typeof this.transition !== 'undefined' ? this.transition || '' : this.windowGroup.computedTransition;
            }
            return typeof this.reverseTransition !== 'undefined' ? this.reverseTransition || '' : this.windowGroup.computedTransition;
        }
    },
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return this.$slots.default;
        },
        onAfterEnter: function onAfterEnter() {
            var _this = this;

            if (this.wasCancelled) {
                this.wasCancelled = false;
                return;
            }
            requestAnimationFrame(function () {
                _this.windowGroup.internalHeight = undefined;
                _this.windowGroup.isActive = false;
            });
        },
        onBeforeEnter: function onBeforeEnter() {
            this.windowGroup.isActive = true;
        },
        onBeforeLeave: function onBeforeLeave(el) {
            this.windowGroup.internalHeight = (0, _helpers.convertToUnit)(el.clientHeight);
        },
        onEnterCancelled: function onEnterCancelled() {
            this.wasCancelled = true;
        },
        onEnter: function onEnter(el, done) {
            var _this2 = this;

            var isBooted = this.windowGroup.isBooted;
            if (isBooted) {
                (0, _helpers.addOnceEventListener)(el, 'transitionend', done);
            }
            requestAnimationFrame(function () {
                _this2.windowGroup.internalHeight = (0, _helpers.convertToUnit)(el.clientHeight);
                // On initial render, there is no transition
                // Vue leaves a `enter` transition class
                // if done is called too fast
                !isBooted && setTimeout(done, 100);
            });
        }
    },
    render: function render(h) {
        var div = h('div', {
            staticClass: 'v-window-item',
            directives: [{
                name: 'show',
                value: this.isActive
            }],
            on: this.$listeners
        }, this.showLazyContent(this.genDefaultSlot()));
        return h('transition', {
            props: {
                name: this.computedTransition
            },
            on: {
                afterEnter: this.onAfterEnter,
                beforeEnter: this.onBeforeEnter,
                beforeLeave: this.onBeforeLeave,
                enter: this.onEnter,
                enterCancelled: this.onEnterCancelled
            }
        }, [div]);
    }
});
// Directives
// Mixins
//# sourceMappingURL=VWindowItem.js.map