/**
 * Menu generators
 *
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

    genDirectives () {
      // Do not add click outside for hover menu
      const directives = !this.openOnHover ? [{
        name: 'click-outside',
        value: {
          callback: () => this.closeOnClick,
          include: () => [this.$el, ...this.getOpenDependentElements()]
        }
      }] : []

      directives.push({
        name: 'show',
        value: this.isContentActive
      })

      return directives
    },

    genContent () {
      const options = {
        'class': [
          (`menu__content ${this.contentClass}`).trim(),
          { 'menuable__content__active': this.isActive }
        ],
        style: this.styles,
        directives: this.genDirectives(),
        ref: 'content',
        on: {
          click: e => {
            e.stopPropagation()
            if (e.target.getAttribute('disabled')) return
            if (this.closeOnContentClick) this.isActive = false
          }
        }
      }

      !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler)
      this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler)

      return this.$createElement('div', options, this.showLazyContent(this.$slots.default))
    }
  }
}
