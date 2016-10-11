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

      navbar: Boolean,

      rightFixedSidebar: Boolean,

      rightSidebar: Boolean
    },

    computed: {
      classes () {
        return {
          'footer': this.footer && !this.navbar,
          'left-fixed-sidebar': this.leftFixedSidebar,
          'left-sidebar': this.leftSidebar,
          'nav': this.navbar && !this.footer,
          'nav-and-footer': this.navbar && this.footer,
          'right-fixed-sidebar': this.rightFixedSidebar,
          'right-sidebar': this.rightSidebar
        }
      }
    }
  }
</script>