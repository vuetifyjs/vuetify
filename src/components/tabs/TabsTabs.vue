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
      v-on:click.native="scrollLeft"
    ) chevron_left
    v-icon(
      right
      v-ripple=""
      v-on:click.native="scrollRight"
    ) chevron_right
</template>

<script>
  export default {
    name: 'tabs-tabs',

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

    methods: {
      scrollLeft () {
        this.$refs.container.scrollLeft -= 50
      },

      scrollRight () {
        this.$refs.container.scrollLeft += 50
      }
    }
  }
</script>
