// Components
import VImg from '../VImg/VImg';
// Utils
import { deprecate } from '../../util/console';
/* istanbul ignore next */
/* @vue/component */
export default VImg.extend({
    name: 'v-card-media',
    mounted: function () {
        deprecate('v-card-media', this.src ? 'v-img' : 'v-responsive', this);
    }
});
//# sourceMappingURL=VCardMedia.js.map
//# sourceMappingURL=VCardMedia.js.map
//# sourceMappingURL=VCardMedia.js.map
//# sourceMappingURL=VCardMedia.js.map