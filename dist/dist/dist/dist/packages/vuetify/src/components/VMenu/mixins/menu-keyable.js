/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 */
// Utils
import { keyCodes } from '../../../util/helpers';
/* @vue/component */
export default {
    props: {
        disableKeys: Boolean
    },
    data: function () {
        return ({
            listIndex: -1,
            tiles: []
        });
    },
    watch: {
        isActive: function (val) {
            if (!val)
                this.listIndex = -1;
        },
        listIndex: function (next, prev) {
            if (next in this.tiles) {
                var tile = this.tiles[next];
                tile.classList.add('v-list__tile--highlighted');
                this.$refs.content.scrollTop = tile.offsetTop - tile.clientHeight;
            }
            prev in this.tiles &&
                this.tiles[prev].classList.remove('v-list__tile--highlighted');
        }
    },
    methods: {
        onKeyDown: function (e) {
            var _this = this;
            if (e.keyCode === keyCodes.esc) {
                // Wait for dependent elements to close first
                setTimeout(function () { _this.isActive = false; });
                var activator_1 = this.getActivator();
                this.$nextTick(function () { return activator_1 && activator_1.focus(); });
            }
            else if (e.keyCode === keyCodes.tab) {
                setTimeout(function () {
                    if (!_this.$refs.content.contains(document.activeElement)) {
                        _this.isActive = false;
                    }
                });
            }
            else {
                this.changeListIndex(e);
            }
        },
        changeListIndex: function (e) {
            // For infinite scroll and autocomplete, re-evaluate children
            this.getTiles();
            if (e.keyCode === keyCodes.down && this.listIndex < this.tiles.length - 1) {
                this.listIndex++;
                // Allow user to set listIndex to -1 so
                // that the list can be un-highlighted
            }
            else if (e.keyCode === keyCodes.up && this.listIndex > -1) {
                this.listIndex--;
            }
            else if (e.keyCode === keyCodes.enter && this.listIndex !== -1) {
                this.tiles[this.listIndex].click();
            }
            else {
                return;
            }
            // One of the conditions was met, prevent default action (#2988)
            e.preventDefault();
        },
        getTiles: function () {
            this.tiles = this.$refs.content.querySelectorAll('.v-list__tile');
        }
    }
};
//# sourceMappingURL=menu-keyable.js.map
//# sourceMappingURL=menu-keyable.js.map
//# sourceMappingURL=menu-keyable.js.map
//# sourceMappingURL=menu-keyable.js.map