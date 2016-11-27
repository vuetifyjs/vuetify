<template lang="pug">
  nav(
    class="navbar"
    v-bind:class="classes"
  )
    slot
</template>

<script>
  export default {
    name: 'navbar',

    props: {
      fixed: Boolean
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