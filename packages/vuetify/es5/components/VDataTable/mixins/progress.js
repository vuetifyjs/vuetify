'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* @vue/component */
exports.default = {
    methods: {
        genTProgress: function genTProgress() {
            var col = this.$createElement('th', {
                staticClass: 'column',
                attrs: {
                    colspan: this.headerColumns
                }
            }, [this.genProgress()]);
            return this.genTR([col], {
                staticClass: 'v-datatable__progress'
            });
        }
    }
};
//# sourceMappingURL=progress.js.map