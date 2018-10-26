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
            if (this.$vuetify.breakpoint.smAndDown &&
                this.$vuetify.breakpoint.width >
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
            return {
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
            };
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
        const data = this.setBackgroundColor(this.color, {
            'class': this.classes,
            style: this.styles,
            on: this.$listeners
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRvb2xiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVG9vbGJhci9WVG9vbGJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx1Q0FBdUMsQ0FBQTtBQUU5QyxTQUFTO0FBQ1QsT0FBTyxlQUFlLE1BQU0sOEJBQThCLENBQUE7QUFDMUQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxXQUFXLE1BQU0sMkJBQTJCLENBQUE7QUFFbkQsYUFBYTtBQUNiLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBQzVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU5QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxXQUFXO0lBRWpCLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRTtJQUV0QixNQUFNLEVBQUU7UUFDTixlQUFlLENBQUMsS0FBSyxFQUFFO1lBQ3JCLGFBQWE7WUFDYixjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixjQUFjO1NBQ2YsQ0FBQztRQUNGLFNBQVM7UUFDVCxXQUFXO1FBQ1gsU0FBUztLQUNWO0lBRUQsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixXQUFXLEVBQUUsT0FBTztRQUNwQixZQUFZLEVBQUUsT0FBTztRQUNyQixLQUFLLEVBQUUsT0FBTztRQUNkLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUsT0FBTztRQUNqQixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUNELGNBQWMsRUFBRSxPQUFPO1FBQ3ZCLFlBQVksRUFBRSxPQUFPO1FBQ3JCLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLGVBQWUsRUFBRSxPQUFPO1FBQ3hCLGlCQUFpQjtRQUNqQixzQkFBc0IsRUFBRSxPQUFPO1FBQy9CLFlBQVksRUFBRSxNQUFNO1FBQ3BCLGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEdBQUc7U0FDYjtRQUNELElBQUksRUFBRSxPQUFPO0tBQ2Q7SUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRTtZQUNQLGVBQWUsRUFBRSxFQUFFO1lBQ25CLE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0QsUUFBUSxFQUFFLElBQUk7UUFDZCxVQUFVLEVBQUUsS0FBSztRQUNqQixhQUFhLEVBQUUsS0FBSztRQUNwQixjQUFjLEVBQUUsSUFBSTtRQUNwQix1QkFBdUIsRUFBRSxJQUFJO1FBQzdCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDYixDQUFDO0lBRUYsUUFBUSxFQUFFO1FBQ1IsU0FBUztZQUNQLGVBQWU7WUFDZixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDL0IsU0FBUyxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUU1RCxPQUFPLElBQUksQ0FBQTthQUNaO1lBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUE7UUFDcEQsQ0FBQztRQUNELHFCQUFxQjtZQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM3QyxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFFekMsSUFBSSxJQUFJLENBQUMsU0FBUztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTztnQkFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQTtZQUU3QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVM7Z0JBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUs7b0JBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU07Z0JBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUE7WUFFckMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQTtRQUM1QixDQUFDO1FBQ0QsdUJBQXVCO1lBQ3JCLElBQUksSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxFQUFFLENBQUE7WUFDeEIsSUFBSSxJQUFJLENBQUMsZUFBZTtnQkFBRSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFL0QsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUE7UUFDbkMsQ0FBQztRQUNELGNBQWM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7Z0JBQUUsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUE7WUFFdkQsT0FBTyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFBO1FBQ2xFLENBQUM7UUFDRCxpQkFBaUI7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQUUsT0FBTyxDQUFDLENBQUE7WUFFdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUE7UUFDdEMsQ0FBQztRQUNELE9BQU87WUFDTCxPQUFPO2dCQUNMLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUMxQixDQUFDLElBQUksQ0FBQyxRQUFRO29CQUNkLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FDZjtnQkFDRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDcEMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQzVCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQzNELGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUM5QixxQkFBcUIsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDdEMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM5RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDcEMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3RDLEdBQUcsSUFBSSxDQUFDLFlBQVk7YUFDckIsQ0FBQTtRQUNILENBQUM7UUFDRCxtQkFBbUI7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVc7Z0JBQUUsT0FBTyxDQUFDLENBQUE7WUFFM0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUE7UUFDdkMsQ0FBQztRQUNELG9CQUFvQjtZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWTtnQkFBRSxPQUFPLENBQUMsQ0FBQTtZQUU1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQTtRQUN4QyxDQUFDO1FBQ0QsaUJBQWlCO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVM7b0JBQ2QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQjtvQkFDN0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDUCxDQUFDO1FBQ0QsZ0JBQWdCO1lBQ2QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFDRCxNQUFNO1lBQ0osT0FBTztnQkFDTCxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUk7Z0JBQ3hDLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSTtnQkFDOUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJO2dCQUM1QyxTQUFTLEVBQUUsY0FBYyxJQUFJLENBQUMsaUJBQWlCLEtBQUs7YUFDckQsQ0FBQTtRQUNILENBQUM7S0FDRjtJQUVELEtBQUssRUFBRTtRQUNMLGdCQUFnQixDQUFFLEdBQUc7WUFDbkIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFBO2FBQ2pFO1lBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWU7Z0JBQzVCLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQ2QsT0FBTTtZQUVSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTtZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDdkMsQ0FBQztRQUNELFFBQVE7WUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQTtRQUN0QixDQUFDO1FBQ0QsY0FBYyxDQUFFLEdBQUc7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQTtRQUN0QixDQUFDO1FBQ0QsWUFBWSxDQUFFLEdBQUc7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFBO1FBQ3RCLENBQUM7UUFDRCxhQUFhO1lBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDM0QsQ0FBQztLQUNGO0lBRUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLGNBQWM7WUFDckIsSUFBSSxDQUFDLFlBQVk7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7SUFDekIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUN4RDtJQUNILENBQUM7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUNqQixJQUFJLENBQUMsWUFBWTtnQkFDakIsT0FBTyxNQUFNLEtBQUssV0FBVztnQkFDN0IsT0FBTTtZQUVSLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFBO1lBRXBDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVk7Z0JBQ3BDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUztnQkFDbEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUE7WUFFNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUE7WUFFN0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1FBQzFDLENBQUM7UUFDRDs7OztXQUlHO1FBQ0gsaUJBQWlCO1lBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxZQUFZO2dCQUM3QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQTtRQUN6QixDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFFMUQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQy9DLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3BCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUN0QixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDckIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3JCLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixJQUFJLEVBQUU7WUFDcEQsR0FBRyxFQUFFLFNBQVM7U0FDZixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUV4QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNyQixXQUFXLEVBQUUsc0JBQXNCO2dCQUNuQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLElBQUksRUFBRTthQUN2RCxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtTQUMzQjtRQUVELE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDakMsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHlsZXNcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3Rvb2xiYXIuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQXBwbGljYXRpb25hYmxlIGZyb20gJy4uLy4uL21peGlucy9hcHBsaWNhdGlvbmFibGUnXG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL21peGlucy9jb2xvcmFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5pbXBvcnQgU1NSQm9vdGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3Nzci1ib290YWJsZSdcblxuLy8gRGlyZWN0aXZlc1xuaW1wb3J0IFNjcm9sbCBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Njcm9sbCdcbmltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtdG9vbGJhcicsXG5cbiAgZGlyZWN0aXZlczogeyBTY3JvbGwgfSxcblxuICBtaXhpbnM6IFtcbiAgICBBcHBsaWNhdGlvbmFibGUoJ3RvcCcsIFtcbiAgICAgICdjbGlwcGVkTGVmdCcsXG4gICAgICAnY2xpcHBlZFJpZ2h0JyxcbiAgICAgICdjb21wdXRlZEhlaWdodCcsXG4gICAgICAnaW52ZXJ0ZWRTY3JvbGwnLFxuICAgICAgJ21hbnVhbFNjcm9sbCdcbiAgICBdKSxcbiAgICBDb2xvcmFibGUsXG4gICAgU1NSQm9vdGFibGUsXG4gICAgVGhlbWVhYmxlXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBjYXJkOiBCb29sZWFuLFxuICAgIGNsaXBwZWRMZWZ0OiBCb29sZWFuLFxuICAgIGNsaXBwZWRSaWdodDogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBleHRlbmRlZDogQm9vbGVhbixcbiAgICBleHRlbnNpb25IZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gIWlzTmFOKHBhcnNlSW50KHYpKVxuICAgIH0sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICBmbG9hdGluZzogQm9vbGVhbixcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gIWlzTmFOKHBhcnNlSW50KHYpKVxuICAgIH0sXG4gICAgaW52ZXJ0ZWRTY3JvbGw6IEJvb2xlYW4sXG4gICAgbWFudWFsU2Nyb2xsOiBCb29sZWFuLFxuICAgIHByb21pbmVudDogQm9vbGVhbixcbiAgICBzY3JvbGxPZmZTY3JlZW46IEJvb2xlYW4sXG4gICAgLyogQGRlcHJlY2F0ZWQgKi9cbiAgICBzY3JvbGxUb29sYmFyT2ZmU2NyZWVuOiBCb29sZWFuLFxuICAgIHNjcm9sbFRhcmdldDogU3RyaW5nLFxuICAgIHNjcm9sbFRocmVzaG9sZDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcbiAgICB0YWJzOiBCb29sZWFuXG4gIH0sXG5cbiAgZGF0YTogKCkgPT4gKHtcbiAgICBhY3RpdmVUaW1lb3V0OiBudWxsLFxuICAgIGN1cnJlbnRTY3JvbGw6IDAsXG4gICAgaGVpZ2h0czoge1xuICAgICAgbW9iaWxlTGFuZHNjYXBlOiA0OCxcbiAgICAgIG1vYmlsZTogNTYsXG4gICAgICBkZXNrdG9wOiA2NCxcbiAgICAgIGRlbnNlOiA0OFxuICAgIH0sXG4gICAgaXNBY3RpdmU6IHRydWUsXG4gICAgaXNFeHRlbmRlZDogZmFsc2UsXG4gICAgaXNTY3JvbGxpbmdVcDogZmFsc2UsXG4gICAgcHJldmlvdXNTY3JvbGw6IG51bGwsXG4gICAgcHJldmlvdXNTY3JvbGxEaXJlY3Rpb246IG51bGwsXG4gICAgc2F2ZWRTY3JvbGw6IDAsXG4gICAgdGFyZ2V0OiBudWxsXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2FuU2Nyb2xsICgpIHtcbiAgICAgIC8vIFRPRE86IHJlbW92ZVxuICAgICAgaWYgKHRoaXMuc2Nyb2xsVG9vbGJhck9mZlNjcmVlbikge1xuICAgICAgICBkZXByZWNhdGUoJ3Njcm9sbFRvb2xiYXJPZmZTY3JlZW4nLCAnc2Nyb2xsT2ZmU2NyZWVuJywgdGhpcylcblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5zY3JvbGxPZmZTY3JlZW4gfHwgdGhpcy5pbnZlcnRlZFNjcm9sbFxuICAgIH0sXG4gICAgY29tcHV0ZWRDb250ZW50SGVpZ2h0ICgpIHtcbiAgICAgIGlmICh0aGlzLmhlaWdodCkgcmV0dXJuIHBhcnNlSW50KHRoaXMuaGVpZ2h0KVxuICAgICAgaWYgKHRoaXMuZGVuc2UpIHJldHVybiB0aGlzLmhlaWdodHMuZGVuc2VcblxuICAgICAgaWYgKHRoaXMucHJvbWluZW50IHx8XG4gICAgICAgIHRoaXMuJHZ1ZXRpZnkuYnJlYWtwb2ludC5tZEFuZFVwXG4gICAgICApIHJldHVybiB0aGlzLmhlaWdodHMuZGVza3RvcFxuXG4gICAgICBpZiAodGhpcy4kdnVldGlmeS5icmVha3BvaW50LnNtQW5kRG93biAmJlxuICAgICAgICB0aGlzLiR2dWV0aWZ5LmJyZWFrcG9pbnQud2lkdGggPlxuICAgICAgICB0aGlzLiR2dWV0aWZ5LmJyZWFrcG9pbnQuaGVpZ2h0XG4gICAgICApIHJldHVybiB0aGlzLmhlaWdodHMubW9iaWxlTGFuZHNjYXBlXG5cbiAgICAgIHJldHVybiB0aGlzLmhlaWdodHMubW9iaWxlXG4gICAgfSxcbiAgICBjb21wdXRlZEV4dGVuc2lvbkhlaWdodCAoKSB7XG4gICAgICBpZiAodGhpcy50YWJzKSByZXR1cm4gNDhcbiAgICAgIGlmICh0aGlzLmV4dGVuc2lvbkhlaWdodCkgcmV0dXJuIHBhcnNlSW50KHRoaXMuZXh0ZW5zaW9uSGVpZ2h0KVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wdXRlZENvbnRlbnRIZWlnaHRcbiAgICB9LFxuICAgIGNvbXB1dGVkSGVpZ2h0ICgpIHtcbiAgICAgIGlmICghdGhpcy5pc0V4dGVuZGVkKSByZXR1cm4gdGhpcy5jb21wdXRlZENvbnRlbnRIZWlnaHRcblxuICAgICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRDb250ZW50SGVpZ2h0ICsgdGhpcy5jb21wdXRlZEV4dGVuc2lvbkhlaWdodFxuICAgIH0sXG4gICAgY29tcHV0ZWRNYXJnaW5Ub3AgKCkge1xuICAgICAgaWYgKCF0aGlzLmFwcCkgcmV0dXJuIDBcblxuICAgICAgcmV0dXJuIHRoaXMuJHZ1ZXRpZnkuYXBwbGljYXRpb24uYmFyXG4gICAgfSxcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LXRvb2xiYXInOiB0cnVlLFxuICAgICAgICAnZWxldmF0aW9uLTAnOiB0aGlzLmZsYXQgfHwgKFxuICAgICAgICAgICF0aGlzLmlzQWN0aXZlICYmXG4gICAgICAgICAgIXRoaXMudGFicyAmJlxuICAgICAgICAgIHRoaXMuY2FuU2Nyb2xsXG4gICAgICAgICksXG4gICAgICAgICd2LXRvb2xiYXItLWFic29sdXRlJzogdGhpcy5hYnNvbHV0ZSxcbiAgICAgICAgJ3YtdG9vbGJhci0tY2FyZCc6IHRoaXMuY2FyZCxcbiAgICAgICAgJ3YtdG9vbGJhci0tY2xpcHBlZCc6IHRoaXMuY2xpcHBlZExlZnQgfHwgdGhpcy5jbGlwcGVkUmlnaHQsXG4gICAgICAgICd2LXRvb2xiYXItLWRlbnNlJzogdGhpcy5kZW5zZSxcbiAgICAgICAgJ3YtdG9vbGJhci0tZXh0ZW5kZWQnOiB0aGlzLmlzRXh0ZW5kZWQsXG4gICAgICAgICd2LXRvb2xiYXItLWZpeGVkJzogIXRoaXMuYWJzb2x1dGUgJiYgKHRoaXMuYXBwIHx8IHRoaXMuZml4ZWQpLFxuICAgICAgICAndi10b29sYmFyLS1mbG9hdGluZyc6IHRoaXMuZmxvYXRpbmcsXG4gICAgICAgICd2LXRvb2xiYXItLXByb21pbmVudCc6IHRoaXMucHJvbWluZW50LFxuICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWRQYWRkaW5nTGVmdCAoKSB7XG4gICAgICBpZiAoIXRoaXMuYXBwIHx8IHRoaXMuY2xpcHBlZExlZnQpIHJldHVybiAwXG5cbiAgICAgIHJldHVybiB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLmxlZnRcbiAgICB9LFxuICAgIGNvbXB1dGVkUGFkZGluZ1JpZ2h0ICgpIHtcbiAgICAgIGlmICghdGhpcy5hcHAgfHwgdGhpcy5jbGlwcGVkUmlnaHQpIHJldHVybiAwXG5cbiAgICAgIHJldHVybiB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLnJpZ2h0XG4gICAgfSxcbiAgICBjb21wdXRlZFRyYW5zZm9ybSAoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuaXNBY3RpdmVcbiAgICAgICAgPyB0aGlzLmNhblNjcm9sbFxuICAgICAgICAgID8gLXRoaXMuY29tcHV0ZWRDb250ZW50SGVpZ2h0XG4gICAgICAgICAgOiAtdGhpcy5jb21wdXRlZEhlaWdodFxuICAgICAgICA6IDBcbiAgICB9LFxuICAgIGN1cnJlbnRUaHJlc2hvbGQgKCkge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMuY3VycmVudFNjcm9sbCAtIHRoaXMuc2F2ZWRTY3JvbGwpXG4gICAgfSxcbiAgICBzdHlsZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWFyZ2luVG9wOiBgJHt0aGlzLmNvbXB1dGVkTWFyZ2luVG9wfXB4YCxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiBgJHt0aGlzLmNvbXB1dGVkUGFkZGluZ1JpZ2h0fXB4YCxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IGAke3RoaXMuY29tcHV0ZWRQYWRkaW5nTGVmdH1weGAsXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHt0aGlzLmNvbXB1dGVkVHJhbnNmb3JtfXB4KWBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBjdXJyZW50VGhyZXNob2xkICh2YWwpIHtcbiAgICAgIGlmICh0aGlzLmludmVydGVkU2Nyb2xsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlID0gdGhpcy5jdXJyZW50U2Nyb2xsID4gdGhpcy5zY3JvbGxUaHJlc2hvbGRcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbCA8IHRoaXMuc2Nyb2xsVGhyZXNob2xkIHx8XG4gICAgICAgICF0aGlzLmlzQm9vdGVkXG4gICAgICApIHJldHVyblxuXG4gICAgICB0aGlzLmlzQWN0aXZlID0gdGhpcy5pc1Njcm9sbGluZ1VwXG4gICAgICB0aGlzLnNhdmVkU2Nyb2xsID0gdGhpcy5jdXJyZW50U2Nyb2xsXG4gICAgfSxcbiAgICBpc0FjdGl2ZSAoKSB7XG4gICAgICB0aGlzLnNhdmVkU2Nyb2xsID0gMFxuICAgIH0sXG4gICAgaW52ZXJ0ZWRTY3JvbGwgKHZhbCkge1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9ICF2YWxcbiAgICB9LFxuICAgIG1hbnVhbFNjcm9sbCAodmFsKSB7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gIXZhbFxuICAgIH0sXG4gICAgaXNTY3JvbGxpbmdVcCAoKSB7XG4gICAgICB0aGlzLnNhdmVkU2Nyb2xsID0gdGhpcy5zYXZlZFNjcm9sbCB8fCB0aGlzLmN1cnJlbnRTY3JvbGxcbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZCAoKSB7XG4gICAgaWYgKHRoaXMuaW52ZXJ0ZWRTY3JvbGwgfHxcbiAgICAgIHRoaXMubWFudWFsU2Nyb2xsXG4gICAgKSB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICBpZiAodGhpcy5zY3JvbGxUYXJnZXQpIHtcbiAgICAgIHRoaXMudGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNjcm9sbFRhcmdldClcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uU2Nyb2xsICgpIHtcbiAgICAgIGlmICghdGhpcy5jYW5TY3JvbGwgfHxcbiAgICAgICAgdGhpcy5tYW51YWxTY3JvbGwgfHxcbiAgICAgICAgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0IHx8IHdpbmRvd1xuXG4gICAgICB0aGlzLmN1cnJlbnRTY3JvbGwgPSB0aGlzLnNjcm9sbFRhcmdldFxuICAgICAgICA/IHRhcmdldC5zY3JvbGxUb3BcbiAgICAgICAgOiB0YXJnZXQucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxuXG4gICAgICB0aGlzLmlzU2Nyb2xsaW5nVXAgPSB0aGlzLmN1cnJlbnRTY3JvbGwgPCB0aGlzLnByZXZpb3VzU2Nyb2xsXG5cbiAgICAgIHRoaXMucHJldmlvdXNTY3JvbGwgPSB0aGlzLmN1cnJlbnRTY3JvbGxcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgYXBwbGljYXRpb24gbGF5b3V0XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgdXBkYXRlQXBwbGljYXRpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW52ZXJ0ZWRTY3JvbGwgfHwgdGhpcy5tYW51YWxTY3JvbGxcbiAgICAgICAgPyAwXG4gICAgICAgIDogdGhpcy5jb21wdXRlZEhlaWdodFxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICB0aGlzLmlzRXh0ZW5kZWQgPSB0aGlzLmV4dGVuZGVkIHx8ICEhdGhpcy4kc2xvdHMuZXh0ZW5zaW9uXG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKHRoaXMuY29sb3IsIHtcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlcyxcbiAgICAgIG9uOiB0aGlzLiRsaXN0ZW5lcnNcbiAgICB9KVxuXG4gICAgZGF0YS5kaXJlY3RpdmVzID0gW3tcbiAgICAgIGFyZzogdGhpcy5zY3JvbGxUYXJnZXQsXG4gICAgICBuYW1lOiAnc2Nyb2xsJyxcbiAgICAgIHZhbHVlOiB0aGlzLm9uU2Nyb2xsXG4gICAgfV1cblxuICAgIGNoaWxkcmVuLnB1c2goaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXRvb2xiYXJfX2NvbnRlbnQnLFxuICAgICAgc3R5bGU6IHsgaGVpZ2h0OiBgJHt0aGlzLmNvbXB1dGVkQ29udGVudEhlaWdodH1weGAgfSxcbiAgICAgIHJlZjogJ2NvbnRlbnQnXG4gICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdCkpXG5cbiAgICBpZiAodGhpcy5pc0V4dGVuZGVkKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKGgoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRvb2xiYXJfX2V4dGVuc2lvbicsXG4gICAgICAgIHN0eWxlOiB7IGhlaWdodDogYCR7dGhpcy5jb21wdXRlZEV4dGVuc2lvbkhlaWdodH1weGAgfVxuICAgICAgfSwgdGhpcy4kc2xvdHMuZXh0ZW5zaW9uKSlcbiAgICB9XG5cbiAgICByZXR1cm4gaCgnbmF2JywgZGF0YSwgY2hpbGRyZW4pXG4gIH1cbn1cbiJdfQ==