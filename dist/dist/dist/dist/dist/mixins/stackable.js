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
import Vue from 'vue';
import { getZIndex } from '../util/helpers';
/* @vue/component */
export default Vue.extend().extend({
    name: 'stackable',
    data: function () {
        return {
            stackClass: 'unpecified',
            stackElement: null,
            stackExclude: null,
            stackMinZIndex: 0,
            isActive: false
        };
    },
    computed: {
        activeZIndex: function () {
            if (typeof window === 'undefined')
                return 0;
            var content = this.stackElement || this.$refs.content;
            // Return current zindex if not active
            var index = !this.isActive
                ? getZIndex(content)
                : this.getMaxZIndex(this.stackExclude || [content]) + 2;
            if (index == null)
                return index;
            // Return max current z-index (excluding self) + 2
            // (2 to leave room for an overlay below, if needed)
            return parseInt(index);
        }
    },
    methods: {
        getMaxZIndex: function (exclude) {
            if (exclude === void 0) {
                exclude = [];
            }
            var base = this.$el;
            // Start with lowest allowed z-index or z-index of
            // base component's element, whichever is greater
            var zis = [this.stackMinZIndex, getZIndex(base)];
            // Convert the NodeList to an array to
            // prevent an Edge bug with Symbol.iterator
            // https://github.com/vuetifyjs/vuetify/issues/2146
            var activeElements = __spread(document.getElementsByClassName(this.stackClass));
            // Get z-index for all active dialogs
            for (var index = 0; index < activeElements.length; index++) {
                if (!exclude.includes(activeElements[index])) {
                    zis.push(getZIndex(activeElements[index]));
                }
            }
            return Math.max.apply(Math, __spread(zis));
        }
    }
});
//# sourceMappingURL=stackable.js.map
//# sourceMappingURL=stackable.js.map
//# sourceMappingURL=stackable.js.map
//# sourceMappingURL=stackable.js.map
//# sourceMappingURL=stackable.js.map