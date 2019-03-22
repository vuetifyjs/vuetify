var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
import VBtn from '../components/VBtn';
import VIcon from '../components/VIcon';
import VSelect from '../components/VSelect';
import Filterable from './filterable';
import Themeable from './themeable';
import Loadable from './loadable';
import { getObjectValueByPath, isObject } from '../util/helpers';
import { consoleWarn } from '../util/console';
/**
 * DataIterable
 *
 * @mixin
 *
 * Base behavior for data table and data iterator
 * providing selection, pagination, sorting and filtering.
 *
 */
/* @vue/component */
export default {
    name: 'data-iterable',
    mixins: [Filterable, Loadable, Themeable],
    props: {
        expand: Boolean,
        hideActions: Boolean,
        disableInitialSort: Boolean,
        mustSort: Boolean,
        noResultsText: {
            type: String,
            default: '$vuetify.dataIterator.noResultsText'
        },
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        rowsPerPageItems: {
            type: Array,
            default: function () {
                return [
                    5,
                    10,
                    25,
                    {
                        text: '$vuetify.dataIterator.rowsPerPageAll',
                        value: -1
                    }
                ];
            }
        },
        rowsPerPageText: {
            type: String,
            default: '$vuetify.dataIterator.rowsPerPageText'
        },
        selectAll: [Boolean, String],
        search: {
            required: false
        },
        filter: {
            type: Function,
            default: function (val, search) {
                return val != null &&
                    typeof val !== 'boolean' &&
                    val.toString().toLowerCase().indexOf(search) !== -1;
            }
        },
        customFilter: {
            type: Function,
            default: function (items, search, filter) {
                search = search.toString().toLowerCase();
                if (search.trim() === '')
                    return items;
                return items.filter(function (i) { return (Object.keys(i).some(function (j) { return filter(i[j], search); })); });
            }
        },
        customSort: {
            type: Function,
            default: function (items, index, isDescending) {
                if (index === null)
                    return items;
                return items.sort(function (a, b) {
                    var _a, _b;
                    var sortA = getObjectValueByPath(a, index);
                    var sortB = getObjectValueByPath(b, index);
                    if (isDescending) {
                        _a = __read([sortB, sortA], 2), sortA = _a[0], sortB = _a[1];
                    }
                    // Check if both are numbers
                    if (!isNaN(sortA) && !isNaN(sortB)) {
                        return sortA - sortB;
                    }
                    // Check if both cannot be evaluated
                    if (sortA === null && sortB === null) {
                        return 0;
                    }
                    _b = __read([sortA, sortB]
                        .map(function (s) { return ((s || '').toString().toLocaleLowerCase()); }), 2), sortA = _b[0], sortB = _b[1];
                    if (sortA > sortB)
                        return 1;
                    if (sortA < sortB)
                        return -1;
                    return 0;
                });
            }
        },
        value: {
            type: Array,
            default: function () { return []; }
        },
        items: {
            type: Array,
            required: true,
            default: function () { return []; }
        },
        totalItems: {
            type: Number,
            default: null
        },
        itemKey: {
            type: String,
            default: 'id'
        },
        pagination: {
            type: Object,
            default: function () { }
        }
    },
    data: function () {
        return ({
            searchLength: 0,
            defaultPagination: {
                descending: false,
                page: 1,
                rowsPerPage: 5,
                sortBy: null,
                totalItems: 0
            },
            expanded: {},
            actionsClasses: 'v-data-iterator__actions',
            actionsRangeControlsClasses: 'v-data-iterator__actions__range-controls',
            actionsSelectClasses: 'v-data-iterator__actions__select',
            actionsPaginationClasses: 'v-data-iterator__actions__pagination'
        });
    },
    computed: {
        computedPagination: function () {
            return this.hasPagination
                ? this.pagination
                : this.defaultPagination;
        },
        computedRowsPerPageItems: function () {
            var _this = this;
            return this.rowsPerPageItems.map(function (item) {
                return isObject(item)
                    ? Object.assign({}, item, {
                        text: _this.$vuetify.t(item.text)
                    })
                    : { value: item, text: Number(item).toLocaleString(_this.$vuetify.lang.current) };
            });
        },
        hasPagination: function () {
            var pagination = this.pagination || {};
            return Object.keys(pagination).length > 0;
        },
        hasSelectAll: function () {
            return this.selectAll !== undefined && this.selectAll !== false;
        },
        itemsLength: function () {
            if (this.hasSearch)
                return this.searchLength;
            return this.totalItems || this.items.length;
        },
        indeterminate: function () {
            return this.hasSelectAll && this.someItems && !this.everyItem;
        },
        everyItem: function () {
            var _this = this;
            return this.filteredItems.length &&
                this.filteredItems.every(function (i) { return _this.isSelected(i); });
        },
        someItems: function () {
            var _this = this;
            return this.filteredItems.some(function (i) { return _this.isSelected(i); });
        },
        getPage: function () {
            var rowsPerPage = this.computedPagination.rowsPerPage;
            return rowsPerPage === Object(rowsPerPage)
                ? rowsPerPage.value
                : rowsPerPage;
        },
        pageStart: function () {
            return this.getPage === -1
                ? 0
                : (this.computedPagination.page - 1) * this.getPage;
        },
        pageStop: function () {
            return this.getPage === -1
                ? this.itemsLength
                : this.computedPagination.page * this.getPage;
        },
        filteredItems: function () {
            return this.filteredItemsImpl();
        },
        selected: function () {
            var selected = {};
            for (var index = 0; index < this.value.length; index++) {
                var key = getObjectValueByPath(this.value[index], this.itemKey);
                selected[key] = true;
            }
            return selected;
        },
        hasSearch: function () {
            return this.search != null;
        }
    },
    watch: {
        items: function () {
            var _this = this;
            if (this.pageStart >= this.itemsLength) {
                this.resetPagination();
            }
            var newItemKeys = new Set(this.items.map(function (item) { return getObjectValueByPath(item, _this.itemKey); }));
            var selection = this.value.filter(function (item) { return newItemKeys.has(getObjectValueByPath(item, _this.itemKey)); });
            if (selection.length !== this.value.length) {
                this.$emit('input', selection);
            }
        },
        search: function () {
            var _this = this;
            this.$nextTick(function () {
                _this.updatePagination({ page: 1, totalItems: _this.itemsLength });
            });
        },
        'computedPagination.sortBy': 'resetPagination',
        'computedPagination.descending': 'resetPagination'
    },
    methods: {
        initPagination: function () {
            if (!this.rowsPerPageItems.length) {
                consoleWarn("The prop 'rows-per-page-items' can not be empty", this);
            }
            else {
                this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0];
            }
            this.defaultPagination.totalItems = this.items.length;
            this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination));
        },
        updatePagination: function (val) {
            var pagination = this.hasPagination
                ? this.pagination
                : this.defaultPagination;
            var updatedPagination = Object.assign({}, pagination, val);
            this.$emit('update:pagination', updatedPagination);
            if (!this.hasPagination) {
                this.defaultPagination = updatedPagination;
            }
        },
        isSelected: function (item) {
            return this.selected[getObjectValueByPath(item, this.itemKey)];
        },
        isExpanded: function (item) {
            return this.expanded[getObjectValueByPath(item, this.itemKey)];
        },
        filteredItemsImpl: function () {
            var additionalFilterArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                additionalFilterArgs[_i] = arguments[_i];
            }
            if (this.totalItems)
                return this.items;
            var items = this.items.slice();
            if (this.hasSearch) {
                items = this.customFilter.apply(this, __spread([items, this.search, this.filter], additionalFilterArgs));
                this.searchLength = items.length;
            }
            items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending);
            return this.hideActions &&
                !this.hasPagination
                ? items
                : items.slice(this.pageStart, this.pageStop);
        },
        resetPagination: function () {
            this.computedPagination.page !== 1 &&
                this.updatePagination({ page: 1 });
        },
        sort: function (index) {
            var _a = this.computedPagination, sortBy = _a.sortBy, descending = _a.descending;
            if (sortBy === null) {
                this.updatePagination({ sortBy: index, descending: false });
            }
            else if (sortBy === index && !descending) {
                this.updatePagination({ descending: true });
            }
            else if (sortBy !== index) {
                this.updatePagination({ sortBy: index, descending: false });
            }
            else if (!this.mustSort) {
                this.updatePagination({ sortBy: null, descending: null });
            }
            else {
                this.updatePagination({ sortBy: index, descending: false });
            }
        },
        toggle: function (value) {
            var _this = this;
            var selected = Object.assign({}, this.selected);
            for (var index = 0; index < this.filteredItems.length; index++) {
                var key = getObjectValueByPath(this.filteredItems[index], this.itemKey);
                selected[key] = value;
            }
            this.$emit('input', this.items.filter(function (i) {
                var key = getObjectValueByPath(i, _this.itemKey);
                return selected[key];
            }));
        },
        createProps: function (item, index) {
            var _this = this;
            var props = { item: item, index: index };
            var keyProp = this.itemKey;
            var itemKey = getObjectValueByPath(item, keyProp);
            Object.defineProperty(props, 'selected', {
                get: function () { return _this.selected[itemKey]; },
                set: function (value) {
                    if (itemKey == null) {
                        consoleWarn("\"" + keyProp + "\" attribute must be defined for item", _this);
                    }
                    var selected = _this.value.slice();
                    if (value)
                        selected.push(item);
                    else
                        selected = selected.filter(function (i) { return getObjectValueByPath(i, keyProp) !== itemKey; });
                    _this.$emit('input', selected);
                }
            });
            Object.defineProperty(props, 'expanded', {
                get: function () { return _this.expanded[itemKey]; },
                set: function (value) {
                    if (itemKey == null) {
                        consoleWarn("\"" + keyProp + "\" attribute must be defined for item", _this);
                    }
                    if (!_this.expand) {
                        for (var key in _this.expanded) {
                            _this.expanded.hasOwnProperty(key) && _this.$set(_this.expanded, key, false);
                        }
                    }
                    _this.$set(_this.expanded, itemKey, value);
                }
            });
            return props;
        },
        genItems: function () {
            if (!this.itemsLength && !this.items.length) {
                var noData = this.$slots['no-data'] || this.$vuetify.t(this.noDataText);
                return [this.genEmptyItems(noData)];
            }
            if (!this.filteredItems.length) {
                var noResults = this.$slots['no-results'] || this.$vuetify.t(this.noResultsText);
                return [this.genEmptyItems(noResults)];
            }
            return this.genFilteredItems();
        },
        genPrevIcon: function () {
            var _this = this;
            return this.$createElement(VBtn, {
                props: {
                    disabled: this.computedPagination.page === 1,
                    icon: true,
                    flat: true
                },
                on: {
                    click: function () {
                        var page = _this.computedPagination.page;
                        _this.updatePagination({ page: page - 1 });
                    }
                },
                attrs: {
                    'aria-label': this.$vuetify.t('$vuetify.dataIterator.prevPage')
                }
            }, [this.$createElement(VIcon, this.$vuetify.rtl ? this.nextIcon : this.prevIcon)]);
        },
        genNextIcon: function () {
            var _this = this;
            var pagination = this.computedPagination;
            var disabled = pagination.rowsPerPage < 0 ||
                pagination.page * pagination.rowsPerPage >= this.itemsLength ||
                this.pageStop < 0;
            return this.$createElement(VBtn, {
                props: {
                    disabled: disabled,
                    icon: true,
                    flat: true
                },
                on: {
                    click: function () {
                        var page = _this.computedPagination.page;
                        _this.updatePagination({ page: page + 1 });
                    }
                },
                attrs: {
                    'aria-label': this.$vuetify.t('$vuetify.dataIterator.nextPage')
                }
            }, [this.$createElement(VIcon, this.$vuetify.rtl ? this.prevIcon : this.nextIcon)]);
        },
        genSelect: function () {
            var _this = this;
            return this.$createElement('div', {
                'class': this.actionsSelectClasses
            }, [
                this.$vuetify.t(this.rowsPerPageText),
                this.$createElement(VSelect, {
                    attrs: {
                        'aria-label': this.$vuetify.t(this.rowsPerPageText)
                    },
                    props: {
                        items: this.computedRowsPerPageItems,
                        value: this.computedPagination.rowsPerPage,
                        hideDetails: true,
                        menuProps: {
                            auto: true,
                            dark: this.dark,
                            light: this.light,
                            minWidth: '75px'
                        }
                    },
                    on: {
                        input: function (val) {
                            _this.updatePagination({
                                page: 1,
                                rowsPerPage: val
                            });
                        }
                    }
                })
            ]);
        },
        genPagination: function () {
            var _this = this;
            var _a;
            var pagination = '–';
            if (this.itemsLength) {
                var stop_1 = this.itemsLength < this.pageStop || this.pageStop < 0
                    ? this.itemsLength
                    : this.pageStop;
                pagination = this.$scopedSlots.pageText
                    ? this.$scopedSlots.pageText({
                        pageStart: this.pageStart + 1,
                        pageStop: stop_1,
                        itemsLength: this.itemsLength
                    })
                    : (_a = this.$vuetify).t.apply(_a, __spread(['$vuetify.dataIterator.pageText'], ([this.pageStart + 1, stop_1, this.itemsLength].map(function (n) { return Number(n).toLocaleString(_this.$vuetify.lang.current); }))));
            }
            return this.$createElement('div', {
                'class': this.actionsPaginationClasses
            }, [pagination]);
        },
        genActions: function () {
            var rangeControls = this.$createElement('div', {
                'class': this.actionsRangeControlsClasses
            }, [
                this.genPagination(),
                this.genPrevIcon(),
                this.genNextIcon()
            ]);
            return [this.$createElement('div', {
                    'class': this.actionsClasses
                }, [
                    this.$slots['actions-prepend'] ? this.$createElement('div', {}, this.$slots['actions-prepend']) : null,
                    this.rowsPerPageItems.length > 1 ? this.genSelect() : null,
                    rangeControls,
                    this.$slots['actions-append'] ? this.$createElement('div', {}, this.$slots['actions-append']) : null
                ])];
        }
    }
};
//# sourceMappingURL=data-iterable.js.map
//# sourceMappingURL=data-iterable.js.map
//# sourceMappingURL=data-iterable.js.map
//# sourceMappingURL=data-iterable.js.map