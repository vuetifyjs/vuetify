<template lang="pug">
  div(
    class="with"
    v-bind:id="id"
    v-bind:class="classes"
  )
    slot
</template>

<script>
  export default {
    props: {
      footer: Boolean,

      leftFixedSidebar: Boolean,

      leftSidebar: Boolean,

      id: {
        type: String,
        default: 'app'
      },

      rightFixedSidebar: Boolean,

      rightSidebar: Boolean,

      topFixedNavbar: Boolean,

      topNavbar: Boolean
    },

    computed: {
      classes () {
        return {
          'left-fixed-sidebar': this.leftFixedSidebar,
          'left-sidebar': this.leftSidebar,
          'right-fixed-sidebar': this.rightFixedSidebar,
          'right-sidebar': this.rightSidebar,
          'top-fixed-navbar': this.topFixedNavbar,
          'top-navbar': this.topNavbar
        }
      }
    }
  }
</script>