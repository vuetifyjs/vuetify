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
        },
        /** Used by menus and dialogs, inherits from v-app instead of the parent */
        rootIsDark() {
            if (this.dark === true) {
                // explicitly dark
                return true;
            }
            else if (this.light === true) {
                // explicitly light
                return false;
            }
            else {
                // inherit from v-app
                return this.$vuetify.dark;
            }
        },
        rootThemeClasses() {
            return {
                'theme--dark': this.rootIsDark,
                'theme--light': !this.rootIsDark
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy90aGVtZWFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBVXJCLE1BQU0sVUFBVSxzQkFBc0IsQ0FBRSxPQUFzQjtJQUM1RCxNQUFNLEVBQUUsR0FBRztRQUNULEdBQUcsT0FBTyxDQUFDLEtBQUs7UUFDaEIsR0FBRyxPQUFPLENBQUMsVUFBVTtLQUN0QixDQUFBO0lBQ0QsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6RCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQ2pFLENBQUM7QUFFRCxvQkFBb0I7QUFDcEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBYSxDQUFDLE1BQU0sQ0FBQztJQUMvQyxJQUFJLEVBQUUsV0FBVztJQUVqQixPQUFPO1FBQ0wsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1NBQzdCLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxLQUFLO2FBQ2Q7U0FDRjtLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNtQjtRQUNsQyxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxJQUFJO1NBQ21CO0tBQ25DO0lBRUQsSUFBSTtRQUNGLE9BQU87WUFDTCxnQkFBZ0IsRUFBRTtnQkFDaEIsTUFBTSxFQUFFLEtBQUs7YUFDZDtTQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxFQUFFO1FBQ1IsTUFBTTtZQUNKLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLGtCQUFrQjtnQkFDbEIsT0FBTyxJQUFJLENBQUE7YUFDWjtpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUM5QixtQkFBbUI7Z0JBQ25CLE9BQU8sS0FBSyxDQUFBO2FBQ2I7aUJBQU07Z0JBQ0wseURBQXlEO2dCQUN6RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO2FBQ3pCO1FBQ0gsQ0FBQztRQUNELFlBQVk7WUFDVixPQUFPO2dCQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDMUIsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07YUFDN0IsQ0FBQTtRQUNILENBQUM7UUFDRCwyRUFBMkU7UUFDM0UsVUFBVTtZQUNSLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLGtCQUFrQjtnQkFDbEIsT0FBTyxJQUFJLENBQUE7YUFDWjtpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUM5QixtQkFBbUI7Z0JBQ25CLE9BQU8sS0FBSyxDQUFBO2FBQ2I7aUJBQU07Z0JBQ0wscUJBQXFCO2dCQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFBO2FBQzFCO1FBQ0gsQ0FBQztRQUNELGdCQUFnQjtZQUNkLE9BQU87Z0JBQ0wsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUM5QixjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVTthQUNqQyxDQUFBO1FBQ0gsQ0FBQztLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sT0FBTyxDQUFFLE1BQU0sRUFBRSxNQUFNO2dCQUNyQixJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtpQkFDM0M7WUFDSCxDQUFDO1lBQ0QsU0FBUyxFQUFFLElBQUk7U0FDaEI7S0FDRjtDQUNGLENBQUMsQ0FBQTtBQUVGLGVBQWUsU0FBUyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgeyBQcm9wVmFsaWRhdG9yLCBSZW5kZXJDb250ZXh0IH0gZnJvbSAndnVlL3R5cGVzL29wdGlvbnMnXG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuaW50ZXJmYWNlIFRoZW1lYWJsZSBleHRlbmRzIFZ1ZSB7XG4gIHRoZW1lOiB7XG4gICAgaXNEYXJrOiBib29sZWFuXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZ1bmN0aW9uYWxUaGVtZUNsYXNzZXMgKGNvbnRleHQ6IFJlbmRlckNvbnRleHQpOiBvYmplY3Qge1xuICBjb25zdCB2bSA9IHtcbiAgICAuLi5jb250ZXh0LnByb3BzLFxuICAgIC4uLmNvbnRleHQuaW5qZWN0aW9uc1xuICB9XG4gIGNvbnN0IGlzRGFyayA9IFRoZW1lYWJsZS5vcHRpb25zLmNvbXB1dGVkLmlzRGFyay5jYWxsKHZtKVxuICByZXR1cm4gVGhlbWVhYmxlLm9wdGlvbnMuY29tcHV0ZWQudGhlbWVDbGFzc2VzLmNhbGwoeyBpc0RhcmsgfSlcbn1cblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmNvbnN0IFRoZW1lYWJsZSA9IFZ1ZS5leHRlbmQ8VGhlbWVhYmxlPigpLmV4dGVuZCh7XG4gIG5hbWU6ICd0aGVtZWFibGUnLFxuXG4gIHByb3ZpZGUgKCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRoZW1lOiB0aGlzLnRoZW1lYWJsZVByb3ZpZGVcbiAgICB9XG4gIH0sXG5cbiAgaW5qZWN0OiB7XG4gICAgdGhlbWU6IHtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaXNEYXJrOiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBwcm9wczoge1xuICAgIGRhcms6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSBhcyBQcm9wVmFsaWRhdG9yPGJvb2xlYW4gfCBudWxsPixcbiAgICBsaWdodDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9IGFzIFByb3BWYWxpZGF0b3I8Ym9vbGVhbiB8IG51bGw+XG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRoZW1lYWJsZVByb3ZpZGU6IHtcbiAgICAgICAgaXNEYXJrOiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGlzRGFyayAoKTogYm9vbGVhbiB7XG4gICAgICBpZiAodGhpcy5kYXJrID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGV4cGxpY2l0bHkgZGFya1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmxpZ2h0ID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGV4cGxpY2l0bHkgbGlnaHRcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbmhlcml0IGZyb20gcGFyZW50LCBvciBkZWZhdWx0IGZhbHNlIGlmIHRoZXJlIGlzIG5vbmVcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbWUuaXNEYXJrXG4gICAgICB9XG4gICAgfSxcbiAgICB0aGVtZUNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndGhlbWUtLWRhcmsnOiB0aGlzLmlzRGFyayxcbiAgICAgICAgJ3RoZW1lLS1saWdodCc6ICF0aGlzLmlzRGFya1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIFVzZWQgYnkgbWVudXMgYW5kIGRpYWxvZ3MsIGluaGVyaXRzIGZyb20gdi1hcHAgaW5zdGVhZCBvZiB0aGUgcGFyZW50ICovXG4gICAgcm9vdElzRGFyayAoKTogYm9vbGVhbiB7XG4gICAgICBpZiAodGhpcy5kYXJrID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGV4cGxpY2l0bHkgZGFya1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmxpZ2h0ID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGV4cGxpY2l0bHkgbGlnaHRcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbmhlcml0IGZyb20gdi1hcHBcbiAgICAgICAgcmV0dXJuIHRoaXMuJHZ1ZXRpZnkuZGFya1xuICAgICAgfVxuICAgIH0sXG4gICAgcm9vdFRoZW1lQ2xhc3NlcyAoKTogRGljdGlvbmFyeTxib29sZWFuPiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndGhlbWUtLWRhcmsnOiB0aGlzLnJvb3RJc0RhcmssXG4gICAgICAgICd0aGVtZS0tbGlnaHQnOiAhdGhpcy5yb290SXNEYXJrXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaXNEYXJrOiB7XG4gICAgICBoYW5kbGVyIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICBpZiAobmV3VmFsICE9PSBvbGRWYWwpIHtcbiAgICAgICAgICB0aGlzLnRoZW1lYWJsZVByb3ZpZGUuaXNEYXJrID0gdGhpcy5pc0RhcmtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGltbWVkaWF0ZTogdHJ1ZVxuICAgIH1cbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgVGhlbWVhYmxlXG4iXX0=