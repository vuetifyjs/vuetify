// Extensions
import { BaseItemGroup } from '../components/VItemGroup/VItemGroup';
/* @vue/component */
export default BaseItemGroup.extend({
    name: 'button-group',
    provide: function () {
        return {
            btnToggle: this
        };
    },
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        }
    },
    computed: {
        classes: function () {
            return BaseItemGroup.options.computed.classes.call(this);
        }
    }
});
//# sourceMappingURL=button-group.js.map
//# sourceMappingURL=button-group.js.map