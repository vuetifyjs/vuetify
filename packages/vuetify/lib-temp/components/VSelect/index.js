import VSelect from './VSelect';
import VOverflowBtn from '../VOverflowBtn';
import VAutocomplete from '../VAutocomplete';
import VCombobox from '../VCombobox';
import rebuildSlots from '../../util/rebuildFunctionalSlots';
import dedupeModelListeners from '../../util/dedupeModelListeners';
import { deprecate } from '../../util/console';
/* @vue/component */
const wrapper = {
    functional: true,
    $_wrapperFor: VSelect,
    props: {
        // VAutoComplete
        /** @deprecated */
        autocomplete: Boolean,
        /** @deprecated */
        combobox: Boolean,
        multiple: Boolean,
        /** @deprecated */
        tags: Boolean,
        // VOverflowBtn
        /** @deprecated */
        editable: Boolean,
        /** @deprecated */
        overflow: Boolean,
        /** @deprecated */
        segmented: Boolean
    },
    render(h, { props, data, slots, parent }) {
        dedupeModelListeners(data);
        const children = rebuildSlots(slots(), h);
        if (props.autocomplete) {
            deprecate('<v-select autocomplete>', '<v-autocomplete>', wrapper, parent);
        }
        if (props.combobox) {
            deprecate('<v-select combobox>', '<v-combobox>', wrapper, parent);
        }
        if (props.tags) {
            deprecate('<v-select tags>', '<v-combobox multiple>', wrapper, parent);
        }
        if (props.overflow) {
            deprecate('<v-select overflow>', '<v-overflow-btn>', wrapper, parent);
        }
        if (props.segmented) {
            deprecate('<v-select segmented>', '<v-overflow-btn segmented>', wrapper, parent);
        }
        if (props.editable) {
            deprecate('<v-select editable>', '<v-overflow-btn editable>', wrapper, parent);
        }
        if (props.combobox || props.tags) {
            data.attrs.multiple = props.tags;
            return h(VCombobox, data, children);
        }
        else if (props.autocomplete) {
            data.attrs.multiple = props.multiple;
            return h(VAutocomplete, data, children);
        }
        else if (props.overflow || props.segmented || props.editable) {
            data.attrs.segmented = props.segmented;
            data.attrs.editable = props.editable;
            return h(VOverflowBtn, data, children);
        }
        else {
            data.attrs.multiple = props.multiple;
            return h(VSelect, data, children);
        }
    }
};
export { wrapper as VSelect };
export default wrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WU2VsZWN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQTtBQUMvQixPQUFPLFlBQVksTUFBTSxpQkFBaUIsQ0FBQTtBQUMxQyxPQUFPLGFBQWEsTUFBTSxrQkFBa0IsQ0FBQTtBQUM1QyxPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUE7QUFDcEMsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUE7QUFDNUQsT0FBTyxvQkFBb0IsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFOUMsb0JBQW9CO0FBQ3BCLE1BQU0sT0FBTyxHQUFHO0lBQ2QsVUFBVSxFQUFFLElBQUk7SUFFaEIsWUFBWSxFQUFFLE9BQU87SUFFckIsS0FBSyxFQUFFO1FBQ0wsZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixZQUFZLEVBQUUsT0FBTztRQUNyQixrQkFBa0I7UUFDbEIsUUFBUSxFQUFFLE9BQU87UUFDakIsUUFBUSxFQUFFLE9BQU87UUFDakIsa0JBQWtCO1FBQ2xCLElBQUksRUFBRSxPQUFPO1FBQ2IsZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixRQUFRLEVBQUUsT0FBTztRQUNqQixrQkFBa0I7UUFDbEIsUUFBUSxFQUFFLE9BQU87UUFDakIsa0JBQWtCO1FBQ2xCLFNBQVMsRUFBRSxPQUFPO0tBQ25CO0lBRUQsTUFBTSxDQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtRQUN2QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFekMsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ3RCLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDMUU7UUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsU0FBUyxDQUFDLHFCQUFxQixFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDbEU7UUFDRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDZCxTQUFTLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ3ZFO1FBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ2xCLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDdEU7UUFDRCxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDbkIsU0FBUyxDQUFDLHNCQUFzQixFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUNqRjtRQUNELElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNsQixTQUFTLENBQUMscUJBQXFCLEVBQUUsMkJBQTJCLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQy9FO1FBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQTtZQUNoQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ3BDO2FBQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUE7WUFDcEMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUN4QzthQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDOUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQTtZQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFBO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7U0FDdkM7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUE7WUFDcEMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUNsQztJQUNILENBQUM7Q0FDRixDQUFBO0FBRUQsT0FBTyxFQUFFLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQTtBQUU3QixlQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWU2VsZWN0IGZyb20gJy4vVlNlbGVjdCdcbmltcG9ydCBWT3ZlcmZsb3dCdG4gZnJvbSAnLi4vVk92ZXJmbG93QnRuJ1xuaW1wb3J0IFZBdXRvY29tcGxldGUgZnJvbSAnLi4vVkF1dG9jb21wbGV0ZSdcbmltcG9ydCBWQ29tYm9ib3ggZnJvbSAnLi4vVkNvbWJvYm94J1xuaW1wb3J0IHJlYnVpbGRTbG90cyBmcm9tICcuLi8uLi91dGlsL3JlYnVpbGRGdW5jdGlvbmFsU2xvdHMnXG5pbXBvcnQgZGVkdXBlTW9kZWxMaXN0ZW5lcnMgZnJvbSAnLi4vLi4vdXRpbC9kZWR1cGVNb2RlbExpc3RlbmVycydcbmltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmNvbnN0IHdyYXBwZXIgPSB7XG4gIGZ1bmN0aW9uYWw6IHRydWUsXG5cbiAgJF93cmFwcGVyRm9yOiBWU2VsZWN0LFxuXG4gIHByb3BzOiB7XG4gICAgLy8gVkF1dG9Db21wbGV0ZVxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGF1dG9jb21wbGV0ZTogQm9vbGVhbixcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICBjb21ib2JveDogQm9vbGVhbixcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICB0YWdzOiBCb29sZWFuLFxuICAgIC8vIFZPdmVyZmxvd0J0blxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGVkaXRhYmxlOiBCb29sZWFuLFxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIG92ZXJmbG93OiBCb29sZWFuLFxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIHNlZ21lbnRlZDogQm9vbGVhblxuICB9LFxuXG4gIHJlbmRlciAoaCwgeyBwcm9wcywgZGF0YSwgc2xvdHMsIHBhcmVudCB9KSB7XG4gICAgZGVkdXBlTW9kZWxMaXN0ZW5lcnMoZGF0YSlcbiAgICBjb25zdCBjaGlsZHJlbiA9IHJlYnVpbGRTbG90cyhzbG90cygpLCBoKVxuXG4gICAgaWYgKHByb3BzLmF1dG9jb21wbGV0ZSkge1xuICAgICAgZGVwcmVjYXRlKCc8di1zZWxlY3QgYXV0b2NvbXBsZXRlPicsICc8di1hdXRvY29tcGxldGU+Jywgd3JhcHBlciwgcGFyZW50KVxuICAgIH1cbiAgICBpZiAocHJvcHMuY29tYm9ib3gpIHtcbiAgICAgIGRlcHJlY2F0ZSgnPHYtc2VsZWN0IGNvbWJvYm94PicsICc8di1jb21ib2JveD4nLCB3cmFwcGVyLCBwYXJlbnQpXG4gICAgfVxuICAgIGlmIChwcm9wcy50YWdzKSB7XG4gICAgICBkZXByZWNhdGUoJzx2LXNlbGVjdCB0YWdzPicsICc8di1jb21ib2JveCBtdWx0aXBsZT4nLCB3cmFwcGVyLCBwYXJlbnQpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm92ZXJmbG93KSB7XG4gICAgICBkZXByZWNhdGUoJzx2LXNlbGVjdCBvdmVyZmxvdz4nLCAnPHYtb3ZlcmZsb3ctYnRuPicsIHdyYXBwZXIsIHBhcmVudClcbiAgICB9XG4gICAgaWYgKHByb3BzLnNlZ21lbnRlZCkge1xuICAgICAgZGVwcmVjYXRlKCc8di1zZWxlY3Qgc2VnbWVudGVkPicsICc8di1vdmVyZmxvdy1idG4gc2VnbWVudGVkPicsIHdyYXBwZXIsIHBhcmVudClcbiAgICB9XG4gICAgaWYgKHByb3BzLmVkaXRhYmxlKSB7XG4gICAgICBkZXByZWNhdGUoJzx2LXNlbGVjdCBlZGl0YWJsZT4nLCAnPHYtb3ZlcmZsb3ctYnRuIGVkaXRhYmxlPicsIHdyYXBwZXIsIHBhcmVudClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuY29tYm9ib3ggfHwgcHJvcHMudGFncykge1xuICAgICAgZGF0YS5hdHRycy5tdWx0aXBsZSA9IHByb3BzLnRhZ3NcbiAgICAgIHJldHVybiBoKFZDb21ib2JveCwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfSBlbHNlIGlmIChwcm9wcy5hdXRvY29tcGxldGUpIHtcbiAgICAgIGRhdGEuYXR0cnMubXVsdGlwbGUgPSBwcm9wcy5tdWx0aXBsZVxuICAgICAgcmV0dXJuIGgoVkF1dG9jb21wbGV0ZSwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfSBlbHNlIGlmIChwcm9wcy5vdmVyZmxvdyB8fCBwcm9wcy5zZWdtZW50ZWQgfHwgcHJvcHMuZWRpdGFibGUpIHtcbiAgICAgIGRhdGEuYXR0cnMuc2VnbWVudGVkID0gcHJvcHMuc2VnbWVudGVkXG4gICAgICBkYXRhLmF0dHJzLmVkaXRhYmxlID0gcHJvcHMuZWRpdGFibGVcbiAgICAgIHJldHVybiBoKFZPdmVyZmxvd0J0biwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEuYXR0cnMubXVsdGlwbGUgPSBwcm9wcy5tdWx0aXBsZVxuICAgICAgcmV0dXJuIGgoVlNlbGVjdCwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IHdyYXBwZXIgYXMgVlNlbGVjdCB9XG5cbmV4cG9ydCBkZWZhdWx0IHdyYXBwZXJcbiJdfQ==