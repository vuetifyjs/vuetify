var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles
import '../../../src/stylus/components/_breadcrumbs.styl';
// Components
import { VBreadcrumbsDivider, VBreadcrumbsItem } from '.';
// Mixins
import Themeable from '../../mixins/themeable';
// Utils
import { deprecate } from '../../util/console';
import mixins from '../../util/mixins';
export default mixins(Themeable
/* @vue/component */
).extend({
    name: 'v-breadcrumbs',
    props: {
        divider: {
            type: String,
            default: '/'
        },
        items: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        large: Boolean,
        justifyCenter: Boolean,
        justifyEnd: Boolean
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-breadcrumbs--large': this.large,
                'justify-center': this.justifyCenter,
                'justify-end': this.justifyEnd
            }, this.themeClasses);
        }
    },
    mounted: function mounted() {
        if (this.justifyCenter) deprecate('justify-center', 'class="justify-center"', this);
        if (this.justifyEnd) deprecate('justify-end', 'class="justify-end"', this);
        if (this.$slots.default) deprecate('default slot', ':items and scoped slot "item"', this);
    },

    methods: {
        /* @deprecated */
        genChildren /* istanbul ignore next */: function genChildren() {
            if (!this.$slots.default) return undefined;
            var children = [];
            var createDividers = false;
            for (var i = 0; i < this.$slots.default.length; i++) {
                var elm = this.$slots.default[i];
                if (!elm.componentOptions || elm.componentOptions.Ctor.options.name !== 'v-breadcrumbs-item') {
                    children.push(elm);
                } else {
                    if (createDividers) {
                        children.push(this.genDivider());
                    }
                    children.push(elm);
                    createDividers = true;
                }
            }
            return children;
        },
        genDivider: function genDivider() {
            return this.$createElement(VBreadcrumbsDivider, this.$slots.divider ? this.$slots.divider : this.divider);
        },
        genItems: function genItems() {
            var items = [];
            var hasSlot = !!this.$scopedSlots.item;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (hasSlot) items.push(this.$scopedSlots.item({ item: item }));else items.push(this.$createElement(VBreadcrumbsItem, { key: item.text, props: item }, [item.text]));
                if (i < this.items.length - 1) items.push(this.genDivider());
            }
            return items;
        }
    },
    render: function render(h) {
        var children = this.$slots.default ? this.genChildren() : this.genItems();
        return h('ul', {
            staticClass: 'v-breadcrumbs',
            'class': this.classes
        }, children);
    }
});
//# sourceMappingURL=VBreadcrumbs.js.map