var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
import mixins from '../util/mixins';
function searchChildren(children) {
    var results = [];
    for (var index = 0; index < children.length; index++) {
        var child = children[index];
        if (child.isActive && child.isDependent) {
            results.push(child);
        }
        else {
            results.push.apply(results, __spread(searchChildren(child.$children)));
        }
    }
    return results;
}
/* @vue/component */
export default mixins().extend({
    name: 'dependent',
    data: function () {
        return {
            closeDependents: true,
            isActive: false,
            isDependent: true
        };
    },
    watch: {
        isActive: function (val) {
            if (val)
                return;
            var openDependents = this.getOpenDependents();
            for (var index = 0; index < openDependents.length; index++) {
                openDependents[index].isActive = false;
            }
        }
    },
    methods: {
        getOpenDependents: function () {
            if (this.closeDependents)
                return searchChildren(this.$children);
            return [];
        },
        getOpenDependentElements: function () {
            var result = [];
            var openDependents = this.getOpenDependents();
            for (var index = 0; index < openDependents.length; index++) {
                result.push.apply(result, __spread(openDependents[index].getClickableDependentElements()));
            }
            return result;
        },
        getClickableDependentElements: function () {
            var result = [this.$el];
            if (this.$refs.content)
                result.push(this.$refs.content);
            if (this.overlay)
                result.push(this.overlay);
            result.push.apply(result, __spread(this.getOpenDependentElements()));
            return result;
        }
    }
});
//# sourceMappingURL=dependent.js.map
//# sourceMappingURL=dependent.js.map
//# sourceMappingURL=dependent.js.map