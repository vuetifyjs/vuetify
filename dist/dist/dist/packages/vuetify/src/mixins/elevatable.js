import Vue from 'vue';
export default Vue.extend({
    name: 'elevatable',
    props: {
        elevation: [Number, String]
    },
    computed: {
        computedElevation: function () {
            return this.elevation;
        },
        elevationClasses: function () {
            var _a;
            if (!this.computedElevation)
                return {};
            return _a = {}, _a["elevation-" + this.computedElevation] = true, _a;
        }
    }
});
//# sourceMappingURL=elevatable.js.map
//# sourceMappingURL=elevatable.js.map
//# sourceMappingURL=elevatable.js.map