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
        minHeight: [Number, String],
        minWidth: [Number, String],
        width: [Number, String]
    },
    computed: {
        measurableStyles: function () {
            var styles = {};
            var height = convertToUnit(this.height);
            var minHeight = convertToUnit(this.minHeight);
            var minWidth = convertToUnit(this.minWidth);
            var maxHeight = convertToUnit(this.maxHeight);
            var maxWidth = convertToUnit(this.maxWidth);
            var width = convertToUnit(this.width);
            if (height)
                styles.height = height;
            if (minHeight)
                styles.minHeight = minHeight;
            if (minWidth)
                styles.minWidth = minWidth;
            if (maxHeight)
                styles.maxHeight = maxHeight;
            if (maxWidth)
                styles.maxWidth = maxWidth;
            if (width)
                styles.width = width;
            return styles;
        }
    }
});
//# sourceMappingURL=measurable.js.map