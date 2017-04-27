export default {
  methods: {
    genTProgress () {
      const loader = this.$createElement('v-progress-linear', {
        props: {
          indeterminate: true,
          height: 3,
          active: this.loading
        }
      })

      const col = this.$createElement('th', {
        class: 'column',
        attrs: {
          colspan: '100%'
        }
      }, [loader])

      return this.$createElement('thead', { class: 'datatable__progress' }, [this.genTR([col])])
    }
  }
}
