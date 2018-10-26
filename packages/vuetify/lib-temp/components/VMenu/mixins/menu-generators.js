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
                    ...this.rootThemeClasses,
                    'v-menu__content--auto': this.auto,
                    'menuable__content__active': this.isActive,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1nZW5lcmF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVk1lbnUvbWl4aW5zL21lbnUtZ2VuZXJhdG9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLFlBQVk7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO2dCQUFFLE9BQU8sSUFBSSxDQUFBO1lBRXZDLE1BQU0sT0FBTyxHQUFHO2dCQUNkLFdBQVcsRUFBRSxtQkFBbUI7Z0JBQ2hDLE9BQU8sRUFBRTtvQkFDUCwyQkFBMkIsRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxRQUFRO29CQUNqRSw2QkFBNkIsRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDN0M7Z0JBQ0QsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLEVBQUUsRUFBRSxFQUFFO2FBQ1AsQ0FBQTtZQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUE7Z0JBQ2pELE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFBO2FBQ2xEO2lCQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUE7YUFDakQ7WUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ25FLENBQUM7UUFFRCxhQUFhO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBRTlDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZDLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7aUJBQ3RCO2FBQ0YsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDekIsQ0FBQztRQUVELGFBQWE7WUFDWCwwQ0FBMEM7WUFDMUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNELElBQUksRUFBRSxlQUFlO29CQUNyQixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDcEMsSUFBSSxFQUFFO3dCQUNKLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7d0JBQ3ZDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztxQkFDOUQ7aUJBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFFUCxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZTthQUM1QixDQUFDLENBQUE7WUFFRixPQUFPLFVBQVUsQ0FBQTtRQUNuQixDQUFDO1FBRUQsVUFBVTtZQUNSLE1BQU0sT0FBTyxHQUFHO2dCQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUM3QixXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixPQUFPLEVBQUU7b0JBQ1AsR0FBRyxJQUFJLENBQUMsZ0JBQWdCO29CQUN4Qix1QkFBdUIsRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDbEMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQzFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUk7aUJBQ2pDO2dCQUNELEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hDLEdBQUcsRUFBRSxTQUFTO2dCQUNkLEVBQUUsRUFBRTtvQkFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7d0JBQ1QsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO3dCQUNuQixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs0QkFBRSxPQUFNO3dCQUM3QyxJQUFJLElBQUksQ0FBQyxtQkFBbUI7NEJBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7b0JBQ3JELENBQUM7aUJBQ0Y7YUFDRixDQUFBO1lBRUQsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUN0RixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7WUFFcEUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDdkYsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICBnZW5BY3RpdmF0b3IgKCkge1xuICAgICAgaWYgKCF0aGlzLiRzbG90cy5hY3RpdmF0b3IpIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1tZW51X19hY3RpdmF0b3InLFxuICAgICAgICAnY2xhc3MnOiB7XG4gICAgICAgICAgJ3YtbWVudV9fYWN0aXZhdG9yLS1hY3RpdmUnOiB0aGlzLmhhc0p1c3RGb2N1c2VkIHx8IHRoaXMuaXNBY3RpdmUsXG4gICAgICAgICAgJ3YtbWVudV9fYWN0aXZhdG9yLS1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgfSxcbiAgICAgICAgcmVmOiAnYWN0aXZhdG9yJyxcbiAgICAgICAgb246IHt9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wZW5PbkhvdmVyKSB7XG4gICAgICAgIG9wdGlvbnMub25bJ21vdXNlZW50ZXInXSA9IHRoaXMubW91c2VFbnRlckhhbmRsZXJcbiAgICAgICAgb3B0aW9ucy5vblsnbW91c2VsZWF2ZSddID0gdGhpcy5tb3VzZUxlYXZlSGFuZGxlclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZW5PbkNsaWNrKSB7XG4gICAgICAgIG9wdGlvbnMub25bJ2NsaWNrJ10gPSB0aGlzLmFjdGl2YXRvckNsaWNrSGFuZGxlclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywgb3B0aW9ucywgdGhpcy4kc2xvdHMuYWN0aXZhdG9yKVxuICAgIH0sXG5cbiAgICBnZW5UcmFuc2l0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy50cmFuc2l0aW9uKSByZXR1cm4gdGhpcy5nZW5Db250ZW50KClcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RyYW5zaXRpb24nLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgbmFtZTogdGhpcy50cmFuc2l0aW9uXG4gICAgICAgIH1cbiAgICAgIH0sIFt0aGlzLmdlbkNvbnRlbnQoKV0pXG4gICAgfSxcblxuICAgIGdlbkRpcmVjdGl2ZXMgKCkge1xuICAgICAgLy8gRG8gbm90IGFkZCBjbGljayBvdXRzaWRlIGZvciBob3ZlciBtZW51XG4gICAgICBjb25zdCBkaXJlY3RpdmVzID0gIXRoaXMub3Blbk9uSG92ZXIgJiYgdGhpcy5jbG9zZU9uQ2xpY2sgPyBbe1xuICAgICAgICBuYW1lOiAnY2xpY2stb3V0c2lkZScsXG4gICAgICAgIHZhbHVlOiAoKSA9PiAodGhpcy5pc0FjdGl2ZSA9IGZhbHNlKSxcbiAgICAgICAgYXJnczoge1xuICAgICAgICAgIGNsb3NlQ29uZGl0aW9uYWw6IHRoaXMuY2xvc2VDb25kaXRpb25hbCxcbiAgICAgICAgICBpbmNsdWRlOiAoKSA9PiBbdGhpcy4kZWwsIC4uLnRoaXMuZ2V0T3BlbkRlcGVuZGVudEVsZW1lbnRzKCldXG4gICAgICAgIH1cbiAgICAgIH1dIDogW11cblxuICAgICAgZGlyZWN0aXZlcy5wdXNoKHtcbiAgICAgICAgbmFtZTogJ3Nob3cnLFxuICAgICAgICB2YWx1ZTogdGhpcy5pc0NvbnRlbnRBY3RpdmVcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBkaXJlY3RpdmVzXG4gICAgfSxcblxuICAgIGdlbkNvbnRlbnQgKCkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgYXR0cnM6IHRoaXMuZ2V0U2NvcGVJZEF0dHJzKCksXG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1tZW51X19jb250ZW50JyxcbiAgICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAgIC4uLnRoaXMucm9vdFRoZW1lQ2xhc3NlcyxcbiAgICAgICAgICAndi1tZW51X19jb250ZW50LS1hdXRvJzogdGhpcy5hdXRvLFxuICAgICAgICAgICdtZW51YWJsZV9fY29udGVudF9fYWN0aXZlJzogdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgICBbdGhpcy5jb250ZW50Q2xhc3MudHJpbSgpXTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZTogdGhpcy5zdHlsZXMsXG4gICAgICAgIGRpcmVjdGl2ZXM6IHRoaXMuZ2VuRGlyZWN0aXZlcygpLFxuICAgICAgICByZWY6ICdjb250ZW50JyxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpKSByZXR1cm5cbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlT25Db250ZW50Q2xpY2spIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLm9wZW5PbkhvdmVyICYmIChvcHRpb25zLm9uLm1vdXNlZW50ZXIgPSB0aGlzLm1vdXNlRW50ZXJIYW5kbGVyKVxuICAgICAgdGhpcy5vcGVuT25Ib3ZlciAmJiAob3B0aW9ucy5vbi5tb3VzZWxlYXZlID0gdGhpcy5tb3VzZUxlYXZlSGFuZGxlcilcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIG9wdGlvbnMsIHRoaXMuc2hvd0xhenlDb250ZW50KHRoaXMuJHNsb3RzLmRlZmF1bHQpKVxuICAgIH1cbiAgfVxufVxuIl19