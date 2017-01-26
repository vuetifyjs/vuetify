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
  import Eventable from '../../mixins/eventable'
  import { closestParentTag } from '../../util/helpers'

  export default {
    name: 'tabs-tabs',

    mixins: [Eventable],

    data () {
      return {
        mobile: false
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

      events () {
        return [
          [`tab:location:${this.tabsUid}`, this.slider]
        ]
      },

      tabsUid () {
        let tabs = closestParentTag.call(this, 'v-tabs')

        return tabs ? tabs._uid : null
      }
    },

    mounted () {
      this.$vuetify().load(() => {
        this.resize()
        this.slider()
        window.addEventListener('resize', this.resize, false)
      })
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.resize, false)
    },

    methods: {
      resize () {
        if (!this.$refs.container) {
          return
        }
        
        this.mobile = this.$refs.container.scrollWidth > this.$refs.container.clientWidth
        this.$vuetify.bus.pub(`tab:resize:${this.tabsUid}`)
      },

      scrollLeft () {
        this.$refs.container.scrollLeft -= 50
      },

      scrollRight () {
        this.$refs.container.scrollLeft += 50
      },

      slider (width, offsetLeft) {
        this.$refs.slider.style.width = `${width}px`
        this.$refs.slider.style.left = `${offsetLeft}px`
      }
    }
  }
</script>
