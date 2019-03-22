import { factory as PositionableFactory } from './positionable';
// Util
import mixins from '../util/mixins';
export default function applicationable(value, events) {
    if (events === void 0) {
        events = [];
    }
    /* @vue/component */
    return mixins(PositionableFactory(['absolute', 'fixed'])).extend({
        name: 'applicationable',
        props: {
            app: Boolean
        },
        computed: {
            applicationProperty: function () {
                return value;
            }
        },
        watch: {
            // If previous value was app
            // reset the provided prop
            app: function (x, prev) {
                prev
                    ? this.removeApplication(true)
                    : this.callUpdate();
            },
            applicationProperty: function (newVal, oldVal) {
                this.$vuetify.application.unbind(this._uid, oldVal);
            }
        },
        activated: function () {
            this.callUpdate();
        },
        created: function () {
            for (var i = 0, length_1 = events.length; i < length_1; i++) {
                this.$watch(events[i], this.callUpdate);
            }
            this.callUpdate();
        },
        mounted: function () {
            this.callUpdate();
        },
        deactivated: function () {
            this.removeApplication();
        },
        destroyed: function () {
            this.removeApplication();
        },
        methods: {
            callUpdate: function () {
                if (!this.app)
                    return;
                this.$vuetify.application.bind(this._uid, this.applicationProperty, this.updateApplication());
            },
            removeApplication: function (force) {
                if (force === void 0) {
                    force = false;
                }
                if (!force && !this.app)
                    return;
                this.$vuetify.application.unbind(this._uid, this.applicationProperty);
            },
            updateApplication: function () { return 0; }
        }
    });
}
//# sourceMappingURL=applicationable.js.map
//# sourceMappingURL=applicationable.js.map
//# sourceMappingURL=applicationable.js.map
//# sourceMappingURL=applicationable.js.map