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
        this.genTransition('prepend'),
        this.genWrapper(
          this.genContainer(items)
        ),
        this.genTransition('append')
      ])
    },
    genContainer (items) {
      return this.$createElement('div', {
        staticClass: 'tabs__container',
        style: this.containerStyles,
        ref: 'container'
      }, items)
    },
    genIcon (direction) {
      if (!this[`${direction}IconVisible`]) return null

      return this.$createElement('v-icon', {
        staticClass: `icon--${direction}`,
        style: {
          display: 'inline-flex',
          top: `${this.computedHeight / 2 - 12}px`
        },
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

      return this.$createElement('v-tabs-items', item)
    },
    genTransition (direction) {
      return this.$createElement('transition', {
        props: { name: 'fade-transition' }
      }, [this.genIcon(direction)])
    },
    genWrapper (items) {
      return this.$createElement('div', {
        staticClass: 'tabs__wrapper',
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
        items = [this.$createElement('v-tabs-slider', {
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
