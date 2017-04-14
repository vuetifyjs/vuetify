export default {
  methods: {
    actionCancel () {},
    actionOk () {},
    genFooter (slot) {
      if (slot) {
        return slot({
          cancel: this.actionCancel,
          ok: this.actionOk
        })
      }

      if (this.actions) {
        return this.genActions()
      }

      return null
    },
    genActions () {
      return this.$createElement('v-card-row', {
        props: { actions: true }
      }, [
        this.$createElement('v-btn', {
          props: {
            primary: true,
            flat: true
          },
          nativeOn: { click: this.actionCancel }
        }, 'Cancel'),
        this.$createElement('v-btn', {
          props: {
            primary: true,
            flat: true
          },
          nativeOn: { click: this.actionOk }
        }, 'Ok')
      ])
    }
  }
}
