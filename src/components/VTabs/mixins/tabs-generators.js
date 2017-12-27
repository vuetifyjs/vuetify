// Helpers
import { filterChildren } from '../../../util/helpers'

/**
 * Tabs generators
 *
 * @mixin
 */
export default {
  methods: {
    genContainer () {
      return this.$createElement('div', {
        staticClass: 'tabs__container',
        style: this.containerStyles,
        ref: 'container'
      }, [
        this.genSlider(),
        filterChildren(this.$slots.default, 'v-tab')
      ])
    },
    genIcon (direction) {
      if ((!this[`${direction}IconVisible`] &&
        !this.isMobile) ||
        !this.showArrows ||
        !this.isOverflowing
      ) return null

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
    genTransition (direction) {
      return this.$createElement('transition', {
        props: { name: 'fade-transition' }
      }, [this.genIcon(direction)])
    },
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'tabs__wrapper',
        directives: [{
          name: 'touch',
          value: {
            start: e => this.overflowCheck(e, this.onTouchStart),
            move: e => this.overflowCheck(e, this.onTouchMove),
            end: e => this.overflowCheck(e, this.onTouchEnd)
          }
        }]
      }, [this.genContainer()])
    },
    genSlider () {
      let slider = filterChildren(this.$slots.default, 'v-tabs-slider')
      if (!slider.length) {
        slider = [this.$createElement('v-tabs-slider', {
          props: { color: this.sliderColor }
        })]
      }

      return this.$createElement('div', {
        staticClass: 'tabs__slider-wrapper',
        style: this.sliderStyles
      }, slider)
    }
  }
}
