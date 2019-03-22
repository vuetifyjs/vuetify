// Mixins
import Bootable from '../../mixins/bootable';
import { factory as GroupableFactory } from '../../mixins/groupable';
// Directives
import Touch from '../../directives/touch';
// Utilities
import { convertToUnit } from '../../util/helpers';
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
    data: function () {
        return {
            done: null,
            isActive: false,
            wasCancelled: false
        };
    },
    computed: {
        computedTransition: function () {
            if (!this.windowGroup.internalReverse) {
                return typeof this.transition !== 'undefined'
                    ? this.transition || ''
                    : this.windowGroup.computedTransition;
            }
            return typeof this.reverseTransition !== 'undefined'
                ? this.reverseTransition || ''
                : this.windowGroup.computedTransition;
        }
    },
    mounted: function () {
        this.$el.addEventListener('transitionend', this.onTransitionEnd, false);
    },
    beforeDestroy: function () {
        this.$el.removeEventListener('transitionend', this.onTransitionEnd, false);
    },
    methods: {
        genDefaultSlot: function () {
            return this.$slots.default;
        },
        onAfterEnter: function () {
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
        onBeforeEnter: function () {
            this.windowGroup.isActive = true;
        },
        onLeave: function (el) {
            this.windowGroup.internalHeight = convertToUnit(el.clientHeight);
        },
        onEnterCancelled: function () {
            this.wasCancelled = true;
        },
        onEnter: function (el, done) {
            var _this = this;
            var isBooted = this.windowGroup.isBooted;
            if (isBooted)
                this.done = done;
            requestAnimationFrame(function () {
                if (!_this.computedTransition)
                    return done();
                _this.windowGroup.internalHeight = convertToUnit(el.clientHeight);
                // On initial render, there is no transition
                // Vue leaves a `enter` transition class
                // if done is called too fast
                !isBooted && setTimeout(done, 100);
            });
        },
        onTransitionEnd: function (e) {
            // This ensures we only call done
            // when the element transform
            // completes
            if (e.propertyName !== 'transform' ||
                e.target !== this.$el ||
                !this.done)
                return;
            this.done();
            this.done = null;
        }
    },
    render: function (h) {
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
                leave: this.onLeave,
                enter: this.onEnter,
                enterCancelled: this.onEnterCancelled
            }
        }, [div]);
    }
});
//# sourceMappingURL=VWindowItem.js.map
//# sourceMappingURL=VWindowItem.js.map
//# sourceMappingURL=VWindowItem.js.map