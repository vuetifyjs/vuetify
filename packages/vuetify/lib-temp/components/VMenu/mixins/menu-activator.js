/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
/* @vue/component */
export default {
    methods: {
        activatorClickHandler(e) {
            if (this.disabled)
                return;
            if (this.openOnClick && !this.isActive) {
                this.getActivator().focus();
                this.isActive = true;
                this.absoluteX = e.clientX;
                this.absoluteY = e.clientY;
            }
            else if (this.closeOnClick && this.isActive) {
                this.getActivator().blur();
                this.isActive = false;
            }
        },
        mouseEnterHandler() {
            this.runDelay('open', () => {
                if (this.hasJustFocused)
                    return;
                this.hasJustFocused = true;
                this.isActive = true;
            });
        },
        mouseLeaveHandler(e) {
            // Prevent accidental re-activation
            this.runDelay('close', () => {
                if (this.$refs.content.contains(e.relatedTarget))
                    return;
                requestAnimationFrame(() => {
                    this.isActive = false;
                    this.callDeactivate();
                });
            });
        },
        addActivatorEvents(activator = null) {
            if (!activator)
                return;
            activator.addEventListener('click', this.activatorClickHandler);
        },
        removeActivatorEvents(activator = null) {
            if (!activator)
                return;
            activator.removeEventListener('click', this.activatorClickHandler);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1hY3RpdmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WTWVudS9taXhpbnMvbWVudS1hY3RpdmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUNILG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsT0FBTyxFQUFFO1FBQ1AscUJBQXFCLENBQUUsQ0FBQztZQUN0QixJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU07WUFDekIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtnQkFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFBO2dCQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUE7YUFDM0I7aUJBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7YUFDdEI7UUFDSCxDQUFDO1FBQ0QsaUJBQWlCO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUN6QixJQUFJLElBQUksQ0FBQyxjQUFjO29CQUFFLE9BQU07Z0JBRS9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxpQkFBaUIsQ0FBRSxDQUFDO1lBQ2xCLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7b0JBQUUsT0FBTTtnQkFFeEQscUJBQXFCLENBQUMsR0FBRyxFQUFFO29CQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtvQkFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO2dCQUN2QixDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELGtCQUFrQixDQUFFLFNBQVMsR0FBRyxJQUFJO1lBQ2xDLElBQUksQ0FBQyxTQUFTO2dCQUFFLE9BQU07WUFDdEIsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUNqRSxDQUFDO1FBQ0QscUJBQXFCLENBQUUsU0FBUyxHQUFHLElBQUk7WUFDckMsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsT0FBTTtZQUN0QixTQUFTLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQ3BFLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1lbnUgYWN0aXZhdG9yXG4gKlxuICogQG1peGluXG4gKlxuICogSGFuZGxlcyB0aGUgY2xpY2sgYW5kIGhvdmVyIGFjdGl2YXRpb25cbiAqIFN1cHBvcnRzIHNsb3R0ZWQgYW5kIGRldGFjaGVkIGFjdGl2YXRvcnNcbiAqL1xuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuICAgIGFjdGl2YXRvckNsaWNrSGFuZGxlciAoZSkge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVyblxuICAgICAgaWYgKHRoaXMub3Blbk9uQ2xpY2sgJiYgIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5nZXRBY3RpdmF0b3IoKS5mb2N1cygpXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMuYWJzb2x1dGVYID0gZS5jbGllbnRYXG4gICAgICAgIHRoaXMuYWJzb2x1dGVZID0gZS5jbGllbnRZXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2xvc2VPbkNsaWNrICYmIHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5nZXRBY3RpdmF0b3IoKS5ibHVyKClcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBtb3VzZUVudGVySGFuZGxlciAoKSB7XG4gICAgICB0aGlzLnJ1bkRlbGF5KCdvcGVuJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5oYXNKdXN0Rm9jdXNlZCkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5oYXNKdXN0Rm9jdXNlZCA9IHRydWVcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWVcbiAgICAgIH0pXG4gICAgfSxcbiAgICBtb3VzZUxlYXZlSGFuZGxlciAoZSkge1xuICAgICAgLy8gUHJldmVudCBhY2NpZGVudGFsIHJlLWFjdGl2YXRpb25cbiAgICAgIHRoaXMucnVuRGVsYXkoJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy4kcmVmcy5jb250ZW50LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVyblxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5jYWxsRGVhY3RpdmF0ZSgpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgYWRkQWN0aXZhdG9yRXZlbnRzIChhY3RpdmF0b3IgPSBudWxsKSB7XG4gICAgICBpZiAoIWFjdGl2YXRvcikgcmV0dXJuXG4gICAgICBhY3RpdmF0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdGl2YXRvckNsaWNrSGFuZGxlcilcbiAgICB9LFxuICAgIHJlbW92ZUFjdGl2YXRvckV2ZW50cyAoYWN0aXZhdG9yID0gbnVsbCkge1xuICAgICAgaWYgKCFhY3RpdmF0b3IpIHJldHVyblxuICAgICAgYWN0aXZhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RpdmF0b3JDbGlja0hhbmRsZXIpXG4gICAgfVxuICB9XG59XG4iXX0=