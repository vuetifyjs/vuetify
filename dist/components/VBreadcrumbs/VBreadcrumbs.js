var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_breadcrumbs.styl';
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
            default: function () { return ([]); }
        },
        large: Boolean,
        justifyCenter: Boolean,
        justifyEnd: Boolean
    },
    computed: {
        classes: function () {
            return __assign({ 'v-breadcrumbs--large': this.large, 'justify-center': this.justifyCenter, 'justify-end': this.justifyEnd }, this.themeClasses);
        }
    },
    mounted: function () {
        if (this.justifyCenter)
            deprecate('justify-center', 'class="justify-center"', this);
        if (this.justifyEnd)
            deprecate('justify-end', 'class="justify-end"', this);
        if (this.$slots.default)
            deprecate('default slot', ':items and scoped slot "item"', this);
    },
    methods: {
        /* @deprecated */
        genChildren /* istanbul ignore next */: function () {
            if (!this.$slots.default)
                return undefined;
            var children = [];
            var createDividers = false;
            for (var i = 0; i < this.$slots.default.length; i++) {
                var elm = this.$slots.default[i];
                if (!elm.componentOptions ||
                    elm.componentOptions.Ctor.options.name !== 'v-breadcrumbs-item') {
                    children.push(elm);
                }
                else {
                    if (createDividers) {
                        children.push(this.genDivider());
                    }
                    children.push(elm);
                    createDividers = true;
                }
            }
            return children;
        },
        genDivider: function () {
            return this.$createElement(VBreadcrumbsDivider, this.$slots.divider ? this.$slots.divider : this.divider);
        },
        genItems: function () {
            var items = [];
            var hasSlot = !!this.$scopedSlots.item;
            var keys = [];
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                keys.push(item.text);
                if (hasSlot)
                    items.push(this.$scopedSlots.item({ item: item }));
                else
                    items.push(this.$createElement(VBreadcrumbsItem, { key: keys.join('.'), props: item }, [item.text]));
                if (i < this.items.length - 1)
                    items.push(this.genDivider());
            }
            return items;
        }
    },
    render: function (h) {
        var children = this.$slots.default ? this.genChildren() : this.genItems();
        return h('ul', {
            staticClass: 'v-breadcrumbs',
            'class': this.classes
        }, children);
    }
});
//# sourceMappingURL=VBreadcrumbs.js.map