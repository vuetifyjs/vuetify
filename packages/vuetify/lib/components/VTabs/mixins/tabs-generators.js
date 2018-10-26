import VTabsItems from '../VTabsItems';
import VTabsSlider from '../VTabsSlider';
import VIcon from '../../VIcon';
/**
 * Tabs generators
 *
 * @mixin
 */
/* @vue/component */
export default {
    methods: {
        genBar: function genBar(items) {
            return this.$createElement('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-tabs__bar',
                'class': this.themeClasses,
                ref: 'bar'
            }), [this.genTransition('prev'), this.genWrapper(this.genContainer(items)), this.genTransition('next')]);
        },
        genContainer: function genContainer(items) {
            return this.$createElement('div', {
                staticClass: 'v-tabs__container',
                class: {
                    'v-tabs__container--align-with-title': this.alignWithTitle,
                    'v-tabs__container--centered': this.centered,
                    'v-tabs__container--fixed-tabs': this.fixedTabs,
                    'v-tabs__container--grow': this.grow,
                    'v-tabs__container--icons-and-text': this.iconsAndText,
                    'v-tabs__container--overflow': this.isOverflowing,
                    'v-tabs__container--right': this.right
                },
                style: this.containerStyles,
                ref: 'container'
            }, items);
        },
        genIcon: function genIcon(direction) {
            var _this = this;

            if (!this.hasArrows || !this[direction + 'IconVisible']) return null;
            return this.$createElement(VIcon, {
                staticClass: 'v-tabs__icon v-tabs__icon--' + direction,
                props: {
                    disabled: !this[direction + 'IconVisible']
                },
                on: {
                    click: function click() {
                        return _this.scrollTo(direction);
                    }
                }
            }, this[direction + 'Icon']);
        },
        genItems: function genItems(items, item) {
            if (items.length > 0) return items;
            if (!item.length) return null;
            return this.$createElement(VTabsItems, item);
        },
        genTransition: function genTransition(direction) {
            return this.$createElement('transition', {
                props: { name: 'fade-transition' }
            }, [this.genIcon(direction)]);
        },
        genWrapper: function genWrapper(items) {
            var _this2 = this;

            return this.$createElement('div', {
                staticClass: 'v-tabs__wrapper',
                class: {
                    'v-tabs__wrapper--show-arrows': this.hasArrows
                },
                ref: 'wrapper',
                directives: [{
                    name: 'touch',
                    value: {
                        start: function start(e) {
                            return _this2.overflowCheck(e, _this2.onTouchStart);
                        },
                        move: function move(e) {
                            return _this2.overflowCheck(e, _this2.onTouchMove);
                        },
                        end: function end(e) {
                            return _this2.overflowCheck(e, _this2.onTouchEnd);
                        }
                    }
                }]
            }, [items]);
        },
        genSlider: function genSlider(items) {
            if (!items.length) {
                items = [this.$createElement(VTabsSlider, {
                    props: { color: this.sliderColor }
                })];
            }
            return this.$createElement('div', {
                staticClass: 'v-tabs__slider-wrapper',
                style: this.sliderStyles
            }, items);
        }
    }
};
//# sourceMappingURL=tabs-generators.js.map