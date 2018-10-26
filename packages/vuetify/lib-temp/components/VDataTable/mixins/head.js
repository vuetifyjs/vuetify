import { consoleWarn } from '../../../util/console';
import VCheckbox from '../../VCheckbox';
import VIcon from '../../VIcon';
/* @vue/component */
export default {
    props: {
        sortIcon: {
            type: String,
            default: '$vuetify.icons.sort'
        }
    },
    methods: {
        genTHead() {
            if (this.hideHeaders)
                return; // Exit Early since no headers are needed.
            let children = [];
            if (this.$scopedSlots.headers) {
                const row = this.$scopedSlots.headers({
                    headers: this.headers,
                    indeterminate: this.indeterminate,
                    all: this.everyItem
                });
                children = [this.hasTag(row, 'th') ? this.genTR(row) : row, this.genTProgress()];
            }
            else {
                const row = this.headers.map((o, i) => this.genHeader(o, this.headerKey ? o[this.headerKey] : i));
                const checkbox = this.$createElement(VCheckbox, {
                    props: {
                        dark: this.dark,
                        light: this.light,
                        color: this.selectAll === true ? '' : this.selectAll,
                        hideDetails: true,
                        inputValue: this.everyItem,
                        indeterminate: this.indeterminate
                    },
                    on: { change: this.toggle }
                });
                this.hasSelectAll && row.unshift(this.$createElement('th', [checkbox]));
                children = [this.genTR(row), this.genTProgress()];
            }
            return this.$createElement('thead', [children]);
        },
        genHeader(header, key) {
            const array = [
                this.$scopedSlots.headerCell
                    ? this.$scopedSlots.headerCell({ header })
                    : header[this.headerText]
            ];
            return this.$createElement('th', ...this.genHeaderData(header, array, key));
        },
        genHeaderData(header, children, key) {
            const classes = ['column'];
            const data = {
                key,
                attrs: {
                    role: 'columnheader',
                    scope: 'col',
                    width: header.width || null,
                    'aria-label': header[this.headerText] || '',
                    'aria-sort': 'none'
                }
            };
            if (header.sortable == null || header.sortable) {
                this.genHeaderSortingData(header, children, data, classes);
            }
            else {
                data.attrs['aria-label'] += ': Not sorted.'; // TODO: Localization
            }
            classes.push(`text-xs-${header.align || 'left'}`);
            if (Array.isArray(header.class)) {
                classes.push(...header.class);
            }
            else if (header.class) {
                classes.push(header.class);
            }
            data.class = classes;
            return [data, children];
        },
        genHeaderSortingData(header, children, data, classes) {
            if (!('value' in header)) {
                consoleWarn('Headers must have a value property that corresponds to a value in the v-model array', this);
            }
            data.attrs.tabIndex = 0;
            data.on = {
                click: () => {
                    this.expanded = {};
                    this.sort(header.value);
                },
                keydown: e => {
                    // check for space
                    if (e.keyCode === 32) {
                        e.preventDefault();
                        this.sort(header.value);
                    }
                }
            };
            classes.push('sortable');
            const icon = this.$createElement(VIcon, {
                props: {
                    small: true
                }
            }, this.sortIcon);
            if (!header.align || header.align === 'left') {
                children.push(icon);
            }
            else {
                children.unshift(icon);
            }
            const pagination = this.computedPagination;
            const beingSorted = pagination.sortBy === header.value;
            if (beingSorted) {
                classes.push('active');
                if (pagination.descending) {
                    classes.push('desc');
                    data.attrs['aria-sort'] = 'descending';
                    data.attrs['aria-label'] += ': Sorted descending. Activate to remove sorting.'; // TODO: Localization
                }
                else {
                    classes.push('asc');
                    data.attrs['aria-sort'] = 'ascending';
                    data.attrs['aria-label'] += ': Sorted ascending. Activate to sort descending.'; // TODO: Localization
                }
            }
            else {
                data.attrs['aria-label'] += ': Not sorted. Activate to sort ascending.'; // TODO: Localization
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRhVGFibGUvbWl4aW5zL2hlYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFBO0FBRW5ELE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFBO0FBQ3ZDLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUUvQixvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLHFCQUFxQjtTQUMvQjtLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsUUFBUTtZQUNOLElBQUksSUFBSSxDQUFDLFdBQVc7Z0JBQUUsT0FBTSxDQUFDLDBDQUEwQztZQUV2RSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7WUFFakIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtnQkFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7b0JBQ3BDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO29CQUNqQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQ3BCLENBQUMsQ0FBQTtnQkFFRixRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFBO2FBQ2pGO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENB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Y29uc29sZSdcblxuaW1wb3J0IFZDaGVja2JveCBmcm9tICcuLi8uLi9WQ2hlY2tib3gnXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vLi4vVkljb24nXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgc29ydEljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5zb3J0J1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuVEhlYWQgKCkge1xuICAgICAgaWYgKHRoaXMuaGlkZUhlYWRlcnMpIHJldHVybiAvLyBFeGl0IEVhcmx5IHNpbmNlIG5vIGhlYWRlcnMgYXJlIG5lZWRlZC5cblxuICAgICAgbGV0IGNoaWxkcmVuID0gW11cblxuICAgICAgaWYgKHRoaXMuJHNjb3BlZFNsb3RzLmhlYWRlcnMpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy4kc2NvcGVkU2xvdHMuaGVhZGVycyh7XG4gICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IHRoaXMuaW5kZXRlcm1pbmF0ZSxcbiAgICAgICAgICBhbGw6IHRoaXMuZXZlcnlJdGVtXG4gICAgICAgIH0pXG5cbiAgICAgICAgY2hpbGRyZW4gPSBbdGhpcy5oYXNUYWcocm93LCAndGgnKSA/IHRoaXMuZ2VuVFIocm93KSA6IHJvdywgdGhpcy5nZW5UUHJvZ3Jlc3MoKV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuaGVhZGVycy5tYXAoKG8sIGkpID0+IHRoaXMuZ2VuSGVhZGVyKG8sIHRoaXMuaGVhZGVyS2V5ID8gb1t0aGlzLmhlYWRlcktleV0gOiBpKSlcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSB0aGlzLiRjcmVhdGVFbGVtZW50KFZDaGVja2JveCwge1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBkYXJrOiB0aGlzLmRhcmssXG4gICAgICAgICAgICBsaWdodDogdGhpcy5saWdodCxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLnNlbGVjdEFsbCA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5zZWxlY3RBbGwsXG4gICAgICAgICAgICBoaWRlRGV0YWlsczogdHJ1ZSxcbiAgICAgICAgICAgIGlucHV0VmFsdWU6IHRoaXMuZXZlcnlJdGVtLFxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogdGhpcy5pbmRldGVybWluYXRlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbjogeyBjaGFuZ2U6IHRoaXMudG9nZ2xlIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmhhc1NlbGVjdEFsbCAmJiByb3cudW5zaGlmdCh0aGlzLiRjcmVhdGVFbGVtZW50KCd0aCcsIFtjaGVja2JveF0pKVxuXG4gICAgICAgIGNoaWxkcmVuID0gW3RoaXMuZ2VuVFIocm93KSwgdGhpcy5nZW5UUHJvZ3Jlc3MoKV1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RoZWFkJywgW2NoaWxkcmVuXSlcbiAgICB9LFxuICAgIGdlbkhlYWRlciAoaGVhZGVyLCBrZXkpIHtcbiAgICAgIGNvbnN0IGFycmF5ID0gW1xuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXJDZWxsXG4gICAgICAgICAgPyB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXJDZWxsKHsgaGVhZGVyIH0pXG4gICAgICAgICAgOiBoZWFkZXJbdGhpcy5oZWFkZXJUZXh0XVxuICAgICAgXVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgndGgnLCAuLi50aGlzLmdlbkhlYWRlckRhdGEoaGVhZGVyLCBhcnJheSwga2V5KSlcbiAgICB9LFxuICAgIGdlbkhlYWRlckRhdGEgKGhlYWRlciwgY2hpbGRyZW4sIGtleSkge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IFsnY29sdW1uJ11cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGtleSxcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICByb2xlOiAnY29sdW1uaGVhZGVyJyxcbiAgICAgICAgICBzY29wZTogJ2NvbCcsXG4gICAgICAgICAgd2lkdGg6IGhlYWRlci53aWR0aCB8fCBudWxsLFxuICAgICAgICAgICdhcmlhLWxhYmVsJzogaGVhZGVyW3RoaXMuaGVhZGVyVGV4dF0gfHwgJycsXG4gICAgICAgICAgJ2FyaWEtc29ydCc6ICdub25lJ1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWFkZXIuc29ydGFibGUgPT0gbnVsbCB8fCBoZWFkZXIuc29ydGFibGUpIHtcbiAgICAgICAgdGhpcy5nZW5IZWFkZXJTb3J0aW5nRGF0YShoZWFkZXIsIGNoaWxkcmVuLCBkYXRhLCBjbGFzc2VzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YS5hdHRyc1snYXJpYS1sYWJlbCddICs9ICc6IE5vdCBzb3J0ZWQuJyAvLyBUT0RPOiBMb2NhbGl6YXRpb25cbiAgICAgIH1cblxuICAgICAgY2xhc3Nlcy5wdXNoKGB0ZXh0LXhzLSR7aGVhZGVyLmFsaWduIHx8ICdsZWZ0J31gKVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVyLmNsYXNzKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goLi4uaGVhZGVyLmNsYXNzKVxuICAgICAgfSBlbHNlIGlmIChoZWFkZXIuY2xhc3MpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGhlYWRlci5jbGFzcylcbiAgICAgIH1cbiAgICAgIGRhdGEuY2xhc3MgPSBjbGFzc2VzXG5cbiAgICAgIHJldHVybiBbZGF0YSwgY2hpbGRyZW5dXG4gICAgfSxcbiAgICBnZW5IZWFkZXJTb3J0aW5nRGF0YSAoaGVhZGVyLCBjaGlsZHJlbiwgZGF0YSwgY2xhc3Nlcykge1xuICAgICAgaWYgKCEoJ3ZhbHVlJyBpbiBoZWFkZXIpKSB7XG4gICAgICAgIGNvbnNvbGVXYXJuKCdIZWFkZXJzIG11c3QgaGF2ZSBhIHZhbHVlIHByb3BlcnR5IHRoYXQgY29ycmVzcG9uZHMgdG8gYSB2YWx1ZSBpbiB0aGUgdi1tb2RlbCBhcnJheScsIHRoaXMpXG4gICAgICB9XG5cbiAgICAgIGRhdGEuYXR0cnMudGFiSW5kZXggPSAwXG4gICAgICBkYXRhLm9uID0ge1xuICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSB7fVxuICAgICAgICAgIHRoaXMuc29ydChoZWFkZXIudmFsdWUpXG4gICAgICAgIH0sXG4gICAgICAgIGtleWRvd246IGUgPT4ge1xuICAgICAgICAgIC8vIGNoZWNrIGZvciBzcGFjZVxuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIHRoaXMuc29ydChoZWFkZXIudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNsYXNzZXMucHVzaCgnc29ydGFibGUnKVxuICAgICAgY29uc3QgaWNvbiA9IHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkljb24sIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBzbWFsbDogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLnNvcnRJY29uKVxuICAgICAgaWYgKCFoZWFkZXIuYWxpZ24gfHwgaGVhZGVyLmFsaWduID09PSAnbGVmdCcpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChpY29uKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGRyZW4udW5zaGlmdChpY29uKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gdGhpcy5jb21wdXRlZFBhZ2luYXRpb25cbiAgICAgIGNvbnN0IGJlaW5nU29ydGVkID0gcGFnaW5hdGlvbi5zb3J0QnkgPT09IGhlYWRlci52YWx1ZVxuICAgICAgaWYgKGJlaW5nU29ydGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnYWN0aXZlJylcbiAgICAgICAgaWYgKHBhZ2luYXRpb24uZGVzY2VuZGluZykge1xuICAgICAgICAgIGNsYXNzZXMucHVzaCgnZGVzYycpXG4gICAgICAgICAgZGF0YS5hdHRyc1snYXJpYS1zb3J0J10gPSAnZGVzY2VuZGluZydcbiAgICAgICAgICBkYXRhLmF0dHJzWydhcmlhLWxhYmVsJ10gKz0gJzogU29ydGVkIGRlc2NlbmRpbmcuIEFjdGl2YXRlIHRvIHJlbW92ZSBzb3J0aW5nLicgLy8gVE9ETzogTG9jYWxpemF0aW9uXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xhc3Nlcy5wdXNoKCdhc2MnKVxuICAgICAgICAgIGRhdGEuYXR0cnNbJ2FyaWEtc29ydCddID0gJ2FzY2VuZGluZydcbiAgICAgICAgICBkYXRhLmF0dHJzWydhcmlhLWxhYmVsJ10gKz0gJzogU29ydGVkIGFzY2VuZGluZy4gQWN0aXZhdGUgdG8gc29ydCBkZXNjZW5kaW5nLicgLy8gVE9ETzogTG9jYWxpemF0aW9uXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEuYXR0cnNbJ2FyaWEtbGFiZWwnXSArPSAnOiBOb3Qgc29ydGVkLiBBY3RpdmF0ZSB0byBzb3J0IGFzY2VuZGluZy4nIC8vIFRPRE86IExvY2FsaXphdGlvblxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19