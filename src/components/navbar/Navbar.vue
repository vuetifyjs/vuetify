<template lang="pug">
  nav(
    class="navbar"
    v-bind:class="classes"
  )
    slot
    v-navbar-items(
      v-if="items.length > 0"
      v-bind:group-class="groupClass"
      v-bind:items="items"
      v-bind:ripple="ripple"
      v-bind:router="router"
    )
    slot(name="right")
</template>

<script>
  export default {
    name: 'navbar',

    props: {
      fixed: Boolean,

      groupClass: {
        type: String,
        default: ''
      },

      items: {
        type: Array,
        default: () => []
      },

      ripple: Boolean,

      router: Boolean
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