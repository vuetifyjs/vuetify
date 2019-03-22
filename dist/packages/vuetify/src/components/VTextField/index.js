import VTextField from './VTextField';
import VTextarea from '../VTextarea/VTextarea';
import rebuildSlots from '../../util/rebuildFunctionalSlots';
import dedupeModelListeners from '../../util/dedupeModelListeners';
import { deprecate } from '../../util/console';
// TODO: remove this in v2.0
/* @vue/component */
var wrapper = {
    functional: true,
    $_wrapperFor: VTextField,
    props: {
        textarea: Boolean,
        multiLine: Boolean
    },
    render: function (h, _a) {
        var props = _a.props, data = _a.data, slots = _a.slots, parent = _a.parent;
        dedupeModelListeners(data);
        var children = rebuildSlots(slots(), h);
        if (props.textarea) {
            deprecate('<v-text-field textarea>', '<v-textarea outline>', wrapper, parent);
        }
        if (props.multiLine) {
            deprecate('<v-text-field multi-line>', '<v-textarea>', wrapper, parent);
        }
        if (props.textarea || props.multiLine) {
            data.attrs.outline = props.textarea;
            return h(VTextarea, data, children);
        }
        else {
            return h(VTextField, data, children);
        }
    }
};
export { wrapper as VTextField };
export default wrapper;
//# sourceMappingURL=index.js.map