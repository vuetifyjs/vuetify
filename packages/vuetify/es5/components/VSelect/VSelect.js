'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultMenuProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Components

// Extensions

// Mixins

// Directives

// Helpers


require('../../../src/stylus/components/_text-fields.styl');

require('../../../src/stylus/components/_select.styl');

var _VChip = require('../VChip');

var _VChip2 = _interopRequireDefault(_VChip);

var _VMenu = require('../VMenu');

var _VMenu2 = _interopRequireDefault(_VMenu);

var _VSelectList = require('./VSelectList');

var _VSelectList2 = _interopRequireDefault(_VSelectList);

var _VTextField = require('../VTextField/VTextField');

var _VTextField2 = _interopRequireDefault(_VTextField);

var _comparable = require('../../mixins/comparable');

var _comparable2 = _interopRequireDefault(_comparable);

var _filterable = require('../../mixins/filterable');

var _filterable2 = _interopRequireDefault(_filterable);

var _clickOutside = require('../../directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _helpers = require('../../util/helpers');

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultMenuProps = exports.defaultMenuProps = {
    closeOnClick: false,
    closeOnContentClick: false,
    openOnClick: false,
    maxHeight: 300
};
/* @vue/component */
exports.default = {
    name: 'v-select',
    directives: {
        ClickOutside: _clickOutside2.default
    },
    extends: _VTextField2.default,
    mixins: [_comparable2.default, _filterable2.default],
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
        menuProps: {
            type: [String, Array, Object],
            default: function _default() {
                return defaultMenuProps;
            }
        },
        multiple: Boolean,
        openOnClear: Boolean,
        returnObject: Boolean,
        searchInput: {
            default: null
        },
        smallChips: Boolean
    },
    data: function data(vm) {
        return {
            attrsInput: { role: 'combobox' },
            cachedItems: vm.cacheItems ? vm.items : [],
            content: null,
            isBooted: false,
            isMenuActive: false,
            lastItem: 20,
            // As long as a value is defined, show it
            // Otherwise, check if multiple
            // to determine which default to provide
            lazyValue: vm.value !== undefined ? vm.value : vm.multiple ? [] : undefined,
            selectedIndex: -1,
            selectedItems: []
        };
    },
    computed: {
        /* All items that the select has */
        allItems: function allItems() {
            return this.filterDuplicates(this.cachedItems.concat(this.items));
        },
        classes: function classes() {
            return Object.assign({}, _VTextField2.default.computed.classes.call(this), {
                'v-select': true,
                'v-select--chips': this.hasChips,
                'v-select--chips--small': this.smallChips,
                'v-select--is-menu-active': this.isMenuActive
            });
        },

        /* Used by other components to overwrite */
        computedItems: function computedItems() {
            return this.allItems;
        },
        counterValue: function counterValue() {
            return this.multiple ? this.selectedItems.length : (this.getText(this.selectedItems[0]) || '').toString().length;
        },
        directives: function directives() {
            return this.isFocused ? [{
                name: 'click-outside',
                value: this.blur,
                args: {
                    closeConditional: this.closeConditional
                }
            }] : undefined;
        },
        dynamicHeight: function dynamicHeight() {
            return 'auto';
        },
        hasChips: function hasChips() {
            return this.chips || this.smallChips;
        },
        hasSlot: function hasSlot() {
            return Boolean(this.hasChips || this.$scopedSlots.selection);
        },
        isDirty: function isDirty() {
            return this.selectedItems.length > 0;
        },
        listData: function listData() {
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
        staticList: function staticList() {
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                (0, _console.consoleError)('assert: staticList should not be called if slots are used');
            }
            return this.$createElement(_VSelectList2.default, this.listData);
        },
        virtualizedItems: function virtualizedItems() {
            return this.$_menuProps.auto ? this.computedItems : this.computedItems.slice(0, this.lastItem);
        },
        menuCanShow: function menuCanShow() {
            return true;
        },
        $_menuProps: function $_menuProps() {
            var normalisedProps = void 0;
            normalisedProps = typeof this.menuProps === 'string' ? this.menuProps.split(',') : this.menuProps;
            if (Array.isArray(normalisedProps)) {
                normalisedProps = normalisedProps.reduce(function (acc, p) {
                    acc[p.trim()] = true;
                    return acc;
                }, {});
            }
            return _extends({}, defaultMenuProps, {
                value: this.menuCanShow && this.isMenuActive,
                nudgeBottom: this.nudgeBottom ? this.nudgeBottom : normalisedProps.offsetY ? 1 : 0
            }, normalisedProps);
        }
    },
    watch: {
        internalValue: function internalValue(val) {
            this.initialValue = val;
            this.setSelectedItems();
        },
        isBooted: function isBooted() {
            var _this = this;

            this.$nextTick(function () {
                if (_this.content && _this.content.addEventListener) {
                    _this.content.addEventListener('scroll', _this.onScroll, false);
                }
            });
        },
        isMenuActive: function isMenuActive(val) {
            if (!val) return;
            this.isBooted = true;
        },

        items: {
            immediate: true,
            handler: function handler(val) {
                if (this.cacheItems) {
                    this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
                }
                this.setSelectedItems();
            }
        }
    },
    mounted: function mounted() {
        this.content = this.$refs.menu && this.$refs.menu.$refs.content;
    },

    methods: {
        /** @public */
        blur: function blur() {
            this.isMenuActive = false;
            this.isFocused = false;
            this.$refs.input && this.$refs.input.blur();
            this.selectedIndex = -1;
        },

        /** @public */
        activateMenu: function activateMenu() {
            this.isMenuActive = true;
        },
        clearableCallback: function clearableCallback() {
            var _this2 = this;

            this.setValue(this.multiple ? [] : undefined);
            this.$nextTick(function () {
                return _this2.$refs.input.focus();
            });
            if (this.openOnClear) this.isMenuActive = true;
        },
        closeConditional: function closeConditional(e) {
            return (
                // Click originates from outside the menu content
                !!this.content && !this.content.contains(e.target) &&
                // Click originates from outside the element
                !!this.$el && !this.$el.contains(e.target) && e.target !== this.$el
            );
        },
        filterDuplicates: function filterDuplicates(arr) {
            var uniqueValues = new Map();
            for (var index = 0; index < arr.length; ++index) {
                var item = arr[index];
                var val = this.getValue(item);
                // TODO: comparator
                !uniqueValues.has(val) && uniqueValues.set(val, item);
            }
            return Array.from(uniqueValues.values());
        },
        findExistingIndex: function findExistingIndex(item) {
            var _this3 = this;

            var itemValue = this.getValue(item);
            return (this.internalValue || []).findIndex(function (i) {
                return _this3.valueComparator(_this3.getValue(i), itemValue);
            });
        },
        genChipSelection: function genChipSelection(item, index) {
            var _this4 = this;

            var isDisabled = this.disabled || this.readonly || this.getDisabled(item);
            var focus = function focus(e, cb) {
                if (isDisabled) return;
                e.stopPropagation();
                _this4.onFocus();
                cb && cb();
            };
            return this.$createElement(_VChip2.default, {
                staticClass: 'v-chip--select-multi',
                props: {
                    close: this.deletableChips && !isDisabled,
                    disabled: isDisabled,
                    selected: index === this.selectedIndex,
                    small: this.smallChips
                },
                on: {
                    click: function click(e) {
                        focus(e, function () {
                            _this4.selectedIndex = index;
                        });
                    },
                    focus: focus,
                    input: function input() {
                        return _this4.onChipInput(item);
                    }
                },
                key: this.getValue(item)
            }, this.getText(item));
        },
        genCommaSelection: function genCommaSelection(item, index, last) {
            // Item may be an object
            // TODO: Remove JSON.stringify
            var key = JSON.stringify(this.getValue(item));
            var color = index === this.selectedIndex && this.color;
            var isDisabled = this.disabled || this.getDisabled(item);
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-select__selection v-select__selection--comma',
                'class': {
                    'v-select__selection--disabled': isDisabled
                },
                key: key
            }), '' + this.getText(item) + (last ? '' : ', '));
        },
        genDefaultSlot: function genDefaultSlot() {
            var selections = this.genSelections();
            var input = this.genInput();
            // If the return is an empty array
            // push the input
            if (Array.isArray(selections)) {
                selections.push(input);
                // Otherwise push it into children
            } else {
                selections.children = selections.children || [];
                selections.children.push(input);
            }
            return [this.$createElement('div', {
                staticClass: 'v-select__slot',
                directives: this.directives
            }, [this.genLabel(), this.prefix ? this.genAffix('prefix') : null, selections, this.suffix ? this.genAffix('suffix') : null, this.genClearIcon(), this.genIconSlot()]), this.genMenu(), this.genProgress()];
        },
        genInput: function genInput() {
            var input = _VTextField2.default.methods.genInput.call(this);
            input.data.domProps.value = null;
            input.data.attrs.readonly = true;
            input.data.attrs['aria-readonly'] = String(this.readonly);
            return input;
        },
        genList: function genList() {
            // If there's no slots, we can use a cached VNode to improve performance
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                return this.genListWithSlot();
            } else {
                return this.staticList;
            }
        },
        genListWithSlot: function genListWithSlot() {
            var _this5 = this;

            var slots = ['prepend-item', 'no-data', 'append-item'].filter(function (slotName) {
                return _this5.$slots[slotName];
            }).map(function (slotName) {
                return _this5.$createElement('template', {
                    slot: slotName
                }, _this5.$slots[slotName]);
            });
            // Requires destructuring due to Vue
            // modifying the `on` property when passed
            // as a referenced object
            return this.$createElement(_VSelectList2.default, _extends({}, this.listData), slots);
        },
        genMenu: function genMenu() {
            var _this6 = this;

            var props = this.$_menuProps;
            props.activator = this.$refs['input-slot'];
            // Deprecate using menu props directly
            // TODO: remove (2.0)
            var inheritedProps = Object.keys(_VMenu2.default.options.props);
            var deprecatedProps = Object.keys(this.$attrs).reduce(function (acc, attr) {
                if (inheritedProps.includes((0, _helpers.camelize)(attr))) acc.push(attr);
                return acc;
            }, []);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = deprecatedProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prop = _step.value;

                    props[(0, _helpers.camelize)(prop)] = this.$attrs[prop];
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

            if (process.env.NODE_ENV !== 'production') {
                if (deprecatedProps.length) {
                    var multiple = deprecatedProps.length > 1;
                    var replacement = deprecatedProps.reduce(function (acc, p) {
                        acc[(0, _helpers.camelize)(p)] = _this6.$attrs[p];
                        return acc;
                    }, {});
                    var _props = deprecatedProps.map(function (p) {
                        return '\'' + p + '\'';
                    }).join(', ');
                    var separator = multiple ? '\n' : '\'';
                    var onlyBools = Object.keys(replacement).every(function (prop) {
                        var propType = _VMenu2.default.options.props[prop];
                        var value = replacement[prop];
                        return value === true || (propType.type || propType) === Boolean && value === '';
                    });
                    if (onlyBools) {
                        replacement = Object.keys(replacement).join(', ');
                    } else {
                        replacement = JSON.stringify(replacement, null, multiple ? 2 : 0).replace(/"([^(")"]+)":/g, '$1:').replace(/"/g, '\'');
                    }
                    (0, _console.consoleWarn)(_props + ' ' + (multiple ? 'are' : 'is') + ' deprecated, use ' + separator + ':menu-props="' + replacement + '"' + separator + ' instead', this);
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
                } else {
                props.attach = this.attach;
            }
            return this.$createElement(_VMenu2.default, {
                props: props,
                on: {
                    input: function input(val) {
                        _this6.isMenuActive = val;
                        _this6.isFocused = val;
                    }
                },
                ref: 'menu'
            }, [this.genList()]);
        },
        genSelections: function genSelections() {
            var length = this.selectedItems.length;
            var children = new Array(length);
            var genSelection = void 0;
            if (this.$scopedSlots.selection) {
                genSelection = this.genSlotSelection;
            } else if (this.hasChips) {
                genSelection = this.genChipSelection;
            } else {
                genSelection = this.genCommaSelection;
            }
            while (length--) {
                children[length] = genSelection(this.selectedItems[length], length, length === children.length - 1);
            }
            return this.$createElement('div', {
                staticClass: 'v-select__selections'
            }, children);
        },
        genSlotSelection: function genSlotSelection(item, index) {
            return this.$scopedSlots.selection({
                parent: this,
                item: item,
                index: index,
                selected: index === this.selectedIndex,
                disabled: this.disabled || this.readonly
            });
        },
        getMenuIndex: function getMenuIndex() {
            return this.$refs.menu ? this.$refs.menu.listIndex : -1;
        },
        getDisabled: function getDisabled(item) {
            return (0, _helpers.getPropertyFromItem)(item, this.itemDisabled, false);
        },
        getText: function getText(item) {
            return (0, _helpers.getPropertyFromItem)(item, this.itemText, item);
        },
        getValue: function getValue(item) {
            return (0, _helpers.getPropertyFromItem)(item, this.itemValue, this.getText(item));
        },
        onBlur: function onBlur(e) {
            this.$emit('blur', e);
        },
        onChipInput: function onChipInput(item) {
            if (this.multiple) this.selectItem(item);else this.setValue(null);
            // If all items have been deleted,
            // open `v-menu`
            if (this.selectedItems.length === 0) {
                this.isMenuActive = true;
            }
            this.selectedIndex = -1;
        },
        onClick: function onClick() {
            if (this.isDisabled) return;
            this.isMenuActive = true;
            if (!this.isFocused) {
                this.isFocused = true;
                this.$emit('focus');
            }
        },
        onEnterDown: function onEnterDown() {
            this.onBlur();
        },
        onEscDown: function onEscDown(e) {
            e.preventDefault();
            this.isMenuActive = false;
        },
        onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode;
            // If enter, space, up, or down is pressed, open menu
            if (!this.isMenuActive && [_helpers.keyCodes.enter, _helpers.keyCodes.space, _helpers.keyCodes.up, _helpers.keyCodes.down].includes(keyCode)) this.activateMenu();
            if (this.isMenuActive && this.$refs.menu) this.$refs.menu.changeListIndex(e);
            // This should do something different
            if (keyCode === _helpers.keyCodes.enter) return this.onEnterDown(e);
            // If escape deactivate the menu
            if (keyCode === _helpers.keyCodes.esc) return this.onEscDown(e);
            // If tab - select item or close menu
            if (keyCode === _helpers.keyCodes.tab) return this.onTabDown(e);
        },
        onMouseUp: function onMouseUp(e) {
            var _this7 = this;

            var appendInner = this.$refs['append-inner'];
            // If append inner is present
            // and the target is itself
            // or inside, toggle menu
            if (this.isMenuActive && appendInner && (appendInner === e.target || appendInner.contains(e.target))) {
                this.$nextTick(function () {
                    return _this7.isMenuActive = !_this7.isMenuActive;
                });
                // If user is clicking in the container
                // and field is enclosed, activate it
            } else if (this.isEnclosed && !this.isDisabled) {
                this.isMenuActive = true;
            }
            _VTextField2.default.methods.onMouseUp.call(this, e);
        },
        onScroll: function onScroll() {
            var _this8 = this;

            if (!this.isMenuActive) {
                requestAnimationFrame(function () {
                    return _this8.content.scrollTop = 0;
                });
            } else {
                if (this.lastItem >= this.computedItems.length) return;
                var showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;
                if (showMoreItems) {
                    this.lastItem += 20;
                }
            }
        },
        onTabDown: function onTabDown(e) {
            var menuIndex = this.getMenuIndex();
            var listTile = this.$refs.menu.tiles[menuIndex];
            // An item that is selected by
            // menu-index should toggled
            if (listTile && listTile.className.indexOf('v-list__tile--highlighted') > -1 && this.isMenuActive && menuIndex > -1) {
                e.preventDefault();
                e.stopPropagation();
                listTile.click();
            } else {
                // If we make it here,
                // the user has no selected indexes
                // and is probably tabbing out
                _VTextField2.default.methods.onBlur.call(this, e);
            }
        },
        selectItem: function selectItem(item) {
            var _this9 = this;

            if (!this.multiple) {
                this.setValue(this.returnObject ? item : this.getValue(item));
                this.isMenuActive = false;
            } else {
                var internalValue = (this.internalValue || []).slice();
                var i = this.findExistingIndex(item);
                i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item);
                this.setValue(internalValue.map(function (i) {
                    return _this9.returnObject ? i : _this9.getValue(i);
                }));
                // When selecting multiple
                // adjust menu after each
                // selection
                this.$nextTick(function () {
                    _this9.$refs.menu && _this9.$refs.menu.updateDimensions();
                });
            }
        },
        setMenuIndex: function setMenuIndex(index) {
            this.$refs.menu && (this.$refs.menu.listIndex = index);
        },
        setSelectedItems: function setSelectedItems() {
            var _this10 = this;

            var selectedItems = [];
            var values = !this.multiple || !Array.isArray(this.internalValue) ? [this.internalValue] : this.internalValue;

            var _loop = function _loop(value) {
                var index = _this10.allItems.findIndex(function (v) {
                    return _this10.valueComparator(_this10.getValue(v), _this10.getValue(value));
                });
                if (index > -1) {
                    selectedItems.push(_this10.allItems[index]);
                }
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;

                    _loop(value);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.selectedItems = selectedItems;
        },
        setValue: function setValue(value) {
            this.internalValue = value;
            this.$emit('change', value);
        }
    }
};
//# sourceMappingURL=VSelect.js.map