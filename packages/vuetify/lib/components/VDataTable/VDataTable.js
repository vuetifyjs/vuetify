var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import '../../../src/stylus/components/_tables.styl';
import '../../../src/stylus/components/_data-table.styl';
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
            default: function _default() {
                return [];
            }
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
            default: function _default(items, search, filter, headers) {
                search = search.toString().toLowerCase();
                if (search.trim() === '') return items;
                var props = headers.map(function (h) {
                    return h.value;
                });
                return items.filter(function (item) {
                    return props.some(function (prop) {
                        return filter(getObjectValueByPath(item, prop, item[prop]), search);
                    });
                });
            }
        }
    },
    data: function data() {
        return {
            actionsClasses: 'v-datatable__actions',
            actionsRangeControlsClasses: 'v-datatable__actions__range-controls',
            actionsSelectClasses: 'v-datatable__actions__select',
            actionsPaginationClasses: 'v-datatable__actions__pagination'
        };
    },

    computed: {
        classes: function classes() {
            return _extends({
                'v-datatable v-table': true,
                'v-datatable--select-all': this.selectAll !== false
            }, this.themeClasses);
        },
        filteredItems: function filteredItems() {
            return this.filteredItemsImpl(this.headers);
        },
        headerColumns: function headerColumns() {
            return this.headersLength || this.headers.length + (this.selectAll !== false);
        }
    },
    created: function created() {
        var firstSortable = this.headers.find(function (h) {
            return !('sortable' in h) || h.sortable;
        });
        this.defaultPagination.sortBy = !this.disableInitialSort && firstSortable ? firstSortable.value : null;
        this.initPagination();
    },

    methods: {
        hasTag: function hasTag(elements, tag) {
            return Array.isArray(elements) && elements.find(function (e) {
                return e.tag === tag;
            });
        },
        genTR: function genTR(children) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this.$createElement('tr', data, children);
        }
    },
    render: function render(h) {
        var tableOverflow = h(VTableOverflow, {}, [h('table', {
            'class': this.classes
        }, [this.genTHead(), this.genTBody(), this.genTFoot()])]);
        return h('div', [tableOverflow, this.genActionsFooter()]);
    }
};
//# sourceMappingURL=VDataTable.js.map