/* @vue/component */
export default {
    methods: {
        genTFoot: function () {
            if (!this.$slots.footer) {
                return null;
            }
            var footer = this.$slots.footer;
            var row = this.hasTag(footer, 'td') ? this.genTR(footer) : footer;
            return this.$createElement('tfoot', [row]);
        },
        genActionsFooter: function () {
            if (this.hideActions) {
                return null;
            }
            return this.$createElement('div', {
                'class': this.classes
            }, this.genActions());
        }
    }
};
//# sourceMappingURL=foot.js.map
//# sourceMappingURL=foot.js.map