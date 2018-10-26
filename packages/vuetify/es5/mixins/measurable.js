'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helpers = require('../util/helpers');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helpers
exports.default = _vue2.default.extend({
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
            var height = (0, _helpers.convertToUnit)(this.height);
            var maxHeight = (0, _helpers.convertToUnit)(this.maxHeight);
            var maxWidth = (0, _helpers.convertToUnit)(this.maxWidth);
            var width = (0, _helpers.convertToUnit)(this.width);
            if (height) styles.height = height;
            if (maxHeight) styles.maxHeight = maxHeight;
            if (maxWidth) styles.maxWidth = maxWidth;
            if (width) styles.width = width;
            return styles;
        }
    }
});
// Types
//# sourceMappingURL=measurable.js.map