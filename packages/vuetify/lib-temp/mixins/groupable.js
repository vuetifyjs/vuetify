// Mixins
import { inject as RegistrableInject } from './registrable';
export function factory(namespace, child, parent) {
    return RegistrableInject(namespace, child, parent).extend({
        name: 'groupable',
        props: {
            activeClass: {
                type: String,
                default() {
                    if (!this[namespace])
                        return undefined;
                    return this[namespace].activeClass;
                }
            },
            disabled: Boolean
        },
        data() {
            return {
                isActive: false
            };
        },
        computed: {
            groupClasses() {
                if (!this.activeClass)
                    return {};
                return {
                    [this.activeClass]: this.isActive
                };
            }
        },
        created() {
            this[namespace] && this[namespace].register(this);
        },
        beforeDestroy() {
            this[namespace] && this[namespace].unregister(this);
        },
        methods: {
            toggle() {
                this.$emit('change');
            }
        }
    });
}
/* eslint-disable-next-line no-redeclare */
const Groupable = factory('itemGroup');
export default Groupable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9ncm91cGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUztBQUNULE9BQU8sRUFBZSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFleEUsTUFBTSxVQUFVLE9BQU8sQ0FDckIsU0FBWSxFQUNaLEtBQWMsRUFDZCxNQUFlO0lBRWYsT0FBTyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RCxJQUFJLEVBQUUsV0FBVztRQUVqQixLQUFLLEVBQUU7WUFDTCxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTztvQkFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFBRSxPQUFPLFNBQVMsQ0FBQTtvQkFFdEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFBO2dCQUNwQyxDQUFDO2FBQzhCO1lBQ2pDLFFBQVEsRUFBRSxPQUFPO1NBQ2xCO1FBRUQsSUFBSTtZQUNGLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQTtRQUNILENBQUM7UUFFRCxRQUFRLEVBQUU7WUFDUixZQUFZO2dCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztvQkFBRSxPQUFPLEVBQUUsQ0FBQTtnQkFFaEMsT0FBTztvQkFDTCxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDbEMsQ0FBQTtZQUNILENBQUM7U0FDRjtRQUVELE9BQU87WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUssSUFBSSxDQUFDLFNBQVMsQ0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1RCxDQUFDO1FBRUQsYUFBYTtZQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSyxJQUFJLENBQUMsU0FBUyxDQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlELENBQUM7UUFFRCxPQUFPLEVBQUU7WUFDUCxNQUFNO2dCQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDdEIsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVELDJDQUEyQztBQUMzQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7QUFFdEMsZUFBZSxTQUFTLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNaXhpbnNcbmltcG9ydCB7IFJlZ2lzdHJhYmxlLCBpbmplY3QgYXMgUmVnaXN0cmFibGVJbmplY3QgfSBmcm9tICcuL3JlZ2lzdHJhYmxlJ1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7IEV4dHJhY3RWdWUgfSBmcm9tICcuLi91dGlsL21peGlucydcbmltcG9ydCB7IFByb3BWYWxpZGF0b3IgfSBmcm9tICd2dWUvdHlwZXMvb3B0aW9ucydcbmltcG9ydCB7IFZ1ZUNvbnN0cnVjdG9yIH0gZnJvbSAndnVlJ1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmV4cG9ydCB0eXBlIEdyb3VwYWJsZTxUIGV4dGVuZHMgc3RyaW5nPiA9IFZ1ZUNvbnN0cnVjdG9yPEV4dHJhY3RWdWU8UmVnaXN0cmFibGU8VD4+ICYge1xuICBhY3RpdmVDbGFzczogc3RyaW5nXG4gIGlzQWN0aXZlOiBib29sZWFuXG4gIGdyb3VwQ2xhc3Nlczogb2JqZWN0XG4gIHRvZ2dsZSAoKTogdm9pZFxufT5cblxuZXhwb3J0IGZ1bmN0aW9uIGZhY3Rvcnk8VCBleHRlbmRzIHN0cmluZz4gKFxuICBuYW1lc3BhY2U6IFQsXG4gIGNoaWxkPzogc3RyaW5nLFxuICBwYXJlbnQ/OiBzdHJpbmdcbik6IEdyb3VwYWJsZTxUPiB7XG4gIHJldHVybiBSZWdpc3RyYWJsZUluamVjdChuYW1lc3BhY2UsIGNoaWxkLCBwYXJlbnQpLmV4dGVuZCh7XG4gICAgbmFtZTogJ2dyb3VwYWJsZScsXG5cbiAgICBwcm9wczoge1xuICAgICAgYWN0aXZlQ2xhc3M6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0ICgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICAgIGlmICghdGhpc1tuYW1lc3BhY2VdKSByZXR1cm4gdW5kZWZpbmVkXG5cbiAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lc3BhY2VdLmFjdGl2ZUNsYXNzXG4gICAgICAgIH1cbiAgICAgIH0gYXMgYW55IGFzIFByb3BWYWxpZGF0b3I8c3RyaW5nPixcbiAgICAgIGRpc2FibGVkOiBCb29sZWFuXG4gICAgfSxcblxuICAgIGRhdGEgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNBY3RpdmU6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBncm91cENsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmVDbGFzcykgcmV0dXJuIHt9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBbdGhpcy5hY3RpdmVDbGFzc106IHRoaXMuaXNBY3RpdmVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVkICgpIHtcbiAgICAgIHRoaXNbbmFtZXNwYWNlXSAmJiAodGhpc1tuYW1lc3BhY2VdIGFzIGFueSkucmVnaXN0ZXIodGhpcylcbiAgICB9LFxuXG4gICAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgICB0aGlzW25hbWVzcGFjZV0gJiYgKHRoaXNbbmFtZXNwYWNlXSBhcyBhbnkpLnVucmVnaXN0ZXIodGhpcylcbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgdG9nZ2xlICgpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmUgKi9cbmNvbnN0IEdyb3VwYWJsZSA9IGZhY3RvcnkoJ2l0ZW1Hcm91cCcpXG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwYWJsZVxuIl19