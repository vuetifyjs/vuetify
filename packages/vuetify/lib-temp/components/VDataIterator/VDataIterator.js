import '../../stylus/components/_data-iterator.styl';
import DataIterable from '../../mixins/data-iterable';
/* @vue/component */
export default {
    name: 'v-data-iterator',
    mixins: [DataIterable],
    inheritAttrs: false,
    props: {
        contentTag: {
            type: String,
            default: 'div'
        },
        contentProps: {
            type: Object,
            required: false
        },
        contentClass: {
            type: String,
            required: false
        }
    },
    computed: {
        classes() {
            return {
                'v-data-iterator': true,
                'v-data-iterator--select-all': this.selectAll !== false,
                ...this.themeClasses
            };
        }
    },
    created() {
        this.initPagination();
    },
    methods: {
        genContent() {
            const children = this.genItems();
            const data = {
                'class': this.contentClass,
                attrs: this.$attrs,
                on: this.$listeners,
                props: this.contentProps
            };
            return this.$createElement(this.contentTag, data, children);
        },
        genEmptyItems(content) {
            return [this.$createElement('div', {
                    'class': 'text-xs-center',
                    style: 'width: 100%'
                }, content)];
        },
        genFilteredItems() {
            if (!this.$scopedSlots.item) {
                return null;
            }
            const items = [];
            for (let index = 0, len = this.filteredItems.length; index < len; ++index) {
                const item = this.filteredItems[index];
                const props = this.createProps(item, index);
                items.push(this.$scopedSlots.item(props));
            }
            return items;
        },
        genFooter() {
            const children = [];
            if (this.$slots.footer) {
                children.push(this.$slots.footer);
            }
            if (!this.hideActions) {
                children.push(this.genActions());
            }
            if (!children.length)
                return null;
            return this.$createElement('div', children);
        },
        genHeader() {
            const children = [];
            if (this.$slots.header) {
                children.push(this.$slots.header);
            }
            if (!children.length)
                return null;
            return this.$createElement('div', children);
        }
    },
    render(h) {
        return h('div', {
            'class': this.classes
        }, [
            this.genHeader(),
            this.genContent(),
            this.genFooter()
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRhdGFJdGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEYXRhSXRlcmF0b3IvVkRhdGFJdGVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDZDQUE2QyxDQUFBO0FBRXBELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFBO0FBRXJELG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLGlCQUFpQjtJQUV2QixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFFdEIsWUFBWSxFQUFFLEtBQUs7SUFFbkIsS0FBSyxFQUFFO1FBQ0wsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsS0FBSztTQUNoQjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLEtBQUs7U0FDaEI7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxPQUFPO2dCQUNMLGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLDZCQUE2QixFQUFFLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSztnQkFDdkQsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNyQixDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUQsT0FBTyxFQUFFO1FBQ1AsVUFBVTtZQUNSLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUVoQyxNQUFNLElBQUksR0FBRztnQkFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbEIsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDekIsQ0FBQTtZQUVELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM3RCxDQUFDO1FBQ0QsYUFBYSxDQUFFLE9BQU87WUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO29CQUNqQyxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsYUFBYTtpQkFDckIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ2QsQ0FBQztRQUNELGdCQUFnQjtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtnQkFDM0IsT0FBTyxJQUFJLENBQUE7YUFDWjtZQUVELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQTtZQUNoQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRTtnQkFDekUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7Z0JBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTthQUMxQztZQUVELE9BQU8sS0FBSyxDQUFBO1FBQ2QsQ0FBQztRQUNELFNBQVM7WUFDUCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7WUFFbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ2xDO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7YUFDakM7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxJQUFJLENBQUE7WUFDakMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM3QyxDQUFDO1FBQ0QsU0FBUztZQUNQLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQTtZQUVuQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDbEM7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxJQUFJLENBQUE7WUFDakMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUM3QyxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixFQUFFO1lBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUU7U0FDakIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19kYXRhLWl0ZXJhdG9yLnN0eWwnXG5cbmltcG9ydCBEYXRhSXRlcmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2RhdGEtaXRlcmFibGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWRhdGEtaXRlcmF0b3InLFxuXG4gIG1peGluczogW0RhdGFJdGVyYWJsZV0sXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIGNvbnRlbnRUYWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcbiAgICBjb250ZW50UHJvcHM6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH0sXG4gICAgY29udGVudENsYXNzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWRhdGEtaXRlcmF0b3InOiB0cnVlLFxuICAgICAgICAndi1kYXRhLWl0ZXJhdG9yLS1zZWxlY3QtYWxsJzogdGhpcy5zZWxlY3RBbGwgIT09IGZhbHNlLFxuICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjcmVhdGVkICgpIHtcbiAgICB0aGlzLmluaXRQYWdpbmF0aW9uKClcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuQ29udGVudCAoKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZ2VuSXRlbXMoKVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAnY2xhc3MnOiB0aGlzLmNvbnRlbnRDbGFzcyxcbiAgICAgICAgYXR0cnM6IHRoaXMuJGF0dHJzLFxuICAgICAgICBvbjogdGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICBwcm9wczogdGhpcy5jb250ZW50UHJvcHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQodGhpcy5jb250ZW50VGFnLCBkYXRhLCBjaGlsZHJlbilcbiAgICB9LFxuICAgIGdlbkVtcHR5SXRlbXMgKGNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBbdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAnY2xhc3MnOiAndGV4dC14cy1jZW50ZXInLFxuICAgICAgICBzdHlsZTogJ3dpZHRoOiAxMDAlJ1xuICAgICAgfSwgY29udGVudCldXG4gICAgfSxcbiAgICBnZW5GaWx0ZXJlZEl0ZW1zICgpIHtcbiAgICAgIGlmICghdGhpcy4kc2NvcGVkU2xvdHMuaXRlbSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtcyA9IFtdXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDAsIGxlbiA9IHRoaXMuZmlsdGVyZWRJdGVtcy5sZW5ndGg7IGluZGV4IDwgbGVuOyArK2luZGV4KSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmZpbHRlcmVkSXRlbXNbaW5kZXhdXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5jcmVhdGVQcm9wcyhpdGVtLCBpbmRleClcbiAgICAgICAgaXRlbXMucHVzaCh0aGlzLiRzY29wZWRTbG90cy5pdGVtKHByb3BzKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW1zXG4gICAgfSxcbiAgICBnZW5Gb290ZXIgKCkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXVxuXG4gICAgICBpZiAodGhpcy4kc2xvdHMuZm9vdGVyKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2godGhpcy4kc2xvdHMuZm9vdGVyKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGlkZUFjdGlvbnMpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLmdlbkFjdGlvbnMoKSlcbiAgICAgIH1cblxuICAgICAgaWYgKCFjaGlsZHJlbi5sZW5ndGgpIHJldHVybiBudWxsXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2JywgY2hpbGRyZW4pXG4gICAgfSxcbiAgICBnZW5IZWFkZXIgKCkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXVxuXG4gICAgICBpZiAodGhpcy4kc2xvdHMuaGVhZGVyKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2godGhpcy4kc2xvdHMuaGVhZGVyKVxuICAgICAgfVxuXG4gICAgICBpZiAoIWNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCBjaGlsZHJlbilcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3Nlc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuZ2VuSGVhZGVyKCksXG4gICAgICB0aGlzLmdlbkNvbnRlbnQoKSxcbiAgICAgIHRoaXMuZ2VuRm9vdGVyKClcbiAgICBdKVxuICB9XG59XG4iXX0=