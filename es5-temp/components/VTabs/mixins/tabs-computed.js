/**
 * Tabs computed
 *
 * @mixin
 */
/* @vue/component */
export default {
    computed: {
        activeIndex() {
            return this.tabs.findIndex((tab, index) => {
                const id = tab.action === tab ? index : tab.action;
                return id === this.lazyValue;
            });
        },
        activeTab() {
            if (!this.tabs.length)
                return undefined;
            return this.tabs[this.activeIndex];
        },
        containerStyles() {
            return this.height ? {
                height: `${parseInt(this.height, 10)}px`
            } : null;
        },
        hasArrows() {
            return (this.showArrows || !this.isMobile) && this.isOverflowing;
        },
        inputValue: {
            get() {
                return this.lazyValue;
            },
            set(val) {
                if (this.inputValue === val)
                    return;
                this.lazyValue = val;
                this.$emit('input', val);
            }
        },
        isMobile() {
            return this.$vuetify.breakpoint.width < this.mobileBreakPoint;
        },
        sliderStyles() {
            return {
                left: `${this.sliderLeft}px`,
                transition: this.sliderLeft != null ? null : 'none',
                width: `${this.sliderWidth}px`
            };
        },
        target() {
            return this.activeTab
                ? this.activeTab.action
                : null;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1jb21wdXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUYWJzL21peGlucy90YWJzLWNvbXB1dGVkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLFFBQVEsRUFBRTtRQUNSLFdBQVc7WUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN4QyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFBO2dCQUNsRCxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQzlCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFNBQVM7WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU8sU0FBUyxDQUFBO1lBRXZDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDcEMsQ0FBQztRQUNELGVBQWU7WUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSTthQUN6QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFDVixDQUFDO1FBQ0QsU0FBUztZQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDbEUsQ0FBQztRQUNELFVBQVUsRUFBRTtZQUNWLEdBQUc7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQ3ZCLENBQUM7WUFDRCxHQUFHLENBQUUsR0FBRztnQkFDTixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssR0FBRztvQkFBRSxPQUFNO2dCQUVuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtnQkFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDMUIsQ0FBQztTQUNGO1FBQ0QsUUFBUTtZQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtRQUMvRCxDQUFDO1FBQ0QsWUFBWTtZQUNWLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSTtnQkFDNUIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU07Z0JBQ25ELEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUk7YUFDL0IsQ0FBQTtRQUNILENBQUM7UUFDRCxNQUFNO1lBQ0osT0FBTyxJQUFJLENBQUMsU0FBUztnQkFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUNWLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRhYnMgY29tcHV0ZWRcbiAqXG4gKiBAbWl4aW5cbiAqL1xuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcHV0ZWQ6IHtcbiAgICBhY3RpdmVJbmRleCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YWJzLmZpbmRJbmRleCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHRhYi5hY3Rpb24gPT09IHRhYiA/IGluZGV4IDogdGFiLmFjdGlvblxuICAgICAgICByZXR1cm4gaWQgPT09IHRoaXMubGF6eVZhbHVlXG4gICAgICB9KVxuICAgIH0sXG4gICAgYWN0aXZlVGFiICgpIHtcbiAgICAgIGlmICghdGhpcy50YWJzLmxlbmd0aCkgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgICByZXR1cm4gdGhpcy50YWJzW3RoaXMuYWN0aXZlSW5kZXhdXG4gICAgfSxcbiAgICBjb250YWluZXJTdHlsZXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ID8ge1xuICAgICAgICBoZWlnaHQ6IGAke3BhcnNlSW50KHRoaXMuaGVpZ2h0LCAxMCl9cHhgXG4gICAgICB9IDogbnVsbFxuICAgIH0sXG4gICAgaGFzQXJyb3dzICgpIHtcbiAgICAgIHJldHVybiAodGhpcy5zaG93QXJyb3dzIHx8ICF0aGlzLmlzTW9iaWxlKSAmJiB0aGlzLmlzT3ZlcmZsb3dpbmdcbiAgICB9LFxuICAgIGlucHV0VmFsdWU6IHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhenlWYWx1ZVxuICAgICAgfSxcbiAgICAgIHNldCAodmFsKSB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VmFsdWUgPT09IHZhbCkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSB2YWxcbiAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB2YWwpXG4gICAgICB9XG4gICAgfSxcbiAgICBpc01vYmlsZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kdnVldGlmeS5icmVha3BvaW50LndpZHRoIDwgdGhpcy5tb2JpbGVCcmVha1BvaW50XG4gICAgfSxcbiAgICBzbGlkZXJTdHlsZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogYCR7dGhpcy5zbGlkZXJMZWZ0fXB4YCxcbiAgICAgICAgdHJhbnNpdGlvbjogdGhpcy5zbGlkZXJMZWZ0ICE9IG51bGwgPyBudWxsIDogJ25vbmUnLFxuICAgICAgICB3aWR0aDogYCR7dGhpcy5zbGlkZXJXaWR0aH1weGBcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhcmdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmVUYWJcbiAgICAgICAgPyB0aGlzLmFjdGl2ZVRhYi5hY3Rpb25cbiAgICAgICAgOiBudWxsXG4gICAgfVxuICB9XG59XG4iXX0=