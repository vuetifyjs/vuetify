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
            default() {
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
            default: (val, search) => {
                return val != null &&
                    typeof val !== 'boolean' &&
                    val.toString().toLowerCase().indexOf(search) !== -1;
            }
        },
        customFilter: {
            type: Function,
            default: (items, search, filter) => {
                search = search.toString().toLowerCase();
                if (search.trim() === '')
                    return items;
                return items.filter(i => (Object.keys(i).some(j => filter(i[j], search))));
            }
        },
        customSort: {
            type: Function,
            default: (items, index, isDescending) => {
                if (index === null)
                    return items;
                return items.sort((a, b) => {
                    let sortA = getObjectValueByPath(a, index);
                    let sortB = getObjectValueByPath(b, index);
                    if (isDescending) {
                        [sortA, sortB] = [sortB, sortA];
                    }
                    // Check if both are numbers
                    if (!isNaN(sortA) && !isNaN(sortB)) {
                        return sortA - sortB;
                    }
                    // Check if both cannot be evaluated
                    if (sortA === null && sortB === null) {
                        return 0;
                    }
                    [sortA, sortB] = [sortA, sortB]
                        .map(s => ((s || '').toString().toLocaleLowerCase()));
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
            default: () => []
        },
        items: {
            type: Array,
            required: true,
            default: () => []
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
            default: () => { }
        }
    },
    data: () => ({
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
    }),
    computed: {
        computedPagination() {
            return this.hasPagination
                ? this.pagination
                : this.defaultPagination;
        },
        computedRowsPerPageItems() {
            return this.rowsPerPageItems.map(item => {
                return isObject(item)
                    ? Object.assign({}, item, {
                        text: this.$vuetify.t(item.text)
                    })
                    : item;
            });
        },
        hasPagination() {
            const pagination = this.pagination || {};
            return Object.keys(pagination).length > 0;
        },
        hasSelectAll() {
            return this.selectAll !== undefined && this.selectAll !== false;
        },
        itemsLength() {
            if (this.hasSearch)
                return this.searchLength;
            return this.totalItems || this.items.length;
        },
        indeterminate() {
            return this.hasSelectAll && this.someItems && !this.everyItem;
        },
        everyItem() {
            return this.filteredItems.length &&
                this.filteredItems.every(i => this.isSelected(i));
        },
        someItems() {
            return this.filteredItems.some(i => this.isSelected(i));
        },
        getPage() {
            const { rowsPerPage } = this.computedPagination;
            return rowsPerPage === Object(rowsPerPage)
                ? rowsPerPage.value
                : rowsPerPage;
        },
        pageStart() {
            return this.getPage === -1
                ? 0
                : (this.computedPagination.page - 1) * this.getPage;
        },
        pageStop() {
            return this.getPage === -1
                ? this.itemsLength
                : this.computedPagination.page * this.getPage;
        },
        filteredItems() {
            return this.filteredItemsImpl();
        },
        selected() {
            const selected = {};
            for (let index = 0; index < this.value.length; index++) {
                const key = getObjectValueByPath(this.value[index], this.itemKey);
                selected[key] = true;
            }
            return selected;
        },
        hasSearch() {
            return this.search != null;
        }
    },
    watch: {
        search() {
            this.$nextTick(() => {
                this.updatePagination({ page: 1, totalItems: this.itemsLength });
            });
        },
        'computedPagination.sortBy': 'resetPagination',
        'computedPagination.descending': 'resetPagination'
    },
    methods: {
        initPagination() {
            if (!this.rowsPerPageItems.length) {
                consoleWarn(`The prop 'rows-per-page-items' can not be empty`, this);
            }
            else {
                this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0];
            }
            this.defaultPagination.totalItems = this.items.length;
            this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination));
        },
        updatePagination(val) {
            const pagination = this.hasPagination
                ? this.pagination
                : this.defaultPagination;
            const updatedPagination = Object.assign({}, pagination, val);
            this.$emit('update:pagination', updatedPagination);
            if (!this.hasPagination) {
                this.defaultPagination = updatedPagination;
            }
        },
        isSelected(item) {
            return this.selected[getObjectValueByPath(item, this.itemKey)];
        },
        isExpanded(item) {
            return this.expanded[getObjectValueByPath(item, this.itemKey)];
        },
        filteredItemsImpl(...additionalFilterArgs) {
            if (this.totalItems)
                return this.items;
            let items = this.items.slice();
            if (this.hasSearch) {
                items = this.customFilter(items, this.search, this.filter, ...additionalFilterArgs);
                this.searchLength = items.length;
            }
            items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending);
            return this.hideActions &&
                !this.hasPagination
                ? items
                : items.slice(this.pageStart, this.pageStop);
        },
        resetPagination() {
            this.computedPagination.page !== 1 &&
                this.updatePagination({ page: 1 });
        },
        sort(index) {
            const { sortBy, descending } = this.computedPagination;
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
        toggle(value) {
            const selected = Object.assign({}, this.selected);
            for (let index = 0; index < this.filteredItems.length; index++) {
                const key = getObjectValueByPath(this.filteredItems[index], this.itemKey);
                selected[key] = value;
            }
            this.$emit('input', this.items.filter(i => {
                const key = getObjectValueByPath(i, this.itemKey);
                return selected[key];
            }));
        },
        createProps(item, index) {
            const props = { item, index };
            const keyProp = this.itemKey;
            const itemKey = getObjectValueByPath(item, keyProp);
            Object.defineProperty(props, 'selected', {
                get: () => this.selected[itemKey],
                set: value => {
                    if (itemKey == null) {
                        consoleWarn(`"${keyProp}" attribute must be defined for item`, this);
                    }
                    let selected = this.value.slice();
                    if (value)
                        selected.push(item);
                    else
                        selected = selected.filter(i => getObjectValueByPath(i, keyProp) !== itemKey);
                    this.$emit('input', selected);
                }
            });
            Object.defineProperty(props, 'expanded', {
                get: () => this.expanded[itemKey],
                set: value => {
                    if (itemKey == null) {
                        consoleWarn(`"${keyProp}" attribute must be defined for item`, this);
                    }
                    if (!this.expand) {
                        for (const key in this.expanded) {
                            this.expanded.hasOwnProperty(key) && this.$set(this.expanded, key, false);
                        }
                    }
                    this.$set(this.expanded, itemKey, value);
                }
            });
            return props;
        },
        genItems() {
            if (!this.itemsLength && !this.items.length) {
                const noData = this.$slots['no-data'] || this.$vuetify.t(this.noDataText);
                return [this.genEmptyItems(noData)];
            }
            if (!this.filteredItems.length) {
                const noResults = this.$slots['no-results'] || this.$vuetify.t(this.noResultsText);
                return [this.genEmptyItems(noResults)];
            }
            return this.genFilteredItems();
        },
        genPrevIcon() {
            return this.$createElement(VBtn, {
                props: {
                    disabled: this.computedPagination.page === 1,
                    icon: true,
                    flat: true
                },
                on: {
                    click: () => {
                        const page = this.computedPagination.page;
                        this.updatePagination({ page: page - 1 });
                    }
                },
                attrs: {
                    'aria-label': this.$vuetify.t('$vuetify.dataIterator.prevPage')
                }
            }, [this.$createElement(VIcon, this.$vuetify.rtl ? this.nextIcon : this.prevIcon)]);
        },
        genNextIcon() {
            const pagination = this.computedPagination;
            const disabled = pagination.rowsPerPage < 0 ||
                pagination.page * pagination.rowsPerPage >= this.itemsLength ||
                this.pageStop < 0;
            return this.$createElement(VBtn, {
                props: {
                    disabled,
                    icon: true,
                    flat: true
                },
                on: {
                    click: () => {
                        const page = this.computedPagination.page;
                        this.updatePagination({ page: page + 1 });
                    }
                },
                attrs: {
                    'aria-label': this.$vuetify.t('$vuetify.dataIterator.nextPage')
                }
            }, [this.$createElement(VIcon, this.$vuetify.rtl ? this.prevIcon : this.nextIcon)]);
        },
        genSelect() {
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
                        auto: true,
                        minWidth: '75px'
                    },
                    on: {
                        input: val => {
                            this.updatePagination({
                                page: 1,
                                rowsPerPage: val
                            });
                        }
                    }
                })
            ]);
        },
        genPagination() {
            let pagination = '–';
            if (this.itemsLength) {
                const stop = this.itemsLength < this.pageStop || this.pageStop < 0
                    ? this.itemsLength
                    : this.pageStop;
                pagination = this.$scopedSlots.pageText
                    ? this.$scopedSlots.pageText({
                        pageStart: this.pageStart + 1,
                        pageStop: stop,
                        itemsLength: this.itemsLength
                    })
                    : this.$vuetify.t('$vuetify.dataIterator.pageText', this.pageStart + 1, stop, this.itemsLength);
            }
            return this.$createElement('div', {
                'class': this.actionsPaginationClasses
            }, [pagination]);
        },
        genActions() {
            const rangeControls = this.$createElement('div', {
                'class': this.actionsRangeControlsClasses
            }, [
                this.genPagination(),
                this.genPrevIcon(),
                this.genNextIcon()
            ]);
            return [this.$createElement('div', {
                    'class': this.actionsClasses
                }, [
                    this.rowsPerPageItems.length > 1 ? this.genSelect() : null,
                    rangeControls
                ])];
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1pdGVyYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvZGF0YS1pdGVyYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQTtBQUNyQyxPQUFPLEtBQUssTUFBTSxxQkFBcUIsQ0FBQTtBQUN2QyxPQUFPLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQTtBQUUzQyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUE7QUFDckMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFBO0FBQ25DLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQTtBQUVqQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRTdDOzs7Ozs7OztHQVFHO0FBQ0gsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsZUFBZTtJQUVyQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztJQUV6QyxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsT0FBTztRQUNmLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLGtCQUFrQixFQUFFLE9BQU87UUFDM0IsUUFBUSxFQUFFLE9BQU87UUFDakIsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUscUNBQXFDO1NBQy9DO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUscUJBQXFCO1NBQy9CO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUscUJBQXFCO1NBQy9CO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPO2dCQUNMLE9BQU87b0JBQ0wsQ0FBQztvQkFDRCxFQUFFO29C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R0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDMUQsYUFBYTtpQkFDZCxDQUFDLENBQUMsQ0FBQTtRQUNMLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVkJ0biBmcm9tICcuLi9jb21wb25lbnRzL1ZCdG4nXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vY29tcG9uZW50cy9WSWNvbidcbmltcG9ydCBWU2VsZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvVlNlbGVjdCdcblxuaW1wb3J0IEZpbHRlcmFibGUgZnJvbSAnLi9maWx0ZXJhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuL3RoZW1lYWJsZSdcbmltcG9ydCBMb2FkYWJsZSBmcm9tICcuL2xvYWRhYmxlJ1xuXG5pbXBvcnQgeyBnZXRPYmplY3RWYWx1ZUJ5UGF0aCwgaXNPYmplY3QgfSBmcm9tICcuLi91dGlsL2hlbHBlcnMnXG5pbXBvcnQgeyBjb25zb2xlV2FybiB9IGZyb20gJy4uL3V0aWwvY29uc29sZSdcblxuLyoqXG4gKiBEYXRhSXRlcmFibGVcbiAqXG4gKiBAbWl4aW5cbiAqXG4gKiBCYXNlIGJlaGF2aW9yIGZvciBkYXRhIHRhYmxlIGFuZCBkYXRhIGl0ZXJhdG9yXG4gKiBwcm92aWRpbmcgc2VsZWN0aW9uLCBwYWdpbmF0aW9uLCBzb3J0aW5nIGFuZCBmaWx0ZXJpbmcuXG4gKlxuICovXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZGF0YS1pdGVyYWJsZScsXG5cbiAgbWl4aW5zOiBbRmlsdGVyYWJsZSwgTG9hZGFibGUsIFRoZW1lYWJsZV0sXG5cbiAgcHJvcHM6IHtcbiAgICBleHBhbmQ6IEJvb2xlYW4sXG4gICAgaGlkZUFjdGlvbnM6IEJvb2xlYW4sXG4gICAgZGlzYWJsZUluaXRpYWxTb3J0OiBCb29sZWFuLFxuICAgIG11c3RTb3J0OiBCb29sZWFuLFxuICAgIG5vUmVzdWx0c1RleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5kYXRhSXRlcmF0b3Iubm9SZXN1bHRzVGV4dCdcbiAgICB9LFxuICAgIG5leHRJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMubmV4dCdcbiAgICB9LFxuICAgIHByZXZJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMucHJldidcbiAgICB9LFxuICAgIHJvd3NQZXJQYWdlSXRlbXM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdCAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgNSxcbiAgICAgICAgICAxMCxcbiAgICAgICAgICAyNSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnJHZ1ZXRpZnkuZGF0YUl0ZXJhdG9yLnJvd3NQZXJQYWdlQWxsJyxcbiAgICAgICAgICAgIHZhbHVlOiAtMVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0sXG4gICAgcm93c1BlclBhZ2VUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuZGF0YUl0ZXJhdG9yLnJvd3NQZXJQYWdlVGV4dCdcbiAgICB9LFxuICAgIHNlbGVjdEFsbDogW0Jvb2xlYW4sIFN0cmluZ10sXG4gICAgc2VhcmNoOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2VcbiAgICB9LFxuICAgIGZpbHRlcjoge1xuICAgICAgdHlwZTogRnVuY3Rpb24sXG4gICAgICBkZWZhdWx0OiAodmFsLCBzZWFyY2gpID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbCAhPSBudWxsICYmXG4gICAgICAgICAgdHlwZW9mIHZhbCAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgICAgdmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgIT09IC0xXG4gICAgICB9XG4gICAgfSxcbiAgICBjdXN0b21GaWx0ZXI6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogKGl0ZW1zLCBzZWFyY2gsIGZpbHRlcikgPT4ge1xuICAgICAgICBzZWFyY2ggPSBzZWFyY2gudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGlmIChzZWFyY2gudHJpbSgpID09PSAnJykgcmV0dXJuIGl0ZW1zXG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlcihpID0+IChcbiAgICAgICAgICBPYmplY3Qua2V5cyhpKS5zb21lKGogPT4gZmlsdGVyKGlbal0sIHNlYXJjaCkpXG4gICAgICAgICkpXG4gICAgICB9XG4gICAgfSxcbiAgICBjdXN0b21Tb3J0OiB7XG4gICAgICB0eXBlOiBGdW5jdGlvbixcbiAgICAgIGRlZmF1bHQ6IChpdGVtcywgaW5kZXgsIGlzRGVzY2VuZGluZykgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwpIHJldHVybiBpdGVtc1xuXG4gICAgICAgIHJldHVybiBpdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgbGV0IHNvcnRBID0gZ2V0T2JqZWN0VmFsdWVCeVBhdGgoYSwgaW5kZXgpXG4gICAgICAgICAgbGV0IHNvcnRCID0gZ2V0T2JqZWN0VmFsdWVCeVBhdGgoYiwgaW5kZXgpXG5cbiAgICAgICAgICBpZiAoaXNEZXNjZW5kaW5nKSB7XG4gICAgICAgICAgICBbc29ydEEsIHNvcnRCXSA9IFtzb3J0Qiwgc29ydEFdXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgYm90aCBhcmUgbnVtYmVyc1xuICAgICAgICAgIGlmICghaXNOYU4oc29ydEEpICYmICFpc05hTihzb3J0QikpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3J0QSAtIHNvcnRCXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgYm90aCBjYW5ub3QgYmUgZXZhbHVhdGVkXG4gICAgICAgICAgaWYgKHNvcnRBID09PSBudWxsICYmIHNvcnRCID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIH1cblxuICAgICAgICAgIFtzb3J0QSwgc29ydEJdID0gW3NvcnRBLCBzb3J0Ql1cbiAgICAgICAgICAgIC5tYXAocyA9PiAoXG4gICAgICAgICAgICAgIChzIHx8ICcnKS50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKClcbiAgICAgICAgICAgICkpXG5cbiAgICAgICAgICBpZiAoc29ydEEgPiBzb3J0QikgcmV0dXJuIDFcbiAgICAgICAgICBpZiAoc29ydEEgPCBzb3J0QikgcmV0dXJuIC0xXG5cbiAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuICAgIHRvdGFsSXRlbXM6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGl0ZW1LZXk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdpZCdcbiAgICB9LFxuICAgIHBhZ2luYXRpb246IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IHt9XG4gICAgfVxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgc2VhcmNoTGVuZ3RoOiAwLFxuICAgIGRlZmF1bHRQYWdpbmF0aW9uOiB7XG4gICAgICBkZXNjZW5kaW5nOiBmYWxzZSxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICByb3dzUGVyUGFnZTogNSxcbiAgICAgIHNvcnRCeTogbnVsbCxcbiAgICAgIHRvdGFsSXRlbXM6IDBcbiAgICB9LFxuICAgIGV4cGFuZGVkOiB7fSxcbiAgICBhY3Rpb25zQ2xhc3NlczogJ3YtZGF0YS1pdGVyYXRvcl9fYWN0aW9ucycsXG4gICAgYWN0aW9uc1JhbmdlQ29udHJvbHNDbGFzc2VzOiAndi1kYXRhLWl0ZXJhdG9yX19hY3Rpb25zX19yYW5nZS1jb250cm9scycsXG4gICAgYWN0aW9uc1NlbGVjdENsYXNzZXM6ICd2LWRhdGEtaXRlcmF0b3JfX2FjdGlvbnNfX3NlbGVjdCcsXG4gICAgYWN0aW9uc1BhZ2luYXRpb25DbGFzc2VzOiAndi1kYXRhLWl0ZXJhdG9yX19hY3Rpb25zX19wYWdpbmF0aW9uJ1xuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkUGFnaW5hdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNQYWdpbmF0aW9uXG4gICAgICAgID8gdGhpcy5wYWdpbmF0aW9uXG4gICAgICAgIDogdGhpcy5kZWZhdWx0UGFnaW5hdGlvblxuICAgIH0sXG4gICAgY29tcHV0ZWRSb3dzUGVyUGFnZUl0ZW1zICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvd3NQZXJQYWdlSXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXNPYmplY3QoaXRlbSlcbiAgICAgICAgICA/IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0sIHtcbiAgICAgICAgICAgIHRleHQ6IHRoaXMuJHZ1ZXRpZnkudChpdGVtLnRleHQpXG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IGl0ZW1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBoYXNQYWdpbmF0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSB0aGlzLnBhZ2luYXRpb24gfHwge31cblxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHBhZ2luYXRpb24pLmxlbmd0aCA+IDBcbiAgICB9LFxuICAgIGhhc1NlbGVjdEFsbCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RBbGwgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlbGVjdEFsbCAhPT0gZmFsc2VcbiAgICB9LFxuICAgIGl0ZW1zTGVuZ3RoICgpIHtcbiAgICAgIGlmICh0aGlzLmhhc1NlYXJjaCkgcmV0dXJuIHRoaXMuc2VhcmNoTGVuZ3RoXG4gICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zIHx8IHRoaXMuaXRlbXMubGVuZ3RoXG4gICAgfSxcbiAgICBpbmRldGVybWluYXRlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc1NlbGVjdEFsbCAmJiB0aGlzLnNvbWVJdGVtcyAmJiAhdGhpcy5ldmVyeUl0ZW1cbiAgICB9LFxuICAgIGV2ZXJ5SXRlbSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZEl0ZW1zLmxlbmd0aCAmJlxuICAgICAgICB0aGlzLmZpbHRlcmVkSXRlbXMuZXZlcnkoaSA9PiB0aGlzLmlzU2VsZWN0ZWQoaSkpXG4gICAgfSxcbiAgICBzb21lSXRlbXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRJdGVtcy5zb21lKGkgPT4gdGhpcy5pc1NlbGVjdGVkKGkpKVxuICAgIH0sXG4gICAgZ2V0UGFnZSAoKSB7XG4gICAgICBjb25zdCB7IHJvd3NQZXJQYWdlIH0gPSB0aGlzLmNvbXB1dGVkUGFnaW5hdGlvblxuXG4gICAgICByZXR1cm4gcm93c1BlclBhZ2UgPT09IE9iamVjdChyb3dzUGVyUGFnZSlcbiAgICAgICAgPyByb3dzUGVyUGFnZS52YWx1ZVxuICAgICAgICA6IHJvd3NQZXJQYWdlXG4gICAgfSxcbiAgICBwYWdlU3RhcnQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZSA9PT0gLTFcbiAgICAgICAgPyAwXG4gICAgICAgIDogKHRoaXMuY29tcHV0ZWRQYWdpbmF0aW9uLnBhZ2UgLSAxKSAqIHRoaXMuZ2V0UGFnZVxuICAgIH0sXG4gICAgcGFnZVN0b3AgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZSA9PT0gLTFcbiAgICAgICAgPyB0aGlzLml0ZW1zTGVuZ3RoXG4gICAgICAgIDogdGhpcy5jb21wdXRlZFBhZ2luYXRpb24ucGFnZSAqIHRoaXMuZ2V0UGFnZVxuICAgIH0sXG4gICAgZmlsdGVyZWRJdGVtcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZEl0ZW1zSW1wbCgpXG4gICAgfSxcbiAgICBzZWxlY3RlZCAoKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHt9XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy52YWx1ZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0T2JqZWN0VmFsdWVCeVBhdGgodGhpcy52YWx1ZVtpbmRleF0sIHRoaXMuaXRlbUtleSlcbiAgICAgICAgc2VsZWN0ZWRba2V5XSA9IHRydWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxlY3RlZFxuICAgIH0sXG4gICAgaGFzU2VhcmNoICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaCAhPSBudWxsXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgc2VhcmNoICgpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKHsgcGFnZTogMSwgdG90YWxJdGVtczogdGhpcy5pdGVtc0xlbmd0aCB9KVxuICAgICAgfSlcbiAgICB9LFxuICAgICdjb21wdXRlZFBhZ2luYXRpb24uc29ydEJ5JzogJ3Jlc2V0UGFnaW5hdGlvbicsXG4gICAgJ2NvbXB1dGVkUGFnaW5hdGlvbi5kZXNjZW5kaW5nJzogJ3Jlc2V0UGFnaW5hdGlvbidcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgaW5pdFBhZ2luYXRpb24gKCkge1xuICAgICAgaWYgKCF0aGlzLnJvd3NQZXJQYWdlSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGVXYXJuKGBUaGUgcHJvcCAncm93cy1wZXItcGFnZS1pdGVtcycgY2FuIG5vdCBiZSBlbXB0eWAsIHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlZmF1bHRQYWdpbmF0aW9uLnJvd3NQZXJQYWdlID0gdGhpcy5yb3dzUGVyUGFnZUl0ZW1zWzBdXG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGVmYXVsdFBhZ2luYXRpb24udG90YWxJdGVtcyA9IHRoaXMuaXRlbXMubGVuZ3RoXG5cbiAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbihcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0UGFnaW5hdGlvbiwgdGhpcy5wYWdpbmF0aW9uKVxuICAgICAgKVxuICAgIH0sXG4gICAgdXBkYXRlUGFnaW5hdGlvbiAodmFsKSB7XG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gdGhpcy5oYXNQYWdpbmF0aW9uXG4gICAgICAgID8gdGhpcy5wYWdpbmF0aW9uXG4gICAgICAgIDogdGhpcy5kZWZhdWx0UGFnaW5hdGlvblxuICAgICAgY29uc3QgdXBkYXRlZFBhZ2luYXRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBwYWdpbmF0aW9uLCB2YWwpXG4gICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6cGFnaW5hdGlvbicsIHVwZGF0ZWRQYWdpbmF0aW9uKVxuXG4gICAgICBpZiAoIXRoaXMuaGFzUGFnaW5hdGlvbikge1xuICAgICAgICB0aGlzLmRlZmF1bHRQYWdpbmF0aW9uID0gdXBkYXRlZFBhZ2luYXRpb25cbiAgICAgIH1cbiAgICB9LFxuICAgIGlzU2VsZWN0ZWQgKGl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkW2dldE9iamVjdFZhbHVlQnlQYXRoKGl0ZW0sIHRoaXMuaXRlbUtleSldXG4gICAgfSxcbiAgICBpc0V4cGFuZGVkIChpdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5leHBhbmRlZFtnZXRPYmplY3RWYWx1ZUJ5UGF0aChpdGVtLCB0aGlzLml0ZW1LZXkpXVxuICAgIH0sXG4gICAgZmlsdGVyZWRJdGVtc0ltcGwgKC4uLmFkZGl0aW9uYWxGaWx0ZXJBcmdzKSB7XG4gICAgICBpZiAodGhpcy50b3RhbEl0ZW1zKSByZXR1cm4gdGhpcy5pdGVtc1xuXG4gICAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zLnNsaWNlKClcblxuICAgICAgaWYgKHRoaXMuaGFzU2VhcmNoKSB7XG4gICAgICAgIGl0ZW1zID0gdGhpcy5jdXN0b21GaWx0ZXIoaXRlbXMsIHRoaXMuc2VhcmNoLCB0aGlzLmZpbHRlciwgLi4uYWRkaXRpb25hbEZpbHRlckFyZ3MpXG4gICAgICAgIHRoaXMuc2VhcmNoTGVuZ3RoID0gaXRlbXMubGVuZ3RoXG4gICAgICB9XG5cbiAgICAgIGl0ZW1zID0gdGhpcy5jdXN0b21Tb3J0KFxuICAgICAgICBpdGVtcyxcbiAgICAgICAgdGhpcy5jb21wdXRlZFBhZ2luYXRpb24uc29ydEJ5LFxuICAgICAgICB0aGlzLmNvbXB1dGVkUGFnaW5hdGlvbi5kZXNjZW5kaW5nXG4gICAgICApXG5cbiAgICAgIHJldHVybiB0aGlzLmhpZGVBY3Rpb25zICYmXG4gICAgICAgICF0aGlzLmhhc1BhZ2luYXRpb25cbiAgICAgICAgPyBpdGVtc1xuICAgICAgICA6IGl0ZW1zLnNsaWNlKHRoaXMucGFnZVN0YXJ0LCB0aGlzLnBhZ2VTdG9wKVxuICAgIH0sXG4gICAgcmVzZXRQYWdpbmF0aW9uICgpIHtcbiAgICAgIHRoaXMuY29tcHV0ZWRQYWdpbmF0aW9uLnBhZ2UgIT09IDEgJiZcbiAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKHsgcGFnZTogMSB9KVxuICAgIH0sXG4gICAgc29ydCAoaW5kZXgpIHtcbiAgICAgIGNvbnN0IHsgc29ydEJ5LCBkZXNjZW5kaW5nIH0gPSB0aGlzLmNvbXB1dGVkUGFnaW5hdGlvblxuICAgICAgaWYgKHNvcnRCeSA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oeyBzb3J0Qnk6IGluZGV4LCBkZXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgICAgfSBlbHNlIGlmIChzb3J0QnkgPT09IGluZGV4ICYmICFkZXNjZW5kaW5nKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbih7IGRlc2NlbmRpbmc6IHRydWUgfSlcbiAgICAgIH0gZWxzZSBpZiAoc29ydEJ5ICE9PSBpbmRleCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oeyBzb3J0Qnk6IGluZGV4LCBkZXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgICAgfSBlbHNlIGlmICghdGhpcy5tdXN0U29ydCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oeyBzb3J0Qnk6IG51bGwsIGRlc2NlbmRpbmc6IG51bGwgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbih7IHNvcnRCeTogaW5kZXgsIGRlc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICB0b2dnbGUgKHZhbHVlKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc2VsZWN0ZWQpXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5maWx0ZXJlZEl0ZW1zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRPYmplY3RWYWx1ZUJ5UGF0aCh0aGlzLmZpbHRlcmVkSXRlbXNbaW5kZXhdLCB0aGlzLml0ZW1LZXkpXG4gICAgICAgIHNlbGVjdGVkW2tleV0gPSB2YWx1ZVxuICAgICAgfVxuXG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHRoaXMuaXRlbXMuZmlsdGVyKGkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRPYmplY3RWYWx1ZUJ5UGF0aChpLCB0aGlzLml0ZW1LZXkpXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFtrZXldXG4gICAgICB9KSlcbiAgICB9LFxuICAgIGNyZWF0ZVByb3BzIChpdGVtLCBpbmRleCkge1xuICAgICAgY29uc3QgcHJvcHMgPSB7IGl0ZW0sIGluZGV4IH1cbiAgICAgIGNvbnN0IGtleVByb3AgPSB0aGlzLml0ZW1LZXlcbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBnZXRPYmplY3RWYWx1ZUJ5UGF0aChpdGVtLCBrZXlQcm9wKVxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdzZWxlY3RlZCcsIHtcbiAgICAgICAgZ2V0OiAoKSA9PiB0aGlzLnNlbGVjdGVkW2l0ZW1LZXldLFxuICAgICAgICBzZXQ6IHZhbHVlID0+IHtcbiAgICAgICAgICBpZiAoaXRlbUtleSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlV2FybihgXCIke2tleVByb3B9XCIgYXR0cmlidXRlIG11c3QgYmUgZGVmaW5lZCBmb3IgaXRlbWAsIHRoaXMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy52YWx1ZS5zbGljZSgpXG4gICAgICAgICAgaWYgKHZhbHVlKSBzZWxlY3RlZC5wdXNoKGl0ZW0pXG4gICAgICAgICAgZWxzZSBzZWxlY3RlZCA9IHNlbGVjdGVkLmZpbHRlcihpID0+IGdldE9iamVjdFZhbHVlQnlQYXRoKGksIGtleVByb3ApICE9PSBpdGVtS2V5KVxuICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0Jywgc2VsZWN0ZWQpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2V4cGFuZGVkJywge1xuICAgICAgICBnZXQ6ICgpID0+IHRoaXMuZXhwYW5kZWRbaXRlbUtleV0sXG4gICAgICAgIHNldDogdmFsdWUgPT4ge1xuICAgICAgICAgIGlmIChpdGVtS2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGVXYXJuKGBcIiR7a2V5UHJvcH1cIiBhdHRyaWJ1dGUgbXVzdCBiZSBkZWZpbmVkIGZvciBpdGVtYCwgdGhpcylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRoaXMuZXhwYW5kKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiB0aGlzLiRzZXQodGhpcy5leHBhbmRlZCwga2V5LCBmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMuZXhwYW5kZWQsIGl0ZW1LZXksIHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gcHJvcHNcbiAgICB9LFxuICAgIGdlbkl0ZW1zICgpIHtcbiAgICAgIGlmICghdGhpcy5pdGVtc0xlbmd0aCAmJiAhdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgbm9EYXRhID0gdGhpcy4kc2xvdHNbJ25vLWRhdGEnXSB8fCB0aGlzLiR2dWV0aWZ5LnQodGhpcy5ub0RhdGFUZXh0KVxuICAgICAgICByZXR1cm4gW3RoaXMuZ2VuRW1wdHlJdGVtcyhub0RhdGEpXVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuZmlsdGVyZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgbm9SZXN1bHRzID0gdGhpcy4kc2xvdHNbJ25vLXJlc3VsdHMnXSB8fCB0aGlzLiR2dWV0aWZ5LnQodGhpcy5ub1Jlc3VsdHNUZXh0KVxuICAgICAgICByZXR1cm4gW3RoaXMuZ2VuRW1wdHlJdGVtcyhub1Jlc3VsdHMpXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZW5GaWx0ZXJlZEl0ZW1zKClcbiAgICB9LFxuICAgIGdlblByZXZJY29uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZCdG4sIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5jb21wdXRlZFBhZ2luYXRpb24ucGFnZSA9PT0gMSxcbiAgICAgICAgICBpY29uOiB0cnVlLFxuICAgICAgICAgIGZsYXQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuY29tcHV0ZWRQYWdpbmF0aW9uLnBhZ2VcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbih7IHBhZ2U6IHBhZ2UgLSAxIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhdHRyczoge1xuICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy4kdnVldGlmeS50KCckdnVldGlmeS5kYXRhSXRlcmF0b3IucHJldlBhZ2UnKVxuICAgICAgICB9XG4gICAgICB9LCBbdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwgdGhpcy4kdnVldGlmeS5ydGwgPyB0aGlzLm5leHRJY29uIDogdGhpcy5wcmV2SWNvbildKVxuICAgIH0sXG4gICAgZ2VuTmV4dEljb24gKCkge1xuICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IHRoaXMuY29tcHV0ZWRQYWdpbmF0aW9uXG4gICAgICBjb25zdCBkaXNhYmxlZCA9IHBhZ2luYXRpb24ucm93c1BlclBhZ2UgPCAwIHx8XG4gICAgICAgIHBhZ2luYXRpb24ucGFnZSAqIHBhZ2luYXRpb24ucm93c1BlclBhZ2UgPj0gdGhpcy5pdGVtc0xlbmd0aCB8fFxuICAgICAgICB0aGlzLnBhZ2VTdG9wIDwgMFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWQnRuLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgICAgaWNvbjogdHJ1ZSxcbiAgICAgICAgICBmbGF0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmNvbXB1dGVkUGFnaW5hdGlvbi5wYWdlXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oeyBwYWdlOiBwYWdlICsgMSB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMuJHZ1ZXRpZnkudCgnJHZ1ZXRpZnkuZGF0YUl0ZXJhdG9yLm5leHRQYWdlJylcbiAgICAgICAgfVxuICAgICAgfSwgW3RoaXMuJGNyZWF0ZUVsZW1lbnQoVkljb24sIHRoaXMuJHZ1ZXRpZnkucnRsID8gdGhpcy5wcmV2SWNvbiA6IHRoaXMubmV4dEljb24pXSlcbiAgICB9LFxuICAgIGdlblNlbGVjdCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAnY2xhc3MnOiB0aGlzLmFjdGlvbnNTZWxlY3RDbGFzc2VzXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuJHZ1ZXRpZnkudCh0aGlzLnJvd3NQZXJQYWdlVGV4dCksXG4gICAgICAgIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVlNlbGVjdCwge1xuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMuJHZ1ZXRpZnkudCh0aGlzLnJvd3NQZXJQYWdlVGV4dClcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBpdGVtczogdGhpcy5jb21wdXRlZFJvd3NQZXJQYWdlSXRlbXMsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jb21wdXRlZFBhZ2luYXRpb24ucm93c1BlclBhZ2UsXG4gICAgICAgICAgICBoaWRlRGV0YWlsczogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG86IHRydWUsXG4gICAgICAgICAgICBtaW5XaWR0aDogJzc1cHgnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgaW5wdXQ6IHZhbCA9PiB7XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbih7XG4gICAgICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICAgICAgICByb3dzUGVyUGFnZTogdmFsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlblBhZ2luYXRpb24gKCkge1xuICAgICAgbGV0IHBhZ2luYXRpb24gPSAn4oCTJ1xuXG4gICAgICBpZiAodGhpcy5pdGVtc0xlbmd0aCkge1xuICAgICAgICBjb25zdCBzdG9wID0gdGhpcy5pdGVtc0xlbmd0aCA8IHRoaXMucGFnZVN0b3AgfHwgdGhpcy5wYWdlU3RvcCA8IDBcbiAgICAgICAgICA/IHRoaXMuaXRlbXNMZW5ndGhcbiAgICAgICAgICA6IHRoaXMucGFnZVN0b3BcblxuICAgICAgICBwYWdpbmF0aW9uID0gdGhpcy4kc2NvcGVkU2xvdHMucGFnZVRleHRcbiAgICAgICAgICA/IHRoaXMuJHNjb3BlZFNsb3RzLnBhZ2VUZXh0KHtcbiAgICAgICAgICAgIHBhZ2VTdGFydDogdGhpcy5wYWdlU3RhcnQgKyAxLFxuICAgICAgICAgICAgcGFnZVN0b3A6IHN0b3AsXG4gICAgICAgICAgICBpdGVtc0xlbmd0aDogdGhpcy5pdGVtc0xlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgICAgOiB0aGlzLiR2dWV0aWZ5LnQoJyR2dWV0aWZ5LmRhdGFJdGVyYXRvci5wYWdlVGV4dCcsIHRoaXMucGFnZVN0YXJ0ICsgMSwgc3RvcCwgdGhpcy5pdGVtc0xlbmd0aClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgJ2NsYXNzJzogdGhpcy5hY3Rpb25zUGFnaW5hdGlvbkNsYXNzZXNcbiAgICAgIH0sIFtwYWdpbmF0aW9uXSlcbiAgICB9LFxuICAgIGdlbkFjdGlvbnMgKCkge1xuICAgICAgY29uc3QgcmFuZ2VDb250cm9scyA9IHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgJ2NsYXNzJzogdGhpcy5hY3Rpb25zUmFuZ2VDb250cm9sc0NsYXNzZXNcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5QYWdpbmF0aW9uKCksXG4gICAgICAgIHRoaXMuZ2VuUHJldkljb24oKSxcbiAgICAgICAgdGhpcy5nZW5OZXh0SWNvbigpXG4gICAgICBdKVxuXG4gICAgICByZXR1cm4gW3RoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgJ2NsYXNzJzogdGhpcy5hY3Rpb25zQ2xhc3Nlc1xuICAgICAgfSwgW1xuICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMubGVuZ3RoID4gMSA/IHRoaXMuZ2VuU2VsZWN0KCkgOiBudWxsLFxuICAgICAgICByYW5nZUNvbnRyb2xzXG4gICAgICBdKV1cbiAgICB9XG4gIH1cbn1cbiJdfQ==