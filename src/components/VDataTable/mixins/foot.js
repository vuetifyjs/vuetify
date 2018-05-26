export default {
  methods: {
    genTFoot () {
      if (!this.$slots.footer) {
        return null
      }

      const footer = this.$slots.footer
      const row = this.hasTag(footer, 'td') ? this.genTR(footer) : footer

      return this.$createElement('div', {
        'class': { 'v-table__footer-wrapper': true }
      }, [
        this.$createElement('table', {
          'class': this.classes
        }, [
          this.$createElement('tfoot', [row])
        ])
      ])
    },
    genActionsFooter () {
      if (this.hideActions) {
        return null
      }

      return this.$createElement('div', {
        'class': this.classes
      }, this.genActions())
    }
  }
}
