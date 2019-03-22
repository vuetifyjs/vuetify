var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m)
        return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length)
                o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
import '../../stylus/components/_cards.styl';
// Components
import VCheckbox from '../VCheckbox';
import VDivider from '../VDivider';
import VSubheader from '../VSubheader';
import { VList, VListTile, VListTileAction, VListTileContent, VListTileTitle } from '../VList';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
// Helpers
import { escapeHTML, getPropertyFromItem } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-select-list',
    mixins: [
        Colorable,
        Themeable
    ],
    props: {
        action: Boolean,
        dense: Boolean,
        hideSelected: Boolean,
        items: {
            type: Array,
            default: function () { return []; }
        },
        itemAvatar: {
            type: [String, Array, Function],
            default: 'avatar'
        },
        itemDisabled: {
            type: [String, Array, Function],
            default: 'disabled'
        },
        itemText: {
            type: [String, Array, Function],
            default: 'text'
        },
        itemValue: {
            type: [String, Array, Function],
            default: 'value'
        },
        noDataText: String,
        noFilter: Boolean,
        searchInput: {
            default: null
        },
        selectedItems: {
            type: Array,
            default: function () { return []; }
        }
    },
    computed: {
        parsedItems: function () {
            var _this = this;
            return this.selectedItems.map(function (item) { return _this.getValue(item); });
        },
        tileActiveClass: function () {
            return Object.keys(this.setTextColor(this.color).class || {}).join(' ');
        },
        staticNoDataTile: function () {
            var tile = {
                on: {
                    mousedown: function (e) { return e.preventDefault(); } // Prevent onBlur from being called
                }
            };
            return this.$createElement(VListTile, tile, [
                this.genTileContent(this.noDataText)
            ]);
        }
    },
    methods: {
        genAction: function (item, inputValue) {
            var _this = this;
            var data = {
                on: {
                    click: function (e) {
                        e.stopPropagation();
                        _this.$emit('select', item);
                    }
                }
            };
            return this.$createElement(VListTileAction, data, [
                this.$createElement(VCheckbox, {
                    props: {
                        color: this.color,
                        inputValue: inputValue
                    }
                })
            ]);
        },
        genDivider: function (props) {
            return this.$createElement(VDivider, { props: props });
        },
        genFilteredText: function (text) {
            text = (text || '').toString();
            if (!this.searchInput || this.noFilter)
                return escapeHTML(text);
            var _a = this.getMaskedCharacters(text), start = _a.start, middle = _a.middle, end = _a.end;
            return "" + escapeHTML(start) + this.genHighlight(middle) + escapeHTML(end);
        },
        genHeader: function (props) {
            return this.$createElement(VSubheader, { props: props }, props.header);
        },
        genHighlight: function (text) {
            return "<span class=\"v-list__tile__mask\">" + escapeHTML(text) + "</span>";
        },
        getMaskedCharacters: function (text) {
            var searchInput = (this.searchInput || '').toString().toLocaleLowerCase();
            var index = text.toLocaleLowerCase().indexOf(searchInput);
            if (index < 0)
                return { start: '', middle: text, end: '' };
            var start = text.slice(0, index);
            var middle = text.slice(index, index + searchInput.length);
            var end = text.slice(index + searchInput.length);
            return { start: start, middle: middle, end: end };
        },
        genTile: function (item, disabled, avatar, value) {
            var _this = this;
            if (disabled === void 0) {
                disabled = null;
            }
            if (avatar === void 0) {
                avatar = false;
            }
            if (value === void 0) {
                value = this.hasItem(item);
            }
            if (item === Object(item)) {
                avatar = this.getAvatar(item);
                disabled = disabled !== null
                    ? disabled
                    : this.getDisabled(item);
            }
            var tile = {
                on: {
                    mousedown: function (e) {
                        // Prevent onBlur from being called
                        e.preventDefault();
                    },
                    click: function () { return disabled || _this.$emit('select', item); }
                },
                props: {
                    activeClass: this.tileActiveClass,
                    avatar: avatar,
                    disabled: disabled,
                    ripple: true,
                    value: value
                }
            };
            if (!this.$scopedSlots.item) {
                return this.$createElement(VListTile, tile, [
                    this.action && !this.hideSelected && this.items.length > 0
                        ? this.genAction(item, value)
                        : null,
                    this.genTileContent(item)
                ]);
            }
            var parent = this;
            var scopedSlot = this.$scopedSlots.item({ parent: parent, item: item, tile: tile });
            return this.needsTile(scopedSlot)
                ? this.$createElement(VListTile, tile, scopedSlot)
                : scopedSlot;
        },
        genTileContent: function (item) {
            var innerHTML = this.genFilteredText(this.getText(item));
            return this.$createElement(VListTileContent, [this.$createElement(VListTileTitle, {
                    domProps: { innerHTML: innerHTML }
                })]);
        },
        hasItem: function (item) {
            return this.parsedItems.indexOf(this.getValue(item)) > -1;
        },
        needsTile: function (slot) {
            return slot.length !== 1 ||
                slot[0].componentOptions == null ||
                slot[0].componentOptions.Ctor.options.name !== 'v-list-tile';
        },
        getAvatar: function (item) {
            return Boolean(getPropertyFromItem(item, this.itemAvatar, false));
        },
        getDisabled: function (item) {
            return Boolean(getPropertyFromItem(item, this.itemDisabled, false));
        },
        getText: function (item) {
            return String(getPropertyFromItem(item, this.itemText, item));
        },
        getValue: function (item) {
            return getPropertyFromItem(item, this.itemValue, this.getText(item));
        }
    },
    render: function () {
        var e_1, _a;
        var children = [];
        try {
            for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (this.hideSelected &&
                    this.hasItem(item))
                    continue;
                if (item == null)
                    children.push(this.genTile(item));
                else if (item.header)
                    children.push(this.genHeader(item));
                else if (item.divider)
                    children.push(this.genDivider(item));
                else
                    children.push(this.genTile(item));
            }
        }
        catch (e_1_1) {
            e_1 = { error: e_1_1 };
        }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            }
            finally {
                if (e_1)
                    throw e_1.error;
            }
        }
        children.length || children.push(this.$slots['no-data'] || this.staticNoDataTile);
        this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item']);
        this.$slots['append-item'] && children.push(this.$slots['append-item']);
        return this.$createElement('div', {
            staticClass: 'v-select-list v-card',
            'class': this.themeClasses
        }, [
            this.$createElement(VList, {
                props: {
                    dense: this.dense
                }
            }, children)
        ]);
    }
};
//# sourceMappingURL=VSelectList.js.map
//# sourceMappingURL=VSelectList.js.map
//# sourceMappingURL=VSelectList.js.map
//# sourceMappingURL=VSelectList.js.map
//# sourceMappingURL=VSelectList.js.map