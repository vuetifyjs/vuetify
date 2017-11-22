export default {
  methods: {
    genTFoot () {
      const children = []

      if (this.$slots.footer) {
        const footer = this.$slots.footer
        const row = this.needsTR(footer) ? this.genTR(footer) : footer

        children.push(row)
      }

      if (!this.hideActions) {
        children.push(this.genTR([
          this.$createElement('td', {
            attrs: { colspan: '100%' }
          }, this.genActions())
        ]))
      }

      if (!children.length) return null
      return this.$createElement('tfoot', children)
    }
  }
}
