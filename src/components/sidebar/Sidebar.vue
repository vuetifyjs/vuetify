<template lang="pug">
  aside(
    class="sidebar"
    v-bind:class="classes"
    v-bind:id="id"
    v-bind:style="styles"
    v-click-outside="closeConditional"
  )
    slot
</template>

<script>
  export default {
    name: 'sidebar',

    data () {
      return {
        isActive: this.active
      }
    },

    props: {
      active: Boolean,

      closeOnClick: {
        type: Boolean,
        default: true
      },

      drawer: Boolean,

      fixed: Boolean,

      height: {
        type: String,
        default: '100vh'
      },

      mobile: {
        type: Boolean,
        default: true
      },

      mobileBreakPoint: {
        type: Number,
        default: 992
      }
    },

    computed: {
      classes () {
        return {
          'sidebar--close': !this.isActive,
          'sidebar--drawer': this.drawer,
          'sidebar--fixed': this.fixed || this.drawer,
          'sidebar--fixed-right': this.fixed && this.right,
          'sidebar--mobile': this.mobile,
          'sidebar--open': this.isActive
        }
      },

      styles () {
        return {
          'height': this.height
        }
      }
    },

    watch: {
      active () {
        this.isActive = this.active
      },

      '$route' () {
        this.routeChanged()
      }
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
      closeConditional (e) {
        return window.innerWidth <= this.mobileBreakPoint || this.drawer
      },

      resize () {
        if (this.mobile && !this.drawer) {
          const active = window.innerWidth >= this.mobileBreakPoint

          if (active !== this.active) {
            this.$emit('active', active)
          }
        }
      },

      routeChanged () {
        if (
          (window.innerWidth < this.mobileBreakPoint && this.mobile && this.closeOnClick) ||
          (this.drawer && this.closeOnClick)
        ) {
          this.$emit('active', false)
        }
      }
    }
  }
</script>