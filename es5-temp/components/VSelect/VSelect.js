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
import Menuable from '../../mixins/menuable';
// Directives
import ClickOutside from '../../directives/click-outside';
// Helpers
import { getPropertyFromItem, keyCodes } from '../../util/helpers';
import { consoleError } from '../../util/console';
// For api-generator
const fakeVMenu = {
    name: 'v-menu',
    props: VMenu.props // TODO: remove some, just for testing
};
const fakeMenuable = {
    name: 'menuable',
    props: Menuable.props
};
/* @vue/component */
export default {
    name: 'v-select',
    directives: {
        ClickOutside
    },
    extends: VTextField,
    mixins: [
        fakeVMenu,
        fakeMenuable,
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
        auto: Boolean,
        browserAutocomplete: {
            type: String,
            default: 'on'
        },
        cacheItems: Boolean,
        chips: Boolean,
        clearable: Boolean,
        contentClass: String,
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
        maxHeight: {
            type: [Number, String],
            default: 300
        },
        minWidth: {
            type: [Boolean, Number, String],
            default: 0
        },
        multiple: Boolean,
        multiLine: Boolean,
        openOnClear: Boolean,
        returnObject: Boolean,
        searchInput: {
            default: null
        },
        smallChips: Boolean,
        singleLine: Boolean
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
        menuProps() {
            return {
                closeOnClick: false,
                closeOnContentClick: false,
                openOnClick: false,
                value: this.isMenuActive,
                offsetY: this.offsetY,
                nudgeBottom: this.nudgeBottom
                    ? this.nudgeBottom
                    : this.offsetY ? 1 : 0 // convert to int
            };
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
            return !this.auto
                ? this.computedItems.slice(0, this.lastItem)
                : this.computedItems;
        }
    },
    watch: {
        internalValue(val) {
            this.initialValue = val;
            this.$emit('change', this.internalValue);
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
            this.internalValue = this.multiple ? [] : undefined;
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
            const isDisabled = (this.disabled ||
                this.readonly ||
                this.getDisabled(item));
            const classes = index === this.selectedIndex
                ? this.addTextColorClassChecks()
                : {};
            classes['v-select__selection--disabled'] = isDisabled;
            return this.$createElement('div', {
                staticClass: 'v-select__selection v-select__selection--comma',
                'class': classes,
                key
            }, `${this.getText(item)}${last ? '' : ', '}`);
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
            const activator = this.genSelectSlot([
                this.genLabel(),
                this.prefix ? this.genAffix('prefix') : null,
                selections,
                this.suffix ? this.genAffix('suffix') : null,
                this.genClearIcon(),
                this.genIconSlot()
            ]);
            return [this.genMenu(activator)];
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
        genMenu(activator) {
            const props = {
                contentClass: this.contentClass
            };
            const inheritedProps = Object.keys(VMenu.props).concat(Object.keys(Menuable.props));
            // Later this might be filtered
            for (const prop of inheritedProps) {
                props[prop] = this[prop];
            }
            props.activator = this.$refs['input-slot'];
            Object.assign(props, this.menuProps);
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
            }, [activator, this.genList()]);
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
        genSelectSlot(children) {
            return this.$createElement('div', {
                staticClass: 'v-select__slot',
                directives: this.directives,
                slot: 'activator'
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
                this.internalValue = null;
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
        // Detect tab and call original onBlur method
        onKeyDown(e) {
            const keyCode = e.keyCode;
            // If enter, space, up, or down is pressed, open menu
            if (!this.isMenuActive && [
                keyCodes.enter,
                keyCodes.space,
                keyCodes.up, keyCodes.down
            ].includes(keyCode))
                this.activateMenu();
            // This should do something different
            if (keyCode === keyCodes.enter)
                return this.onEnterDown();
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
            else if (this.isEnclosed) {
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
                this.internalValue = this.returnObject ? item : this.getValue(item);
                this.isMenuActive = false;
            }
            else {
                const internalValue = (this.internalValue || []).slice();
                const i = this.findExistingIndex(item);
                i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item);
                this.internalValue = internalValue.map(i => {
                    return this.returnObject ? i : this.getValue(i);
                });
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
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTZWxlY3QvVlNlbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTywyQ0FBMkMsQ0FBQTtBQUNsRCxPQUFPLHNDQUFzQyxDQUFBO0FBRTdDLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUE7QUFDNUIsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBQzVCLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQTtBQUV2QyxhQUFhO0FBQ2IsT0FBTyxVQUFVLE1BQU0sMEJBQTBCLENBQUE7QUFFakQsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFBO0FBRTVDLGFBQWE7QUFDYixPQUFPLFlBQVksTUFBTSxnQ0FBZ0MsQ0FBQTtBQUV6RCxVQUFVO0FBQ1YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUVqRCxvQkFBb0I7QUFDcEIsTUFBTSxTQUFTLEdBQUc7SUFDaEIsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0M7Q0FDMUQsQ0FBQTtBQUVELE1BQU0sWUFBWSxHQUFHO0lBQ25CLElBQUksRUFBRSxVQUFVO0lBQ2hCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztDQUN0QixDQUFBO0FBRUQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBVTtJQUVoQixVQUFVLEVBQUU7UUFDVixZQUFZO0tBQ2I7SUFFRCxPQUFPLEVBQUUsVUFBVTtJQUVuQixNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO0tBQ1g7SUFFRCxLQUFLLEVBQUU7UUFDTCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSx5QkFBeUI7U0FDbkM7UUFDRCxZQUFZLEVBQUUsUUFBUTtRQUN0QixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxJQUFJLEVBQUUsT0FBTztRQUNiLG1CQUFtQixFQUFFO1lBQ25CLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFVBQVUsRUFBRSxPQUFPO1FBQ25CLEtBQUssRUFBRSxPQUFPO1FBQ2QsU0FBUyxFQUFFLE9BQU87UUFDbEIsWUFBWSxFQUFFLE1BQU07UUFDcEIsY0FBYyxFQUFFLE9BQU87UUFDdkIsS0FBSyxFQUFFLE9BQU87UUFDZCxZQUFZLEVBQUUsT0FBTztRQUNyQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsS0FBSztZQUNYLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1NBQ2xCO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7WUFDL0IsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztZQUMvQixPQUFPLEVBQUUsVUFBVTtTQUNwQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1lBQy9CLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7WUFDL0IsT0FBTyxFQUFFLE9BQU87U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxHQUFHO1NBQ2I7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUMvQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsUUFBUSxFQUFFLE9BQU87UUFDakIsU0FBUyxFQUFFLE9BQU87UUFDbEIsV0FBVyxFQUFFLE9BQU87UUFDcEIsWUFBWSxFQUFFLE9BQU87UUFDckIsV0FBVyxFQUFFO1lBQ1gsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFVBQVUsRUFBRSxPQUFPO1FBQ25CLFVBQVUsRUFBRSxPQUFPO0tBQ3BCO0lBRUQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7UUFDaEMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDMUMsT0FBTyxFQUFFLElBQUk7UUFDYixRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLFFBQVEsRUFBRSxFQUFFO1FBQ1oseUNBQXlDO1FBQ3pDLCtCQUErQjtRQUMvQix3Q0FBd0M7UUFDeEMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUztZQUMvQixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUs7WUFDVixDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ2hDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDakIsYUFBYSxFQUFFLEVBQUU7S0FDbEIsQ0FBQztJQUVGLFFBQVEsRUFBRTtRQUNSLG1DQUFtQztRQUNuQyxRQUFRO1lBQ04sT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDbkUsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0QsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUNoQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDekMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDOUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELDJDQUEyQztRQUMzQyxhQUFhO1lBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3RCLENBQUM7UUFDRCxZQUFZO1lBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUTtnQkFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtnQkFDM0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFBO1FBQ25FLENBQUM7UUFDRCxVQUFVO1lBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLEVBQUUsZUFBZTtvQkFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNoQixJQUFJLEVBQUU7d0JBQ0osZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtxQkFDeEM7aUJBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7UUFDaEIsQ0FBQztRQUNELGFBQWE7WUFDWCxPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUM7UUFDRCxRQUFRO1lBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUE7UUFDdEMsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDOUQsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN0QyxDQUFDO1FBQ0QsU0FBUztZQUNQLE9BQU87Z0JBQ0wsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQ3hCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVc7b0JBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7YUFDM0MsQ0FBQTtRQUNILENBQUM7UUFDRCxRQUFRO1lBQ04sT0FBTztnQkFDTCxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO29CQUMvQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO29CQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtvQkFDNUIsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQzVDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtvQkFDakMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO29CQUMzQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7b0JBQy9CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztvQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2lCQUN4QjtnQkFDRCxFQUFFLEVBQUU7b0JBQ0YsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVO2lCQUN4QjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSTtpQkFDN0I7YUFDRixDQUFBO1FBQ0gsQ0FBQztRQUNELFVBQVU7WUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUN2RixZQUFZLENBQUMsMkRBQTJELENBQUMsQ0FBQTthQUMxRTtZQUVELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFDRCxnQkFBZ0I7WUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUN4QixDQUFDO0tBQ0Y7SUFFRCxLQUFLLEVBQUU7UUFDTCxhQUFhLENBQUUsR0FBRztZQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDekIsQ0FBQztRQUNELFFBQVE7WUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7aUJBQzlEO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsWUFBWSxDQUFFLEdBQUc7WUFDZixJQUFJLENBQUMsR0FBRztnQkFBRSxPQUFNO1lBRWhCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLENBQUM7UUFDRCxLQUFLLEVBQUU7WUFDTCxTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sQ0FBRSxHQUFHO2dCQUNWLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtpQkFDdkU7Z0JBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7WUFDekIsQ0FBQztTQUNGO0tBQ0Y7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFBO0lBQ2pFLENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxjQUFjO1FBQ2QsSUFBSTtZQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDekIsQ0FBQztRQUNELGNBQWM7UUFDZCxZQUFZO1lBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDMUIsQ0FBQztRQUNELGlCQUFpQjtZQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7WUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBRTlDLElBQUksSUFBSSxDQUFDLFdBQVc7Z0JBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDaEQsQ0FBQztRQUNELGdCQUFnQixDQUFFLENBQUM7WUFDakIsT0FBTztZQUNMLGlEQUFpRDtZQUNqRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87Z0JBQ2QsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUVoQyw0Q0FBNEM7Z0JBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDVixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FDdEIsQ0FBQTtRQUNILENBQUM7UUFDRCxnQkFBZ0IsQ0FBRSxHQUFHO1lBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7WUFDOUIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUU7Z0JBQy9DLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFFL0IsbUJBQW1CO2dCQUNuQixDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDdEQ7WUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDMUMsQ0FBQztRQUNELGlCQUFpQixDQUFFLElBQUk7WUFDckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVyQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUNyRyxDQUFDO1FBQ0QsZ0JBQWdCLENBQUUsSUFBSSxFQUFFLEtBQUs7WUFDM0IsTUFBTSxVQUFVLEdBQUcsQ0FDakIsSUFBSSxDQUFDLFFBQVE7Z0JBQ2IsSUFBSSxDQUFDLFFBQVE7Z0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FDdkIsQ0FBQTtZQUNELE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUN0QixJQUFJLFVBQVU7b0JBQUUsT0FBTTtnQkFFdEIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO2dCQUNuQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFBO1lBQ1osQ0FBQyxDQUFBO1lBRUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLHNCQUFzQjtnQkFDbkMsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsVUFBVTtvQkFDekMsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRSxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWE7b0JBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDdkI7Z0JBQ0QsRUFBRSxFQUFFO29CQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTt3QkFDVCxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRTs0QkFDWixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQTt3QkFDNUIsQ0FBQyxDQUFDLENBQUE7b0JBQ0osQ0FBQztvQkFDRCxLQUFLO29CQUNMLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztpQkFDcEM7Z0JBQ0QsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQ3pCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ3hCLENBQUM7UUFDRCxpQkFBaUIsQ0FBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUk7WUFDbEMsd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUUvQyxNQUFNLFVBQVUsR0FBRyxDQUNqQixJQUFJLENBQUMsUUFBUTtnQkFDYixJQUFJLENBQUMsUUFBUTtnQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUN2QixDQUFBO1lBRUQsTUFBTSxPQUFPLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxhQUFhO2dCQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO2dCQUNoQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBRU4sT0FBTyxDQUFDLCtCQUErQixDQUFDLEdBQUcsVUFBVSxDQUFBO1lBRXJELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELE9BQU8sRUFBRSxPQUFPO2dCQUNoQixHQUFHO2FBQ0osRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDaEQsQ0FBQztRQUNELGNBQWM7WUFDWixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7WUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBRTdCLGtDQUFrQztZQUNsQyxpQkFBaUI7WUFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM3QixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUN4QixrQ0FBa0M7YUFDakM7aUJBQU07Z0JBQ0wsVUFBVSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtnQkFDL0MsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDaEM7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQzVDLFVBQVU7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDNUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRTthQUNuQixDQUFDLENBQUE7WUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7UUFDRCxRQUFRO1lBQ04sTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRXBELEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7WUFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtZQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBRXpELE9BQU8sS0FBSyxDQUFBO1FBQ2QsQ0FBQztRQUNELE9BQU87WUFDTCx3RUFBd0U7WUFDeEUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDdkYsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7YUFDOUI7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO2FBQ3ZCO1FBQ0gsQ0FBQztRQUNELGVBQWU7WUFDYixNQUFNLEtBQUssR0FBRyxDQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDO2lCQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRTtnQkFDL0MsSUFBSSxFQUFFLFFBQVE7YUFDZixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzVCLG9DQUFvQztZQUNwQywwQ0FBMEM7WUFDMUMseUJBQXlCO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RDLEdBQUcsSUFBSSxDQUFDLFFBQVE7YUFDakIsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNYLENBQUM7UUFDRCxPQUFPLENBQUUsU0FBUztZQUNoQixNQUFNLEtBQUssR0FBRztnQkFDWixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDaEMsQ0FBQTtZQUNELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBRW5GLCtCQUErQjtZQUMvQixLQUFLLE1BQU0sSUFBSSxJQUFJLGNBQWMsRUFBRTtnQkFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUN6QjtZQUVELEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUUxQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFFcEMsNEJBQTRCO1lBQzVCLG1DQUFtQztZQUNuQztZQUNFLDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSw4Q0FBOEM7Z0JBQ3BFLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLGtEQUFrRDtnQkFDMUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsbURBQW1EO2NBQzVFO2dCQUNBLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTthQUN4QjtpQkFBTTtnQkFDTCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7YUFDM0I7WUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxLQUFLO2dCQUNMLEVBQUUsRUFBRTtvQkFDRixLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQ1gsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUE7d0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO29CQUN0QixDQUFDO2lCQUNGO2dCQUNELEdBQUcsRUFBRSxNQUFNO2FBQ1osRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFDRCxhQUFhO1lBQ1gsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUE7WUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFbEMsSUFBSSxZQUFZLENBQUE7WUFDaEIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRTtnQkFDL0IsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTthQUNyQztpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hCLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUE7YUFDckM7aUJBQU07Z0JBQ0wsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQTthQUN0QztZQUVELE9BQU8sTUFBTSxFQUFFLEVBQUU7Z0JBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFlBQVksQ0FDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFDMUIsTUFBTSxFQUNOLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDL0IsQ0FBQTthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLHNCQUFzQjthQUNwQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2QsQ0FBQztRQUNELGFBQWEsQ0FBRSxRQUFRO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSxnQkFBZ0I7Z0JBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDM0IsSUFBSSxFQUFFLFdBQVc7YUFDbEIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNkLENBQUM7UUFDRCxnQkFBZ0IsQ0FBRSxJQUFJLEVBQUUsS0FBSztZQUMzQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO2dCQUNqQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixJQUFJO2dCQUNKLEtBQUs7Z0JBQ0wsUUFBUSxFQUFFLEtBQUssS0FBSyxJQUFJLENBQUMsYUFBYTtnQkFDdEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVE7YUFDekMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFlBQVk7WUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pELENBQUM7UUFDRCxXQUFXLENBQUUsSUFBSTtZQUNmLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDNUQsQ0FBQztRQUNELE9BQU8sQ0FBRSxJQUFJO1lBQ1gsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBQ0QsUUFBUSxDQUFFLElBQUk7WUFDWixPQUFPLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUN0RSxDQUFDO1FBQ0QsTUFBTSxDQUFFLENBQUM7WUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN2QixDQUFDO1FBQ0QsV0FBVyxDQUFFLElBQUk7WUFDZixJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7O2dCQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtZQUU5QixrQ0FBa0M7WUFDbEMsZ0JBQWdCO1lBQ2hCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTthQUN6QjtZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDekIsQ0FBQztRQUNELE9BQU87WUFDTCxJQUFJLElBQUksQ0FBQyxVQUFVO2dCQUFFLE9BQU07WUFFM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7WUFFeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQztRQUNELFdBQVc7WUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDZixDQUFDO1FBQ0QsU0FBUyxDQUFFLENBQUM7WUFDVixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7UUFDM0IsQ0FBQztRQUNELDZDQUE2QztRQUM3QyxTQUFTLENBQUUsQ0FBQztZQUNWLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUE7WUFFekIscURBQXFEO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJO2dCQUN4QixRQUFRLENBQUMsS0FBSztnQkFDZCxRQUFRLENBQUMsS0FBSztnQkFDZCxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2FBQzNCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7WUFFeEMscUNBQXFDO1lBQ3JDLElBQUksT0FBTyxLQUFLLFFBQVEsQ0FBQyxLQUFLO2dCQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBRXpELGdDQUFnQztZQUNoQyxJQUFJLE9BQU8sS0FBSyxRQUFRLENBQUMsR0FBRztnQkFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFdEQscUNBQXFDO1lBQ3JDLElBQUksT0FBTyxLQUFLLFFBQVEsQ0FBQyxHQUFHO2dCQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4RCxDQUFDO1FBQ0QsU0FBUyxDQUFFLENBQUM7WUFDVixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBRTlDLDZCQUE2QjtZQUM3QiwyQkFBMkI7WUFDM0IseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQ25CLFdBQVc7Z0JBQ1gsQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLE1BQU07b0JBQ3pCLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQy9CO2dCQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7Z0JBQ2hFLHVDQUF1QztnQkFDdkMscUNBQXFDO2FBQ3BDO2lCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7YUFDekI7WUFFRCxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzVDLENBQUM7UUFDRCxRQUFRO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RCLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUMxRDtpQkFBTTtnQkFDTCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNO29CQUFFLE9BQU07Z0JBRXRELE1BQU0sYUFBYSxHQUFHLENBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTtvQkFDekIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7d0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQzNCLEdBQUcsR0FBRyxDQUFBO2dCQUVQLElBQUksYUFBYSxFQUFFO29CQUNqQixJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtpQkFDcEI7YUFDRjtRQUNILENBQUM7UUFDRCxTQUFTLENBQUUsQ0FBQztZQUNWLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUVyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFFakQsOEJBQThCO1lBQzlCLDRCQUE0QjtZQUM1QixJQUNFLFFBQVE7Z0JBQ1IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxZQUFZO2dCQUNqQixTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQ2Q7Z0JBQ0EsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFBO2dCQUNsQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7Z0JBRW5CLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUNqQjtpQkFBTTtnQkFDTCxzQkFBc0I7Z0JBQ3RCLG1DQUFtQztnQkFDbkMsOEJBQThCO2dCQUM5QixVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ3hDO1FBQ0gsQ0FBQztRQUNELFVBQVUsQ0FBRSxJQUFJO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNuRSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTthQUMxQjtpQkFBTTtnQkFDTCxNQUFNLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ3hELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFFdEMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDaEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUN6QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDakQsQ0FBQyxDQUFDLENBQUE7Z0JBRUYsMEJBQTBCO2dCQUMxQix5QkFBeUI7Z0JBQ3pCLFlBQVk7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTt3QkFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO2dCQUN0QyxDQUFDLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQztRQUNELFlBQVksQ0FBRSxLQUFLO1lBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFDRCxnQkFBZ0I7WUFDZCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUE7WUFDeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUNqRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQTtZQUV0QixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUNyQixDQUFDLENBQUE7Z0JBRUYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ2QsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7aUJBQ3pDO2FBQ0Y7WUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQTtRQUNwQyxDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL190ZXh0LWZpZWxkcy5zdHlsJ1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc2VsZWN0LnN0eWwnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWQ2hpcCBmcm9tICcuLi9WQ2hpcCdcbmltcG9ydCBWTWVudSBmcm9tICcuLi9WTWVudSdcbmltcG9ydCBWU2VsZWN0TGlzdCBmcm9tICcuL1ZTZWxlY3RMaXN0J1xuXG4vLyBFeHRlbnNpb25zXG5pbXBvcnQgVlRleHRGaWVsZCBmcm9tICcuLi9WVGV4dEZpZWxkL1ZUZXh0RmllbGQnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbXBhcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2NvbXBhcmFibGUnXG5pbXBvcnQgRmlsdGVyYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvZmlsdGVyYWJsZSdcbmltcG9ydCBNZW51YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvbWVudWFibGUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBDbGlja091dHNpZGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBnZXRQcm9wZXJ0eUZyb21JdGVtLCBrZXlDb2RlcyB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcbmltcG9ydCB7IGNvbnNvbGVFcnJvciB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLy8gRm9yIGFwaS1nZW5lcmF0b3JcbmNvbnN0IGZha2VWTWVudSA9IHtcbiAgbmFtZTogJ3YtbWVudScsXG4gIHByb3BzOiBWTWVudS5wcm9wcyAvLyBUT0RPOiByZW1vdmUgc29tZSwganVzdCBmb3IgdGVzdGluZ1xufVxuXG5jb25zdCBmYWtlTWVudWFibGUgPSB7XG4gIG5hbWU6ICdtZW51YWJsZScsXG4gIHByb3BzOiBNZW51YWJsZS5wcm9wc1xufVxuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1zZWxlY3QnLFxuXG4gIGRpcmVjdGl2ZXM6IHtcbiAgICBDbGlja091dHNpZGVcbiAgfSxcblxuICBleHRlbmRzOiBWVGV4dEZpZWxkLFxuXG4gIG1peGluczogW1xuICAgIGZha2VWTWVudSxcbiAgICBmYWtlTWVudWFibGUsXG4gICAgQ29tcGFyYWJsZSxcbiAgICBGaWx0ZXJhYmxlXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBhcHBlbmRJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMuZHJvcGRvd24nXG4gICAgfSxcbiAgICBhcHBlbmRJY29uQ2I6IEZ1bmN0aW9uLFxuICAgIGF0dGFjaDoge1xuICAgICAgdHlwZTogbnVsbCxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBhdXRvOiBCb29sZWFuLFxuICAgIGJyb3dzZXJBdXRvY29tcGxldGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdvbidcbiAgICB9LFxuICAgIGNhY2hlSXRlbXM6IEJvb2xlYW4sXG4gICAgY2hpcHM6IEJvb2xlYW4sXG4gICAgY2xlYXJhYmxlOiBCb29sZWFuLFxuICAgIGNvbnRlbnRDbGFzczogU3RyaW5nLFxuICAgIGRlbGV0YWJsZUNoaXBzOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIGhpZGVTZWxlY3RlZDogQm9vbGVhbixcbiAgICBpdGVtczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICAgIH0sXG4gICAgaXRlbUF2YXRhcjoge1xuICAgICAgdHlwZTogW1N0cmluZywgQXJyYXksIEZ1bmN0aW9uXSxcbiAgICAgIGRlZmF1bHQ6ICdhdmF0YXInXG4gICAgfSxcbiAgICBpdGVtRGlzYWJsZWQ6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEFycmF5LCBGdW5jdGlvbl0sXG4gICAgICBkZWZhdWx0OiAnZGlzYWJsZWQnXG4gICAgfSxcbiAgICBpdGVtVGV4dDoge1xuICAgICAgdHlwZTogW1N0cmluZywgQXJyYXksIEZ1bmN0aW9uXSxcbiAgICAgIGRlZmF1bHQ6ICd0ZXh0J1xuICAgIH0sXG4gICAgaXRlbVZhbHVlOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBBcnJheSwgRnVuY3Rpb25dLFxuICAgICAgZGVmYXVsdDogJ3ZhbHVlJ1xuICAgIH0sXG4gICAgbWF4SGVpZ2h0OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcbiAgICBtaW5XaWR0aDoge1xuICAgICAgdHlwZTogW0Jvb2xlYW4sIE51bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIG11bHRpcGxlOiBCb29sZWFuLFxuICAgIG11bHRpTGluZTogQm9vbGVhbixcbiAgICBvcGVuT25DbGVhcjogQm9vbGVhbixcbiAgICByZXR1cm5PYmplY3Q6IEJvb2xlYW4sXG4gICAgc2VhcmNoSW5wdXQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHNtYWxsQ2hpcHM6IEJvb2xlYW4sXG4gICAgc2luZ2xlTGluZTogQm9vbGVhblxuICB9LFxuXG4gIGRhdGE6IHZtID0+ICh7XG4gICAgYXR0cnNJbnB1dDogeyByb2xlOiAnY29tYm9ib3gnIH0sXG4gICAgY2FjaGVkSXRlbXM6IHZtLmNhY2hlSXRlbXMgPyB2bS5pdGVtcyA6IFtdLFxuICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgaXNCb290ZWQ6IGZhbHNlLFxuICAgIGlzTWVudUFjdGl2ZTogZmFsc2UsXG4gICAgbGFzdEl0ZW06IDIwLFxuICAgIC8vIEFzIGxvbmcgYXMgYSB2YWx1ZSBpcyBkZWZpbmVkLCBzaG93IGl0XG4gICAgLy8gT3RoZXJ3aXNlLCBjaGVjayBpZiBtdWx0aXBsZVxuICAgIC8vIHRvIGRldGVybWluZSB3aGljaCBkZWZhdWx0IHRvIHByb3ZpZGVcbiAgICBsYXp5VmFsdWU6IHZtLnZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgID8gdm0udmFsdWVcbiAgICAgIDogdm0ubXVsdGlwbGUgPyBbXSA6IHVuZGVmaW5lZCxcbiAgICBzZWxlY3RlZEluZGV4OiAtMSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBbXVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIC8qIEFsbCBpdGVtcyB0aGF0IHRoZSBzZWxlY3QgaGFzICovXG4gICAgYWxsSXRlbXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyRHVwbGljYXRlcyh0aGlzLmNhY2hlZEl0ZW1zLmNvbmNhdCh0aGlzLml0ZW1zKSlcbiAgICB9LFxuICAgIGNsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIFZUZXh0RmllbGQuY29tcHV0ZWQuY2xhc3Nlcy5jYWxsKHRoaXMpLCB7XG4gICAgICAgICd2LXNlbGVjdCc6IHRydWUsXG4gICAgICAgICd2LXNlbGVjdC0tY2hpcHMnOiB0aGlzLmhhc0NoaXBzLFxuICAgICAgICAndi1zZWxlY3QtLWNoaXBzLS1zbWFsbCc6IHRoaXMuc21hbGxDaGlwcyxcbiAgICAgICAgJ3Ytc2VsZWN0LS1pcy1tZW51LWFjdGl2ZSc6IHRoaXMuaXNNZW51QWN0aXZlXG4gICAgICB9KVxuICAgIH0sXG4gICAgLyogVXNlZCBieSBvdGhlciBjb21wb25lbnRzIHRvIG92ZXJ3cml0ZSAqL1xuICAgIGNvbXB1dGVkSXRlbXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWxsSXRlbXNcbiAgICB9LFxuICAgIGNvdW50ZXJWYWx1ZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZVxuICAgICAgICA/IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGhcbiAgICAgICAgOiAodGhpcy5nZXRUZXh0KHRoaXMuc2VsZWN0ZWRJdGVtc1swXSkgfHwgJycpLnRvU3RyaW5nKCkubGVuZ3RoXG4gICAgfSxcbiAgICBkaXJlY3RpdmVzICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzRm9jdXNlZCA/IFt7XG4gICAgICAgIG5hbWU6ICdjbGljay1vdXRzaWRlJyxcbiAgICAgICAgdmFsdWU6IHRoaXMuYmx1cixcbiAgICAgICAgYXJnczoge1xuICAgICAgICAgIGNsb3NlQ29uZGl0aW9uYWw6IHRoaXMuY2xvc2VDb25kaXRpb25hbFxuICAgICAgICB9XG4gICAgICB9XSA6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgZHluYW1pY0hlaWdodCAoKSB7XG4gICAgICByZXR1cm4gJ2F1dG8nXG4gICAgfSxcbiAgICBoYXNDaGlwcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlwcyB8fCB0aGlzLnNtYWxsQ2hpcHNcbiAgICB9LFxuICAgIGhhc1Nsb3QgKCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5oYXNDaGlwcyB8fCB0aGlzLiRzY29wZWRTbG90cy5zZWxlY3Rpb24pXG4gICAgfSxcbiAgICBpc0RpcnR5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMFxuICAgIH0sXG4gICAgbWVudVByb3BzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsb3NlT25DbGljazogZmFsc2UsXG4gICAgICAgIGNsb3NlT25Db250ZW50Q2xpY2s6IGZhbHNlLFxuICAgICAgICBvcGVuT25DbGljazogZmFsc2UsXG4gICAgICAgIHZhbHVlOiB0aGlzLmlzTWVudUFjdGl2ZSxcbiAgICAgICAgb2Zmc2V0WTogdGhpcy5vZmZzZXRZLFxuICAgICAgICBudWRnZUJvdHRvbTogdGhpcy5udWRnZUJvdHRvbVxuICAgICAgICAgID8gdGhpcy5udWRnZUJvdHRvbVxuICAgICAgICAgIDogdGhpcy5vZmZzZXRZID8gMSA6IDAgLy8gY29udmVydCB0byBpbnRcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpc3REYXRhICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgYWN0aW9uOiB0aGlzLm11bHRpcGxlICYmICF0aGlzLmlzSGlkaW5nU2VsZWN0ZWQsXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgZGVuc2U6IHRoaXMuZGVuc2UsXG4gICAgICAgICAgaGlkZVNlbGVjdGVkOiB0aGlzLmhpZGVTZWxlY3RlZCxcbiAgICAgICAgICBpdGVtczogdGhpcy52aXJ0dWFsaXplZEl0ZW1zLFxuICAgICAgICAgIG5vRGF0YVRleHQ6IHRoaXMuJHZ1ZXRpZnkudCh0aGlzLm5vRGF0YVRleHQpLFxuICAgICAgICAgIHNlbGVjdGVkSXRlbXM6IHRoaXMuc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgICBpdGVtQXZhdGFyOiB0aGlzLml0ZW1BdmF0YXIsXG4gICAgICAgICAgaXRlbURpc2FibGVkOiB0aGlzLml0ZW1EaXNhYmxlZCxcbiAgICAgICAgICBpdGVtVmFsdWU6IHRoaXMuaXRlbVZhbHVlLFxuICAgICAgICAgIGl0ZW1UZXh0OiB0aGlzLml0ZW1UZXh0XG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgc2VsZWN0OiB0aGlzLnNlbGVjdEl0ZW1cbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBpdGVtOiB0aGlzLiRzY29wZWRTbG90cy5pdGVtXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXRpY0xpc3QgKCkge1xuICAgICAgaWYgKHRoaXMuJHNsb3RzWyduby1kYXRhJ10gfHwgdGhpcy4kc2xvdHNbJ3ByZXBlbmQtaXRlbSddIHx8IHRoaXMuJHNsb3RzWydhcHBlbmQtaXRlbSddKSB7XG4gICAgICAgIGNvbnNvbGVFcnJvcignYXNzZXJ0OiBzdGF0aWNMaXN0IHNob3VsZCBub3QgYmUgY2FsbGVkIGlmIHNsb3RzIGFyZSB1c2VkJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVlNlbGVjdExpc3QsIHRoaXMubGlzdERhdGEpXG4gICAgfSxcbiAgICB2aXJ0dWFsaXplZEl0ZW1zICgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5hdXRvXG4gICAgICAgID8gdGhpcy5jb21wdXRlZEl0ZW1zLnNsaWNlKDAsIHRoaXMubGFzdEl0ZW0pXG4gICAgICAgIDogdGhpcy5jb21wdXRlZEl0ZW1zXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaW50ZXJuYWxWYWx1ZSAodmFsKSB7XG4gICAgICB0aGlzLmluaXRpYWxWYWx1ZSA9IHZhbFxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5pbnRlcm5hbFZhbHVlKVxuICAgICAgdGhpcy5zZXRTZWxlY3RlZEl0ZW1zKClcbiAgICB9LFxuICAgIGlzQm9vdGVkICgpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCAmJiB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGlzTWVudUFjdGl2ZSAodmFsKSB7XG4gICAgICBpZiAoIXZhbCkgcmV0dXJuXG5cbiAgICAgIHRoaXMuaXNCb290ZWQgPSB0cnVlXG4gICAgfSxcbiAgICBpdGVtczoge1xuICAgICAgaW1tZWRpYXRlOiB0cnVlLFxuICAgICAgaGFuZGxlciAodmFsKSB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlSXRlbXMpIHtcbiAgICAgICAgICB0aGlzLmNhY2hlZEl0ZW1zID0gdGhpcy5maWx0ZXJEdXBsaWNhdGVzKHRoaXMuY2FjaGVkSXRlbXMuY29uY2F0KHZhbCkpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSXRlbXMoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLiRyZWZzLm1lbnUgJiYgdGhpcy4kcmVmcy5tZW51LiRyZWZzLmNvbnRlbnRcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgLyoqIEBwdWJsaWMgKi9cbiAgICBibHVyICgpIHtcbiAgICAgIHRoaXMuaXNNZW51QWN0aXZlID0gZmFsc2VcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQgJiYgdGhpcy4kcmVmcy5pbnB1dC5ibHVyKClcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xXG4gICAgfSxcbiAgICAvKiogQHB1YmxpYyAqL1xuICAgIGFjdGl2YXRlTWVudSAoKSB7XG4gICAgICB0aGlzLmlzTWVudUFjdGl2ZSA9IHRydWVcbiAgICB9LFxuICAgIGNsZWFyYWJsZUNhbGxiYWNrICgpIHtcbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHRoaXMubXVsdGlwbGUgPyBbXSA6IHVuZGVmaW5lZFxuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4gdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpKVxuXG4gICAgICBpZiAodGhpcy5vcGVuT25DbGVhcikgdGhpcy5pc01lbnVBY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBjbG9zZUNvbmRpdGlvbmFsIChlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAvLyBDbGljayBvcmlnaW5hdGVzIGZyb20gb3V0c2lkZSB0aGUgbWVudSBjb250ZW50XG4gICAgICAgICEhdGhpcy5jb250ZW50ICYmXG4gICAgICAgICF0aGlzLmNvbnRlbnQuY29udGFpbnMoZS50YXJnZXQpICYmXG5cbiAgICAgICAgLy8gQ2xpY2sgb3JpZ2luYXRlcyBmcm9tIG91dHNpZGUgdGhlIGVsZW1lbnRcbiAgICAgICAgISF0aGlzLiRlbCAmJlxuICAgICAgICAhdGhpcy4kZWwuY29udGFpbnMoZS50YXJnZXQpICYmXG4gICAgICAgIGUudGFyZ2V0ICE9PSB0aGlzLiRlbFxuICAgICAgKVxuICAgIH0sXG4gICAgZmlsdGVyRHVwbGljYXRlcyAoYXJyKSB7XG4gICAgICBjb25zdCB1bmlxdWVWYWx1ZXMgPSBuZXcgTWFwKClcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnIubGVuZ3RoOyArK2luZGV4KSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBhcnJbaW5kZXhdXG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZ2V0VmFsdWUoaXRlbSlcblxuICAgICAgICAvLyBUT0RPOiBjb21wYXJhdG9yXG4gICAgICAgICF1bmlxdWVWYWx1ZXMuaGFzKHZhbCkgJiYgdW5pcXVlVmFsdWVzLnNldCh2YWwsIGl0ZW0pXG4gICAgICB9XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbSh1bmlxdWVWYWx1ZXMudmFsdWVzKCkpXG4gICAgfSxcbiAgICBmaW5kRXhpc3RpbmdJbmRleCAoaXRlbSkge1xuICAgICAgY29uc3QgaXRlbVZhbHVlID0gdGhpcy5nZXRWYWx1ZShpdGVtKVxuXG4gICAgICByZXR1cm4gKHRoaXMuaW50ZXJuYWxWYWx1ZSB8fCBbXSkuZmluZEluZGV4KGkgPT4gdGhpcy52YWx1ZUNvbXBhcmF0b3IodGhpcy5nZXRWYWx1ZShpKSwgaXRlbVZhbHVlKSlcbiAgICB9LFxuICAgIGdlbkNoaXBTZWxlY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICBjb25zdCBpc0Rpc2FibGVkID0gKFxuICAgICAgICB0aGlzLmRpc2FibGVkIHx8XG4gICAgICAgIHRoaXMucmVhZG9ubHkgfHxcbiAgICAgICAgdGhpcy5nZXREaXNhYmxlZChpdGVtKVxuICAgICAgKVxuICAgICAgY29uc3QgZm9jdXMgPSAoZSwgY2IpID0+IHtcbiAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHJldHVyblxuXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgdGhpcy5vbkZvY3VzKClcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWQ2hpcCwge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtY2hpcC0tc2VsZWN0LW11bHRpJyxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjbG9zZTogdGhpcy5kZWxldGFibGVDaGlwcyAmJiAhaXNEaXNhYmxlZCxcbiAgICAgICAgICBkaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgICBzZWxlY3RlZDogaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICBzbWFsbDogdGhpcy5zbWFsbENoaXBzXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6IGUgPT4ge1xuICAgICAgICAgICAgZm9jdXMoZSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZvY3VzLFxuICAgICAgICAgIGlucHV0OiAoKSA9PiB0aGlzLm9uQ2hpcElucHV0KGl0ZW0pXG4gICAgICAgIH0sXG4gICAgICAgIGtleTogdGhpcy5nZXRWYWx1ZShpdGVtKVxuICAgICAgfSwgdGhpcy5nZXRUZXh0KGl0ZW0pKVxuICAgIH0sXG4gICAgZ2VuQ29tbWFTZWxlY3Rpb24gKGl0ZW0sIGluZGV4LCBsYXN0KSB7XG4gICAgICAvLyBJdGVtIG1heSBiZSBhbiBvYmplY3RcbiAgICAgIC8vIFRPRE86IFJlbW92ZSBKU09OLnN0cmluZ2lmeVxuICAgICAgY29uc3Qga2V5ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRWYWx1ZShpdGVtKSlcblxuICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IChcbiAgICAgICAgdGhpcy5kaXNhYmxlZCB8fFxuICAgICAgICB0aGlzLnJlYWRvbmx5IHx8XG4gICAgICAgIHRoaXMuZ2V0RGlzYWJsZWQoaXRlbSlcbiAgICAgIClcblxuICAgICAgY29uc3QgY2xhc3NlcyA9IGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXhcbiAgICAgICAgPyB0aGlzLmFkZFRleHRDb2xvckNsYXNzQ2hlY2tzKClcbiAgICAgICAgOiB7fVxuXG4gICAgICBjbGFzc2VzWyd2LXNlbGVjdF9fc2VsZWN0aW9uLS1kaXNhYmxlZCddID0gaXNEaXNhYmxlZFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2VsZWN0X19zZWxlY3Rpb24gdi1zZWxlY3RfX3NlbGVjdGlvbi0tY29tbWEnLFxuICAgICAgICAnY2xhc3MnOiBjbGFzc2VzLFxuICAgICAgICBrZXlcbiAgICAgIH0sIGAke3RoaXMuZ2V0VGV4dChpdGVtKX0ke2xhc3QgPyAnJyA6ICcsICd9YClcbiAgICB9LFxuICAgIGdlbkRlZmF1bHRTbG90ICgpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGlvbnMgPSB0aGlzLmdlblNlbGVjdGlvbnMoKVxuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdlbklucHV0KClcblxuICAgICAgLy8gSWYgdGhlIHJldHVybiBpcyBhbiBlbXB0eSBhcnJheVxuICAgICAgLy8gcHVzaCB0aGUgaW5wdXRcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdGlvbnMpKSB7XG4gICAgICAgIHNlbGVjdGlvbnMucHVzaChpbnB1dClcbiAgICAgIC8vIE90aGVyd2lzZSBwdXNoIGl0IGludG8gY2hpbGRyZW5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGVjdGlvbnMuY2hpbGRyZW4gPSBzZWxlY3Rpb25zLmNoaWxkcmVuIHx8IFtdXG4gICAgICAgIHNlbGVjdGlvbnMuY2hpbGRyZW4ucHVzaChpbnB1dClcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWN0aXZhdG9yID0gdGhpcy5nZW5TZWxlY3RTbG90KFtcbiAgICAgICAgdGhpcy5nZW5MYWJlbCgpLFxuICAgICAgICB0aGlzLnByZWZpeCA/IHRoaXMuZ2VuQWZmaXgoJ3ByZWZpeCcpIDogbnVsbCxcbiAgICAgICAgc2VsZWN0aW9ucyxcbiAgICAgICAgdGhpcy5zdWZmaXggPyB0aGlzLmdlbkFmZml4KCdzdWZmaXgnKSA6IG51bGwsXG4gICAgICAgIHRoaXMuZ2VuQ2xlYXJJY29uKCksXG4gICAgICAgIHRoaXMuZ2VuSWNvblNsb3QoKVxuICAgICAgXSlcblxuICAgICAgcmV0dXJuIFt0aGlzLmdlbk1lbnUoYWN0aXZhdG9yKV1cbiAgICB9LFxuICAgIGdlbklucHV0ICgpIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gVlRleHRGaWVsZC5tZXRob2RzLmdlbklucHV0LmNhbGwodGhpcylcblxuICAgICAgaW5wdXQuZGF0YS5kb21Qcm9wcy52YWx1ZSA9IG51bGxcbiAgICAgIGlucHV0LmRhdGEuYXR0cnMucmVhZG9ubHkgPSB0cnVlXG4gICAgICBpbnB1dC5kYXRhLmF0dHJzWydhcmlhLXJlYWRvbmx5J10gPSBTdHJpbmcodGhpcy5yZWFkb25seSlcblxuICAgICAgcmV0dXJuIGlucHV0XG4gICAgfSxcbiAgICBnZW5MaXN0ICgpIHtcbiAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gc2xvdHMsIHdlIGNhbiB1c2UgYSBjYWNoZWQgVk5vZGUgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuICAgICAgaWYgKHRoaXMuJHNsb3RzWyduby1kYXRhJ10gfHwgdGhpcy4kc2xvdHNbJ3ByZXBlbmQtaXRlbSddIHx8IHRoaXMuJHNsb3RzWydhcHBlbmQtaXRlbSddKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlbkxpc3RXaXRoU2xvdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0aWNMaXN0XG4gICAgICB9XG4gICAgfSxcbiAgICBnZW5MaXN0V2l0aFNsb3QgKCkge1xuICAgICAgY29uc3Qgc2xvdHMgPSBbJ3ByZXBlbmQtaXRlbScsICduby1kYXRhJywgJ2FwcGVuZC1pdGVtJ11cbiAgICAgICAgLmZpbHRlcihzbG90TmFtZSA9PiB0aGlzLiRzbG90c1tzbG90TmFtZV0pXG4gICAgICAgIC5tYXAoc2xvdE5hbWUgPT4gdGhpcy4kY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnLCB7XG4gICAgICAgICAgc2xvdDogc2xvdE5hbWVcbiAgICAgICAgfSwgdGhpcy4kc2xvdHNbc2xvdE5hbWVdKSlcbiAgICAgIC8vIFJlcXVpcmVzIGRlc3RydWN0dXJpbmcgZHVlIHRvIFZ1ZVxuICAgICAgLy8gbW9kaWZ5aW5nIHRoZSBgb25gIHByb3BlcnR5IHdoZW4gcGFzc2VkXG4gICAgICAvLyBhcyBhIHJlZmVyZW5jZWQgb2JqZWN0XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWU2VsZWN0TGlzdCwge1xuICAgICAgICAuLi50aGlzLmxpc3REYXRhXG4gICAgICB9LCBzbG90cylcbiAgICB9LFxuICAgIGdlbk1lbnUgKGFjdGl2YXRvcikge1xuICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgIGNvbnRlbnRDbGFzczogdGhpcy5jb250ZW50Q2xhc3NcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluaGVyaXRlZFByb3BzID0gT2JqZWN0LmtleXMoVk1lbnUucHJvcHMpLmNvbmNhdChPYmplY3Qua2V5cyhNZW51YWJsZS5wcm9wcykpXG5cbiAgICAgIC8vIExhdGVyIHRoaXMgbWlnaHQgYmUgZmlsdGVyZWRcbiAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBpbmhlcml0ZWRQcm9wcykge1xuICAgICAgICBwcm9wc1twcm9wXSA9IHRoaXNbcHJvcF1cbiAgICAgIH1cblxuICAgICAgcHJvcHMuYWN0aXZhdG9yID0gdGhpcy4kcmVmc1snaW5wdXQtc2xvdCddXG5cbiAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMsIHRoaXMubWVudVByb3BzKVxuXG4gICAgICAvLyBBdHRhY2ggdG8gcm9vdCBlbCBzbyB0aGF0XG4gICAgICAvLyBtZW51IGNvdmVycyBwcmVwZW5kL2FwcGVuZCBpY29uc1xuICAgICAgaWYgKFxuICAgICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYSBjb21wdXRlZCBwcm9wZXJ0eSBvciBoZWxwZXIgb3Igc29tZXRoaW5nXG4gICAgICAgIHRoaXMuYXR0YWNoID09PSAnJyB8fCAvLyBJZiB1c2VkIGFzIGEgYm9vbGVhbiBwcm9wICg8di1tZW51IGF0dGFjaD4pXG4gICAgICAgIHRoaXMuYXR0YWNoID09PSB0cnVlIHx8IC8vIElmIGJvdW5kIHRvIGEgYm9vbGVhbiAoPHYtbWVudSA6YXR0YWNoPVwidHJ1ZVwiPilcbiAgICAgICAgdGhpcy5hdHRhY2ggPT09ICdhdHRhY2gnIC8vIElmIGJvdW5kIGFzIGJvb2xlYW4gcHJvcCBpbiBwdWcgKHYtbWVudShhdHRhY2gpKVxuICAgICAgKSB7XG4gICAgICAgIHByb3BzLmF0dGFjaCA9IHRoaXMuJGVsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wcy5hdHRhY2ggPSB0aGlzLmF0dGFjaFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWTWVudSwge1xuICAgICAgICBwcm9wcyxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBpbnB1dDogdmFsID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNNZW51QWN0aXZlID0gdmFsXG4gICAgICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHZhbFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVmOiAnbWVudSdcbiAgICAgIH0sIFthY3RpdmF0b3IsIHRoaXMuZ2VuTGlzdCgpXSlcbiAgICB9LFxuICAgIGdlblNlbGVjdGlvbnMgKCkge1xuICAgICAgbGV0IGxlbmd0aCA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGhcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gbmV3IEFycmF5KGxlbmd0aClcblxuICAgICAgbGV0IGdlblNlbGVjdGlvblxuICAgICAgaWYgKHRoaXMuJHNjb3BlZFNsb3RzLnNlbGVjdGlvbikge1xuICAgICAgICBnZW5TZWxlY3Rpb24gPSB0aGlzLmdlblNsb3RTZWxlY3Rpb25cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNDaGlwcykge1xuICAgICAgICBnZW5TZWxlY3Rpb24gPSB0aGlzLmdlbkNoaXBTZWxlY3Rpb25cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdlblNlbGVjdGlvbiA9IHRoaXMuZ2VuQ29tbWFTZWxlY3Rpb25cbiAgICAgIH1cblxuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGNoaWxkcmVuW2xlbmd0aF0gPSBnZW5TZWxlY3Rpb24oXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zW2xlbmd0aF0sXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIGxlbmd0aCA9PT0gY2hpbGRyZW4ubGVuZ3RoIC0gMVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1zZWxlY3RfX3NlbGVjdGlvbnMnXG4gICAgICB9LCBjaGlsZHJlbilcbiAgICB9LFxuICAgIGdlblNlbGVjdFNsb3QgKGNoaWxkcmVuKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2VsZWN0X19zbG90JyxcbiAgICAgICAgZGlyZWN0aXZlczogdGhpcy5kaXJlY3RpdmVzLFxuICAgICAgICBzbG90OiAnYWN0aXZhdG9yJ1xuICAgICAgfSwgY2hpbGRyZW4pXG4gICAgfSxcbiAgICBnZW5TbG90U2VsZWN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLnNlbGVjdGlvbih7XG4gICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgICAgaXRlbSxcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIHNlbGVjdGVkOiBpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4LFxuICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5XG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0TWVudUluZGV4ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRyZWZzLm1lbnUgPyB0aGlzLiRyZWZzLm1lbnUubGlzdEluZGV4IDogLTFcbiAgICB9LFxuICAgIGdldERpc2FibGVkIChpdGVtKSB7XG4gICAgICByZXR1cm4gZ2V0UHJvcGVydHlGcm9tSXRlbShpdGVtLCB0aGlzLml0ZW1EaXNhYmxlZCwgZmFsc2UpXG4gICAgfSxcbiAgICBnZXRUZXh0IChpdGVtKSB7XG4gICAgICByZXR1cm4gZ2V0UHJvcGVydHlGcm9tSXRlbShpdGVtLCB0aGlzLml0ZW1UZXh0LCBpdGVtKVxuICAgIH0sXG4gICAgZ2V0VmFsdWUgKGl0ZW0pIHtcbiAgICAgIHJldHVybiBnZXRQcm9wZXJ0eUZyb21JdGVtKGl0ZW0sIHRoaXMuaXRlbVZhbHVlLCB0aGlzLmdldFRleHQoaXRlbSkpXG4gICAgfSxcbiAgICBvbkJsdXIgKGUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2JsdXInLCBlKVxuICAgIH0sXG4gICAgb25DaGlwSW5wdXQgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB0aGlzLnNlbGVjdEl0ZW0oaXRlbSlcbiAgICAgIGVsc2UgdGhpcy5pbnRlcm5hbFZhbHVlID0gbnVsbFxuXG4gICAgICAvLyBJZiBhbGwgaXRlbXMgaGF2ZSBiZWVuIGRlbGV0ZWQsXG4gICAgICAvLyBvcGVuIGB2LW1lbnVgXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmlzTWVudUFjdGl2ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xXG4gICAgfSxcbiAgICBvbkNsaWNrICgpIHtcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHJldHVyblxuXG4gICAgICB0aGlzLmlzTWVudUFjdGl2ZSA9IHRydWVcblxuICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWVcbiAgICAgICAgdGhpcy4kZW1pdCgnZm9jdXMnKVxuICAgICAgfVxuICAgIH0sXG4gICAgb25FbnRlckRvd24gKCkge1xuICAgICAgdGhpcy5vbkJsdXIoKVxuICAgIH0sXG4gICAgb25Fc2NEb3duIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHRoaXMuaXNNZW51QWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIC8vIERldGVjdCB0YWIgYW5kIGNhbGwgb3JpZ2luYWwgb25CbHVyIG1ldGhvZFxuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgY29uc3Qga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgICAvLyBJZiBlbnRlciwgc3BhY2UsIHVwLCBvciBkb3duIGlzIHByZXNzZWQsIG9wZW4gbWVudVxuICAgICAgaWYgKCF0aGlzLmlzTWVudUFjdGl2ZSAmJiBbXG4gICAgICAgIGtleUNvZGVzLmVudGVyLFxuICAgICAgICBrZXlDb2Rlcy5zcGFjZSxcbiAgICAgICAga2V5Q29kZXMudXAsIGtleUNvZGVzLmRvd25cbiAgICAgIF0uaW5jbHVkZXMoa2V5Q29kZSkpIHRoaXMuYWN0aXZhdGVNZW51KClcblxuICAgICAgLy8gVGhpcyBzaG91bGQgZG8gc29tZXRoaW5nIGRpZmZlcmVudFxuICAgICAgaWYgKGtleUNvZGUgPT09IGtleUNvZGVzLmVudGVyKSByZXR1cm4gdGhpcy5vbkVudGVyRG93bigpXG5cbiAgICAgIC8vIElmIGVzY2FwZSBkZWFjdGl2YXRlIHRoZSBtZW51XG4gICAgICBpZiAoa2V5Q29kZSA9PT0ga2V5Q29kZXMuZXNjKSByZXR1cm4gdGhpcy5vbkVzY0Rvd24oZSlcblxuICAgICAgLy8gSWYgdGFiIC0gc2VsZWN0IGl0ZW0gb3IgY2xvc2UgbWVudVxuICAgICAgaWYgKGtleUNvZGUgPT09IGtleUNvZGVzLnRhYikgcmV0dXJuIHRoaXMub25UYWJEb3duKGUpXG4gICAgfSxcbiAgICBvbk1vdXNlVXAgKGUpIHtcbiAgICAgIGNvbnN0IGFwcGVuZElubmVyID0gdGhpcy4kcmVmc1snYXBwZW5kLWlubmVyJ11cblxuICAgICAgLy8gSWYgYXBwZW5kIGlubmVyIGlzIHByZXNlbnRcbiAgICAgIC8vIGFuZCB0aGUgdGFyZ2V0IGlzIGl0c2VsZlxuICAgICAgLy8gb3IgaW5zaWRlLCB0b2dnbGUgbWVudVxuICAgICAgaWYgKHRoaXMuaXNNZW51QWN0aXZlICYmXG4gICAgICAgIGFwcGVuZElubmVyICYmXG4gICAgICAgIChhcHBlbmRJbm5lciA9PT0gZS50YXJnZXQgfHxcbiAgICAgICAgYXBwZW5kSW5uZXIuY29udGFpbnMoZS50YXJnZXQpKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+ICh0aGlzLmlzTWVudUFjdGl2ZSA9ICF0aGlzLmlzTWVudUFjdGl2ZSkpXG4gICAgICAvLyBJZiB1c2VyIGlzIGNsaWNraW5nIGluIHRoZSBjb250YWluZXJcbiAgICAgIC8vIGFuZCBmaWVsZCBpcyBlbmNsb3NlZCwgYWN0aXZhdGUgaXRcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0VuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuaXNNZW51QWN0aXZlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBWVGV4dEZpZWxkLm1ldGhvZHMub25Nb3VzZVVwLmNhbGwodGhpcywgZSlcbiAgICB9LFxuICAgIG9uU2Nyb2xsICgpIHtcbiAgICAgIGlmICghdGhpcy5pc01lbnVBY3RpdmUpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+ICh0aGlzLmNvbnRlbnQuc2Nyb2xsVG9wID0gMCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5sYXN0SXRlbSA+PSB0aGlzLmNvbXB1dGVkSXRlbXMubGVuZ3RoKSByZXR1cm5cblxuICAgICAgICBjb25zdCBzaG93TW9yZUl0ZW1zID0gKFxuICAgICAgICAgIHRoaXMuY29udGVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICAgICh0aGlzLmNvbnRlbnQuc2Nyb2xsVG9wICtcbiAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xpZW50SGVpZ2h0KVxuICAgICAgICApIDwgMjAwXG5cbiAgICAgICAgaWYgKHNob3dNb3JlSXRlbXMpIHtcbiAgICAgICAgICB0aGlzLmxhc3RJdGVtICs9IDIwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG9uVGFiRG93biAoZSkge1xuICAgICAgY29uc3QgbWVudUluZGV4ID0gdGhpcy5nZXRNZW51SW5kZXgoKVxuXG4gICAgICBjb25zdCBsaXN0VGlsZSA9IHRoaXMuJHJlZnMubWVudS50aWxlc1ttZW51SW5kZXhdXG5cbiAgICAgIC8vIEFuIGl0ZW0gdGhhdCBpcyBzZWxlY3RlZCBieVxuICAgICAgLy8gbWVudS1pbmRleCBzaG91bGQgdG9nZ2xlZFxuICAgICAgaWYgKFxuICAgICAgICBsaXN0VGlsZSAmJlxuICAgICAgICBsaXN0VGlsZS5jbGFzc05hbWUuaW5kZXhPZigndi1saXN0X190aWxlLS1oaWdobGlnaHRlZCcpID4gLTEgJiZcbiAgICAgICAgdGhpcy5pc01lbnVBY3RpdmUgJiZcbiAgICAgICAgbWVudUluZGV4ID4gLTFcbiAgICAgICkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgIGxpc3RUaWxlLmNsaWNrKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSxcbiAgICAgICAgLy8gdGhlIHVzZXIgaGFzIG5vIHNlbGVjdGVkIGluZGV4ZXNcbiAgICAgICAgLy8gYW5kIGlzIHByb2JhYmx5IHRhYmJpbmcgb3V0XG4gICAgICAgIFZUZXh0RmllbGQubWV0aG9kcy5vbkJsdXIuY2FsbCh0aGlzLCBlKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0SXRlbSAoaXRlbSkge1xuICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHRoaXMucmV0dXJuT2JqZWN0ID8gaXRlbSA6IHRoaXMuZ2V0VmFsdWUoaXRlbSlcbiAgICAgICAgdGhpcy5pc01lbnVBY3RpdmUgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW50ZXJuYWxWYWx1ZSA9ICh0aGlzLmludGVybmFsVmFsdWUgfHwgW10pLnNsaWNlKClcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuZmluZEV4aXN0aW5nSW5kZXgoaXRlbSlcblxuICAgICAgICBpICE9PSAtMSA/IGludGVybmFsVmFsdWUuc3BsaWNlKGksIDEpIDogaW50ZXJuYWxWYWx1ZS5wdXNoKGl0ZW0pXG4gICAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IGludGVybmFsVmFsdWUubWFwKGkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJldHVybk9iamVjdCA/IGkgOiB0aGlzLmdldFZhbHVlKGkpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gV2hlbiBzZWxlY3RpbmcgbXVsdGlwbGVcbiAgICAgICAgLy8gYWRqdXN0IG1lbnUgYWZ0ZXIgZWFjaFxuICAgICAgICAvLyBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHRoaXMuJHJlZnMubWVudSAmJlxuICAgICAgICAgICAgdGhpcy4kcmVmcy5tZW51LnVwZGF0ZURpbWVuc2lvbnMoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0TWVudUluZGV4IChpbmRleCkge1xuICAgICAgdGhpcy4kcmVmcy5tZW51ICYmICh0aGlzLiRyZWZzLm1lbnUubGlzdEluZGV4ID0gaW5kZXgpXG4gICAgfSxcbiAgICBzZXRTZWxlY3RlZEl0ZW1zICgpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBbXVxuICAgICAgY29uc3QgdmFsdWVzID0gIXRoaXMubXVsdGlwbGUgfHwgIUFycmF5LmlzQXJyYXkodGhpcy5pbnRlcm5hbFZhbHVlKVxuICAgICAgICA/IFt0aGlzLmludGVybmFsVmFsdWVdXG4gICAgICAgIDogdGhpcy5pbnRlcm5hbFZhbHVlXG5cbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5hbGxJdGVtcy5maW5kSW5kZXgodiA9PiB0aGlzLnZhbHVlQ29tcGFyYXRvcihcbiAgICAgICAgICB0aGlzLmdldFZhbHVlKHYpLFxuICAgICAgICAgIHRoaXMuZ2V0VmFsdWUodmFsdWUpXG4gICAgICAgICkpXG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2godGhpcy5hbGxJdGVtc1tpbmRleF0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtc1xuICAgIH1cbiAgfVxufVxuIl19