import VSelect from './VSelect';
import VOverflowBtn from '../VOverflowBtn';
import VAutocomplete from '../VAutocomplete';
import VCombobox from '../VCombobox';
import rebuildSlots from '../../util/rebuildFunctionalSlots';
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
        delete data.model;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WU2VsZWN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQTtBQUMvQixPQUFPLFlBQVksTUFBTSxpQkFBaUIsQ0FBQTtBQUMxQyxPQUFPLGFBQWEsTUFBTSxrQkFBa0IsQ0FBQTtBQUM1QyxPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUE7QUFDcEMsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUE7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRTlDLG9CQUFvQjtBQUNwQixNQUFNLE9BQU8sR0FBRztJQUNkLFVBQVUsRUFBRSxJQUFJO0lBRWhCLFlBQVksRUFBRSxPQUFPO0lBRXJCLEtBQUssRUFBRTtRQUNMLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsWUFBWSxFQUFFLE9BQU87UUFDckIsa0JBQWtCO1FBQ2xCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLGtCQUFrQjtRQUNsQixJQUFJLEVBQUUsT0FBTztRQUNiLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsUUFBUSxFQUFFLE9BQU87UUFDakIsa0JBQWtCO1FBQ2xCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLGtCQUFrQjtRQUNsQixTQUFTLEVBQUUsT0FBTztLQUNuQjtJQUVELE1BQU0sQ0FBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7UUFDdkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUV6QyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDdEIsU0FBUyxDQUFDLHlCQUF5QixFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUMxRTtRQUNELElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNsQixTQUFTLENBQUMscUJBQXFCLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUNsRTtRQUNELElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUNkLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDdkU7UUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsU0FBUyxDQUFDLHFCQUFxQixFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUN0RTtRQUNELElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNuQixTQUFTLENBQUMsc0JBQXNCLEVBQUUsNEJBQTRCLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ2pGO1FBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ2xCLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSwyQkFBMkIsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDL0U7UUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO1lBQ2hDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7U0FDcEM7YUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQTtZQUNwQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ3hDO2FBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUM5RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFBO1lBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUE7WUFDcEMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUN2QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQTtZQUNwQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQ2xDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFFRCxPQUFPLEVBQUUsT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFBO0FBRTdCLGVBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZTZWxlY3QgZnJvbSAnLi9WU2VsZWN0J1xuaW1wb3J0IFZPdmVyZmxvd0J0biBmcm9tICcuLi9WT3ZlcmZsb3dCdG4nXG5pbXBvcnQgVkF1dG9jb21wbGV0ZSBmcm9tICcuLi9WQXV0b2NvbXBsZXRlJ1xuaW1wb3J0IFZDb21ib2JveCBmcm9tICcuLi9WQ29tYm9ib3gnXG5pbXBvcnQgcmVidWlsZFNsb3RzIGZyb20gJy4uLy4uL3V0aWwvcmVidWlsZEZ1bmN0aW9uYWxTbG90cydcbmltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmNvbnN0IHdyYXBwZXIgPSB7XG4gIGZ1bmN0aW9uYWw6IHRydWUsXG5cbiAgJF93cmFwcGVyRm9yOiBWU2VsZWN0LFxuXG4gIHByb3BzOiB7XG4gICAgLy8gVkF1dG9Db21wbGV0ZVxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGF1dG9jb21wbGV0ZTogQm9vbGVhbixcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICBjb21ib2JveDogQm9vbGVhbixcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICB0YWdzOiBCb29sZWFuLFxuICAgIC8vIFZPdmVyZmxvd0J0blxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGVkaXRhYmxlOiBCb29sZWFuLFxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIG92ZXJmbG93OiBCb29sZWFuLFxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIHNlZ21lbnRlZDogQm9vbGVhblxuICB9LFxuXG4gIHJlbmRlciAoaCwgeyBwcm9wcywgZGF0YSwgc2xvdHMsIHBhcmVudCB9KSB7XG4gICAgZGVsZXRlIGRhdGEubW9kZWxcbiAgICBjb25zdCBjaGlsZHJlbiA9IHJlYnVpbGRTbG90cyhzbG90cygpLCBoKVxuXG4gICAgaWYgKHByb3BzLmF1dG9jb21wbGV0ZSkge1xuICAgICAgZGVwcmVjYXRlKCc8di1zZWxlY3QgYXV0b2NvbXBsZXRlPicsICc8di1hdXRvY29tcGxldGU+Jywgd3JhcHBlciwgcGFyZW50KVxuICAgIH1cbiAgICBpZiAocHJvcHMuY29tYm9ib3gpIHtcbiAgICAgIGRlcHJlY2F0ZSgnPHYtc2VsZWN0IGNvbWJvYm94PicsICc8di1jb21ib2JveD4nLCB3cmFwcGVyLCBwYXJlbnQpXG4gICAgfVxuICAgIGlmIChwcm9wcy50YWdzKSB7XG4gICAgICBkZXByZWNhdGUoJzx2LXNlbGVjdCB0YWdzPicsICc8di1jb21ib2JveCBtdWx0aXBsZT4nLCB3cmFwcGVyLCBwYXJlbnQpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm92ZXJmbG93KSB7XG4gICAgICBkZXByZWNhdGUoJzx2LXNlbGVjdCBvdmVyZmxvdz4nLCAnPHYtb3ZlcmZsb3ctYnRuPicsIHdyYXBwZXIsIHBhcmVudClcbiAgICB9XG4gICAgaWYgKHByb3BzLnNlZ21lbnRlZCkge1xuICAgICAgZGVwcmVjYXRlKCc8di1zZWxlY3Qgc2VnbWVudGVkPicsICc8di1vdmVyZmxvdy1idG4gc2VnbWVudGVkPicsIHdyYXBwZXIsIHBhcmVudClcbiAgICB9XG4gICAgaWYgKHByb3BzLmVkaXRhYmxlKSB7XG4gICAgICBkZXByZWNhdGUoJzx2LXNlbGVjdCBlZGl0YWJsZT4nLCAnPHYtb3ZlcmZsb3ctYnRuIGVkaXRhYmxlPicsIHdyYXBwZXIsIHBhcmVudClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuY29tYm9ib3ggfHwgcHJvcHMudGFncykge1xuICAgICAgZGF0YS5hdHRycy5tdWx0aXBsZSA9IHByb3BzLnRhZ3NcbiAgICAgIHJldHVybiBoKFZDb21ib2JveCwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfSBlbHNlIGlmIChwcm9wcy5hdXRvY29tcGxldGUpIHtcbiAgICAgIGRhdGEuYXR0cnMubXVsdGlwbGUgPSBwcm9wcy5tdWx0aXBsZVxuICAgICAgcmV0dXJuIGgoVkF1dG9jb21wbGV0ZSwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfSBlbHNlIGlmIChwcm9wcy5vdmVyZmxvdyB8fCBwcm9wcy5zZWdtZW50ZWQgfHwgcHJvcHMuZWRpdGFibGUpIHtcbiAgICAgIGRhdGEuYXR0cnMuc2VnbWVudGVkID0gcHJvcHMuc2VnbWVudGVkXG4gICAgICBkYXRhLmF0dHJzLmVkaXRhYmxlID0gcHJvcHMuZWRpdGFibGVcbiAgICAgIHJldHVybiBoKFZPdmVyZmxvd0J0biwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEuYXR0cnMubXVsdGlwbGUgPSBwcm9wcy5tdWx0aXBsZVxuICAgICAgcmV0dXJuIGgoVlNlbGVjdCwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IHdyYXBwZXIgYXMgVlNlbGVjdCB9XG5cbmV4cG9ydCBkZWZhdWx0IHdyYXBwZXJcbiJdfQ==