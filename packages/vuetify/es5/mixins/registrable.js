'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.inject = inject;
exports.provide = provide;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _console = require('../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function generateWarning(child, parent) {
    return function () {
        return (0, _console.consoleWarn)('The ' + child + ' component must be used inside a ' + parent);
    };
}
function inject(namespace, child, parent) {
    var defaultImpl = child && parent ? {
        register: generateWarning(child, parent),
        unregister: generateWarning(child, parent)
    } : null;
    return _vue2.default.extend({
        name: 'registrable-inject',
        inject: _defineProperty({}, namespace, {
            default: defaultImpl
        })
    });
}
function provide(namespace) {
    return _vue2.default.extend({
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