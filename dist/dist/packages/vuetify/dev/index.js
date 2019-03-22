import Vue from 'vue';
import App from './App';
import Boilerplate from './Boilerplate';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import router from './router';
import '@mdi/font/css/materialdesignicons.css';
Vue.config.performance = true;
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.component(Boilerplate.name, Boilerplate);
var vm = new Vue({
    data: function () { return ({ isLoaded: document.readyState === 'complete' }); },
    render: function (h) {
        return this.isLoaded ? h(App) : undefined;
    },
    router: router
}).$mount('#app');
// Prevent layout jump while waiting for styles
vm.isLoaded || window.addEventListener('load', function () {
    vm.isLoaded = true;
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map