import ExpandTransitionGenerator from '../../transitions/expand-transition';
/* @vue/component */
export default {
    methods: {
        genTBody() {
            const children = this.genItems();
            return this.$createElement('tbody', children);
        },
        genExpandedRow(props) {
            const children = [];
            if (this.isExpanded(props.item)) {
                const expand = this.$createElement('div', {
                    class: 'v-datatable__expand-content',
                    key: props.item[this.itemKey]
                }, [this.$scopedSlots.expand(props)]);
                children.push(expand);
            }
            const transition = this.$createElement('transition-group', {
                class: 'v-datatable__expand-col',
                attrs: { colspan: this.headerColumns },
                props: {
                    tag: 'td'
                },
                on: ExpandTransitionGenerator('v-datatable__expand-col--expanded')
            }, children);
            return this.genTR([transition], { class: 'v-datatable__expand-row' });
        },
        genFilteredItems() {
            if (!this.$scopedSlots.items) {
                return null;
            }
            const rows = [];
            for (let index = 0, len = this.filteredItems.length; index < len; ++index) {
                const item = this.filteredItems[index];
                const props = this.createProps(item, index);
                const row = this.$scopedSlots.items(props);
                rows.push(this.hasTag(row, 'td')
                    ? this.genTR(row, {
                        key: this.itemKey ? props.item[this.itemKey] : index,
                        attrs: { active: this.isSelected(item) }
                    })
                    : row);
                if (this.$scopedSlots.expand) {
                    const expandRow = this.genExpandedRow(props);
                    rows.push(expandRow);
                }
            }
            return rows;
        },
        genEmptyItems(content) {
            if (this.hasTag(content, 'tr')) {
                return content;
            }
            else if (this.hasTag(content, 'td')) {
                return this.genTR(content);
            }
            else {
                return this.genTR([this.$createElement('td', {
                        class: {
                            'text-xs-center': typeof content === 'string'
                        },
                        attrs: { colspan: this.headerColumns }
                    }, content)]);
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRhVGFibGUvbWl4aW5zL2JvZHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQTtBQUUzRSxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLFFBQVE7WUFDTixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFaEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMvQyxDQUFDO1FBQ0QsY0FBYyxDQUFFLEtBQUs7WUFDbkIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO1lBRW5CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO29CQUN4QyxLQUFLLEVBQUUsNkJBQTZCO29CQUNwQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUM5QixFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUVyQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ3RCO1lBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekQsS0FBSyxFQUFFLHlCQUF5QjtnQkFDaEMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RDLEtBQUssRUFBRTtvQkFDTCxHQUFHLEVBQUUsSUFBSTtpQkFDVjtnQkFDRCxFQUFFLEVBQUUseUJBQXlCLENBQUMsbUNBQW1DLENBQUM7YUFDbkUsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUVaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFLENBQUMsQ0FBQTtRQUN2RSxDQUFDO1FBQ0QsZ0JBQWdCO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQTthQUNaO1lBRUQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFBO1lBQ2YsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssR0FBRyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUU7Z0JBQ3pFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO2dCQUMzQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFFMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7b0JBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDaEIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO3dCQUNwRCxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtxQkFDekMsQ0FBQztvQkFDRixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBRVIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtvQkFDNUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtpQkFDckI7YUFDRjtZQUVELE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUNELGFBQWEsQ0FBRSxPQUFPO1lBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sT0FBTyxDQUFBO2FBQ2Y7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDckMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQzNCO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFO3dCQUMzQyxLQUFLLEVBQUU7NEJBQ0wsZ0JBQWdCLEVBQUUsT0FBTyxPQUFPLEtBQUssUUFBUTt5QkFDOUM7d0JBQ0QsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7cUJBQ3ZDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ2Q7UUFDSCxDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cGFuZFRyYW5zaXRpb25HZW5lcmF0b3IgZnJvbSAnLi4vLi4vdHJhbnNpdGlvbnMvZXhwYW5kLXRyYW5zaXRpb24nXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICBnZW5UQm9keSAoKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZ2VuSXRlbXMoKVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgndGJvZHknLCBjaGlsZHJlbilcbiAgICB9LFxuICAgIGdlbkV4cGFuZGVkUm93IChwcm9wcykge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXVxuXG4gICAgICBpZiAodGhpcy5pc0V4cGFuZGVkKHByb3BzLml0ZW0pKSB7XG4gICAgICAgIGNvbnN0IGV4cGFuZCA9IHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3YtZGF0YXRhYmxlX19leHBhbmQtY29udGVudCcsXG4gICAgICAgICAga2V5OiBwcm9wcy5pdGVtW3RoaXMuaXRlbUtleV1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmV4cGFuZChwcm9wcyldKVxuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goZXhwYW5kKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0cmFuc2l0aW9uID0gdGhpcy4kY3JlYXRlRWxlbWVudCgndHJhbnNpdGlvbi1ncm91cCcsIHtcbiAgICAgICAgY2xhc3M6ICd2LWRhdGF0YWJsZV9fZXhwYW5kLWNvbCcsXG4gICAgICAgIGF0dHJzOiB7IGNvbHNwYW46IHRoaXMuaGVhZGVyQ29sdW1ucyB9LFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHRhZzogJ3RkJ1xuICAgICAgICB9LFxuICAgICAgICBvbjogRXhwYW5kVHJhbnNpdGlvbkdlbmVyYXRvcigndi1kYXRhdGFibGVfX2V4cGFuZC1jb2wtLWV4cGFuZGVkJylcbiAgICAgIH0sIGNoaWxkcmVuKVxuXG4gICAgICByZXR1cm4gdGhpcy5nZW5UUihbdHJhbnNpdGlvbl0sIHsgY2xhc3M6ICd2LWRhdGF0YWJsZV9fZXhwYW5kLXJvdycgfSlcbiAgICB9LFxuICAgIGdlbkZpbHRlcmVkSXRlbXMgKCkge1xuICAgICAgaWYgKCF0aGlzLiRzY29wZWRTbG90cy5pdGVtcykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCByb3dzID0gW11cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMCwgbGVuID0gdGhpcy5maWx0ZXJlZEl0ZW1zLmxlbmd0aDsgaW5kZXggPCBsZW47ICsraW5kZXgpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZmlsdGVyZWRJdGVtc1tpbmRleF1cbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLmNyZWF0ZVByb3BzKGl0ZW0sIGluZGV4KVxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLiRzY29wZWRTbG90cy5pdGVtcyhwcm9wcylcblxuICAgICAgICByb3dzLnB1c2godGhpcy5oYXNUYWcocm93LCAndGQnKVxuICAgICAgICAgID8gdGhpcy5nZW5UUihyb3csIHtcbiAgICAgICAgICAgIGtleTogdGhpcy5pdGVtS2V5ID8gcHJvcHMuaXRlbVt0aGlzLml0ZW1LZXldIDogaW5kZXgsXG4gICAgICAgICAgICBhdHRyczogeyBhY3RpdmU6IHRoaXMuaXNTZWxlY3RlZChpdGVtKSB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IHJvdylcblxuICAgICAgICBpZiAodGhpcy4kc2NvcGVkU2xvdHMuZXhwYW5kKSB7XG4gICAgICAgICAgY29uc3QgZXhwYW5kUm93ID0gdGhpcy5nZW5FeHBhbmRlZFJvdyhwcm9wcylcbiAgICAgICAgICByb3dzLnB1c2goZXhwYW5kUm93KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dzXG4gICAgfSxcbiAgICBnZW5FbXB0eUl0ZW1zIChjb250ZW50KSB7XG4gICAgICBpZiAodGhpcy5oYXNUYWcoY29udGVudCwgJ3RyJykpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNUYWcoY29udGVudCwgJ3RkJykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuVFIoY29udGVudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlblRSKFt0aGlzLiRjcmVhdGVFbGVtZW50KCd0ZCcsIHtcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgJ3RleHQteHMtY2VudGVyJzogdHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRyczogeyBjb2xzcGFuOiB0aGlzLmhlYWRlckNvbHVtbnMgfVxuICAgICAgICB9LCBjb250ZW50KV0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=