import { factory as PositionableFactory } from './positionable';
// Util
import mixins from '../util/mixins';
export default function applicationable(value, events = []) {
    /* @vue/component */
    return mixins(PositionableFactory(['absolute', 'fixed'])).extend({
        name: 'applicationable',
        props: {
            app: Boolean
        },
        computed: {
            applicationProperty() {
                return value;
            }
        },
        watch: {
            // If previous value was app
            // reset the provided prop
            app(x, prev) {
                prev
                    ? this.removeApplication(true)
                    : this.callUpdate();
            }
        },
        activated() {
            this.callUpdate();
        },
        created() {
            for (let i = 0, length = events.length; i < length; i++) {
                this.$watch(events[i], this.callUpdate);
            }
            this.callUpdate();
        },
        mounted() {
            this.callUpdate();
        },
        deactivated() {
            this.removeApplication();
        },
        destroyed() {
            this.removeApplication();
        },
        methods: {
            callUpdate() {
                if (!this.app)
                    return;
                this.$vuetify.application.bind(this._uid, this.applicationProperty, this.updateApplication());
            },
            removeApplication(force = false) {
                if (!force && !this.app)
                    return;
                this.$vuetify.application.unbind(this._uid, this.applicationProperty);
            },
            updateApplication: () => 0
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25hYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9hcHBsaWNhdGlvbmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sSUFBSSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRy9ELE9BQU87QUFDUCxPQUFPLE1BQU0sTUFBTSxnQkFBZ0IsQ0FBQTtBQUVuQyxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FBRSxLQUFpQixFQUFFLFNBQW1CLEVBQUU7SUFDL0Usb0JBQW9CO0lBQ3BCLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDL0QsSUFBSSxFQUFFLGlCQUFpQjtRQUV2QixLQUFLLEVBQUU7WUFDTCxHQUFHLEVBQUUsT0FBTztTQUNiO1FBRUQsUUFBUSxFQUFFO1lBQ1IsbUJBQW1CO2dCQUNqQixPQUFPLEtBQUssQ0FBQTtZQUNkLENBQUM7U0FDRjtRQUVELEtBQUssRUFBRTtZQUNMLDRCQUE0QjtZQUM1QiwwQkFBMEI7WUFDMUIsR0FBRyxDQUFFLENBQVUsRUFBRSxJQUFhO2dCQUM1QixJQUFJO29CQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO29CQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3ZCLENBQUM7U0FDRjtRQUVELFNBQVM7WUFDUCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbkIsQ0FBQztRQUVELE9BQU87WUFDTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7YUFDeEM7WUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbkIsQ0FBQztRQUVELE9BQU87WUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbkIsQ0FBQztRQUVELFdBQVc7WUFDVCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUMxQixDQUFDO1FBRUQsU0FBUztZQUNQLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBQzFCLENBQUM7UUFFRCxPQUFPLEVBQUU7WUFDUCxVQUFVO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRztvQkFBRSxPQUFNO2dCQUVyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQzVCLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLG1CQUFtQixFQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FDekIsQ0FBQTtZQUNILENBQUM7WUFDRCxpQkFBaUIsQ0FBRSxLQUFLLEdBQUcsS0FBSztnQkFDOUIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUFFLE9BQU07Z0JBRS9CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDOUIsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQ3pCLENBQUE7WUFDSCxDQUFDO1lBQ0QsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUMzQjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYWN0b3J5IGFzIFBvc2l0aW9uYWJsZUZhY3RvcnkgfSBmcm9tICcuL3Bvc2l0aW9uYWJsZSdcbmltcG9ydCB7IFRhcmdldFByb3AgfSBmcm9tICdzcmMvY29tcG9uZW50cy9WdWV0aWZ5L21peGlucy9hcHBsaWNhdGlvbidcblxuLy8gVXRpbFxuaW1wb3J0IG1peGlucyBmcm9tICcuLi91dGlsL21peGlucydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwbGljYXRpb25hYmxlICh2YWx1ZTogVGFyZ2V0UHJvcCwgZXZlbnRzOiBzdHJpbmdbXSA9IFtdKSB7XG4gIC8qIEB2dWUvY29tcG9uZW50ICovXG4gIHJldHVybiBtaXhpbnMoUG9zaXRpb25hYmxlRmFjdG9yeShbJ2Fic29sdXRlJywgJ2ZpeGVkJ10pKS5leHRlbmQoe1xuICAgIG5hbWU6ICdhcHBsaWNhdGlvbmFibGUnLFxuXG4gICAgcHJvcHM6IHtcbiAgICAgIGFwcDogQm9vbGVhblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuICAgICAgYXBwbGljYXRpb25Qcm9wZXJ0eSAoKTogVGFyZ2V0UHJvcCB7XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuICAgICAgLy8gSWYgcHJldmlvdXMgdmFsdWUgd2FzIGFwcFxuICAgICAgLy8gcmVzZXQgdGhlIHByb3ZpZGVkIHByb3BcbiAgICAgIGFwcCAoeDogYm9vbGVhbiwgcHJldjogYm9vbGVhbikge1xuICAgICAgICBwcmV2XG4gICAgICAgICAgPyB0aGlzLnJlbW92ZUFwcGxpY2F0aW9uKHRydWUpXG4gICAgICAgICAgOiB0aGlzLmNhbGxVcGRhdGUoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhY3RpdmF0ZWQgKCkge1xuICAgICAgdGhpcy5jYWxsVXBkYXRlKClcbiAgICB9LFxuXG4gICAgY3JlYXRlZCAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuJHdhdGNoKGV2ZW50c1tpXSwgdGhpcy5jYWxsVXBkYXRlKVxuICAgICAgfVxuICAgICAgdGhpcy5jYWxsVXBkYXRlKClcbiAgICB9LFxuXG4gICAgbW91bnRlZCAoKSB7XG4gICAgICB0aGlzLmNhbGxVcGRhdGUoKVxuICAgIH0sXG5cbiAgICBkZWFjdGl2YXRlZCAoKSB7XG4gICAgICB0aGlzLnJlbW92ZUFwcGxpY2F0aW9uKClcbiAgICB9LFxuXG4gICAgZGVzdHJveWVkICgpIHtcbiAgICAgIHRoaXMucmVtb3ZlQXBwbGljYXRpb24oKVxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICBjYWxsVXBkYXRlICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcCkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvbi5iaW5kKFxuICAgICAgICAgIHRoaXMuX3VpZCxcbiAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uUHJvcGVydHksXG4gICAgICAgICAgdGhpcy51cGRhdGVBcHBsaWNhdGlvbigpXG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICByZW1vdmVBcHBsaWNhdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWZvcmNlICYmICF0aGlzLmFwcCkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvbi51bmJpbmQoXG4gICAgICAgICAgdGhpcy5fdWlkLFxuICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25Qcm9wZXJ0eVxuICAgICAgICApXG4gICAgICB9LFxuICAgICAgdXBkYXRlQXBwbGljYXRpb246ICgpID0+IDBcbiAgICB9XG4gIH0pXG59XG4iXX0=