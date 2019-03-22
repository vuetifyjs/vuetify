import Vue from 'vue';
import rollbar from '../util/rollbar';
if (rollbar.enabled) {
    Vue.prototype.$rollbar = rollbar;
    Vue.config.errorHandler = function (err, vm, info) {
        rollbar.error(err, { info: info });
    };
}
//# sourceMappingURL=rollbar.js.map
//# sourceMappingURL=rollbar.js.map
//# sourceMappingURL=rollbar.js.map
//# sourceMappingURL=rollbar.js.map