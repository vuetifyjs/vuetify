// Styles
import '../../stylus/components/_windows.styl';
// Components
import { BaseItemGroup } from '../VItemGroup/VItemGroup';
// Directives
import Touch from '../../directives/touch';
/* @vue/component */
export default BaseItemGroup.extend({
    name: 'v-window',
    provide() {
        return {
            windowGroup: this
        };
    },
    directives: { Touch },
    props: {
        mandatory: {
            type: Boolean,
            default: true
        },
        reverse: {
            type: Boolean,
            default: undefined
        },
        touch: Object,
        touchless: Boolean,
        value: {
            required: false
        },
        vertical: Boolean
    },
    data() {
        return {
            internalHeight: undefined,
            isActive: false,
            isBooted: false,
            isReverse: false
        };
    },
    computed: {
        computedTransition() {
            if (!this.isBooted)
                return '';
            const axis = this.vertical ? 'y' : 'x';
            const direction = this.internalReverse === !this.$vuetify.rtl
                ? '-reverse'
                : '';
            return `v-window-${axis}${direction}-transition`;
        },
        internalIndex() {
            return this.items.findIndex((item, i) => {
                return this.internalValue === this.getValue(item, i);
            });
        },
        internalReverse() {
            if (this.reverse !== undefined)
                return this.reverse;
            return this.isReverse;
        }
    },
    watch: {
        internalIndex: 'updateReverse'
    },
    mounted() {
        this.$nextTick(() => (this.isBooted = true));
    },
    methods: {
        genContainer() {
            return this.$createElement('div', {
                staticClass: 'v-window__container',
                class: {
                    'v-window__container--is-active': this.isActive
                },
                style: {
                    height: this.internalHeight
                }
            }, this.$slots.default);
        },
        next() {
            this.isReverse = false;
            const nextIndex = (this.internalIndex + 1) % this.items.length;
            const item = this.items[nextIndex];
            this.internalValue = this.getValue(item, nextIndex);
        },
        prev() {
            this.isReverse = true;
            const lastIndex = (this.internalIndex + this.items.length - 1) % this.items.length;
            const item = this.items[lastIndex];
            this.internalValue = this.getValue(item, lastIndex);
        },
        updateReverse(val, oldVal) {
            this.isReverse = val < oldVal;
        }
    },
    render(h) {
        const data = {
            staticClass: 'v-window',
            directives: []
        };
        if (!this.touchless) {
            const value = this.touch || {
                left: this.next,
                right: this.prev
            };
            data.directives.push({
                name: 'touch',
                value
            });
        }
        return h('div', data, [this.genContainer()]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVldpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZXaW5kb3cvVldpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx1Q0FBdUMsQ0FBQTtBQUU5QyxhQUFhO0FBQ2IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBRXhELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSx3QkFBd0IsQ0FBQTtBQUsxQyxvQkFBb0I7QUFDcEIsZUFBZSxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ2xDLElBQUksRUFBRSxVQUFVO0lBRWhCLE9BQU87UUFDTCxPQUFPO1lBQ0wsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQTtJQUNILENBQUM7SUFFRCxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUU7SUFFckIsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsU0FBUztTQUNuQjtRQUNELEtBQUssRUFBRSxNQUFNO1FBQ2IsU0FBUyxFQUFFLE9BQU87UUFDbEIsS0FBSyxFQUFFO1lBQ0wsUUFBUSxFQUFFLEtBQUs7U0FDaEI7UUFDRCxRQUFRLEVBQUUsT0FBTztLQUNsQjtJQUVELElBQUk7UUFDRixPQUFPO1lBQ0wsY0FBYyxFQUFFLFNBQStCO1lBQy9DLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFBO0lBQ0gsQ0FBQztJQUVELFFBQVEsRUFBRTtRQUNSLGtCQUFrQjtZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxFQUFFLENBQUE7WUFFN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FB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Q2YsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2pCLENBQUE7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDbkIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSzthQUNZLENBQUMsQ0FBQTtTQUNyQjtRQUVELE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzlDLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3dpbmRvd3Muc3R5bCdcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IHsgQmFzZUl0ZW1Hcm91cCB9IGZyb20gJy4uL1ZJdGVtR3JvdXAvVkl0ZW1Hcm91cCdcblxuLy8gRGlyZWN0aXZlc1xuaW1wb3J0IFRvdWNoIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvdG91Y2gnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBWTm9kZSwgVk5vZGVEaXJlY3RpdmUgfSBmcm9tICd2dWUvdHlwZXMvdm5vZGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCBCYXNlSXRlbUdyb3VwLmV4dGVuZCh7XG4gIG5hbWU6ICd2LXdpbmRvdycsXG5cbiAgcHJvdmlkZSAoKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgd2luZG93R3JvdXA6IHRoaXNcbiAgICB9XG4gIH0sXG5cbiAgZGlyZWN0aXZlczogeyBUb3VjaCB9LFxuXG4gIHByb3BzOiB7XG4gICAgbWFuZGF0b3J5OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgcmV2ZXJzZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgdG91Y2g6IE9iamVjdCxcbiAgICB0b3VjaGxlc3M6IEJvb2xlYW4sXG4gICAgdmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH0sXG4gICAgdmVydGljYWw6IEJvb2xlYW5cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJuYWxIZWlnaHQ6IHVuZGVmaW5lZCBhcyB1bmRlZmluZWQgfCBzdHJpbmcsXG4gICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICBpc0Jvb3RlZDogZmFsc2UsXG4gICAgICBpc1JldmVyc2U6IGZhbHNlXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29tcHV0ZWRUcmFuc2l0aW9uICgpOiBzdHJpbmcge1xuICAgICAgaWYgKCF0aGlzLmlzQm9vdGVkKSByZXR1cm4gJydcblxuICAgICAgY29uc3QgYXhpcyA9IHRoaXMudmVydGljYWwgPyAneScgOiAneCdcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuaW50ZXJuYWxSZXZlcnNlID09PSAhdGhpcy4kdnVldGlmeS5ydGxcbiAgICAgICAgPyAnLXJldmVyc2UnXG4gICAgICAgIDogJydcblxuICAgICAgcmV0dXJuIGB2LXdpbmRvdy0ke2F4aXN9JHtkaXJlY3Rpb259LXRyYW5zaXRpb25gXG4gICAgfSxcbiAgICBpbnRlcm5hbEluZGV4ICgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZEluZGV4KChpdGVtLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsVmFsdWUgPT09IHRoaXMuZ2V0VmFsdWUoaXRlbSwgaSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBpbnRlcm5hbFJldmVyc2UgKCk6IGJvb2xlYW4ge1xuICAgICAgaWYgKHRoaXMucmV2ZXJzZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5yZXZlcnNlXG5cbiAgICAgIHJldHVybiB0aGlzLmlzUmV2ZXJzZVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGludGVybmFsSW5kZXg6ICd1cGRhdGVSZXZlcnNlJ1xuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMuJG5leHRUaWNrKCgpID0+ICh0aGlzLmlzQm9vdGVkID0gdHJ1ZSkpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkNvbnRhaW5lciAoKTogVk5vZGUge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXdpbmRvd19fY29udGFpbmVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi13aW5kb3dfX2NvbnRhaW5lci0taXMtYWN0aXZlJzogdGhpcy5pc0FjdGl2ZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGhlaWdodDogdGhpcy5pbnRlcm5hbEhlaWdodFxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLiRzbG90cy5kZWZhdWx0KVxuICAgIH0sXG4gICAgbmV4dCAoKSB7XG4gICAgICB0aGlzLmlzUmV2ZXJzZSA9IGZhbHNlXG4gICAgICBjb25zdCBuZXh0SW5kZXggPSAodGhpcy5pbnRlcm5hbEluZGV4ICsgMSkgJSB0aGlzLml0ZW1zLmxlbmd0aFxuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbbmV4dEluZGV4XVxuXG4gICAgICB0aGlzLmludGVybmFsVmFsdWUgPSB0aGlzLmdldFZhbHVlKGl0ZW0sIG5leHRJbmRleClcbiAgICB9LFxuICAgIHByZXYgKCkge1xuICAgICAgdGhpcy5pc1JldmVyc2UgPSB0cnVlXG4gICAgICBjb25zdCBsYXN0SW5kZXggPSAodGhpcy5pbnRlcm5hbEluZGV4ICsgdGhpcy5pdGVtcy5sZW5ndGggLSAxKSAlIHRoaXMuaXRlbXMubGVuZ3RoXG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tsYXN0SW5kZXhdXG5cbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHRoaXMuZ2V0VmFsdWUoaXRlbSwgbGFzdEluZGV4KVxuICAgIH0sXG4gICAgdXBkYXRlUmV2ZXJzZSAodmFsOiBudW1iZXIsIG9sZFZhbDogbnVtYmVyKSB7XG4gICAgICB0aGlzLmlzUmV2ZXJzZSA9IHZhbCA8IG9sZFZhbFxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpOiBWTm9kZSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi13aW5kb3cnLFxuICAgICAgZGlyZWN0aXZlczogW10gYXMgVk5vZGVEaXJlY3RpdmVbXVxuICAgIH1cblxuICAgIGlmICghdGhpcy50b3VjaGxlc3MpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy50b3VjaCB8fCB7XG4gICAgICAgIGxlZnQ6IHRoaXMubmV4dCxcbiAgICAgICAgcmlnaHQ6IHRoaXMucHJldlxuICAgICAgfVxuXG4gICAgICBkYXRhLmRpcmVjdGl2ZXMucHVzaCh7XG4gICAgICAgIG5hbWU6ICd0b3VjaCcsXG4gICAgICAgIHZhbHVlXG4gICAgICB9IGFzIFZOb2RlRGlyZWN0aXZlKVxuICAgIH1cblxuICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCBbdGhpcy5nZW5Db250YWluZXIoKV0pXG4gIH1cbn0pXG4iXX0=