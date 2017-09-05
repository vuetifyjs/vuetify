<script>
  import Translatable from '../../mixins/translatable'

  export default {
    name: 'v-parallax',

    mixins: [Translatable],

    data () {
      return {
        isBooted: false
      }
    },

    props: {
      height: {
        type: [String, Number],
        default: 500
      },
      jumbotron: Boolean,
      src: String
    },

    computed: {
      styles () {
        return {
          display: 'block',
          opacity: this.isBooted ? 1 : 0,
          transform: `translate3d(-50%, ${this.jumbotron ? 0 : this.parallax + 'px'}, 0)`
        }
      }
    },

    watch: {
      parallax () {
        this.isBooted = true
      }
    },

    methods: {
      objHeight () {
        return this.$refs.img.naturalHeight
      },
      elOffsetTop () {
        return this.$el.offsetTop
      }
    },

    render (h) {
      const container = h('div', {
        staticClass: 'parallax__image-container'
      }, [
        h('img', {
          staticClass: 'parallax__image',
          style: this.styles,
          attrs: {
            src: this.src
          },
          ref: 'img'
        })
      ])

      const content = h('div', {
        staticClass: 'parallax__content',
        style: {
          minHeight: isNaN(this.height) ? this.height : `${this.height}px`
        }
      }, this.$slots.default)

      let directives = this.directives()

      if (this.jumbotron) {
        directives = directives.filter(d => d.name !== 'scroll')
      }

      return h('div', {
        staticClass: 'parallax',
        style: {
          minHeight: isNaN(this.height) ? this.height : `${this.height}px`
        },
        directives,
        on: this.$listeners
      }, [
        container,
        content
      ])
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_parallax.styl"></style>
