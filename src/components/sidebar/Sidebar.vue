<template lang="pug">
  nav(
    class="sidebar"
    v-bind:class="classes"
    v-bind:id="id"
    v-bind:style="styles"
  )
    slot
</template>

<script>
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'sidebar',

    mixins: [
      Toggleable
    ],

    props: {
      closeOnClick: {
        type: Boolean,
        default: false
      },

      drawer: {
        type: Boolean,
        default: false
      },

      fixed: {
        type: Boolean,
        default: false
      },

      height: {
        type: String,
        default: '100vh'
      },

      id: {
        type: String,
        required: true
      },

      right: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'sidebar--drawer': this.drawer && !this.right,
          'sidebar--drawer--right': this.drawer && this.right,
          'sidebar--fixed': (this.fixed || this.drawer) && !this.right,
          'sidebar--fixed--right': (this.fixed || this.drawer) && this.right,
          'sidebar--open': this.active,
          'sidebar--right': this.right
        }
      },

      styles () {
        return {
          'height': this.height
        }
      }
    }
  }
</script>