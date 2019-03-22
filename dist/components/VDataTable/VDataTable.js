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
import '../../stylus/components/_tables.styl';
import '../../stylus/components/_data-table.styl';
import DataIterable from '../../mixins/data-iterable';
import Head from './mixins/head';
import Body from './mixins/body';
import Foot from './mixins/foot';
import Progress from './mixins/progress';
import { createSimpleFunctional, getObjectValueByPath } from '../../util/helpers';
// Importing does not work properly
var VTableOverflow = createSimpleFunctional('v-table__overflow');
/* @vue/component */
export default {
    name: 'v-data-table',
    mixins: [DataIterable, Head, Body, Foot, Progress],
    props: {
        headers: {
            type: Array,
            default: function () { return []; }
        },
        headersLength: {
            type: Number
        },
        headerText: {
            type: String,
            default: 'text'
        },
        headerKey: {
            type: String,
            default: null
        },
        hideHeaders: Boolean,
        rowsPerPageText: {
            type: String,
            default: '$vuetify.dataTable.rowsPerPageText'
        },
        customFilter: {
            type: Function,
            default: function (items, search, filter, headers) {
                search = search.toString().toLowerCase();
                if (search.trim() === '')
                    return items;
                var props = headers.map(function (h) { return h.value; });
                return items.filter(function (item) { return props.some(function (prop) { return filter(getObjectValueByPath(item, prop, item[prop]), search); }); });
            }
        }
    },
    data: function () {
        return {
            actionsClasses: 'v-datatable__actions',
            actionsRangeControlsClasses: 'v-datatable__actions__range-controls',
            actionsSelectClasses: 'v-datatable__actions__select',
            actionsPaginationClasses: 'v-datatable__actions__pagination'
        };
    },
    computed: {
        classes: function () {
            return __assign({ 'v-datatable v-table': true, 'v-datatable--select-all': this.selectAll !== false }, this.themeClasses);
        },
        filteredItems: function () {
            return this.filteredItemsImpl(this.headers);
        },
        headerColumns: function () {
            return this.headersLength || this.headers.length + (this.selectAll !== false);
        }
    },
    created: function () {
        var firstSortable = this.headers.find(function (h) { return (!('sortable' in h) || h.sortable); });
        this.defaultPagination.sortBy = !this.disableInitialSort && firstSortable
            ? firstSortable.value
            : null;
        this.initPagination();
    },
    methods: {
        hasTag: function (elements, tag) {
            return Array.isArray(elements) && elements.find(function (e) { return e.tag === tag; });
        },
        genTR: function (children, data) {
            if (data === void 0) { data = {}; }
            return this.$createElement('tr', data, children);
        }
    },
    render: function (h) {
        var tableOverflow = h(VTableOverflow, {}, [
            h('table', {
                'class': this.classes
            }, [
                this.genTHead(),
                this.genTBody(),
                this.genTFoot()
            ])
        ]);
        return h('div', [
            tableOverflow,
            this.genActionsFooter()
        ]);
    }
};
//# sourceMappingURL=VDataTable.js.map