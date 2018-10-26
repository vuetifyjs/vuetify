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
    methods: {
        // Revisit this
        calculateScroll: function calculateScroll() {
            if (this.selectedIndex === null) return;
            var scrollTop = 0;
            if (this.selectedIndex >= this.stopIndex) {
                scrollTop = this.$refs.content.scrollHeight;
            } else if (this.selectedIndex > this.startIndex) {
                scrollTop =
                // Top position of selected item
                this.selectedIndex * this.tileHeight +
                // Remove half of a tile's height
                this.tileHeight / 2 +
                // Account for padding offset on lists
                this.defaultOffset / 2 -
                // Half of the auto content's height
                100;
            }
            if (this.$refs.content) {
                this.$refs.content.scrollTop = scrollTop;
            }
        },
        calcLeftAuto: function calcLeftAuto() {
            if (this.isAttached) return 0;
            return parseInt(this.dimensions.activator.left - this.defaultOffset * 2);
        },
        calcTopAuto: function calcTopAuto() {
            var selectedIndex = Array.from(this.tiles).findIndex(function (n) {
                return n.classList.contains('v-list__tile--active');
            });
            if (selectedIndex === -1) {
                this.selectedIndex = null;
                return this.computedTop;
            }
            this.selectedIndex = selectedIndex;
            this.stopIndex = this.tiles.length > 4 ? this.tiles.length - 4 : this.tiles.length;
            var additionalOffset = this.defaultOffset;
            var offsetPadding = void 0;
            // Menu should be centered
            if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
                offsetPadding = 1.5 * this.tileHeight;
                // Menu should be offset top
            } else if (selectedIndex >= this.stopIndex) {
                // Being offset top means
                // we have to account for top
                // and bottom list padding
                additionalOffset *= 2;
                offsetPadding = (selectedIndex - this.stopIndex) * this.tileHeight;
                // Menu should be offset bottom
            } else {
                offsetPadding = selectedIndex * this.tileHeight;
            }
            return this.computedTop + additionalOffset - offsetPadding - this.tileHeight / 2;
        }
    }
};
//# sourceMappingURL=menu-position.js.map