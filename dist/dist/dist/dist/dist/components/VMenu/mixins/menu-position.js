/**
 * Menu position
 *
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 */
/* @vue/component */
export default {
    data: function () {
        return ({
            calculatedTopAuto: 0
        });
    },
    methods: {
        calcScrollPosition: function () {
            var $el = this.$refs.content;
            var activeTile = $el.querySelector('.v-list__tile--active');
            var maxScrollTop = $el.scrollHeight - $el.offsetHeight;
            return activeTile
                ? Math.min(maxScrollTop, Math.max(0, activeTile.offsetTop - $el.offsetHeight / 2 + activeTile.offsetHeight / 2))
                : $el.scrollTop;
        },
        calcLeftAuto: function () {
            if (this.isAttached)
                return 0;
            return parseInt(this.dimensions.activator.left - this.defaultOffset * 2);
        },
        calcTopAuto: function () {
            var $el = this.$refs.content;
            var activeTile = $el.querySelector('.v-list__tile--active');
            if (!activeTile) {
                this.selectedIndex = null;
            }
            if (this.offsetY || !activeTile) {
                return this.computedTop;
            }
            this.selectedIndex = Array.from(this.tiles).indexOf(activeTile);
            var tileDistanceFromMenuTop = activeTile.offsetTop - this.calcScrollPosition();
            var firstTileOffsetTop = $el.querySelector('.v-list__tile').offsetTop;
            return this.computedTop - tileDistanceFromMenuTop - firstTileOffsetTop;
        }
    }
};
//# sourceMappingURL=menu-position.js.map
//# sourceMappingURL=menu-position.js.map
//# sourceMappingURL=menu-position.js.map
//# sourceMappingURL=menu-position.js.map
//# sourceMappingURL=menu-position.js.map