import Vue from 'vue';
import { deepEqual } from '../util/helpers';
export default Vue.extend({
    name: 'comparable',
    props: {
        valueComparator: {
            type: Function,
            default: deepEqual
        }
    }
});
//# sourceMappingURL=comparable.js.map