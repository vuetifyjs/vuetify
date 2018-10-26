import mixins from '../util/mixins';
function searchChildren(children) {
    const results = [];
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if (child.isActive && child.isDependent) {
            results.push(child);
        }
        else {
            results.push(...searchChildren(child.$children));
        }
    }
    return results;
}
/* @vue/component */
export default mixins().extend({
    name: 'dependent',
    data() {
        return {
            closeDependents: true,
            isActive: false,
            isDependent: true
        };
    },
    watch: {
        isActive(val) {
            if (val)
                return;
            const openDependents = this.getOpenDependents();
            for (let index = 0; index < openDependents.length; index++) {
                openDependents[index].isActive = false;
            }
        }
    },
    methods: {
        getOpenDependents() {
            if (this.closeDependents)
                return searchChildren(this.$children);
            return [];
        },
        getOpenDependentElements() {
            const result = [];
            const openDependents = this.getOpenDependents();
            for (let index = 0; index < openDependents.length; index++) {
                result.push(...openDependents[index].getClickableDependentElements());
            }
            return result;
        },
        getClickableDependentElements() {
            const result = [this.$el];
            if (this.$refs.content)
                result.push(this.$refs.content);
            result.push(...this.getOpenDependentElements());
            return result;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9kZXBlbmRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxNQUFNLE1BQU0sZ0JBQWdCLENBQUE7QUFhbkMsU0FBUyxjQUFjLENBQUUsUUFBZTtJQUN0QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDbEIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBc0IsQ0FBQTtRQUNsRCxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3BCO2FBQU07WUFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1NBQ2pEO0tBQ0Y7SUFFRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCLGVBQWUsTUFBTSxFQUFXLENBQUMsTUFBTSxDQUFDO0lBQ3RDLElBQUksRUFBRSxXQUFXO0lBRWpCLElBQUk7UUFDRixPQUFPO1lBQ0wsZUFBZSxFQUFFLElBQUk7WUFDckIsUUFBUSxFQUFFLEtBQUs7WUFDZixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFBO0lBQ0gsQ0FBQztJQUVELEtBQUssRUFBRTtRQUNMLFFBQVEsQ0FBRSxHQUFHO1lBQ1gsSUFBSSxHQUFHO2dCQUFFLE9BQU07WUFFZixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtZQUMvQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDMUQsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7YUFDdkM7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxpQkFBaUI7WUFDZixJQUFJLElBQUksQ0FBQyxlQUFlO2dCQUFFLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUUvRCxPQUFPLEVBQUUsQ0FBQTtRQUNYLENBQUM7UUFDRCx3QkFBd0I7WUFDdEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1lBRS9DLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQTthQUN0RTtZQUVELE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQztRQUNELDZCQUE2QjtZQUMzQixNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztnQkFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUE7WUFFL0MsT0FBTyxNQUFNLENBQUE7UUFDZixDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcblxuaW1wb3J0IG1peGlucyBmcm9tICcuLi91dGlsL21peGlucydcblxuaW50ZXJmYWNlIG9wdGlvbnMgZXh0ZW5kcyBWdWUge1xuICAkcmVmczoge1xuICAgIGNvbnRlbnQ6IEhUTUxFbGVtZW50XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlcGVuZGVudEluc3RhbmNlIGV4dGVuZHMgVnVlIHtcbiAgaXNBY3RpdmU/OiBib29sZWFuXG4gIGlzRGVwZW5kZW50PzogYm9vbGVhblxufVxuXG5mdW5jdGlvbiBzZWFyY2hDaGlsZHJlbiAoY2hpbGRyZW46IFZ1ZVtdKTogRGVwZW5kZW50SW5zdGFuY2VbXSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBbXVxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpbmRleF0gYXMgRGVwZW5kZW50SW5zdGFuY2VcbiAgICBpZiAoY2hpbGQuaXNBY3RpdmUgJiYgY2hpbGQuaXNEZXBlbmRlbnQpIHtcbiAgICAgIHJlc3VsdHMucHVzaChjaGlsZClcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0cy5wdXNoKC4uLnNlYXJjaENoaWxkcmVuKGNoaWxkLiRjaGlsZHJlbikpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHNcbn1cblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IG1peGluczxvcHRpb25zPigpLmV4dGVuZCh7XG4gIG5hbWU6ICdkZXBlbmRlbnQnLFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbG9zZURlcGVuZGVudHM6IHRydWUsXG4gICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICBpc0RlcGVuZGVudDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGlzQWN0aXZlICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHJldHVyblxuXG4gICAgICBjb25zdCBvcGVuRGVwZW5kZW50cyA9IHRoaXMuZ2V0T3BlbkRlcGVuZGVudHMoKVxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9wZW5EZXBlbmRlbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBvcGVuRGVwZW5kZW50c1tpbmRleF0uaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2V0T3BlbkRlcGVuZGVudHMgKCk6IGFueVtdIHtcbiAgICAgIGlmICh0aGlzLmNsb3NlRGVwZW5kZW50cykgcmV0dXJuIHNlYXJjaENoaWxkcmVuKHRoaXMuJGNoaWxkcmVuKVxuXG4gICAgICByZXR1cm4gW11cbiAgICB9LFxuICAgIGdldE9wZW5EZXBlbmRlbnRFbGVtZW50cyAoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBbXVxuICAgICAgY29uc3Qgb3BlbkRlcGVuZGVudHMgPSB0aGlzLmdldE9wZW5EZXBlbmRlbnRzKClcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9wZW5EZXBlbmRlbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICByZXN1bHQucHVzaCguLi5vcGVuRGVwZW5kZW50c1tpbmRleF0uZ2V0Q2xpY2thYmxlRGVwZW5kZW50RWxlbWVudHMoKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgZ2V0Q2xpY2thYmxlRGVwZW5kZW50RWxlbWVudHMgKCk6IEhUTUxFbGVtZW50W10ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gW3RoaXMuJGVsXVxuICAgICAgaWYgKHRoaXMuJHJlZnMuY29udGVudCkgcmVzdWx0LnB1c2godGhpcy4kcmVmcy5jb250ZW50KVxuICAgICAgcmVzdWx0LnB1c2goLi4udGhpcy5nZXRPcGVuRGVwZW5kZW50RWxlbWVudHMoKSlcblxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgfVxufSlcbiJdfQ==