export default {
  data () {
    return {
      color: ''
    }
  },

  watch: {
    loading (val) {
      if (val) this.color = val
    }
  },

  methods: {
    genTProgress () {
      const loader = this.$createElement('v-progress-linear', {
        props: {
          primary: this.color === 'primary',
          secondary: this.color === 'secondary',
          success: this.color === 'success',
          info: this.color === 'info',
          warning: this.color === 'warning',
          error: this.color === 'error',
          indeterminate: true,
          height: 3,
          active: !!this.loading
        }
      })

      const col = this.$createElement('th', {
        class: 'column',
        attrs: {
          colspan: '100%'
        }
      }, [loader])

      return this.$createElement('thead', {
        class: 'datatable__progress'
      }, [this.genTR([col])])
    }
  }
}
