import Vue from 'vue';
export function functionalThemeClasses(context) {
    const vm = {
        ...context.props,
        ...context.injections
    };
    const isDark = Themeable.options.computed.isDark.call(vm);
    return Themeable.options.computed.themeClasses.call({ isDark });
}
/* @vue/component */
const Themeable = Vue.extend().extend({
    name: 'themeable',
    provide() {
        return {
            theme: this.themeableProvide
        };
    },
    inject: {
        theme: {
            default: {
                isDark: false
            }
        }
    },
    props: {
        dark: {
            type: Boolean,
            default: null
        },
        light: {
            type: Boolean,
            default: null
        }
    },
    data() {
        return {
            themeableProvide: {
                isDark: false
            }
        };
    },
    computed: {
        isDark() {
            if (this.dark === true) {
                // explicitly dark
                return true;
            }
            else if (this.light === true) {
                // explicitly light
                return false;
            }
            else {
                // inherit from parent, or default false if there is none
                return this.theme.isDark;
            }
        },
        themeClasses() {
            return {
                'theme--dark': this.isDark,
                'theme--light': !this.isDark
            };
        }
    },
    watch: {
        isDark: {
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.themeableProvide.isDark = this.isDark;
                }
            },
            immediate: true
        }
    }
});
export default Themeable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy90aGVtZWFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBVXJCLE1BQU0sVUFBVSxzQkFBc0IsQ0FBRSxPQUFzQjtJQUM1RCxNQUFNLEVBQUUsR0FBRztRQUNULEdBQUcsT0FBTyxDQUFDLEtBQUs7UUFDaEIsR0FBRyxPQUFPLENBQUMsVUFBVTtLQUN0QixDQUFBO0lBQ0QsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6RCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQ2pFLENBQUM7QUFFRCxvQkFBb0I7QUFDcEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBYSxDQUFDLE1BQU0sQ0FBQztJQUMvQyxJQUFJLEVBQUUsV0FBVztJQUVqQixPQUFPO1FBQ0wsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1NBQzdCLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxLQUFLO2FBQ2Q7U0FDRjtLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNtQjtRQUNsQyxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxJQUFJO1NBQ21CO0tBQ25DO0lBRUQsSUFBSTtRQUNGLE9BQU87WUFDTCxnQkFBZ0IsRUFBRTtnQkFDaEIsTUFBTSxFQUFFLEtBQUs7YUFDZDtTQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxFQUFFO1FBQ1IsTUFBTTtZQUNKLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLGtCQUFrQjtnQkFDbEIsT0FBTyxJQUFJLENBQUE7YUFDWjtpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUM5QixtQkFBbUI7Z0JBQ25CLE9BQU8sS0FBSyxDQUFBO2FBQ2I7aUJBQU07Z0JBQ0wseURBQXlEO2dCQUN6RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO2FBQ3pCO1FBQ0gsQ0FBQztRQUNELFlBQVk7WUFDVixPQUFPO2dCQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDMUIsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07YUFDN0IsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLE9BQU8sQ0FBRSxNQUFNLEVBQUUsTUFBTTtnQkFDckIsSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7aUJBQzNDO1lBQ0gsQ0FBQztZQUNELFNBQVMsRUFBRSxJQUFJO1NBQ2hCO0tBQ0Y7Q0FDRixDQUFDLENBQUE7QUFFRixlQUFlLFNBQVMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IHsgUHJvcFZhbGlkYXRvciwgUmVuZGVyQ29udGV4dCB9IGZyb20gJ3Z1ZS90eXBlcy9vcHRpb25zJ1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmludGVyZmFjZSBUaGVtZWFibGUgZXh0ZW5kcyBWdWUge1xuICB0aGVtZToge1xuICAgIGlzRGFyazogYm9vbGVhblxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmdW5jdGlvbmFsVGhlbWVDbGFzc2VzIChjb250ZXh0OiBSZW5kZXJDb250ZXh0KTogb2JqZWN0IHtcbiAgY29uc3Qgdm0gPSB7XG4gICAgLi4uY29udGV4dC5wcm9wcyxcbiAgICAuLi5jb250ZXh0LmluamVjdGlvbnNcbiAgfVxuICBjb25zdCBpc0RhcmsgPSBUaGVtZWFibGUub3B0aW9ucy5jb21wdXRlZC5pc0RhcmsuY2FsbCh2bSlcbiAgcmV0dXJuIFRoZW1lYWJsZS5vcHRpb25zLmNvbXB1dGVkLnRoZW1lQ2xhc3Nlcy5jYWxsKHsgaXNEYXJrIH0pXG59XG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5jb25zdCBUaGVtZWFibGUgPSBWdWUuZXh0ZW5kPFRoZW1lYWJsZT4oKS5leHRlbmQoe1xuICBuYW1lOiAndGhlbWVhYmxlJyxcblxuICBwcm92aWRlICgpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0aGVtZTogdGhpcy50aGVtZWFibGVQcm92aWRlXG4gICAgfVxuICB9LFxuXG4gIGluamVjdDoge1xuICAgIHRoZW1lOiB7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlzRGFyazogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcHJvcHM6IHtcbiAgICBkYXJrOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0gYXMgUHJvcFZhbGlkYXRvcjxib29sZWFuIHwgbnVsbD4sXG4gICAgbGlnaHQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSBhcyBQcm9wVmFsaWRhdG9yPGJvb2xlYW4gfCBudWxsPlxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aGVtZWFibGVQcm92aWRlOiB7XG4gICAgICAgIGlzRGFyazogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBpc0RhcmsgKCk6IGJvb2xlYW4ge1xuICAgICAgaWYgKHRoaXMuZGFyayA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBleHBsaWNpdGx5IGRhcmtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5saWdodCA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBleHBsaWNpdGx5IGxpZ2h0XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW5oZXJpdCBmcm9tIHBhcmVudCwgb3IgZGVmYXVsdCBmYWxzZSBpZiB0aGVyZSBpcyBub25lXG4gICAgICAgIHJldHVybiB0aGlzLnRoZW1lLmlzRGFya1xuICAgICAgfVxuICAgIH0sXG4gICAgdGhlbWVDbGFzc2VzICgpOiBvYmplY3Qge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3RoZW1lLS1kYXJrJzogdGhpcy5pc0RhcmssXG4gICAgICAgICd0aGVtZS0tbGlnaHQnOiAhdGhpcy5pc0RhcmtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBpc0Rhcms6IHtcbiAgICAgIGhhbmRsZXIgKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgIGlmIChuZXdWYWwgIT09IG9sZFZhbCkge1xuICAgICAgICAgIHRoaXMudGhlbWVhYmxlUHJvdmlkZS5pc0RhcmsgPSB0aGlzLmlzRGFya1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlOiB0cnVlXG4gICAgfVxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBUaGVtZWFibGVcbiJdfQ==