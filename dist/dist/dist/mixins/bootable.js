import Vue from 'vue';
/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
/* @vue/component */
export default Vue.extend().extend({
    name: 'bootable',
    props: {
        lazy: Boolean
    },
    data: function () {
        return ({
            isBooted: false
        });
    },
    computed: {
        hasContent: function () {
            return this.isBooted || !this.lazy || this.isActive;
        }
    },
    watch: {
        isActive: function () {
            this.isBooted = true;
        }
    },
    methods: {
        showLazyContent: function (content) {
            return this.hasContent ? content : undefined;
        }
    }
});
//# sourceMappingURL=bootable.js.map
//# sourceMappingURL=bootable.js.map
//# sourceMappingURL=bootable.js.map