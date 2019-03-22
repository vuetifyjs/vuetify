// Extensions
import VWindow from '../VWindow/VWindow';
/* @vue/component */
export default VWindow.extend({
    name: 'v-tabs-items',
    inject: {
        registerItems: {
            default: null
        },
        tabProxy: {
            default: null
        },
        unregisterItems: {
            default: null
        }
    },
    props: {
        cycle: Boolean
    },
    watch: {
        internalValue: function (val) {
            /* istanbul ignore else */
            if (this.tabProxy)
                this.tabProxy(val);
        }
    },
    created: function () {
        this.registerItems && this.registerItems(this.changeModel);
    },
    beforeDestroy: function () {
        this.unregisterItems && this.unregisterItems();
    },
    methods: {
        changeModel: function (val) {
            this.internalValue = val;
        },
        // For backwards compatability with v1.2
        getValue: function (item, i) {
            /* istanbul ignore if */
            if (item.id)
                return item.id;
            return VWindow.options.methods.getValue.call(this, item, i);
        },
        next: function () {
            if (!this.cycle && this.internalIndex === this.items.length - 1) {
                return;
            }
            VWindow.options.methods.next.call(this);
        },
        prev: function () {
            if (!this.cycle && this.internalIndex === 0) {
                return;
            }
            VWindow.options.methods.prev.call(this);
        }
    }
});
//# sourceMappingURL=VTabsItems.js.map