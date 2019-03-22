import deprecatedIn from '@/data/deprecated';
import newIn from '@/data/new';
// Utilities
import { set } from '@/util/vuex';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
export default {
    namespaced: true,
    state: {
        deprecatedIn: deprecatedIn,
        newIn: newIn,
        namespace: null,
        page: null,
        structure: null
    },
    getters: {
        namespace: function (state, getters, rootState) {
            if (!rootState || !rootState.route || !rootState.route.params)
                return undefined;
            return upperFirst(camelCase(rootState.route.params.namespace));
        },
        page: function (state, getters, rootState) {
            if (!rootState || !rootState.route || !rootState.route.params)
                return undefined;
            return upperFirst(camelCase(rootState.route.params.page));
        }
    },
    mutations: {
        setStructure: set('structure')
    }
};
//# sourceMappingURL=documentation.js.map
//# sourceMappingURL=documentation.js.map