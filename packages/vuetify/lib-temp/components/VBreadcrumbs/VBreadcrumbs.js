// Styles
import '../../stylus/components/_breadcrumbs.styl';
// Components
import { VBreadcrumbsDivider, VBreadcrumbsItem } from '.';
// Mixins
import Themeable from '../../mixins/themeable';
// Utils
import { deprecate } from '../../util/console';
import mixins from '../../util/mixins';
export default mixins(Themeable
/* @vue/component */
).extend({
    name: 'v-breadcrumbs',
    props: {
        divider: {
            type: String,
            default: '/'
        },
        items: {
            type: Array,
            default: () => ([])
        },
        large: Boolean,
        justifyCenter: Boolean,
        justifyEnd: Boolean
    },
    computed: {
        classes() {
            return {
                'v-breadcrumbs--large': this.large,
                'justify-center': this.justifyCenter,
                'justify-end': this.justifyEnd,
                ...this.themeClasses
            };
        }
    },
    mounted() {
        if (this.justifyCenter)
            deprecate('justify-center', 'class="justify-center"', this);
        if (this.justifyEnd)
            deprecate('justify-end', 'class="justify-end"', this);
        if (this.$slots.default)
            deprecate('default slot', ':items and scoped slot "item"', this);
    },
    methods: {
        /* @deprecated */
        genChildren /* istanbul ignore next */() {
            if (!this.$slots.default)
                return undefined;
            const children = [];
            let createDividers = false;
            for (let i = 0; i < this.$slots.default.length; i++) {
                const elm = this.$slots.default[i];
                if (!elm.componentOptions ||
                    elm.componentOptions.Ctor.options.name !== 'v-breadcrumbs-item') {
                    children.push(elm);
                }
                else {
                    if (createDividers) {
                        children.push(this.genDivider());
                    }
                    children.push(elm);
                    createDividers = true;
                }
            }
            return children;
        },
        genDivider() {
            return this.$createElement(VBreadcrumbsDivider, this.$slots.divider ? this.$slots.divider : this.divider);
        },
        genItems() {
            const items = [];
            const hasSlot = !!this.$scopedSlots.item;
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                if (hasSlot)
                    items.push(this.$scopedSlots.item({ item }));
                else
                    items.push(this.$createElement(VBreadcrumbsItem, { key: item.text, props: item }, [item.text]));
                if (i < this.items.length - 1)
                    items.push(this.genDivider());
            }
            return items;
        }
    },
    render(h) {
        const children = this.$slots.default ? this.genChildren() : this.genItems();
        return h('ul', {
            staticClass: 'v-breadcrumbs',
            'class': this.classes
        }, children);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJyZWFkY3J1bWJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkJyZWFkY3J1bWJzL1ZCcmVhZGNydW1icy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTywyQ0FBMkMsQ0FBQTtBQU1sRCxhQUFhO0FBQ2IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sR0FBRyxDQUFBO0FBRXpELFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxRQUFRO0FBQ1IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQzlDLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBRXRDLGVBQWUsTUFBTSxDQUNuQixTQUFTO0FBQ1Qsb0JBQW9CO0NBQ3JCLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLGVBQWU7SUFFckIsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsR0FBRztTQUNiO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDSTtRQUN6QixLQUFLLEVBQUUsT0FBTztRQUNkLGFBQWEsRUFBRSxPQUFPO1FBQ3RCLFVBQVUsRUFBRSxPQUFPO0tBQ3BCO0lBRUQsUUFBUSxFQUFFO1FBQ1IsT0FBTztZQUNMLE9BQU87Z0JBQ0wsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2xDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhO2dCQUNwQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQzlCLEdBQUcsSUFBSSxDQUFDLFlBQVk7YUFDckIsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxhQUFhO1lBQUUsU0FBUyxDQUFDLGdCQUFnQixFQUFFLHdCQUF3QixFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ25GLElBQUksSUFBSSxDQUFDLFVBQVU7WUFBRSxTQUFTLENBQUMsYUFBYSxFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsU0FBUyxDQUFDLGNBQWMsRUFBRSwrQkFBK0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMzRixDQUFDO0lBRUQsT0FBTyxFQUFFO1FBQ1AsaUJBQWlCO1FBQ2pCLFdBQVcsQ0FBQywwQkFBMEI7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFBRSxPQUFPLFNBQVMsQ0FBQTtZQUUxQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7WUFFbkIsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFBO1lBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUVsQyxJQUNFLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtvQkFDckIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLG9CQUFvQixFQUMvRDtvQkFDQSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUNuQjtxQkFBTTtvQkFDTCxJQUFJLGNBQWMsRUFBRTt3QkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtxQkFDakM7b0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDbEIsY0FBYyxHQUFHLElBQUksQ0FBQTtpQkFDdEI7YUFDRjtZQUVELE9BQU8sUUFBUSxDQUFBO1FBQ2pCLENBQUM7UUFDRCxVQUFVO1lBQ1IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzNHLENBQUM7UUFDRCxRQUFRO1lBQ04sTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ2hCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQTtZQUV4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRTFCLElBQUksT0FBTztvQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBOztvQkFDcEQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFFcEcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO2FBQzdEO1lBRUQsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUUzRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDYixXQUFXLEVBQUUsZUFBZTtZQUM1QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNkLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX2JyZWFkY3J1bWJzLnN0eWwnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBWTm9kZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IFByb3BWYWxpZGF0b3IgfSBmcm9tICd2dWUvdHlwZXMvb3B0aW9ucydcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IHsgVkJyZWFkY3J1bWJzRGl2aWRlciwgVkJyZWFkY3J1bWJzSXRlbSB9IGZyb20gJy4nXG5cbi8vIE1peGluc1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vLyBVdGlsc1xuaW1wb3J0IHsgZGVwcmVjYXRlIH0gZnJvbSAnLi4vLi4vdXRpbC9jb25zb2xlJ1xuaW1wb3J0IG1peGlucyBmcm9tICcuLi8uLi91dGlsL21peGlucydcblxuZXhwb3J0IGRlZmF1bHQgbWl4aW5zKFxuICBUaGVtZWFibGVcbiAgLyogQHZ1ZS9jb21wb25lbnQgKi9cbikuZXh0ZW5kKHtcbiAgbmFtZTogJ3YtYnJlYWRjcnVtYnMnLFxuXG4gIHByb3BzOiB7XG4gICAgZGl2aWRlcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJy8nXG4gICAgfSxcbiAgICBpdGVtczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiAoW10pXG4gICAgfSBhcyBQcm9wVmFsaWRhdG9yPGFueVtdPixcbiAgICBsYXJnZTogQm9vbGVhbixcbiAgICBqdXN0aWZ5Q2VudGVyOiBCb29sZWFuLFxuICAgIGp1c3RpZnlFbmQ6IEJvb2xlYW5cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1icmVhZGNydW1icy0tbGFyZ2UnOiB0aGlzLmxhcmdlLFxuICAgICAgICAnanVzdGlmeS1jZW50ZXInOiB0aGlzLmp1c3RpZnlDZW50ZXIsXG4gICAgICAgICdqdXN0aWZ5LWVuZCc6IHRoaXMuanVzdGlmeUVuZCxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgaWYgKHRoaXMuanVzdGlmeUNlbnRlcikgZGVwcmVjYXRlKCdqdXN0aWZ5LWNlbnRlcicsICdjbGFzcz1cImp1c3RpZnktY2VudGVyXCInLCB0aGlzKVxuICAgIGlmICh0aGlzLmp1c3RpZnlFbmQpIGRlcHJlY2F0ZSgnanVzdGlmeS1lbmQnLCAnY2xhc3M9XCJqdXN0aWZ5LWVuZFwiJywgdGhpcylcbiAgICBpZiAodGhpcy4kc2xvdHMuZGVmYXVsdCkgZGVwcmVjYXRlKCdkZWZhdWx0IHNsb3QnLCAnOml0ZW1zIGFuZCBzY29wZWQgc2xvdCBcIml0ZW1cIicsIHRoaXMpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIC8qIEBkZXByZWNhdGVkICovXG4gICAgZ2VuQ2hpbGRyZW4gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gKCkge1xuICAgICAgaWYgKCF0aGlzLiRzbG90cy5kZWZhdWx0KSByZXR1cm4gdW5kZWZpbmVkXG5cbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gW11cblxuICAgICAgbGV0IGNyZWF0ZURpdmlkZXJzID0gZmFsc2VcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy4kc2xvdHMuZGVmYXVsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbG0gPSB0aGlzLiRzbG90cy5kZWZhdWx0W2ldXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICFlbG0uY29tcG9uZW50T3B0aW9ucyB8fFxuICAgICAgICAgIGVsbS5jb21wb25lbnRPcHRpb25zLkN0b3Iub3B0aW9ucy5uYW1lICE9PSAndi1icmVhZGNydW1icy1pdGVtJ1xuICAgICAgICApIHtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKGVsbSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY3JlYXRlRGl2aWRlcnMpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godGhpcy5nZW5EaXZpZGVyKCkpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkcmVuLnB1c2goZWxtKVxuICAgICAgICAgIGNyZWF0ZURpdmlkZXJzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGlsZHJlblxuICAgIH0sXG4gICAgZ2VuRGl2aWRlciAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWQnJlYWRjcnVtYnNEaXZpZGVyLCB0aGlzLiRzbG90cy5kaXZpZGVyID8gdGhpcy4kc2xvdHMuZGl2aWRlciA6IHRoaXMuZGl2aWRlcilcbiAgICB9LFxuICAgIGdlbkl0ZW1zICgpIHtcbiAgICAgIGNvbnN0IGl0ZW1zID0gW11cbiAgICAgIGNvbnN0IGhhc1Nsb3QgPSAhIXRoaXMuJHNjb3BlZFNsb3RzLml0ZW1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldXG5cbiAgICAgICAgaWYgKGhhc1Nsb3QpIGl0ZW1zLnB1c2godGhpcy4kc2NvcGVkU2xvdHMuaXRlbSh7IGl0ZW0gfSkpXG4gICAgICAgIGVsc2UgaXRlbXMucHVzaCh0aGlzLiRjcmVhdGVFbGVtZW50KFZCcmVhZGNydW1ic0l0ZW0sIHsga2V5OiBpdGVtLnRleHQsIHByb3BzOiBpdGVtIH0sIFtpdGVtLnRleHRdKSlcblxuICAgICAgICBpZiAoaSA8IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSkgaXRlbXMucHVzaCh0aGlzLmdlbkRpdmlkZXIoKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW1zXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuJHNsb3RzLmRlZmF1bHQgPyB0aGlzLmdlbkNoaWxkcmVuKCkgOiB0aGlzLmdlbkl0ZW1zKClcblxuICAgIHJldHVybiBoKCd1bCcsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1icmVhZGNydW1icycsXG4gICAgICAnY2xhc3MnOiB0aGlzLmNsYXNzZXNcbiAgICB9LCBjaGlsZHJlbilcbiAgfVxufSlcbiJdfQ==