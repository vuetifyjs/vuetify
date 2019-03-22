/**
 * Tabs computed
 *
 * @mixin
 */
/* @vue/component */
export default {
    computed: {
        activeTab: function () {
            if (!this.selectedItems.length)
                return undefined;
            return this.selectedItems[0];
        },
        containerStyles: function () {
            return this.height ? {
                height: parseInt(this.height, 10) + "px"
            } : null;
        },
        hasArrows: function () {
            return (this.showArrows || !this.isMobile) && this.isOverflowing;
        },
        isMobile: function () {
            return this.$vuetify.breakpoint.width < this.mobileBreakPoint;
        },
        sliderStyles: function () {
            return {
                left: this.sliderLeft + "px",
                transition: this.sliderLeft != null ? null : 'none',
                width: this.sliderWidth + "px"
            };
        }
    }
};
//# sourceMappingURL=tabs-computed.js.map