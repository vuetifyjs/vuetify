<script>
  export default {
    name: 'v-content',

    computed: {
      styles () {
        return {
          paddingTop: `${this.$vuetify.application.top}px`,
          paddingRight: `${this.$vuetify.application.right}px`,
          paddingBottom: `${this.$vuetify.application.bottom}px`,
          paddingLeft: `${this.$vuetify.application.left}px`
        }
      }
    },

    render (h) {
      const data = {
        staticClass: 'content',
        style: this.styles
      }

      return h('div', data, this.$slots.default)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_content.styl"></style>
