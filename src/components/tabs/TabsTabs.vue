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
    v-icon(
      left
      v-ripple=""
      v-on:click="scrollLeft"
    ) chevron_left
    v-icon(
      right 
      v-ripple=""
      v-on:click="scrollRight"
    ) chevron_right
</template>

<script>
  export default {
    data () {
      return {
        mobile: false
      }
    },

    computed: {
      classes () {
        return {
          'tabs__tabs--mobile': this.mobile
        }
      }
    },

    mounted () {
      this.$vuetify.load(() => {
        this.resize()
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
        this.$refs.container.scrollLeft + 20
      },

      scrollRight () {
        this.$refs.container.scrollLeft + 20
      }
    }
  }
</script>