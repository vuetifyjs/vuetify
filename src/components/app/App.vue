<template lang="pug">
  div(
  class="with"
  v-bind:id="id"
  v-bind:class="classes"
  data-app
  )
    slot
</template>

<script>
  export default {
    props: {
      leftFixedSidebar: Boolean,
      leftSidebar: Boolean,
      id: {
        type: String,
        default: 'app'
      },
      rightFixedSidebar: Boolean,
      rightSidebar: Boolean,
      sidebarUnderToolbar: Boolean,
      column: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      classes () {
        return {
          'left-fixed-sidebar': this.leftFixedSidebar,
          'left-sidebar': this.leftSidebar,
          'right-fixed-sidebar': this.rightFixedSidebar,
          'right-sidebar': this.rightSidebar,
          'sidebar-under-toolbar': this.sidebarUnderToolbar,
          'layout-column': this.column
        }
      }
    }
  }
</script>
