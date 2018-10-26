import '../../stylus/components/_navigation-drawer.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import Dependent from '../../mixins/dependent';
import Overlayable from '../../mixins/overlayable';
import SSRBootable from '../../mixins/ssr-bootable';
import Themeable from '../../mixins/themeable';
// Directives
import ClickOutside from '../../directives/click-outside';
import Resize from '../../directives/resize';
import Touch from '../../directives/touch';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-navigation-drawer',
    directives: {
        ClickOutside,
        Resize,
        Touch
    },
    mixins: [
        Applicationable(null, [
            'miniVariant',
            'right',
            'width'
        ]),
        Dependent,
        Overlayable,
        SSRBootable,
        Themeable
    ],
    props: {
        clipped: Boolean,
        disableRouteWatcher: Boolean,
        disableResizeWatcher: Boolean,
        height: {
            type: [Number, String],
            default: '100%'
        },
        floating: Boolean,
        miniVariant: Boolean,
        miniVariantWidth: {
            type: [Number, String],
            default: 80
        },
        mobileBreakPoint: {
            type: [Number, String],
            default: 1264
        },
        permanent: Boolean,
        right: Boolean,
        stateless: Boolean,
        temporary: Boolean,
        touchless: Boolean,
        width: {
            type: [Number, String],
            default: 300
        },
        value: { required: false }
    },
    data: () => ({
        isActive: false,
        touchArea: {
            left: 0,
            right: 0
        }
    }),
    computed: {
        /**
         * Used for setting an app
         * value from a dynamic
         * property. Called from
         * applicationable.js
         *
         * @return {string}
         */
        applicationProperty() {
            return this.right ? 'right' : 'left';
        },
        calculatedTransform() {
            if (this.isActive)
                return 0;
            return this.right
                ? this.calculatedWidth
                : -this.calculatedWidth;
        },
        calculatedWidth() {
            return this.miniVariant
                ? this.miniVariantWidth
                : this.width;
        },
        classes() {
            return {
                'v-navigation-drawer': true,
                'v-navigation-drawer--absolute': this.absolute,
                'v-navigation-drawer--clipped': this.clipped,
                'v-navigation-drawer--close': !this.isActive,
                'v-navigation-drawer--fixed': !this.absolute && (this.app || this.fixed),
                'v-navigation-drawer--floating': this.floating,
                'v-navigation-drawer--is-mobile': this.isMobile,
                'v-navigation-drawer--mini-variant': this.miniVariant,
                'v-navigation-drawer--open': this.isActive,
                'v-navigation-drawer--right': this.right,
                'v-navigation-drawer--temporary': this.temporary,
                ...this.themeClasses
            };
        },
        hasApp() {
            return this.app &&
                (!this.isMobile && !this.temporary);
        },
        isMobile() {
            return !this.stateless &&
                !this.permanent &&
                !this.temporary &&
                this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10);
        },
        marginTop() {
            if (!this.hasApp)
                return 0;
            let marginTop = this.$vuetify.application.bar;
            marginTop += this.clipped
                ? this.$vuetify.application.top
                : 0;
            return marginTop;
        },
        maxHeight() {
            if (!this.hasApp)
                return null;
            const maxHeight = (this.$vuetify.application.bottom +
                this.$vuetify.application.footer +
                this.$vuetify.application.bar);
            if (!this.clipped)
                return maxHeight;
            return maxHeight + this.$vuetify.application.top;
        },
        reactsToClick() {
            return !this.stateless &&
                !this.permanent &&
                (this.isMobile || this.temporary);
        },
        reactsToMobile() {
            return !this.disableResizeWatcher &&
                !this.stateless &&
                !this.permanent &&
                !this.temporary;
        },
        reactsToRoute() {
            return !this.disableRouteWatcher &&
                !this.stateless &&
                (this.temporary || this.isMobile);
        },
        resizeIsDisabled() {
            return this.disableResizeWatcher || this.stateless;
        },
        showOverlay() {
            return this.isActive &&
                (this.isMobile || this.temporary);
        },
        styles() {
            const styles = {
                height: convertToUnit(this.height),
                marginTop: `${this.marginTop}px`,
                maxHeight: `calc(100% - ${+this.maxHeight}px)`,
                transform: `translateX(${this.calculatedTransform}px)`,
                width: `${this.calculatedWidth}px`
            };
            return styles;
        }
    },
    watch: {
        $route() {
            if (this.reactsToRoute && this.closeConditional()) {
                this.isActive = false;
            }
        },
        isActive(val) {
            this.$emit('input', val);
            this.callUpdate();
        },
        /**
         * When mobile changes, adjust
         * the active state only when
         * there has been a previous
         * value
         */
        isMobile(val, prev) {
            !val &&
                this.isActive &&
                !this.temporary &&
                this.removeOverlay();
            if (prev == null ||
                this.resizeIsDisabled ||
                !this.reactsToMobile)
                return;
            this.isActive = !val;
            this.callUpdate();
        },
        permanent(val) {
            // If enabling prop
            // enable the drawer
            if (val) {
                this.isActive = true;
            }
            this.callUpdate();
        },
        showOverlay(val) {
            if (val)
                this.genOverlay();
            else
                this.removeOverlay();
        },
        temporary() {
            this.callUpdate();
        },
        value(val) {
            if (this.permanent)
                return;
            if (val == null)
                return this.init();
            if (val !== this.isActive)
                this.isActive = val;
        }
    },
    beforeMount() {
        this.init();
    },
    methods: {
        calculateTouchArea() {
            if (!this.$el.parentNode)
                return;
            const parentRect = this.$el.parentNode.getBoundingClientRect();
            this.touchArea = {
                left: parentRect.left + 50,
                right: parentRect.right - 50
            };
        },
        closeConditional() {
            return this.isActive && this.reactsToClick;
        },
        genDirectives() {
            const directives = [{
                    name: 'click-outside',
                    value: () => (this.isActive = false),
                    args: {
                        closeConditional: this.closeConditional,
                        include: this.getOpenDependentElements
                    }
                }];
            !this.touchless && directives.push({
                name: 'touch',
                value: {
                    parent: true,
                    left: this.swipeLeft,
                    right: this.swipeRight
                }
            });
            return directives;
        },
        /**
         * Sets state before mount to avoid
         * entry transitions in SSR
         *
         * @return {void}
         */
        init() {
            if (this.permanent) {
                this.isActive = true;
            }
            else if (this.stateless ||
                this.value != null) {
                this.isActive = this.value;
            }
            else if (!this.temporary) {
                this.isActive = !this.isMobile;
            }
        },
        swipeRight(e) {
            if (this.isActive && !this.right)
                return;
            this.calculateTouchArea();
            if (Math.abs(e.touchendX - e.touchstartX) < 100)
                return;
            if (!this.right &&
                e.touchstartX <= this.touchArea.left)
                this.isActive = true;
            else if (this.right && this.isActive)
                this.isActive = false;
        },
        swipeLeft(e) {
            if (this.isActive && this.right)
                return;
            this.calculateTouchArea();
            if (Math.abs(e.touchendX - e.touchstartX) < 100)
                return;
            if (this.right &&
                e.touchstartX >= this.touchArea.right)
                this.isActive = true;
            else if (!this.right && this.isActive)
                this.isActive = false;
        },
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication() {
            return !this.isActive ||
                this.temporary ||
                this.isMobile
                ? 0
                : this.calculatedWidth;
        }
    },
    render(h) {
        const data = {
            'class': this.classes,
            style: this.styles,
            directives: this.genDirectives(),
            on: {
                click: () => {
                    if (!this.miniVariant)
                        return;
                    this.$emit('update:miniVariant', false);
                },
                transitionend: e => {
                    if (e.target !== e.currentTarget)
                        return;
                    this.$emit('transitionend', e);
                    // IE11 does not support new Event('resize')
                    const resizeEvent = document.createEvent('UIEvents');
                    resizeEvent.initUIEvent('resize', true, false, window, 0);
                    window.dispatchEvent(resizeEvent);
                }
            }
        };
        return h('aside', data, [
            this.$slots.default,
            h('div', { 'class': 'v-navigation-drawer__border' })
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVk5hdmlnYXRpb25EcmF3ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WTmF2aWdhdGlvbkRyYXdlci9WTmF2aWdhdGlvbkRyYXdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGlEQUFpRCxDQUFBO0FBRXhELFNBQVM7QUFDVCxPQUFPLGVBQWUsTUFBTSw4QkFBOEIsQ0FBQTtBQUMxRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQTtBQUNsRCxPQUFPLFdBQVcsTUFBTSwyQkFBMkIsQ0FBQTtBQUNuRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUE7QUFDekQsT0FBTyxNQUFNLE1BQU0seUJBQXlCLENBQUE7QUFDNUMsT0FBTyxLQUFLLE1BQU0sd0JBQXdCLENBQUE7QUFFMUMsVUFBVTtBQUNWLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUVsRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxxQkFBcUI7SUFFM0IsVUFBVSxFQUFFO1FBQ1YsWUFBWTtRQUNaLE1BQU07UUFDTixLQUFLO0tBQ047SUFFRCxNQUFNLEVBQUU7UUFDTixlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3BCLGFBQWE7WUFDYixPQUFPO1lBQ1AsT0FBTztTQUNSLENBQUM7UUFDRixTQUFTO1FBQ1QsV0FBVztRQUNYLFdBQVc7UUFDWCxTQUFTO0tBQ1Y7SUFFRCxLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUUsT0FBTztRQUNoQixtQkFBbUIsRUFBRSxPQUFPO1FBQzVCLG9CQUFvQixFQUFFLE9BQU87UUFDN0IsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsTUFBTTtT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QUksRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDbkIsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxDQUFDO1NBQ3JELENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fbmF2aWdhdGlvbi1kcmF3ZXIuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgQXBwbGljYXRpb25hYmxlIGZyb20gJy4uLy4uL21peGlucy9hcHBsaWNhdGlvbmFibGUnXG5pbXBvcnQgRGVwZW5kZW50IGZyb20gJy4uLy4uL21peGlucy9kZXBlbmRlbnQnXG5pbXBvcnQgT3ZlcmxheWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL292ZXJsYXlhYmxlJ1xuaW1wb3J0IFNTUkJvb3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9zc3ItYm9vdGFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBDbGlja091dHNpZGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlJ1xuaW1wb3J0IFJlc2l6ZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZSdcbmltcG9ydCBUb3VjaCBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3RvdWNoJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1uYXZpZ2F0aW9uLWRyYXdlcicsXG5cbiAgZGlyZWN0aXZlczoge1xuICAgIENsaWNrT3V0c2lkZSxcbiAgICBSZXNpemUsXG4gICAgVG91Y2hcbiAgfSxcblxuICBtaXhpbnM6IFtcbiAgICBBcHBsaWNhdGlvbmFibGUobnVsbCwgW1xuICAgICAgJ21pbmlWYXJpYW50JyxcbiAgICAgICdyaWdodCcsXG4gICAgICAnd2lkdGgnXG4gICAgXSksXG4gICAgRGVwZW5kZW50LFxuICAgIE92ZXJsYXlhYmxlLFxuICAgIFNTUkJvb3RhYmxlLFxuICAgIFRoZW1lYWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgY2xpcHBlZDogQm9vbGVhbixcbiAgICBkaXNhYmxlUm91dGVXYXRjaGVyOiBCb29sZWFuLFxuICAgIGRpc2FibGVSZXNpemVXYXRjaGVyOiBCb29sZWFuLFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICcxMDAlJ1xuICAgIH0sXG4gICAgZmxvYXRpbmc6IEJvb2xlYW4sXG4gICAgbWluaVZhcmlhbnQ6IEJvb2xlYW4sXG4gICAgbWluaVZhcmlhbnRXaWR0aDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDgwXG4gICAgfSxcbiAgICBtb2JpbGVCcmVha1BvaW50OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMTI2NFxuICAgIH0sXG4gICAgcGVybWFuZW50OiBCb29sZWFuLFxuICAgIHJpZ2h0OiBCb29sZWFuLFxuICAgIHN0YXRlbGVzczogQm9vbGVhbixcbiAgICB0ZW1wb3Jhcnk6IEJvb2xlYW4sXG4gICAgdG91Y2hsZXNzOiBCb29sZWFuLFxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcbiAgICB2YWx1ZTogeyByZXF1aXJlZDogZmFsc2UgfVxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgIHRvdWNoQXJlYToge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHJpZ2h0OiAwXG4gICAgfVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHNldHRpbmcgYW4gYXBwXG4gICAgICogdmFsdWUgZnJvbSBhIGR5bmFtaWNcbiAgICAgKiBwcm9wZXJ0eS4gQ2FsbGVkIGZyb21cbiAgICAgKiBhcHBsaWNhdGlvbmFibGUuanNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBhcHBsaWNhdGlvblByb3BlcnR5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJpZ2h0ID8gJ3JpZ2h0JyA6ICdsZWZ0J1xuICAgIH0sXG4gICAgY2FsY3VsYXRlZFRyYW5zZm9ybSAoKSB7XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSkgcmV0dXJuIDBcblxuICAgICAgcmV0dXJuIHRoaXMucmlnaHRcbiAgICAgICAgPyB0aGlzLmNhbGN1bGF0ZWRXaWR0aFxuICAgICAgICA6IC10aGlzLmNhbGN1bGF0ZWRXaWR0aFxuICAgIH0sXG4gICAgY2FsY3VsYXRlZFdpZHRoICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbmlWYXJpYW50XG4gICAgICAgID8gdGhpcy5taW5pVmFyaWFudFdpZHRoXG4gICAgICAgIDogdGhpcy53aWR0aFxuICAgIH0sXG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1uYXZpZ2F0aW9uLWRyYXdlcic6IHRydWUsXG4gICAgICAgICd2LW5hdmlnYXRpb24tZHJhd2VyLS1hYnNvbHV0ZSc6IHRoaXMuYWJzb2x1dGUsXG4gICAgICAgICd2LW5hdmlnYXRpb24tZHJhd2VyLS1jbGlwcGVkJzogdGhpcy5jbGlwcGVkLFxuICAgICAgICAndi1uYXZpZ2F0aW9uLWRyYXdlci0tY2xvc2UnOiAhdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgJ3YtbmF2aWdhdGlvbi1kcmF3ZXItLWZpeGVkJzogIXRoaXMuYWJzb2x1dGUgJiYgKHRoaXMuYXBwIHx8IHRoaXMuZml4ZWQpLFxuICAgICAgICAndi1uYXZpZ2F0aW9uLWRyYXdlci0tZmxvYXRpbmcnOiB0aGlzLmZsb2F0aW5nLFxuICAgICAgICAndi1uYXZpZ2F0aW9uLWRyYXdlci0taXMtbW9iaWxlJzogdGhpcy5pc01vYmlsZSxcbiAgICAgICAgJ3YtbmF2aWdhdGlvbi1kcmF3ZXItLW1pbmktdmFyaWFudCc6IHRoaXMubWluaVZhcmlhbnQsXG4gICAgICAgICd2LW5hdmlnYXRpb24tZHJhd2VyLS1vcGVuJzogdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgJ3YtbmF2aWdhdGlvbi1kcmF3ZXItLXJpZ2h0JzogdGhpcy5yaWdodCxcbiAgICAgICAgJ3YtbmF2aWdhdGlvbi1kcmF3ZXItLXRlbXBvcmFyeSc6IHRoaXMudGVtcG9yYXJ5LFxuICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFzQXBwICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFwcCAmJlxuICAgICAgICAoIXRoaXMuaXNNb2JpbGUgJiYgIXRoaXMudGVtcG9yYXJ5KVxuICAgIH0sXG4gICAgaXNNb2JpbGUgKCkge1xuICAgICAgcmV0dXJuICF0aGlzLnN0YXRlbGVzcyAmJlxuICAgICAgICAhdGhpcy5wZXJtYW5lbnQgJiZcbiAgICAgICAgIXRoaXMudGVtcG9yYXJ5ICYmXG4gICAgICAgIHRoaXMuJHZ1ZXRpZnkuYnJlYWtwb2ludC53aWR0aCA8IHBhcnNlSW50KHRoaXMubW9iaWxlQnJlYWtQb2ludCwgMTApXG4gICAgfSxcbiAgICBtYXJnaW5Ub3AgKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0FwcCkgcmV0dXJuIDBcblxuICAgICAgbGV0IG1hcmdpblRvcCA9IHRoaXMuJHZ1ZXRpZnkuYXBwbGljYXRpb24uYmFyXG5cbiAgICAgIG1hcmdpblRvcCArPSB0aGlzLmNsaXBwZWRcbiAgICAgICAgPyB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLnRvcFxuICAgICAgICA6IDBcblxuICAgICAgcmV0dXJuIG1hcmdpblRvcFxuICAgIH0sXG4gICAgbWF4SGVpZ2h0ICgpIHtcbiAgICAgIGlmICghdGhpcy5oYXNBcHApIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IG1heEhlaWdodCA9IChcbiAgICAgICAgdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvbi5ib3R0b20gK1xuICAgICAgICB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLmZvb3RlciArXG4gICAgICAgIHRoaXMuJHZ1ZXRpZnkuYXBwbGljYXRpb24uYmFyXG4gICAgICApXG5cbiAgICAgIGlmICghdGhpcy5jbGlwcGVkKSByZXR1cm4gbWF4SGVpZ2h0XG5cbiAgICAgIHJldHVybiBtYXhIZWlnaHQgKyB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLnRvcFxuICAgIH0sXG4gICAgcmVhY3RzVG9DbGljayAoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuc3RhdGVsZXNzICYmXG4gICAgICAgICF0aGlzLnBlcm1hbmVudCAmJlxuICAgICAgICAodGhpcy5pc01vYmlsZSB8fCB0aGlzLnRlbXBvcmFyeSlcbiAgICB9LFxuICAgIHJlYWN0c1RvTW9iaWxlICgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5kaXNhYmxlUmVzaXplV2F0Y2hlciAmJlxuICAgICAgICAhdGhpcy5zdGF0ZWxlc3MgJiZcbiAgICAgICAgIXRoaXMucGVybWFuZW50ICYmXG4gICAgICAgICF0aGlzLnRlbXBvcmFyeVxuICAgIH0sXG4gICAgcmVhY3RzVG9Sb3V0ZSAoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuZGlzYWJsZVJvdXRlV2F0Y2hlciAmJlxuICAgICAgICAhdGhpcy5zdGF0ZWxlc3MgJiZcbiAgICAgICAgKHRoaXMudGVtcG9yYXJ5IHx8IHRoaXMuaXNNb2JpbGUpXG4gICAgfSxcbiAgICByZXNpemVJc0Rpc2FibGVkICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc2FibGVSZXNpemVXYXRjaGVyIHx8IHRoaXMuc3RhdGVsZXNzXG4gICAgfSxcbiAgICBzaG93T3ZlcmxheSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0FjdGl2ZSAmJlxuICAgICAgICAodGhpcy5pc01vYmlsZSB8fCB0aGlzLnRlbXBvcmFyeSlcbiAgICB9LFxuICAgIHN0eWxlcyAoKSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIGhlaWdodDogY29udmVydFRvVW5pdCh0aGlzLmhlaWdodCksXG4gICAgICAgIG1hcmdpblRvcDogYCR7dGhpcy5tYXJnaW5Ub3B9cHhgLFxuICAgICAgICBtYXhIZWlnaHQ6IGBjYWxjKDEwMCUgLSAkeyt0aGlzLm1heEhlaWdodH1weClgLFxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7dGhpcy5jYWxjdWxhdGVkVHJhbnNmb3JtfXB4KWAsXG4gICAgICAgIHdpZHRoOiBgJHt0aGlzLmNhbGN1bGF0ZWRXaWR0aH1weGBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlc1xuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgICRyb3V0ZSAoKSB7XG4gICAgICBpZiAodGhpcy5yZWFjdHNUb1JvdXRlICYmIHRoaXMuY2xvc2VDb25kaXRpb25hbCgpKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgaXNBY3RpdmUgKHZhbCkge1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB2YWwpXG4gICAgICB0aGlzLmNhbGxVcGRhdGUoKVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogV2hlbiBtb2JpbGUgY2hhbmdlcywgYWRqdXN0XG4gICAgICogdGhlIGFjdGl2ZSBzdGF0ZSBvbmx5IHdoZW5cbiAgICAgKiB0aGVyZSBoYXMgYmVlbiBhIHByZXZpb3VzXG4gICAgICogdmFsdWVcbiAgICAgKi9cbiAgICBpc01vYmlsZSAodmFsLCBwcmV2KSB7XG4gICAgICAhdmFsICYmXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgJiZcbiAgICAgICAgIXRoaXMudGVtcG9yYXJ5ICYmXG4gICAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheSgpXG5cbiAgICAgIGlmIChwcmV2ID09IG51bGwgfHxcbiAgICAgICAgdGhpcy5yZXNpemVJc0Rpc2FibGVkIHx8XG4gICAgICAgICF0aGlzLnJlYWN0c1RvTW9iaWxlXG4gICAgICApIHJldHVyblxuXG4gICAgICB0aGlzLmlzQWN0aXZlID0gIXZhbFxuICAgICAgdGhpcy5jYWxsVXBkYXRlKClcbiAgICB9LFxuICAgIHBlcm1hbmVudCAodmFsKSB7XG4gICAgICAvLyBJZiBlbmFibGluZyBwcm9wXG4gICAgICAvLyBlbmFibGUgdGhlIGRyYXdlclxuICAgICAgaWYgKHZhbCkge1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5jYWxsVXBkYXRlKClcbiAgICB9LFxuICAgIHNob3dPdmVybGF5ICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHRoaXMuZ2VuT3ZlcmxheSgpXG4gICAgICBlbHNlIHRoaXMucmVtb3ZlT3ZlcmxheSgpXG4gICAgfSxcbiAgICB0ZW1wb3JhcnkgKCkge1xuICAgICAgdGhpcy5jYWxsVXBkYXRlKClcbiAgICB9LFxuICAgIHZhbHVlICh2YWwpIHtcbiAgICAgIGlmICh0aGlzLnBlcm1hbmVudCkgcmV0dXJuXG5cbiAgICAgIGlmICh2YWwgPT0gbnVsbCkgcmV0dXJuIHRoaXMuaW5pdCgpXG5cbiAgICAgIGlmICh2YWwgIT09IHRoaXMuaXNBY3RpdmUpIHRoaXMuaXNBY3RpdmUgPSB2YWxcbiAgICB9XG4gIH0sXG5cbiAgYmVmb3JlTW91bnQgKCkge1xuICAgIHRoaXMuaW5pdCgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGNhbGN1bGF0ZVRvdWNoQXJlYSAoKSB7XG4gICAgICBpZiAoIXRoaXMuJGVsLnBhcmVudE5vZGUpIHJldHVyblxuICAgICAgY29uc3QgcGFyZW50UmVjdCA9IHRoaXMuJGVsLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgdGhpcy50b3VjaEFyZWEgPSB7XG4gICAgICAgIGxlZnQ6IHBhcmVudFJlY3QubGVmdCArIDUwLFxuICAgICAgICByaWdodDogcGFyZW50UmVjdC5yaWdodCAtIDUwXG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9zZUNvbmRpdGlvbmFsICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlICYmIHRoaXMucmVhY3RzVG9DbGlja1xuICAgIH0sXG4gICAgZ2VuRGlyZWN0aXZlcyAoKSB7XG4gICAgICBjb25zdCBkaXJlY3RpdmVzID0gW3tcbiAgICAgICAgbmFtZTogJ2NsaWNrLW91dHNpZGUnLFxuICAgICAgICB2YWx1ZTogKCkgPT4gKHRoaXMuaXNBY3RpdmUgPSBmYWxzZSksXG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICBjbG9zZUNvbmRpdGlvbmFsOiB0aGlzLmNsb3NlQ29uZGl0aW9uYWwsXG4gICAgICAgICAgaW5jbHVkZTogdGhpcy5nZXRPcGVuRGVwZW5kZW50RWxlbWVudHNcbiAgICAgICAgfVxuICAgICAgfV1cblxuICAgICAgIXRoaXMudG91Y2hsZXNzICYmIGRpcmVjdGl2ZXMucHVzaCh7XG4gICAgICAgIG5hbWU6ICd0b3VjaCcsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgcGFyZW50OiB0cnVlLFxuICAgICAgICAgIGxlZnQ6IHRoaXMuc3dpcGVMZWZ0LFxuICAgICAgICAgIHJpZ2h0OiB0aGlzLnN3aXBlUmlnaHRcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGRpcmVjdGl2ZXNcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFNldHMgc3RhdGUgYmVmb3JlIG1vdW50IHRvIGF2b2lkXG4gICAgICogZW50cnkgdHJhbnNpdGlvbnMgaW4gU1NSXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGluaXQgKCkge1xuICAgICAgaWYgKHRoaXMucGVybWFuZW50KSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGVsZXNzIHx8XG4gICAgICAgIHRoaXMudmFsdWUgIT0gbnVsbFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0aGlzLnZhbHVlXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnRlbXBvcmFyeSkge1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gIXRoaXMuaXNNb2JpbGVcbiAgICAgIH1cbiAgICB9LFxuICAgIHN3aXBlUmlnaHQgKGUpIHtcbiAgICAgIGlmICh0aGlzLmlzQWN0aXZlICYmICF0aGlzLnJpZ2h0KSByZXR1cm5cbiAgICAgIHRoaXMuY2FsY3VsYXRlVG91Y2hBcmVhKClcblxuICAgICAgaWYgKE1hdGguYWJzKGUudG91Y2hlbmRYIC0gZS50b3VjaHN0YXJ0WCkgPCAxMDApIHJldHVyblxuICAgICAgaWYgKCF0aGlzLnJpZ2h0ICYmXG4gICAgICAgIGUudG91Y2hzdGFydFggPD0gdGhpcy50b3VjaEFyZWEubGVmdFxuICAgICAgKSB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgZWxzZSBpZiAodGhpcy5yaWdodCAmJiB0aGlzLmlzQWN0aXZlKSB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIHN3aXBlTGVmdCAoZSkge1xuICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5yaWdodCkgcmV0dXJuXG4gICAgICB0aGlzLmNhbGN1bGF0ZVRvdWNoQXJlYSgpXG5cbiAgICAgIGlmIChNYXRoLmFicyhlLnRvdWNoZW5kWCAtIGUudG91Y2hzdGFydFgpIDwgMTAwKSByZXR1cm5cbiAgICAgIGlmICh0aGlzLnJpZ2h0ICYmXG4gICAgICAgIGUudG91Y2hzdGFydFggPj0gdGhpcy50b3VjaEFyZWEucmlnaHRcbiAgICAgICkgdGhpcy5pc0FjdGl2ZSA9IHRydWVcbiAgICAgIGVsc2UgaWYgKCF0aGlzLnJpZ2h0ICYmIHRoaXMuaXNBY3RpdmUpIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBhcHBsaWNhdGlvbiBsYXlvdXRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICB1cGRhdGVBcHBsaWNhdGlvbiAoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuaXNBY3RpdmUgfHxcbiAgICAgICAgdGhpcy50ZW1wb3JhcnkgfHxcbiAgICAgICAgdGhpcy5pc01vYmlsZVxuICAgICAgICA/IDBcbiAgICAgICAgOiB0aGlzLmNhbGN1bGF0ZWRXaWR0aFxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzLFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGVzLFxuICAgICAgZGlyZWN0aXZlczogdGhpcy5nZW5EaXJlY3RpdmVzKCksXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5taW5pVmFyaWFudCkgcmV0dXJuXG5cbiAgICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6bWluaVZhcmlhbnQnLCBmYWxzZSlcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNpdGlvbmVuZDogZSA9PiB7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHJldHVyblxuICAgICAgICAgIHRoaXMuJGVtaXQoJ3RyYW5zaXRpb25lbmQnLCBlKVxuXG4gICAgICAgICAgLy8gSUUxMSBkb2VzIG5vdCBzdXBwb3J0IG5ldyBFdmVudCgncmVzaXplJylcbiAgICAgICAgICBjb25zdCByZXNpemVFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdVSUV2ZW50cycpXG4gICAgICAgICAgcmVzaXplRXZlbnQuaW5pdFVJRXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlLCB3aW5kb3csIDApXG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQocmVzaXplRXZlbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaCgnYXNpZGUnLCBkYXRhLCBbXG4gICAgICB0aGlzLiRzbG90cy5kZWZhdWx0LFxuICAgICAgaCgnZGl2JywgeyAnY2xhc3MnOiAndi1uYXZpZ2F0aW9uLWRyYXdlcl9fYm9yZGVyJyB9KVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==