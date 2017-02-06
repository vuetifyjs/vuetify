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

      topFixedToolbar: Boolean,

      topToolbar: Boolean,

      sidebarUnderToolbar: Boolean
    },

    computed: {
      classes () {
        return {
          'left-fixed-sidebar': this.leftFixedSidebar,
          'left-sidebar': this.leftSidebar,
          'bottom-footer': this.footer,
          'right-fixed-sidebar': this.rightFixedSidebar,
          'right-sidebar': this.rightSidebar,
          'top-fixed-toolbar': this.topFixedToolbar,
          'top-toolbar': this.topToolbar,
          'sidebar-under-toolbar': this.sidebarUnderToolbar
        }
      }
    }
  }
</script>