'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mixins = require('../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function searchChildren(children) {
    var results = [];
    for (var index = 0; index < children.length; index++) {
        var child = children[index];
        if (child.isActive && child.isDependent) {
            results.push(child);
        } else {
            results.push.apply(results, _toConsumableArray(searchChildren(child.$children)));
        }
    }
    return results;
}
/* @vue/component */
exports.default = (0, _mixins2.default)().extend({
    name: 'dependent',
    data: function data() {
        return {
            closeDependents: true,
            isActive: false,
            isDependent: true
        };
    },

    watch: {
        isActive: function isActive(val) {
            if (val) return;
            var openDependents = this.getOpenDependents();
            for (var index = 0; index < openDependents.length; index++) {
                openDependents[index].isActive = false;
            }
        }
    },
    methods: {
        getOpenDependents: function getOpenDependents() {
            if (this.closeDependents) return searchChildren(this.$children);
            return [];
        },
        getOpenDependentElements: function getOpenDependentElements() {
            var result = [];
            var openDependents = this.getOpenDependents();
            for (var index = 0; index < openDependents.length; index++) {
                result.push.apply(result, _toConsumableArray(openDependents[index].getClickableDependentElements()));
            }
            return result;
        },
        getClickableDependentElements: function getClickableDependentElements() {
            var result = [this.$el];
            if (this.$refs.content) result.push(this.$refs.content);
            result.push.apply(result, _toConsumableArray(this.getOpenDependentElements()));
            return result;
        }
    }
});
//# sourceMappingURL=dependent.js.map