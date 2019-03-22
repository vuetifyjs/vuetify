import Vue from 'vue';
/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */
export default Vue.extend().extend({
    name: 'delayable',
    props: {
        openDelay: {
            type: [Number, String],
            default: 0
        },
        closeDelay: {
            type: [Number, String],
            default: 0
        }
    },
    data: function () {
        return ({
            openTimeout: undefined,
            closeTimeout: undefined
        });
    },
    methods: {
        /**
         * Clear any pending delay timers from executing
         */
        clearDelay: function () {
            clearTimeout(this.openTimeout);
            clearTimeout(this.closeTimeout);
        },
        /**
         * Runs callback after a specified delay
         */
        runDelay: function (type, cb) {
            var _this = this;
            this.clearDelay();
            var delay = parseInt(this[type + "Delay"], 10);
            this[type + "Timeout"] = setTimeout(cb || (function () {
                _this.isActive = { open: true, close: false }[type];
            }), delay);
        }
    }
});
//# sourceMappingURL=delayable.js.map
//# sourceMappingURL=delayable.js.map
//# sourceMappingURL=delayable.js.map
//# sourceMappingURL=delayable.js.map
//# sourceMappingURL=delayable.js.map