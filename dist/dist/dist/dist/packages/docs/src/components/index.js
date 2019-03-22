import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import './typography';
var requireComponent = require.context('@/components', true, /\.vue$/);
Vue.component('v-paper', {
    render: function (h) {
        return h('v-card', this.$slots.default);
    }
});
// Dynamically load all components
// and lazily load them
// https://vuejs.org/v2/guide/components-dynamic-async
requireComponent.keys().forEach(function (fileName) {
    var componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));
    Vue.component(componentName, function (resolve) {
        var componentConfig = requireComponent(fileName);
        resolve(componentConfig.default || componentConfig);
    });
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map