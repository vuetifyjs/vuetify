export default {
  methods: {
    genActivator () {
      if (!this.$slots.activator) return null

      const options = {
        'class': 'menu__activator',
        ref: 'activator',
        slot: 'activator',
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
      return this.$createElement('transition', {
        props: {
          name: this.transition,
          origin: this.origin
        }
      }, [this.genContent()])
    },

    genContent () {
      return this.$createElement('div', {
        'class': (`menu__content ${this.contentClass}`).trim(),
        ref: 'content',
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        on: {
          click: e => {
            e.stopPropagation()
            if (this.closeOnContentClick) this.isActive = false
          },
          mouseenter: e => {
            this.insideContent = true
          },
          mouseleave: e => {
            this.insideContent = false
            this.openOnHover && this.mouseLeaveHandler()
          }
        }
      }, [this.lazy && this.isBooted || !this.lazy ? this.$slots.default : null])
    }
  }
}
