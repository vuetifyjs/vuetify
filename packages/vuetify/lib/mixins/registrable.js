function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from 'vue';
import { consoleWarn } from '../util/console';
function generateWarning(child, parent) {
    return function () {
        return consoleWarn('The ' + child + ' component must be used inside a ' + parent);
    };
}
export function inject(namespace, child, parent) {
    var defaultImpl = child && parent ? {
        register: generateWarning(child, parent),
        unregister: generateWarning(child, parent)
    } : null;
    return Vue.extend({
        name: 'registrable-inject',
        inject: _defineProperty({}, namespace, {
            default: defaultImpl
        })
    });
}
export function provide(namespace) {
    return Vue.extend({
        name: 'registrable-provide',
        methods: {
            register: null,
            unregister: null
        },
        provide: function provide() {
            return _defineProperty({}, namespace, {
                register: this.register,
                unregister: this.unregister
            });
        }
    });
}
//# sourceMappingURL=registrable.js.map