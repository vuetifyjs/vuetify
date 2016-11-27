<template lang="pug">
  nav(
    class="sidebar"
    v-bind:class="classes"
    v-bind:id="id"
    v-bind:style="styles"
  )
    slot(name="top")
    v-sidebar-items(v-if="items.length > 0" v-bind:items="items")
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

      drawer: Boolean,

      fixed: Boolean,

      height: {
        type: String,
        default: '100vh'
      },

      id: {
        type: String,
        required: true
      },

      items: {
        type: Array,
        default: () => []
      },

      right: Boolean
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
    },

    methods: {
      close (e) {
        if (this.activator === null) {
          return
        }

        if (e.target === this.activator && this.toggleable) {
          return this.toggle()
        }
        
        try {
          if (e.target === this.activator
              || this.activator.contains(e.target)
              || e.target.classList.contains('sidebar__item-header')
              || e.target.parentNode.classList.contains('sidebar__item-header')
          ) {
            return
          }
        } catch (e) {}

        this.active = false
      }
    }
  }
</script>