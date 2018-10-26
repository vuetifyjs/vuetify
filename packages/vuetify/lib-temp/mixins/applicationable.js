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
            },
            applicationProperty(newVal, oldVal) {
                this.$vuetify.application.unbind(this._uid, oldVal);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25hYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9hcHBsaWNhdGlvbmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sSUFBSSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRy9ELE9BQU87QUFDUCxPQUFPLE1BQU0sTUFBTSxnQkFBZ0IsQ0FBQTtBQUVuQyxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FBRSxLQUFpQixFQUFFLFNBQW1CLEVBQUU7SUFDL0Usb0JBQW9CO0lBQ3BCLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDL0QsSUFBSSxFQUFFLGlCQUFpQjtRQUV2QixLQUFLLEVBQUU7WUFDTCxHQUFHLEVBQUUsT0FBTztTQUNiO1FBRUQsUUFBUSxFQUFFO1lBQ1IsbUJBQW1CO2dCQUNqQixPQUFPLEtBQUssQ0FBQTtZQUNkLENBQUM7U0FDRjtRQUVELEtBQUssRUFBRTtZQUNMLDRCQUE0QjtZQUM1QiwwQkFBMEI7WUFDMUIsR0FBRyxDQUFFLENBQVUsRUFBRSxJQUFhO2dCQUM1QixJQUFJO29CQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO29CQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3ZCLENBQUM7WUFDRCxtQkFBbUIsQ0FBRSxNQUFNLEVBQUUsTUFBTTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDckQsQ0FBQztTQUNGO1FBRUQsU0FBUztZQUNQLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNuQixDQUFDO1FBRUQsT0FBTztZQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTthQUN4QztZQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNuQixDQUFDO1FBRUQsT0FBTztZQUNMLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNuQixDQUFDO1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBQzFCLENBQUM7UUFFRCxTQUFTO1lBQ1AsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFDMUIsQ0FBQztRQUVELE9BQU8sRUFBRTtZQUNQLFVBQVU7Z0JBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUFFLE9BQU07Z0JBRXJCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDNUIsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsbUJBQW1CLEVBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUN6QixDQUFBO1lBQ0gsQ0FBQztZQUNELGlCQUFpQixDQUFFLEtBQUssR0FBRyxLQUFLO2dCQUM5QixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQUUsT0FBTTtnQkFFL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUM5QixJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQTtZQUNILENBQUM7WUFDRCxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZhY3RvcnkgYXMgUG9zaXRpb25hYmxlRmFjdG9yeSB9IGZyb20gJy4vcG9zaXRpb25hYmxlJ1xuaW1wb3J0IHsgVGFyZ2V0UHJvcCB9IGZyb20gJ3NyYy9jb21wb25lbnRzL1Z1ZXRpZnkvbWl4aW5zL2FwcGxpY2F0aW9uJ1xuXG4vLyBVdGlsXG5pbXBvcnQgbWl4aW5zIGZyb20gJy4uL3V0aWwvbWl4aW5zJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHBsaWNhdGlvbmFibGUgKHZhbHVlOiBUYXJnZXRQcm9wLCBldmVudHM6IHN0cmluZ1tdID0gW10pIHtcbiAgLyogQHZ1ZS9jb21wb25lbnQgKi9cbiAgcmV0dXJuIG1peGlucyhQb3NpdGlvbmFibGVGYWN0b3J5KFsnYWJzb2x1dGUnLCAnZml4ZWQnXSkpLmV4dGVuZCh7XG4gICAgbmFtZTogJ2FwcGxpY2F0aW9uYWJsZScsXG5cbiAgICBwcm9wczoge1xuICAgICAgYXBwOiBCb29sZWFuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBhcHBsaWNhdGlvblByb3BlcnR5ICgpOiBUYXJnZXRQcm9wIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICB9XG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG4gICAgICAvLyBJZiBwcmV2aW91cyB2YWx1ZSB3YXMgYXBwXG4gICAgICAvLyByZXNldCB0aGUgcHJvdmlkZWQgcHJvcFxuICAgICAgYXBwICh4OiBib29sZWFuLCBwcmV2OiBib29sZWFuKSB7XG4gICAgICAgIHByZXZcbiAgICAgICAgICA/IHRoaXMucmVtb3ZlQXBwbGljYXRpb24odHJ1ZSlcbiAgICAgICAgICA6IHRoaXMuY2FsbFVwZGF0ZSgpXG4gICAgICB9LFxuICAgICAgYXBwbGljYXRpb25Qcm9wZXJ0eSAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvbi51bmJpbmQodGhpcy5fdWlkLCBvbGRWYWwpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGFjdGl2YXRlZCAoKSB7XG4gICAgICB0aGlzLmNhbGxVcGRhdGUoKVxuICAgIH0sXG5cbiAgICBjcmVhdGVkICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBldmVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy4kd2F0Y2goZXZlbnRzW2ldLCB0aGlzLmNhbGxVcGRhdGUpXG4gICAgICB9XG4gICAgICB0aGlzLmNhbGxVcGRhdGUoKVxuICAgIH0sXG5cbiAgICBtb3VudGVkICgpIHtcbiAgICAgIHRoaXMuY2FsbFVwZGF0ZSgpXG4gICAgfSxcblxuICAgIGRlYWN0aXZhdGVkICgpIHtcbiAgICAgIHRoaXMucmVtb3ZlQXBwbGljYXRpb24oKVxuICAgIH0sXG5cbiAgICBkZXN0cm95ZWQgKCkge1xuICAgICAgdGhpcy5yZW1vdmVBcHBsaWNhdGlvbigpXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgIGNhbGxVcGRhdGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXBwKSByZXR1cm5cblxuICAgICAgICB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLmJpbmQoXG4gICAgICAgICAgdGhpcy5fdWlkLFxuICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25Qcm9wZXJ0eSxcbiAgICAgICAgICB0aGlzLnVwZGF0ZUFwcGxpY2F0aW9uKClcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUFwcGxpY2F0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghZm9yY2UgJiYgIXRoaXMuYXBwKSByZXR1cm5cblxuICAgICAgICB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLnVuYmluZChcbiAgICAgICAgICB0aGlzLl91aWQsXG4gICAgICAgICAgdGhpcy5hcHBsaWNhdGlvblByb3BlcnR5XG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICB1cGRhdGVBcHBsaWNhdGlvbjogKCkgPT4gMFxuICAgIH1cbiAgfSlcbn1cbiJdfQ==