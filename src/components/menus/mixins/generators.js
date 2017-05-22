export default {
  methods: {
    genActivator () {
      return this.$createElement('div', {
        ref: 'activator',
        slot: 'activator',
        class: 'menu__activator',
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
        ref: 'content',
        style: this.styles,
        'class': 'menu__content',
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
