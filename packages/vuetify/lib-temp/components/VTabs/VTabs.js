// Styles
import '../../stylus/components/_tabs.styl';
// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup';
// Component level mixins
import TabsComputed from './mixins/tabs-computed';
import TabsGenerators from './mixins/tabs-generators';
import TabsProps from './mixins/tabs-props';
import TabsTouch from './mixins/tabs-touch';
import TabsWatchers from './mixins/tabs-watchers';
// Mixins
import Colorable from '../../mixins/colorable';
import SSRBootable from '../../mixins/ssr-bootable';
import Themeable from '../../mixins/themeable';
// Directives
import Resize from '../../directives/resize';
import Touch from '../../directives/touch';
import { deprecate } from '../../util/console';
// Utils
import ThemeProvider from '../../util/ThemeProvider';
/* @vue/component */
export default BaseItemGroup.extend({
    name: 'v-tabs',
    directives: {
        Resize,
        Touch
    },
    mixins: [
        Colorable,
        SSRBootable,
        TabsComputed,
        TabsProps,
        TabsGenerators,
        TabsTouch,
        TabsWatchers,
        Themeable
    ],
    provide() {
        return {
            tabGroup: this,
            tabProxy: this.tabProxy,
            registerItems: this.registerItems,
            unregisterItems: this.unregisterItems
        };
    },
    data() {
        return {
            bar: [],
            content: [],
            isOverflowing: false,
            nextIconVisible: false,
            prevIconVisible: false,
            resizeTimeout: null,
            scrollOffset: 0,
            sliderWidth: null,
            sliderLeft: null,
            startX: 0,
            tabItems: null,
            transitionTime: 300,
            widths: {
                bar: 0,
                container: 0,
                wrapper: 0
            }
        };
    },
    watch: {
        items: 'onResize',
        tabs: 'onResize'
    },
    methods: {
        checkIcons() {
            this.prevIconVisible = this.checkPrevIcon();
            this.nextIconVisible = this.checkNextIcon();
        },
        checkPrevIcon() {
            return this.scrollOffset > 0;
        },
        checkNextIcon() {
            // Check one scroll ahead to know the width of right-most item
            return this.widths.container > this.scrollOffset + this.widths.wrapper;
        },
        callSlider() {
            if (this.hideSlider || !this.activeTab)
                return false;
            // Give screen time to paint
            const activeTab = this.activeTab;
            this.$nextTick(() => {
                /* istanbul ignore if */
                if (!activeTab || !activeTab.$el)
                    return;
                this.sliderWidth = activeTab.$el.scrollWidth;
                this.sliderLeft = activeTab.$el.offsetLeft;
            });
        },
        // Do not process
        // until DOM is
        // painted
        init() {
            BaseItemGroup.options.methods.init.call(this);
            /* istanbul ignore next */
            if (this.$listeners['input']) {
                deprecate('@input', '@change', this);
            }
            this.updateTabsView();
        },
        /**
         * When v-navigation-drawer changes the
         * width of the container, call resize
         * after the transition is complete
         */
        onResize() {
            if (this._isDestroyed)
                return;
            this.setWidths();
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.updateTabsView, this.transitionTime);
        },
        overflowCheck(e, fn) {
            this.isOverflowing && fn(e);
        },
        scrollTo(direction) {
            this.scrollOffset = this.newOffset(direction);
        },
        setOverflow() {
            this.isOverflowing = this.widths.bar < this.widths.container;
        },
        setWidths() {
            const bar = this.$refs.bar ? this.$refs.bar.clientWidth : 0;
            const container = this.$refs.container ? this.$refs.container.clientWidth : 0;
            const wrapper = this.$refs.wrapper ? this.$refs.wrapper.clientWidth : 0;
            this.widths = { bar, container, wrapper };
            this.setOverflow();
        },
        parseNodes() {
            const item = [];
            const items = [];
            const slider = [];
            const tab = [];
            const length = (this.$slots.default || []).length;
            for (let i = 0; i < length; i++) {
                const vnode = this.$slots.default[i];
                if (vnode.componentOptions) {
                    switch (vnode.componentOptions.Ctor.options.name) {
                        case 'v-tabs-slider':
                            slider.push(vnode);
                            break;
                        case 'v-tabs-items':
                            items.push(vnode);
                            break;
                        case 'v-tab-item':
                            item.push(vnode);
                            break;
                        // case 'v-tab' - intentionally omitted
                        default: tab.push(vnode);
                    }
                }
                else {
                    tab.push(vnode);
                }
            }
            return { tab, slider, items, item };
        },
        registerItems(fn) {
            this.tabItems = fn;
            fn(this.internalValue);
        },
        unregisterItems() {
            this.tabItems = null;
        },
        updateTabsView() {
            this.callSlider();
            this.scrollIntoView();
            this.checkIcons();
        },
        scrollIntoView() {
            /* istanbul ignore next */
            if (!this.activeTab)
                return;
            if (!this.isOverflowing)
                return (this.scrollOffset = 0);
            const totalWidth = this.widths.wrapper + this.scrollOffset;
            const { clientWidth, offsetLeft } = this.activeTab.$el;
            const itemOffset = clientWidth + offsetLeft;
            let additionalOffset = clientWidth * 0.3;
            if (this.activeTab === this.items[this.items.length - 1]) {
                additionalOffset = 0; // don't add an offset if selecting the last tab
            }
            /* istanbul ignore else */
            if (offsetLeft < this.scrollOffset) {
                this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0);
            }
            else if (totalWidth < itemOffset) {
                this.scrollOffset -= totalWidth - itemOffset - additionalOffset;
            }
        },
        tabProxy(val) {
            this.internalValue = val;
        }
    },
    render(h) {
        const { tab, slider, items, item } = this.parseNodes();
        return h('div', {
            staticClass: 'v-tabs',
            directives: [{
                    name: 'resize',
                    modifiers: { quiet: true },
                    value: this.onResize
                }]
        }, [
            this.genBar([this.hideSlider ? null : this.genSlider(slider), tab]),
            h(ThemeProvider, {
                props: { dark: this.theme.isDark, light: !this.theme.isDark }
            }, [
                this.genItems(items, item)
            ])
        ]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRhYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVGFicy9WVGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxvQ0FBb0MsQ0FBQTtBQUUzQyxhQUFhO0FBQ2IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBRXhELHlCQUF5QjtBQUN6QixPQUFPLFlBQVksTUFBTSx3QkFBd0IsQ0FBQTtBQUNqRCxPQUFPLGNBQWMsTUFBTSwwQkFBMEIsQ0FBQTtBQUNyRCxPQUFPLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQTtBQUMzQyxPQUFPLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQTtBQUMzQyxPQUFPLFlBQVksTUFBTSx3QkFBd0IsQ0FBQTtBQUVqRCxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFDOUMsT0FBTyxXQUFXLE1BQU0sMkJBQTJCLENBQUE7QUFDbkQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFFOUMsYUFBYTtBQUNiLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBQzVDLE9BQU8sS0FBSyxNQUFNLHdCQUF3QixDQUFBO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU5QyxRQUFRO0FBQ1IsT0FBTyxhQUFhLE1BQU0sMEJBQTBCLENBQUE7QUFFcEQsb0JBQW9CO0FBQ3BCLGVBQWUsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxJQUFJLEVBQUUsUUFBUTtJQUVkLFVBQVUsRUFBRTtRQUNWLE1BQU07UUFDTixLQUFLO0tBQ047SUFFRCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsV0FBVztRQUNYLFlBQVk7UUFDWixTQUFTO1FBQ1QsY0FBYztRQUNkLFNBQVM7UUFDVCxZQUFZO1FBQ1osU0FBUztLQUNWO0lBRUQsT0FBTztRQUNMLE9BQU87WUFDTCxRQUFRLEVBQUUsSUFB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O0lBRUQsTUFBTSxDQUFFLENBQUM7UUFDUCxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBRXRELE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFVBQVUsRUFBRSxDQUFDO29CQUNYLElBQUksRUFBRSxRQUFRO29CQUNkLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDckIsQ0FBQztTQUNILEVBQUU7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxhQUFhLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2FBQzlELEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO2FBQzNCLENBQUM7U0FDSCxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL190YWJzLnN0eWwnXG5cbi8vIEV4dGVuc2lvbnNcbmltcG9ydCB7IEJhc2VJdGVtR3JvdXAgfSBmcm9tICcuLi9WSXRlbUdyb3VwL1ZJdGVtR3JvdXAnXG5cbi8vIENvbXBvbmVudCBsZXZlbCBtaXhpbnNcbmltcG9ydCBUYWJzQ29tcHV0ZWQgZnJvbSAnLi9taXhpbnMvdGFicy1jb21wdXRlZCdcbmltcG9ydCBUYWJzR2VuZXJhdG9ycyBmcm9tICcuL21peGlucy90YWJzLWdlbmVyYXRvcnMnXG5pbXBvcnQgVGFic1Byb3BzIGZyb20gJy4vbWl4aW5zL3RhYnMtcHJvcHMnXG5pbXBvcnQgVGFic1RvdWNoIGZyb20gJy4vbWl4aW5zL3RhYnMtdG91Y2gnXG5pbXBvcnQgVGFic1dhdGNoZXJzIGZyb20gJy4vbWl4aW5zL3RhYnMtd2F0Y2hlcnMnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFNTUkJvb3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9zc3ItYm9vdGFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBSZXNpemUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUnXG5pbXBvcnQgVG91Y2ggZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaCdcbmltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLy8gVXRpbHNcbmltcG9ydCBUaGVtZVByb3ZpZGVyIGZyb20gJy4uLy4uL3V0aWwvVGhlbWVQcm92aWRlcidcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IEJhc2VJdGVtR3JvdXAuZXh0ZW5kKHtcbiAgbmFtZTogJ3YtdGFicycsXG5cbiAgZGlyZWN0aXZlczoge1xuICAgIFJlc2l6ZSxcbiAgICBUb3VjaFxuICB9LFxuXG4gIG1peGluczogW1xuICAgIENvbG9yYWJsZSxcbiAgICBTU1JCb290YWJsZSxcbiAgICBUYWJzQ29tcHV0ZWQsXG4gICAgVGFic1Byb3BzLFxuICAgIFRhYnNHZW5lcmF0b3JzLFxuICAgIFRhYnNUb3VjaCxcbiAgICBUYWJzV2F0Y2hlcnMsXG4gICAgVGhlbWVhYmxlXG4gIF0sXG5cbiAgcHJvdmlkZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYkdyb3VwOiB0aGlzLFxuICAgICAgdGFiUHJveHk6IHRoaXMudGFiUHJveHksXG4gICAgICByZWdpc3Rlckl0ZW1zOiB0aGlzLnJlZ2lzdGVySXRlbXMsXG4gICAgICB1bnJlZ2lzdGVySXRlbXM6IHRoaXMudW5yZWdpc3Rlckl0ZW1zXG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYXI6IFtdLFxuICAgICAgY29udGVudDogW10sXG4gICAgICBpc092ZXJmbG93aW5nOiBmYWxzZSxcbiAgICAgIG5leHRJY29uVmlzaWJsZTogZmFsc2UsXG4gICAgICBwcmV2SWNvblZpc2libGU6IGZhbHNlLFxuICAgICAgcmVzaXplVGltZW91dDogbnVsbCxcbiAgICAgIHNjcm9sbE9mZnNldDogMCxcbiAgICAgIHNsaWRlcldpZHRoOiBudWxsLFxuICAgICAgc2xpZGVyTGVmdDogbnVsbCxcbiAgICAgIHN0YXJ0WDogMCxcbiAgICAgIHRhYkl0ZW1zOiBudWxsLFxuICAgICAgdHJhbnNpdGlvblRpbWU6IDMwMCxcbiAgICAgIHdpZHRoczoge1xuICAgICAgICBiYXI6IDAsXG4gICAgICAgIGNvbnRhaW5lcjogMCxcbiAgICAgICAgd3JhcHBlcjogMFxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGl0ZW1zOiAnb25SZXNpemUnLFxuICAgIHRhYnM6ICdvblJlc2l6ZSdcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgY2hlY2tJY29ucyAoKSB7XG4gICAgICB0aGlzLnByZXZJY29uVmlzaWJsZSA9IHRoaXMuY2hlY2tQcmV2SWNvbigpXG4gICAgICB0aGlzLm5leHRJY29uVmlzaWJsZSA9IHRoaXMuY2hlY2tOZXh0SWNvbigpXG4gICAgfSxcbiAgICBjaGVja1ByZXZJY29uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNjcm9sbE9mZnNldCA+IDBcbiAgICB9LFxuICAgIGNoZWNrTmV4dEljb24gKCkge1xuICAgICAgLy8gQ2hlY2sgb25lIHNjcm9sbCBhaGVhZCB0byBrbm93IHRoZSB3aWR0aCBvZiByaWdodC1tb3N0IGl0ZW1cbiAgICAgIHJldHVybiB0aGlzLndpZHRocy5jb250YWluZXIgPiB0aGlzLnNjcm9sbE9mZnNldCArIHRoaXMud2lkdGhzLndyYXBwZXJcbiAgICB9LFxuICAgIGNhbGxTbGlkZXIgKCkge1xuICAgICAgaWYgKHRoaXMuaGlkZVNsaWRlciB8fCAhdGhpcy5hY3RpdmVUYWIpIHJldHVybiBmYWxzZVxuXG4gICAgICAvLyBHaXZlIHNjcmVlbiB0aW1lIHRvIHBhaW50XG4gICAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmFjdGl2ZVRhYlxuXG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIWFjdGl2ZVRhYiB8fCAhYWN0aXZlVGFiLiRlbCkgcmV0dXJuXG4gICAgICAgIHRoaXMuc2xpZGVyV2lkdGggPSBhY3RpdmVUYWIuJGVsLnNjcm9sbFdpZHRoXG4gICAgICAgIHRoaXMuc2xpZGVyTGVmdCA9IGFjdGl2ZVRhYi4kZWwub2Zmc2V0TGVmdFxuICAgICAgfSlcbiAgICB9LFxuICAgIC8vIERvIG5vdCBwcm9jZXNzXG4gICAgLy8gdW50aWwgRE9NIGlzXG4gICAgLy8gcGFpbnRlZFxuICAgIGluaXQgKCkge1xuICAgICAgQmFzZUl0ZW1Hcm91cC5vcHRpb25zLm1ldGhvZHMuaW5pdC5jYWxsKHRoaXMpXG5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAodGhpcy4kbGlzdGVuZXJzWydpbnB1dCddKSB7XG4gICAgICAgIGRlcHJlY2F0ZSgnQGlucHV0JywgJ0BjaGFuZ2UnLCB0aGlzKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnVwZGF0ZVRhYnNWaWV3KClcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFdoZW4gdi1uYXZpZ2F0aW9uLWRyYXdlciBjaGFuZ2VzIHRoZVxuICAgICAqIHdpZHRoIG9mIHRoZSBjb250YWluZXIsIGNhbGwgcmVzaXplXG4gICAgICogYWZ0ZXIgdGhlIHRyYW5zaXRpb24gaXMgY29tcGxldGVcbiAgICAgKi9cbiAgICBvblJlc2l6ZSAoKSB7XG4gICAgICBpZiAodGhpcy5faXNEZXN0cm95ZWQpIHJldHVyblxuXG4gICAgICB0aGlzLnNldFdpZHRocygpXG5cbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpXG4gICAgICB0aGlzLnJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMudXBkYXRlVGFic1ZpZXcsIHRoaXMudHJhbnNpdGlvblRpbWUpXG4gICAgfSxcbiAgICBvdmVyZmxvd0NoZWNrIChlLCBmbikge1xuICAgICAgdGhpcy5pc092ZXJmbG93aW5nICYmIGZuKGUpXG4gICAgfSxcbiAgICBzY3JvbGxUbyAoZGlyZWN0aW9uKSB7XG4gICAgICB0aGlzLnNjcm9sbE9mZnNldCA9IHRoaXMubmV3T2Zmc2V0KGRpcmVjdGlvbilcbiAgICB9LFxuICAgIHNldE92ZXJmbG93ICgpIHtcbiAgICAgIHRoaXMuaXNPdmVyZmxvd2luZyA9IHRoaXMud2lkdGhzLmJhciA8IHRoaXMud2lkdGhzLmNvbnRhaW5lclxuICAgIH0sXG4gICAgc2V0V2lkdGhzICgpIHtcbiAgICAgIGNvbnN0IGJhciA9IHRoaXMuJHJlZnMuYmFyID8gdGhpcy4kcmVmcy5iYXIuY2xpZW50V2lkdGggOiAwXG4gICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLiRyZWZzLmNvbnRhaW5lciA/IHRoaXMuJHJlZnMuY29udGFpbmVyLmNsaWVudFdpZHRoIDogMFxuICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuJHJlZnMud3JhcHBlciA/IHRoaXMuJHJlZnMud3JhcHBlci5jbGllbnRXaWR0aCA6IDBcblxuICAgICAgdGhpcy53aWR0aHMgPSB7IGJhciwgY29udGFpbmVyLCB3cmFwcGVyIH1cblxuICAgICAgdGhpcy5zZXRPdmVyZmxvdygpXG4gICAgfSxcbiAgICBwYXJzZU5vZGVzICgpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBbXVxuICAgICAgY29uc3QgaXRlbXMgPSBbXVxuICAgICAgY29uc3Qgc2xpZGVyID0gW11cbiAgICAgIGNvbnN0IHRhYiA9IFtdXG4gICAgICBjb25zdCBsZW5ndGggPSAodGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXSkubGVuZ3RoXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgdm5vZGUgPSB0aGlzLiRzbG90cy5kZWZhdWx0W2ldXG5cbiAgICAgICAgaWYgKHZub2RlLmNvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgICAgICBzd2l0Y2ggKHZub2RlLmNvbXBvbmVudE9wdGlvbnMuQ3Rvci5vcHRpb25zLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3YtdGFicy1zbGlkZXInOiBzbGlkZXIucHVzaCh2bm9kZSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3YtdGFicy1pdGVtcyc6IGl0ZW1zLnB1c2godm5vZGUpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICd2LXRhYi1pdGVtJzogaXRlbS5wdXNoKHZub2RlKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgLy8gY2FzZSAndi10YWInIC0gaW50ZW50aW9uYWxseSBvbWl0dGVkXG4gICAgICAgICAgICBkZWZhdWx0OiB0YWIucHVzaCh2bm9kZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFiLnB1c2godm5vZGUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgdGFiLCBzbGlkZXIsIGl0ZW1zLCBpdGVtIH1cbiAgICB9LFxuICAgIHJlZ2lzdGVySXRlbXMgKGZuKSB7XG4gICAgICB0aGlzLnRhYkl0ZW1zID0gZm5cbiAgICAgIGZuKHRoaXMuaW50ZXJuYWxWYWx1ZSlcbiAgICB9LFxuICAgIHVucmVnaXN0ZXJJdGVtcyAoKSB7XG4gICAgICB0aGlzLnRhYkl0ZW1zID0gbnVsbFxuICAgIH0sXG4gICAgdXBkYXRlVGFic1ZpZXcgKCkge1xuICAgICAgdGhpcy5jYWxsU2xpZGVyKClcbiAgICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKVxuICAgICAgdGhpcy5jaGVja0ljb25zKClcbiAgICB9LFxuICAgIHNjcm9sbEludG9WaWV3ICgpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoIXRoaXMuYWN0aXZlVGFiKSByZXR1cm5cbiAgICAgIGlmICghdGhpcy5pc092ZXJmbG93aW5nKSByZXR1cm4gKHRoaXMuc2Nyb2xsT2Zmc2V0ID0gMClcblxuICAgICAgY29uc3QgdG90YWxXaWR0aCA9IHRoaXMud2lkdGhzLndyYXBwZXIgKyB0aGlzLnNjcm9sbE9mZnNldFxuICAgICAgY29uc3QgeyBjbGllbnRXaWR0aCwgb2Zmc2V0TGVmdCB9ID0gdGhpcy5hY3RpdmVUYWIuJGVsXG4gICAgICBjb25zdCBpdGVtT2Zmc2V0ID0gY2xpZW50V2lkdGggKyBvZmZzZXRMZWZ0XG4gICAgICBsZXQgYWRkaXRpb25hbE9mZnNldCA9IGNsaWVudFdpZHRoICogMC4zXG5cbiAgICAgIGlmICh0aGlzLmFjdGl2ZVRhYiA9PT0gdGhpcy5pdGVtc1t0aGlzLml0ZW1zLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIGFkZGl0aW9uYWxPZmZzZXQgPSAwIC8vIGRvbid0IGFkZCBhbiBvZmZzZXQgaWYgc2VsZWN0aW5nIHRoZSBsYXN0IHRhYlxuICAgICAgfVxuXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKG9mZnNldExlZnQgPCB0aGlzLnNjcm9sbE9mZnNldCkge1xuICAgICAgICB0aGlzLnNjcm9sbE9mZnNldCA9IE1hdGgubWF4KG9mZnNldExlZnQgLSBhZGRpdGlvbmFsT2Zmc2V0LCAwKVxuICAgICAgfSBlbHNlIGlmICh0b3RhbFdpZHRoIDwgaXRlbU9mZnNldCkge1xuICAgICAgICB0aGlzLnNjcm9sbE9mZnNldCAtPSB0b3RhbFdpZHRoIC0gaXRlbU9mZnNldCAtIGFkZGl0aW9uYWxPZmZzZXRcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhYlByb3h5ICh2YWwpIHtcbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHZhbFxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCB7IHRhYiwgc2xpZGVyLCBpdGVtcywgaXRlbSB9ID0gdGhpcy5wYXJzZU5vZGVzKClcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtdGFicycsXG4gICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICBuYW1lOiAncmVzaXplJyxcbiAgICAgICAgbW9kaWZpZXJzOiB7IHF1aWV0OiB0cnVlIH0sXG4gICAgICAgIHZhbHVlOiB0aGlzLm9uUmVzaXplXG4gICAgICB9XVxuICAgIH0sIFtcbiAgICAgIHRoaXMuZ2VuQmFyKFt0aGlzLmhpZGVTbGlkZXIgPyBudWxsIDogdGhpcy5nZW5TbGlkZXIoc2xpZGVyKSwgdGFiXSksXG4gICAgICBoKFRoZW1lUHJvdmlkZXIsIHtcbiAgICAgICAgcHJvcHM6IHsgZGFyazogdGhpcy50aGVtZS5pc0RhcmssIGxpZ2h0OiAhdGhpcy50aGVtZS5pc0RhcmsgfVxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlbkl0ZW1zKGl0ZW1zLCBpdGVtKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG59KVxuIl19