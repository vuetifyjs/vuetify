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
                }, this.$scopedSlots.expand(props));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRhVGFibGUvbWl4aW5zL2JvZHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQTtBQUUzRSxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLFFBQVE7WUFDTixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFaEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMvQyxDQUFDO1FBQ0QsY0FBYyxDQUFFLEtBQUs7WUFDbkIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO1lBRW5CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO29CQUN4QyxLQUFLLEVBQUUsNkJBQTZCO29CQUNwQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUM5QixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Z0JBRW5DLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDdEI7WUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO2dCQUN6RCxLQUFLLEVBQUUseUJBQXlCO2dCQUNoQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdEMsS0FBSyxFQUFFO29CQUNMLEdBQUcsRUFBRSxJQUFJO2lCQUNWO2dCQUNELEVBQUUsRUFBRSx5QkFBeUIsQ0FBQyxtQ0FBbUMsQ0FBQzthQUNuRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBRVosT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZFLENBQUM7UUFDRCxnQkFBZ0I7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7WUFFRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7WUFDZixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRTtnQkFDekUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7Z0JBQzNDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUUxQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztvQkFDOUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUNoQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7d0JBQ3BELEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO3FCQUN6QyxDQUFDO29CQUNGLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFFUixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO29CQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2lCQUNyQjthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDO1FBQ0QsYUFBYSxDQUFFLE9BQU87WUFDcEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxPQUFPLENBQUE7YUFDZjtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNyQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDM0I7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7d0JBQzNDLEtBQUssRUFBRTs0QkFDTCxnQkFBZ0IsRUFBRSxPQUFPLE9BQU8sS0FBSyxRQUFRO3lCQUM5Qzt3QkFDRCxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtxQkFDdkMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDZDtRQUNILENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwYW5kVHJhbnNpdGlvbkdlbmVyYXRvciBmcm9tICcuLi8uLi90cmFuc2l0aW9ucy9leHBhbmQtdHJhbnNpdGlvbidcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuICAgIGdlblRCb2R5ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5nZW5JdGVtcygpXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0Ym9keScsIGNoaWxkcmVuKVxuICAgIH0sXG4gICAgZ2VuRXhwYW5kZWRSb3cgKHByb3BzKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFtdXG5cbiAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQocHJvcHMuaXRlbSkpIHtcbiAgICAgICAgY29uc3QgZXhwYW5kID0gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAndi1kYXRhdGFibGVfX2V4cGFuZC1jb250ZW50JyxcbiAgICAgICAgICBrZXk6IHByb3BzLml0ZW1bdGhpcy5pdGVtS2V5XVxuICAgICAgICB9LCB0aGlzLiRzY29wZWRTbG90cy5leHBhbmQocHJvcHMpKVxuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goZXhwYW5kKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0cmFuc2l0aW9uID0gdGhpcy4kY3JlYXRlRWxlbWVudCgndHJhbnNpdGlvbi1ncm91cCcsIHtcbiAgICAgICAgY2xhc3M6ICd2LWRhdGF0YWJsZV9fZXhwYW5kLWNvbCcsXG4gICAgICAgIGF0dHJzOiB7IGNvbHNwYW46IHRoaXMuaGVhZGVyQ29sdW1ucyB9LFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHRhZzogJ3RkJ1xuICAgICAgICB9LFxuICAgICAgICBvbjogRXhwYW5kVHJhbnNpdGlvbkdlbmVyYXRvcigndi1kYXRhdGFibGVfX2V4cGFuZC1jb2wtLWV4cGFuZGVkJylcbiAgICAgIH0sIGNoaWxkcmVuKVxuXG4gICAgICByZXR1cm4gdGhpcy5nZW5UUihbdHJhbnNpdGlvbl0sIHsgY2xhc3M6ICd2LWRhdGF0YWJsZV9fZXhwYW5kLXJvdycgfSlcbiAgICB9LFxuICAgIGdlbkZpbHRlcmVkSXRlbXMgKCkge1xuICAgICAgaWYgKCF0aGlzLiRzY29wZWRTbG90cy5pdGVtcykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCByb3dzID0gW11cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMCwgbGVuID0gdGhpcy5maWx0ZXJlZEl0ZW1zLmxlbmd0aDsgaW5kZXggPCBsZW47ICsraW5kZXgpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZmlsdGVyZWRJdGVtc1tpbmRleF1cbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLmNyZWF0ZVByb3BzKGl0ZW0sIGluZGV4KVxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLiRzY29wZWRTbG90cy5pdGVtcyhwcm9wcylcblxuICAgICAgICByb3dzLnB1c2godGhpcy5oYXNUYWcocm93LCAndGQnKVxuICAgICAgICAgID8gdGhpcy5nZW5UUihyb3csIHtcbiAgICAgICAgICAgIGtleTogdGhpcy5pdGVtS2V5ID8gcHJvcHMuaXRlbVt0aGlzLml0ZW1LZXldIDogaW5kZXgsXG4gICAgICAgICAgICBhdHRyczogeyBhY3RpdmU6IHRoaXMuaXNTZWxlY3RlZChpdGVtKSB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IHJvdylcblxuICAgICAgICBpZiAodGhpcy4kc2NvcGVkU2xvdHMuZXhwYW5kKSB7XG4gICAgICAgICAgY29uc3QgZXhwYW5kUm93ID0gdGhpcy5nZW5FeHBhbmRlZFJvdyhwcm9wcylcbiAgICAgICAgICByb3dzLnB1c2goZXhwYW5kUm93KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dzXG4gICAgfSxcbiAgICBnZW5FbXB0eUl0ZW1zIChjb250ZW50KSB7XG4gICAgICBpZiAodGhpcy5oYXNUYWcoY29udGVudCwgJ3RyJykpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNUYWcoY29udGVudCwgJ3RkJykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuVFIoY29udGVudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlblRSKFt0aGlzLiRjcmVhdGVFbGVtZW50KCd0ZCcsIHtcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgJ3RleHQteHMtY2VudGVyJzogdHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRyczogeyBjb2xzcGFuOiB0aGlzLmhlYWRlckNvbHVtbnMgfVxuICAgICAgICB9LCBjb250ZW50KV0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=