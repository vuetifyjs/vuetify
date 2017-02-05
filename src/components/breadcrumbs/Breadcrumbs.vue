<template lang="pug">
  ul(
    class="breadcrumbs"
    v-bind:class="classes"
    v-bind:items="items"
  )
    slot
</template>

<script>
  export default {
    name: 'breadcrumbs',

    props: {
      divider: {
        type: String,
        default: '/'
      },

      icons: Boolean
    },

    computed: {
      classes () {
        return {
          'breadcrumbs--with-icons': this.icons
        }
      }
    },

    mounted () {
      this.$vuetify().load(this.init)
    },

    methods: {
      init () {
        this.$children.forEach(i => (i.$el.dataset.divider = this.divider))
      }
    }
  }
</script>