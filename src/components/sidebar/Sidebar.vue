<template lang="pug">
  aside(
    class="sidebar"
    v-bind:class="classes"
    v-bind:id="id"
    v-bind:style="styles"
  )
    slot(name="top")
    v-list(
      dense
      v-if="items.length"
      v-bind:items="items"
      v-bind:ripple="ripple"
      v-bind:router="router"
      v-bind:unshift="unshift"
      ref="list"
    )
    slot
</template>

<script>
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'sidebar',

    mixins: [Toggleable],

    data () {
      return {
        list: {}
      }
    },

    props: {
      closeOnClick: {
        type: Boolean,
        default: true
      },

      drawer: Boolean,

      fixed: Boolean,
      
      groupClass: {
        type: String,
        default: ''
      },

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

      mobileBreakPoint: {
        type: Number,
        default: 992
      },

      items: {
        type: Array,
        default: () => []
      },

      right: Boolean,

      ripple: Boolean,

      router: Boolean,

      unshift: Boolean
    },

    computed: {
      classes () {
        return {
          'sidebar--close': !this.active,
          'sidebar--drawer': this.drawer,
          'sidebar--fixed': this.fixed || this.drawer,
          'sidebar--fixed-right': this.fixed && this.right,
          'sidebar--mobile': this.mobile,
          'sidebar--open': this.active
        }
      },

      styles () {
        return {
          'height': this.height
        }
      }
    },

    watch: {
      '$route' () {
        this.routeChanged()
      }
    },

    created () {
      this.$store.commit('vuetify/SIDEBAR_INIT', this.id)
    },

    mounted () {      
      this.$vuetify().load(() => {
        this.resize()
        window.addEventListener('resize', this.resize, false)
      })
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.resize)
    },

    methods: {
      resize () {
        if (this.mobile && !this.drawer) {
          let active = window.innerWidth >= this.mobileBreakPoint

          if (active !== this.active) {
            this.$store.commit('vuetify/SIDEBAR_TOGGLE', {
              id: this.id,
              active: active
            })
          }
        }
      },

      routeChanged () {
        if (
          (window.innerWidth < this.mobileBreakPoint && this.mobile && this.closeOnClick)
          || (this.drawer && this.closeOnClick)
        ) {
          this.active = false
        }
      },

      closeConditional (e) {
        return (
          (window.innerWidth >= this.mobileBreakPoint && !this.drawer)
          || !this.closeOnClick
          || this.$el.contains(e.target)
        )
      }
    }
  }
</script>