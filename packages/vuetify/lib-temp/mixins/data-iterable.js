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
                    : { value: item, text: Number(item).toLocaleString(this.$vuetify.lang.current) };
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
                        menuProps: {
                            auto: true,
                            dark: this.dark,
                            light: this.light,
                            minWidth: '75px'
                        }
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
                    : this.$vuetify.t('$vuetify.dataIterator.pageText', ...([this.pageStart + 1, stop, this.itemsLength].map(n => Number(n).toLocaleString(this.$vuetify.lang.current))));
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
                    this.$slots['actions-prepend'] ? this.$createElement('div', {}, this.$slots['actions-prepend']) : null,
                    this.rowsPerPageItems.length > 1 ? this.genSelect() : null,
                    rangeControls,
                    this.$slots['actions-append'] ? this.$createElement('div', {}, this.$slots['actions-append']) : null
                ])];
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1pdGVyYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbnMvZGF0YS1pdGVyYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQTtBQUNyQyxPQUFPLEtBQUssTUFBTSxxQkFBcUIsQ0FBQTtBQUN2QyxPQUFPLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQTtBQUUzQyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUE7QUFDckMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFBO0FBQ25DLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQTtBQUVqQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRTdDOzs7Ozs7OztHQVFHO0FBQ0gsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsZUFBZTtJQUVyQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztJQUV6QyxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsT0FBTztRQUNmLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLGtCQUFrQixFQUFFLE9BQU87UUFDM0IsUUFBUSxFQUFFLE9BQU87UUFDakIsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUscUNBQXFDO1NBQy9DO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUscUJBQXFCO1NBQy9CO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUscUJBQXFCO1NBQy9CO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPO2dCQUNMLE9BQU87b0JBQ0wsQ0FBQztvQkFDRCxFQUFFO29C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QUE7UUFDbEIsQ0FBQztRQUNELFVBQVU7WUFDUixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDL0MsT0FBTyxFQUFFLElBQUksQ0FBQywyQkFBMkI7YUFDMUMsRUFBRTtnQkFDRCxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ25CLENBQUMsQ0FBQTtZQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtvQkFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO2lCQUM3QixFQUFFO29CQUNELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUN0RyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUMxRCxhQUFhO29CQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2lCQUNyRyxDQUFDLENBQUMsQ0FBQTtRQUNMLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVkJ0biBmcm9tICcuLi9jb21wb25lbnRzL1ZCdG4nXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vY29tcG9uZW50cy9WSWNvbidcbmltcG9ydCBWU2VsZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvVlNlbGVjdCdcblxuaW1wb3J0IEZpbHRlcmFibGUgZnJvbSAnLi9maWx0ZXJhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuL3RoZW1lYWJsZSdcbmltcG9ydCBMb2FkYWJsZSBmcm9tICcuL2xvYWRhYmxlJ1xuXG5pbXBvcnQgeyBnZXRPYmplY3RWYWx1ZUJ5UGF0aCwgaXNPYmplY3QgfSBmcm9tICcuLi91dGlsL2hlbHBlcnMnXG5pbXBvcnQgeyBjb25zb2xlV2FybiB9IGZyb20gJy4uL3V0aWwvY29uc29sZSdcblxuLyoqXG4gKiBEYXRhSXRlcmFibGVcbiAqXG4gKiBAbWl4aW5cbiAqXG4gKiBCYXNlIGJlaGF2aW9yIGZvciBkYXRhIHRhYmxlIGFuZCBkYXRhIGl0ZXJhdG9yXG4gKiBwcm92aWRpbmcgc2VsZWN0aW9uLCBwYWdpbmF0aW9uLCBzb3J0aW5nIGFuZCBmaWx0ZXJpbmcuXG4gKlxuICovXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZGF0YS1pdGVyYWJsZScsXG5cbiAgbWl4aW5zOiBbRmlsdGVyYWJsZSwgTG9hZGFibGUsIFRoZW1lYWJsZV0sXG5cbiAgcHJvcHM6IHtcbiAgICBleHBhbmQ6IEJvb2xlYW4sXG4gICAgaGlkZUFjdGlvbnM6IEJvb2xlYW4sXG4gICAgZGlzYWJsZUluaXRpYWxTb3J0OiBCb29sZWFuLFxuICAgIG11c3RTb3J0OiBCb29sZWFuLFxuICAgIG5vUmVzdWx0c1RleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5kYXRhSXRlcmF0b3Iubm9SZXN1bHRzVGV4dCdcbiAgICB9LFxuICAgIG5leHRJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMubmV4dCdcbiAgICB9LFxuICAgIHByZXZJY29uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMucHJldidcbiAgICB9LFxuICAgIHJvd3NQZXJQYWdlSXRlbXM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdCAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgNSxcbiAgICAgICAgICAxMCxcbiAgICAgICAgICAyNSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnJHZ1ZXRpZnkuZGF0YUl0ZXJhdG9yLnJvd3NQZXJQYWdlQWxsJyxcbiAgICAgICAgICAgIHZhbHVlOiAtMVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0sXG4gICAgcm93c1BlclBhZ2VUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuZGF0YUl0ZXJhdG9yLnJvd3NQZXJQYWdlVGV4dCdcbiAgICB9LFxuICAgIHNlbGVjdEFsbDogW0Jvb2xlYW4sIFN0cmluZ10sXG4gICAgc2VhcmNoOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2VcbiAgICB9LFxuICAgIGZpbHRlcjoge1xuICAgICAgdHlwZTogRnVuY3Rpb24sXG4gICAgICBkZWZhdWx0OiAodmFsLCBzZWFyY2gpID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbCAhPSBudWxsICYmXG4gICAgICAgICAgdHlwZW9mIHZhbCAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgICAgdmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgIT09IC0xXG4gICAgICB9XG4gICAgfSxcbiAgICBjdXN0b21GaWx0ZXI6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogKGl0ZW1zLCBzZWFyY2gsIGZpbHRlcikgPT4ge1xuICAgICAgICBzZWFyY2ggPSBzZWFyY2gudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGlmIChzZWFyY2gudHJpbSgpID09PSAnJykgcmV0dXJuIGl0ZW1zXG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlcihpID0+IChcbiAgICAgICAgICBPYmplY3Qua2V5cyhpKS5zb21lKGogPT4gZmlsdGVyKGlbal0sIHNlYXJjaCkpXG4gICAgICAgICkpXG4gICAgICB9XG4gICAgfSxcbiAgICBjdXN0b21Tb3J0OiB7XG4gICAgICB0eXBlOiBGdW5jdGlvbixcbiAgICAgIGRlZmF1bHQ6IChpdGVtcywgaW5kZXgsIGlzRGVzY2VuZGluZykgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwpIHJldHVybiBpdGVtc1xuXG4gICAgICAgIHJldHVybiBpdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgbGV0IHNvcnRBID0gZ2V0T2JqZWN0VmFsdWVCeVBhdGgoYSwgaW5kZXgpXG4gICAgICAgICAgbGV0IHNvcnRCID0gZ2V0T2JqZWN0VmFsdWVCeVBhdGgoYiwgaW5kZXgpXG5cbiAgICAgICAgICBpZiAoaXNEZXNjZW5kaW5nKSB7XG4gICAgICAgICAgICBbc29ydEEsIHNvcnRCXSA9IFtzb3J0Qiwgc29ydEFdXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgYm90aCBhcmUgbnVtYmVyc1xuICAgICAgICAgIGlmICghaXNOYU4oc29ydEEpICYmICFpc05hTihzb3J0QikpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3J0QSAtIHNvcnRCXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgYm90aCBjYW5ub3QgYmUgZXZhbHVhdGVkXG4gICAgICAgICAgaWYgKHNvcnRBID09PSBudWxsICYmIHNvcnRCID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIH1cblxuICAgICAgICAgIFtzb3J0QSwgc29ydEJdID0gW3NvcnRBLCBzb3J0Ql1cbiAgICAgICAgICAgIC5tYXAocyA9PiAoXG4gICAgICAgICAgICAgIChzIHx8ICcnKS50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKClcbiAgICAgICAgICAgICkpXG5cbiAgICAgICAgICBpZiAoc29ydEEgPiBzb3J0QikgcmV0dXJuIDFcbiAgICAgICAgICBpZiAoc29ydEEgPCBzb3J0QikgcmV0dXJuIC0xXG5cbiAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuICAgIGl0ZW1zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuICAgIHRvdGFsSXRlbXM6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGl0ZW1LZXk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdpZCdcbiAgICB9LFxuICAgIHBhZ2luYXRpb246IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IHt9XG4gICAgfVxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgc2VhcmNoTGVuZ3RoOiAwLFxuICAgIGRlZmF1bHRQYWdpbmF0aW9uOiB7XG4gICAgICBkZXNjZW5kaW5nOiBmYWxzZSxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICByb3dzUGVyUGFnZTogNSxcbiAgICAgIHNvcnRCeTogbnVsbCxcbiAgICAgIHRvdGFsSXRlbXM6IDBcbiAgICB9LFxuICAgIGV4cGFuZGVkOiB7fSxcbiAgICBhY3Rpb25zQ2xhc3NlczogJ3YtZGF0YS1pdGVyYXRvcl9fYWN0aW9ucycsXG4gICAgYWN0aW9uc1JhbmdlQ29udHJvbHNDbGFzc2VzOiAndi1kYXRhLWl0ZXJhdG9yX19hY3Rpb25zX19yYW5nZS1jb250cm9scycsXG4gICAgYWN0aW9uc1NlbGVjdENsYXNzZXM6ICd2LWRhdGEtaXRlcmF0b3JfX2FjdGlvbnNfX3NlbGVjdCcsXG4gICAgYWN0aW9uc1BhZ2luYXRpb25DbGFzc2VzOiAndi1kYXRhLWl0ZXJhdG9yX19hY3Rpb25zX19wYWdpbmF0aW9uJ1xuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkUGFnaW5hdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNQYWdpbmF0aW9uXG4gICAgICAgID8gdGhpcy5wYWdpbmF0aW9uXG4gICAgICAgIDogdGhpcy5kZWZhdWx0UGFnaW5hdGlvblxuICAgIH0sXG4gICAgY29tcHV0ZWRSb3dzUGVyUGFnZUl0ZW1zICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvd3NQZXJQYWdlSXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXNPYmplY3QoaXRlbSlcbiAgICAgICAgICA/IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0sIHtcbiAgICAgICAgICAgIHRleHQ6IHRoaXMuJHZ1ZXRpZnkudChpdGVtLnRleHQpXG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IHsgdmFsdWU6IGl0ZW0sIHRleHQ6IE51bWJlcihpdGVtKS50b0xvY2FsZVN0cmluZyh0aGlzLiR2dWV0aWZ5LmxhbmcuY3VycmVudCkgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGhhc1BhZ2luYXRpb24gKCkge1xuICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IHRoaXMucGFnaW5hdGlvbiB8fCB7fVxuXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMocGFnaW5hdGlvbikubGVuZ3RoID4gMFxuICAgIH0sXG4gICAgaGFzU2VsZWN0QWxsICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdEFsbCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0QWxsICE9PSBmYWxzZVxuICAgIH0sXG4gICAgaXRlbXNMZW5ndGggKCkge1xuICAgICAgaWYgKHRoaXMuaGFzU2VhcmNoKSByZXR1cm4gdGhpcy5zZWFyY2hMZW5ndGhcbiAgICAgIHJldHVybiB0aGlzLnRvdGFsSXRlbXMgfHwgdGhpcy5pdGVtcy5sZW5ndGhcbiAgICB9LFxuICAgIGluZGV0ZXJtaW5hdGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzU2VsZWN0QWxsICYmIHRoaXMuc29tZUl0ZW1zICYmICF0aGlzLmV2ZXJ5SXRlbVxuICAgIH0sXG4gICAgZXZlcnlJdGVtICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkSXRlbXMubGVuZ3RoICYmXG4gICAgICAgIHRoaXMuZmlsdGVyZWRJdGVtcy5ldmVyeShpID0+IHRoaXMuaXNTZWxlY3RlZChpKSlcbiAgICB9LFxuICAgIHNvbWVJdGVtcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZEl0ZW1zLnNvbWUoaSA9PiB0aGlzLmlzU2VsZWN0ZWQoaSkpXG4gICAgfSxcbiAgICBnZXRQYWdlICgpIHtcbiAgICAgIGNvbnN0IHsgcm93c1BlclBhZ2UgfSA9IHRoaXMuY29tcHV0ZWRQYWdpbmF0aW9uXG5cbiAgICAgIHJldHVybiByb3dzUGVyUGFnZSA9PT0gT2JqZWN0KHJvd3NQZXJQYWdlKVxuICAgICAgICA/IHJvd3NQZXJQYWdlLnZhbHVlXG4gICAgICAgIDogcm93c1BlclBhZ2VcbiAgICB9LFxuICAgIHBhZ2VTdGFydCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRQYWdlID09PSAtMVxuICAgICAgICA/IDBcbiAgICAgICAgOiAodGhpcy5jb21wdXRlZFBhZ2luYXRpb24ucGFnZSAtIDEpICogdGhpcy5nZXRQYWdlXG4gICAgfSxcbiAgICBwYWdlU3RvcCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRQYWdlID09PSAtMVxuICAgICAgICA/IHRoaXMuaXRlbXNMZW5ndGhcbiAgICAgICAgOiB0aGlzLmNvbXB1dGVkUGFnaW5hdGlvbi5wYWdlICogdGhpcy5nZXRQYWdlXG4gICAgfSxcbiAgICBmaWx0ZXJlZEl0ZW1zICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkSXRlbXNJbXBsKClcbiAgICB9LFxuICAgIHNlbGVjdGVkICgpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0ge31cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnZhbHVlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRPYmplY3RWYWx1ZUJ5UGF0aCh0aGlzLnZhbHVlW2luZGV4XSwgdGhpcy5pdGVtS2V5KVxuICAgICAgICBzZWxlY3RlZFtrZXldID0gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdGVkXG4gICAgfSxcbiAgICBoYXNTZWFyY2ggKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoICE9IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBzZWFyY2ggKCkge1xuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oeyBwYWdlOiAxLCB0b3RhbEl0ZW1zOiB0aGlzLml0ZW1zTGVuZ3RoIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgJ2NvbXB1dGVkUGFnaW5hdGlvbi5zb3J0QnknOiAncmVzZXRQYWdpbmF0aW9uJyxcbiAgICAnY29tcHV0ZWRQYWdpbmF0aW9uLmRlc2NlbmRpbmcnOiAncmVzZXRQYWdpbmF0aW9uJ1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0UGFnaW5hdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMucm93c1BlclBhZ2VJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZVdhcm4oYFRoZSBwcm9wICdyb3dzLXBlci1wYWdlLWl0ZW1zJyBjYW4gbm90IGJlIGVtcHR5YCwgdGhpcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFBhZ2luYXRpb24ucm93c1BlclBhZ2UgPSB0aGlzLnJvd3NQZXJQYWdlSXRlbXNbMF1cbiAgICAgIH1cblxuICAgICAgdGhpcy5kZWZhdWx0UGFnaW5hdGlvbi50b3RhbEl0ZW1zID0gdGhpcy5pdGVtcy5sZW5ndGhcblxuICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKFxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRQYWdpbmF0aW9uLCB0aGlzLnBhZ2luYXRpb24pXG4gICAgICApXG4gICAgfSxcbiAgICB1cGRhdGVQYWdpbmF0aW9uICh2YWwpIHtcbiAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSB0aGlzLmhhc1BhZ2luYXRpb25cbiAgICAgICAgPyB0aGlzLnBhZ2luYXRpb25cbiAgICAgICAgOiB0aGlzLmRlZmF1bHRQYWdpbmF0aW9uXG4gICAgICBjb25zdCB1cGRhdGVkUGFnaW5hdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIHBhZ2luYXRpb24sIHZhbClcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTpwYWdpbmF0aW9uJywgdXBkYXRlZFBhZ2luYXRpb24pXG5cbiAgICAgIGlmICghdGhpcy5oYXNQYWdpbmF0aW9uKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFBhZ2luYXRpb24gPSB1cGRhdGVkUGFnaW5hdGlvblxuICAgICAgfVxuICAgIH0sXG4gICAgaXNTZWxlY3RlZCAoaXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRbZ2V0T2JqZWN0VmFsdWVCeVBhdGgoaXRlbSwgdGhpcy5pdGVtS2V5KV1cbiAgICB9LFxuICAgIGlzRXhwYW5kZWQgKGl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkW2dldE9iamVjdFZhbHVlQnlQYXRoKGl0ZW0sIHRoaXMuaXRlbUtleSldXG4gICAgfSxcbiAgICBmaWx0ZXJlZEl0ZW1zSW1wbCAoLi4uYWRkaXRpb25hbEZpbHRlckFyZ3MpIHtcbiAgICAgIGlmICh0aGlzLnRvdGFsSXRlbXMpIHJldHVybiB0aGlzLml0ZW1zXG5cbiAgICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXMuc2xpY2UoKVxuXG4gICAgICBpZiAodGhpcy5oYXNTZWFyY2gpIHtcbiAgICAgICAgaXRlbXMgPSB0aGlzLmN1c3RvbUZpbHRlcihpdGVtcywgdGhpcy5zZWFyY2gsIHRoaXMuZmlsdGVyLCAuLi5hZGRpdGlvbmFsRmlsdGVyQXJncylcbiAgICAgICAgdGhpcy5zZWFyY2hMZW5ndGggPSBpdGVtcy5sZW5ndGhcbiAgICAgIH1cblxuICAgICAgaXRlbXMgPSB0aGlzLmN1c3RvbVNvcnQoXG4gICAgICAgIGl0ZW1zLFxuICAgICAgICB0aGlzLmNvbXB1dGVkUGFnaW5hdGlvbi5zb3J0QnksXG4gICAgICAgIHRoaXMuY29tcHV0ZWRQYWdpbmF0aW9uLmRlc2NlbmRpbmdcbiAgICAgIClcblxuICAgICAgcmV0dXJuIHRoaXMuaGlkZUFjdGlvbnMgJiZcbiAgICAgICAgIXRoaXMuaGFzUGFnaW5hdGlvblxuICAgICAgICA/IGl0ZW1zXG4gICAgICAgIDogaXRlbXMuc2xpY2UodGhpcy5wYWdlU3RhcnQsIHRoaXMucGFnZVN0b3ApXG4gICAgfSxcbiAgICByZXNldFBhZ2luYXRpb24gKCkge1xuICAgICAgdGhpcy5jb21wdXRlZFBhZ2luYXRpb24ucGFnZSAhPT0gMSAmJlxuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oeyBwYWdlOiAxIH0pXG4gICAgfSxcbiAgICBzb3J0IChpbmRleCkge1xuICAgICAgY29uc3QgeyBzb3J0QnksIGRlc2NlbmRpbmcgfSA9IHRoaXMuY29tcHV0ZWRQYWdpbmF0aW9uXG4gICAgICBpZiAoc29ydEJ5ID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbih7IHNvcnRCeTogaW5kZXgsIGRlc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgICB9IGVsc2UgaWYgKHNvcnRCeSA9PT0gaW5kZXggJiYgIWRlc2NlbmRpbmcpIHtcbiAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKHsgZGVzY2VuZGluZzogdHJ1ZSB9KVxuICAgICAgfSBlbHNlIGlmIChzb3J0QnkgIT09IGluZGV4KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbih7IHNvcnRCeTogaW5kZXgsIGRlc2NlbmRpbmc6IGZhbHNlIH0pXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLm11c3RTb3J0KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbih7IHNvcnRCeTogbnVsbCwgZGVzY2VuZGluZzogbnVsbCB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKHsgc29ydEJ5OiBpbmRleCwgZGVzY2VuZGluZzogZmFsc2UgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvZ2dsZSAodmFsdWUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZWxlY3RlZClcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmZpbHRlcmVkSXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldE9iamVjdFZhbHVlQnlQYXRoKHRoaXMuZmlsdGVyZWRJdGVtc1tpbmRleF0sIHRoaXMuaXRlbUtleSlcbiAgICAgICAgc2VsZWN0ZWRba2V5XSA9IHZhbHVlXG4gICAgICB9XG5cbiAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgdGhpcy5pdGVtcy5maWx0ZXIoaSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldE9iamVjdFZhbHVlQnlQYXRoKGksIHRoaXMuaXRlbUtleSlcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkW2tleV1cbiAgICAgIH0pKVxuICAgIH0sXG4gICAgY3JlYXRlUHJvcHMgKGl0ZW0sIGluZGV4KSB7XG4gICAgICBjb25zdCBwcm9wcyA9IHsgaXRlbSwgaW5kZXggfVxuICAgICAgY29uc3Qga2V5UHJvcCA9IHRoaXMuaXRlbUtleVxuICAgICAgY29uc3QgaXRlbUtleSA9IGdldE9iamVjdFZhbHVlQnlQYXRoKGl0ZW0sIGtleVByb3ApXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3NlbGVjdGVkJywge1xuICAgICAgICBnZXQ6ICgpID0+IHRoaXMuc2VsZWN0ZWRbaXRlbUtleV0sXG4gICAgICAgIHNldDogdmFsdWUgPT4ge1xuICAgICAgICAgIGlmIChpdGVtS2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGVXYXJuKGBcIiR7a2V5UHJvcH1cIiBhdHRyaWJ1dGUgbXVzdCBiZSBkZWZpbmVkIGZvciBpdGVtYCwgdGhpcylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnZhbHVlLnNsaWNlKClcbiAgICAgICAgICBpZiAodmFsdWUpIHNlbGVjdGVkLnB1c2goaXRlbSlcbiAgICAgICAgICBlbHNlIHNlbGVjdGVkID0gc2VsZWN0ZWQuZmlsdGVyKGkgPT4gZ2V0T2JqZWN0VmFsdWVCeVBhdGgoaSwga2V5UHJvcCkgIT09IGl0ZW1LZXkpXG4gICAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCBzZWxlY3RlZClcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAnZXhwYW5kZWQnLCB7XG4gICAgICAgIGdldDogKCkgPT4gdGhpcy5leHBhbmRlZFtpdGVtS2V5XSxcbiAgICAgICAgc2V0OiB2YWx1ZSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW1LZXkgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZVdhcm4oYFwiJHtrZXlQcm9wfVwiIGF0dHJpYnV0ZSBtdXN0IGJlIGRlZmluZWQgZm9yIGl0ZW1gLCB0aGlzKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpcy5leHBhbmQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHRoaXMuJHNldCh0aGlzLmV4cGFuZGVkLCBrZXksIGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5leHBhbmRlZCwgaXRlbUtleSwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBwcm9wc1xuICAgIH0sXG4gICAgZ2VuSXRlbXMgKCkge1xuICAgICAgaWYgKCF0aGlzLml0ZW1zTGVuZ3RoICYmICF0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBub0RhdGEgPSB0aGlzLiRzbG90c1snbm8tZGF0YSddIHx8IHRoaXMuJHZ1ZXRpZnkudCh0aGlzLm5vRGF0YVRleHQpXG4gICAgICAgIHJldHVybiBbdGhpcy5nZW5FbXB0eUl0ZW1zKG5vRGF0YSldXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5maWx0ZXJlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBub1Jlc3VsdHMgPSB0aGlzLiRzbG90c1snbm8tcmVzdWx0cyddIHx8IHRoaXMuJHZ1ZXRpZnkudCh0aGlzLm5vUmVzdWx0c1RleHQpXG4gICAgICAgIHJldHVybiBbdGhpcy5nZW5FbXB0eUl0ZW1zKG5vUmVzdWx0cyldXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdlbkZpbHRlcmVkSXRlbXMoKVxuICAgIH0sXG4gICAgZ2VuUHJldkljb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkJ0biwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmNvbXB1dGVkUGFnaW5hdGlvbi5wYWdlID09PSAxLFxuICAgICAgICAgIGljb246IHRydWUsXG4gICAgICAgICAgZmxhdDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5jb21wdXRlZFBhZ2luYXRpb24ucGFnZVxuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKHsgcGFnZTogcGFnZSAtIDEgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLiR2dWV0aWZ5LnQoJyR2dWV0aWZ5LmRhdGFJdGVyYXRvci5wcmV2UGFnZScpXG4gICAgICAgIH1cbiAgICAgIH0sIFt0aGlzLiRjcmVhdGVFbGVtZW50KFZJY29uLCB0aGlzLiR2dWV0aWZ5LnJ0bCA/IHRoaXMubmV4dEljb24gOiB0aGlzLnByZXZJY29uKV0pXG4gICAgfSxcbiAgICBnZW5OZXh0SWNvbiAoKSB7XG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gdGhpcy5jb21wdXRlZFBhZ2luYXRpb25cbiAgICAgIGNvbnN0IGRpc2FibGVkID0gcGFnaW5hdGlvbi5yb3dzUGVyUGFnZSA8IDAgfHxcbiAgICAgICAgcGFnaW5hdGlvbi5wYWdlICogcGFnaW5hdGlvbi5yb3dzUGVyUGFnZSA+PSB0aGlzLml0ZW1zTGVuZ3RoIHx8XG4gICAgICAgIHRoaXMucGFnZVN0b3AgPCAwXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZCdG4sIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICBpY29uOiB0cnVlLFxuICAgICAgICAgIGZsYXQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuY29tcHV0ZWRQYWdpbmF0aW9uLnBhZ2VcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbih7IHBhZ2U6IHBhZ2UgKyAxIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhdHRyczoge1xuICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy4kdnVldGlmeS50KCckdnVldGlmeS5kYXRhSXRlcmF0b3IubmV4dFBhZ2UnKVxuICAgICAgICB9XG4gICAgICB9LCBbdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwgdGhpcy4kdnVldGlmeS5ydGwgPyB0aGlzLnByZXZJY29uIDogdGhpcy5uZXh0SWNvbildKVxuICAgIH0sXG4gICAgZ2VuU2VsZWN0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdjbGFzcyc6IHRoaXMuYWN0aW9uc1NlbGVjdENsYXNzZXNcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kdnVldGlmeS50KHRoaXMucm93c1BlclBhZ2VUZXh0KSxcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudChWU2VsZWN0LCB7XG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy4kdnVldGlmeS50KHRoaXMucm93c1BlclBhZ2VUZXh0KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmNvbXB1dGVkUm93c1BlclBhZ2VJdGVtcyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmNvbXB1dGVkUGFnaW5hdGlvbi5yb3dzUGVyUGFnZSxcbiAgICAgICAgICAgIGhpZGVEZXRhaWxzOiB0cnVlLFxuICAgICAgICAgICAgbWVudVByb3BzOiB7XG4gICAgICAgICAgICAgIGF1dG86IHRydWUsXG4gICAgICAgICAgICAgIGRhcms6IHRoaXMuZGFyayxcbiAgICAgICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHQsXG4gICAgICAgICAgICAgIG1pbldpZHRoOiAnNzVweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBpbnB1dDogdmFsID0+IHtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKHtcbiAgICAgICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgICAgICAgIHJvd3NQZXJQYWdlOiB2YWxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuUGFnaW5hdGlvbiAoKSB7XG4gICAgICBsZXQgcGFnaW5hdGlvbiA9ICfigJMnXG5cbiAgICAgIGlmICh0aGlzLml0ZW1zTGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHN0b3AgPSB0aGlzLml0ZW1zTGVuZ3RoIDwgdGhpcy5wYWdlU3RvcCB8fCB0aGlzLnBhZ2VTdG9wIDwgMFxuICAgICAgICAgID8gdGhpcy5pdGVtc0xlbmd0aFxuICAgICAgICAgIDogdGhpcy5wYWdlU3RvcFxuXG4gICAgICAgIHBhZ2luYXRpb24gPSB0aGlzLiRzY29wZWRTbG90cy5wYWdlVGV4dFxuICAgICAgICAgID8gdGhpcy4kc2NvcGVkU2xvdHMucGFnZVRleHQoe1xuICAgICAgICAgICAgcGFnZVN0YXJ0OiB0aGlzLnBhZ2VTdGFydCArIDEsXG4gICAgICAgICAgICBwYWdlU3RvcDogc3RvcCxcbiAgICAgICAgICAgIGl0ZW1zTGVuZ3RoOiB0aGlzLml0ZW1zTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IHRoaXMuJHZ1ZXRpZnkudCgnJHZ1ZXRpZnkuZGF0YUl0ZXJhdG9yLnBhZ2VUZXh0JyxcbiAgICAgICAgICAgIC4uLihbdGhpcy5wYWdlU3RhcnQgKyAxLCBzdG9wLCB0aGlzLml0ZW1zTGVuZ3RoXS5tYXAobiA9PiBOdW1iZXIobikudG9Mb2NhbGVTdHJpbmcodGhpcy4kdnVldGlmeS5sYW5nLmN1cnJlbnQpKSkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdjbGFzcyc6IHRoaXMuYWN0aW9uc1BhZ2luYXRpb25DbGFzc2VzXG4gICAgICB9LCBbcGFnaW5hdGlvbl0pXG4gICAgfSxcbiAgICBnZW5BY3Rpb25zICgpIHtcbiAgICAgIGNvbnN0IHJhbmdlQ29udHJvbHMgPSB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdjbGFzcyc6IHRoaXMuYWN0aW9uc1JhbmdlQ29udHJvbHNDbGFzc2VzXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuUGFnaW5hdGlvbigpLFxuICAgICAgICB0aGlzLmdlblByZXZJY29uKCksXG4gICAgICAgIHRoaXMuZ2VuTmV4dEljb24oKVxuICAgICAgXSlcblxuICAgICAgcmV0dXJuIFt0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdjbGFzcyc6IHRoaXMuYWN0aW9uc0NsYXNzZXNcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kc2xvdHNbJ2FjdGlvbnMtcHJlcGVuZCddID8gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHRoaXMuJHNsb3RzWydhY3Rpb25zLXByZXBlbmQnXSkgOiBudWxsLFxuICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMubGVuZ3RoID4gMSA/IHRoaXMuZ2VuU2VsZWN0KCkgOiBudWxsLFxuICAgICAgICByYW5nZUNvbnRyb2xzLFxuICAgICAgICB0aGlzLiRzbG90c1snYWN0aW9ucy1hcHBlbmQnXSA/IHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLiRzbG90c1snYWN0aW9ucy1hcHBlbmQnXSkgOiBudWxsXG4gICAgICBdKV1cbiAgICB9XG4gIH1cbn1cbiJdfQ==