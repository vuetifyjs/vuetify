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
export const defaultMenuProps = {
    closeOnClick: false,
    closeOnContentClick: false,
    openOnClick: false,
    maxHeight: 300
};
/* @vue/component */
export default {
    name: 'v-select',
    directives: {
        ClickOutside
    },
    extends: VTextField,
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
            default: () => []
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
            default: () => defaultMenuProps
        },
        multiple: Boolean,
        openOnClear: Boolean,
        returnObject: Boolean,
        searchInput: {
            default: null
        },
        smallChips: Boolean
    },
    data: vm => ({
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
        selectedItems: []
    }),
    computed: {
        /* All items that the select has */
        allItems() {
            return this.filterDuplicates(this.cachedItems.concat(this.items));
        },
        classes() {
            return Object.assign({}, VTextField.computed.classes.call(this), {
                'v-select': true,
                'v-select--chips': this.hasChips,
                'v-select--chips--small': this.smallChips,
                'v-select--is-menu-active': this.isMenuActive
            });
        },
        /* Used by other components to overwrite */
        computedItems() {
            return this.allItems;
        },
        counterValue() {
            return this.multiple
                ? this.selectedItems.length
                : (this.getText(this.selectedItems[0]) || '').toString().length;
        },
        directives() {
            return this.isFocused ? [{
                    name: 'click-outside',
                    value: this.blur,
                    args: {
                        closeConditional: this.closeConditional
                    }
                }] : undefined;
        },
        dynamicHeight() {
            return 'auto';
        },
        hasChips() {
            return this.chips || this.smallChips;
        },
        hasSlot() {
            return Boolean(this.hasChips || this.$scopedSlots.selection);
        },
        isDirty() {
            return this.selectedItems.length > 0;
        },
        listData() {
            return {
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
        staticList() {
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                consoleError('assert: staticList should not be called if slots are used');
            }
            return this.$createElement(VSelectList, this.listData);
        },
        virtualizedItems() {
            return this.$_menuProps.auto
                ? this.computedItems
                : this.computedItems.slice(0, this.lastItem);
        },
        menuCanShow() { return true; },
        $_menuProps() {
            let normalisedProps;
            normalisedProps = typeof this.menuProps === 'string'
                ? this.menuProps.split(',')
                : this.menuProps;
            if (Array.isArray(normalisedProps)) {
                normalisedProps = normalisedProps.reduce((acc, p) => {
                    acc[p.trim()] = true;
                    return acc;
                }, {});
            }
            return {
                ...defaultMenuProps,
                value: this.menuCanShow && this.isMenuActive,
                nudgeBottom: this.nudgeBottom
                    ? this.nudgeBottom
                    : normalisedProps.offsetY ? 1 : 0,
                ...normalisedProps
            };
        }
    },
    watch: {
        internalValue(val) {
            this.initialValue = val;
            this.setSelectedItems();
        },
        isBooted() {
            this.$nextTick(() => {
                if (this.content && this.content.addEventListener) {
                    this.content.addEventListener('scroll', this.onScroll, false);
                }
            });
        },
        isMenuActive(val) {
            if (!val)
                return;
            this.isBooted = true;
        },
        items: {
            immediate: true,
            handler(val) {
                if (this.cacheItems) {
                    this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
                }
                this.setSelectedItems();
            }
        }
    },
    mounted() {
        this.content = this.$refs.menu && this.$refs.menu.$refs.content;
    },
    methods: {
        /** @public */
        blur() {
            this.isMenuActive = false;
            this.isFocused = false;
            this.$refs.input && this.$refs.input.blur();
            this.selectedIndex = -1;
        },
        /** @public */
        activateMenu() {
            this.isMenuActive = true;
        },
        clearableCallback() {
            this.setValue(this.multiple ? [] : undefined);
            this.$nextTick(() => this.$refs.input.focus());
            if (this.openOnClear)
                this.isMenuActive = true;
        },
        closeConditional(e) {
            return (
            // Click originates from outside the menu content
            !!this.content &&
                !this.content.contains(e.target) &&
                // Click originates from outside the element
                !!this.$el &&
                !this.$el.contains(e.target) &&
                e.target !== this.$el);
        },
        filterDuplicates(arr) {
            const uniqueValues = new Map();
            for (let index = 0; index < arr.length; ++index) {
                const item = arr[index];
                const val = this.getValue(item);
                // TODO: comparator
                !uniqueValues.has(val) && uniqueValues.set(val, item);
            }
            return Array.from(uniqueValues.values());
        },
        findExistingIndex(item) {
            const itemValue = this.getValue(item);
            return (this.internalValue || []).findIndex(i => this.valueComparator(this.getValue(i), itemValue));
        },
        genChipSelection(item, index) {
            const isDisabled = (this.disabled ||
                this.readonly ||
                this.getDisabled(item));
            const focus = (e, cb) => {
                if (isDisabled)
                    return;
                e.stopPropagation();
                this.onFocus();
                cb && cb();
            };
            return this.$createElement(VChip, {
                staticClass: 'v-chip--select-multi',
                props: {
                    close: this.deletableChips && !isDisabled,
                    disabled: isDisabled,
                    selected: index === this.selectedIndex,
                    small: this.smallChips
                },
                on: {
                    click: e => {
                        focus(e, () => {
                            this.selectedIndex = index;
                        });
                    },
                    focus,
                    input: () => this.onChipInput(item)
                },
                key: this.getValue(item)
            }, this.getText(item));
        },
        genCommaSelection(item, index, last) {
            // Item may be an object
            // TODO: Remove JSON.stringify
            const key = JSON.stringify(this.getValue(item));
            const color = index === this.selectedIndex && this.color;
            const isDisabled = (this.disabled ||
                this.getDisabled(item));
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-select__selection v-select__selection--comma',
                'class': {
                    'v-select__selection--disabled': isDisabled
                },
                key
            }), `${this.getText(item)}${last ? '' : ', '}`);
        },
        genDefaultSlot() {
            const selections = this.genSelections();
            const input = this.genInput();
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
        genInput() {
            const input = VTextField.methods.genInput.call(this);
            input.data.domProps.value = null;
            input.data.attrs.readonly = true;
            input.data.attrs['aria-readonly'] = String(this.readonly);
            return input;
        },
        genList() {
            // If there's no slots, we can use a cached VNode to improve performance
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                return this.genListWithSlot();
            }
            else {
                return this.staticList;
            }
        },
        genListWithSlot() {
            const slots = ['prepend-item', 'no-data', 'append-item']
                .filter(slotName => this.$slots[slotName])
                .map(slotName => this.$createElement('template', {
                slot: slotName
            }, this.$slots[slotName]));
            // Requires destructuring due to Vue
            // modifying the `on` property when passed
            // as a referenced object
            return this.$createElement(VSelectList, {
                ...this.listData
            }, slots);
        },
        genMenu() {
            const props = this.$_menuProps;
            props.activator = this.$refs['input-slot'];
            // Deprecate using menu props directly
            // TODO: remove (2.0)
            const inheritedProps = Object.keys(VMenu.options.props);
            const deprecatedProps = Object.keys(this.$attrs).reduce((acc, attr) => {
                if (inheritedProps.includes(camelize(attr)))
                    acc.push(attr);
                return acc;
            }, []);
            for (const prop of deprecatedProps) {
                props[camelize(prop)] = this.$attrs[prop];
            }
            if (process.env.NODE_ENV !== 'production') {
                if (deprecatedProps.length) {
                    const multiple = deprecatedProps.length > 1;
                    let replacement = deprecatedProps.reduce((acc, p) => {
                        acc[camelize(p)] = this.$attrs[p];
                        return acc;
                    }, {});
                    const props = deprecatedProps.map(p => `'${p}'`).join(', ');
                    const separator = multiple ? '\n' : '\'';
                    const onlyBools = Object.keys(replacement).every(prop => {
                        const propType = VMenu.options.props[prop];
                        const value = replacement[prop];
                        return value === true || ((propType.type || propType) === Boolean && value === '');
                    });
                    if (onlyBools) {
                        replacement = Object.keys(replacement).join(', ');
                    }
                    else {
                        replacement = JSON.stringify(replacement, null, multiple ? 2 : 0).replace(/"([^(")"]+)":/g, '$1:').replace(/"/g, '\'');
                    }
                    consoleWarn(`${props} ${multiple ? 'are' : 'is'} deprecated, use ${separator}:menu-props="${replacement}"${separator} instead`, this);
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
                props,
                on: {
                    input: val => {
                        this.isMenuActive = val;
                        this.isFocused = val;
                    }
                },
                ref: 'menu'
            }, [this.genList()]);
        },
        genSelections() {
            let length = this.selectedItems.length;
            const children = new Array(length);
            let genSelection;
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
        genSlotSelection(item, index) {
            return this.$scopedSlots.selection({
                parent: this,
                item,
                index,
                selected: index === this.selectedIndex,
                disabled: this.disabled || this.readonly
            });
        },
        getMenuIndex() {
            return this.$refs.menu ? this.$refs.menu.listIndex : -1;
        },
        getDisabled(item) {
            return getPropertyFromItem(item, this.itemDisabled, false);
        },
        getText(item) {
            return getPropertyFromItem(item, this.itemText, item);
        },
        getValue(item) {
            return getPropertyFromItem(item, this.itemValue, this.getText(item));
        },
        onBlur(e) {
            this.$emit('blur', e);
        },
        onChipInput(item) {
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
        onClick() {
            if (this.isDisabled)
                return;
            this.isMenuActive = true;
            if (!this.isFocused) {
                this.isFocused = true;
                this.$emit('focus');
            }
        },
        onEnterDown() {
            this.onBlur();
        },
        onEscDown(e) {
            e.preventDefault();
            this.isMenuActive = false;
        },
        onKeyDown(e) {
            const keyCode = e.keyCode;
            // If enter, space, up, or down is pressed, open menu
            if (!this.isMenuActive && [
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
        onMouseUp(e) {
            const appendInner = this.$refs['append-inner'];
            // If append inner is present
            // and the target is itself
            // or inside, toggle menu
            if (this.isMenuActive &&
                appendInner &&
                (appendInner === e.target ||
                    appendInner.contains(e.target))) {
                this.$nextTick(() => (this.isMenuActive = !this.isMenuActive));
                // If user is clicking in the container
                // and field is enclosed, activate it
            }
            else if (this.isEnclosed && !this.isDisabled) {
                this.isMenuActive = true;
            }
            VTextField.methods.onMouseUp.call(this, e);
        },
        onScroll() {
            if (!this.isMenuActive) {
                requestAnimationFrame(() => (this.content.scrollTop = 0));
            }
            else {
                if (this.lastItem >= this.computedItems.length)
                    return;
                const showMoreItems = (this.content.scrollHeight -
                    (this.content.scrollTop +
                        this.content.clientHeight)) < 200;
                if (showMoreItems) {
                    this.lastItem += 20;
                }
            }
        },
        onTabDown(e) {
            const menuIndex = this.getMenuIndex();
            const listTile = this.$refs.menu.tiles[menuIndex];
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
                VTextField.methods.onBlur.call(this, e);
            }
        },
        selectItem(item) {
            if (!this.multiple) {
                this.setValue(this.returnObject ? item : this.getValue(item));
                this.isMenuActive = false;
            }
            else {
                const internalValue = (this.internalValue || []).slice();
                const i = this.findExistingIndex(item);
                i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item);
                this.setValue(internalValue.map(i => {
                    return this.returnObject ? i : this.getValue(i);
                }));
                // When selecting multiple
                // adjust menu after each
                // selection
                this.$nextTick(() => {
                    this.$refs.menu &&
                        this.$refs.menu.updateDimensions();
                });
            }
        },
        setMenuIndex(index) {
            this.$refs.menu && (this.$refs.menu.listIndex = index);
        },
        setSelectedItems() {
            const selectedItems = [];
            const values = !this.multiple || !Array.isArray(this.internalValue)
                ? [this.internalValue]
                : this.internalValue;
            for (const value of values) {
                const index = this.allItems.findIndex(v => this.valueComparator(this.getValue(v), this.getValue(value)));
                if (index > -1) {
                    selectedItems.push(this.allItems[index]);
                }
            }
            this.selectedItems = selectedItems;
        },
        setValue(value) {
            this.internalValue = value;
            this.$emit('change', value);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTZWxlY3QvVlNlbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTywyQ0FBMkMsQ0FBQTtBQUNsRCxPQUFPLHNDQUFzQyxDQUFBO0FBRTdDLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUE7QUFDNUIsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBQzVCLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQTtBQUV2QyxhQUFhO0FBQ2IsT0FBTyxVQUFVLE1BQU0sMEJBQTBCLENBQUE7QUFFakQsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBRWhELGFBQWE7QUFDYixPQUFPLFlBQVksTUFBTSxnQ0FBZ0MsQ0FBQTtBQUV6RCxVQUFVO0FBQ1YsT0FBTyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRTlELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzlCLFlBQVksRUFBRSxLQUFLO0lBQ25CLG1CQUFtQixFQUFFLEtBQUs7SUFDMUIsV0FBVyxFQUFFLEtBQUs7SUFDbEIsU0FBUyxFQUFFLEdBQUc7Q0FDZixDQUFBO0FBRUQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBVTtJQUVoQixVQUFVLEVBQUU7UUFDVixZQUFZO0tBQ2I7SUFFRCxPQUFPLEVBQUUsVUFBVTtJQUVuQixNQUFNLEVBQUU7UUFDTixVQUFVO1FBQ1YsVUFBVTtLQUNYO0lBRUQsS0FBSyxFQUFFO1FBQ0wsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFP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QUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUNyQixDQUFDLENBQUE7Z0JBRUYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ2QsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7aUJBQ3pDO2FBQ0Y7WUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQTtRQUNwQyxDQUFDO1FBQ0QsUUFBUSxDQUFFLEtBQUs7WUFDYixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM3QixDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL190ZXh0LWZpZWxkcy5zdHlsJ1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc2VsZWN0LnN0eWwnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWQ2hpcCBmcm9tICcuLi9WQ2hpcCdcbmltcG9ydCBWTWVudSBmcm9tICcuLi9WTWVudSdcbmltcG9ydCBWU2VsZWN0TGlzdCBmcm9tICcuL1ZTZWxlY3RMaXN0J1xuXG4vLyBFeHRlbnNpb25zXG5pbXBvcnQgVlRleHRGaWVsZCBmcm9tICcuLi9WVGV4dEZpZWxkL1ZUZXh0RmllbGQnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbXBhcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbXBhcmFibGUnXG5pbXBvcnQgRmlsdGVyYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvZmlsdGVyYWJsZSdcblxuLy8gRGlyZWN0aXZlc1xuaW1wb3J0IENsaWNrT3V0c2lkZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUnXG5cbi8vIEhlbHBlcnNcbmltcG9ydCB7IGNhbWVsaXplLCBnZXRQcm9wZXJ0eUZyb21JdGVtLCBrZXlDb2RlcyB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcbmltcG9ydCB7IGNvbnNvbGVFcnJvciwgY29uc29sZVdhcm4gfSBmcm9tICcuLi8uLi91dGlsL2NvbnNvbGUnXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0TWVudVByb3BzID0ge1xuICBjbG9zZU9uQ2xpY2s6IGZhbHNlLFxuICBjbG9zZU9uQ29udGVudENsaWNrOiBmYWxzZSxcbiAgb3Blbk9uQ2xpY2s6IGZhbHNlLFxuICBtYXhIZWlnaHQ6IDMwMFxufVxuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1zZWxlY3QnLFxuXG4gIGRpcmVjdGl2ZXM6IHtcbiAgICBDbGlja091dHNpZGVcbiAgfSxcblxuICBleHRlbmRzOiBWVGV4dEZpZWxkLFxuXG4gIG1peGluczogW1xuICAgIENvbXBhcmFibGUsXG4gICAgRmlsdGVyYWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgYXBwZW5kSWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLmRyb3Bkb3duJ1xuICAgIH0sXG4gICAgYXBwZW5kSWNvbkNiOiBGdW5jdGlvbixcbiAgICBhdHRhY2g6IHtcbiAgICAgIHR5cGU6IG51bGwsXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgYnJvd3NlckF1dG9jb21wbGV0ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ29uJ1xuICAgIH0sXG4gICAgY2FjaGVJdGVtczogQm9vbGVhbixcbiAgICBjaGlwczogQm9vbGVhbixcbiAgICBjbGVhcmFibGU6IEJvb2xlYW4sXG4gICAgZGVsZXRhYmxlQ2hpcHM6IEJvb2xlYW4sXG4gICAgZGVuc2U6IEJvb2xlYW4sXG4gICAgaGlkZVNlbGVjdGVkOiBCb29sZWFuLFxuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcbiAgICBpdGVtQXZhdGFyOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBBcnJheSwgRnVuY3Rpb25dLFxuICAgICAgZGVmYXVsdDogJ2F2YXRhcidcbiAgICB9LFxuICAgIGl0ZW1EaXNhYmxlZDoge1xuICAgICAgdHlwZTogW1N0cmluZywgQXJyYXksIEZ1bmN0aW9uXSxcbiAgICAgIGRlZmF1bHQ6ICdkaXNhYmxlZCdcbiAgICB9LFxuICAgIGl0ZW1UZXh0OiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBBcnJheSwgRnVuY3Rpb25dLFxuICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgfSxcbiAgICBpdGVtVmFsdWU6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEFycmF5LCBGdW5jdGlvbl0sXG4gICAgICBkZWZhdWx0OiAndmFsdWUnXG4gICAgfSxcbiAgICBtZW51UHJvcHM6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEFycmF5LCBPYmplY3RdLFxuICAgICAgZGVmYXVsdDogKCkgPT4gZGVmYXVsdE1lbnVQcm9wc1xuICAgIH0sXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgb3Blbk9uQ2xlYXI6IEJvb2xlYW4sXG4gICAgcmV0dXJuT2JqZWN0OiBCb29sZWFuLFxuICAgIHNlYXJjaElucHV0OiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBzbWFsbENoaXBzOiBCb29sZWFuXG4gIH0sXG5cbiAgZGF0YTogdm0gPT4gKHtcbiAgICBhdHRyc0lucHV0OiB7IHJvbGU6ICdjb21ib2JveCcgfSxcbiAgICBjYWNoZWRJdGVtczogdm0uY2FjaGVJdGVtcyA/IHZtLml0ZW1zIDogW10sXG4gICAgY29udGVudDogbnVsbCxcbiAgICBpc0Jvb3RlZDogZmFsc2UsXG4gICAgaXNNZW51QWN0aXZlOiBmYWxzZSxcbiAgICBsYXN0SXRlbTogMjAsXG4gICAgLy8gQXMgbG9uZyBhcyBhIHZhbHVlIGlzIGRlZmluZWQsIHNob3cgaXRcbiAgICAvLyBPdGhlcndpc2UsIGNoZWNrIGlmIG11bHRpcGxlXG4gICAgLy8gdG8gZGV0ZXJtaW5lIHdoaWNoIGRlZmF1bHQgdG8gcHJvdmlkZVxuICAgIGxhenlWYWx1ZTogdm0udmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgPyB2bS52YWx1ZVxuICAgICAgOiB2bS5tdWx0aXBsZSA/IFtdIDogdW5kZWZpbmVkLFxuICAgIHNlbGVjdGVkSW5kZXg6IC0xLFxuICAgIHNlbGVjdGVkSXRlbXM6IFtdXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgLyogQWxsIGl0ZW1zIHRoYXQgdGhlIHNlbGVjdCBoYXMgKi9cbiAgICBhbGxJdGVtcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJEdXBsaWNhdGVzKHRoaXMuY2FjaGVkSXRlbXMuY29uY2F0KHRoaXMuaXRlbXMpKVxuICAgIH0sXG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgVlRleHRGaWVsZC5jb21wdXRlZC5jbGFzc2VzLmNhbGwodGhpcyksIHtcbiAgICAgICAgJ3Ytc2VsZWN0JzogdHJ1ZSxcbiAgICAgICAgJ3Ytc2VsZWN0LS1jaGlwcyc6IHRoaXMuaGFzQ2hpcHMsXG4gICAgICAgICd2LXNlbGVjdC0tY2hpcHMtLXNtYWxsJzogdGhpcy5zbWFsbENoaXBzLFxuICAgICAgICAndi1zZWxlY3QtLWlzLW1lbnUtYWN0aXZlJzogdGhpcy5pc01lbnVBY3RpdmVcbiAgICAgIH0pXG4gICAgfSxcbiAgICAvKiBVc2VkIGJ5IG90aGVyIGNvbXBvbmVudHMgdG8gb3ZlcndyaXRlICovXG4gICAgY29tcHV0ZWRJdGVtcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbGxJdGVtc1xuICAgIH0sXG4gICAgY291bnRlclZhbHVlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlXG4gICAgICAgID8gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aFxuICAgICAgICA6ICh0aGlzLmdldFRleHQodGhpcy5zZWxlY3RlZEl0ZW1zWzBdKSB8fCAnJykudG9TdHJpbmcoKS5sZW5ndGhcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNGb2N1c2VkID8gW3tcbiAgICAgICAgbmFtZTogJ2NsaWNrLW91dHNpZGUnLFxuICAgICAgICB2YWx1ZTogdGhpcy5ibHVyLFxuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgY2xvc2VDb25kaXRpb25hbDogdGhpcy5jbG9zZUNvbmRpdGlvbmFsXG4gICAgICAgIH1cbiAgICAgIH1dIDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICBkeW5hbWljSGVpZ2h0ICgpIHtcbiAgICAgIHJldHVybiAnYXV0bydcbiAgICB9LFxuICAgIGhhc0NoaXBzICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaXBzIHx8IHRoaXMuc21hbGxDaGlwc1xuICAgIH0sXG4gICAgaGFzU2xvdCAoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmhhc0NoaXBzIHx8IHRoaXMuJHNjb3BlZFNsb3RzLnNlbGVjdGlvbilcbiAgICB9LFxuICAgIGlzRGlydHkgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwXG4gICAgfSxcbiAgICBsaXN0RGF0YSAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGFjdGlvbjogdGhpcy5tdWx0aXBsZSAmJiAhdGhpcy5pc0hpZGluZ1NlbGVjdGVkLFxuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICAgIGRlbnNlOiB0aGlzLmRlbnNlLFxuICAgICAgICAgIGhpZGVTZWxlY3RlZDogdGhpcy5oaWRlU2VsZWN0ZWQsXG4gICAgICAgICAgaXRlbXM6IHRoaXMudmlydHVhbGl6ZWRJdGVtcyxcbiAgICAgICAgICBub0RhdGFUZXh0OiB0aGlzLiR2dWV0aWZ5LnQodGhpcy5ub0RhdGFUZXh0KSxcbiAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiB0aGlzLnNlbGVjdGVkSXRlbXMsXG4gICAgICAgICAgaXRlbUF2YXRhcjogdGhpcy5pdGVtQXZhdGFyLFxuICAgICAgICAgIGl0ZW1EaXNhYmxlZDogdGhpcy5pdGVtRGlzYWJsZWQsXG4gICAgICAgICAgaXRlbVZhbHVlOiB0aGlzLml0ZW1WYWx1ZSxcbiAgICAgICAgICBpdGVtVGV4dDogdGhpcy5pdGVtVGV4dFxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIHNlbGVjdDogdGhpcy5zZWxlY3RJdGVtXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgaXRlbTogdGhpcy4kc2NvcGVkU2xvdHMuaXRlbVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGF0aWNMaXN0ICgpIHtcbiAgICAgIGlmICh0aGlzLiRzbG90c1snbm8tZGF0YSddIHx8IHRoaXMuJHNsb3RzWydwcmVwZW5kLWl0ZW0nXSB8fCB0aGlzLiRzbG90c1snYXBwZW5kLWl0ZW0nXSkge1xuICAgICAgICBjb25zb2xlRXJyb3IoJ2Fzc2VydDogc3RhdGljTGlzdCBzaG91bGQgbm90IGJlIGNhbGxlZCBpZiBzbG90cyBhcmUgdXNlZCcpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZTZWxlY3RMaXN0LCB0aGlzLmxpc3REYXRhKVxuICAgIH0sXG4gICAgdmlydHVhbGl6ZWRJdGVtcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kX21lbnVQcm9wcy5hdXRvXG4gICAgICAgID8gdGhpcy5jb21wdXRlZEl0ZW1zXG4gICAgICAgIDogdGhpcy5jb21wdXRlZEl0ZW1zLnNsaWNlKDAsIHRoaXMubGFzdEl0ZW0pXG4gICAgfSxcbiAgICBtZW51Q2FuU2hvdyAoKSB7IHJldHVybiB0cnVlIH0sXG4gICAgJF9tZW51UHJvcHMgKCkge1xuICAgICAgbGV0IG5vcm1hbGlzZWRQcm9wc1xuXG4gICAgICBub3JtYWxpc2VkUHJvcHMgPSB0eXBlb2YgdGhpcy5tZW51UHJvcHMgPT09ICdzdHJpbmcnXG4gICAgICAgID8gdGhpcy5tZW51UHJvcHMuc3BsaXQoJywnKVxuICAgICAgICA6IHRoaXMubWVudVByb3BzXG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vcm1hbGlzZWRQcm9wcykpIHtcbiAgICAgICAgbm9ybWFsaXNlZFByb3BzID0gbm9ybWFsaXNlZFByb3BzLnJlZHVjZSgoYWNjLCBwKSA9PiB7XG4gICAgICAgICAgYWNjW3AudHJpbSgpXSA9IHRydWVcbiAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgIH0sIHt9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5kZWZhdWx0TWVudVByb3BzLFxuICAgICAgICB2YWx1ZTogdGhpcy5tZW51Q2FuU2hvdyAmJiB0aGlzLmlzTWVudUFjdGl2ZSxcbiAgICAgICAgbnVkZ2VCb3R0b206IHRoaXMubnVkZ2VCb3R0b21cbiAgICAgICAgICA/IHRoaXMubnVkZ2VCb3R0b21cbiAgICAgICAgICA6IG5vcm1hbGlzZWRQcm9wcy5vZmZzZXRZID8gMSA6IDAsIC8vIGNvbnZlcnQgdG8gaW50XG4gICAgICAgIC4uLm5vcm1hbGlzZWRQcm9wc1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGludGVybmFsVmFsdWUgKHZhbCkge1xuICAgICAgdGhpcy5pbml0aWFsVmFsdWUgPSB2YWxcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJdGVtcygpXG4gICAgfSxcbiAgICBpc0Jvb3RlZCAoKSB7XG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQgJiYgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCwgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBpc01lbnVBY3RpdmUgKHZhbCkge1xuICAgICAgaWYgKCF2YWwpIHJldHVyblxuXG4gICAgICB0aGlzLmlzQm9vdGVkID0gdHJ1ZVxuICAgIH0sXG4gICAgaXRlbXM6IHtcbiAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgIGhhbmRsZXIgKHZhbCkge1xuICAgICAgICBpZiAodGhpcy5jYWNoZUl0ZW1zKSB7XG4gICAgICAgICAgdGhpcy5jYWNoZWRJdGVtcyA9IHRoaXMuZmlsdGVyRHVwbGljYXRlcyh0aGlzLmNhY2hlZEl0ZW1zLmNvbmNhdCh2YWwpKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEl0ZW1zKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy4kcmVmcy5tZW51ICYmIHRoaXMuJHJlZnMubWVudS4kcmVmcy5jb250ZW50XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIC8qKiBAcHVibGljICovXG4gICAgYmx1ciAoKSB7XG4gICAgICB0aGlzLmlzTWVudUFjdGl2ZSA9IGZhbHNlXG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlXG4gICAgICB0aGlzLiRyZWZzLmlucHV0ICYmIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMVxuICAgIH0sXG4gICAgLyoqIEBwdWJsaWMgKi9cbiAgICBhY3RpdmF0ZU1lbnUgKCkge1xuICAgICAgdGhpcy5pc01lbnVBY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBjbGVhcmFibGVDYWxsYmFjayAoKSB7XG4gICAgICB0aGlzLnNldFZhbHVlKHRoaXMubXVsdGlwbGUgPyBbXSA6IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHRoaXMuJHJlZnMuaW5wdXQuZm9jdXMoKSlcblxuICAgICAgaWYgKHRoaXMub3Blbk9uQ2xlYXIpIHRoaXMuaXNNZW51QWN0aXZlID0gdHJ1ZVxuICAgIH0sXG4gICAgY2xvc2VDb25kaXRpb25hbCAoZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgLy8gQ2xpY2sgb3JpZ2luYXRlcyBmcm9tIG91dHNpZGUgdGhlIG1lbnUgY29udGVudFxuICAgICAgICAhIXRoaXMuY29udGVudCAmJlxuICAgICAgICAhdGhpcy5jb250ZW50LmNvbnRhaW5zKGUudGFyZ2V0KSAmJlxuXG4gICAgICAgIC8vIENsaWNrIG9yaWdpbmF0ZXMgZnJvbSBvdXRzaWRlIHRoZSBlbGVtZW50XG4gICAgICAgICEhdGhpcy4kZWwgJiZcbiAgICAgICAgIXRoaXMuJGVsLmNvbnRhaW5zKGUudGFyZ2V0KSAmJlxuICAgICAgICBlLnRhcmdldCAhPT0gdGhpcy4kZWxcbiAgICAgIClcbiAgICB9LFxuICAgIGZpbHRlckR1cGxpY2F0ZXMgKGFycikge1xuICAgICAgY29uc3QgdW5pcXVlVmFsdWVzID0gbmV3IE1hcCgpXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyLmxlbmd0aDsgKytpbmRleCkge1xuICAgICAgICBjb25zdCBpdGVtID0gYXJyW2luZGV4XVxuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmdldFZhbHVlKGl0ZW0pXG5cbiAgICAgICAgLy8gVE9ETzogY29tcGFyYXRvclxuICAgICAgICAhdW5pcXVlVmFsdWVzLmhhcyh2YWwpICYmIHVuaXF1ZVZhbHVlcy5zZXQodmFsLCBpdGVtKVxuICAgICAgfVxuICAgICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlVmFsdWVzLnZhbHVlcygpKVxuICAgIH0sXG4gICAgZmluZEV4aXN0aW5nSW5kZXggKGl0ZW0pIHtcbiAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9IHRoaXMuZ2V0VmFsdWUoaXRlbSlcblxuICAgICAgcmV0dXJuICh0aGlzLmludGVybmFsVmFsdWUgfHwgW10pLmZpbmRJbmRleChpID0+IHRoaXMudmFsdWVDb21wYXJhdG9yKHRoaXMuZ2V0VmFsdWUoaSksIGl0ZW1WYWx1ZSkpXG4gICAgfSxcbiAgICBnZW5DaGlwU2VsZWN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IChcbiAgICAgICAgdGhpcy5kaXNhYmxlZCB8fFxuICAgICAgICB0aGlzLnJlYWRvbmx5IHx8XG4gICAgICAgIHRoaXMuZ2V0RGlzYWJsZWQoaXRlbSlcbiAgICAgIClcbiAgICAgIGNvbnN0IGZvY3VzID0gKGUsIGNiKSA9PiB7XG4gICAgICAgIGlmIChpc0Rpc2FibGVkKSByZXR1cm5cblxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHRoaXMub25Gb2N1cygpXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkNoaXAsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWNoaXAtLXNlbGVjdC1tdWx0aScsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY2xvc2U6IHRoaXMuZGVsZXRhYmxlQ2hpcHMgJiYgIWlzRGlzYWJsZWQsXG4gICAgICAgICAgZGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgICAgc2VsZWN0ZWQ6IGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXgsXG4gICAgICAgICAgc21hbGw6IHRoaXMuc21hbGxDaGlwc1xuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGNsaWNrOiBlID0+IHtcbiAgICAgICAgICAgIGZvY3VzKGUsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmb2N1cyxcbiAgICAgICAgICBpbnB1dDogKCkgPT4gdGhpcy5vbkNoaXBJbnB1dChpdGVtKVxuICAgICAgICB9LFxuICAgICAgICBrZXk6IHRoaXMuZ2V0VmFsdWUoaXRlbSlcbiAgICAgIH0sIHRoaXMuZ2V0VGV4dChpdGVtKSlcbiAgICB9LFxuICAgIGdlbkNvbW1hU2VsZWN0aW9uIChpdGVtLCBpbmRleCwgbGFzdCkge1xuICAgICAgLy8gSXRlbSBtYXkgYmUgYW4gb2JqZWN0XG4gICAgICAvLyBUT0RPOiBSZW1vdmUgSlNPTi5zdHJpbmdpZnlcbiAgICAgIGNvbnN0IGtleSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0VmFsdWUoaXRlbSkpXG4gICAgICBjb25zdCBjb2xvciA9IGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXggJiYgdGhpcy5jb2xvclxuICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IChcbiAgICAgICAgdGhpcy5kaXNhYmxlZCB8fFxuICAgICAgICB0aGlzLmdldERpc2FibGVkKGl0ZW0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB0aGlzLnNldFRleHRDb2xvcihjb2xvciwge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2VsZWN0X19zZWxlY3Rpb24gdi1zZWxlY3RfX3NlbGVjdGlvbi0tY29tbWEnLFxuICAgICAgICAnY2xhc3MnOiB7XG4gICAgICAgICAgJ3Ytc2VsZWN0X19zZWxlY3Rpb24tLWRpc2FibGVkJzogaXNEaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBrZXlcbiAgICAgIH0pLCBgJHt0aGlzLmdldFRleHQoaXRlbSl9JHtsYXN0ID8gJycgOiAnLCAnfWApXG4gICAgfSxcbiAgICBnZW5EZWZhdWx0U2xvdCAoKSB7XG4gICAgICBjb25zdCBzZWxlY3Rpb25zID0gdGhpcy5nZW5TZWxlY3Rpb25zKClcbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZW5JbnB1dCgpXG5cbiAgICAgIC8vIElmIHRoZSByZXR1cm4gaXMgYW4gZW1wdHkgYXJyYXlcbiAgICAgIC8vIHB1c2ggdGhlIGlucHV0XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3Rpb25zKSkge1xuICAgICAgICBzZWxlY3Rpb25zLnB1c2goaW5wdXQpXG4gICAgICAvLyBPdGhlcndpc2UgcHVzaCBpdCBpbnRvIGNoaWxkcmVuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3Rpb25zLmNoaWxkcmVuID0gc2VsZWN0aW9ucy5jaGlsZHJlbiB8fCBbXVxuICAgICAgICBzZWxlY3Rpb25zLmNoaWxkcmVuLnB1c2goaW5wdXQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2VsZWN0X19zbG90JyxcbiAgICAgICAgICBkaXJlY3RpdmVzOiB0aGlzLmRpcmVjdGl2ZXNcbiAgICAgICAgfSwgW1xuICAgICAgICAgIHRoaXMuZ2VuTGFiZWwoKSxcbiAgICAgICAgICB0aGlzLnByZWZpeCA/IHRoaXMuZ2VuQWZmaXgoJ3ByZWZpeCcpIDogbnVsbCxcbiAgICAgICAgICBzZWxlY3Rpb25zLFxuICAgICAgICAgIHRoaXMuc3VmZml4ID8gdGhpcy5nZW5BZmZpeCgnc3VmZml4JykgOiBudWxsLFxuICAgICAgICAgIHRoaXMuZ2VuQ2xlYXJJY29uKCksXG4gICAgICAgICAgdGhpcy5nZW5JY29uU2xvdCgpXG4gICAgICAgIF0pLFxuICAgICAgICB0aGlzLmdlbk1lbnUoKSxcbiAgICAgICAgdGhpcy5nZW5Qcm9ncmVzcygpXG4gICAgICBdXG4gICAgfSxcbiAgICBnZW5JbnB1dCAoKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IFZUZXh0RmllbGQubWV0aG9kcy5nZW5JbnB1dC5jYWxsKHRoaXMpXG5cbiAgICAgIGlucHV0LmRhdGEuZG9tUHJvcHMudmFsdWUgPSBudWxsXG4gICAgICBpbnB1dC5kYXRhLmF0dHJzLnJlYWRvbmx5ID0gdHJ1ZVxuICAgICAgaW5wdXQuZGF0YS5hdHRyc1snYXJpYS1yZWFkb25seSddID0gU3RyaW5nKHRoaXMucmVhZG9ubHkpXG5cbiAgICAgIHJldHVybiBpbnB1dFxuICAgIH0sXG4gICAgZ2VuTGlzdCAoKSB7XG4gICAgICAvLyBJZiB0aGVyZSdzIG5vIHNsb3RzLCB3ZSBjYW4gdXNlIGEgY2FjaGVkIFZOb2RlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2VcbiAgICAgIGlmICh0aGlzLiRzbG90c1snbm8tZGF0YSddIHx8IHRoaXMuJHNsb3RzWydwcmVwZW5kLWl0ZW0nXSB8fCB0aGlzLiRzbG90c1snYXBwZW5kLWl0ZW0nXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5MaXN0V2l0aFNsb3QoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGljTGlzdFxuICAgICAgfVxuICAgIH0sXG4gICAgZ2VuTGlzdFdpdGhTbG90ICgpIHtcbiAgICAgIGNvbnN0IHNsb3RzID0gWydwcmVwZW5kLWl0ZW0nLCAnbm8tZGF0YScsICdhcHBlbmQtaXRlbSddXG4gICAgICAgIC5maWx0ZXIoc2xvdE5hbWUgPT4gdGhpcy4kc2xvdHNbc2xvdE5hbWVdKVxuICAgICAgICAubWFwKHNsb3ROYW1lID0+IHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJywge1xuICAgICAgICAgIHNsb3Q6IHNsb3ROYW1lXG4gICAgICAgIH0sIHRoaXMuJHNsb3RzW3Nsb3ROYW1lXSkpXG4gICAgICAvLyBSZXF1aXJlcyBkZXN0cnVjdHVyaW5nIGR1ZSB0byBWdWVcbiAgICAgIC8vIG1vZGlmeWluZyB0aGUgYG9uYCBwcm9wZXJ0eSB3aGVuIHBhc3NlZFxuICAgICAgLy8gYXMgYSByZWZlcmVuY2VkIG9iamVjdFxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVlNlbGVjdExpc3QsIHtcbiAgICAgICAgLi4udGhpcy5saXN0RGF0YVxuICAgICAgfSwgc2xvdHMpXG4gICAgfSxcbiAgICBnZW5NZW51ICgpIHtcbiAgICAgIGNvbnN0IHByb3BzID0gdGhpcy4kX21lbnVQcm9wc1xuICAgICAgcHJvcHMuYWN0aXZhdG9yID0gdGhpcy4kcmVmc1snaW5wdXQtc2xvdCddXG5cbiAgICAgIC8vIERlcHJlY2F0ZSB1c2luZyBtZW51IHByb3BzIGRpcmVjdGx5XG4gICAgICAvLyBUT0RPOiByZW1vdmUgKDIuMClcbiAgICAgIGNvbnN0IGluaGVyaXRlZFByb3BzID0gT2JqZWN0LmtleXMoVk1lbnUub3B0aW9ucy5wcm9wcylcblxuICAgICAgY29uc3QgZGVwcmVjYXRlZFByb3BzID0gT2JqZWN0LmtleXModGhpcy4kYXR0cnMpLnJlZHVjZSgoYWNjLCBhdHRyKSA9PiB7XG4gICAgICAgIGlmIChpbmhlcml0ZWRQcm9wcy5pbmNsdWRlcyhjYW1lbGl6ZShhdHRyKSkpIGFjYy5wdXNoKGF0dHIpXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH0sIFtdKVxuXG4gICAgICBmb3IgKGNvbnN0IHByb3Agb2YgZGVwcmVjYXRlZFByb3BzKSB7XG4gICAgICAgIHByb3BzW2NhbWVsaXplKHByb3ApXSA9IHRoaXMuJGF0dHJzW3Byb3BdXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChkZXByZWNhdGVkUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgbXVsdGlwbGUgPSBkZXByZWNhdGVkUHJvcHMubGVuZ3RoID4gMVxuICAgICAgICAgIGxldCByZXBsYWNlbWVudCA9IGRlcHJlY2F0ZWRQcm9wcy5yZWR1Y2UoKGFjYywgcCkgPT4ge1xuICAgICAgICAgICAgYWNjW2NhbWVsaXplKHApXSA9IHRoaXMuJGF0dHJzW3BdXG4gICAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgICAgfSwge30pXG4gICAgICAgICAgY29uc3QgcHJvcHMgPSBkZXByZWNhdGVkUHJvcHMubWFwKHAgPT4gYCcke3B9J2ApLmpvaW4oJywgJylcbiAgICAgICAgICBjb25zdCBzZXBhcmF0b3IgPSBtdWx0aXBsZSA/ICdcXG4nIDogJ1xcJydcblxuICAgICAgICAgIGNvbnN0IG9ubHlCb29scyA9IE9iamVjdC5rZXlzKHJlcGxhY2VtZW50KS5ldmVyeShwcm9wID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BUeXBlID0gVk1lbnUub3B0aW9ucy5wcm9wc1twcm9wXVxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXBsYWNlbWVudFtwcm9wXVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8ICgocHJvcFR5cGUudHlwZSB8fCBwcm9wVHlwZSkgPT09IEJvb2xlYW4gJiYgdmFsdWUgPT09ICcnKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBpZiAob25seUJvb2xzKSB7XG4gICAgICAgICAgICByZXBsYWNlbWVudCA9IE9iamVjdC5rZXlzKHJlcGxhY2VtZW50KS5qb2luKCcsICcpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcGxhY2VtZW50ID0gSlNPTi5zdHJpbmdpZnkocmVwbGFjZW1lbnQsIG51bGwsIG11bHRpcGxlID8gMiA6IDApLnJlcGxhY2UoL1wiKFteKFwiKVwiXSspXCI6L2csICckMTonKS5yZXBsYWNlKC9cIi9nLCAnXFwnJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zb2xlV2FybihgJHtwcm9wc30gJHttdWx0aXBsZSA/ICdhcmUnIDogJ2lzJ30gZGVwcmVjYXRlZCwgdXNlICR7c2VwYXJhdG9yfTptZW51LXByb3BzPVwiJHtyZXBsYWNlbWVudH1cIiR7c2VwYXJhdG9yfSBpbnN0ZWFkYCwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBdHRhY2ggdG8gcm9vdCBlbCBzbyB0aGF0XG4gICAgICAvLyBtZW51IGNvdmVycyBwcmVwZW5kL2FwcGVuZCBpY29uc1xuICAgICAgaWYgKFxuICAgICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYSBjb21wdXRlZCBwcm9wZXJ0eSBvciBoZWxwZXIgb3Igc29tZXRoaW5nXG4gICAgICAgIHRoaXMuYXR0YWNoID09PSAnJyB8fCAvLyBJZiB1c2VkIGFzIGEgYm9vbGVhbiBwcm9wICg8di1tZW51IGF0dGFjaD4pXG4gICAgICAgIHRoaXMuYXR0YWNoID09PSB0cnVlIHx8IC8vIElmIGJvdW5kIHRvIGEgYm9vbGVhbiAoPHYtbWVudSA6YXR0YWNoPVwidHJ1ZVwiPilcbiAgICAgICAgdGhpcy5hdHRhY2ggPT09ICdhdHRhY2gnIC8vIElmIGJvdW5kIGFzIGJvb2xlYW4gcHJvcCBpbiBwdWcgKHYtbWVudShhdHRhY2gpKVxuICAgICAgKSB7XG4gICAgICAgIHByb3BzLmF0dGFjaCA9IHRoaXMuJGVsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wcy5hdHRhY2ggPSB0aGlzLmF0dGFjaFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWTWVudSwge1xuICAgICAgICBwcm9wcyxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBpbnB1dDogdmFsID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNNZW51QWN0aXZlID0gdmFsXG4gICAgICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHZhbFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVmOiAnbWVudSdcbiAgICAgIH0sIFt0aGlzLmdlbkxpc3QoKV0pXG4gICAgfSxcbiAgICBnZW5TZWxlY3Rpb25zICgpIHtcbiAgICAgIGxldCBsZW5ndGggPSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IG5ldyBBcnJheShsZW5ndGgpXG5cbiAgICAgIGxldCBnZW5TZWxlY3Rpb25cbiAgICAgIGlmICh0aGlzLiRzY29wZWRTbG90cy5zZWxlY3Rpb24pIHtcbiAgICAgICAgZ2VuU2VsZWN0aW9uID0gdGhpcy5nZW5TbG90U2VsZWN0aW9uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzQ2hpcHMpIHtcbiAgICAgICAgZ2VuU2VsZWN0aW9uID0gdGhpcy5nZW5DaGlwU2VsZWN0aW9uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnZW5TZWxlY3Rpb24gPSB0aGlzLmdlbkNvbW1hU2VsZWN0aW9uXG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBjaGlsZHJlbltsZW5ndGhdID0gZ2VuU2VsZWN0aW9uKFxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1tsZW5ndGhdLFxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBsZW5ndGggPT09IGNoaWxkcmVuLmxlbmd0aCAtIDFcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2VsZWN0X19zZWxlY3Rpb25zJ1xuICAgICAgfSwgY2hpbGRyZW4pXG4gICAgfSxcbiAgICBnZW5TbG90U2VsZWN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLnNlbGVjdGlvbih7XG4gICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgICAgaXRlbSxcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIHNlbGVjdGVkOiBpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4LFxuICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5XG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0TWVudUluZGV4ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRyZWZzLm1lbnUgPyB0aGlzLiRyZWZzLm1lbnUubGlzdEluZGV4IDogLTFcbiAgICB9LFxuICAgIGdldERpc2FibGVkIChpdGVtKSB7XG4gICAgICByZXR1cm4gZ2V0UHJvcGVydHlGcm9tSXRlbShpdGVtLCB0aGlzLml0ZW1EaXNhYmxlZCwgZmFsc2UpXG4gICAgfSxcbiAgICBnZXRUZXh0IChpdGVtKSB7XG4gICAgICByZXR1cm4gZ2V0UHJvcGVydHlGcm9tSXRlbShpdGVtLCB0aGlzLml0ZW1UZXh0LCBpdGVtKVxuICAgIH0sXG4gICAgZ2V0VmFsdWUgKGl0ZW0pIHtcbiAgICAgIHJldHVybiBnZXRQcm9wZXJ0eUZyb21JdGVtKGl0ZW0sIHRoaXMuaXRlbVZhbHVlLCB0aGlzLmdldFRleHQoaXRlbSkpXG4gICAgfSxcbiAgICBvbkJsdXIgKGUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2JsdXInLCBlKVxuICAgIH0sXG4gICAgb25DaGlwSW5wdXQgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB0aGlzLnNlbGVjdEl0ZW0oaXRlbSlcbiAgICAgIGVsc2UgdGhpcy5zZXRWYWx1ZShudWxsKVxuXG4gICAgICAvLyBJZiBhbGwgaXRlbXMgaGF2ZSBiZWVuIGRlbGV0ZWQsXG4gICAgICAvLyBvcGVuIGB2LW1lbnVgXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmlzTWVudUFjdGl2ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xXG4gICAgfSxcbiAgICBvbkNsaWNrICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHJldHVyblxuXG4gICAgICB0aGlzLmlzTWVudUFjdGl2ZSA9IHRydWVcblxuICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWVcbiAgICAgICAgdGhpcy4kZW1pdCgnZm9jdXMnKVxuICAgICAgfVxuICAgIH0sXG4gICAgb25FbnRlckRvd24gKCkge1xuICAgICAgdGhpcy5vbkJsdXIoKVxuICAgIH0sXG4gICAgb25Fc2NEb3duIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHRoaXMuaXNNZW51QWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgY29uc3Qga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgICAvLyBJZiBlbnRlciwgc3BhY2UsIHVwLCBvciBkb3duIGlzIHByZXNzZWQsIG9wZW4gbWVudVxuICAgICAgaWYgKCF0aGlzLmlzTWVudUFjdGl2ZSAmJiBbXG4gICAgICAgIGtleUNvZGVzLmVudGVyLFxuICAgICAgICBrZXlDb2Rlcy5zcGFjZSxcbiAgICAgICAga2V5Q29kZXMudXAsIGtleUNvZGVzLmRvd25cbiAgICAgIF0uaW5jbHVkZXMoa2V5Q29kZSkpIHRoaXMuYWN0aXZhdGVNZW51KClcblxuICAgICAgaWYgKHRoaXMuaXNNZW51QWN0aXZlICYmIHRoaXMuJHJlZnMubWVudSkgdGhpcy4kcmVmcy5tZW51LmNoYW5nZUxpc3RJbmRleChlKVxuXG4gICAgICAvLyBUaGlzIHNob3VsZCBkbyBzb21ldGhpbmcgZGlmZmVyZW50XG4gICAgICBpZiAoa2V5Q29kZSA9PT0ga2V5Q29kZXMuZW50ZXIpIHJldHVybiB0aGlzLm9uRW50ZXJEb3duKGUpXG5cbiAgICAgIC8vIElmIGVzY2FwZSBkZWFjdGl2YXRlIHRoZSBtZW51XG4gICAgICBpZiAoa2V5Q29kZSA9PT0ga2V5Q29kZXMuZXNjKSByZXR1cm4gdGhpcy5vbkVzY0Rvd24oZSlcblxuICAgICAgLy8gSWYgdGFiIC0gc2VsZWN0IGl0ZW0gb3IgY2xvc2UgbWVudVxuICAgICAgaWYgKGtleUNvZGUgPT09IGtleUNvZGVzLnRhYikgcmV0dXJuIHRoaXMub25UYWJEb3duKGUpXG4gICAgfSxcbiAgICBvbk1vdXNlVXAgKGUpIHtcbiAgICAgIGNvbnN0IGFwcGVuZElubmVyID0gdGhpcy4kcmVmc1snYXBwZW5kLWlubmVyJ11cblxuICAgICAgLy8gSWYgYXBwZW5kIGlubmVyIGlzIHByZXNlbnRcbiAgICAgIC8vIGFuZCB0aGUgdGFyZ2V0IGlzIGl0c2VsZlxuICAgICAgLy8gb3IgaW5zaWRlLCB0b2dnbGUgbWVudVxuICAgICAgaWYgKHRoaXMuaXNNZW51QWN0aXZlICYmXG4gICAgICAgIGFwcGVuZElubmVyICYmXG4gICAgICAgIChhcHBlbmRJbm5lciA9PT0gZS50YXJnZXQgfHxcbiAgICAgICAgYXBwZW5kSW5uZXIuY29udGFpbnMoZS50YXJnZXQpKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+ICh0aGlzLmlzTWVudUFjdGl2ZSA9ICF0aGlzLmlzTWVudUFjdGl2ZSkpXG4gICAgICAvLyBJZiB1c2VyIGlzIGNsaWNraW5nIGluIHRoZSBjb250YWluZXJcbiAgICAgIC8vIGFuZCBmaWVsZCBpcyBlbmNsb3NlZCwgYWN0aXZhdGUgaXRcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0VuY2xvc2VkICYmICF0aGlzLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5pc01lbnVBY3RpdmUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIFZUZXh0RmllbGQubWV0aG9kcy5vbk1vdXNlVXAuY2FsbCh0aGlzLCBlKVxuICAgIH0sXG4gICAgb25TY3JvbGwgKCkge1xuICAgICAgaWYgKCF0aGlzLmlzTWVudUFjdGl2ZSkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gKHRoaXMuY29udGVudC5zY3JvbGxUb3AgPSAwKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RJdGVtID49IHRoaXMuY29tcHV0ZWRJdGVtcy5sZW5ndGgpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHNob3dNb3JlSXRlbXMgPSAoXG4gICAgICAgICAgdGhpcy5jb250ZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgICAgKHRoaXMuY29udGVudC5zY3JvbGxUb3AgK1xuICAgICAgICAgIHRoaXMuY29udGVudC5jbGllbnRIZWlnaHQpXG4gICAgICAgICkgPCAyMDBcblxuICAgICAgICBpZiAoc2hvd01vcmVJdGVtcykge1xuICAgICAgICAgIHRoaXMubGFzdEl0ZW0gKz0gMjBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgb25UYWJEb3duIChlKSB7XG4gICAgICBjb25zdCBtZW51SW5kZXggPSB0aGlzLmdldE1lbnVJbmRleCgpXG5cbiAgICAgIGNvbnN0IGxpc3RUaWxlID0gdGhpcy4kcmVmcy5tZW51LnRpbGVzW21lbnVJbmRleF1cblxuICAgICAgLy8gQW4gaXRlbSB0aGF0IGlzIHNlbGVjdGVkIGJ5XG4gICAgICAvLyBtZW51LWluZGV4IHNob3VsZCB0b2dnbGVkXG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RUaWxlICYmXG4gICAgICAgIGxpc3RUaWxlLmNsYXNzTmFtZS5pbmRleE9mKCd2LWxpc3RfX3RpbGUtLWhpZ2hsaWdodGVkJykgPiAtMSAmJlxuICAgICAgICB0aGlzLmlzTWVudUFjdGl2ZSAmJlxuICAgICAgICBtZW51SW5kZXggPiAtMVxuICAgICAgKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgbGlzdFRpbGUuY2xpY2soKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLFxuICAgICAgICAvLyB0aGUgdXNlciBoYXMgbm8gc2VsZWN0ZWQgaW5kZXhlc1xuICAgICAgICAvLyBhbmQgaXMgcHJvYmFibHkgdGFiYmluZyBvdXRcbiAgICAgICAgVlRleHRGaWVsZC5tZXRob2RzLm9uQmx1ci5jYWxsKHRoaXMsIGUpXG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3RJdGVtIChpdGVtKSB7XG4gICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnJldHVybk9iamVjdCA/IGl0ZW0gOiB0aGlzLmdldFZhbHVlKGl0ZW0pKVxuICAgICAgICB0aGlzLmlzTWVudUFjdGl2ZSA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbnRlcm5hbFZhbHVlID0gKHRoaXMuaW50ZXJuYWxWYWx1ZSB8fCBbXSkuc2xpY2UoKVxuICAgICAgICBjb25zdCBpID0gdGhpcy5maW5kRXhpc3RpbmdJbmRleChpdGVtKVxuXG4gICAgICAgIGkgIT09IC0xID8gaW50ZXJuYWxWYWx1ZS5zcGxpY2UoaSwgMSkgOiBpbnRlcm5hbFZhbHVlLnB1c2goaXRlbSlcbiAgICAgICAgdGhpcy5zZXRWYWx1ZShpbnRlcm5hbFZhbHVlLm1hcChpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZXR1cm5PYmplY3QgPyBpIDogdGhpcy5nZXRWYWx1ZShpKVxuICAgICAgICB9KSlcblxuICAgICAgICAvLyBXaGVuIHNlbGVjdGluZyBtdWx0aXBsZVxuICAgICAgICAvLyBhZGp1c3QgbWVudSBhZnRlciBlYWNoXG4gICAgICAgIC8vIHNlbGVjdGlvblxuICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5tZW51ICYmXG4gICAgICAgICAgICB0aGlzLiRyZWZzLm1lbnUudXBkYXRlRGltZW5zaW9ucygpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRNZW51SW5kZXggKGluZGV4KSB7XG4gICAgICB0aGlzLiRyZWZzLm1lbnUgJiYgKHRoaXMuJHJlZnMubWVudS5saXN0SW5kZXggPSBpbmRleClcbiAgICB9LFxuICAgIHNldFNlbGVjdGVkSXRlbXMgKCkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFtdXG4gICAgICBjb25zdCB2YWx1ZXMgPSAhdGhpcy5tdWx0aXBsZSB8fCAhQXJyYXkuaXNBcnJheSh0aGlzLmludGVybmFsVmFsdWUpXG4gICAgICAgID8gW3RoaXMuaW50ZXJuYWxWYWx1ZV1cbiAgICAgICAgOiB0aGlzLmludGVybmFsVmFsdWVcblxuICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmFsbEl0ZW1zLmZpbmRJbmRleCh2ID0+IHRoaXMudmFsdWVDb21wYXJhdG9yKFxuICAgICAgICAgIHRoaXMuZ2V0VmFsdWUodiksXG4gICAgICAgICAgdGhpcy5nZXRWYWx1ZSh2YWx1ZSlcbiAgICAgICAgKSlcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaCh0aGlzLmFsbEl0ZW1zW2luZGV4XSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZEl0ZW1zXG4gICAgfSxcbiAgICBzZXRWYWx1ZSAodmFsdWUpIHtcbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB2YWx1ZSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==