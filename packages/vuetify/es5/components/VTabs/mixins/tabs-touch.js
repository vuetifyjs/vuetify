'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Tabs touch
 *
 * @mixin
 */
/* @vue/component */
exports.default = {
    methods: {
        newOffset: function newOffset(direction) {
            var clientWidth = this.$refs.wrapper.clientWidth;
            if (direction === 'prev') {
                return Math.max(this.scrollOffset - clientWidth, 0);
            } else {
                return Math.min(this.scrollOffset + clientWidth, this.$refs.container.clientWidth - clientWidth);
            }
        },
        onTouchStart: function onTouchStart(e) {
            this.startX = this.scrollOffset + e.touchstartX;
            this.$refs.container.style.transition = 'none';
            this.$refs.container.style.willChange = 'transform';
        },
        onTouchMove: function onTouchMove(e) {
            this.scrollOffset = this.startX - e.touchmoveX;
        },
        onTouchEnd: function onTouchEnd() {
            var container = this.$refs.container;
            var wrapper = this.$refs.wrapper;
            var maxScrollOffset = container.clientWidth - wrapper.clientWidth;
            container.style.transition = null;
            container.style.willChange = null;
            /* istanbul ignore else */
            if (this.scrollOffset < 0 || !this.isOverflowing) {
                this.scrollOffset = 0;
            } else if (this.scrollOffset >= maxScrollOffset) {
                this.scrollOffset = maxScrollOffset;
            }
        }
    }
};
//# sourceMappingURL=tabs-touch.js.map