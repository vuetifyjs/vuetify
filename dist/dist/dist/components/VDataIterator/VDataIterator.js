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
import '../../stylus/components/_data-iterator.styl';
import DataIterable from '../../mixins/data-iterable';
/* @vue/component */
export default {
    name: 'v-data-iterator',
    mixins: [DataIterable],
    inheritAttrs: false,
    props: {
        contentTag: {
            type: String,
            default: 'div'
        },
        contentProps: {
            type: Object,
            required: false
        },
        contentClass: {
            type: String,
            required: false
        }
    },
    computed: {
        classes: function () {
            return __assign({ 'v-data-iterator': true, 'v-data-iterator--select-all': this.selectAll !== false }, this.themeClasses);
        }
    },
    created: function () {
        this.initPagination();
    },
    methods: {
        genContent: function () {
            var children = this.genItems();
            var data = {
                'class': this.contentClass,
                attrs: this.$attrs,
                on: this.$listeners,
                props: this.contentProps
            };
            return this.$createElement(this.contentTag, data, children);
        },
        genEmptyItems: function (content) {
            return [this.$createElement('div', {
                    'class': 'text-xs-center',
                    style: 'width: 100%'
                }, content)];
        },
        genFilteredItems: function () {
            if (!this.$scopedSlots.item) {
                return null;
            }
            var items = [];
            for (var index = 0, len = this.filteredItems.length; index < len; ++index) {
                var item = this.filteredItems[index];
                var props = this.createProps(item, index);
                items.push(this.$scopedSlots.item(props));
            }
            return items;
        },
        genFooter: function () {
            var children = [];
            if (this.$slots.footer) {
                children.push(this.$slots.footer);
            }
            if (!this.hideActions) {
                children.push(this.genActions());
            }
            if (!children.length)
                return null;
            return this.$createElement('div', children);
        },
        genHeader: function () {
            var children = [];
            if (this.$slots.header) {
                children.push(this.$slots.header);
            }
            if (!children.length)
                return null;
            return this.$createElement('div', children);
        }
    },
    render: function (h) {
        return h('div', {
            'class': this.classes
        }, [
            this.genHeader(),
            this.genContent(),
            this.genFooter()
        ]);
    }
};
//# sourceMappingURL=VDataIterator.js.map
//# sourceMappingURL=VDataIterator.js.map
//# sourceMappingURL=VDataIterator.js.map