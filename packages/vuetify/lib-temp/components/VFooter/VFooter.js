// Styles
import '../../stylus/components/_footer.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
/* @vue/component */
export default {
    name: 'v-footer',
    mixins: [
        Applicationable(null, [
            'height',
            'inset'
        ]),
        Colorable,
        Themeable
    ],
    props: {
        height: {
            default: 32,
            type: [Number, String]
        },
        inset: Boolean
    },
    computed: {
        applicationProperty() {
            return this.inset ? 'insetFooter' : 'footer';
        },
        computedMarginBottom() {
            if (!this.app)
                return;
            return this.$vuetify.application.bottom;
        },
        computedPaddingLeft() {
            return !this.app || !this.inset
                ? 0
                : this.$vuetify.application.left;
        },
        computedPaddingRight() {
            return !this.app
                ? 0
                : this.$vuetify.application.right;
        },
        styles() {
            const styles = {
                height: isNaN(this.height) ? this.height : `${this.height}px`
            };
            if (this.computedPaddingLeft) {
                styles.paddingLeft = `${this.computedPaddingLeft}px`;
            }
            if (this.computedPaddingRight) {
                styles.paddingRight = `${this.computedPaddingRight}px`;
            }
            if (this.computedMarginBottom) {
                styles.marginBottom = `${this.computedMarginBottom}px`;
            }
            return styles;
        }
    },
    methods: {
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication() {
            const height = parseInt(this.height);
            return isNaN(height)
                ? this.$el ? this.$el.clientHeight : 0
                : height;
        }
    },
    render(h) {
        const data = this.setBackgroundColor(this.color, {
            staticClass: 'v-footer',
            'class': {
                'v-footer--absolute': this.absolute,
                'v-footer--fixed': !this.absolute && (this.app || this.fixed),
                'v-footer--inset': this.inset,
                ...this.themeClasses
            },
            style: this.styles,
            ref: 'content'
        });
        return h('footer', data, this.$slots.default);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkZvb3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZGb290ZXIvVkZvb3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxTQUFTO0FBQ1QsT0FBTyxlQUFlLE1BQU0sOEJBQThCLENBQUE7QUFDMUQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFFOUMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBVTtJQUVoQixNQUFNLEVBQUU7UUFDTixlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3BCLFFBQVE7WUFDUixPQUFPO1NBQ1IsQ0FBQztRQUNGLFNBQVM7UUFDVCxTQUFTO0tBQ1Y7SUFFRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUU7WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7U0FDdkI7UUFDRCxLQUFLLEVBQUUsT0FBTztLQUNmO0lBRUQsUUFBUSxFQUFFO1FBQ1IsbUJBQW1CO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUE7UUFDOUMsQ0FBQztRQUNELG9CQUFvQjtZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQUUsT0FBTTtZQUVyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQTtRQUN6QyxDQUFDO1FBQ0QsbUJBQW1CO1lBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUE7UUFDcEMsQ0FBQztRQUNELG9CQUFvQjtZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQTtRQUNyQyxDQUFDO1FBQ0QsTUFBTTtZQUNKLE1BQU0sTUFBTSxHQUFHO2dCQUNiLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUk7YUFDOUQsQ0FBQTtZQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QixNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUE7YUFDckQ7WUFFRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDN0IsTUFBTSxDQUFDLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFBO2FBQ3ZEO1lBRUQsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQTthQUN2RDtZQUVELE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQztLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1A7Ozs7V0FJRztRQUNILGlCQUFpQjtZQUNmLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFcEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFDWixDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQy9DLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLE9BQU8sRUFBRTtnQkFDUCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDbkMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM3RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDN0IsR0FBRyxJQUFJLENBQUMsWUFBWTthQUNyQjtZQUNELEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNsQixHQUFHLEVBQUUsU0FBUztTQUNmLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fZm9vdGVyLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IEFwcGxpY2F0aW9uYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvYXBwbGljYXRpb25hYmxlJ1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1mb290ZXInLFxuXG4gIG1peGluczogW1xuICAgIEFwcGxpY2F0aW9uYWJsZShudWxsLCBbXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdpbnNldCdcbiAgICBdKSxcbiAgICBDb2xvcmFibGUsXG4gICAgVGhlbWVhYmxlXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBoZWlnaHQ6IHtcbiAgICAgIGRlZmF1bHQ6IDMyLFxuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXVxuICAgIH0sXG4gICAgaW5zZXQ6IEJvb2xlYW5cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGFwcGxpY2F0aW9uUHJvcGVydHkgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zZXQgPyAnaW5zZXRGb290ZXInIDogJ2Zvb3RlcidcbiAgICB9LFxuICAgIGNvbXB1dGVkTWFyZ2luQm90dG9tICgpIHtcbiAgICAgIGlmICghdGhpcy5hcHApIHJldHVyblxuXG4gICAgICByZXR1cm4gdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvbi5ib3R0b21cbiAgICB9LFxuICAgIGNvbXB1dGVkUGFkZGluZ0xlZnQgKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmFwcCB8fCAhdGhpcy5pbnNldFxuICAgICAgICA/IDBcbiAgICAgICAgOiB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLmxlZnRcbiAgICB9LFxuICAgIGNvbXB1dGVkUGFkZGluZ1JpZ2h0ICgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5hcHBcbiAgICAgICAgPyAwXG4gICAgICAgIDogdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvbi5yaWdodFxuICAgIH0sXG4gICAgc3R5bGVzICgpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgaGVpZ2h0OiBpc05hTih0aGlzLmhlaWdodCkgPyB0aGlzLmhlaWdodCA6IGAke3RoaXMuaGVpZ2h0fXB4YFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb21wdXRlZFBhZGRpbmdMZWZ0KSB7XG4gICAgICAgIHN0eWxlcy5wYWRkaW5nTGVmdCA9IGAke3RoaXMuY29tcHV0ZWRQYWRkaW5nTGVmdH1weGBcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29tcHV0ZWRQYWRkaW5nUmlnaHQpIHtcbiAgICAgICAgc3R5bGVzLnBhZGRpbmdSaWdodCA9IGAke3RoaXMuY29tcHV0ZWRQYWRkaW5nUmlnaHR9cHhgXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbXB1dGVkTWFyZ2luQm90dG9tKSB7XG4gICAgICAgIHN0eWxlcy5tYXJnaW5Cb3R0b20gPSBgJHt0aGlzLmNvbXB1dGVkTWFyZ2luQm90dG9tfXB4YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3R5bGVzXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGFwcGxpY2F0aW9uIGxheW91dFxuICAgICAqXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHVwZGF0ZUFwcGxpY2F0aW9uICgpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlSW50KHRoaXMuaGVpZ2h0KVxuXG4gICAgICByZXR1cm4gaXNOYU4oaGVpZ2h0KVxuICAgICAgICA/IHRoaXMuJGVsID8gdGhpcy4kZWwuY2xpZW50SGVpZ2h0IDogMFxuICAgICAgICA6IGhlaWdodFxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb2xvciwge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWZvb3RlcicsXG4gICAgICAnY2xhc3MnOiB7XG4gICAgICAgICd2LWZvb3Rlci0tYWJzb2x1dGUnOiB0aGlzLmFic29sdXRlLFxuICAgICAgICAndi1mb290ZXItLWZpeGVkJzogIXRoaXMuYWJzb2x1dGUgJiYgKHRoaXMuYXBwIHx8IHRoaXMuZml4ZWQpLFxuICAgICAgICAndi1mb290ZXItLWluc2V0JzogdGhpcy5pbnNldCxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH0sXG4gICAgICBzdHlsZTogdGhpcy5zdHlsZXMsXG4gICAgICByZWY6ICdjb250ZW50J1xuICAgIH0pXG5cbiAgICByZXR1cm4gaCgnZm9vdGVyJywgZGF0YSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgfVxufVxuIl19