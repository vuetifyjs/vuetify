export default {
  methods: {
    genActivator () {
      return this.$createElement('div', {
        'class': 'menu__activator',
        ref: 'activator',
        slot: 'activator',
        on: { click: this.activatorClickHandler }
      }, this.$slots.activator)
    },

    genTransition () {
      return this.$createElement(this.transition, {
        props: { origin: this.origin }
      }, [this.genContent()])
    },

    genContent () {
      return this.$createElement('div', {
        'class': 'menu__content',
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
          }
        }
      }, [this.lazy && this.isBooted || !this.lazy ? this.$slots.default : null])
    }
  }
}
