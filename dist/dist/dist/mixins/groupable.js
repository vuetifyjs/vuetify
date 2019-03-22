// Mixins
import { inject as RegistrableInject } from './registrable';
export function factory(namespace, child, parent) {
    return RegistrableInject(namespace, child, parent).extend({
        name: 'groupable',
        props: {
            activeClass: {
                type: String,
                default: function () {
                    if (!this[namespace])
                        return undefined;
                    return this[namespace].activeClass;
                }
            },
            disabled: Boolean
        },
        data: function () {
            return {
                isActive: false
            };
        },
        computed: {
            groupClasses: function () {
                var _a;
                if (!this.activeClass)
                    return {};
                return _a = {},
                    _a[this.activeClass] = this.isActive,
                    _a;
            }
        },
        created: function () {
            this[namespace] && this[namespace].register(this);
        },
        beforeDestroy: function () {
            this[namespace] && this[namespace].unregister(this);
        },
        methods: {
            toggle: function () {
                this.$emit('change');
            }
        }
    });
}
/* eslint-disable-next-line no-redeclare */
var Groupable = factory('itemGroup');
export default Groupable;
//# sourceMappingURL=groupable.js.map
//# sourceMappingURL=groupable.js.map
//# sourceMappingURL=groupable.js.map