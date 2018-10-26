var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import '../../../src/stylus/components/_data-iterator.styl';
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
        classes: function classes() {
            return _extends({
                'v-data-iterator': true,
                'v-data-iterator--select-all': this.selectAll !== false
            }, this.themeClasses);
        }
    },
    created: function created() {
        this.initPagination();
    },

    methods: {
        genContent: function genContent() {
            var children = this.genItems();
            var data = {
                'class': this.contentClass,
                attrs: this.$attrs,
                on: this.$listeners,
                props: this.contentProps
            };
            return this.$createElement(this.contentTag, data, children);
        },
        genEmptyItems: function genEmptyItems(content) {
            return [this.$createElement('div', {
                'class': 'text-xs-center',
                style: 'width: 100%'
            }, content)];
        },
        genFilteredItems: function genFilteredItems() {
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
        genFooter: function genFooter() {
            var children = [];
            if (this.$slots.footer) {
                children.push(this.$slots.footer);
            }
            if (!this.hideActions) {
                children.push(this.genActions());
            }
            if (!children.length) return null;
            return this.$createElement('div', children);
        },
        genHeader: function genHeader() {
            var children = [];
            if (this.$slots.header) {
                children.push(this.$slots.header);
            }
            if (!children.length) return null;
            return this.$createElement('div', children);
        }
    },
    render: function render(h) {
        return h('div', {
            'class': this.classes
        }, [this.genHeader(), this.genContent(), this.genFooter()]);
    }
};
//# sourceMappingURL=VDataIterator.js.map