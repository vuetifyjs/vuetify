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

    mixins: [Toggleable],

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

      this.$vuetify.bus.sub(`${this.$options.name}:item-clicked:${this.id}`, this.itemClicked)
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.resize)
      this.$vuetify.bus.unsub(`${this.$options.name}:item-clicked:${this.id}`, this.itemClicked)
    },

    methods: {
      resize () {
        if (!this.drawer) {
          this.active = window.innerWidth >= 768
        }
      },

      itemClicked () {
        if (window.innerWidth < 768 && !this.drawer) {
          this.active = false
        }
      },

      close (e) {
        if ((!e || !e.target)
          || this.activator === null
          || e.target === this.activator 
          || e.target === this.$el
          || this.$el.contains(e.target)
          || this.activator.contains(e.target)
          || (window.innerWidth >= 768 && !this.drawer)
        ) {
          return
        }

        this.active = false
      }
    }
  }
</script>