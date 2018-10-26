import Vue from 'vue';
/* @vue/component */
export default Vue.extend({
    name: 'returnable',
    props: {
        returnValue: null
    },
    data: function data() {
        return {
            isActive: false,
            originalValue: null
        };
    },
    watch: {
        isActive: function isActive(val) {
            if (val) {
                this.originalValue = this.returnValue;
            } else {
                this.$emit('update:returnValue', this.originalValue);
            }
        }
    },
    methods: {
        save: function save(value) {
            this.originalValue = value;
            this.isActive = false;
        }
    }
});
//# sourceMappingURL=returnable.js.map