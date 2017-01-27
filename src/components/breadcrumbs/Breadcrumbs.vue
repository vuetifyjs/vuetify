<template lang="pug">
  ul(
    class="breadcrumbs"
    v-bind:class="classes"
    v-bind:items="items"
  )
    v-breadcrumbs-item(
      v-for="item in items"
      v-bind:item="item"
      v-bind:disabled="item.disabled"
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

      icons: Boolean,

      items: {
        type: Array,
        default: () => []
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
      this.$vuetify().load(this.init)
    },

    methods: {
      init () {
        this.$children.forEach(i => (i.$el.dataset.divider = this.divider))
      }
    }
  }
</script>