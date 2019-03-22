var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import '../../stylus/components/_expansion-panel.styl';
import Themeable from '../../mixins/themeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Themeable, RegistrableProvide('expansionPanel')).extend({
    name: 'v-expansion-panel',
    provide: function () {
        return {
            expansionPanel: this
        };
    },
    props: {
        disabled: Boolean,
        readonly: Boolean,
        expand: Boolean,
        focusable: Boolean,
        inset: Boolean,
        popout: Boolean,
        value: {
            type: [Number, Array],
            default: function () { return null; }
        }
    },
    data: function () {
        return ({
            items: [],
            open: []
        });
    },
    computed: {
        classes: function () {
            return __assign({ 'v-expansion-panel--focusable': this.focusable, 'v-expansion-panel--popout': this.popout, 'v-expansion-panel--inset': this.inset }, this.themeClasses);
        }
    },
    watch: {
        expand: function (v) {
            var openIndex = -1;
            if (!v) {
                // Close all panels unless only one is open
                var openCount = this.open.reduce(function (acc, val) { return val ? acc + 1 : acc; }, 0);
                var open_1 = Array(this.items.length).fill(false);
                if (openCount === 1) {
                    openIndex = this.open.indexOf(true);
                }
                if (openIndex > -1) {
                    open_1[openIndex] = true;
                }
                this.open = open_1;
            }
            this.$emit('input', v ? this.open : (openIndex > -1 ? openIndex : null));
        },
        value: function (v) {
            this.updateFromValue(v);
        }
    },
    mounted: function () {
        this.value !== null && this.updateFromValue(this.value);
    },
    methods: {
        updateFromValue: function (v) {
            if (Array.isArray(v) && !this.expand)
                return;
            var open = Array(this.items.length).fill(false);
            if (typeof v === 'number') {
                open[v] = true;
            }
            else if (v !== null) {
                open = v;
            }
            this.updatePanels(open);
        },
        updatePanels: function (open) {
            this.open = open;
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].toggle(open && open[i]);
            }
        },
        panelClick: function (uid) {
            var open = this.expand ? this.open.slice() : Array(this.items.length).fill(false);
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i]._uid === uid) {
                    open[i] = !this.open[i];
                    !this.expand && this.$emit('input', open[i] ? i : null);
                }
            }
            this.updatePanels(open);
            if (this.expand)
                this.$emit('input', open);
        },
        register: function (content) {
            var i = this.items.push(content) - 1;
            this.value !== null && this.updateFromValue(this.value);
            content.toggle(!!this.open[i]);
        },
        unregister: function (content) {
            var index = this.items.findIndex(function (i) { return i._uid === content._uid; });
            this.items.splice(index, 1);
            this.open.splice(index, 1);
        }
    },
    render: function (h) {
        return h('ul', {
            staticClass: 'v-expansion-panel',
            class: this.classes
        }, this.$slots.default);
    }
});
//# sourceMappingURL=VExpansionPanel.js.map
//# sourceMappingURL=VExpansionPanel.js.map
//# sourceMappingURL=VExpansionPanel.js.map
//# sourceMappingURL=VExpansionPanel.js.map