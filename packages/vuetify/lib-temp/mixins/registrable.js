import Vue from 'vue';
import { consoleWarn } from '../util/console';
function generateWarning(child, parent) {
    return () => consoleWarn(`The ${child} component must be used inside a ${parent}`);
}
export function inject(namespace, child, parent) {
    const defaultImpl = child && parent ? {
        register: generateWarning(child, parent),
        unregister: generateWarning(child, parent)
    } : null;
    return Vue.extend({
        name: 'registrable-inject',
        inject: {
            [namespace]: {
                default: defaultImpl
            }
        }
    });
}
export function provide(namespace) {
    return Vue.extend({
        name: 'registrable-provide',
        methods: {
            register: null,
            unregister: null
        },
        provide() {
            return {
                [namespace]: {
                    register: this.register,
                    unregister: this.unregister
                }
            };
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW5zL3JlZ2lzdHJhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQTtBQUVyQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFN0MsU0FBUyxlQUFlLENBQUUsS0FBYSxFQUFFLE1BQWM7SUFDckQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxLQUFLLG9DQUFvQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQ3BGLENBQUM7QUFTRCxNQUFNLFVBQVUsTUFBTSxDQUFvQixTQUFZLEVBQUUsS0FBYyxFQUFFLE1BQWU7SUFDckYsTUFBTSxXQUFXLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBQ3hDLFVBQVUsRUFBRSxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztLQUMzQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFFUixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDaEIsSUFBSSxFQUFFLG9CQUFvQjtRQUUxQixNQUFNLEVBQUU7WUFDTixDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNYLE9BQU8sRUFBRSxXQUFXO2FBQ3JCO1NBQ0Y7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBRSxTQUFpQjtJQUN4QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDaEIsSUFBSSxFQUFFLHFCQUFxQjtRQUUzQixPQUFPLEVBQUU7WUFDUCxRQUFRLEVBQUUsSUFBSTtZQUNkLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsT0FBTztZQUNMLE9BQU87Z0JBQ0wsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDWCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDNUI7YUFDRixDQUFBO1FBQ0gsQ0FBQztLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCB7IFZ1ZUNvbnN0cnVjdG9yIH0gZnJvbSAndnVlL3R5cGVzL3Z1ZSdcbmltcG9ydCB7IGNvbnNvbGVXYXJuIH0gZnJvbSAnLi4vdXRpbC9jb25zb2xlJ1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVdhcm5pbmcgKGNoaWxkOiBzdHJpbmcsIHBhcmVudDogc3RyaW5nKSB7XG4gIHJldHVybiAoKSA9PiBjb25zb2xlV2FybihgVGhlICR7Y2hpbGR9IGNvbXBvbmVudCBtdXN0IGJlIHVzZWQgaW5zaWRlIGEgJHtwYXJlbnR9YClcbn1cblxuZXhwb3J0IHR5cGUgUmVnaXN0cmFibGU8VCBleHRlbmRzIHN0cmluZz4gPSBWdWVDb25zdHJ1Y3RvcjxWdWUgJiB7XG4gIFtLIGluIFRdOiB7XG4gICAgcmVnaXN0ZXIgKC4uLnByb3BzOiBhbnlbXSk6IHZvaWRcbiAgICB1bnJlZ2lzdGVyIChzZWxmOiBhbnkpOiB2b2lkXG4gIH1cbn0+XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3Q8VCBleHRlbmRzIHN0cmluZz4gKG5hbWVzcGFjZTogVCwgY2hpbGQ/OiBzdHJpbmcsIHBhcmVudD86IHN0cmluZyk6IFJlZ2lzdHJhYmxlPFQ+IHtcbiAgY29uc3QgZGVmYXVsdEltcGwgPSBjaGlsZCAmJiBwYXJlbnQgPyB7XG4gICAgcmVnaXN0ZXI6IGdlbmVyYXRlV2FybmluZyhjaGlsZCwgcGFyZW50KSxcbiAgICB1bnJlZ2lzdGVyOiBnZW5lcmF0ZVdhcm5pbmcoY2hpbGQsIHBhcmVudClcbiAgfSA6IG51bGxcblxuICByZXR1cm4gVnVlLmV4dGVuZCh7XG4gICAgbmFtZTogJ3JlZ2lzdHJhYmxlLWluamVjdCcsXG5cbiAgICBpbmplY3Q6IHtcbiAgICAgIFtuYW1lc3BhY2VdOiB7XG4gICAgICAgIGRlZmF1bHQ6IGRlZmF1bHRJbXBsXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZSAobmFtZXNwYWNlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFZ1ZS5leHRlbmQoe1xuICAgIG5hbWU6ICdyZWdpc3RyYWJsZS1wcm92aWRlJyxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHJlZ2lzdGVyOiBudWxsLFxuICAgICAgdW5yZWdpc3RlcjogbnVsbFxuICAgIH0sXG4gICAgcHJvdmlkZSAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbbmFtZXNwYWNlXToge1xuICAgICAgICAgIHJlZ2lzdGVyOiB0aGlzLnJlZ2lzdGVyLFxuICAgICAgICAgIHVucmVnaXN0ZXI6IHRoaXMudW5yZWdpc3RlclxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuIl19