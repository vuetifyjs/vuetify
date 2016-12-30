<template lang="pug">
  nav(
    class="navbar"
    v-bind:class="classes"
  )
    v-navbar-items(v-if="items.length > 0" v-bind:items="items")
    slot
</template>

<script>
  export default {
    name: 'navbar',

    props: {
      fixed: Boolean,

      items: {
        type: Array,
        default: () => []
      }
    },

    computed: {
      classes () {
        return {
          'navbar--fixed': this.fixed
        }
      }
    }
  }
</script>