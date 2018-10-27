import '../../stylus/components/_tables.styl';
import '../../stylus/components/_data-table.styl';
import DataIterable from '../../mixins/data-iterable';
import Head from './mixins/head';
import Body from './mixins/body';
import Foot from './mixins/foot';
import Progress from './mixins/progress';
import { createSimpleFunctional, getObjectValueByPath } from '../../util/helpers';
// Importing does not work properly
const VTableOverflow = createSimpleFunctional('v-table__overflow');
/* @vue/component */
export default {
    name: 'v-data-table',
    mixins: [DataIterable, Head, Body, Foot, Progress],
    props: {
        headers: {
            type: Array,
            default: () => []
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
            default: (items, search, filter, headers) => {
                search = search.toString().toLowerCase();
                if (search.trim() === '')
                    return items;
                const props = headers.map(h => h.value);
                return items.filter(item => props.some(prop => filter(getObjectValueByPath(item, prop), search)));
            }
        }
    },
    data() {
        return {
            actionsClasses: 'v-datatable__actions',
            actionsRangeControlsClasses: 'v-datatable__actions__range-controls',
            actionsSelectClasses: 'v-datatable__actions__select',
            actionsPaginationClasses: 'v-datatable__actions__pagination'
        };
    },
    computed: {
        classes() {
            return {
                'v-datatable v-table': true,
                'v-datatable--select-all': this.selectAll !== false,
                ...this.themeClasses
            };
        },
        filteredItems() {
            return this.filteredItemsImpl(this.headers);
        },
        headerColumns() {
            return this.headersLength || this.headers.length + (this.selectAll !== false);
        }
    },
    created() {
        const firstSortable = this.headers.find(h => (!('sortable' in h) || h.sortable));
        this.defaultPagination.sortBy = !this.disableInitialSort && firstSortable
            ? firstSortable.value
            : null;
        this.initPagination();
    },
    methods: {
        hasTag(elements, tag) {
            return Array.isArray(elements) && elements.find(e => e.tag === tag);
        },
        genTR(children, data = {}) {
            return this.$createElement('tr', data, children);
        }
    },
    render(h) {
        const tableOverflow = h(VTableOverflow, {}, [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRhdGFUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRhVGFibGUvVkRhdGFUYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFBO0FBQzdDLE9BQU8sMENBQTBDLENBQUE7QUFFakQsT0FBTyxZQUFZLE1BQU0sNEJBQTRCLENBQUE7QUFFckQsT0FBTyxJQUFJLE1BQU0sZUFBZSxDQUFBO0FBQ2hDLE9BQU8sSUFBSSxNQUFNLGVBQWUsQ0FBQTtBQUNoQyxPQUFPLElBQUksTUFBTSxlQUFlLENBQUE7QUFDaEMsT0FBTyxRQUFRLE1BQU0sbUJBQW1CLENBQUE7QUFFeEMsT0FBTyxFQUNMLHNCQUFzQixFQUN0QixvQkFBb0IsRUFDckIsTUFBTSxvQkFBb0IsQ0FBQTtBQUUzQixtQ0FBbUM7QUFDbkMsTUFBTSxjQUFjLEdBQUcsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUVsRSxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxjQUFjO0lBRXBCLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7SUFFbEQsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtTQUNsQjtRQUNELGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxNQUFNO1NBQ2I7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsV0FBVyxFQUFFLE9BQU87UUFDcEIsZUFBZSxFQUFFO1lBQ2YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVB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QVEsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxFQUFFO2FBQ2hCLENBQUM7U0FDSCxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDZCxhQUFhO1lBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fdGFibGVzLnN0eWwnXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19kYXRhLXRhYmxlLnN0eWwnXG5cbmltcG9ydCBEYXRhSXRlcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2RhdGEtaXRlcmFibGUnXG5cbmltcG9ydCBIZWFkIGZyb20gJy4vbWl4aW5zL2hlYWQnXG5pbXBvcnQgQm9keSBmcm9tICcuL21peGlucy9ib2R5J1xuaW1wb3J0IEZvb3QgZnJvbSAnLi9taXhpbnMvZm9vdCdcbmltcG9ydCBQcm9ncmVzcyBmcm9tICcuL21peGlucy9wcm9ncmVzcydcblxuaW1wb3J0IHtcbiAgY3JlYXRlU2ltcGxlRnVuY3Rpb25hbCxcbiAgZ2V0T2JqZWN0VmFsdWVCeVBhdGhcbn0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vLyBJbXBvcnRpbmcgZG9lcyBub3Qgd29yayBwcm9wZXJseVxuY29uc3QgVlRhYmxlT3ZlcmZsb3cgPSBjcmVhdGVTaW1wbGVGdW5jdGlvbmFsKCd2LXRhYmxlX19vdmVyZmxvdycpXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWRhdGEtdGFibGUnLFxuXG4gIG1peGluczogW0RhdGFJdGVyYWJsZSwgSGVhZCwgQm9keSwgRm9vdCwgUHJvZ3Jlc3NdLFxuXG4gIHByb3BzOiB7XG4gICAgaGVhZGVyczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICAgIH0sXG4gICAgaGVhZGVyc0xlbmd0aDoge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBoZWFkZXJUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndGV4dCdcbiAgICB9LFxuICAgIGhlYWRlcktleToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgaGlkZUhlYWRlcnM6IEJvb2xlYW4sXG4gICAgcm93c1BlclBhZ2VUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuZGF0YVRhYmxlLnJvd3NQZXJQYWdlVGV4dCdcbiAgICB9LFxuICAgIGN1c3RvbUZpbHRlcjoge1xuICAgICAgdHlwZTogRnVuY3Rpb24sXG4gICAgICBkZWZhdWx0OiAoaXRlbXMsIHNlYXJjaCwgZmlsdGVyLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgIHNlYXJjaCA9IHNlYXJjaC50b1N0cmluZygpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgaWYgKHNlYXJjaC50cmltKCkgPT09ICcnKSByZXR1cm4gaXRlbXNcblxuICAgICAgICBjb25zdCBwcm9wcyA9IGhlYWRlcnMubWFwKGggPT4gaC52YWx1ZSlcblxuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKGl0ZW0gPT4gcHJvcHMuc29tZShwcm9wID0+IGZpbHRlcihnZXRPYmplY3RWYWx1ZUJ5UGF0aChpdGVtLCBwcm9wKSwgc2VhcmNoKSkpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3Rpb25zQ2xhc3NlczogJ3YtZGF0YXRhYmxlX19hY3Rpb25zJyxcbiAgICAgIGFjdGlvbnNSYW5nZUNvbnRyb2xzQ2xhc3NlczogJ3YtZGF0YXRhYmxlX19hY3Rpb25zX19yYW5nZS1jb250cm9scycsXG4gICAgICBhY3Rpb25zU2VsZWN0Q2xhc3NlczogJ3YtZGF0YXRhYmxlX19hY3Rpb25zX19zZWxlY3QnLFxuICAgICAgYWN0aW9uc1BhZ2luYXRpb25DbGFzc2VzOiAndi1kYXRhdGFibGVfX2FjdGlvbnNfX3BhZ2luYXRpb24nXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1kYXRhdGFibGUgdi10YWJsZSc6IHRydWUsXG4gICAgICAgICd2LWRhdGF0YWJsZS0tc2VsZWN0LWFsbCc6IHRoaXMuc2VsZWN0QWxsICE9PSBmYWxzZSxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH1cbiAgICB9LFxuICAgIGZpbHRlcmVkSXRlbXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRJdGVtc0ltcGwodGhpcy5oZWFkZXJzKVxuICAgIH0sXG4gICAgaGVhZGVyQ29sdW1ucyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oZWFkZXJzTGVuZ3RoIHx8IHRoaXMuaGVhZGVycy5sZW5ndGggKyAodGhpcy5zZWxlY3RBbGwgIT09IGZhbHNlKVxuICAgIH1cbiAgfSxcblxuICBjcmVhdGVkICgpIHtcbiAgICBjb25zdCBmaXJzdFNvcnRhYmxlID0gdGhpcy5oZWFkZXJzLmZpbmQoaCA9PiAoXG4gICAgICAhKCdzb3J0YWJsZScgaW4gaCkgfHwgaC5zb3J0YWJsZSlcbiAgICApXG5cbiAgICB0aGlzLmRlZmF1bHRQYWdpbmF0aW9uLnNvcnRCeSA9ICF0aGlzLmRpc2FibGVJbml0aWFsU29ydCAmJiBmaXJzdFNvcnRhYmxlXG4gICAgICA/IGZpcnN0U29ydGFibGUudmFsdWVcbiAgICAgIDogbnVsbFxuXG4gICAgdGhpcy5pbml0UGFnaW5hdGlvbigpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGhhc1RhZyAoZWxlbWVudHMsIHRhZykge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZWxlbWVudHMpICYmIGVsZW1lbnRzLmZpbmQoZSA9PiBlLnRhZyA9PT0gdGFnKVxuICAgIH0sXG4gICAgZ2VuVFIgKGNoaWxkcmVuLCBkYXRhID0ge30pIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cicsIGRhdGEsIGNoaWxkcmVuKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCB0YWJsZU92ZXJmbG93ID0gaChWVGFibGVPdmVyZmxvdywge30sIFtcbiAgICAgIGgoJ3RhYmxlJywge1xuICAgICAgICAnY2xhc3MnOiB0aGlzLmNsYXNzZXNcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5USGVhZCgpLFxuICAgICAgICB0aGlzLmdlblRCb2R5KCksXG4gICAgICAgIHRoaXMuZ2VuVEZvb3QoKVxuICAgICAgXSlcbiAgICBdKVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIFtcbiAgICAgIHRhYmxlT3ZlcmZsb3csXG4gICAgICB0aGlzLmdlbkFjdGlvbnNGb290ZXIoKVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==