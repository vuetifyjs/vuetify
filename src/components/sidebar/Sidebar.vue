<template lang="pug">
  aside(
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

      mobile: {
        type: Boolean,
        default: true
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
          'sidebar--mobile': this.mobile,
          'sidebar--fixed': this.fixed && !this.right,
          'sidebar--fixed-right': this.fixed && this.right,
          'sidebar--close': !this.active,
          'sidebar--open': this.active
        }
      },

      styles () {
        return {
          'height': this.height
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
      window.removeEventListener('resize', this.resize)
    },

    methods: {
      resize () {
        if (!this.drawer) {
          this.active = window.innerWidth > 768
        }
      },

      close (e) {
        let group = e.target.classList.contains('sidebar__item-header')
          || e.target.parentNode.classList.contains('sidebar__item-header')
          
        if (this.activator === null || group) {
          return
        }

        try {
          if (e.target === this.activator || this.activator.contains(e.target)) {
            return
          }
        } catch (e) {}

        let width = window.innerWidth

        if (width > 768 && !this.drawer) {
          return
        }

        this.active = false
      }
    }
  }
</script>