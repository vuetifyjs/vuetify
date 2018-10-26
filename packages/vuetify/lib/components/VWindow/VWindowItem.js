// Mixins
import Bootable from '../../mixins/bootable';
import { factory as GroupableFactory } from '../../mixins/groupable';
// Directives
import Touch from '../../directives/touch';
// Utilities
import { addOnceEventListener, convertToUnit } from '../../util/helpers';
import mixins from '../../util/mixins';
export default mixins(Bootable, GroupableFactory('windowGroup', 'v-window-item', 'v-window')
/* @vue/component */
).extend({
    name: 'v-window-item',
    directives: {
        Touch: Touch
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
            this.windowGroup.internalHeight = convertToUnit(el.clientHeight);
        },
        onEnterCancelled: function onEnterCancelled() {
            this.wasCancelled = true;
        },
        onEnter: function onEnter(el, done) {
            var _this2 = this;

            var isBooted = this.windowGroup.isBooted;
            if (isBooted) {
                addOnceEventListener(el, 'transitionend', done);
            }
            requestAnimationFrame(function () {
                _this2.windowGroup.internalHeight = convertToUnit(el.clientHeight);
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
//# sourceMappingURL=VWindowItem.js.map