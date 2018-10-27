/**
 * Menu generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VMenu
 */
/* @vue/component */
export default {
    methods: {
        genActivator() {
            if (!this.$slots.activator)
                return null;
            const options = {
                staticClass: 'v-menu__activator',
                'class': {
                    'v-menu__activator--active': this.hasJustFocused || this.isActive,
                    'v-menu__activator--disabled': this.disabled
                },
                ref: 'activator',
                on: {}
            };
            if (this.openOnHover) {
                options.on['mouseenter'] = this.mouseEnterHandler;
                options.on['mouseleave'] = this.mouseLeaveHandler;
            }
            else if (this.openOnClick) {
                options.on['click'] = this.activatorClickHandler;
            }
            return this.$createElement('div', options, this.$slots.activator);
        },
        genTransition() {
            if (!this.transition)
                return this.genContent();
            return this.$createElement('transition', {
                props: {
                    name: this.transition
                }
            }, [this.genContent()]);
        },
        genDirectives() {
            // Do not add click outside for hover menu
            const directives = !this.openOnHover && this.closeOnClick ? [{
                    name: 'click-outside',
                    value: () => (this.isActive = false),
                    args: {
                        closeConditional: this.closeConditional,
                        include: () => [this.$el, ...this.getOpenDependentElements()]
                    }
                }] : [];
            directives.push({
                name: 'show',
                value: this.isContentActive
            });
            return directives;
        },
        genContent() {
            const options = {
                attrs: this.getScopeIdAttrs(),
                staticClass: 'v-menu__content',
                'class': {
                    'v-menu__content--auto': this.auto,
                    'menuable__content__active': this.isActive,
                    ...this.themeClasses,
                    [this.contentClass.trim()]: true
                },
                style: this.styles,
                directives: this.genDirectives(),
                ref: 'content',
                on: {
                    click: e => {
                        e.stopPropagation();
                        if (e.target.getAttribute('disabled'))
                            return;
                        if (this.closeOnContentClick)
                            this.isActive = false;
                    }
                }
            };
            !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler);
            this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler);
            return this.$createElement('div', options, this.showLazyContent(this.$slots.default));
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1nZW5lcmF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVk1lbnUvbWl4aW5zL21lbnUtZ2VuZXJhdG9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLFlBQVk7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO2dCQUFFLE9BQU8sSUFBSSxDQUFBO1lBRXZDLE1BQU0sT0FBTyxHQUFHO2dCQUNkLFdBQVcsRUFBRSxtQkFBbUI7Z0JBQ2hDLE9BQU8sRUFBRTtvQkFDUCwyQkFBMkIsRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxRQUFRO29CQUNqRSw2QkFBNkIsRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDN0M7Z0JBQ0QsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLEVBQUUsRUFBRSxFQUFFO2FBQ1AsQ0FBQTtZQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUE7Z0JBQ2pELE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFBO2FBQ2xEO2lCQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUE7YUFDakQ7WUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ25FLENBQUM7UUFFRCxhQUFhO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBRTlDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZDLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7aUJBQ3RCO2FBQ0YsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDekIsQ0FBQztRQUVELGFBQWE7WUFDWCwwQ0FBMEM7WUFDMUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNELElBQUksRUFBRSxlQUFlO29CQUNyQixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDcEMsSUFBSSxFQUFFO3dCQUNKLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7d0JBQ3ZDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztxQkFDOUQ7aUJBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFFUCxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZTthQUM1QixDQUFDLENBQUE7WUFFRixPQUFPLFVBQVUsQ0FBQTtRQUNuQixDQUFDO1FBRUQsVUFBVTtZQUNSLE1BQU0sT0FBTyxHQUFHO2dCQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUM3QixXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixPQUFPLEVBQUU7b0JBQ1AsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2xDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxRQUFRO29CQUMxQyxHQUFHLElBQUksQ0FBQyxZQUFZO29CQUNwQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJO2lCQUNqQztnQkFDRCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ2xCLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQyxHQUFHLEVBQUUsU0FBUztnQkFDZCxFQUFFLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO3dCQUNULENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTt3QkFDbkIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7NEJBQUUsT0FBTTt3QkFDN0MsSUFBSSxJQUFJLENBQUMsbUJBQW1COzRCQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO29CQUNyRCxDQUFDO2lCQUNGO2FBQ0YsQ0FBQTtZQUVELENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7WUFDdEYsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBRXBFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3ZGLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1lbnUgZ2VuZXJhdG9yc1xuICpcbiAqIEBtaXhpblxuICpcbiAqIFVzZWQgZm9yIGNyZWF0aW5nIHRoZSBET00gZWxlbWVudHMgZm9yIFZNZW51XG4gKi9cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICBnZW5BY3RpdmF0b3IgKCkge1xuICAgICAgaWYgKCF0aGlzLiRzbG90cy5hY3RpdmF0b3IpIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1tZW51X19hY3RpdmF0b3InLFxuICAgICAgICAnY2xhc3MnOiB7XG4gICAgICAgICAgJ3YtbWVudV9fYWN0aXZhdG9yLS1hY3RpdmUnOiB0aGlzLmhhc0p1c3RGb2N1c2VkIHx8IHRoaXMuaXNBY3RpdmUsXG4gICAgICAgICAgJ3YtbWVudV9fYWN0aXZhdG9yLS1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgfSxcbiAgICAgICAgcmVmOiAnYWN0aXZhdG9yJyxcbiAgICAgICAgb246IHt9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wZW5PbkhvdmVyKSB7XG4gICAgICAgIG9wdGlvbnMub25bJ21vdXNlZW50ZXInXSA9IHRoaXMubW91c2VFbnRlckhhbmRsZXJcbiAgICAgICAgb3B0aW9ucy5vblsnbW91c2VsZWF2ZSddID0gdGhpcy5tb3VzZUxlYXZlSGFuZGxlclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZW5PbkNsaWNrKSB7XG4gICAgICAgIG9wdGlvbnMub25bJ2NsaWNrJ10gPSB0aGlzLmFjdGl2YXRvckNsaWNrSGFuZGxlclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywgb3B0aW9ucywgdGhpcy4kc2xvdHMuYWN0aXZhdG9yKVxuICAgIH0sXG5cbiAgICBnZW5UcmFuc2l0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy50cmFuc2l0aW9uKSByZXR1cm4gdGhpcy5nZW5Db250ZW50KClcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RyYW5zaXRpb24nLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgbmFtZTogdGhpcy50cmFuc2l0aW9uXG4gICAgICAgIH1cbiAgICAgIH0sIFt0aGlzLmdlbkNvbnRlbnQoKV0pXG4gICAgfSxcblxuICAgIGdlbkRpcmVjdGl2ZXMgKCkge1xuICAgICAgLy8gRG8gbm90IGFkZCBjbGljayBvdXRzaWRlIGZvciBob3ZlciBtZW51XG4gICAgICBjb25zdCBkaXJlY3RpdmVzID0gIXRoaXMub3Blbk9uSG92ZXIgJiYgdGhpcy5jbG9zZU9uQ2xpY2sgPyBbe1xuICAgICAgICBuYW1lOiAnY2xpY2stb3V0c2lkZScsXG4gICAgICAgIHZhbHVlOiAoKSA9PiAodGhpcy5pc0FjdGl2ZSA9IGZhbHNlKSxcbiAgICAgICAgYXJnczoge1xuICAgICAgICAgIGNsb3NlQ29uZGl0aW9uYWw6IHRoaXMuY2xvc2VDb25kaXRpb25hbCxcbiAgICAgICAgICBpbmNsdWRlOiAoKSA9PiBbdGhpcy4kZWwsIC4uLnRoaXMuZ2V0T3BlbkRlcGVuZGVudEVsZW1lbnRzKCldXG4gICAgICAgIH1cbiAgICAgIH1dIDogW11cblxuICAgICAgZGlyZWN0aXZlcy5wdXNoKHtcbiAgICAgICAgbmFtZTogJ3Nob3cnLFxuICAgICAgICB2YWx1ZTogdGhpcy5pc0NvbnRlbnRBY3RpdmVcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBkaXJlY3RpdmVzXG4gICAgfSxcblxuICAgIGdlbkNvbnRlbnQgKCkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgYXR0cnM6IHRoaXMuZ2V0U2NvcGVJZEF0dHJzKCksXG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1tZW51X19jb250ZW50JyxcbiAgICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAgICd2LW1lbnVfX2NvbnRlbnQtLWF1dG8nOiB0aGlzLmF1dG8sXG4gICAgICAgICAgJ21lbnVhYmxlX19jb250ZW50X19hY3RpdmUnOiB0aGlzLmlzQWN0aXZlLFxuICAgICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzLFxuICAgICAgICAgIFt0aGlzLmNvbnRlbnRDbGFzcy50cmltKCldOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB0aGlzLnN0eWxlcyxcbiAgICAgICAgZGlyZWN0aXZlczogdGhpcy5nZW5EaXJlY3RpdmVzKCksXG4gICAgICAgIHJlZjogJ2NvbnRlbnQnLFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGNsaWNrOiBlID0+IHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpIHJldHVyblxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkNvbnRlbnRDbGljaykgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICF0aGlzLmRpc2FibGVkICYmIHRoaXMub3Blbk9uSG92ZXIgJiYgKG9wdGlvbnMub24ubW91c2VlbnRlciA9IHRoaXMubW91c2VFbnRlckhhbmRsZXIpXG4gICAgICB0aGlzLm9wZW5PbkhvdmVyICYmIChvcHRpb25zLm9uLm1vdXNlbGVhdmUgPSB0aGlzLm1vdXNlTGVhdmVIYW5kbGVyKVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywgb3B0aW9ucywgdGhpcy5zaG93TGF6eUNvbnRlbnQodGhpcy4kc2xvdHMuZGVmYXVsdCkpXG4gICAgfVxuICB9XG59XG4iXX0=