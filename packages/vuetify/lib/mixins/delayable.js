import Vue from 'vue';
/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */
export default Vue.extend({
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
    data: function data() {
        return {
            openTimeout: undefined,
            closeTimeout: undefined
        };
    },
    methods: {
        /**
         * Clear any pending delay timers from executing
         */
        clearDelay: function clearDelay() {
            clearTimeout(this.openTimeout);
            clearTimeout(this.closeTimeout);
        },

        /**
         * Runs callback after a specified delay
         */
        runDelay: function runDelay(type, cb) {
            this.clearDelay();
            var delay = parseInt(this[type + 'Delay'], 10);
            this[type + 'Timeout'] = setTimeout(cb, delay);
        }
    }
});
//# sourceMappingURL=delayable.js.map