// Helpers
import { convertToUnit } from '../util/helpers';
// Types
import Vue from 'vue';
export default Vue.extend({
    name: 'measurable',
    props: {
        height: [Number, String],
        maxHeight: [Number, String],
        maxWidth: [Number, String],
        width: [Number, String]
    },
    computed: {
        measurableStyles: function measurableStyles() {
            var styles = {};
            var height = convertToUnit(this.height);
            var maxHeight = convertToUnit(this.maxHeight);
            var maxWidth = convertToUnit(this.maxWidth);
            var width = convertToUnit(this.width);
            if (height) styles.height = height;
            if (maxHeight) styles.maxHeight = maxHeight;
            if (maxWidth) styles.maxWidth = maxWidth;
            if (width) styles.width = width;
            return styles;
        }
    }
});
//# sourceMappingURL=measurable.js.map