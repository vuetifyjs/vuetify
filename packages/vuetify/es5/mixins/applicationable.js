'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = applicationable;

var _positionable = require('./positionable');

var _mixins = require('../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applicationable(value) {
    var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    /* @vue/component */
    return (0, _mixins2.default)((0, _positionable.factory)(['absolute', 'fixed'])).extend({
        name: 'applicationable',
        props: {
            app: Boolean
        },
        computed: {
            applicationProperty: function applicationProperty() {
                return value;
            }
        },
        watch: {
            // If previous value was app
            // reset the provided prop
            app: function app(x, prev) {
                prev ? this.removeApplication(true) : this.callUpdate();
            },
            applicationProperty: function applicationProperty(newVal, oldVal) {
                this.$vuetify.application.unbind(this._uid, oldVal);
            }
        },
        activated: function activated() {
            this.callUpdate();
        },
        created: function created() {
            for (var i = 0, length = events.length; i < length; i++) {
                this.$watch(events[i], this.callUpdate);
            }
            this.callUpdate();
        },
        mounted: function mounted() {
            this.callUpdate();
        },
        deactivated: function deactivated() {
            this.removeApplication();
        },
        destroyed: function destroyed() {
            this.removeApplication();
        },

        methods: {
            callUpdate: function callUpdate() {
                if (!this.app) return;
                this.$vuetify.application.bind(this._uid, this.applicationProperty, this.updateApplication());
            },
            removeApplication: function removeApplication() {
                var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (!force && !this.app) return;
                this.$vuetify.application.unbind(this._uid, this.applicationProperty);
            },

            updateApplication: function updateApplication() {
                return 0;
            }
        }
    });
}
// Util
//# sourceMappingURL=applicationable.js.map