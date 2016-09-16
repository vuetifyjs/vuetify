<template lang="pug">
  ul(
    class="breadcrumbs"
    v-bind:class="classes"
  )
    slot
</template>

<script>
  export default {
    props: {
      divider: {
        type: String,
        default: '/'
      },

      icons: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'breadcrumbs--with-icons': this.icons
        }
      }
    },

    mounted () {
      this.$vuetify.load.call(this, this.init)
    },

    methods: {
      init () {
        this.$children.forEach(i => i.$el.setAttribute('data-divider', this.divider))
      }
    }
  }
</script>