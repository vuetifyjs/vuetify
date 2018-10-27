// Styles
import '../../stylus/components/_toolbar.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import SSRBootable from '../../mixins/ssr-bootable';
// Directives
import Scroll from '../../directives/scroll';
import { deprecate } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-toolbar',
    directives: { Scroll },
    mixins: [
        Applicationable('top', [
            'clippedLeft',
            'clippedRight',
            'computedHeight',
            'invertedScroll',
            'manualScroll'
        ]),
        Colorable,
        SSRBootable,
        Themeable
    ],
    props: {
        card: Boolean,
        clippedLeft: Boolean,
        clippedRight: Boolean,
        dense: Boolean,
        extended: Boolean,
        extensionHeight: {
            type: [Number, String],
            validator: v => !isNaN(parseInt(v))
        },
        flat: Boolean,
        floating: Boolean,
        height: {
            type: [Number, String],
            validator: v => !isNaN(parseInt(v))
        },
        invertedScroll: Boolean,
        manualScroll: Boolean,
        prominent: Boolean,
        scrollOffScreen: Boolean,
        /* @deprecated */
        scrollToolbarOffScreen: Boolean,
        scrollTarget: String,
        scrollThreshold: {
            type: Number,
            default: 300
        },
        tabs: Boolean
    },
    data: () => ({
        activeTimeout: null,
        currentScroll: 0,
        heights: {
            mobileLandscape: 48,
            mobile: 56,
            desktop: 64,
            dense: 48
        },
        isActive: true,
        isExtended: false,
        isScrollingUp: false,
        previousScroll: null,
        previousScrollDirection: null,
        savedScroll: 0,
        target: null
    }),
    computed: {
        canScroll() {
            // TODO: remove
            if (this.scrollToolbarOffScreen) {
                deprecate('scrollToolbarOffScreen', 'scrollOffScreen', this);
                return true;
            }
            return this.scrollOffScreen || this.invertedScroll;
        },
        computedContentHeight() {
            if (this.height)
                return parseInt(this.height);
            if (this.dense)
                return this.heights.dense;
            if (this.prominent ||
                this.$vuetify.breakpoint.mdAndUp)
                return this.heights.desktop;
            if (this.$vuetify.breakpoint.width >
                this.$vuetify.breakpoint.height)
                return this.heights.mobileLandscape;
            return this.heights.mobile;
        },
        computedExtensionHeight() {
            if (this.tabs)
                return 48;
            if (this.extensionHeight)
                return parseInt(this.extensionHeight);
            return this.computedContentHeight;
        },
        computedHeight() {
            if (!this.isExtended)
                return this.computedContentHeight;
            return this.computedContentHeight + this.computedExtensionHeight;
        },
        computedMarginTop() {
            if (!this.app)
                return 0;
            return this.$vuetify.application.bar;
        },
        classes() {
            return this.addBackgroundColorClassChecks({
                'v-toolbar': true,
                'elevation-0': this.flat || (!this.isActive &&
                    !this.tabs &&
                    this.canScroll),
                'v-toolbar--absolute': this.absolute,
                'v-toolbar--card': this.card,
                'v-toolbar--clipped': this.clippedLeft || this.clippedRight,
                'v-toolbar--dense': this.dense,
                'v-toolbar--extended': this.isExtended,
                'v-toolbar--fixed': !this.absolute && (this.app || this.fixed),
                'v-toolbar--floating': this.floating,
                'v-toolbar--prominent': this.prominent,
                ...this.themeClasses
            });
        },
        computedPaddingLeft() {
            if (!this.app || this.clippedLeft)
                return 0;
            return this.$vuetify.application.left;
        },
        computedPaddingRight() {
            if (!this.app || this.clippedRight)
                return 0;
            return this.$vuetify.application.right;
        },
        computedTransform() {
            return !this.isActive
                ? this.canScroll
                    ? -this.computedContentHeight
                    : -this.computedHeight
                : 0;
        },
        currentThreshold() {
            return Math.abs(this.currentScroll - this.savedScroll);
        },
        styles() {
            return {
                marginTop: `${this.computedMarginTop}px`,
                paddingRight: `${this.computedPaddingRight}px`,
                paddingLeft: `${this.computedPaddingLeft}px`,
                transform: `translateY(${this.computedTransform}px)`
            };
        }
    },
    watch: {
        currentThreshold(val) {
            if (this.invertedScroll) {
                return this.isActive = this.currentScroll > this.scrollThreshold;
            }
            if (val < this.scrollThreshold ||
                !this.isBooted)
                return;
            this.isActive = this.isScrollingUp;
            this.savedScroll = this.currentScroll;
        },
        isActive() {
            this.savedScroll = 0;
        },
        invertedScroll(val) {
            this.isActive = !val;
        },
        manualScroll(val) {
            this.isActive = !val;
        },
        isScrollingUp() {
            this.savedScroll = this.savedScroll || this.currentScroll;
        }
    },
    created() {
        if (this.invertedScroll ||
            this.manualScroll)
            this.isActive = false;
    },
    mounted() {
        if (this.scrollTarget) {
            this.target = document.querySelector(this.scrollTarget);
        }
    },
    methods: {
        onScroll() {
            if (!this.canScroll ||
                this.manualScroll ||
                typeof window === 'undefined')
                return;
            const target = this.target || window;
            this.currentScroll = this.scrollTarget
                ? target.scrollTop
                : target.pageYOffset || document.documentElement.scrollTop;
            this.isScrollingUp = this.currentScroll < this.previousScroll;
            this.previousScroll = this.currentScroll;
        },
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication() {
            return this.invertedScroll || this.manualScroll
                ? 0
                : this.computedHeight;
        }
    },
    render(h) {
        this.isExtended = this.extended || !!this.$slots.extension;
        const children = [];
        const data = {
            'class': this.classes,
            style: this.styles,
            on: this.$listeners
        };
        data.directives = [{
                arg: this.scrollTarget,
                name: 'scroll',
                value: this.onScroll
            }];
        children.push(h('div', {
            staticClass: 'v-toolbar__content',
            style: { height: `${this.computedContentHeight}px` },
            ref: 'content'
        }, this.$slots.default));
        if (this.isExtended) {
            children.push(h('div', {
                staticClass: 'v-toolbar__extension',
                style: { height: `${this.computedExtensionHeight}px` }
            }, this.$slots.extension));
        }
        return h('nav', data, children);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRvb2xiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVG9vbGJhci9WVG9vbGJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx1Q0FBdUMsQ0FBQTtBQUU5QyxTQUFTO0FBQ1QsT0FBTyxlQUFlLE1BQU0sOEJBQThCLENBQUE7QUFDMUQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxXQUFXLE1BQU0sMkJBQTJCLENBQUE7QUFFbkQsYUFBYTtBQUNiLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBQzVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU5QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxXQUFXO0lBRWpCLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRTtJQUV0QixNQUFNLEVBQUU7UUFDTixlQUFlLENBQUMsS0FBSyxFQUFFO1lBQ3JCLGFBQWE7WUFDYixjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixjQUFjO1NBQ2YsQ0FBQztRQUNGLFNBQVM7UUFDVCxXQUFXO1FBQ1gsU0FBUztLQUNWO0lBRUQsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixXQUFXLEVBQUUsT0FBTztRQUNwQixZQUFZLEVBQUUsT0FBTztRQUNyQixLQUFLLEVBQUUsT0FBTztRQUNkLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUs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UUFFRCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL190b29sYmFyLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IEFwcGxpY2F0aW9uYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvYXBwbGljYXRpb25hYmxlJ1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuaW1wb3J0IFNTUkJvb3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9zc3ItYm9vdGFibGUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBTY3JvbGwgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9zY3JvbGwnXG5pbXBvcnQgeyBkZXByZWNhdGUgfSBmcm9tICcuLi8uLi91dGlsL2NvbnNvbGUnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LXRvb2xiYXInLFxuXG4gIGRpcmVjdGl2ZXM6IHsgU2Nyb2xsIH0sXG5cbiAgbWl4aW5zOiBbXG4gICAgQXBwbGljYXRpb25hYmxlKCd0b3AnLCBbXG4gICAgICAnY2xpcHBlZExlZnQnLFxuICAgICAgJ2NsaXBwZWRSaWdodCcsXG4gICAgICAnY29tcHV0ZWRIZWlnaHQnLFxuICAgICAgJ2ludmVydGVkU2Nyb2xsJyxcbiAgICAgICdtYW51YWxTY3JvbGwnXG4gICAgXSksXG4gICAgQ29sb3JhYmxlLFxuICAgIFNTUkJvb3RhYmxlLFxuICAgIFRoZW1lYWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgY2FyZDogQm9vbGVhbixcbiAgICBjbGlwcGVkTGVmdDogQm9vbGVhbixcbiAgICBjbGlwcGVkUmlnaHQ6IEJvb2xlYW4sXG4gICAgZGVuc2U6IEJvb2xlYW4sXG4gICAgZXh0ZW5kZWQ6IEJvb2xlYW4sXG4gICAgZXh0ZW5zaW9uSGVpZ2h0OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+ICFpc05hTihwYXJzZUludCh2KSlcbiAgICB9LFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgZmxvYXRpbmc6IEJvb2xlYW4sXG4gICAgaGVpZ2h0OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+ICFpc05hTihwYXJzZUludCh2KSlcbiAgICB9LFxuICAgIGludmVydGVkU2Nyb2xsOiBCb29sZWFuLFxuICAgIG1hbnVhbFNjcm9sbDogQm9vbGVhbixcbiAgICBwcm9taW5lbnQ6IEJvb2xlYW4sXG4gICAgc2Nyb2xsT2ZmU2NyZWVuOiBCb29sZWFuLFxuICAgIC8qIEBkZXByZWNhdGVkICovXG4gICAgc2Nyb2xsVG9vbGJhck9mZlNjcmVlbjogQm9vbGVhbixcbiAgICBzY3JvbGxUYXJnZXQ6IFN0cmluZyxcbiAgICBzY3JvbGxUaHJlc2hvbGQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH0sXG4gICAgdGFiczogQm9vbGVhblxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgYWN0aXZlVGltZW91dDogbnVsbCxcbiAgICBjdXJyZW50U2Nyb2xsOiAwLFxuICAgIGhlaWdodHM6IHtcbiAgICAgIG1vYmlsZUxhbmRzY2FwZTogNDgsXG4gICAgICBtb2JpbGU6IDU2LFxuICAgICAgZGVza3RvcDogNjQsXG4gICAgICBkZW5zZTogNDhcbiAgICB9LFxuICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgIGlzRXh0ZW5kZWQ6IGZhbHNlLFxuICAgIGlzU2Nyb2xsaW5nVXA6IGZhbHNlLFxuICAgIHByZXZpb3VzU2Nyb2xsOiBudWxsLFxuICAgIHByZXZpb3VzU2Nyb2xsRGlyZWN0aW9uOiBudWxsLFxuICAgIHNhdmVkU2Nyb2xsOiAwLFxuICAgIHRhcmdldDogbnVsbFxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNhblNjcm9sbCAoKSB7XG4gICAgICAvLyBUT0RPOiByZW1vdmVcbiAgICAgIGlmICh0aGlzLnNjcm9sbFRvb2xiYXJPZmZTY3JlZW4pIHtcbiAgICAgICAgZGVwcmVjYXRlKCdzY3JvbGxUb29sYmFyT2ZmU2NyZWVuJywgJ3Njcm9sbE9mZlNjcmVlbicsIHRoaXMpXG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsT2ZmU2NyZWVuIHx8IHRoaXMuaW52ZXJ0ZWRTY3JvbGxcbiAgICB9LFxuICAgIGNvbXB1dGVkQ29udGVudEhlaWdodCAoKSB7XG4gICAgICBpZiAodGhpcy5oZWlnaHQpIHJldHVybiBwYXJzZUludCh0aGlzLmhlaWdodClcbiAgICAgIGlmICh0aGlzLmRlbnNlKSByZXR1cm4gdGhpcy5oZWlnaHRzLmRlbnNlXG5cbiAgICAgIGlmICh0aGlzLnByb21pbmVudCB8fFxuICAgICAgICB0aGlzLiR2dWV0aWZ5LmJyZWFrcG9pbnQubWRBbmRVcFxuICAgICAgKSByZXR1cm4gdGhpcy5oZWlnaHRzLmRlc2t0b3BcblxuICAgICAgaWYgKHRoaXMuJHZ1ZXRpZnkuYnJlYWtwb2ludC53aWR0aCA+XG4gICAgICAgIHRoaXMuJHZ1ZXRpZnkuYnJlYWtwb2ludC5oZWlnaHRcbiAgICAgICkgcmV0dXJuIHRoaXMuaGVpZ2h0cy5tb2JpbGVMYW5kc2NhcGVcblxuICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0cy5tb2JpbGVcbiAgICB9LFxuICAgIGNvbXB1dGVkRXh0ZW5zaW9uSGVpZ2h0ICgpIHtcbiAgICAgIGlmICh0aGlzLnRhYnMpIHJldHVybiA0OFxuICAgICAgaWYgKHRoaXMuZXh0ZW5zaW9uSGVpZ2h0KSByZXR1cm4gcGFyc2VJbnQodGhpcy5leHRlbnNpb25IZWlnaHQpXG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVkQ29udGVudEhlaWdodFxuICAgIH0sXG4gICAgY29tcHV0ZWRIZWlnaHQgKCkge1xuICAgICAgaWYgKCF0aGlzLmlzRXh0ZW5kZWQpIHJldHVybiB0aGlzLmNvbXB1dGVkQ29udGVudEhlaWdodFxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wdXRlZENvbnRlbnRIZWlnaHQgKyB0aGlzLmNvbXB1dGVkRXh0ZW5zaW9uSGVpZ2h0XG4gICAgfSxcbiAgICBjb21wdXRlZE1hcmdpblRvcCAoKSB7XG4gICAgICBpZiAoIXRoaXMuYXBwKSByZXR1cm4gMFxuXG4gICAgICByZXR1cm4gdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvbi5iYXJcbiAgICB9LFxuICAgIGNsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkQmFja2dyb3VuZENvbG9yQ2xhc3NDaGVja3Moe1xuICAgICAgICAndi10b29sYmFyJzogdHJ1ZSxcbiAgICAgICAgJ2VsZXZhdGlvbi0wJzogdGhpcy5mbGF0IHx8ICghdGhpcy5pc0FjdGl2ZSAmJlxuICAgICAgICAgICF0aGlzLnRhYnMgJiZcbiAgICAgICAgICB0aGlzLmNhblNjcm9sbFxuICAgICAgICApLFxuICAgICAgICAndi10b29sYmFyLS1hYnNvbHV0ZSc6IHRoaXMuYWJzb2x1dGUsXG4gICAgICAgICd2LXRvb2xiYXItLWNhcmQnOiB0aGlzLmNhcmQsXG4gICAgICAgICd2LXRvb2xiYXItLWNsaXBwZWQnOiB0aGlzLmNsaXBwZWRMZWZ0IHx8IHRoaXMuY2xpcHBlZFJpZ2h0LFxuICAgICAgICAndi10b29sYmFyLS1kZW5zZSc6IHRoaXMuZGVuc2UsXG4gICAgICAgICd2LXRvb2xiYXItLWV4dGVuZGVkJzogdGhpcy5pc0V4dGVuZGVkLFxuICAgICAgICAndi10b29sYmFyLS1maXhlZCc6ICF0aGlzLmFic29sdXRlICYmICh0aGlzLmFwcCB8fCB0aGlzLmZpeGVkKSxcbiAgICAgICAgJ3YtdG9vbGJhci0tZmxvYXRpbmcnOiB0aGlzLmZsb2F0aW5nLFxuICAgICAgICAndi10b29sYmFyLS1wcm9taW5lbnQnOiB0aGlzLnByb21pbmVudCxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21wdXRlZFBhZGRpbmdMZWZ0ICgpIHtcbiAgICAgIGlmICghdGhpcy5hcHAgfHwgdGhpcy5jbGlwcGVkTGVmdCkgcmV0dXJuIDBcblxuICAgICAgcmV0dXJuIHRoaXMuJHZ1ZXRpZnkuYXBwbGljYXRpb24ubGVmdFxuICAgIH0sXG4gICAgY29tcHV0ZWRQYWRkaW5nUmlnaHQgKCkge1xuICAgICAgaWYgKCF0aGlzLmFwcCB8fCB0aGlzLmNsaXBwZWRSaWdodCkgcmV0dXJuIDBcblxuICAgICAgcmV0dXJuIHRoaXMuJHZ1ZXRpZnkuYXBwbGljYXRpb24ucmlnaHRcbiAgICB9LFxuICAgIGNvbXB1dGVkVHJhbnNmb3JtICgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5pc0FjdGl2ZVxuICAgICAgICA/IHRoaXMuY2FuU2Nyb2xsXG4gICAgICAgICAgPyAtdGhpcy5jb21wdXRlZENvbnRlbnRIZWlnaHRcbiAgICAgICAgICA6IC10aGlzLmNvbXB1dGVkSGVpZ2h0XG4gICAgICAgIDogMFxuICAgIH0sXG4gICAgY3VycmVudFRocmVzaG9sZCAoKSB7XG4gICAgICByZXR1cm4gTWF0aC5hYnModGhpcy5jdXJyZW50U2Nyb2xsIC0gdGhpcy5zYXZlZFNjcm9sbClcbiAgICB9LFxuICAgIHN0eWxlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYXJnaW5Ub3A6IGAke3RoaXMuY29tcHV0ZWRNYXJnaW5Ub3B9cHhgLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IGAke3RoaXMuY29tcHV0ZWRQYWRkaW5nUmlnaHR9cHhgLFxuICAgICAgICBwYWRkaW5nTGVmdDogYCR7dGhpcy5jb21wdXRlZFBhZGRpbmdMZWZ0fXB4YCxcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke3RoaXMuY29tcHV0ZWRUcmFuc2Zvcm19cHgpYFxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGN1cnJlbnRUaHJlc2hvbGQgKHZhbCkge1xuICAgICAgaWYgKHRoaXMuaW52ZXJ0ZWRTY3JvbGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUgPSB0aGlzLmN1cnJlbnRTY3JvbGwgPiB0aGlzLnNjcm9sbFRocmVzaG9sZFxuICAgICAgfVxuXG4gICAgICBpZiAodmFsIDwgdGhpcy5zY3JvbGxUaHJlc2hvbGQgfHxcbiAgICAgICAgIXRoaXMuaXNCb290ZWRcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIHRoaXMuaXNBY3RpdmUgPSB0aGlzLmlzU2Nyb2xsaW5nVXBcbiAgICAgIHRoaXMuc2F2ZWRTY3JvbGwgPSB0aGlzLmN1cnJlbnRTY3JvbGxcbiAgICB9LFxuICAgIGlzQWN0aXZlICgpIHtcbiAgICAgIHRoaXMuc2F2ZWRTY3JvbGwgPSAwXG4gICAgfSxcbiAgICBpbnZlcnRlZFNjcm9sbCAodmFsKSB7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gIXZhbFxuICAgIH0sXG4gICAgbWFudWFsU2Nyb2xsICh2YWwpIHtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSAhdmFsXG4gICAgfSxcbiAgICBpc1Njcm9sbGluZ1VwICgpIHtcbiAgICAgIHRoaXMuc2F2ZWRTY3JvbGwgPSB0aGlzLnNhdmVkU2Nyb2xsIHx8IHRoaXMuY3VycmVudFNjcm9sbFxuICAgIH1cbiAgfSxcblxuICBjcmVhdGVkICgpIHtcbiAgICBpZiAodGhpcy5pbnZlcnRlZFNjcm9sbCB8fFxuICAgICAgdGhpcy5tYW51YWxTY3JvbGxcbiAgICApIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbFRhcmdldCkge1xuICAgICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2Nyb2xsVGFyZ2V0KVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgb25TY3JvbGwgKCkge1xuICAgICAgaWYgKCF0aGlzLmNhblNjcm9sbCB8fFxuICAgICAgICB0aGlzLm1hbnVhbFNjcm9sbCB8fFxuICAgICAgICB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJ1xuICAgICAgKSByZXR1cm5cblxuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy50YXJnZXQgfHwgd2luZG93XG5cbiAgICAgIHRoaXMuY3VycmVudFNjcm9sbCA9IHRoaXMuc2Nyb2xsVGFyZ2V0XG4gICAgICAgID8gdGFyZ2V0LnNjcm9sbFRvcFxuICAgICAgICA6IHRhcmdldC5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG5cbiAgICAgIHRoaXMuaXNTY3JvbGxpbmdVcCA9IHRoaXMuY3VycmVudFNjcm9sbCA8IHRoaXMucHJldmlvdXNTY3JvbGxcblxuICAgICAgdGhpcy5wcmV2aW91c1Njcm9sbCA9IHRoaXMuY3VycmVudFNjcm9sbFxuICAgIH0sXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBhcHBsaWNhdGlvbiBsYXlvdXRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICB1cGRhdGVBcHBsaWNhdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZlcnRlZFNjcm9sbCB8fCB0aGlzLm1hbnVhbFNjcm9sbFxuICAgICAgICA/IDBcbiAgICAgICAgOiB0aGlzLmNvbXB1dGVkSGVpZ2h0XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIHRoaXMuaXNFeHRlbmRlZCA9IHRoaXMuZXh0ZW5kZWQgfHwgISF0aGlzLiRzbG90cy5leHRlbnNpb25cblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW11cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzLFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGVzLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH1cblxuICAgIGRhdGEuZGlyZWN0aXZlcyA9IFt7XG4gICAgICBhcmc6IHRoaXMuc2Nyb2xsVGFyZ2V0LFxuICAgICAgbmFtZTogJ3Njcm9sbCcsXG4gICAgICB2YWx1ZTogdGhpcy5vblNjcm9sbFxuICAgIH1dXG5cbiAgICBjaGlsZHJlbi5wdXNoKGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi10b29sYmFyX19jb250ZW50JyxcbiAgICAgIHN0eWxlOiB7IGhlaWdodDogYCR7dGhpcy5jb21wdXRlZENvbnRlbnRIZWlnaHR9cHhgIH0sXG4gICAgICByZWY6ICdjb250ZW50J1xuICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpKVxuXG4gICAgaWYgKHRoaXMuaXNFeHRlbmRlZCkge1xuICAgICAgY2hpbGRyZW4ucHVzaChoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10b29sYmFyX19leHRlbnNpb24nLFxuICAgICAgICBzdHlsZTogeyBoZWlnaHQ6IGAke3RoaXMuY29tcHV0ZWRFeHRlbnNpb25IZWlnaHR9cHhgIH1cbiAgICAgIH0sIHRoaXMuJHNsb3RzLmV4dGVuc2lvbikpXG4gICAgfVxuXG4gICAgcmV0dXJuIGgoJ25hdicsIGRhdGEsIGNoaWxkcmVuKVxuICB9XG59XG4iXX0=