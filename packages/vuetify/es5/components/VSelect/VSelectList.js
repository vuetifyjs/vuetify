'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_cards.styl');

var _VCheckbox = require('../VCheckbox');

var _VCheckbox2 = _interopRequireDefault(_VCheckbox);

var _VDivider = require('../VDivider');

var _VDivider2 = _interopRequireDefault(_VDivider);

var _VSubheader = require('../VSubheader');

var _VSubheader2 = _interopRequireDefault(_VSubheader);

var _VList = require('../VList');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _helpers = require('../../util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-select-list',
    mixins: [_colorable2.default, _themeable2.default],
    props: {
        action: Boolean,
        dense: Boolean,
        hideSelected: Boolean,
        items: {
            type: Array,
            default: function _default() {
                return [];
            }
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
            default: function _default() {
                return [];
            }
        }
    },
    computed: {
        parsedItems: function parsedItems() {
            var _this = this;

            return this.selectedItems.map(function (item) {
                return _this.getValue(item);
            });
        },
        tileActiveClass: function tileActiveClass() {
            return Object.keys(this.setTextColor(this.color).class || {}).join(' ');
        },
        staticNoDataTile: function staticNoDataTile() {
            var tile = {
                on: {
                    mousedown: function mousedown(e) {
                        return e.preventDefault();
                    } // Prevent onBlur from being called
                }
            };
            return this.$createElement(_VList.VListTile, tile, [this.genTileContent(this.noDataText)]);
        }
    },
    methods: {
        genAction: function genAction(item, inputValue) {
            var _this2 = this;

            var data = {
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        _this2.$emit('select', item);
                    }
                }
            };
            return this.$createElement(_VList.VListTileAction, data, [this.$createElement(_VCheckbox2.default, {
                props: {
                    color: this.color,
                    inputValue: inputValue
                }
            })]);
        },
        genDivider: function genDivider(props) {
            return this.$createElement(_VDivider2.default, { props: props });
        },
        genFilteredText: function genFilteredText(text) {
            text = (text || '').toString();
            if (!this.searchInput || this.noFilter) return (0, _helpers.escapeHTML)(text);

            var _getMaskedCharacters = this.getMaskedCharacters(text),
                start = _getMaskedCharacters.start,
                middle = _getMaskedCharacters.middle,
                end = _getMaskedCharacters.end;

            return '' + (0, _helpers.escapeHTML)(start) + this.genHighlight(middle) + (0, _helpers.escapeHTML)(end);
        },
        genHeader: function genHeader(props) {
            return this.$createElement(_VSubheader2.default, { props: props }, props.header);
        },
        genHighlight: function genHighlight(text) {
            return '<span class="v-list__tile__mask">' + (0, _helpers.escapeHTML)(text) + '</span>';
        },
        getMaskedCharacters: function getMaskedCharacters(text) {
            var searchInput = (this.searchInput || '').toString().toLowerCase();
            var index = text.toLowerCase().indexOf(searchInput);
            if (index < 0) return { start: '', middle: text, end: '' };
            var start = text.slice(0, index);
            var middle = text.slice(index, index + searchInput.length);
            var end = text.slice(index + searchInput.length);
            return { start: start, middle: middle, end: end };
        },
        genTile: function genTile(item) {
            var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var _this3 = this;

            var avatar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.hasItem(item);

            if (item === Object(item)) {
                avatar = this.getAvatar(item);
                disabled = disabled !== null ? disabled : this.getDisabled(item);
            }
            var tile = {
                on: {
                    mousedown: function mousedown(e) {
                        // Prevent onBlur from being called
                        e.preventDefault();
                    },
                    click: function click() {
                        return disabled || _this3.$emit('select', item);
                    }
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
                return this.$createElement(_VList.VListTile, tile, [this.action && !this.hideSelected && this.items.length > 0 ? this.genAction(item, value) : null, this.genTileContent(item)]);
            }
            var parent = this;
            var scopedSlot = this.$scopedSlots.item({ parent: parent, item: item, tile: tile });
            return this.needsTile(scopedSlot) ? this.$createElement(_VList.VListTile, tile, [scopedSlot]) : scopedSlot;
        },
        genTileContent: function genTileContent(item) {
            var innerHTML = this.genFilteredText(this.getText(item));
            return this.$createElement(_VList.VListTileContent, [this.$createElement(_VList.VListTileTitle, {
                domProps: { innerHTML: innerHTML }
            })]);
        },
        hasItem: function hasItem(item) {
            return this.parsedItems.indexOf(this.getValue(item)) > -1;
        },
        needsTile: function needsTile(tile) {
            return tile.componentOptions == null || tile.componentOptions.Ctor.options.name !== 'v-list-tile';
        },
        getAvatar: function getAvatar(item) {
            return Boolean((0, _helpers.getPropertyFromItem)(item, this.itemAvatar, false));
        },
        getDisabled: function getDisabled(item) {
            return Boolean((0, _helpers.getPropertyFromItem)(item, this.itemDisabled, false));
        },
        getText: function getText(item) {
            return String((0, _helpers.getPropertyFromItem)(item, this.itemText, item));
        },
        getValue: function getValue(item) {
            return (0, _helpers.getPropertyFromItem)(item, this.itemValue, this.getText(item));
        }
    },
    render: function render() {
        var children = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (this.hideSelected && this.hasItem(item)) continue;
                if (item == null) children.push(this.genTile(item));else if (item.header) children.push(this.genHeader(item));else if (item.divider) children.push(this.genDivider(item));else children.push(this.genTile(item));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        children.length || children.push(this.$slots['no-data'] || this.staticNoDataTile);
        this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item']);
        this.$slots['append-item'] && children.push(this.$slots['append-item']);
        return this.$createElement('div', {
            staticClass: 'v-select-list v-card',
            'class': this.themeClasses
        }, [this.$createElement(_VList.VList, {
            props: {
                dense: this.dense
            }
        }, children)]);
    }
};
// Helpers

// Mixins

// Components
//# sourceMappingURL=VSelectList.js.map