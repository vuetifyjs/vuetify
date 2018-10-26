var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import '../../../src/stylus/components/_expansion-panel.styl';
import Themeable from '../../mixins/themeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Themeable, RegistrableProvide('expansionPanel')).extend({
    name: 'v-expansion-panel',
    provide: function provide() {
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
            default: function _default() {
                return null;
            }
        }
    },
    data: function data() {
        return {
            items: [],
            open: []
        };
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-expansion-panel--focusable': this.focusable,
                'v-expansion-panel--popout': this.popout,
                'v-expansion-panel--inset': this.inset
            }, this.themeClasses);
        }
    },
    watch: {
        expand: function expand(v) {
            var openIndex = -1;
            if (!v) {
                // Close all panels unless only one is open
                var openCount = this.open.reduce(function (acc, val) {
                    return val ? acc + 1 : acc;
                }, 0);
                var open = Array(this.items.length).fill(false);
                if (openCount === 1) {
                    openIndex = this.open.indexOf(true);
                }
                if (openIndex > -1) {
                    open[openIndex] = true;
                }
                this.open = open;
            }
            this.$emit('input', v ? this.open : openIndex > -1 ? openIndex : null);
        },
        value: function value(v) {
            this.updateFromValue(v);
        }
    },
    mounted: function mounted() {
        this.value !== null && this.updateFromValue(this.value);
    },

    methods: {
        updateFromValue: function updateFromValue(v) {
            if (Array.isArray(v) && !this.expand) return;
            var open = Array(this.items.length).fill(false);
            if (typeof v === 'number') {
                open[v] = true;
            } else if (v !== null) {
                open = v;
            }
            this.updatePanels(open);
        },
        updatePanels: function updatePanels(open) {
            this.open = open;
            for (var i = 0; i < this.items.length; i++) {
                var active = open && open[i];
                this.items[i].toggle(active);
            }
        },
        panelClick: function panelClick(uid) {
            var open = this.expand ? this.open.slice() : Array(this.items.length).fill(false);
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i]._uid === uid) {
                    open[i] = !this.open[i];
                    !this.expand && this.$emit('input', open[i] ? i : null);
                }
            }
            this.updatePanels(open);
            if (this.expand) this.$emit('input', open);
        },
        register: function register(content) {
            this.items.push(content);
            this.open.push(false);
        },
        unregister: function unregister(content) {
            var index = this.items.findIndex(function (i) {
                return i._uid === content._uid;
            });
            this.items.splice(index, 1);
            this.open.splice(index, 1);
        }
    },
    render: function render(h) {
        return h('ul', {
            staticClass: 'v-expansion-panel',
            class: this.classes
        }, this.$slots.default);
    }
});
//# sourceMappingURL=VExpansionPanel.js.map