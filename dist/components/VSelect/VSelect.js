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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
// Styles
import '../../stylus/components/_text-fields.styl';
import '../../stylus/components/_select.styl';
// Components
import VChip from '../VChip';
import VMenu from '../VMenu';
import VSelectList from './VSelectList';
// Extensions
import VTextField from '../VTextField/VTextField';
// Mixins
import Comparable from '../../mixins/comparable';
import Filterable from '../../mixins/filterable';
// Directives
import ClickOutside from '../../directives/click-outside';
// Helpers
import { camelize, getPropertyFromItem, keyCodes } from '../../util/helpers';
import { consoleError, consoleWarn } from '../../util/console';
export var defaultMenuProps = {
    closeOnClick: false,
    closeOnContentClick: false,
    openOnClick: false,
    maxHeight: 300
};
/* @vue/component */
export default VTextField.extend({
    name: 'v-select',
    directives: {
        ClickOutside: ClickOutside
    },
    mixins: [
        Comparable,
        Filterable
    ],
    props: {
        appendIcon: {
            type: String,
            default: '$vuetify.icons.dropdown'
        },
        appendIconCb: Function,
        attach: {
            type: null,
            default: false
        },
        browserAutocomplete: {
            type: String,
            default: 'on'
        },
        cacheItems: Boolean,
        chips: Boolean,
        clearable: Boolean,
        deletableChips: Boolean,
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
        menuProps: {
            type: [String, Array, Object],
            default: function () { return defaultMenuProps; }
        },
        multiple: Boolean,
        openOnClear: Boolean,
        returnObject: Boolean,
        searchInput: {
            default: null
        },
        smallChips: Boolean
    },
    data: function (vm) { return ({
        attrsInput: { role: 'combobox' },
        cachedItems: vm.cacheItems ? vm.items : [],
        content: null,
        isBooted: false,
        isMenuActive: false,
        lastItem: 20,
        // As long as a value is defined, show it
        // Otherwise, check if multiple
        // to determine which default to provide
        lazyValue: vm.value !== undefined
            ? vm.value
            : vm.multiple ? [] : undefined,
        selectedIndex: -1,
        selectedItems: [],
        keyboardLookupPrefix: '',
        keyboardLookupLastTime: 0
    }); },
    computed: {
        /* All items that the select has */
        allItems: function () {
            return this.filterDuplicates(this.cachedItems.concat(this.items));
        },
        classes: function () {
            return Object.assign({}, VTextField.options.computed.classes.call(this), {
                'v-select': true,
                'v-select--chips': this.hasChips,
                'v-select--chips--small': this.smallChips,
                'v-select--is-menu-active': this.isMenuActive
            });
        },
        /* Used by other components to overwrite */
        computedItems: function () {
            return this.allItems;
        },
        counterValue: function () {
            return this.multiple
                ? this.selectedItems.length
                : (this.getText(this.selectedItems[0]) || '').toString().length;
        },
        directives: function () {
            return this.isFocused ? [{
                    name: 'click-outside',
                    value: this.blur,
                    args: {
                        closeConditional: this.closeConditional
                    }
                }] : undefined;
        },
        dynamicHeight: function () {
            return 'auto';
        },
        hasChips: function () {
            return this.chips || this.smallChips;
        },
        hasSlot: function () {
            return Boolean(this.hasChips || this.$scopedSlots.selection);
        },
        isDirty: function () {
            return this.selectedItems.length > 0;
        },
        listData: function () {
            var _a;
            var scopeId = this.$vnode && this.$vnode.context.$options._scopeId;
            return {
                attrs: scopeId ? (_a = {},
                    _a[scopeId] = true,
                    _a) : null,
                props: {
                    action: this.multiple && !this.isHidingSelected,
                    color: this.color,
                    dense: this.dense,
                    hideSelected: this.hideSelected,
                    items: this.virtualizedItems,
                    noDataText: this.$vuetify.t(this.noDataText),
                    selectedItems: this.selectedItems,
                    itemAvatar: this.itemAvatar,
                    itemDisabled: this.itemDisabled,
                    itemValue: this.itemValue,
                    itemText: this.itemText
                },
                on: {
                    select: this.selectItem
                },
                scopedSlots: {
                    item: this.$scopedSlots.item
                }
            };
        },
        staticList: function () {
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                consoleError('assert: staticList should not be called if slots are used');
            }
            return this.$createElement(VSelectList, this.listData);
        },
        virtualizedItems: function () {
            return this.$_menuProps.auto
                ? this.computedItems
                : this.computedItems.slice(0, this.lastItem);
        },
        menuCanShow: function () { return true; },
        $_menuProps: function () {
            var normalisedProps;
            normalisedProps = typeof this.menuProps === 'string'
                ? this.menuProps.split(',')
                : this.menuProps;
            if (Array.isArray(normalisedProps)) {
                normalisedProps = normalisedProps.reduce(function (acc, p) {
                    acc[p.trim()] = true;
                    return acc;
                }, {});
            }
            return __assign({}, defaultMenuProps, { value: this.menuCanShow && this.isMenuActive, nudgeBottom: this.nudgeBottom
                    ? this.nudgeBottom
                    : normalisedProps.offsetY ? 1 : 0 }, normalisedProps);
        }
    },
    watch: {
        internalValue: function (val) {
            this.initialValue = val;
            this.setSelectedItems();
        },
        isBooted: function () {
            var _this = this;
            this.$nextTick(function () {
                if (_this.content && _this.content.addEventListener) {
                    _this.content.addEventListener('scroll', _this.onScroll, false);
                }
            });
        },
        isMenuActive: function (val) {
            if (!val)
                return;
            this.isBooted = true;
        },
        items: {
            immediate: true,
            handler: function (val) {
                if (this.cacheItems) {
                    this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
                }
                this.setSelectedItems();
            }
        }
    },
    mounted: function () {
        this.content = this.$refs.menu && this.$refs.menu.$refs.content;
    },
    methods: {
        /** @public */
        blur: function (e) {
            this.isMenuActive = false;
            this.isFocused = false;
            this.$refs.input && this.$refs.input.blur();
            this.selectedIndex = -1;
            this.onBlur(e);
        },
        /** @public */
        activateMenu: function () {
            this.isMenuActive = true;
        },
        clearableCallback: function () {
            var _this = this;
            this.setValue(this.multiple ? [] : undefined);
            this.$nextTick(function () { return _this.$refs.input.focus(); });
            if (this.openOnClear)
                this.isMenuActive = true;
        },
        closeConditional: function (e) {
            return (
            // Click originates from outside the menu content
            !!this.content &&
                !this.content.contains(e.target) &&
                // Click originates from outside the element
                !!this.$el &&
                !this.$el.contains(e.target) &&
                e.target !== this.$el);
        },
        filterDuplicates: function (arr) {
            var uniqueValues = new Map();
            for (var index = 0; index < arr.length; ++index) {
                var item = arr[index];
                var val = this.getValue(item);
                // TODO: comparator
                !uniqueValues.has(val) && uniqueValues.set(val, item);
            }
            return Array.from(uniqueValues.values());
        },
        findExistingIndex: function (item) {
            var _this = this;
            var itemValue = this.getValue(item);
            return (this.internalValue || []).findIndex(function (i) { return _this.valueComparator(_this.getValue(i), itemValue); });
        },
        genChipSelection: function (item, index) {
            var _this = this;
            var isDisabled = (this.disabled ||
                this.readonly ||
                this.getDisabled(item));
            return this.$createElement(VChip, {
                staticClass: 'v-chip--select-multi',
                attrs: { tabindex: -1 },
                props: {
                    close: this.deletableChips && !isDisabled,
                    disabled: isDisabled,
                    selected: index === this.selectedIndex,
                    small: this.smallChips
                },
                on: {
                    click: function (e) {
                        if (isDisabled)
                            return;
                        e.stopPropagation();
                        _this.selectedIndex = index;
                    },
                    input: function () { return _this.onChipInput(item); }
                },
                key: this.getValue(item)
            }, this.getText(item));
        },
        genCommaSelection: function (item, index, last) {
            // Item may be an object
            // TODO: Remove JSON.stringify
            var key = JSON.stringify(this.getValue(item));
            var color = index === this.selectedIndex && this.color;
            var isDisabled = (this.disabled ||
                this.getDisabled(item));
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-select__selection v-select__selection--comma',
                'class': {
                    'v-select__selection--disabled': isDisabled
                },
                key: key
            }), "" + this.getText(item) + (last ? '' : ', '));
        },
        genDefaultSlot: function () {
            var selections = this.genSelections();
            var input = this.genInput();
            // If the return is an empty array
            // push the input
            if (Array.isArray(selections)) {
                selections.push(input);
                // Otherwise push it into children
            }
            else {
                selections.children = selections.children || [];
                selections.children.push(input);
            }
            return [
                this.$createElement('div', {
                    staticClass: 'v-select__slot',
                    directives: this.directives
                }, [
                    this.genLabel(),
                    this.prefix ? this.genAffix('prefix') : null,
                    selections,
                    this.suffix ? this.genAffix('suffix') : null,
                    this.genClearIcon(),
                    this.genIconSlot()
                ]),
                this.genMenu(),
                this.genProgress()
            ];
        },
        genInput: function () {
            var input = VTextField.options.methods.genInput.call(this);
            input.data.domProps.value = null;
            input.data.attrs.readonly = true;
            input.data.attrs['aria-readonly'] = String(this.readonly);
            input.data.on.keypress = this.onKeyPress;
            return input;
        },
        genList: function () {
            // If there's no slots, we can use a cached VNode to improve performance
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                return this.genListWithSlot();
            }
            else {
                return this.staticList;
            }
        },
        genListWithSlot: function () {
            var _this = this;
            var slots = ['prepend-item', 'no-data', 'append-item']
                .filter(function (slotName) { return _this.$slots[slotName]; })
                .map(function (slotName) { return _this.$createElement('template', {
                slot: slotName
            }, _this.$slots[slotName]); });
            // Requires destructuring due to Vue
            // modifying the `on` property when passed
            // as a referenced object
            return this.$createElement(VSelectList, __assign({}, this.listData), slots);
        },
        genMenu: function () {
            var _this = this;
            var e_1, _a;
            var props = this.$_menuProps;
            props.activator = this.$refs['input-slot'];
            // Deprecate using menu props directly
            // TODO: remove (2.0)
            var inheritedProps = Object.keys(VMenu.options.props);
            var deprecatedProps = Object.keys(this.$attrs).reduce(function (acc, attr) {
                if (inheritedProps.includes(camelize(attr)))
                    acc.push(attr);
                return acc;
            }, []);
            try {
                for (var deprecatedProps_1 = __values(deprecatedProps), deprecatedProps_1_1 = deprecatedProps_1.next(); !deprecatedProps_1_1.done; deprecatedProps_1_1 = deprecatedProps_1.next()) {
                    var prop = deprecatedProps_1_1.value;
                    props[camelize(prop)] = this.$attrs[prop];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (deprecatedProps_1_1 && !deprecatedProps_1_1.done && (_a = deprecatedProps_1.return)) _a.call(deprecatedProps_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (process.env.NODE_ENV !== 'production') {
                if (deprecatedProps.length) {
                    var multiple = deprecatedProps.length > 1;
                    var replacement_1 = deprecatedProps.reduce(function (acc, p) {
                        acc[camelize(p)] = _this.$attrs[p];
                        return acc;
                    }, {});
                    var props_1 = deprecatedProps.map(function (p) { return "'" + p + "'"; }).join(', ');
                    var separator = multiple ? '\n' : '\'';
                    var onlyBools = Object.keys(replacement_1).every(function (prop) {
                        var propType = VMenu.options.props[prop];
                        var value = replacement_1[prop];
                        return value === true || ((propType.type || propType) === Boolean && value === '');
                    });
                    if (onlyBools) {
                        replacement_1 = Object.keys(replacement_1).join(', ');
                    }
                    else {
                        replacement_1 = JSON.stringify(replacement_1, null, multiple ? 2 : 0)
                            .replace(/"([^(")"]+)":/g, '$1:')
                            .replace(/"/g, '\'');
                    }
                    consoleWarn(props_1 + " " + (multiple ? 'are' : 'is') + " deprecated, use " +
                        ("" + separator + (onlyBools ? '' : ':') + "menu-props=\"" + replacement_1 + "\"" + separator + " instead"), this);
                }
            }
            // Attach to root el so that
            // menu covers prepend/append icons
            if (
            // TODO: make this a computed property or helper or something
            this.attach === '' || // If used as a boolean prop (<v-menu attach>)
                this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
                this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
            ) {
                props.attach = this.$el;
            }
            else {
                props.attach = this.attach;
            }
            return this.$createElement(VMenu, {
                props: props,
                on: {
                    input: function (val) {
                        _this.isMenuActive = val;
                        _this.isFocused = val;
                    }
                },
                ref: 'menu'
            }, [this.genList()]);
        },
        genSelections: function () {
            var length = this.selectedItems.length;
            var children = new Array(length);
            var genSelection;
            if (this.$scopedSlots.selection) {
                genSelection = this.genSlotSelection;
            }
            else if (this.hasChips) {
                genSelection = this.genChipSelection;
            }
            else {
                genSelection = this.genCommaSelection;
            }
            while (length--) {
                children[length] = genSelection(this.selectedItems[length], length, length === children.length - 1);
            }
            return this.$createElement('div', {
                staticClass: 'v-select__selections'
            }, children);
        },
        genSlotSelection: function (item, index) {
            return this.$scopedSlots.selection({
                parent: this,
                item: item,
                index: index,
                selected: index === this.selectedIndex,
                disabled: this.disabled || this.readonly
            });
        },
        getMenuIndex: function () {
            return this.$refs.menu ? this.$refs.menu.listIndex : -1;
        },
        getDisabled: function (item) {
            return getPropertyFromItem(item, this.itemDisabled, false);
        },
        getText: function (item) {
            return getPropertyFromItem(item, this.itemText, item);
        },
        getValue: function (item) {
            return getPropertyFromItem(item, this.itemValue, this.getText(item));
        },
        onBlur: function (e) {
            this.$emit('blur', e);
        },
        onChipInput: function (item) {
            if (this.multiple)
                this.selectItem(item);
            else
                this.setValue(null);
            // If all items have been deleted,
            // open `v-menu`
            if (this.selectedItems.length === 0) {
                this.isMenuActive = true;
            }
            this.selectedIndex = -1;
        },
        onClick: function () {
            if (this.isDisabled)
                return;
            this.isMenuActive = true;
            if (!this.isFocused) {
                this.isFocused = true;
                this.$emit('focus');
            }
        },
        onEnterDown: function () {
            this.onBlur();
        },
        onEscDown: function (e) {
            e.preventDefault();
            if (this.isMenuActive) {
                e.stopPropagation();
                this.isMenuActive = false;
            }
        },
        onKeyPress: function (e) {
            var _this = this;
            if (this.multiple)
                return;
            var KEYBOARD_LOOKUP_THRESHOLD = 1000; // milliseconds
            var now = performance.now();
            if (now - this.keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
                this.keyboardLookupPrefix = '';
            }
            this.keyboardLookupPrefix += e.key.toLowerCase();
            this.keyboardLookupLastTime = now;
            var item = this.allItems.find(function (item) { return _this.getText(item).toLowerCase().startsWith(_this.keyboardLookupPrefix); });
            if (item !== undefined) {
                this.setValue(this.returnObject ? item : this.getValue(item));
            }
        },
        onKeyDown: function (e) {
            var keyCode = e.keyCode;
            // If enter, space, up, or down is pressed, open menu
            if (!this.readonly && !this.isMenuActive && [
                keyCodes.enter,
                keyCodes.space,
                keyCodes.up, keyCodes.down
            ].includes(keyCode))
                this.activateMenu();
            if (this.isMenuActive && this.$refs.menu)
                this.$refs.menu.changeListIndex(e);
            // This should do something different
            if (keyCode === keyCodes.enter)
                return this.onEnterDown(e);
            // If escape deactivate the menu
            if (keyCode === keyCodes.esc)
                return this.onEscDown(e);
            // If tab - select item or close menu
            if (keyCode === keyCodes.tab)
                return this.onTabDown(e);
        },
        onMouseUp: function (e) {
            var _this = this;
            if (this.hasMouseDown) {
                var appendInner = this.$refs['append-inner'];
                // If append inner is present
                // and the target is itself
                // or inside, toggle menu
                if (this.isMenuActive &&
                    appendInner &&
                    (appendInner === e.target ||
                        appendInner.contains(e.target))) {
                    this.$nextTick(function () { return (_this.isMenuActive = !_this.isMenuActive); });
                    // If user is clicking in the container
                    // and field is enclosed, activate it
                }
                else if (this.isEnclosed && !this.isDisabled) {
                    this.isMenuActive = true;
                }
            }
            VTextField.options.methods.onMouseUp.call(this, e);
        },
        onScroll: function () {
            var _this = this;
            if (!this.isMenuActive) {
                requestAnimationFrame(function () { return (_this.content.scrollTop = 0); });
            }
            else {
                if (this.lastItem >= this.computedItems.length)
                    return;
                var showMoreItems = (this.content.scrollHeight -
                    (this.content.scrollTop +
                        this.content.clientHeight)) < 200;
                if (showMoreItems) {
                    this.lastItem += 20;
                }
            }
        },
        onTabDown: function (e) {
            var menuIndex = this.getMenuIndex();
            var listTile = this.$refs.menu.tiles[menuIndex];
            // An item that is selected by
            // menu-index should toggled
            if (listTile &&
                listTile.className.indexOf('v-list__tile--highlighted') > -1 &&
                this.isMenuActive &&
                menuIndex > -1) {
                e.preventDefault();
                e.stopPropagation();
                listTile.click();
            }
            else {
                // If we make it here,
                // the user has no selected indexes
                // and is probably tabbing out
                this.blur(e);
            }
        },
        selectItem: function (item) {
            var _this = this;
            if (!this.multiple) {
                this.setValue(this.returnObject ? item : this.getValue(item));
                this.isMenuActive = false;
            }
            else {
                var internalValue = (this.internalValue || []).slice();
                var i = this.findExistingIndex(item);
                i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item);
                this.setValue(internalValue.map(function (i) {
                    return _this.returnObject ? i : _this.getValue(i);
                }));
                // When selecting multiple
                // adjust menu after each
                // selection
                this.$nextTick(function () {
                    _this.$refs.menu &&
                        _this.$refs.menu.updateDimensions();
                });
            }
        },
        setMenuIndex: function (index) {
            this.$refs.menu && (this.$refs.menu.listIndex = index);
        },
        setSelectedItems: function () {
            var _this = this;
            var e_2, _a;
            var selectedItems = [];
            var values = !this.multiple || !Array.isArray(this.internalValue)
                ? [this.internalValue]
                : this.internalValue;
            var _loop_1 = function (value) {
                var index = this_1.allItems.findIndex(function (v) { return _this.valueComparator(_this.getValue(v), _this.getValue(value)); });
                if (index > -1) {
                    selectedItems.push(this_1.allItems[index]);
                }
            };
            var this_1 = this;
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    _loop_1(value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.selectedItems = selectedItems;
        },
        setValue: function (value) {
            var oldValue = this.internalValue;
            this.internalValue = value;
            value !== oldValue && this.$emit('change', value);
        }
    }
});
//# sourceMappingURL=VSelect.js.map