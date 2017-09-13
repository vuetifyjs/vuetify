<script>
  import Themeable from '../../mixins/themeable'

  export default {
    name: 'v-toolbar',

    mixins: [Themeable],

    data: () => ({
      isExtended: false,
      isScrolling: false,
      marginTop: 0,
      previousScroll: null,
      target: null
    }),

    props: {
      absolute: Boolean,
      card: Boolean,
      dense: Boolean,
      extended: Boolean,
      fixed: Boolean,
      flat: Boolean,
      floating: Boolean,
      prominent: Boolean,
      scrollOffScreen: Boolean,
      scrollTarget: String,
      scrollThreshold: {
        type: Number,
        default: 100
      }
    },

    computed: {
      classes () {
        return {
          'toolbar': true,
          'elevation-0': this.flat,
          'toolbar--absolute': this.absolute,
          'toolbar--card': this.card,
          'toolbar--dense': this.dense,
          'toolbar--fixed': this.fixed,
          'toolbar--floating': this.floating,
          'toolbar--prominent': this.prominent,
          'toolbar--extended': this.isExtended,
          'theme--dark': this.dark,
          'theme--light': this.light
        }
      },
      styles () {
        return {
          marginTop: this.marginTop
        }
      }
    },

    watch: {
      isScrolling (val) {
        if (!val) this.marginTop = 0
        else (this.marginTop = `${-this.$refs.content.clientHeight - 6}px`)
      }
    },

    methods: {
      onScroll () {
        if (typeof window === 'undefined') return

        if (!this.target) {
          this.target = this.scrollTarget
            ? document.querySelector(this.scrollTarget)
            : window
        }

        const currentScroll = this.scrollTarget
          ? this.target.scrollTop
          : this.target.pageYOffset || document.documentElement.scrollTop

        if (currentScroll < this.scrollThreshold) return

        if (this.previousScroll === null) {
          this.previousScroll = currentScroll
        }

        this.isScrolling = this.previousScroll < currentScroll

        this.previousScroll = currentScroll
      }
    },

    render (h) {
      this.isExtended = this.extended || !!this.$slots.extension
      const children = []
      const data = {
        'class': this.classes,
        style: this.styles,
        on: this.$listeners
      }

      if (this.scrollOffScreen) {
        data.directives = [{
          name: 'scroll',
          value: {
            callback: this.onScroll,
            target: this.scrollTarget
          }
        }]
      }

      children.push(h('div', {
        'class': 'toolbar__content',
        ref: 'content'
      }, this.$slots.default))

      if (this.isExtended) {
        children.push(h('div', {
          'class': 'toolbar__extension'
        }, this.$slots.extension))
      }

      return h('nav', data, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_toolbar.styl"></style>
