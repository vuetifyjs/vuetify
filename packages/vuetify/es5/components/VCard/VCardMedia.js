'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VImg = require('../VImg/VImg');

var _VImg2 = _interopRequireDefault(_VImg);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
/* @vue/component */
// Components
exports.default = _VImg2.default.extend({
    name: 'v-card-media',
    mounted: function mounted() {
        (0, _console.deprecate)('v-card-media', this.src ? 'v-img' : 'v-responsive', this);
    }
});
// Utils
//# sourceMappingURL=VCardMedia.js.map