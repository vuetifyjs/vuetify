import '../../stylus/components/_navigation-drawer.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
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
                        closeConditional: this.closeConditional
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVk5hdmlnYXRpb25EcmF3ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WTmF2aWdhdGlvbkRyYXdlci9WTmF2aWdhdGlvbkRyYXdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGlEQUFpRCxDQUFBO0FBRXhELFNBQVM7QUFDVCxPQUFPLGVBQWUsTUFBTSw4QkFBOEIsQ0FBQTtBQUMxRCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQTtBQUNsRCxPQUFPLFdBQVcsTUFBTSwyQkFBMkIsQ0FBQTtBQUNuRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUE7QUFDekQsT0FBTyxNQUFNLE1BQU0seUJBQXlCLENBQUE7QUFDNUMsT0FBTyxLQUFLLE1BQU0sd0JBQXdCLENBQUE7QUFFMUMsVUFBVTtBQUNWLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUVsRCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxxQkFBcUI7SUFFM0IsVUFBVSxFQUFFO1FBQ1YsWUFBWTtRQUNaLE1BQU07UUFDTixLQUFLO0tBQ047SUFFRCxNQUFNLEVBQUU7UUFDTixlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3BCLGFBQWE7WUFDYixPQUFPO1lBQ1AsT0FBTztTQUNSLENBQUM7UUFDRixXQUFXO1FBQ1gsV0FBVztRQUNYLFNBQVM7S0FDVjtJQUVELEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLG1CQUFtQixFQUFFLE9BQU87UUFDNUIsb0JBQW9CLEVBQUUsT0FBTztRQUM3QixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsUUFBUSxFQUFFLE9BQU87UUFDakIsV0FBVyxFQUFFLE9B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QUUsNkJBQTZCLEVBQUUsQ0FBQztTQUNyRCxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX25hdmlnYXRpb24tZHJhd2VyLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IEFwcGxpY2F0aW9uYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvYXBwbGljYXRpb25hYmxlJ1xuaW1wb3J0IE92ZXJsYXlhYmxlIGZyb20gJy4uLy4uL21peGlucy9vdmVybGF5YWJsZSdcbmltcG9ydCBTU1JCb290YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvc3NyLWJvb3RhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG4vLyBEaXJlY3RpdmVzXG5pbXBvcnQgQ2xpY2tPdXRzaWRlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZSdcbmltcG9ydCBSZXNpemUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUnXG5pbXBvcnQgVG91Y2ggZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaCdcblxuLy8gSGVscGVyc1xuaW1wb3J0IHsgY29udmVydFRvVW5pdCB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtbmF2aWdhdGlvbi1kcmF3ZXInLFxuXG4gIGRpcmVjdGl2ZXM6IHtcbiAgICBDbGlja091dHNpZGUsXG4gICAgUmVzaXplLFxuICAgIFRvdWNoXG4gIH0sXG5cbiAgbWl4aW5zOiBbXG4gICAgQXBwbGljYXRpb25hYmxlKG51bGwsIFtcbiAgICAgICdtaW5pVmFyaWFudCcsXG4gICAgICAncmlnaHQnLFxuICAgICAgJ3dpZHRoJ1xuICAgIF0pLFxuICAgIE92ZXJsYXlhYmxlLFxuICAgIFNTUkJvb3RhYmxlLFxuICAgIFRoZW1lYWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgY2xpcHBlZDogQm9vbGVhbixcbiAgICBkaXNhYmxlUm91dGVXYXRjaGVyOiBCb29sZWFuLFxuICAgIGRpc2FibGVSZXNpemVXYXRjaGVyOiBCb29sZWFuLFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICcxMDAlJ1xuICAgIH0sXG4gICAgZmxvYXRpbmc6IEJvb2xlYW4sXG4gICAgbWluaVZhcmlhbnQ6IEJvb2xlYW4sXG4gICAgbWluaVZhcmlhbnRXaWR0aDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDgwXG4gICAgfSxcbiAgICBtb2JpbGVCcmVha1BvaW50OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMTI2NFxuICAgIH0sXG4gICAgcGVybWFuZW50OiBCb29sZWFuLFxuICAgIHJpZ2h0OiBCb29sZWFuLFxuICAgIHN0YXRlbGVzczogQm9vbGVhbixcbiAgICB0ZW1wb3Jhcnk6IEJvb2xlYW4sXG4gICAgdG91Y2hsZXNzOiBCb29sZWFuLFxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcbiAgICB2YWx1ZTogeyByZXF1aXJlZDogZmFsc2UgfVxuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgIHRvdWNoQXJlYToge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHJpZ2h0OiAwXG4gICAgfVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHNldHRpbmcgYW4gYXBwXG4gICAgICogdmFsdWUgZnJvbSBhIGR5bmFtaWNcbiAgICAgKiBwcm9wZXJ0eS4gQ2FsbGVkIGZyb21cbiAgICAgKiBhcHBsaWNhdGlvbmFibGUuanNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBhcHBsaWNhdGlvblByb3BlcnR5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJpZ2h0ID8gJ3JpZ2h0JyA6ICdsZWZ0J1xuICAgIH0sXG4gICAgY2FsY3VsYXRlZFRyYW5zZm9ybSAoKSB7XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSkgcmV0dXJuIDBcblxuICAgICAgcmV0dXJuIHRoaXMucmlnaHRcbiAgICAgICAgPyB0aGlzLmNhbGN1bGF0ZWRXaWR0aFxuICAgICAgICA6IC10aGlzLmNhbGN1bGF0ZWRXaWR0aFxuICAgIH0sXG4gICAgY2FsY3VsYXRlZFdpZHRoICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbmlWYXJpYW50XG4gICAgICAgID8gdGhpcy5taW5pVmFyaWFudFdpZHRoXG4gICAgICAgIDogdGhpcy53aWR0aFxuICAgIH0sXG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1uYXZpZ2F0aW9uLWRyYXdlcic6IHRydWUsXG4gICAgICAgICd2LW5hdmlnYXRpb24tZHJhd2VyLS1hYnNvbHV0ZSc6IHRoaXMuYWJzb2x1dGUsXG4gICAgICAgICd2LW5hdmlnYXRpb24tZHJhd2VyLS1jbGlwcGVkJzogdGhpcy5jbGlwcGVkLFxuICAgICAgICAndi1uYXZpZ2F0aW9uLWRyYXdlci0tY2xvc2UnOiAhdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgJ3YtbmF2aWdhdGlvbi1kcmF3ZXItLWZpeGVkJzogIXRoaXMuYWJzb2x1dGUgJiYgKHRoaXMuYXBwIHx8IHRoaXMuZml4ZWQpLFxuICAgICAgICAndi1uYXZpZ2F0aW9uLWRyYXdlci0tZmxvYXRpbmcnOiB0aGlzLmZsb2F0aW5nLFxuICAgICAgICAndi1uYXZpZ2F0aW9uLWRyYXdlci0taXMtbW9iaWxlJzogdGhpcy5pc01vYmlsZSxcbiAgICAgICAgJ3YtbmF2aWdhdGlvbi1kcmF3ZXItLW1pbmktdmFyaWFudCc6IHRoaXMubWluaVZhcmlhbnQsXG4gICAgICAgICd2LW5hdmlnYXRpb24tZHJhd2VyLS1vcGVuJzogdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgJ3YtbmF2aWdhdGlvbi1kcmF3ZXItLXJpZ2h0JzogdGhpcy5yaWdodCxcbiAgICAgICAgJ3YtbmF2aWdhdGlvbi1kcmF3ZXItLXRlbXBvcmFyeSc6IHRoaXMudGVtcG9yYXJ5LFxuICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFzQXBwICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFwcCAmJlxuICAgICAgICAoIXRoaXMuaXNNb2JpbGUgJiYgIXRoaXMudGVtcG9yYXJ5KVxuICAgIH0sXG4gICAgaXNNb2JpbGUgKCkge1xuICAgICAgcmV0dXJuICF0aGlzLnN0YXRlbGVzcyAmJlxuICAgICAgICAhdGhpcy5wZXJtYW5lbnQgJiZcbiAgICAgICAgIXRoaXMudGVtcG9yYXJ5ICYmXG4gICAgICAgIHRoaXMuJHZ1ZXRpZnkuYnJlYWtwb2ludC53aWR0aCA8IHBhcnNlSW50KHRoaXMubW9iaWxlQnJlYWtQb2ludCwgMTApXG4gICAgfSxcbiAgICBtYXJnaW5Ub3AgKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0FwcCkgcmV0dXJuIDBcblxuICAgICAgbGV0IG1hcmdpblRvcCA9IHRoaXMuJHZ1ZXRpZnkuYXBwbGljYXRpb24uYmFyXG5cbiAgICAgIG1hcmdpblRvcCArPSB0aGlzLmNsaXBwZWRcbiAgICAgICAgPyB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLnRvcFxuICAgICAgICA6IDBcblxuICAgICAgcmV0dXJuIG1hcmdpblRvcFxuICAgIH0sXG4gICAgbWF4SGVpZ2h0ICgpIHtcbiAgICAgIGlmICghdGhpcy5oYXNBcHApIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IG1heEhlaWdodCA9IChcbiAgICAgICAgdGhpcy4kdnVldGlmeS5hcHBsaWNhdGlvbi5ib3R0b20gK1xuICAgICAgICB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLmZvb3RlciArXG4gICAgICAgIHRoaXMuJHZ1ZXRpZnkuYXBwbGljYXRpb24uYmFyXG4gICAgICApXG5cbiAgICAgIGlmICghdGhpcy5jbGlwcGVkKSByZXR1cm4gbWF4SGVpZ2h0XG5cbiAgICAgIHJldHVybiBtYXhIZWlnaHQgKyB0aGlzLiR2dWV0aWZ5LmFwcGxpY2F0aW9uLnRvcFxuICAgIH0sXG4gICAgcmVhY3RzVG9DbGljayAoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuc3RhdGVsZXNzICYmXG4gICAgICAgICF0aGlzLnBlcm1hbmVudCAmJlxuICAgICAgICAodGhpcy5pc01vYmlsZSB8fCB0aGlzLnRlbXBvcmFyeSlcbiAgICB9LFxuICAgIHJlYWN0c1RvTW9iaWxlICgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5kaXNhYmxlUmVzaXplV2F0Y2hlciAmJlxuICAgICAgICAhdGhpcy5zdGF0ZWxlc3MgJiZcbiAgICAgICAgIXRoaXMucGVybWFuZW50ICYmXG4gICAgICAgICF0aGlzLnRlbXBvcmFyeVxuICAgIH0sXG4gICAgcmVhY3RzVG9Sb3V0ZSAoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuZGlzYWJsZVJvdXRlV2F0Y2hlciAmJlxuICAgICAgICAhdGhpcy5zdGF0ZWxlc3MgJiZcbiAgICAgICAgKHRoaXMudGVtcG9yYXJ5IHx8IHRoaXMuaXNNb2JpbGUpXG4gICAgfSxcbiAgICByZXNpemVJc0Rpc2FibGVkICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc2FibGVSZXNpemVXYXRjaGVyIHx8IHRoaXMuc3RhdGVsZXNzXG4gICAgfSxcbiAgICBzaG93T3ZlcmxheSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0FjdGl2ZSAmJlxuICAgICAgICAodGhpcy5pc01vYmlsZSB8fCB0aGlzLnRlbXBvcmFyeSlcbiAgICB9LFxuICAgIHN0eWxlcyAoKSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIGhlaWdodDogY29udmVydFRvVW5pdCh0aGlzLmhlaWdodCksXG4gICAgICAgIG1hcmdpblRvcDogYCR7dGhpcy5tYXJnaW5Ub3B9cHhgLFxuICAgICAgICBtYXhIZWlnaHQ6IGBjYWxjKDEwMCUgLSAkeyt0aGlzLm1heEhlaWdodH1weClgLFxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7dGhpcy5jYWxjdWxhdGVkVHJhbnNmb3JtfXB4KWAsXG4gICAgICAgIHdpZHRoOiBgJHt0aGlzLmNhbGN1bGF0ZWRXaWR0aH1weGBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlc1xuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgICRyb3V0ZSAoKSB7XG4gICAgICBpZiAodGhpcy5yZWFjdHNUb1JvdXRlICYmIHRoaXMuY2xvc2VDb25kaXRpb25hbCgpKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgaXNBY3RpdmUgKHZhbCkge1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB2YWwpXG4gICAgICB0aGlzLmNhbGxVcGRhdGUoKVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogV2hlbiBtb2JpbGUgY2hhbmdlcywgYWRqdXN0XG4gICAgICogdGhlIGFjdGl2ZSBzdGF0ZSBvbmx5IHdoZW5cbiAgICAgKiB0aGVyZSBoYXMgYmVlbiBhIHByZXZpb3VzXG4gICAgICogdmFsdWVcbiAgICAgKi9cbiAgICBpc01vYmlsZSAodmFsLCBwcmV2KSB7XG4gICAgICAhdmFsICYmXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgJiZcbiAgICAgICAgIXRoaXMudGVtcG9yYXJ5ICYmXG4gICAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheSgpXG5cbiAgICAgIGlmIChwcmV2ID09IG51bGwgfHxcbiAgICAgICAgdGhpcy5yZXNpemVJc0Rpc2FibGVkIHx8XG4gICAgICAgICF0aGlzLnJlYWN0c1RvTW9iaWxlXG4gICAgICApIHJldHVyblxuXG4gICAgICB0aGlzLmlzQWN0aXZlID0gIXZhbFxuICAgICAgdGhpcy5jYWxsVXBkYXRlKClcbiAgICB9LFxuICAgIHBlcm1hbmVudCAodmFsKSB7XG4gICAgICAvLyBJZiBlbmFibGluZyBwcm9wXG4gICAgICAvLyBlbmFibGUgdGhlIGRyYXdlclxuICAgICAgaWYgKHZhbCkge1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5jYWxsVXBkYXRlKClcbiAgICB9LFxuICAgIHNob3dPdmVybGF5ICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHRoaXMuZ2VuT3ZlcmxheSgpXG4gICAgICBlbHNlIHRoaXMucmVtb3ZlT3ZlcmxheSgpXG4gICAgfSxcbiAgICB0ZW1wb3JhcnkgKCkge1xuICAgICAgdGhpcy5jYWxsVXBkYXRlKClcbiAgICB9LFxuICAgIHZhbHVlICh2YWwpIHtcbiAgICAgIGlmICh0aGlzLnBlcm1hbmVudCkgcmV0dXJuXG5cbiAgICAgIGlmICh2YWwgPT0gbnVsbCkgcmV0dXJuIHRoaXMuaW5pdCgpXG5cbiAgICAgIGlmICh2YWwgIT09IHRoaXMuaXNBY3RpdmUpIHRoaXMuaXNBY3RpdmUgPSB2YWxcbiAgICB9XG4gIH0sXG5cbiAgYmVmb3JlTW91bnQgKCkge1xuICAgIHRoaXMuaW5pdCgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGNhbGN1bGF0ZVRvdWNoQXJlYSAoKSB7XG4gICAgICBpZiAoIXRoaXMuJGVsLnBhcmVudE5vZGUpIHJldHVyblxuICAgICAgY29uc3QgcGFyZW50UmVjdCA9IHRoaXMuJGVsLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgdGhpcy50b3VjaEFyZWEgPSB7XG4gICAgICAgIGxlZnQ6IHBhcmVudFJlY3QubGVmdCArIDUwLFxuICAgICAgICByaWdodDogcGFyZW50UmVjdC5yaWdodCAtIDUwXG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9zZUNvbmRpdGlvbmFsICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlICYmIHRoaXMucmVhY3RzVG9DbGlja1xuICAgIH0sXG4gICAgZ2VuRGlyZWN0aXZlcyAoKSB7XG4gICAgICBjb25zdCBkaXJlY3RpdmVzID0gW3tcbiAgICAgICAgbmFtZTogJ2NsaWNrLW91dHNpZGUnLFxuICAgICAgICB2YWx1ZTogKCkgPT4gKHRoaXMuaXNBY3RpdmUgPSBmYWxzZSksXG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICBjbG9zZUNvbmRpdGlvbmFsOiB0aGlzLmNsb3NlQ29uZGl0aW9uYWxcbiAgICAgICAgfVxuICAgICAgfV1cblxuICAgICAgIXRoaXMudG91Y2hsZXNzICYmIGRpcmVjdGl2ZXMucHVzaCh7XG4gICAgICAgIG5hbWU6ICd0b3VjaCcsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgcGFyZW50OiB0cnVlLFxuICAgICAgICAgIGxlZnQ6IHRoaXMuc3dpcGVMZWZ0LFxuICAgICAgICAgIHJpZ2h0OiB0aGlzLnN3aXBlUmlnaHRcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGRpcmVjdGl2ZXNcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFNldHMgc3RhdGUgYmVmb3JlIG1vdW50IHRvIGF2b2lkXG4gICAgICogZW50cnkgdHJhbnNpdGlvbnMgaW4gU1NSXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGluaXQgKCkge1xuICAgICAgaWYgKHRoaXMucGVybWFuZW50KSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGVsZXNzIHx8XG4gICAgICAgIHRoaXMudmFsdWUgIT0gbnVsbFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0aGlzLnZhbHVlXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnRlbXBvcmFyeSkge1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gIXRoaXMuaXNNb2JpbGVcbiAgICAgIH1cbiAgICB9LFxuICAgIHN3aXBlUmlnaHQgKGUpIHtcbiAgICAgIGlmICh0aGlzLmlzQWN0aXZlICYmICF0aGlzLnJpZ2h0KSByZXR1cm5cbiAgICAgIHRoaXMuY2FsY3VsYXRlVG91Y2hBcmVhKClcblxuICAgICAgaWYgKE1hdGguYWJzKGUudG91Y2hlbmRYIC0gZS50b3VjaHN0YXJ0WCkgPCAxMDApIHJldHVyblxuICAgICAgaWYgKCF0aGlzLnJpZ2h0ICYmXG4gICAgICAgIGUudG91Y2hzdGFydFggPD0gdGhpcy50b3VjaEFyZWEubGVmdFxuICAgICAgKSB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgZWxzZSBpZiAodGhpcy5yaWdodCAmJiB0aGlzLmlzQWN0aXZlKSB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIHN3aXBlTGVmdCAoZSkge1xuICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5yaWdodCkgcmV0dXJuXG4gICAgICB0aGlzLmNhbGN1bGF0ZVRvdWNoQXJlYSgpXG5cbiAgICAgIGlmIChNYXRoLmFicyhlLnRvdWNoZW5kWCAtIGUudG91Y2hzdGFydFgpIDwgMTAwKSByZXR1cm5cbiAgICAgIGlmICh0aGlzLnJpZ2h0ICYmXG4gICAgICAgIGUudG91Y2hzdGFydFggPj0gdGhpcy50b3VjaEFyZWEucmlnaHRcbiAgICAgICkgdGhpcy5pc0FjdGl2ZSA9IHRydWVcbiAgICAgIGVsc2UgaWYgKCF0aGlzLnJpZ2h0ICYmIHRoaXMuaXNBY3RpdmUpIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBhcHBsaWNhdGlvbiBsYXlvdXRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICB1cGRhdGVBcHBsaWNhdGlvbiAoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuaXNBY3RpdmUgfHxcbiAgICAgICAgdGhpcy50ZW1wb3JhcnkgfHxcbiAgICAgICAgdGhpcy5pc01vYmlsZVxuICAgICAgICA/IDBcbiAgICAgICAgOiB0aGlzLmNhbGN1bGF0ZWRXaWR0aFxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzLFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGVzLFxuICAgICAgZGlyZWN0aXZlczogdGhpcy5nZW5EaXJlY3RpdmVzKCksXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5taW5pVmFyaWFudCkgcmV0dXJuXG5cbiAgICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6bWluaVZhcmlhbnQnLCBmYWxzZSlcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNpdGlvbmVuZDogZSA9PiB7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHJldHVyblxuICAgICAgICAgIHRoaXMuJGVtaXQoJ3RyYW5zaXRpb25lbmQnLCBlKVxuXG4gICAgICAgICAgLy8gSUUxMSBkb2VzIG5vdCBzdXBwb3J0IG5ldyBFdmVudCgncmVzaXplJylcbiAgICAgICAgICBjb25zdCByZXNpemVFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdVSUV2ZW50cycpXG4gICAgICAgICAgcmVzaXplRXZlbnQuaW5pdFVJRXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlLCB3aW5kb3csIDApXG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQocmVzaXplRXZlbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaCgnYXNpZGUnLCBkYXRhLCBbXG4gICAgICB0aGlzLiRzbG90cy5kZWZhdWx0LFxuICAgICAgaCgnZGl2JywgeyAnY2xhc3MnOiAndi1uYXZpZ2F0aW9uLWRyYXdlcl9fYm9yZGVyJyB9KVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==