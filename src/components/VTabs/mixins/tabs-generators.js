import VTabsItems from '../VTabsItems'
import VTabsSlider from '../VTabsSlider'
import VIcon from '../../VIcon'

/**
 * Tabs generators
 *
 * @mixin
 */
export default {
  methods: {
    genBar (items) {
      return this.$createElement('div', {
        staticClass: 'tabs__bar',
        'class': this.addBackgroundColorClassChecks({
          'theme--dark': this.dark,
          'theme--light': this.light
        }),
        ref: 'bar'
      }, [
        this.genTransition('prev'),
        this.genWrapper(
          this.genContainer(items)
        ),
        this.genTransition('next')
      ])
    },
    genContainer (items) {
      return this.$createElement('div', {
        staticClass: 'tabs__container',
        class: {
          'tabs__container--align-with-title': this.alignWithTitle,
          'tabs__container--centered': this.centered,
          'tabs__container--fixed-tabs': this.fixedTabs,
          'tabs__container--grow': this.grow,
          'tabs__container--icons-and-text': this.iconsAndText,
          'tabs__container--overflow': this.isOverflowing,
          'tabs__container--right': this.right
        },
        style: this.containerStyles,
        ref: 'container'
      }, items)
    },
    genIcon (direction) {
      if (!this.hasArrows ||
        !this[`${direction}IconVisible`]
      ) return null

      return this.$createElement(VIcon, {
        staticClass: `tabs__icon tabs__icon--${direction}`,
        props: {
          disabled: !this[`${direction}IconVisible`]
        },
        on: {
          click: () => this.scrollTo(direction)
        }
      }, this[`${direction}Icon`])
    },
    genItems (items, item) {
      if (items.length > 0) return items
      if (!item.length) return null

      return this.$createElement(VTabsItems, item)
    },
    genTransition (direction) {
      return this.$createElement('transition', {
        props: { name: 'fade-transition' }
      }, [this.genIcon(direction)])
    },
    genWrapper (items) {
      return this.$createElement('div', {
        staticClass: 'tabs__wrapper',
        class: {
          'tabs__wrapper--show-arrows': this.hasArrows
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
      }, [items])
    },
    genSlider (items) {
      if (!items.length) {
        items = [this.$createElement(VTabsSlider, {
          props: { color: this.sliderColor }
        })]
      }

      return this.$createElement('div', {
        staticClass: 'tabs__slider-wrapper',
        style: this.sliderStyles
      }, items)
    }
  }
}
