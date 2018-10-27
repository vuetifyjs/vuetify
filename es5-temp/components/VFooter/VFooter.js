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
        Applicationable('footer', [
            'height'
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
        const data = {
            staticClass: 'v-footer',
            'class': this.addBackgroundColorClassChecks({
                'v-footer--absolute': this.absolute,
                'v-footer--fixed': !this.absolute && (this.app || this.fixed),
                'v-footer--inset': this.inset,
                ...this.themeClasses
            }),
            style: this.styles,
            ref: 'content'
        };
        return h('footer', data, this.$slots.default);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkZvb3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZGb290ZXIvVkZvb3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxTQUFTO0FBQ1QsT0FBTyxlQUFlLE1BQU0sOEJBQThCLENBQUE7QUFDMUQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFFOUMsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBVTtJQUVoQixNQUFNLEVBQUU7UUFDTixlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ3hCLFFBQVE7U0FDVCxDQUFDO1FBQ0YsU0FBUztRQUNULFNBQVM7S0FDVjtJQUVELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztTQUN2QjtRQUNELEtBQUssRUFBRSxPQUFPO0tBQ2Y7SUFFRCxRQUFRLEVBQUU7UUFDUixvQkFBb0I7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUFFLE9BQU07WUFFckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUE7UUFDekMsQ0FBQztRQUNELG1CQUFtQjtZQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUM3QixDQUFDLENBQUMsQ0FBQztnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFBO1FBQ3BDLENBQUM7UUFDRCxvQkFBb0I7WUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNkLENBQUMsQ0FBQyxDQUFDO2dCQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUE7UUFDckMsQ0FBQztRQUNELE1BQU07WUFDSixNQUFNLE1BQU0sR0FBRztnQkFDYixNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJO2FBQzlELENBQUE7WUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFBO2FBQ3JEO1lBRUQsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQTthQUN2RDtZQUVELElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM3QixNQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUE7YUFDdkQ7WUFFRCxPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQOzs7O1dBSUc7UUFDSCxpQkFBaUI7WUFDZixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRXBDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsTUFBTSxDQUFBO1FBQ1osQ0FBQztLQUNGO0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLElBQUksR0FBRztZQUNYLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsNkJBQTZCLENBQUM7Z0JBQzFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUNuQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzdELGlCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUM3QixHQUFHLElBQUksQ0FBQyxZQUFZO2FBQ3JCLENBQUM7WUFDRixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsR0FBRyxFQUFFLFNBQVM7U0FDZixDQUFBO1FBRUQsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19mb290ZXIuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQXBwbGljYXRpb25hYmxlIGZyb20gJy4uLy4uL21peGlucy9hcHBsaWNhdGlvbmFibGUnXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWZvb3RlcicsXG5cbiAgbWl4aW5zOiBbXG4gICAgQXBwbGljYXRpb25hYmxlKCdmb290ZXInLCBbXG4gICAgICAnaGVpZ2h0J1xuICAgIF0pLFxuICAgIENvbG9yYWJsZSxcbiAgICBUaGVtZWFibGVcbiAgXSxcblxuICBwcm9wczoge1xuICAgIGhlaWdodDoge1xuICAgICAgZGVmYXVsdDogMzIsXG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddXG4gICAgfSxcbiAgICBpbnNldDogQm9vbGVhblxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29tcHV0ZWRNYXJnaW5Cb3R0b20gKCkge1xuICAgICAgaWYgKCF0aGlzLmFwcCkgcmV0dXJuXG5cbiAgICAgIHJldHVybiB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLmJvdHRvbVxuICAgIH0sXG4gICAgY29tcHV0ZWRQYWRkaW5nTGVmdCAoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuYXBwIHx8ICF0aGlzLmluc2V0XG4gICAgICAgID8gMFxuICAgICAgICA6IHRoaXMuJHZ1ZXRpZnkuYXBwbGljYXRpb24ubGVmdFxuICAgIH0sXG4gICAgY29tcHV0ZWRQYWRkaW5nUmlnaHQgKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmFwcFxuICAgICAgICA/IDBcbiAgICAgICAgOiB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLnJpZ2h0XG4gICAgfSxcbiAgICBzdHlsZXMgKCkge1xuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICBoZWlnaHQ6IGlzTmFOKHRoaXMuaGVpZ2h0KSA/IHRoaXMuaGVpZ2h0IDogYCR7dGhpcy5oZWlnaHR9cHhgXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbXB1dGVkUGFkZGluZ0xlZnQpIHtcbiAgICAgICAgc3R5bGVzLnBhZGRpbmdMZWZ0ID0gYCR7dGhpcy5jb21wdXRlZFBhZGRpbmdMZWZ0fXB4YFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb21wdXRlZFBhZGRpbmdSaWdodCkge1xuICAgICAgICBzdHlsZXMucGFkZGluZ1JpZ2h0ID0gYCR7dGhpcy5jb21wdXRlZFBhZGRpbmdSaWdodH1weGBcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29tcHV0ZWRNYXJnaW5Cb3R0b20pIHtcbiAgICAgICAgc3R5bGVzLm1hcmdpbkJvdHRvbSA9IGAke3RoaXMuY29tcHV0ZWRNYXJnaW5Cb3R0b219cHhgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZXNcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgYXBwbGljYXRpb24gbGF5b3V0XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgdXBkYXRlQXBwbGljYXRpb24gKCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5oZWlnaHQpXG5cbiAgICAgIHJldHVybiBpc05hTihoZWlnaHQpXG4gICAgICAgID8gdGhpcy4kZWwgPyB0aGlzLiRlbC5jbGllbnRIZWlnaHQgOiAwXG4gICAgICAgIDogaGVpZ2h0XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtZm9vdGVyJyxcbiAgICAgICdjbGFzcyc6IHRoaXMuYWRkQmFja2dyb3VuZENvbG9yQ2xhc3NDaGVja3Moe1xuICAgICAgICAndi1mb290ZXItLWFic29sdXRlJzogdGhpcy5hYnNvbHV0ZSxcbiAgICAgICAgJ3YtZm9vdGVyLS1maXhlZCc6ICF0aGlzLmFic29sdXRlICYmICh0aGlzLmFwcCB8fCB0aGlzLmZpeGVkKSxcbiAgICAgICAgJ3YtZm9vdGVyLS1pbnNldCc6IHRoaXMuaW5zZXQsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9KSxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlcyxcbiAgICAgIHJlZjogJ2NvbnRlbnQnXG4gICAgfVxuXG4gICAgcmV0dXJuIGgoJ2Zvb3RlcicsIGRhdGEsIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gIH1cbn1cbiJdfQ==