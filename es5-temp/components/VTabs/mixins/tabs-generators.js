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
        genBar(items) {
            return this.$createElement('div', {
                staticClass: 'v-tabs__bar',
                'class': this.addBackgroundColorClassChecks(this.themeClasses),
                ref: 'bar'
            }, [
                this.genTransition('prev'),
                this.genWrapper(this.genContainer(items)),
                this.genTransition('next')
            ]);
        },
        genContainer(items) {
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
        genIcon(direction) {
            if (!this.hasArrows ||
                !this[`${direction}IconVisible`])
                return null;
            return this.$createElement(VIcon, {
                staticClass: `v-tabs__icon v-tabs__icon--${direction}`,
                props: {
                    disabled: !this[`${direction}IconVisible`]
                },
                on: {
                    click: () => this.scrollTo(direction)
                }
            }, this[`${direction}Icon`]);
        },
        genItems(items, item) {
            if (items.length > 0)
                return items;
            if (!item.length)
                return null;
            return this.$createElement(VTabsItems, item);
        },
        genTransition(direction) {
            return this.$createElement('transition', {
                props: { name: 'fade-transition' }
            }, [this.genIcon(direction)]);
        },
        genWrapper(items) {
            return this.$createElement('div', {
                staticClass: 'v-tabs__wrapper',
                class: {
                    'v-tabs__wrapper--show-arrows': this.hasArrows
                },
                ref: 'wrapper',
                directives: [{
                        name: 'touch',
                        value: {
                            start: e => this.overflowCheck(e, this.onTouchStart),
                            move: e => this.overflowCheck(e, this.onTouchMove),
                            end: e => this.overflowCheck(e, this.onTouchEnd)
                        }
                    }]
            }, [items]);
        },
        genSlider(items) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1nZW5lcmF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlRhYnMvbWl4aW5zL3RhYnMtZ2VuZXJhdG9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFDdEMsT0FBTyxXQUFXLE1BQU0sZ0JBQWdCLENBQUE7QUFDeEMsT0FBTyxLQUFLLE1BQU0sYUFBYSxDQUFBO0FBRS9COzs7O0dBSUc7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLE1BQU0sQ0FBRSxLQUFLO1lBQ1gsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLE9BQU8sRUFBRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDOUQsR0FBRyxFQUFFLEtBQUs7YUFDWCxFQUFFO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxDQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQ3pCO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO2FBQzNCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxZQUFZLENBQUUsS0FBSztZQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUsbUJBQW1CO2dCQUNoQyxLQUFLLEVBQUU7b0JBQ0wscUNBQXFDLEVBQUUsSUFBSSxDQUFDLGNBQWM7b0JBQzFELDZCQUE2QixFQUFFLElBQUksQ0FBQyxRQUFRO29CQUM1QywrQkFBK0IsRUFBRSxJQUFJLENBQUMsU0FBUztvQkFDL0MseUJBQXlCLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ3BDLG1DQUFtQyxFQUFFLElBQUksQ0FBQyxZ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LENBQUMsQ0FBQTtRQUNYLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVlRhYnNJdGVtcyBmcm9tICcuLi9WVGFic0l0ZW1zJ1xuaW1wb3J0IFZUYWJzU2xpZGVyIGZyb20gJy4uL1ZUYWJzU2xpZGVyJ1xuaW1wb3J0IFZJY29uIGZyb20gJy4uLy4uL1ZJY29uJ1xuXG4vKipcbiAqIFRhYnMgZ2VuZXJhdG9yc1xuICpcbiAqIEBtaXhpblxuICovXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2RzOiB7XG4gICAgZ2VuQmFyIChpdGVtcykge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRhYnNfX2JhcicsXG4gICAgICAgICdjbGFzcyc6IHRoaXMuYWRkQmFja2dyb3VuZENvbG9yQ2xhc3NDaGVja3ModGhpcy50aGVtZUNsYXNzZXMpLFxuICAgICAgICByZWY6ICdiYXInXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuVHJhbnNpdGlvbigncHJldicpLFxuICAgICAgICB0aGlzLmdlbldyYXBwZXIoXG4gICAgICAgICAgdGhpcy5nZW5Db250YWluZXIoaXRlbXMpXG4gICAgICAgICksXG4gICAgICAgIHRoaXMuZ2VuVHJhbnNpdGlvbignbmV4dCcpXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuQ29udGFpbmVyIChpdGVtcykge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRhYnNfX2NvbnRhaW5lcicsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3YtdGFic19fY29udGFpbmVyLS1hbGlnbi13aXRoLXRpdGxlJzogdGhpcy5hbGlnbldpdGhUaXRsZSxcbiAgICAgICAgICAndi10YWJzX19jb250YWluZXItLWNlbnRlcmVkJzogdGhpcy5jZW50ZXJlZCxcbiAgICAgICAgICAndi10YWJzX19jb250YWluZXItLWZpeGVkLXRhYnMnOiB0aGlzLmZpeGVkVGFicyxcbiAgICAgICAgICAndi10YWJzX19jb250YWluZXItLWdyb3cnOiB0aGlzLmdyb3csXG4gICAgICAgICAgJ3YtdGFic19fY29udGFpbmVyLS1pY29ucy1hbmQtdGV4dCc6IHRoaXMuaWNvbnNBbmRUZXh0LFxuICAgICAgICAgICd2LXRhYnNfX2NvbnRhaW5lci0tb3ZlcmZsb3cnOiB0aGlzLmlzT3ZlcmZsb3dpbmcsXG4gICAgICAgICAgJ3YtdGFic19fY29udGFpbmVyLS1yaWdodCc6IHRoaXMucmlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHRoaXMuY29udGFpbmVyU3R5bGVzLFxuICAgICAgICByZWY6ICdjb250YWluZXInXG4gICAgICB9LCBpdGVtcylcbiAgICB9LFxuICAgIGdlbkljb24gKGRpcmVjdGlvbikge1xuICAgICAgaWYgKCF0aGlzLmhhc0Fycm93cyB8fFxuICAgICAgICAhdGhpc1tgJHtkaXJlY3Rpb259SWNvblZpc2libGVgXVxuICAgICAgKSByZXR1cm4gbnVsbFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwge1xuICAgICAgICBzdGF0aWNDbGFzczogYHYtdGFic19faWNvbiB2LXRhYnNfX2ljb24tLSR7ZGlyZWN0aW9ufWAsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6ICF0aGlzW2Ake2RpcmVjdGlvbn1JY29uVmlzaWJsZWBdXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuc2Nyb2xsVG8oZGlyZWN0aW9uKVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzW2Ake2RpcmVjdGlvbn1JY29uYF0pXG4gICAgfSxcbiAgICBnZW5JdGVtcyAoaXRlbXMsIGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSByZXR1cm4gaXRlbXNcbiAgICAgIGlmICghaXRlbS5sZW5ndGgpIHJldHVybiBudWxsXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZUYWJzSXRlbXMsIGl0ZW0pXG4gICAgfSxcbiAgICBnZW5UcmFuc2l0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczogeyBuYW1lOiAnZmFkZS10cmFuc2l0aW9uJyB9XG4gICAgICB9LCBbdGhpcy5nZW5JY29uKGRpcmVjdGlvbildKVxuICAgIH0sXG4gICAgZ2VuV3JhcHBlciAoaXRlbXMpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10YWJzX193cmFwcGVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi10YWJzX193cmFwcGVyLS1zaG93LWFycm93cyc6IHRoaXMuaGFzQXJyb3dzXG4gICAgICAgIH0sXG4gICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICAgIG5hbWU6ICd0b3VjaCcsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBlID0+IHRoaXMub3ZlcmZsb3dDaGVjayhlLCB0aGlzLm9uVG91Y2hTdGFydCksXG4gICAgICAgICAgICBtb3ZlOiBlID0+IHRoaXMub3ZlcmZsb3dDaGVjayhlLCB0aGlzLm9uVG91Y2hNb3ZlKSxcbiAgICAgICAgICAgIGVuZDogZSA9PiB0aGlzLm92ZXJmbG93Q2hlY2soZSwgdGhpcy5vblRvdWNoRW5kKVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0sIFtpdGVtc10pXG4gICAgfSxcbiAgICBnZW5TbGlkZXIgKGl0ZW1zKSB7XG4gICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBpdGVtcyA9IFt0aGlzLiRjcmVhdGVFbGVtZW50KFZUYWJzU2xpZGVyLCB7XG4gICAgICAgICAgcHJvcHM6IHsgY29sb3I6IHRoaXMuc2xpZGVyQ29sb3IgfVxuICAgICAgICB9KV1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRhYnNfX3NsaWRlci13cmFwcGVyJyxcbiAgICAgICAgc3R5bGU6IHRoaXMuc2xpZGVyU3R5bGVzXG4gICAgICB9LCBpdGVtcylcbiAgICB9XG4gIH1cbn1cbiJdfQ==