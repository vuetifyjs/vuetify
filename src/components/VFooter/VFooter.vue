<script>
  import Applicationable from '../../mixins/applicationable'
  import Themeable from '../../mixins/themeable'

  export default {
    name: 'v-footer',

    mixins: [Applicationable, Themeable],

    props: {
      absolute: Boolean,
      fixed: Boolean
    },

    computed: {
      paddingLeft () {
        return this.fixed || !this.app
          ? 0
          : this.$vuetify.application.left
      },
      paddingRight () {
        return this.fixed || !this.app
          ? 0
          : this.$vuetify.application.right
      }
    },

    destroyed () {
      if (this.app) this.$vuetify.application.bottom = 0
    },

    methods: {
      updateApplication () {
        if (!this.app) return

        this.$vuetify.application.bottom = this.fixed
          ? this.$el && this.$el.clientHeight
          : 0
      }
    },

    mounted () {
      this.updateApplication()
    },

    render (h) {
      this.updateApplication()

      const data = {
        staticClass: 'footer',
        'class': {
          'footer--absolute': this.absolute,
          'footer--fixed': this.fixed,
          'theme--dark': this.dark,
          'theme--light': this.light
        },
        style: {
          paddingLeft: `${this.paddingLeft}px`,
          paddingRight: `${this.paddingRight}px`
        }
      }

      return h('footer', data, this.$slots.default)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_footer.styl"></style>
