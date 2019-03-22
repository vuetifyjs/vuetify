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
        Resize: Resize,
        Touch: Touch
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
    provide: function () {
        return {
            tabGroup: this,
            tabProxy: this.tabProxy,
            registerItems: this.registerItems,
            unregisterItems: this.unregisterItems
        };
    },
    data: function () {
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
    mounted: function () {
        this.init();
    },
    methods: {
        checkIcons: function () {
            this.prevIconVisible = this.checkPrevIcon();
            this.nextIconVisible = this.checkNextIcon();
        },
        checkPrevIcon: function () {
            return this.scrollOffset > 0;
        },
        checkNextIcon: function () {
            // Check one scroll ahead to know the width of right-most item
            return this.widths.container > this.scrollOffset + this.widths.wrapper;
        },
        callSlider: function () {
            var _this = this;
            if (this.hideSlider || !this.activeTab)
                return false;
            // Give screen time to paint
            var activeTab = this.activeTab;
            this.$nextTick(function () {
                /* istanbul ignore if */
                if (!activeTab || !activeTab.$el)
                    return;
                _this.sliderWidth = activeTab.$el.scrollWidth;
                _this.sliderLeft = activeTab.$el.offsetLeft;
            });
        },
        // Do not process
        // until DOM is
        // painted
        init: function () {
            /* istanbul ignore next */
            if (this.$listeners['input']) {
                deprecate('@input', '@change', this);
            }
        },
        /**
         * When v-navigation-drawer changes the
         * width of the container, call resize
         * after the transition is complete
         */
        onResize: function () {
            if (this._isDestroyed)
                return;
            this.setWidths();
            var delay = this.isBooted ? this.transitionTime : 0;
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.updateTabsView, delay);
        },
        overflowCheck: function (e, fn) {
            this.isOverflowing && fn(e);
        },
        scrollTo: function (direction) {
            this.scrollOffset = this.newOffset(direction);
        },
        setOverflow: function () {
            this.isOverflowing = this.widths.bar < this.widths.container;
        },
        setWidths: function () {
            var bar = this.$refs.bar ? this.$refs.bar.clientWidth : 0;
            var container = this.$refs.container ? this.$refs.container.clientWidth : 0;
            var wrapper = this.$refs.wrapper ? this.$refs.wrapper.clientWidth : 0;
            this.widths = { bar: bar, container: container, wrapper: wrapper };
            this.setOverflow();
        },
        parseNodes: function () {
            var item = [];
            var items = [];
            var slider = [];
            var tab = [];
            var length = (this.$slots.default || []).length;
            for (var i = 0; i < length; i++) {
                var vnode = this.$slots.default[i];
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
            return { tab: tab, slider: slider, items: items, item: item };
        },
        registerItems: function (fn) {
            this.tabItems = fn;
            fn(this.internalValue);
        },
        unregisterItems: function () {
            this.tabItems = null;
        },
        updateTabsView: function () {
            this.callSlider();
            this.scrollIntoView();
            this.checkIcons();
        },
        scrollIntoView: function () {
            /* istanbul ignore next */
            if (!this.activeTab)
                return;
            if (!this.isOverflowing)
                return (this.scrollOffset = 0);
            var totalWidth = this.widths.wrapper + this.scrollOffset;
            var _a = this.activeTab.$el, clientWidth = _a.clientWidth, offsetLeft = _a.offsetLeft;
            var itemOffset = clientWidth + offsetLeft;
            var additionalOffset = clientWidth * 0.3;
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
        tabProxy: function (val) {
            this.internalValue = val;
        }
    },
    render: function (h) {
        var _a = this.parseNodes(), tab = _a.tab, slider = _a.slider, items = _a.items, item = _a.item;
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
//# sourceMappingURL=VTabs.js.map
//# sourceMappingURL=VTabs.js.map