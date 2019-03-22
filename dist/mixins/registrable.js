import Vue from 'vue';
import { consoleWarn } from '../util/console';
function generateWarning(child, parent) {
    return function () { return consoleWarn("The " + child + " component must be used inside a " + parent); };
}
export function inject(namespace, child, parent) {
    var _a;
    var defaultImpl = child && parent ? {
        register: generateWarning(child, parent),
        unregister: generateWarning(child, parent)
    } : null;
    return Vue.extend({
        name: 'registrable-inject',
        inject: (_a = {},
            _a[namespace] = {
                default: defaultImpl
            },
            _a)
    });
}
export function provide(namespace) {
    return Vue.extend({
        name: 'registrable-provide',
        methods: {
            register: null,
            unregister: null
        },
        provide: function () {
            var _a;
            return _a = {},
                _a[namespace] = {
                    register: this.register,
                    unregister: this.unregister
                },
                _a;
        }
    });
}
//# sourceMappingURL=registrable.js.map