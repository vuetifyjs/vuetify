// Styles
import '../../stylus/components/_tabs.styl';
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
import { provide as RegistrableProvide } from '../../mixins/registrable';
// Directives
import Resize from '../../directives/resize';
import Touch from '../../directives/touch';
/* @vue/component */
export default {
    name: 'v-tabs',
    directives: {
        Resize,
        Touch
    },
    mixins: [
        RegistrableProvide('tabs'),
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
            tabClick: this.tabClick,
            tabProxy: this.tabProxy,
            registerItems: this.registerItems,
            unregisterItems: this.unregisterItems
        };
    },
    data() {
        return {
            bar: [],
            content: [],
            isBooted: false,
            isOverflowing: false,
            lazyValue: this.value,
            nextIconVisible: false,
            prevIconVisible: false,
            resizeTimeout: null,
            reverse: false,
            scrollOffset: 0,
            sliderWidth: null,
            sliderLeft: null,
            startX: 0,
            tabsContainer: null,
            tabs: [],
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
        tabs: 'onResize'
    },
    mounted() {
        this.checkIcons();
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
            const action = (this.activeTab || {}).action;
            const activeTab = action === this.activeTab
                ? this.activeTab
                : this.tabs.find(tab => tab.action === action);
            this.$nextTick(() => {
                if (!activeTab || !activeTab.$el)
                    return;
                this.sliderWidth = activeTab.$el.scrollWidth;
                this.sliderLeft = activeTab.$el.offsetLeft;
            });
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
            this.resizeTimeout = setTimeout(() => {
                this.callSlider();
                this.scrollIntoView();
                this.checkIcons();
            }, this.transitionTime);
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
        findActiveLink() {
            if (!this.tabs.length)
                return;
            const activeIndex = this.tabs.findIndex((tabItem, index) => {
                const id = tabItem.action === tabItem ? index : tabItem.action;
                return id === this.lazyValue ||
                    tabItem.$el.firstChild.className.indexOf(this.activeClass) > -1;
            });
            const index = activeIndex > -1 ? activeIndex : 0;
            const tab = this.tabs[index];
            /* istanbul ignore next */
            // There is not a reliable way to test
            this.inputValue = tab.action === tab ? index : tab.action;
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
        register(options) {
            this.tabs.push(options);
        },
        scrollIntoView() {
            if (!this.activeTab)
                return;
            if (!this.isOverflowing)
                return (this.scrollOffset = 0);
            const totalWidth = this.widths.wrapper + this.scrollOffset;
            const { clientWidth, offsetLeft } = this.activeTab.$el;
            const itemOffset = clientWidth + offsetLeft;
            let additionalOffset = clientWidth * 0.3;
            if (this.activeIndex === this.tabs.length - 1) {
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
        tabClick(tab) {
            this.inputValue = tab.action === tab ? this.tabs.indexOf(tab) : tab.action;
            this.scrollIntoView();
        },
        tabProxy(val) {
            this.inputValue = val;
        },
        registerItems(fn) {
            this.tabItems = fn;
        },
        unregisterItems() {
            this.tabItems = null;
        },
        unregister(tab) {
            this.tabs = this.tabs.filter(o => o !== tab);
        },
        updateTabs() {
            for (let index = this.tabs.length; --index >= 0;) {
                this.tabs[index].toggle(this.target);
            }
            this.setOverflow();
        }
    },
    render(h) {
        const { tab, slider, items, item } = this.parseNodes();
        return h('div', {
            staticClass: 'v-tabs',
            directives: [{
                    name: 'resize',
                    arg: 400,
                    modifiers: { quiet: true },
                    value: this.onResize
                }]
        }, [
            this.genBar([this.hideSlider ? null : this.genSlider(slider), tab]),
            this.genItems(items, item)
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRhYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVGFicy9WVGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxvQ0FBb0MsQ0FBQTtBQUUzQyx5QkFBeUI7QUFDekIsT0FBTyxZQUFZLE1BQU0sd0JBQXdCLENBQUE7QUFDakQsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUE7QUFDckQsT0FBTyxTQUFTLE1BQU0scUJBQXFCLENBQUE7QUFDM0MsT0FBTyxTQUFTLE1BQU0scUJBQXFCLENBQUE7QUFDM0MsT0FBTyxZQUFZLE1BQU0sd0JBQXdCLENBQUE7QUFFakQsU0FBUztBQUNULE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sV0FBVyxNQUFNLDJCQUEyQixDQUFBO0FBQ25ELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sRUFDTCxPQUFPLElBQUksa0JBQWtCLEVBQzlCLE1BQU0sMEJBQTBCLENBQUE7QUFFakMsYUFBYTtBQUNiLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBQzVDLE9BQU8sS0FBSyxNQUFNLHdCQUF3QixDQUFBO0FBRTFDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFFBQVE7SUFFZCxVQUFVLEVBQUU7UUFDVixNQUFNO1FBQ04sS0FBSztLQUNOO0lBRUQsTUFBTSxFQUFFO1FBQ04sa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQzFCLFNBQVM7UUFDVCxXQUFXO1FBQ1gsWUFBWTtRQUNaLFNBQVM7UUFDVCxjQUFjO1FBQ2QsU0FBUztRQUNULFlBQVk7UUFDWixTQUFTO0tBQ1Y7SUFFRCxPQUFPO1FBQ0wsT0FBTztZQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lB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cy9jb21wb25lbnRzL190YWJzLnN0eWwnXG5cbi8vIENvbXBvbmVudCBsZXZlbCBtaXhpbnNcbmltcG9ydCBUYWJzQ29tcHV0ZWQgZnJvbSAnLi9taXhpbnMvdGFicy1jb21wdXRlZCdcbmltcG9ydCBUYWJzR2VuZXJhdG9ycyBmcm9tICcuL21peGlucy90YWJzLWdlbmVyYXRvcnMnXG5pbXBvcnQgVGFic1Byb3BzIGZyb20gJy4vbWl4aW5zL3RhYnMtcHJvcHMnXG5pbXBvcnQgVGFic1RvdWNoIGZyb20gJy4vbWl4aW5zL3RhYnMtdG91Y2gnXG5pbXBvcnQgVGFic1dhdGNoZXJzIGZyb20gJy4vbWl4aW5zL3RhYnMtd2F0Y2hlcnMnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFNTUkJvb3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9zc3ItYm9vdGFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4uLy4uL21peGlucy90aGVtZWFibGUnXG5pbXBvcnQge1xuICBwcm92aWRlIGFzIFJlZ2lzdHJhYmxlUHJvdmlkZVxufSBmcm9tICcuLi8uLi9taXhpbnMvcmVnaXN0cmFibGUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBSZXNpemUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUnXG5pbXBvcnQgVG91Y2ggZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaCdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtdGFicycsXG5cbiAgZGlyZWN0aXZlczoge1xuICAgIFJlc2l6ZSxcbiAgICBUb3VjaFxuICB9LFxuXG4gIG1peGluczogW1xuICAgIFJlZ2lzdHJhYmxlUHJvdmlkZSgndGFicycpLFxuICAgIENvbG9yYWJsZSxcbiAgICBTU1JCb290YWJsZSxcbiAgICBUYWJzQ29tcHV0ZWQsXG4gICAgVGFic1Byb3BzLFxuICAgIFRhYnNHZW5lcmF0b3JzLFxuICAgIFRhYnNUb3VjaCxcbiAgICBUYWJzV2F0Y2hlcnMsXG4gICAgVGhlbWVhYmxlXG4gIF0sXG5cbiAgcHJvdmlkZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYkNsaWNrOiB0aGlzLnRhYkNsaWNrLFxuICAgICAgdGFiUHJveHk6IHRoaXMudGFiUHJveHksXG4gICAgICByZWdpc3Rlckl0ZW1zOiB0aGlzLnJlZ2lzdGVySXRlbXMsXG4gICAgICB1bnJlZ2lzdGVySXRlbXM6IHRoaXMudW5yZWdpc3Rlckl0ZW1zXG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYXI6IFtdLFxuICAgICAgY29udGVudDogW10sXG4gICAgICBpc0Jvb3RlZDogZmFsc2UsXG4gICAgICBpc092ZXJmbG93aW5nOiBmYWxzZSxcbiAgICAgIGxhenlWYWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIG5leHRJY29uVmlzaWJsZTogZmFsc2UsXG4gICAgICBwcmV2SWNvblZpc2libGU6IGZhbHNlLFxuICAgICAgcmVzaXplVGltZW91dDogbnVsbCxcbiAgICAgIHJldmVyc2U6IGZhbHNlLFxuICAgICAgc2Nyb2xsT2Zmc2V0OiAwLFxuICAgICAgc2xpZGVyV2lkdGg6IG51bGwsXG4gICAgICBzbGlkZXJMZWZ0OiBudWxsLFxuICAgICAgc3RhcnRYOiAwLFxuICAgICAgdGFic0NvbnRhaW5lcjogbnVsbCxcbiAgICAgIHRhYnM6IFtdLFxuICAgICAgdGFiSXRlbXM6IG51bGwsXG4gICAgICB0cmFuc2l0aW9uVGltZTogMzAwLFxuICAgICAgd2lkdGhzOiB7XG4gICAgICAgIGJhcjogMCxcbiAgICAgICAgY29udGFpbmVyOiAwLFxuICAgICAgICB3cmFwcGVyOiAwXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgdGFiczogJ29uUmVzaXplJ1xuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMuY2hlY2tJY29ucygpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGNoZWNrSWNvbnMgKCkge1xuICAgICAgdGhpcy5wcmV2SWNvblZpc2libGUgPSB0aGlzLmNoZWNrUHJldkljb24oKVxuICAgICAgdGhpcy5uZXh0SWNvblZpc2libGUgPSB0aGlzLmNoZWNrTmV4dEljb24oKVxuICAgIH0sXG4gICAgY2hlY2tQcmV2SWNvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY3JvbGxPZmZzZXQgPiAwXG4gICAgfSxcbiAgICBjaGVja05leHRJY29uICgpIHtcbiAgICAgIC8vIENoZWNrIG9uZSBzY3JvbGwgYWhlYWQgdG8ga25vdyB0aGUgd2lkdGggb2YgcmlnaHQtbW9zdCBpdGVtXG4gICAgICByZXR1cm4gdGhpcy53aWR0aHMuY29udGFpbmVyID4gdGhpcy5zY3JvbGxPZmZzZXQgKyB0aGlzLndpZHRocy53cmFwcGVyXG4gICAgfSxcbiAgICBjYWxsU2xpZGVyICgpIHtcbiAgICAgIGlmICh0aGlzLmhpZGVTbGlkZXIgfHwgIXRoaXMuYWN0aXZlVGFiKSByZXR1cm4gZmFsc2VcblxuICAgICAgLy8gR2l2ZSBzY3JlZW4gdGltZSB0byBwYWludFxuICAgICAgY29uc3QgYWN0aW9uID0gKHRoaXMuYWN0aXZlVGFiIHx8IHt9KS5hY3Rpb25cbiAgICAgIGNvbnN0IGFjdGl2ZVRhYiA9IGFjdGlvbiA9PT0gdGhpcy5hY3RpdmVUYWJcbiAgICAgICAgPyB0aGlzLmFjdGl2ZVRhYlxuICAgICAgICA6IHRoaXMudGFicy5maW5kKHRhYiA9PiB0YWIuYWN0aW9uID09PSBhY3Rpb24pXG5cbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKCFhY3RpdmVUYWIgfHwgIWFjdGl2ZVRhYi4kZWwpIHJldHVyblxuICAgICAgICB0aGlzLnNsaWRlcldpZHRoID0gYWN0aXZlVGFiLiRlbC5zY3JvbGxXaWR0aFxuICAgICAgICB0aGlzLnNsaWRlckxlZnQgPSBhY3RpdmVUYWIuJGVsLm9mZnNldExlZnRcbiAgICAgIH0pXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBXaGVuIHYtbmF2aWdhdGlvbi1kcmF3ZXIgY2hhbmdlcyB0aGVcbiAgICAgKiB3aWR0aCBvZiB0aGUgY29udGFpbmVyLCBjYWxsIHJlc2l6ZVxuICAgICAqIGFmdGVyIHRoZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlXG4gICAgICovXG4gICAgb25SZXNpemUgKCkge1xuICAgICAgaWYgKHRoaXMuX2lzRGVzdHJveWVkKSByZXR1cm5cblxuICAgICAgdGhpcy5zZXRXaWR0aHMoKVxuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lb3V0KVxuICAgICAgdGhpcy5yZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2FsbFNsaWRlcigpXG4gICAgICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKVxuICAgICAgICB0aGlzLmNoZWNrSWNvbnMoKVxuICAgICAgfSwgdGhpcy50cmFuc2l0aW9uVGltZSlcbiAgICB9LFxuICAgIG92ZXJmbG93Q2hlY2sgKGUsIGZuKSB7XG4gICAgICB0aGlzLmlzT3ZlcmZsb3dpbmcgJiYgZm4oZSlcbiAgICB9LFxuICAgIHNjcm9sbFRvIChkaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2Nyb2xsT2Zmc2V0ID0gdGhpcy5uZXdPZmZzZXQoZGlyZWN0aW9uKVxuICAgIH0sXG4gICAgc2V0T3ZlcmZsb3cgKCkge1xuICAgICAgdGhpcy5pc092ZXJmbG93aW5nID0gdGhpcy53aWR0aHMuYmFyIDwgdGhpcy53aWR0aHMuY29udGFpbmVyXG4gICAgfSxcbiAgICBzZXRXaWR0aHMgKCkge1xuICAgICAgY29uc3QgYmFyID0gdGhpcy4kcmVmcy5iYXIgPyB0aGlzLiRyZWZzLmJhci5jbGllbnRXaWR0aCA6IDBcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuJHJlZnMuY29udGFpbmVyID8gdGhpcy4kcmVmcy5jb250YWluZXIuY2xpZW50V2lkdGggOiAwXG4gICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy4kcmVmcy53cmFwcGVyID8gdGhpcy4kcmVmcy53cmFwcGVyLmNsaWVudFdpZHRoIDogMFxuXG4gICAgICB0aGlzLndpZHRocyA9IHsgYmFyLCBjb250YWluZXIsIHdyYXBwZXIgfVxuXG4gICAgICB0aGlzLnNldE92ZXJmbG93KClcbiAgICB9LFxuICAgIGZpbmRBY3RpdmVMaW5rICgpIHtcbiAgICAgIGlmICghdGhpcy50YWJzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gdGhpcy50YWJzLmZpbmRJbmRleCgodGFiSXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSB0YWJJdGVtLmFjdGlvbiA9PT0gdGFiSXRlbSA/IGluZGV4IDogdGFiSXRlbS5hY3Rpb25cbiAgICAgICAgcmV0dXJuIGlkID09PSB0aGlzLmxhenlWYWx1ZSB8fFxuICAgICAgICAgIHRhYkl0ZW0uJGVsLmZpcnN0Q2hpbGQuY2xhc3NOYW1lLmluZGV4T2YodGhpcy5hY3RpdmVDbGFzcykgPiAtMVxuICAgICAgfSlcblxuICAgICAgY29uc3QgaW5kZXggPSBhY3RpdmVJbmRleCA+IC0xID8gYWN0aXZlSW5kZXggOiAwXG4gICAgICBjb25zdCB0YWIgPSB0aGlzLnRhYnNbaW5kZXhdXG5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAvLyBUaGVyZSBpcyBub3QgYSByZWxpYWJsZSB3YXkgdG8gdGVzdFxuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdGFiLmFjdGlvbiA9PT0gdGFiID8gaW5kZXggOiB0YWIuYWN0aW9uXG4gICAgfSxcbiAgICBwYXJzZU5vZGVzICgpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBbXVxuICAgICAgY29uc3QgaXRlbXMgPSBbXVxuICAgICAgY29uc3Qgc2xpZGVyID0gW11cbiAgICAgIGNvbnN0IHRhYiA9IFtdXG4gICAgICBjb25zdCBsZW5ndGggPSAodGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXSkubGVuZ3RoXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgdm5vZGUgPSB0aGlzLiRzbG90cy5kZWZhdWx0W2ldXG5cbiAgICAgICAgaWYgKHZub2RlLmNvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgICAgICBzd2l0Y2ggKHZub2RlLmNvbXBvbmVudE9wdGlvbnMuQ3Rvci5vcHRpb25zLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3YtdGFicy1zbGlkZXInOiBzbGlkZXIucHVzaCh2bm9kZSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3YtdGFicy1pdGVtcyc6IGl0ZW1zLnB1c2godm5vZGUpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICd2LXRhYi1pdGVtJzogaXRlbS5wdXNoKHZub2RlKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgLy8gY2FzZSAndi10YWInIC0gaW50ZW50aW9uYWxseSBvbWl0dGVkXG4gICAgICAgICAgICBkZWZhdWx0OiB0YWIucHVzaCh2bm9kZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFiLnB1c2godm5vZGUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgdGFiLCBzbGlkZXIsIGl0ZW1zLCBpdGVtIH1cbiAgICB9LFxuICAgIHJlZ2lzdGVyIChvcHRpb25zKSB7XG4gICAgICB0aGlzLnRhYnMucHVzaChvcHRpb25zKVxuICAgIH0sXG4gICAgc2Nyb2xsSW50b1ZpZXcgKCkge1xuICAgICAgaWYgKCF0aGlzLmFjdGl2ZVRhYikgcmV0dXJuXG4gICAgICBpZiAoIXRoaXMuaXNPdmVyZmxvd2luZykgcmV0dXJuICh0aGlzLnNjcm9sbE9mZnNldCA9IDApXG5cbiAgICAgIGNvbnN0IHRvdGFsV2lkdGggPSB0aGlzLndpZHRocy53cmFwcGVyICsgdGhpcy5zY3JvbGxPZmZzZXRcbiAgICAgIGNvbnN0IHsgY2xpZW50V2lkdGgsIG9mZnNldExlZnQgfSA9IHRoaXMuYWN0aXZlVGFiLiRlbFxuICAgICAgY29uc3QgaXRlbU9mZnNldCA9IGNsaWVudFdpZHRoICsgb2Zmc2V0TGVmdFxuICAgICAgbGV0IGFkZGl0aW9uYWxPZmZzZXQgPSBjbGllbnRXaWR0aCAqIDAuM1xuICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggPT09IHRoaXMudGFicy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGFkZGl0aW9uYWxPZmZzZXQgPSAwIC8vIGRvbid0IGFkZCBhbiBvZmZzZXQgaWYgc2VsZWN0aW5nIHRoZSBsYXN0IHRhYlxuICAgICAgfVxuXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKG9mZnNldExlZnQgPCB0aGlzLnNjcm9sbE9mZnNldCkge1xuICAgICAgICB0aGlzLnNjcm9sbE9mZnNldCA9IE1hdGgubWF4KG9mZnNldExlZnQgLSBhZGRpdGlvbmFsT2Zmc2V0LCAwKVxuICAgICAgfSBlbHNlIGlmICh0b3RhbFdpZHRoIDwgaXRlbU9mZnNldCkge1xuICAgICAgICB0aGlzLnNjcm9sbE9mZnNldCAtPSB0b3RhbFdpZHRoIC0gaXRlbU9mZnNldCAtIGFkZGl0aW9uYWxPZmZzZXRcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhYkNsaWNrICh0YWIpIHtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHRhYi5hY3Rpb24gPT09IHRhYiA/IHRoaXMudGFicy5pbmRleE9mKHRhYikgOiB0YWIuYWN0aW9uXG4gICAgICB0aGlzLnNjcm9sbEludG9WaWV3KClcbiAgICB9LFxuICAgIHRhYlByb3h5ICh2YWwpIHtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbFxuICAgIH0sXG4gICAgcmVnaXN0ZXJJdGVtcyAoZm4pIHtcbiAgICAgIHRoaXMudGFiSXRlbXMgPSBmblxuICAgIH0sXG4gICAgdW5yZWdpc3Rlckl0ZW1zICgpIHtcbiAgICAgIHRoaXMudGFiSXRlbXMgPSBudWxsXG4gICAgfSxcbiAgICB1bnJlZ2lzdGVyICh0YWIpIHtcbiAgICAgIHRoaXMudGFicyA9IHRoaXMudGFicy5maWx0ZXIobyA9PiBvICE9PSB0YWIpXG4gICAgfSxcbiAgICB1cGRhdGVUYWJzICgpIHtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy50YWJzLmxlbmd0aDsgLS1pbmRleCA+PSAwOykge1xuICAgICAgICB0aGlzLnRhYnNbaW5kZXhdLnRvZ2dsZSh0aGlzLnRhcmdldClcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRPdmVyZmxvdygpXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIGNvbnN0IHsgdGFiLCBzbGlkZXIsIGl0ZW1zLCBpdGVtIH0gPSB0aGlzLnBhcnNlTm9kZXMoKVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi10YWJzJyxcbiAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgIG5hbWU6ICdyZXNpemUnLFxuICAgICAgICBhcmc6IDQwMCxcbiAgICAgICAgbW9kaWZpZXJzOiB7IHF1aWV0OiB0cnVlIH0sXG4gICAgICAgIHZhbHVlOiB0aGlzLm9uUmVzaXplXG4gICAgICB9XVxuICAgIH0sIFtcbiAgICAgIHRoaXMuZ2VuQmFyKFt0aGlzLmhpZGVTbGlkZXIgPyBudWxsIDogdGhpcy5nZW5TbGlkZXIoc2xpZGVyKSwgdGFiXSksXG4gICAgICB0aGlzLmdlbkl0ZW1zKGl0ZW1zLCBpdGVtKVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==