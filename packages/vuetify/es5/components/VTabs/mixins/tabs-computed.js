'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Tabs computed
 *
 * @mixin
 */
/* @vue/component */
exports.default = {
    computed: {
        activeTab: function activeTab() {
            if (!this.selectedItems.length) return undefined;
            return this.selectedItems[0];
        },
        containerStyles: function containerStyles() {
            return this.height ? {
                height: parseInt(this.height, 10) + 'px'
            } : null;
        },
        hasArrows: function hasArrows() {
            return (this.showArrows || !this.isMobile) && this.isOverflowing;
        },
        isMobile: function isMobile() {
            return this.$vuetify.breakpoint.width < this.mobileBreakPoint;
        },
        sliderStyles: function sliderStyles() {
            return {
                left: this.sliderLeft + 'px',
                transition: this.sliderLeft != null ? null : 'none',
                width: this.sliderWidth + 'px'
            };
        }
    }
};
//# sourceMappingURL=tabs-computed.js.map