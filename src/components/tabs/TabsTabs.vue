<template lang="pug">
  div(
    class="tabs__tabs"
    v-bind:class="classes"
  )
    ul(
      class="tabs__container"
      ref="container"
    )
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

  export default {
    data () {
      return {
        mobile: false
      }
    },

    mixins: [Eventable],

    computed: {
      classes () {
        return {
          'tabs__tabs--mobile': this.mobile
        }
      },

      events () {
        return [
          ['tab:location', this.slider]
        ]
      }
    },

    mounted () {
      this.$vuetify.load(() => {
        this.resize()
        this.slider()
        window.addEventListener('resize', this.resize, false)
      })
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.resize, false)
    },

    methods: {
      containerIsOverflowed () {
        return this.$refs.container.scrollWidth > this.$refs.container.clientWidth; 
      },

      resize () {
        this.mobile = this.containerIsOverflowed()
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