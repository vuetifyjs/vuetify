import { addOnceEventListener } from '../../util/helpers';
export default function (expandedParentClass = '') {
    return {
        enter(el, done) {
            el._parent = el.parentNode;
            el._height = el._height != null ? el._height : el.style.height;
            addOnceEventListener(el, 'transitionend', done);
            // Get height that is to be scrolled
            el.style.overflow = 'hidden';
            el.style.height = 0;
            el.style.display = 'block';
            expandedParentClass && el._parent.classList.add(expandedParentClass);
            setTimeout(() => {
                el.style.height = el._height ||
                    (!el.scrollHeight
                        ? 'auto'
                        : `${el.scrollHeight}px`);
            }, 100);
        },
        afterEnter(el) {
            el.style.overflow = null;
            // If user supplied height
            // leave it
            if (el._height)
                return;
            el.style.height = null;
        },
        leave(el, done) {
            // Remove initial transition
            addOnceEventListener(el, 'transitionend', done);
            // Set height before we transition to 0
            el.style.overflow = 'hidden';
            // If no user supplied height
            // pass in the scrollHeight
            if (!el._height) {
                el.style.height = `${el.scrollHeight}px`;
            }
            setTimeout(() => (el.style.height = 0), 100);
        },
        afterLeave(el) {
            expandedParentClass && el._parent && el._parent.classList.remove(expandedParentClass);
            // If user supplied height
            // leave it
            if (el._height)
                return;
            el.style.height = null;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLXRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy90cmFuc2l0aW9ucy9leHBhbmQtdHJhbnNpdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUV6RCxNQUFNLENBQUMsT0FBTyxXQUFXLG1CQUFtQixHQUFHLEVBQUU7SUFDL0MsT0FBTztRQUNMLEtBQUssQ0FBRSxFQUFFLEVBQUUsSUFBSTtZQUNiLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQTtZQUMxQixFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtZQUU5RCxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRS9DLG9DQUFvQztZQUNwQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7WUFDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtZQUMxQixtQkFBbUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUVwRSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPO29CQUMxQixDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVk7d0JBQ2YsQ0FBQyxDQUFDLE1BQU07d0JBQ1IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUE7WUFDL0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsQ0FBQztRQUVELFVBQVUsQ0FBRSxFQUFFO1lBQ1osRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1lBRXhCLDBCQUEwQjtZQUMxQixXQUFXO1lBQ1gsSUFBSSxFQUFFLENBQUMsT0FBTztnQkFBRSxPQUFNO1lBRXRCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUN4QixDQUFDO1FBRUQsS0FBSyxDQUFFLEVBQUUsRUFBRSxJQUFJO1lBQ2IsNEJBQTRCO1lBQzVCLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFL0MsdUNBQXVDO1lBQ3ZDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtZQUU1Qiw2QkFBNkI7WUFDN0IsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUNmLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLFlBQVksSUFBSSxDQUFBO2FBQ3pDO1lBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDOUMsQ0FBQztRQUVELFVBQVUsQ0FBRSxFQUFFO1lBQ1osbUJBQW1CLElBQUksRUFBRSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUVyRiwwQkFBMEI7WUFDMUIsV0FBVztZQUNYLElBQUksRUFBRSxDQUFDLE9BQU87Z0JBQUUsT0FBTTtZQUV0QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDeEIsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRkT25jZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChleHBhbmRlZFBhcmVudENsYXNzID0gJycpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnRlciAoZWwsIGRvbmUpIHtcbiAgICAgIGVsLl9wYXJlbnQgPSBlbC5wYXJlbnROb2RlXG4gICAgICBlbC5faGVpZ2h0ID0gZWwuX2hlaWdodCAhPSBudWxsID8gZWwuX2hlaWdodCA6IGVsLnN0eWxlLmhlaWdodFxuXG4gICAgICBhZGRPbmNlRXZlbnRMaXN0ZW5lcihlbCwgJ3RyYW5zaXRpb25lbmQnLCBkb25lKVxuXG4gICAgICAvLyBHZXQgaGVpZ2h0IHRoYXQgaXMgdG8gYmUgc2Nyb2xsZWRcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IDBcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICBleHBhbmRlZFBhcmVudENsYXNzICYmIGVsLl9wYXJlbnQuY2xhc3NMaXN0LmFkZChleHBhbmRlZFBhcmVudENsYXNzKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuX2hlaWdodCB8fFxuICAgICAgICAgICghZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgICA/ICdhdXRvJ1xuICAgICAgICAgICAgOiBgJHtlbC5zY3JvbGxIZWlnaHR9cHhgKVxuICAgICAgfSwgMTAwKVxuICAgIH0sXG5cbiAgICBhZnRlckVudGVyIChlbCkge1xuICAgICAgZWwuc3R5bGUub3ZlcmZsb3cgPSBudWxsXG5cbiAgICAgIC8vIElmIHVzZXIgc3VwcGxpZWQgaGVpZ2h0XG4gICAgICAvLyBsZWF2ZSBpdFxuICAgICAgaWYgKGVsLl9oZWlnaHQpIHJldHVyblxuXG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBudWxsXG4gICAgfSxcblxuICAgIGxlYXZlIChlbCwgZG9uZSkge1xuICAgICAgLy8gUmVtb3ZlIGluaXRpYWwgdHJhbnNpdGlvblxuICAgICAgYWRkT25jZUV2ZW50TGlzdGVuZXIoZWwsICd0cmFuc2l0aW9uZW5kJywgZG9uZSlcblxuICAgICAgLy8gU2V0IGhlaWdodCBiZWZvcmUgd2UgdHJhbnNpdGlvbiB0byAwXG4gICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG5cbiAgICAgIC8vIElmIG5vIHVzZXIgc3VwcGxpZWQgaGVpZ2h0XG4gICAgICAvLyBwYXNzIGluIHRoZSBzY3JvbGxIZWlnaHRcbiAgICAgIGlmICghZWwuX2hlaWdodCkge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtlbC5zY3JvbGxIZWlnaHR9cHhgXG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gKGVsLnN0eWxlLmhlaWdodCA9IDApLCAxMDApXG4gICAgfSxcblxuICAgIGFmdGVyTGVhdmUgKGVsKSB7XG4gICAgICBleHBhbmRlZFBhcmVudENsYXNzICYmIGVsLl9wYXJlbnQgJiYgZWwuX3BhcmVudC5jbGFzc0xpc3QucmVtb3ZlKGV4cGFuZGVkUGFyZW50Q2xhc3MpXG5cbiAgICAgIC8vIElmIHVzZXIgc3VwcGxpZWQgaGVpZ2h0XG4gICAgICAvLyBsZWF2ZSBpdFxuICAgICAgaWYgKGVsLl9oZWlnaHQpIHJldHVyblxuXG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBudWxsXG4gICAgfVxuICB9XG59XG4iXX0=