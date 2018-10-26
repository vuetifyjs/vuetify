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
            return this.$createElement('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-tabs__bar',
                'class': this.themeClasses,
                ref: 'bar'
            }), [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1nZW5lcmF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVlRhYnMvbWl4aW5zL3RhYnMtZ2VuZXJhdG9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFDdEMsT0FBTyxXQUFXLE1BQU0sZ0JBQWdCLENBQUE7QUFDeEMsT0FBTyxLQUFLLE1BQU0sYUFBYSxDQUFBO0FBRS9COzs7O0dBSUc7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLE1BQU0sQ0FBRSxLQUFLO1lBQ1gsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDcEUsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDMUIsR0FBRyxFQUFFLEtBQUs7YUFDWCxDQUFDLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLENBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FDekI7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7YUFDM0IsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFlBQVksQ0FBRSxLQUFLO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSxtQkFBbUI7Z0JBQ2hDLEtBQUssRUFBRTtvQkFDTCxxQ0FBcUMsRUFBRSxJQUFJLENBQUMsY0FBYztvQkFDMUQsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQzVDLCtCQUErQixFQUFFLElBQUksQ0FBQyxTQUFTO29CQUMvQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDcEMsbUNB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WUFBWTthQUN6QixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ1gsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWVGFic0l0ZW1zIGZyb20gJy4uL1ZUYWJzSXRlbXMnXG5pbXBvcnQgVlRhYnNTbGlkZXIgZnJvbSAnLi4vVlRhYnNTbGlkZXInXG5pbXBvcnQgVkljb24gZnJvbSAnLi4vLi4vVkljb24nXG5cbi8qKlxuICogVGFicyBnZW5lcmF0b3JzXG4gKlxuICogQG1peGluXG4gKi9cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICBnZW5CYXIgKGl0ZW1zKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2JywgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb2xvciwge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtdGFic19fYmFyJyxcbiAgICAgICAgJ2NsYXNzJzogdGhpcy50aGVtZUNsYXNzZXMsXG4gICAgICAgIHJlZjogJ2JhcidcbiAgICAgIH0pLCBbXG4gICAgICAgIHRoaXMuZ2VuVHJhbnNpdGlvbigncHJldicpLFxuICAgICAgICB0aGlzLmdlbldyYXBwZXIoXG4gICAgICAgICAgdGhpcy5nZW5Db250YWluZXIoaXRlbXMpXG4gICAgICAgICksXG4gICAgICAgIHRoaXMuZ2VuVHJhbnNpdGlvbignbmV4dCcpXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuQ29udGFpbmVyIChpdGVtcykge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRhYnNfX2NvbnRhaW5lcicsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3YtdGFic19fY29udGFpbmVyLS1hbGlnbi13aXRoLXRpdGxlJzogdGhpcy5hbGlnbldpdGhUaXRsZSxcbiAgICAgICAgICAndi10YWJzX19jb250YWluZXItLWNlbnRlcmVkJzogdGhpcy5jZW50ZXJlZCxcbiAgICAgICAgICAndi10YWJzX19jb250YWluZXItLWZpeGVkLXRhYnMnOiB0aGlzLmZpeGVkVGFicyxcbiAgICAgICAgICAndi10YWJzX19jb250YWluZXItLWdyb3cnOiB0aGlzLmdyb3csXG4gICAgICAgICAgJ3YtdGFic19fY29udGFpbmVyLS1pY29ucy1hbmQtdGV4dCc6IHRoaXMuaWNvbnNBbmRUZXh0LFxuICAgICAgICAgICd2LXRhYnNfX2NvbnRhaW5lci0tb3ZlcmZsb3cnOiB0aGlzLmlzT3ZlcmZsb3dpbmcsXG4gICAgICAgICAgJ3YtdGFic19fY29udGFpbmVyLS1yaWdodCc6IHRoaXMucmlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHRoaXMuY29udGFpbmVyU3R5bGVzLFxuICAgICAgICByZWY6ICdjb250YWluZXInXG4gICAgICB9LCBpdGVtcylcbiAgICB9LFxuICAgIGdlbkljb24gKGRpcmVjdGlvbikge1xuICAgICAgaWYgKCF0aGlzLmhhc0Fycm93cyB8fFxuICAgICAgICAhdGhpc1tgJHtkaXJlY3Rpb259SWNvblZpc2libGVgXVxuICAgICAgKSByZXR1cm4gbnVsbFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwge1xuICAgICAgICBzdGF0aWNDbGFzczogYHYtdGFic19faWNvbiB2LXRhYnNfX2ljb24tLSR7ZGlyZWN0aW9ufWAsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6ICF0aGlzW2Ake2RpcmVjdGlvbn1JY29uVmlzaWJsZWBdXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuc2Nyb2xsVG8oZGlyZWN0aW9uKVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzW2Ake2RpcmVjdGlvbn1JY29uYF0pXG4gICAgfSxcbiAgICBnZW5JdGVtcyAoaXRlbXMsIGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSByZXR1cm4gaXRlbXNcbiAgICAgIGlmICghaXRlbS5sZW5ndGgpIHJldHVybiBudWxsXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZUYWJzSXRlbXMsIGl0ZW0pXG4gICAgfSxcbiAgICBnZW5UcmFuc2l0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczogeyBuYW1lOiAnZmFkZS10cmFuc2l0aW9uJyB9XG4gICAgICB9LCBbdGhpcy5nZW5JY29uKGRpcmVjdGlvbildKVxuICAgIH0sXG4gICAgZ2VuV3JhcHBlciAoaXRlbXMpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10YWJzX193cmFwcGVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAndi10YWJzX193cmFwcGVyLS1zaG93LWFycm93cyc6IHRoaXMuaGFzQXJyb3dzXG4gICAgICAgIH0sXG4gICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICAgIG5hbWU6ICd0b3VjaCcsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBlID0+IHRoaXMub3ZlcmZsb3dDaGVjayhlLCB0aGlzLm9uVG91Y2hTdGFydCksXG4gICAgICAgICAgICBtb3ZlOiBlID0+IHRoaXMub3ZlcmZsb3dDaGVjayhlLCB0aGlzLm9uVG91Y2hNb3ZlKSxcbiAgICAgICAgICAgIGVuZDogZSA9PiB0aGlzLm92ZXJmbG93Q2hlY2soZSwgdGhpcy5vblRvdWNoRW5kKVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0sIFtpdGVtc10pXG4gICAgfSxcbiAgICBnZW5TbGlkZXIgKGl0ZW1zKSB7XG4gICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBpdGVtcyA9IFt0aGlzLiRjcmVhdGVFbGVtZW50KFZUYWJzU2xpZGVyLCB7XG4gICAgICAgICAgcHJvcHM6IHsgY29sb3I6IHRoaXMuc2xpZGVyQ29sb3IgfVxuICAgICAgICB9KV1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRhYnNfX3NsaWRlci13cmFwcGVyJyxcbiAgICAgICAgc3R5bGU6IHRoaXMuc2xpZGVyU3R5bGVzXG4gICAgICB9LCBpdGVtcylcbiAgICB9XG4gIH1cbn1cbiJdfQ==