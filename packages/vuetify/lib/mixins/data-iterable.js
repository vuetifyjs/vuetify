var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
            default: function _default() {
                return [5, 10, 25, {
                    text: '$vuetify.dataIterator.rowsPerPageAll',
                    value: -1
                }];
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
            default: function _default(val, search) {
                return val != null && typeof val !== 'boolean' && val.toString().toLowerCase().indexOf(search) !== -1;
            }
        },
        customFilter: {
            type: Function,
            default: function _default(items, search, filter) {
                search = search.toString().toLowerCase();
                if (search.trim() === '') return items;
                return items.filter(function (i) {
                    return Object.keys(i).some(function (j) {
                        return filter(i[j], search);
                    });
                });
            }
        },
        customSort: {
            type: Function,
            default: function _default(items, index, isDescending) {
                if (index === null) return items;
                return items.sort(function (a, b) {
                    var sortA = getObjectValueByPath(a, index);
                    var sortB = getObjectValueByPath(b, index);
                    if (isDescending) {
                        var _ref = [sortB, sortA];
                        sortA = _ref[0];
                        sortB = _ref[1];
                    }
                    // Check if both are numbers
                    if (!isNaN(sortA) && !isNaN(sortB)) {
                        return sortA - sortB;
                    }
                    // Check if both cannot be evaluated
                    if (sortA === null && sortB === null) {
                        return 0;
                    }

                    var _map = [sortA, sortB].map(function (s) {
                        return (s || '').toString().toLocaleLowerCase();
                    });

                    var _map2 = _slicedToArray(_map, 2);

                    sortA = _map2[0];
                    sortB = _map2[1];

                    if (sortA > sortB) return 1;
                    if (sortA < sortB) return -1;
                    return 0;
                });
            }
        },
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        items: {
            type: Array,
            required: true,
            default: function _default() {
                return [];
            }
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
            default: function _default() {}
        }
    },
    data: function data() {
        return {
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
        };
    },
    computed: {
        computedPagination: function computedPagination() {
            return this.hasPagination ? this.pagination : this.defaultPagination;
        },
        computedRowsPerPageItems: function computedRowsPerPageItems() {
            var _this = this;

            return this.rowsPerPageItems.map(function (item) {
                return isObject(item) ? Object.assign({}, item, {
                    text: _this.$vuetify.t(item.text)
                }) : { value: item, text: Number(item).toLocaleString(_this.$vuetify.lang.current) };
            });
        },
        hasPagination: function hasPagination() {
            var pagination = this.pagination || {};
            return Object.keys(pagination).length > 0;
        },
        hasSelectAll: function hasSelectAll() {
            return this.selectAll !== undefined && this.selectAll !== false;
        },
        itemsLength: function itemsLength() {
            if (this.hasSearch) return this.searchLength;
            return this.totalItems || this.items.length;
        },
        indeterminate: function indeterminate() {
            return this.hasSelectAll && this.someItems && !this.everyItem;
        },
        everyItem: function everyItem() {
            var _this2 = this;

            return this.filteredItems.length && this.filteredItems.every(function (i) {
                return _this2.isSelected(i);
            });
        },
        someItems: function someItems() {
            var _this3 = this;

            return this.filteredItems.some(function (i) {
                return _this3.isSelected(i);
            });
        },
        getPage: function getPage() {
            var rowsPerPage = this.computedPagination.rowsPerPage;

            return rowsPerPage === Object(rowsPerPage) ? rowsPerPage.value : rowsPerPage;
        },
        pageStart: function pageStart() {
            return this.getPage === -1 ? 0 : (this.computedPagination.page - 1) * this.getPage;
        },
        pageStop: function pageStop() {
            return this.getPage === -1 ? this.itemsLength : this.computedPagination.page * this.getPage;
        },
        filteredItems: function filteredItems() {
            return this.filteredItemsImpl();
        },
        selected: function selected() {
            var selected = {};
            for (var index = 0; index < this.value.length; index++) {
                var key = getObjectValueByPath(this.value[index], this.itemKey);
                selected[key] = true;
            }
            return selected;
        },
        hasSearch: function hasSearch() {
            return this.search != null;
        }
    },
    watch: {
        search: function search() {
            var _this4 = this;

            this.$nextTick(function () {
                _this4.updatePagination({ page: 1, totalItems: _this4.itemsLength });
            });
        },

        'computedPagination.sortBy': 'resetPagination',
        'computedPagination.descending': 'resetPagination'
    },
    methods: {
        initPagination: function initPagination() {
            if (!this.rowsPerPageItems.length) {
                consoleWarn('The prop \'rows-per-page-items\' can not be empty', this);
            } else {
                this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0];
            }
            this.defaultPagination.totalItems = this.items.length;
            this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination));
        },
        updatePagination: function updatePagination(val) {
            var pagination = this.hasPagination ? this.pagination : this.defaultPagination;
            var updatedPagination = Object.assign({}, pagination, val);
            this.$emit('update:pagination', updatedPagination);
            if (!this.hasPagination) {
                this.defaultPagination = updatedPagination;
            }
        },
        isSelected: function isSelected(item) {
            return this.selected[getObjectValueByPath(item, this.itemKey)];
        },
        isExpanded: function isExpanded(item) {
            return this.expanded[getObjectValueByPath(item, this.itemKey)];
        },
        filteredItemsImpl: function filteredItemsImpl() {
            if (this.totalItems) return this.items;
            var items = this.items.slice();
            if (this.hasSearch) {
                for (var _len = arguments.length, additionalFilterArgs = Array(_len), _key = 0; _key < _len; _key++) {
                    additionalFilterArgs[_key] = arguments[_key];
                }

                items = this.customFilter.apply(this, [items, this.search, this.filter].concat(_toConsumableArray(additionalFilterArgs)));
                this.searchLength = items.length;
            }
            items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending);
            return this.hideActions && !this.hasPagination ? items : items.slice(this.pageStart, this.pageStop);
        },
        resetPagination: function resetPagination() {
            this.computedPagination.page !== 1 && this.updatePagination({ page: 1 });
        },
        sort: function sort(index) {
            var _computedPagination = this.computedPagination,
                sortBy = _computedPagination.sortBy,
                descending = _computedPagination.descending;

            if (sortBy === null) {
                this.updatePagination({ sortBy: index, descending: false });
            } else if (sortBy === index && !descending) {
                this.updatePagination({ descending: true });
            } else if (sortBy !== index) {
                this.updatePagination({ sortBy: index, descending: false });
            } else if (!this.mustSort) {
                this.updatePagination({ sortBy: null, descending: null });
            } else {
                this.updatePagination({ sortBy: index, descending: false });
            }
        },
        toggle: function toggle(value) {
            var _this5 = this;

            var selected = Object.assign({}, this.selected);
            for (var index = 0; index < this.filteredItems.length; index++) {
                var key = getObjectValueByPath(this.filteredItems[index], this.itemKey);
                selected[key] = value;
            }
            this.$emit('input', this.items.filter(function (i) {
                var key = getObjectValueByPath(i, _this5.itemKey);
                return selected[key];
            }));
        },
        createProps: function createProps(item, index) {
            var _this6 = this;

            var props = { item: item, index: index };
            var keyProp = this.itemKey;
            var itemKey = getObjectValueByPath(item, keyProp);
            Object.defineProperty(props, 'selected', {
                get: function get() {
                    return _this6.selected[itemKey];
                },
                set: function set(value) {
                    if (itemKey == null) {
                        consoleWarn('"' + keyProp + '" attribute must be defined for item', _this6);
                    }
                    var selected = _this6.value.slice();
                    if (value) selected.push(item);else selected = selected.filter(function (i) {
                        return getObjectValueByPath(i, keyProp) !== itemKey;
                    });
                    _this6.$emit('input', selected);
                }
            });
            Object.defineProperty(props, 'expanded', {
                get: function get() {
                    return _this6.expanded[itemKey];
                },
                set: function set(value) {
                    if (itemKey == null) {
                        consoleWarn('"' + keyProp + '" attribute must be defined for item', _this6);
                    }
                    if (!_this6.expand) {
                        for (var key in _this6.expanded) {
                            _this6.expanded.hasOwnProperty(key) && _this6.$set(_this6.expanded, key, false);
                        }
                    }
                    _this6.$set(_this6.expanded, itemKey, value);
                }
            });
            return props;
        },
        genItems: function genItems() {
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
        genPrevIcon: function genPrevIcon() {
            var _this7 = this;

            return this.$createElement(VBtn, {
                props: {
                    disabled: this.computedPagination.page === 1,
                    icon: true,
                    flat: true
                },
                on: {
                    click: function click() {
                        var page = _this7.computedPagination.page;
                        _this7.updatePagination({ page: page - 1 });
                    }
                },
                attrs: {
                    'aria-label': this.$vuetify.t('$vuetify.dataIterator.prevPage')
                }
            }, [this.$createElement(VIcon, this.$vuetify.rtl ? this.nextIcon : this.prevIcon)]);
        },
        genNextIcon: function genNextIcon() {
            var _this8 = this;

            var pagination = this.computedPagination;
            var disabled = pagination.rowsPerPage < 0 || pagination.page * pagination.rowsPerPage >= this.itemsLength || this.pageStop < 0;
            return this.$createElement(VBtn, {
                props: {
                    disabled: disabled,
                    icon: true,
                    flat: true
                },
                on: {
                    click: function click() {
                        var page = _this8.computedPagination.page;
                        _this8.updatePagination({ page: page + 1 });
                    }
                },
                attrs: {
                    'aria-label': this.$vuetify.t('$vuetify.dataIterator.nextPage')
                }
            }, [this.$createElement(VIcon, this.$vuetify.rtl ? this.prevIcon : this.nextIcon)]);
        },
        genSelect: function genSelect() {
            var _this9 = this;

            return this.$createElement('div', {
                'class': this.actionsSelectClasses
            }, [this.$vuetify.t(this.rowsPerPageText), this.$createElement(VSelect, {
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
                    input: function input(val) {
                        _this9.updatePagination({
                            page: 1,
                            rowsPerPage: val
                        });
                    }
                }
            })]);
        },
        genPagination: function genPagination() {
            var _this10 = this;

            var pagination = '–';
            if (this.itemsLength) {
                var _$vuetify;

                var stop = this.itemsLength < this.pageStop || this.pageStop < 0 ? this.itemsLength : this.pageStop;
                pagination = this.$scopedSlots.pageText ? this.$scopedSlots.pageText({
                    pageStart: this.pageStart + 1,
                    pageStop: stop,
                    itemsLength: this.itemsLength
                }) : (_$vuetify = this.$vuetify).t.apply(_$vuetify, ['$vuetify.dataIterator.pageText'].concat(_toConsumableArray([this.pageStart + 1, stop, this.itemsLength].map(function (n) {
                    return Number(n).toLocaleString(_this10.$vuetify.lang.current);
                }))));
            }
            return this.$createElement('div', {
                'class': this.actionsPaginationClasses
            }, [pagination]);
        },
        genActions: function genActions() {
            var rangeControls = this.$createElement('div', {
                'class': this.actionsRangeControlsClasses
            }, [this.genPagination(), this.genPrevIcon(), this.genNextIcon()]);
            return [this.$createElement('div', {
                'class': this.actionsClasses
            }, [this.$slots['actions-prepend'] ? this.$createElement('div', {}, this.$slots['actions-prepend']) : null, this.rowsPerPageItems.length > 1 ? this.genSelect() : null, rangeControls, this.$slots['actions-append'] ? this.$createElement('div', {}, this.$slots['actions-append']) : null])];
        }
    }
};
//# sourceMappingURL=data-iterable.js.map