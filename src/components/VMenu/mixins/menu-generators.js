/**
 * Menu generators
 * @mixin
 *
 * Used for creating the DOM elements for VMenu
 */
export default {
  methods: {
    genActivator () {
      if (!this.$slots.activator) return null

      const options = {
        staticClass: 'menu__activator',
        'class': {
          'menu__activator--active': this.hasJustFocused || this.isActive
        },
        ref: 'activator',
        on: {}
      }

      if (this.openOnHover) {
        options.on['mouseenter'] = this.mouseEnterHandler
        options.on['mouseleave'] = this.mouseLeaveHandler
      } else if (this.openOnClick) {
        options.on['click'] = this.activatorClickHandler
      }

      return this.$createElement('div', options, this.$slots.activator)
    },

    genTransition () {
      if (!this.transition) return this.genContent()

      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, [this.genContent()])
    },

    genContent () {
      return this.$createElement('div', {
        'class': (`menu__content ${this.contentClass}`).trim(),
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        ref: 'content',
        on: {
          click: e => {
            e.stopPropagation()
            if (e.target.getAttribute('disabled')) return
            if (this.closeOnContentClick) this.isActive = false
          },
          mouseenter: e => {
            this.openOnHover && this.mouseEnterHandler
          },
          mouseleave: e => {
            this.openOnHover && this.mouseLeaveHandler(e)
          }
        }
      }, this.showLazyContent(this.$slots.default))
    }
  }
}
