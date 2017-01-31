<template lang="pug">
  div(
    class="tabs__tabs"
    v-bind:class="classes"
  )
    ul(
      class="tabs__container"
      ref="container"
    )
      v-list(v-if="items.length")
        v-list-item(v-for="item in items" v-bind:item="item" v-bind:ripple="ripple")
      slot
      v-tabs-slider(ref="slider")
    v-icon(
      left
      v-ripple=""
      v-on:click.native="scrollLeft"
    ) chevron_left
    v-icon(
      right
      v-ripple=""
      v-on:click.native="scrollRight"
    ) chevron_right
</template>

<script>
  import { closestParentTag } from '../../util/helpers'

  export default {
    name: 'tabs-tabs',

    data () {
      return {
        mobile: false,
        resizeDebounce: {}
      }
    },

    props: {
      items: {
        type: Array,
        default: () => []
      },

      ripple: Boolean
    },

    computed: {
      classes () {
        return {
          'tabs__tabs--mobile': this.mobile
        }
      },

      tabsUid () {
        const tabs = closestParentTag.call(this, 'v-tabs')

        return tabs ? tabs._uid : null
      }
    },

    mounted () {
      this.$vuetify().load(() => {
        this.resize()
        window.addEventListener('resize', this.resize, false)
      })
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.resize, false)
    },

    methods: {
      resize () {
        clearTimeout(this.resizeDebounce)

        this.resizeDebounce = setTimeout(() => {
          if (!this.$refs.container) {
            return
          }

          this.mobile = this.$refs.container.scrollWidth > this.$refs.container.clientWidth
        }, 250)
      },

      scrollLeft () {
        this.$refs.container.scrollLeft -= 50
      },

      scrollRight () {
        this.$refs.container.scrollLeft += 50
      },

      slider (state) {
        this.$refs.slider.style.width = `${state.width}px`
        this.$refs.slider.style.left = `${state.offset}px`
      }
    }
  }
</script>
