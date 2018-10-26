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
                return items.filter(item => props.some(prop => filter(getObjectValueByPath(item, prop, item[prop]), search)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRhdGFUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRhVGFibGUvVkRhdGFUYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFBO0FBQzdDLE9BQU8sMENBQTBDLENBQUE7QUFFakQsT0FBTyxZQUFZLE1BQU0sNEJBQTRCLENBQUE7QUFFckQsT0FBTyxJQUFJLE1BQU0sZUFBZSxDQUFBO0FBQ2hDLE9BQU8sSUFBSSxNQUFNLGVBQWUsQ0FBQTtBQUNoQyxPQUFPLElBQUksTUFBTSxlQUFlLENBQUE7QUFDaEMsT0FBTyxRQUFRLE1BQU0sbUJBQW1CLENBQUE7QUFFeEMsT0FBTyxFQUNMLHNCQUFzQixFQUN0QixvQkFBb0IsRUFDckIsTUFBTSxvQkFBb0IsQ0FBQTtBQUUzQixtQ0FBbUM7QUFDbkMsTUFBTSxjQUFjLEdBQUcsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUVsRSxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxjQUFjO0lBRXBCLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7SUFFbEQsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtTQUNsQjtRQUNELGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxNQUFNO1NBQ2I7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsV0FBVyxFQUFFLE9BQU87UUFDcEIsZUFBZSxFQUFFO1lBQ2YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVB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USxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsRUFBRTthQUNoQixDQUFDO1NBQ0gsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ2QsYUFBYTtZQUNiLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtTQUN4QixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3RhYmxlcy5zdHlsJ1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fZGF0YS10YWJsZS5zdHlsJ1xuXG5pbXBvcnQgRGF0YUl0ZXJhYmxlIGZyb20gJy4uLy4uL21peGlucy9kYXRhLWl0ZXJhYmxlJ1xuXG5pbXBvcnQgSGVhZCBmcm9tICcuL21peGlucy9oZWFkJ1xuaW1wb3J0IEJvZHkgZnJvbSAnLi9taXhpbnMvYm9keSdcbmltcG9ydCBGb290IGZyb20gJy4vbWl4aW5zL2Zvb3QnXG5pbXBvcnQgUHJvZ3Jlc3MgZnJvbSAnLi9taXhpbnMvcHJvZ3Jlc3MnXG5cbmltcG9ydCB7XG4gIGNyZWF0ZVNpbXBsZUZ1bmN0aW9uYWwsXG4gIGdldE9iamVjdFZhbHVlQnlQYXRoXG59IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcblxuLy8gSW1wb3J0aW5nIGRvZXMgbm90IHdvcmsgcHJvcGVybHlcbmNvbnN0IFZUYWJsZU92ZXJmbG93ID0gY3JlYXRlU2ltcGxlRnVuY3Rpb25hbCgndi10YWJsZV9fb3ZlcmZsb3cnKVxuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1kYXRhLXRhYmxlJyxcblxuICBtaXhpbnM6IFtEYXRhSXRlcmFibGUsIEhlYWQsIEJvZHksIEZvb3QsIFByb2dyZXNzXSxcblxuICBwcm9wczoge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gW11cbiAgICB9LFxuICAgIGhlYWRlcnNMZW5ndGg6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgaGVhZGVyVGV4dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgfSxcbiAgICBoZWFkZXJLZXk6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGhpZGVIZWFkZXJzOiBCb29sZWFuLFxuICAgIHJvd3NQZXJQYWdlVGV4dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5LmRhdGFUYWJsZS5yb3dzUGVyUGFnZVRleHQnXG4gICAgfSxcbiAgICBjdXN0b21GaWx0ZXI6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogKGl0ZW1zLCBzZWFyY2gsIGZpbHRlciwgaGVhZGVycykgPT4ge1xuICAgICAgICBzZWFyY2ggPSBzZWFyY2gudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGlmIChzZWFyY2gudHJpbSgpID09PSAnJykgcmV0dXJuIGl0ZW1zXG5cbiAgICAgICAgY29uc3QgcHJvcHMgPSBoZWFkZXJzLm1hcChoID0+IGgudmFsdWUpXG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlcihpdGVtID0+IHByb3BzLnNvbWUocHJvcCA9PiBmaWx0ZXIoZ2V0T2JqZWN0VmFsdWVCeVBhdGgoaXRlbSwgcHJvcCwgaXRlbVtwcm9wXSksIHNlYXJjaCkpKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uc0NsYXNzZXM6ICd2LWRhdGF0YWJsZV9fYWN0aW9ucycsXG4gICAgICBhY3Rpb25zUmFuZ2VDb250cm9sc0NsYXNzZXM6ICd2LWRhdGF0YWJsZV9fYWN0aW9uc19fcmFuZ2UtY29udHJvbHMnLFxuICAgICAgYWN0aW9uc1NlbGVjdENsYXNzZXM6ICd2LWRhdGF0YWJsZV9fYWN0aW9uc19fc2VsZWN0JyxcbiAgICAgIGFjdGlvbnNQYWdpbmF0aW9uQ2xhc3NlczogJ3YtZGF0YXRhYmxlX19hY3Rpb25zX19wYWdpbmF0aW9uJ1xuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3YtZGF0YXRhYmxlIHYtdGFibGUnOiB0cnVlLFxuICAgICAgICAndi1kYXRhdGFibGUtLXNlbGVjdC1hbGwnOiB0aGlzLnNlbGVjdEFsbCAhPT0gZmFsc2UsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG4gICAgfSxcbiAgICBmaWx0ZXJlZEl0ZW1zICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkSXRlbXNJbXBsKHRoaXMuaGVhZGVycylcbiAgICB9LFxuICAgIGhlYWRlckNvbHVtbnMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyc0xlbmd0aCB8fCB0aGlzLmhlYWRlcnMubGVuZ3RoICsgKHRoaXMuc2VsZWN0QWxsICE9PSBmYWxzZSlcbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZCAoKSB7XG4gICAgY29uc3QgZmlyc3RTb3J0YWJsZSA9IHRoaXMuaGVhZGVycy5maW5kKGggPT4gKFxuICAgICAgISgnc29ydGFibGUnIGluIGgpIHx8IGguc29ydGFibGUpXG4gICAgKVxuXG4gICAgdGhpcy5kZWZhdWx0UGFnaW5hdGlvbi5zb3J0QnkgPSAhdGhpcy5kaXNhYmxlSW5pdGlhbFNvcnQgJiYgZmlyc3RTb3J0YWJsZVxuICAgICAgPyBmaXJzdFNvcnRhYmxlLnZhbHVlXG4gICAgICA6IG51bGxcblxuICAgIHRoaXMuaW5pdFBhZ2luYXRpb24oKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBoYXNUYWcgKGVsZW1lbnRzLCB0YWcpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGVsZW1lbnRzKSAmJiBlbGVtZW50cy5maW5kKGUgPT4gZS50YWcgPT09IHRhZylcbiAgICB9LFxuICAgIGdlblRSIChjaGlsZHJlbiwgZGF0YSA9IHt9KSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgndHInLCBkYXRhLCBjaGlsZHJlbilcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgY29uc3QgdGFibGVPdmVyZmxvdyA9IGgoVlRhYmxlT3ZlcmZsb3csIHt9LCBbXG4gICAgICBoKCd0YWJsZScsIHtcbiAgICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuVEhlYWQoKSxcbiAgICAgICAgdGhpcy5nZW5UQm9keSgpLFxuICAgICAgICB0aGlzLmdlblRGb290KClcbiAgICAgIF0pXG4gICAgXSlcblxuICAgIHJldHVybiBoKCdkaXYnLCBbXG4gICAgICB0YWJsZU92ZXJmbG93LFxuICAgICAgdGhpcy5nZW5BY3Rpb25zRm9vdGVyKClcbiAgICBdKVxuICB9XG59XG4iXX0=